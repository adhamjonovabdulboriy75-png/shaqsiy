// 3D MOUSE FOLLOWER

const mouseFollower = document.createElement('div');
mouseFollower.className = 'mouse-3d';

mouseFollower.innerHTML = `
    <div class="mouse-3d-inner">
        <span></span>
    </div>
`;

document.body.appendChild(mouseFollower);

// CSS
const mouseStyle = document.createElement('style');

mouseStyle.textContent = `
    .mouse-3d {
        position: fixed;
        top: 0;
        left: 0;
        width: 35px;
        height: 35px;
        pointer-events: none;
        z-index: 99999;
        opacity: 0;
        transform: translate3d(-100px, -100px, 0);
        transition: opacity 0.3s;
        perspective: 500px;
    }

    .mouse-3d-inner {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(
            circle at 30% 25%,
            #ffffff,
            #00c8ff 25%,
            #0066ff 65%,
            #001b45
        );
        box-shadow:
            0 0 12px #00bfff,
            0 0 25px #008cff,
            inset -5px -5px 12px #001a40;
        border: 1px solid #00c8ff;
        animation: mouseFloat 2s infinite ease-in-out;
    }

    .mouse-3d-inner span {
        display: block;
        width: 9px;
        height: 9px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        left: 7px;
        filter: blur(1px);
    }

    @keyframes mouseFloat {
        0%, 100% {
            transform: rotateX(0deg) rotateY(0deg);
        }

        50% {
            transform: rotateX(25deg) rotateY(25deg);
        }
    }

    @media (pointer: coarse) {
        .mouse-3d {
            display: none;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .mouse-3d-inner {
            animation: none;
        }
    }
`;

document.head.appendChild(mouseStyle);

// MOUSE MOVEMENT

let mouseX = -100;
let mouseY = -100;
let followerX = -100;
let followerY = -100;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 17.5;
    mouseY = e.clientY - 17.5;

    mouseFollower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    mouseFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    mouseFollower.style.opacity = '1';
});

// SMOOTH FOLLOW ANIMATION

function animateMouse() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    mouseFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

    requestAnimationFrame(animateMouse);
}

animateMouse();
