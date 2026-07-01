function parseMarkdownLinks(text) {
    if (!text) return "";

    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

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
        if (block.id) rulesBlock.dataset.id = block.id;

        const rulesHeader = document.createElement("div");
        rulesHeader.className = "rules-header";
        rulesHeader.innerHTML = `
            <h2><i class="${block.icon || "fas fa-circle"}"></i> ${block.title}</h2>
            <span class="rules-indicator"><i class="fas fa-chevron-right"></i></span>
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
        } else {
            const emptyMessage = document.createElement("div");
            emptyMessage.className = "rule-item";
            emptyMessage.textContent = "Пункты правил отсутствуют.";
            rulesContent.appendChild(emptyMessage);
        }

        rulesBlock.appendChild(rulesHeader);
        rulesBlock.appendChild(rulesContent);
        accordionContainer.appendChild(rulesBlock);
    });

    initAccordion();
}

function showError(message) {
    const accordionContainer = document.getElementById("rulesAccordion");
    accordionContainer.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
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
                    const otherContent = otherBlock.querySelector(".rules-content");
                    otherContent.style.maxHeight = "0";
                }
            });

            if (!isActive) {
                block.classList.add("active");
                content.style.maxHeight = content.scrollHeight + 50 + "px";
            }
        });
    });
}

// Запускаем напрямую, так как мы на странице правил
// Надежный запуск скрипта страницы правил
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

// Проверяем, загрузилась ли уже страница
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initRulesPage);
} else {
    initRulesPage(); // Если уже загрузилась - запускаем сразу
}
