
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
    {text: "Бог дал нам крылья, но мы их отрезали", author: "Неизвестный"},
    {text: "А чтобы я больше не ныл, ты ебани меня лопатой", author: "ЖЩ"},
    {text: "Я буду пить, пока не станет плохо", author: "ЖЩ"},
    {text: "Иногда мы притворяемся глупыми, чтобы ничего не делать", author:"Dont65"},
    {text:"Преждевременная оптимизация — корень всех зол.", author:"Дональд Кнут"},
    {text:"Лучший способ предсказать будущее — это изобрести его.", author:"Алан Кей"},
    {text:"Я использую Arch (btw).", author:"Интернет-мем"},
    {text:"Если долго всматриваться в бездну, бездна начнет всматриваться в тебя", author:"Ницше"},
    {text:"Ты существуешь только в настоящем — этом едином мгновении, — и ты лишь неразумно расточаешь его, словно тебе уготованы целые тысячелетия.", author:"Марк Аврелий"},
    {text:"Быть самим собой — значит быть тем, кто ты есть, в самой глубинной своей основе, beyond надеждой и страхом.", author:"Сёрен Кьеркегор"},
    {text:"Ты становишься ответственным навсегда за того, кого приручил.", author:"Антуан де Сент-Экзюпери"},
    {text:"Мы — это то, что мы делаем снова и снова. Таким образом, совершенство — это не действие, а привычка.", author:"Аристотель"},
    {text:"Тот, кто смотрит вовне — спит, тот, кто смотрит в себя — пробуждается.", author:"Карл Густав Юнг"},
    {text:"Свобода состоит в том, чтобы полагаться на законы, которые мы сами для себя установили.", author:"Жан-Жак Руссо"},
    {text:"Безумие — это точное повторение одного и того же действия, раз за разом, в надежде на изменение. Это и есть безумие", author:"Ваас Монтенегро"}


];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateQuote() {
    const quoteElement = document.getElementById('randomQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
        const randomQuote = getRandomQuote();
        
        quoteElement.style.opacity = '0';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = randomQuote.text;
            authorElement.textContent = randomQuote.author;
            
            quoteElement.style.opacity = '1';
            authorElement.style.opacity = '1';
        }, 300);
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
        title: 'Добро пожаловать!',
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
        title: 'Ааа, флешка',
        description: 'Изменить тему на белую',
        icon: 'fa-sun',
        unlocked: false,
        date: null
    },
    {
        id: 'wallpaper_changed',
        title: 'Тут есть фоны?',
        description: 'Сменить фон',
        icon: 'fa-image',
        unlocked: false,
        date: null
    },
    {
        id: 'color_changed',
        title: 'Я дизайнер, я так вижу',
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

document.getElementById('refreshQuoteBtn').addEventListener('click', function() {
    updateQuote();
   
    this.classList.add('rotating');
    setTimeout(() => {
        this.classList.remove('rotating');
    }, 1000);
});
