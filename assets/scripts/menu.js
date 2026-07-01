// Автоматически запускаем загрузку меню
(async function initGlobalMenu() {
    try {
        // Умный поиск файла меню. Он попробует все эти пути по очереди, пока не найдет нужный!
        const pathsToTry = [
            '/assets/components/menu/menu.html',   // Идеальный путь (от корня)
            './assets/components/menu/menu.html',  // Относительный путь
            '../assets/components/menu/menu.html', // Если загружается со страницы правил
            '/assets/components/menu.html',        // Если файл забыли переложить в новую папку
            './assets/components/menu.html',
            '../assets/components/menu.html'
        ];

        let html = null;

        for (const path of pathsToTry) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    html = await response.text();
                    console.log(`✅ Меню успешно найдено и загружено по пути: ${path}`);
                    break; // Нашли файл! Выходим из цикла
                }
            } catch (e) {
                // Ошибка сети или CORS (игнорируем и пробуем следующий путь)
            }
        }

        if (html) {
            // Вставляем меню на страницу
            document.body.insertAdjacentHTML('beforeend', html);
            initMenuLogic(); // Активируем кнопки
        } else {
            console.error("❌ КРИТИЧЕСКАЯ ОШИБКА: Файл menu.html не найден ни по одному из путей! Проверь, существует ли он в папке assets/components/menu/");
        }

    } catch (error) {
        console.error("❌ Сбой в функции загрузки меню:", error);
    } finally {
        // ВАЖНО: В любом случае отправляем сигнал остальным скриптам, 
        // чтобы цитаты, снег и настройки загрузились, даже если меню сломалось!
        document.dispatchEvent(new Event("menuLoaded"));
    }
})();

function initMenuLogic() {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const menuSidebar = document.getElementById("menuSidebar");

    // Защита от ошибок: добавляем события только если элементы существуют
    if (menuSidebar) {
        if (menuBtn) menuBtn.addEventListener("click", () => menuSidebar.classList.add("active"));
        if (closeBtn) closeBtn.addEventListener("click", () => menuSidebar.classList.remove("active"));
    }

    // Открытие модальных окон
    const modalMap = {
        "openProfileModal": "profileModal",
        "openSkillsModal": "skillsModal",
        "openProjectsModal": "projectsModal",
        "openAchievementsModal": "achievementsModal",
        "openSettingsModal": "settingsModal"
    };

    for (const [btnId, modalId] of Object.entries(modalMap)) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        
        if (btn && modal && menuSidebar) {
            btn.addEventListener("click", () => {
                menuSidebar.classList.remove("active");
                modal.classList.add("active");
                // Генерируем событие для системы достижений
                document.dispatchEvent(new CustomEvent("modalOpened", { detail: modalId }));
            });
        }
    }

    // Ссылки на другие страницы
    const terminalBtn = document.getElementById("openTerminal");
    if (terminalBtn) {
        terminalBtn.addEventListener("click", () => {
            localStorage.setItem("terminal_visited", "true");
            document.dispatchEvent(new Event("terminalVisited"));
            window.location.href = "/terminal";
        });
    }

    const serverBtn = document.getElementById("openServer");
    if (serverBtn) serverBtn.addEventListener("click", () => window.location.href = "/minecraft-server");

    const rulesBtn = document.getElementById("openRules");
    if (rulesBtn) rulesBtn.addEventListener("click", () => window.location.href = "/chat-rules");

    // Логика закрытия модальных окон
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const modal = e.target.closest(".modal");
            if (modal) modal.classList.remove("active");
        });
    });

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    });
}