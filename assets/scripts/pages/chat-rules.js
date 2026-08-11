function parseMarkdownLinks(text) {
    if (!text) return "";
    let escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    return escaped.replace(markdownLinkRegex, (match, text, url) => {
        const isExternal = url.startsWith("http://") || url.startsWith("https://");
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${url}"${targetAttr}>${text}</a>`;
    });
}

async function loadRules() {
    try {
        const response = await fetch("./rules.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const rulesData = await response.json();
        renderRules(rulesData);
    } catch (error) {
        console.error("Ошибка при загрузке правил:", error);
        showError("Не удалось загрузить правила. Пожалуйста, попробуйте позже.");
    }
}

function renderRules(rulesData) {
    const accordionContainer = document.getElementById("rulesAccordion");
    const loadingElement = document.getElementById("loadingRules");
    const lastUpdateElement = document.getElementById("lastUpdate");

    if (loadingElement) loadingElement.remove();
    if (lastUpdateElement && rulesData.lastUpdate) {
        lastUpdateElement.textContent = `Последнее изменение: ${rulesData.lastUpdate}`;
    }

    accordionContainer.innerHTML = "";
    if (!rulesData.blocks || rulesData.blocks.length === 0) {
        showError("Правила не найдены.");
        return;
    }

    rulesData.blocks.forEach((block) => {
        const rulesBlock = document.createElement("div");
        rulesBlock.className = "rules-block";
        rulesBlock.innerHTML = `
            <div class="rules-header">
                <h2><i class="${block.icon || "fas fa-circle"}"></i> ${block.title}</h2>
                <span class="rules-indicator"><i class="fas fa-chevron-right"></i></span>
            </div>
        `;

        const rulesContent = document.createElement("div");
        rulesContent.className = "rules-content";

        if (block.items && block.items.length > 0) {
            block.items.forEach((item) => {
                const ruleItem = document.createElement("div");
                ruleItem.className = "rule-item";
                const rawText = (item.id ? item.id + " " : "") + (item.text || "");
                ruleItem.innerHTML = parseMarkdownLinks(rawText);
                rulesContent.appendChild(ruleItem);

                if (item.subitems && item.subitems.length > 0) {
                    item.subitems.forEach((subitem) => {
                        const ruleSubitem = document.createElement("div");
                        ruleSubitem.className = "rule-subitem";
                        ruleSubitem.innerHTML = parseMarkdownLinks(subitem);
                        rulesContent.appendChild(ruleSubitem);
                    });
                }
            });
        }
        rulesBlock.appendChild(rulesContent);
        accordionContainer.appendChild(rulesBlock);
    });

    initAccordion();
    initSmartSearch(accordionContainer); // Запускаем индексацию поиска после рендера!
}

function showError(message) {
    document.getElementById("rulesAccordion").innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
}

function initAccordion() {
    const accordionBlocks = document.querySelectorAll(".rules-block");
    accordionBlocks.forEach((block) => {
        const header = block.querySelector(".rules-header");
        const content = block.querySelector(".rules-content");
        header.addEventListener("click", () => {
            const isActive = block.classList.contains("active");
            accordionBlocks.forEach((otherBlock) => {
                if (otherBlock.classList.contains("active")) {
                    otherBlock.classList.remove("active");
                    otherBlock.querySelector(".rules-content").style.maxHeight = "0";
                }
            });
            if (!isActive) {
                block.classList.add("active");
                content.style.maxHeight = content.scrollHeight + 500 + "px";
            }
        });
    });
}

// ==== ЛОГИКА УМНОГО ПОИСКА ====
function initSmartSearch(container) {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const suggestionsBox = document.getElementById('searchSuggestions');
    if (!searchInput || !container || !suggestionsBox) return;

    // 1. Собираем уникальные слова из текста
    const rawText = container.textContent || "";
    // Извлекаем только буквы (русские и английские)
    const words = rawText.match(/[а-яА-Яa-zA-ZёЁ]+/g) || []; 
    const uniqueWords = Array.from(new Set(words.map(w => w.toLowerCase()))).filter(w => w.length > 2);

    // Функция поиска и выделения (срабатывает только по нажатию Enter / кнопки)
    function performSearch(term) {
        suggestionsBox.style.display = 'none'; // прячем подсказки

        // Очищаем старые маркеры
        container.querySelectorAll('mark.search-highlight').forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });

        if (!term) {
            // Закрываем все вкладки, если поиск пуст
            container.querySelectorAll('.rules-block.active').forEach(b => {
                b.classList.remove('active');
                b.querySelector('.rules-content').style.maxHeight = "0";
            });
            return;
        }

        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        let firstMatch = null;
        const nodesToReplace = [];

        // Ищем только по текстовым узлам
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentNode.nodeName === 'MARK' || node.parentNode.nodeName === 'SCRIPT') continue;
            if (regex.test(node.nodeValue)) nodesToReplace.push(node);
        }

        nodesToReplace.forEach(node => {
            const span = document.createElement('span');
            span.innerHTML = node.nodeValue.replace(regex, '<mark class="search-highlight">$1</mark>');
            while (span.firstChild) {
                const child = span.firstChild;
                node.parentNode.insertBefore(child, node);
                if (!firstMatch && child.nodeName === 'MARK') firstMatch = child;
            }
            node.parentNode.removeChild(node);
        });

        if (firstMatch) {
            // Открываем аккордеон, где найдено слово
            const allMarks = container.querySelectorAll('mark.search-highlight');
            allMarks.forEach(m => {
                const block = m.closest('.rules-block');
                if (block && !block.classList.contains('active')) {
                    block.classList.add('active');
                    const content = block.querySelector('.rules-content');
                    content.style.maxHeight = content.scrollHeight + 500 + 'px';
                }
            });
            // Прыгаем к первому совпадению
            setTimeout(() => {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    // Обработка подсказок при вводе
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';
        
        if (val.length < 2) {
            suggestionsBox.style.display = 'none';
            if (val.length === 0) performSearch(""); // очистка если стерли текст
            return;
        }

        const matches = uniqueWords.filter(w => w.includes(val)).slice(0, 5); // берем топ 5 слов
        
        if (matches.length > 0) {
            matches.forEach(match => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = match;
                div.addEventListener('click', () => {
                    searchInput.value = match;
                    performSearch(match);
                });
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    // Триггеры самого поиска
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value.trim());
        }
    });

    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });

    // Прятать подсказки при клике вне поиска
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestionsBox.style.display = 'none';
        }
    });
}

function initRulesPage() {
    if (document.getElementById("rulesAccordion")) {
        loadRules();
        const rulesContainer = document.getElementById("rulesAccordion");
        if (rulesContainer) {
            rulesContainer.addEventListener("contextmenu", (e) => e.preventDefault());
            rulesContainer.addEventListener("copy", (e) => e.preventDefault());
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initRulesPage);
} else {
    initRulesPage();
}