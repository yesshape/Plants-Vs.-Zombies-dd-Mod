// 移动端菜单切换
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// 关闭移动菜单当点击链接时
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// 当前语言状态
let currentLang = 'zh';

// 当前主题状态
let currentTheme = 'light';

// 切换语言函数
function switchLanguage(lang) {
    currentLang = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang${lang === 'zh' ? 'Zh' : 'En'}`).classList.add('active');
    
    // 切换所有有data-lang属性的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
    
    // 重新渲染植物和僵尸（使用当前语言）
    renderPlants(currentFilter.plants);
    renderZombies(currentFilter.zombies);
    
    // 更新滚动位置显示
    updateScrollPosition('plants');
    updateScrollPosition('zombies');
}

// 切换主题函数
function switchTheme(theme) {
    currentTheme = theme;
    document.body.className = `${theme}-mode`;
    
    // 更新主题按钮图标和文本
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn.querySelector('i');
    const themeTexts = document.querySelectorAll('.theme-text');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeTexts.forEach(text => {
            if (text.getAttribute('data-lang') === currentLang) {
                text.textContent = currentLang === 'zh' ? '亮色模式' : 'Light Mode';
            }
        });
    } else {
        icon.className = 'fas fa-moon';
        themeTexts.forEach(text => {
            if (text.getAttribute('data-lang') === currentLang) {
                text.textContent = currentLang === 'zh' ? '暗色模式' : 'Dark Mode';
            }
        });
    }
    
    // 保存主题偏好到localStorage
    localStorage.setItem('pvz-dd-theme', theme);
}

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('pvz-dd-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        switchTheme(savedTheme);
    } else if (prefersDark) {
        switchTheme('dark');
    } else {
        switchTheme('light');
    }
}

// 植物数据 - 更新为包含中英文名称，并将图片改为SVG格式
const plantsData = [
    {
        id: 1,
        name: "豌豆射手",
        nameEn: "Peashooter",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "发射豌豆攻击僵尸，是最基础的攻击植物。",
        descEn: "Shoots peas at zombies, the most basic attacking plant.",
        icon: "fa-bullseye",
        imageName: "Peashooter.svg"
    },
    {
        id: 2,
        name: "双发射手",
        nameEn: "Repeater",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "一次发射两颗豌豆，伤害是普通豌豆的两倍。",
        descEn: "Shoots two peas at once, dealing double damage.",
        icon: "fa-bullseye",
        imageName: "Repeater.svg"
    },
    {
        id: 3,
        name: "三发射手",
        nameEn: "Tri-peater",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "一次发射三颗豌豆，伤害是普通豌豆的三倍。",
        descEn: "Shoots three peas at once, dealing triple damage.",
        icon: "fa-bullseye",
        imageName: "Tri-peater.svg"
    },
    {
        id: 4,
        name: "机枪射手",
        nameEn: "Gatling Pea",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "快速发射多颗豌豆，是强大的攻击植物。",
        descEn: "Rapidly fires multiple peas, a powerful attacking plant.",
        icon: "fa-bullseye",
        imageName: "Gatling Pea.svg"
    },
    {
        id: 5,
        name: "中级机枪射手",
        nameEn: "Alpha-gatling Pea",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "机枪射手的升级版，射速和伤害都有提升。",
        descEn: "Upgraded version of Gatling Pea with increased firing speed and damage.",
        icon: "fa-bullseye",
        imageName: "Alpha-gatling Pea.svg"
    },
    {
        id: 6,
        name: "高级机枪射手",
        nameEn: "Beta-gatling Pea",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "机枪射手的最终形态，拥有极高的射速和伤害。",
        descEn: "Final form of Gatling Pea with extremely high firing speed and damage.",
        icon: "fa-bullseye",
        imageName: "Beta-gatling Pea.svg"
    },
    {
        id: 7,
        name: "向日葵",
        nameEn: "Sunflower",
        type: "support",
        typeText: "辅助型",
        typeTextEn: "Support Type",
        desc: "生产阳光，为种植其他植物提供资源。",
        descEn: "Produces sun, providing resources for planting other plants.",
        icon: "fa-sun",
        imageName: "Sunflower.svg"
    },
    {
        id: 8,
        name: "双子向日葵",
        nameEn: "Twin Sunflower",
        type: "support",
        typeText: "辅助型",
        typeTextEn: "Support Type",
        desc: "生产双倍阳光，是向日葵的升级版。",
        descEn: "Produces double sun, an upgraded version of Sunflower.",
        icon: "fa-sun",
        imageName: "Twin Sunflower.svg"
    },
    {
        id: 9,
        name: "阳光射手",
        nameEn: "Sunshooter",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "既能攻击僵尸又能产生阳光的特殊植物。",
        descEn: "Special plant that can both attack zombies and produce sun.",
        icon: "fa-sun",
        imageName: "Sunshooter.svg"
    },
    {
        id: 10,
        name: "双发阳光射手",
        nameEn: "Sun Repeater",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "一次发射两颗豌豆并产生阳光的植物。",
        descEn: "Plant that shoots two peas at once and produces sun.",
        icon: "fa-sun",
        imageName: "Sun Repeater.svg"
    },
    {
        id: 11,
        name: "三发阳光射手",
        nameEn: "Tri-Sun peater",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "一次发射三颗豌豆并产生阳光的植物。",
        descEn: "Plant that shoots three peas at once and produces sun.",
        icon: "fa-sun",
        imageName: "Tri-Sun peater.svg"
    },
    {
        id: 12,
        name: "机枪阳光射手",
        nameEn: "Gatling Sun",
        type: "attack",
        typeText: "攻击型",
        typeTextEn: "Attack Type",
        desc: "快速发射豌豆并大量产生阳光的强大植物。",
        descEn: "Powerful plant that rapidly fires peas and produces large amounts of sun.",
        icon: "fa-sun",
        imageName: "Gatling Sun.svg"
    }
];

// 僵尸数据 - 更新为包含中英文名称
const zombiesData = [
    {
        id: 1,
        name: "普通僵尸",
        nameEn: "Zombie",
        type: "normal",
        typeText: "普通型",
        typeTextEn: "Normal Type",
        desc: "最基本的僵尸，移动缓慢，生命值较低。",
        descEn: "Most basic zombie, slow moving with low health.",
        icon: "fa-user",
        imageName: "Zombie.png"
    },
    {
        id: 2,
        name: "路障僵尸",
        nameEn: "Conehead Zombie",
        type: "normal",
        typeText: "普通型",
        typeTextEn: "Normal Type",
        desc: "头戴路障，拥有比普通僵尸更高的生命值。",
        descEn: "Wears a cone on head, has higher health than normal zombie.",
        icon: "fa-hard-hat",
        imageName: "Conehead Zombie.png"
    },
    {
        id: 3,
        name: "铁桶僵尸",
        nameEn: "Buckethead Zombie",
        type: "normal",
        typeText: "普通型",
        typeTextEn: "Normal Type",
        desc: "头戴铁桶，拥有极高的生命值。",
        descEn: "Wears a bucket on head, has extremely high health.",
        icon: "fa-hard-hat",
        imageName: "Buckethead Zombie.png"
    },
    {
        id: 4,
        name: "撑杆跳僵尸",
        nameEn: "Pole Vaulting Zombie",
        type: "special",
        typeText: "特殊型",
        typeTextEn: "Special Type",
        desc: "能用杆子跳过第一个植物，直接攻击后方植物。",
        descEn: "Can use pole to jump over the first plant and attack plants behind.",
        icon: "fa-running",
        imageName: "Pole Vaulting Zombie.png"
    },
    {
        id: 5,
        name: "舞王僵尸",
        nameEn: "Dancing Zombie",
        type: "special",
        typeText: "特殊型",
        typeTextEn: "Special Type",
        desc: "出场时会召唤伴舞僵尸，每30秒会再次召唤。",
        descEn: "Summons backup dancers when appearing, and summons again every 30 seconds.",
        icon: "fa-music",
        imageName: "Dancing Zombie.png"
    },
    {
        id: 6,
        name: "巨人僵尸",
        nameEn: "Gargantuar",
        type: "boss",
        typeText: "BOSS型",
        typeTextEn: "BOSS Type",
        desc: "拥有超高生命值，会投掷小鬼僵尸，需要集中火力应对。",
        descEn: "Has extremely high health, throws imp zombies, requires concentrated fire.",
        icon: "fa-people-carry",
        imageName: "Gargantuar.png"
    }
];

// 当前过滤器状态
const currentFilter = {
    plants: 'all',
    zombies: 'all'
};

// 滚动状态
const scrollState = {
    plants: {
        currentIndex: 0,
        visibleCards: 0
    },
    zombies: {
        currentIndex: 0,
        visibleCards: 0
    }
};

// 计算可见卡片数量
function calculateVisibleCards(type) {
    const container = document.getElementById(`${type}ScrollContainer`);
    const card = document.querySelector(`#${type}Grid .pedia-card`);
    
    if (!container || !card) return 0;
    
    const containerWidth = container.clientWidth;
    const cardWidth = card.offsetWidth + 30; // 30px是gap
    return Math.floor(containerWidth / cardWidth);
}

// 更新滚动位置显示
function updateScrollPosition(type) {
    const state = scrollState[type];
    const totalItems = type === 'plants' ? 
        (currentFilter.plants === 'all' ? plantsData.length : plantsData.filter(p => p.type === currentFilter.plants).length) :
        (currentFilter.zombies === 'all' ? zombiesData.length : zombiesData.filter(z => z.type === currentFilter.zombies).length);
    
    // 计算总页数
    const totalPages = Math.ceil(totalItems / state.visibleCards);
    const currentPage = Math.min(totalPages, Math.floor(state.currentIndex / state.visibleCards) + 1);
    
    document.getElementById(`${type}Position`).textContent = `${currentPage}/${totalPages}`;
    
    // 更新滚动按钮状态
    const leftBtn = document.getElementById(`${type}ScrollLeft`);
    const rightBtn = document.getElementById(`${type}ScrollRight`);
    
    leftBtn.disabled = state.currentIndex === 0;
    rightBtn.disabled = state.currentIndex >= totalItems - state.visibleCards;
}

// 滚动到指定位置
function scrollToPosition(type, index) {
    const container = document.getElementById(`${type}ScrollContainer`);
    const card = document.querySelector(`#${type}Grid .pedia-card`);
    
    if (!container || !card) return;
    
    const cardWidth = card.offsetWidth + 30; // 30px是gap
    container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });
    
    scrollState[type].currentIndex = index;
    updateScrollPosition(type);
}

// 渲染植物卡片
function renderPlants(filter = 'all') {
    const plantsGrid = document.getElementById('plantsGrid');
    plantsGrid.innerHTML = '';
    
    const filteredPlants = filter === 'all' 
        ? plantsData 
        : plantsData.filter(plant => plant.type === filter);
    
    filteredPlants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.className = 'pedia-card';
        
        const plantName = currentLang === 'zh' ? plant.name : plant.nameEn;
        const plantDesc = currentLang === 'zh' ? plant.desc : plant.descEn;
        const plantType = currentLang === 'zh' ? plant.typeText : plant.typeTextEn;
        
        // 使用新的SVG图片路径
        const imagePath = `images/Almanac/Plants Tab/${plant.imageName}`;
        
        plantCard.innerHTML = `
            <div class="pedia-img plant-img">
                <img src="${imagePath}" alt="${plantName}" onerror="this.onerror=null; this.src='https://placehold.co/280x200/bbf201/ffffff?text=${plantName}';">
            </div>
            <div class="pedia-info">
                <div class="pedia-name">${plantName}</div>
                ${currentLang === 'zh' && plant.nameEn ? `<div class="pedia-name-en">${plant.nameEn}</div>` : ''}
                ${currentLang === 'en' && plant.name ? `<div class="pedia-name-en">${plant.name}</div>` : ''}
                <div class="pedia-type">${plantType}</div>
                <p class="pedia-desc">${plantDesc}</p>
            </div>
        `;
        plantsGrid.appendChild(plantCard);
    });
    
    // 重置滚动位置
    scrollState.plants.currentIndex = 0;
    scrollState.plants.visibleCards = calculateVisibleCards('plants');
    updateScrollPosition('plants');
    
    // 延迟滚动到开始位置
    setTimeout(() => {
        scrollToPosition('plants', 0);
    }, 100);
}

// 渲染僵尸卡片
function renderZombies(filter = 'all') {
    const zombiesGrid = document.getElementById('zombiesGrid');
    zombiesGrid.innerHTML = '';
    
    const filteredZombies = filter === 'all' 
        ? zombiesData 
        : zombiesData.filter(zombie => zombie.type === filter);
    
    filteredZombies.forEach(zombie => {
        const zombieCard = document.createElement('div');
        zombieCard.className = 'pedia-card';
        
        const zombieName = currentLang === 'zh' ? zombie.name : zombie.nameEn;
        const zombieDesc = currentLang === 'zh' ? zombie.desc : zombie.descEn;
        const zombieType = currentLang === 'zh' ? zombie.typeText : zombie.typeTextEn;
        
        // 使用新的图片路径（保持PNG格式）
        const imagePath = `images/Almanac/Zombies Tab/${zombie.imageName}`;
        
        zombieCard.innerHTML = `
            <div class="pedia-img zombie-img">
                <img src="${imagePath}" alt="${zombieName}" onerror="this.onerror=null; this.src='https://placehold.co/280x200/91928a/ffffff?text=${zombieName}';">
            </div>
            <div class="pedia-info">
                <div class="pedia-name">${zombieName}</div>
                ${currentLang === 'zh' && zombie.nameEn ? `<div class="pedia-name-en">${zombie.nameEn}</div>` : ''}
                ${currentLang === 'en' && zombie.name ? `<div class="pedia-name-en">${zombie.name}</div>` : ''}
                <div class="pedia-type zombie-type">${zombieType}</div>
                <p class="pedia-desc">${zombieDesc}</p>
            </div>
        `;
        zombiesGrid.appendChild(zombieCard);
    });
    
    // 重置滚动位置
    scrollState.zombies.currentIndex = 0;
    scrollState.zombies.visibleCards = calculateVisibleCards('zombies');
    updateScrollPosition('zombies');
    
    // 延迟滚动到开始位置
    setTimeout(() => {
        scrollToPosition('zombies', 0);
    }, 100);
}

// 图片占位符生成器（用于演示）
function generateImagePlaceholders() {
    // 检查图片是否存在，如果不存在则使用占位符
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // 如果图片加载失败，用占位符替换
        img.onerror = function() {
            const parent = this.parentElement;
            if (parent.classList.contains('intro-image')) {
                this.src = `https://placehold.co/600x400/bbf201/ffffff?text=Game+Screenshot`;
            } else if (parent.classList.contains('features-image')) {
                this.src = `https://placehold.co/600x400/bbf201/ffffff?text=Features+Showcase`;
            } else if (parent.classList.contains('hero')) {
                // 对于背景图片，我们无法用onerror检测，所以这里不处理
            }
        };
    });
}

// 初始化图鉴和功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 主题切换事件
    document.getElementById('themeToggle').addEventListener('click', () => {
        switchTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    // 初始化语言
    switchLanguage('zh');
    
    // 语言切换事件
    document.getElementById('langZh').addEventListener('click', () => switchLanguage('zh'));
    document.getElementById('langEn').addEventListener('click', () => switchLanguage('en'));
    
    // 初始化渲染
    renderPlants();
    renderZombies();
    generateImagePlaceholders();
    
    // 植物过滤器
    document.querySelectorAll('#plants .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 只处理当前语言的按钮
            if (this.style.display !== 'none') {
                // 更新活动按钮
                document.querySelectorAll('#plants .filter-btn').forEach(b => {
                    if (b.style.display !== 'none') {
                        b.classList.remove('active');
                    }
                });
                this.classList.add('active');
                
                // 根据过滤条件渲染植物
                const filter = this.getAttribute('data-filter');
                currentFilter.plants = filter;
                renderPlants(filter);
            }
        });
    });
    
    // 僵尸过滤器
    document.querySelectorAll('#zombies .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // 只处理当前语言的按钮
            if (this.style.display !== 'none') {
                // 更新活动按钮
                document.querySelectorAll('#zombies .filter-btn').forEach(b => {
                    if (b.style.display !== 'none') {
                        b.classList.remove('active');
                    }
                });
                this.classList.add('active');
                
                // 根据过滤条件渲染僵尸
                const filter = this.getAttribute('data-filter');
                currentFilter.zombies = filter;
                renderZombies(filter);
            }
        });
    });
    
    // 水平滚动事件处理
    function setupHorizontalScroll(type) {
        const container = document.getElementById(`${type}ScrollContainer`);
        const leftBtn = document.getElementById(`${type}ScrollLeft`);
        const rightBtn = document.getElementById(`${type}ScrollRight`);
        
        if (!container) return;
        
        // Shift+鼠标滚轮水平滚动
        container.addEventListener('wheel', function(e) {
            if (e.shiftKey) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        });
        
        // 普通鼠标滚轮也支持水平滚动（在水平滚动容器上）
        container.addEventListener('wheel', function(e) {
            if (!e.shiftKey && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        });
        
        // 滚动按钮事件
        leftBtn.addEventListener('click', function() {
            const newIndex = Math.max(0, scrollState[type].currentIndex - scrollState[type].visibleCards);
            scrollToPosition(type, newIndex);
        });
        
        rightBtn.addEventListener('click', function() {
            const totalItems = type === 'plants' ? 
                (currentFilter.plants === 'all' ? plantsData.length : plantsData.filter(p => p.type === currentFilter.plants).length) :
                (currentFilter.zombies === 'all' ? zombiesData.length : zombiesData.filter(z => z.type === currentFilter.zombies).length);
            
            const newIndex = Math.min(
                totalItems - scrollState[type].visibleCards,
                scrollState[type].currentIndex + scrollState[type].visibleCards
            );
            scrollToPosition(type, newIndex);
        });
        
        // 监听滚动事件更新位置
        container.addEventListener('scroll', function() {
            const card = document.querySelector(`#${type}Grid .pedia-card`);
            if (!card) return;
            
            const cardWidth = card.offsetWidth + 30;
            const newIndex = Math.round(container.scrollLeft / cardWidth);
            
            if (newIndex !== scrollState[type].currentIndex) {
                scrollState[type].currentIndex = newIndex;
                updateScrollPosition(type);
            }
        });
    }
    
    // 设置植物和僵尸的水平滚动
    setupHorizontalScroll('plants');
    setupHorizontalScroll('zombies');
    
    // 窗口大小改变时重新计算可见卡片
    window.addEventListener('resize', function() {
        scrollState.plants.visibleCards = calculateVisibleCards('plants');
        scrollState.zombies.visibleCards = calculateVisibleCards('zombies');
        updateScrollPosition('plants');
        updateScrollPosition('zombies');
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // 只处理当前语言的链接
            if (this.style.display !== 'none') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 添加活动指示器到导航栏
    function updateNavIndicator() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            // 只处理当前语言的链接
            if (link.style.display !== 'none') {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', updateNavIndicator);
    
    // 初始化导航指示器
    updateNavIndicator();
    
    // 作者网站链接新窗口打开
    document.querySelectorAll('.author-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            // 确保只处理当前语言的链接
            if (this.style.display !== 'none') {
                // 链接已经在HTML中设置了target="_blank"，这里不需要额外处理
                // 只需要确保链接是当前语言显示的
            }
        });
    });
    
    // 初始化计算可见卡片数量
    setTimeout(() => {
        scrollState.plants.visibleCards = calculateVisibleCards('plants');
        scrollState.zombies.visibleCards = calculateVisibleCards('zombies');
        updateScrollPosition('plants');
        updateScrollPosition('zombies');
    }, 500);
});