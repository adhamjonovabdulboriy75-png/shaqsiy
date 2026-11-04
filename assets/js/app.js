document.addEventListener('DOMContentLoaded', () => {
    // 1. ISMNI HARFMA-HARF YOZISH
    const heroName = document.querySelector('.hero-name');

    if (heroName) {
        const name = heroName.textContent.trim();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduceMotion) {
            heroName.textContent = '';
            let index = 0;

            const typeName = () => {
                if (index < name.length) {
                    heroName.textContent += name[index];
                    index++;
                    setTimeout(typeName, 100);
                }
            };

            typeName();
        }
    }

    // 2. TELEFON UCHUN MOBIL MENYU
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    function closeMenu() {
        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove('open');
        navigation.classList.remove('open');
        document.body.classList.remove('menu-open');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Menyuni ochish');
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('open');

            navigation.classList.toggle('open', isOpen);
            document.body.classList.toggle('menu-open', isOpen);

            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Menyuni yopish' : 'Menyuni ochish');
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) {
                closeMenu();
            }
        });
    }

    // 3. BO'LIMLARGA YUMSHOQ O'TISH
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // 4. KO'NIKMA CHIZIQLARI ANIMATSIYASI
    const progressBars = document.querySelectorAll('.progress span[data-width]');

    const progressObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width;

                    bar.style.transition = 'width 1.2s ease';
                    bar.style.width = width;

                    observer.unobserve(bar);
                }
            });
        },
        { threshold: 0.3 }
    );

    progressBars.forEach((bar) => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // 5. KARTOCHKALARNI PAYDO QILISH
    const revealElements = document.querySelectorAll('.reveal');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add('revealed');
        });
    }

    // 6. MENYUDA JORIY BO'LIMNI BELGILASH
    const sections = document.querySelectorAll('main section[id]');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive = link.getAttribute('href') === `#${currentId}`;

                        link.classList.toggle('active', isActive);

                        if (isActive) {
                            link.setAttribute('aria-current', 'location');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                });
            },
            {
                rootMargin: '-25% 0px -60% 0px',
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // 7. TEPAGA QAYTISH TUGMASI
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        const updateButton = () => {
            backToTop.classList.toggle('show', window.scrollY > 350);
        };

        window.addEventListener('scroll', updateButton, {
            passive: true,
        });

        updateButton();

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
        });
    }
    const year = document.querySelector('#current-year');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    console.log('Abdulboriy portfolio sayti ishga tushdi!');
});

const heroName = document.querySelector('.hero-name');

if (heroName) {
    const name = 'Abdulboriy';
    let index = 0;

    heroName.textContent = '';

    function typeName() {
        if (index < name.length) {
            heroName.textContent += name[index];
            index++;
            setTimeout(typeName, 180);
        } else {
            setTimeout(() => {
                heroName.textContent = '';
                index = 0;
                typeName();
            }, 700);
        }
    }

    typeName();
}

// =====================================
// ABDULBORIY - 3 TILLI SAYT
// UZBEK / RUSSIAN / ENGLISH
// =====================================

(() => {
    const translations = {
        uz: {
            nav: ['Men haqimda', 'Ko‘nikmalarim', 'Loyihalarim', 'Aloqa'],
            heroBadge: 'SALOM! MEN ABDULBORIYMAN',
            heroTitle: "Salom, men <span class='hero-name'>Abdulboriy</span>",
            role: 'Frontend Developer',
            heroText:
                'Men zamonaviy, chiroyli va barcha qurilmalarga mos veb-saytlar yarataman. HTML, CSS va JavaScript yordamida g‘oyalarni haqiqiy loyihalarga aylantiraman.',
            projectsButton: 'Loyihalarimni ko‘rish →',
            aboutButton: 'Men haqimda',
            follow: 'MENI KUZATING',
            scroll: 'PASTGA TUSHING ↓',

            aboutBadge: 'MEN HAQIMDA',
            aboutTitle: 'Abdulboriy — <span>Frontend Developer</span>',
            aboutText:
                'Men zamonaviy va professional veb-saytlar yaratishga qiziqaman. HTML, CSS, JavaScript, Figma va boshqa vositalardan foydalanib, dizaynlarni veb-sahifalarga aylantiraman. Maqsadim — bilimimni rivojlantirish, yangi texnologiyalarni o‘rganish va sifatli loyihalar yaratish.',
            contactLink: 'Men bilan bog‘lanish →',

            skillsBadge: 'MENING BILIMLARIM',
            skillsTitle: 'Ko‘nikmalarim<span>.</span>',
            skillsDescription: 'Men foydalanadigan texnologiyalar va vositalar.',

            skillDescriptions: [
                'Veb-sahifalarning tuzilishini yaratish.',
                'Dizayn, ranglar va moslashuvchan maketlar.',
                'Saytga interaktiv imkoniyatlar qo‘shish.',
                'Interfeys va veb-sayt dizaynlarini tayyorlash.',
                'Kodsiz vositalar yordamida sahifalar yaratish.',
                'Dasturlash asoslarini o‘rganish va mashq qilish.',
                'Google xizmatlari va onlayn vositalar.',
                'React asosida zamonaviy va tezkor saytlar yaratish.',
            ],
            skillLabel: 'Ko‘nikma',
            learning: 'O‘rganilmoqda',
            status: 'Holati',
            direction: 'Yo‘nalish',
            services: 'Xizmatlar',

            projectsBadge: 'MENING ISHLARIM',
            projectsTitle: 'Loyihalarim<span>.</span>',
            projectsDescription: 'Men yaratgan va ishlab chiqayotgan veb-loyihalar.',
            projectTitles: ['Shaxsiy portfolio', 'Landing Page', 'Online Store'],
            projectDescriptions: [
                'Ko‘nikmalar va loyihalarni namoyish etuvchi sayt.',
                'Biznes va xizmatlar uchun zamonaviy sahifa.',
                'Mahsulotlarni namoyish etuvchi internet-do‘kon.',
            ],
            details: 'Batafsil →',

            contactBadge: 'ALOQA',
            contactTitle: 'Birgalikda loyiha yaratamiz!',
            contactDescription: 'Savol yoki taklifingiz bo‘lsa, men bilan bog‘laning.',
            instagramButton: 'Instagram orqali bog‘lanish ↗',
            contactHeading: 'MEN BILAN BOG‘LANING',
            contactButton: 'ALOQA',
            footerRights: 'Barcha huquqlar himoyalangan.',
            top: 'Tepaga ↑',
            language: 'Til',
        },

        ru: {
            nav: ['Обо мне', 'Навыки', 'Проекты', 'Контакты'],
            heroBadge: 'ПРИВЕТ! Я АБДУЛБОРИЙ',
            heroTitle: "Привет, я <span class='hero-name'>Абдулборий</span>",
            role: 'Frontend-разработчик',
            heroText:
                'Я создаю современные, красивые и адаптивные веб-сайты. С помощью HTML, CSS и JavaScript превращаю идеи в реальные проекты.',
            projectsButton: 'Посмотреть проекты →',
            aboutButton: 'Обо мне',
            follow: 'СЛЕДИТЕ ЗА МНОЙ',
            scroll: 'ПРОКРУТИТЕ ВНИЗ ↓',

            aboutBadge: 'ОБО МНЕ',
            aboutTitle: 'Абдулборий — <span>Frontend-разработчик</span>',
            aboutText:
                'Мне нравится создавать современные и профессиональные веб-сайты. Используя HTML, CSS, JavaScript, Figma и другие инструменты, я превращаю дизайн в веб-страницы. Моя цель — развивать свои знания, изучать новые технологии и создавать качественные проекты.',
            contactLink: 'Связаться со мной →',

            skillsBadge: 'МОИ ЗНАНИЯ',
            skillsTitle: 'Мои навыки<span>.</span>',
            skillsDescription: 'Технологии и инструменты, которыми я пользуюсь.',

            skillDescriptions: [
                'Создание структуры веб-страниц.',
                'Дизайн, цвета и адаптивная вёрстка.',
                'Добавление интерактивности на сайт.',
                'Создание интерфейсов и дизайна сайтов.',
                'Создание страниц с помощью no-code инструментов.',
                'Изучение основ программирования.',
                'Сервисы Google и онлайн-инструменты.',
                'Создание современных сайтов на основе React.',
            ],
            skillLabel: 'Навык',
            learning: 'Изучаю',
            status: 'Статус',
            direction: 'Направление',
            services: 'Сервисы',

            projectsBadge: 'МОИ РАБОТЫ',
            projectsTitle: 'Мои проекты<span>.</span>',
            projectsDescription: 'Веб-проекты, которые я создал и разрабатываю.',
            projectTitles: ['Личное портфолио', 'Landing Page', 'Интернет-магазин'],
            projectDescriptions: [
                'Сайт для демонстрации навыков и проектов.',
                'Современная страница для бизнеса и услуг.',
                'Интернет-магазин для демонстрации товаров.',
            ],
            details: 'Подробнее →',

            contactBadge: 'КОНТАКТЫ',
            contactTitle: 'Создадим проект вместе!',
            contactDescription: 'Если у вас есть вопросы или предложения, свяжитесь со мной.',
            instagramButton: 'Связаться через Instagram ↗',
            contactHeading: 'СВЯЖИТЕСЬ СО МНОЙ',
            contactButton: 'КОНТАКТЫ',
            footerRights: 'Все права защищены.',
            top: 'Наверх ↑',
            language: 'Язык',
        },

        en: {
            nav: ['About Me', 'Skills', 'Projects', 'Contact'],
            heroBadge: 'HELLO! I AM ABDULBORIY',
            heroTitle: "Hello, I'm <span class='hero-name'>Abdulboriy</span>",
            role: 'Frontend Developer',
            heroText:
                'I create modern, beautiful and responsive websites for all devices. Using HTML, CSS and JavaScript, I turn ideas into real projects.',
            projectsButton: 'View My Projects →',
            aboutButton: 'About Me',
            follow: 'FOLLOW ME',
            scroll: 'SCROLL DOWN ↓',

            aboutBadge: 'ABOUT ME',
            aboutTitle: 'Abdulboriy — <span>Frontend Developer</span>',
            aboutText:
                'I am passionate about creating modern and professional websites. Using HTML, CSS, JavaScript, Figma and other tools, I turn designs into web pages. My goal is to improve my knowledge, learn new technologies and create high-quality projects.',
            contactLink: 'Contact Me →',

            skillsBadge: 'MY KNOWLEDGE',
            skillsTitle: 'My Skills<span>.</span>',
            skillsDescription: 'Technologies and tools I use.',

            skillDescriptions: [
                'Creating the structure of web pages.',
                'Design, colors and responsive layouts.',
                'Adding interactive features to websites.',
                'Creating interfaces and website designs.',
                'Building pages with no-code tools.',
                'Learning programming fundamentals.',
                'Google services and online tools.',
                'Building modern and fast websites with React.',
            ],
            skillLabel: 'Skill',
            learning: 'Learning',
            status: 'Status',
            direction: 'Category',
            services: 'Services',

            projectsBadge: 'MY WORK',
            projectsTitle: 'My Projects<span>.</span>',
            projectsDescription: 'Web projects I have created and am developing.',
            projectTitles: ['Personal Portfolio', 'Landing Page', 'Online Store'],
            projectDescriptions: [
                'A website showcasing skills and projects.',
                'A modern page for businesses and services.',
                'An online store for displaying products.',
            ],
            details: 'View Details →',

            contactBadge: 'CONTACT',
            contactTitle: "Let's build a project together!",
            contactDescription: 'If you have questions or suggestions, feel free to contact me.',
            instagramButton: 'Contact via Instagram ↗',
            contactHeading: 'GET IN TOUCH',
            contactButton: 'CONTACT',
            footerRights: 'All rights reserved.',
            top: 'Back to top ↑',
            language: 'Language',
        },
    };

    function applyLanguage(lang) {
        const t = translations[lang];

        if (!t) return;

        localStorage.setItem('siteLanguage', lang);
        document.documentElement.lang = lang;

        // NAVIGATION
        document.querySelectorAll('.nav-link').forEach((link, i) => {
            if (t.nav[i]) link.textContent = t.nav[i];
        });

        // HERO
        const heroBadge = document.querySelector('.hero .eyebrow');
        if (heroBadge) heroBadge.textContent = t.heroBadge;

        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) heroTitle.innerHTML = t.heroTitle;

        const heroRole = document.querySelector('.hero-text h2');
        if (heroRole) heroRole.textContent = t.role;

        const heroText = document.querySelector('.hero-text > p');
        if (heroText) heroText.textContent = t.heroText;

        const heroButtons = document.querySelectorAll('.hero-buttons a');
        if (heroButtons[0]) heroButtons[0].textContent = t.projectsButton;
        if (heroButtons[1]) heroButtons[1].textContent = t.aboutButton;

        const follow = document.querySelector('.hero-socials > span');
        if (follow) follow.textContent = t.follow;

        const scroll = document.querySelector('.scroll-hint');
        if (scroll) scroll.innerHTML = t.scroll;

        // ABOUT
        const about = document.querySelector('.about-content');
        if (about) {
            about.querySelector('.eyebrow').textContent = t.aboutBadge;
            about.querySelector('h2').innerHTML = t.aboutTitle;
            about.querySelector('p').textContent = t.aboutText;
            about.querySelector('.text-link').textContent = t.contactLink;
        }

        // SKILLS
        const skillSection = document.querySelector('.skills');
        if (skillSection) {
            skillSection.querySelector('.eyebrow').textContent = t.skillsBadge;
            skillSection.querySelector('.section-title').innerHTML = t.skillsTitle;
            skillSection.querySelector('.section-description').textContent = t.skillsDescription;

            skillSection.querySelectorAll('.skill-card').forEach((card, i) => {
                if (t.skillDescriptions[i]) {
                    card.querySelector('p').textContent = t.skillDescriptions[i];
                }

                const label = card.querySelector('.skill-bottom span');
                if (label) {
                    label.textContent = i === 5 ? t.status : i === 6 ? t.direction : t.skillLabel;
                }

                const status = card.querySelector('.learning');
                if (status) status.textContent = t.learning;
            });
        }

        // PROJECTS
        const projects = document.querySelector('.projects');
        if (projects) {
            projects.querySelector('.eyebrow').textContent = t.projectsBadge;
            projects.querySelector('.section-title').innerHTML = t.projectsTitle;
            projects.querySelector('.section-description').textContent = t.projectsDescription;

            projects.querySelectorAll('.project-card').forEach((card, i) => {
                if (t.projectTitles[i]) {
                    card.querySelector('h3').textContent = t.projectTitles[i];
                    card.querySelector('p').textContent = t.projectDescriptions[i];
                    card.querySelector('.text-link').textContent = t.details;
                }
            });
        }

        // CONTACT
        const contact = document.querySelector('.contact');
        if (contact) {
            contact.querySelector('.eyebrow').textContent = t.contactBadge;
            contact.querySelector('h2').textContent = t.contactTitle;
            contact.querySelector('p').textContent = t.contactDescription;
            contact.querySelector('.button').textContent = t.instagramButton;
        }

        const contactHeading = document.querySelector('.aloqa .soz');
        if (contactHeading) contactHeading.textContent = t.contactHeading;

        const contactButton = document.querySelector('.aloqa .alo');
        if (contactButton) contactButton.textContent = t.contactButton;

        // FOOTER
        const footerText = document.querySelector('.footer-inner p');
        if (footerText) {
            const year = new Date().getFullYear();
            footerText.textContent = `© ${year} Abdulboriy. ${t.footerRights}`;
        }

        const footerTop = document.querySelector('.footer-top');
        if (footerTop) footerTop.textContent = t.top;

        // PAGE TITLE
        document.title =
            lang === 'uz'
                ? 'Abdulboriy | Frontend Developer'
                : lang === 'ru'
                  ? 'Абдулборий | Frontend-разработчик'
                  : 'Abdulboriy | Frontend Developer';
    }

    // LANGUAGE SELECTOR
    function addLanguageSelector() {
        const navigation = document.querySelector('.navigation');

        if (!navigation || document.querySelector('.language-select')) return;

        const select = document.createElement('select');
        select.className = 'language-select';

        select.innerHTML = `
            <option value="uz">🇺🇿 UZ</option>
            <option value="ru">🇷🇺 RU</option>
            <option value="en">🇬🇧 EN</option>
        `;

        select.value = localStorage.getItem('siteLanguage') || 'uz';

        select.style.cssText = `
            background:#101820;
            color:#00bfff;
            border:1px solid #263746;
            border-radius:7px;
            padding:8px;
            cursor:pointer;
            margin-left:10px;
        `;

        select.addEventListener('change', () => {
            applyLanguage(select.value);
        });

        navigation.appendChild(select);
    }

    // FIRST VISIT CHECK
    const savedLanguage = localStorage.getItem('siteLanguage');

    if (!savedLanguage) {
        window.location.replace('./Leading.html');
        return;
    }

    applyLanguage(savedLanguage);
    addLanguageSelector();
})();
