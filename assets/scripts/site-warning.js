// =====================================================================
// Предупреждение при посещении сайта
// Показывается на любой странице сайта, пока пользователь сам его
// не отключит (галочка "Больше не показывать").
// Скрипт полностью самостоятельный (сам добавляет свои стили),
// поэтому работает даже на страницах без main.css / global.css.
// =====================================================================
(function () {
    const STORAGE_KEY = "siteWarningDismissed";

    if (localStorage.getItem(STORAGE_KEY) === "true") return;

    function injectStyles() {
        if (document.getElementById("siteWarningStyles")) return;
        const style = document.createElement("style");
        style.id = "siteWarningStyles";
        style.textContent = `
            #siteWarningOverlay {
                position: fixed;
                inset: 0;
                z-index: 999998;
                background: rgba(0, 0, 0, 0.65);
                backdrop-filter: blur(6px);
                -webkit-backdrop-filter: blur(6px);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                font-family: "Roboto", Arial, sans-serif;
                padding: 16px;
                box-sizing: border-box;
            }
            #siteWarningOverlay.show { opacity: 1; pointer-events: all; }
            .site-warning-box {
                background-color: rgba(30, 30, 30, 0.97);
                color: #fff;
                width: 100%;
                max-width: 440px;
                border-radius: 24px;
                padding: 28px 24px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
                transform: scale(0.9);
                transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
            }
            #siteWarningOverlay.show .site-warning-box { transform: scale(1); }
            .site-warning-icon {
                font-size: 32px;
                color: #ffcc00;
                margin-bottom: 12px;
            }
            .site-warning-box h3 { margin: 0 0 12px; font-size: 20px; }
            .site-warning-box p {
                margin: 0 0 20px;
                font-size: 14px;
                line-height: 1.5;
                opacity: 0.85;
            }
            .site-warning-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                justify-content: center;
                margin-bottom: 20px;
                font-size: 13px;
                opacity: 0.9;
                cursor: pointer;
                user-select: none;
            }
            .site-warning-checkbox input {
                width: 16px;
                height: 16px;
                cursor: pointer;
                accent-color: rgb(var(--primary-color, 42, 171, 238));
            }
            #siteWarningCloseBtn {
                width: 100%;
                padding: 12px 20px;
                border: none;
                border-radius: 12px;
                background-color: rgb(var(--primary-color, 42, 171, 238));
                color: #fff;
                font-family: inherit;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s;
            }
            #siteWarningCloseBtn:hover { opacity: 0.85; }
        `;
        document.head.appendChild(style);
    }

    function init() {
        injectStyles();

        const overlay = document.createElement("div");
        overlay.id = "siteWarningOverlay";
        overlay.innerHTML =
            '<div class="site-warning-box">' +
                '<div class="site-warning-icon"><i class="fas fa-exclamation-triangle"></i></div>' +
                '<h3>Предупреждение</h3>' +
                '<p>Этот сайт — личный проект. На нём могут встречаться резкие визуальные эффекты (мигание, глитчи), звук и элементы, сохраняющие ваши настройки в localStorage браузера. Заходя на сайт, вы принимаете это к сведению.</p>' +
                '<label class="site-warning-checkbox">' +
                    '<input type="checkbox" id="siteWarningDontShow" />' +
                    '<span>Больше не показывать это предупреждение</span>' +
                '</label>' +
                '<button id="siteWarningCloseBtn">Понятно, продолжить</button>' +
            '</div>';

        document.body.appendChild(overlay);

        requestAnimationFrame(() => overlay.classList.add("show"));

        document.getElementById("siteWarningCloseBtn").addEventListener("click", () => {
            if (document.getElementById("siteWarningDontShow").checked) {
                localStorage.setItem(STORAGE_KEY, "true");
            }
            overlay.classList.remove("show");
            setTimeout(() => overlay.remove(), 300);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
