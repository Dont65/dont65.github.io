document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/assets/components/menu.html');
        if (!response.ok) throw new Error("Не удалось загрузить меню");
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        initMenuLogic();
    } catch (error) {
        console.error("Ошибка загрузки глобального меню:", error);
    }
});

function initMenuLogic() {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const menuSidebar = document.getElementById("menuSidebar");

    if (menuBtn) menuBtn.addEventListener("click", () => menuSidebar.classList.add("active"));
    if (closeBtn) closeBtn.addEventListener("click", () => menuSidebar.classList.remove("active"));

    // Открытие модалок
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
        if (btn && modal) {
            btn.addEventListener("click", () => {
                menuSidebar.classList.remove("active");
                modal.classList.add("active");
                // Генерируем событие для системы достижений
                document.dispatchEvent(new CustomEvent("modalOpened", { detail: modalId }));
            });
        }
    }

    // Линки на другие страницы
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

    // Закрытие модалок
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", (e) => e.target.closest(".modal").classList.remove("active"));
    });

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    });

    // Оповещаем main.js, что интерфейс загружен и можно привязывать эффекты
    document.dispatchEvent(new Event("menuLoaded"));
}