const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuBtn.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');

    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.textContent = isOpen ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
    });
});

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    if (name.length < 2 || email.length === 0 || subject === '' || message.length < 10) {
        formStatus.textContent = 'Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.';
        formStatus.classList.add('show');
        return;
    }

    formStatus.textContent =
        'Rahmat, ' + name + '! Ma’lumotlar tekshirildi. ' + 'Xabaringiz hali yuborilmadi. Hozircha Telegram orqali bog‘lanishingiz mumkin.';

    formStatus.classList.add('show');
});
