const birthDate = new Date('2008-01-02');
const formattedBirthDate = '02.01.2008';

function calculateAge() {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function updateAgeDisplay() {
    const ageElement = document.getElementById('age');
    if (!ageElement) return;

    const calculatedAge = calculateAge();
    ageElement.textContent = calculatedAge;
    ageElement.dataset.hoverText = formattedBirthDate;

    ageElement.addEventListener('mouseover', () => {
        ageElement.textContent = ageElement.dataset.hoverText;
    });

    ageElement.addEventListener('mouseout', () => {
        ageElement.textContent = calculatedAge;
    });
}

const quotes = [
    "Я не рвусь в центр — мне достаточно угла, где тень говорит громче света.",
    "Истинная сила — это когда тебя боятся даже в молчании.",
    "Я миниатюрна, но в моём взгляде — разломы миров.",
    "Маски скучны. Я ношу шрамы, они правдивее.",
    "Неинтересно быть героем, если весь сюжет написан по шаблону.",
    "Я не вру. Мир слишком лжив, чтобы я подыгрывала ему.",
    "Мне не нужно место в эпицентре, если я могу раскачать ось.",
    "В чёрном цвете мне проще быть собой — никто не ждёт улыбки.",
    "Если я молчу — это не тишина. Это буря, которая не считает нужным объясняться.",
    "Меня не спасают. Меня не забывают.",
    "Я не демон и не ангел. Я — то, что остаётся, когда оба смотрят в сторону.",
    "Роль второго плана? Лишь пока не поймут, что сценарий был написан мной.",
    "Ты думаешь, я сломалась. На самом деле — я переформатировалась.",
    "Гетерохромия — лишь метка. Истинное различие — в восприятии.",
    "Если ты хочешь знать правду — спроси меня. Но будь готов выдержать её.",
    "Я не строю легенды. Я дышу в темпе умирающих мифов.",
    "Мне не нужны крылья, чтобы стоять выше небес.",
    "Не бойся тени. Она лишь напоминание, что где-то рядом всё ещё горит свет.",
    "Я слишком реальна, чтобы быть выдумкой, и слишком странная, чтобы быть принята.",
    "Я не стану главной. Но ты всё равно будешь ждать моего появления в каждой сцене.",
    "Я слышала, как трескалась ткань времени — он говорил со мной сквозь неё.",
    "Он видел меня до того, как было придумано слово 'взгляд'.",
    "Я помню его голос — как шёпот на границе вечности и огня.",
    "Я видела небо до того, как оно стало домом для света.",
    "Когда рушится мир — я не плачу. Я наблюдаю.",
    "Я не потерялась — я спряталась в щелях между измерениями.",
    "Мне не нужно имя, чтобы остаться в памяти.",
    "Тишина камеря громче любых вопросов. Особенно, когда я не моргаю.",
    "Он всегда стоял выше, но только я знала, как холодно бывает там, где нет сомнений.",
    "Мне не нужны цепи. Я остаюсь, потому что хочу.",
    "Всё, что обо мне написано, — наблюдение. Всё, что не написано, — угроза.",
    "Я знала, чем он станет, ещё до того, как он отвернулся от Закона.",
    "Мир боится того, что не может классифицировать. Поэтому я — 'аномалия'.",
    "Каждый, кто заглядывал в моё левое око, переставал верить в линейность времени.",
    "Каждый, кто смотрел в моё правое око, начинал слышать эхо своей последней мысли.",
    "Я видела, как огонь прорвал небеса, а крылья падали, не касаясь земли.",
    "Он появился тогда, когда даже свет колебался, стоит ли возвращаться.",
    "Первая встреча была не словом — взгляд. Он не отпрянул.",
   "Я тогда улыбнулась впервые. И мир потрескался по границам между добром и тем, что скрывается за ним.",
    "Мы не сражались. Мы узнали друг друга среди криков павших и тишины Небес.",
    "Он не был спасением. Он был напоминанием, что даже божественное способна дрогнуть.",
    "Некоторые стоят на стороне света. Некоторые — в тени. А я стояла между ним и погибелью, чтобы он сделал выбор.",
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateQuote() {
    const quoteElement = document.getElementById('randomQuote');
    if (quoteElement) {
        quoteElement.textContent = getRandomQuote();
    }
}

const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const menuSidebar = document.getElementById('menuSidebar');

menuBtn.addEventListener('click', () => {
    menuSidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menuSidebar.classList.remove('active');
});

const profileModal = document.getElementById('profileModal');
const skillsModal = document.getElementById('skillsModal');
const projectsModal = document.getElementById('projectsModal');
const settingsModal = document.getElementById('settingsModal');
const achievementsModal = document.getElementById('achievementsModal');

document.getElementById('openProfileModal').addEventListener('click', () => {
    profileModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_profileModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openSkillsModal').addEventListener('click', () => {
    skillsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_skillsModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openProjectsModal').addEventListener('click', () => {
    projectsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_projectsModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openSettingsModal').addEventListener('click', () => {
    settingsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    unlockAchievement('settings_opened');
    checkAllModalsAchievement();
});

document.getElementById('openAchievementsModal').addEventListener('click', () => {
    achievementsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    renderAchievements();
});

document.getElementById('openTerminal').addEventListener('click', () => {
    localStorage.setItem('terminal_visited', 'true');
    unlockAchievement('terminal_visited');
    window.location.href = '/terminal';
    menuSidebar.classList.remove('active');
});
 document.getElementById('openServer').addEventListener('click', () => {
    window.location.href = '/minecraft-server';
    menuSidebar.classList.remove('active');
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Функция для корректировки цвета в зависимости от темы
function adjustColorForTheme(color) {
    if (document.body.classList.contains('light-theme') && color === '255, 255, 255') {
        return '0, 0, 0'; // Заменяем белый на черный в светлой теме
    }
    return color;
}

// Функция для обновления основного цвета
function updatePrimaryColor(color) {
    const adjustedColor = adjustColorForTheme(color);
    document.documentElement.style.setProperty('--primary-color', adjustedColor);
}

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
    
    // Обновляем цвет с учетом новой темы
    const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
    updatePrimaryColor(savedColor);
    
    unlockAchievement('theme_changed');
});

// Цветовые схемы
function initColorSettings() {
    const colorOptions = document.getElementById('colorOptions');
    const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
    
    // Устанавливаем начальный цвет
    updatePrimaryColor(savedColor);
    
    // Отмечаем выбранный цвет
    document.querySelectorAll('.color-option').forEach(option => {
        if (option.dataset.color === savedColor) {
            option.classList.add('selected');
        }
        
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const selectedColor = this.dataset.color;
            localStorage.setItem('primaryColor', selectedColor);
            updatePrimaryColor(selectedColor);
            unlockAchievement('color_changed');
        });
    });
}

const wallpapers = [
    { name: 'Стандартные', file: 'background.jpg' },
    { name: '2 девочки', file: '2girls.jpg' },
    { name: 'Горничная', file: 'made.png' },
    { name: 'Белый фон', file: 'white.jpg' },
    { name: 'Windows 11', file: 'windows11.jpg' },
    { name: 'Новый год', file: 'newyear.jpg' },
    { name: 'Девушка с пушкой', file: 'girl_gun.jpg'},
    { name: 'Нарисованный город', file: 'city_art.jpg'},
    { name: 'Козел симулятор', file: 'goat.png'}
];

function initWallpaperSettings() {
    const wallpapersGrid = document.getElementById('wallpapersGrid');
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';

    wallpapers.forEach(wallpaper => {
        const wallpaperOption = document.createElement('div');
        wallpaperOption.className = `wallpaper-option ${savedWallpaper === wallpaper.file ? 'selected' : ''}`;
        wallpaperOption.dataset.file = wallpaper.file;
        
        const img = document.createElement('img');
        img.className = 'wallpaper-preview';
        img.src = `background/${wallpaper.file}`;
        img.alt = wallpaper.name;
        img.onerror = function() {
            this.src = 'background/background.jpg';
        };
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'wallpaper-name';
        nameSpan.textContent = wallpaper.name;
        
        wallpaperOption.appendChild(img);
        wallpaperOption.appendChild(nameSpan);
        
        wallpaperOption.addEventListener('click', function() {
            document.querySelectorAll('.wallpaper-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const selectedFile = this.dataset.file;
            localStorage.setItem('wallpaper', selectedFile);
            document.body.style.backgroundImage = `url('background/${selectedFile}')`;
            unlockAchievement('wallpaper_changed');
        });
        
        wallpapersGrid.appendChild(wallpaperOption);
    });
}

// Система достижений
const achievements = [
    {
        id: 'first_visit',
        title: 'Первое посещение',
        description: 'Посетить сайт',
        icon: 'fa-door-open',
        unlocked: false,
        date: null
    },
    {
        id: 'settings_opened',
        title: 'Любопытство',
        description: 'Открыть настройки',
        icon: 'fa-cog',
        unlocked: false,
        date: null
    },
    {
        id: 'theme_changed',
        title: 'Смена стиля',
        description: 'Изменить тему',
        icon: 'fa-moon',
        unlocked: false,
        date: null
    },
    {
        id: 'wallpaper_changed',
        title: 'Декоратор',
        description: 'Сменить фон',
        icon: 'fa-image',
        unlocked: false,
        date: null
    },
    {
        id: 'color_changed',
        title: 'Художник',
        description: 'Изменить основной цвет',
        icon: 'fa-palette',
        unlocked: false,
        date: null
    },
    {
        id: 'terminal_visited',
        title: 'Командная строка',
        description: 'Посетить терминал',
        icon: 'fa-terminal',
        unlocked: false,
        date: null
    }
];

function checkAchievements() {
    const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || achievements;
    
    // Проверка первого посещения
    if (!localStorage.getItem('first_visit')) {
        unlockAchievement('first_visit');
        localStorage.setItem('first_visit', new Date().toISOString());
    }
    
    // Обновляем данные в массиве
    achievements.forEach(ach => {
        const savedAch = savedAchievements.find(a => a.id === ach.id);
        if (savedAch) {
            ach.unlocked = savedAch.unlocked;
            ach.date = savedAch.date;
        }
    });
    
    renderAchievements();
}

function unlockAchievement(id) {
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.date = new Date().toISOString();
        localStorage.setItem('achievements', JSON.stringify(achievements));
        
        // Показываем уведомление
        showAchievementNotification(achievement);
        
        return true;
    }
    return false;
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-content">
            <i class="fas ${achievement.icon}"></i>
            <div>
                <div class="achievement-notification-title">Достижение разблокировано!</div>
                <div class="achievement-notification-name">${achievement.title}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.description}</div>
            ${achievement.unlocked ? `<div class="achievement-date">${new Date(achievement.date).toLocaleDateString()}</div>` : ''}
        `;
        
        container.appendChild(achievementCard);
    });
}

function checkAllModalsAchievement() {
    const allModalsOpened = ['profileModal', 'skillsModal', 'projectsModal', 'settingsModal']
        .every(id => localStorage.getItem(`modal_${id}_opened`));
    
    if (allModalsOpened) {
        unlockAchievement('all_modals');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateAgeDisplay();
    updateQuote();
    initColorSettings();
    initWallpaperSettings();
    checkAchievements();
    
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';
    document.body.style.backgroundImage = `url('background/${savedWallpaper}')`;
    
    document.getElementById('profileLink').addEventListener('click', function() {
        window.open('https://t.me/dont65', '_blank');
    });
});
