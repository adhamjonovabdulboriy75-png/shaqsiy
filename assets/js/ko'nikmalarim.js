const menuToggle = document.querySelector('#menuToggle');
const navigation = document.querySelector('#navigation');
const navLinks = document.querySelectorAll('.nav-link');
const backTop = document.querySelector('#backTop');

// MOBIL MENYU
menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');

    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
});

// MENYU YOPILISHI
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');

        navLinks.forEach((item) => {
            item.classList.remove('active');
        });

        link.classList.add('active');
    });
});

// SCROLL BO'YICHA ACTIVE LINK
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
    let current = 'home';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // TEPAGA QAYTISH TUGMASI
    if (window.scrollY > 400) {
        backTop.classList.add('show');
    } else {
        backTop.classList.remove('show');
    }
});

// TEPAGA QAYTISH
backTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// FOOTER YILI
document.querySelector('#current-year').textContent = new Date().getFullYear();

// ANCHOR LINKLAR
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
