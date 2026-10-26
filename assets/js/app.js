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
