const introScreen = document.getElementById('introScreen') || document.getElementById('intro');
const main = document.getElementById('main');
const sparkleLayer = document.querySelector('.sparkle-layer');
const heartLayer = document.querySelector('.bg-hearts');

function createIntroSparkles() {
  const container = document.getElementById('introSparkles');
  if (!container) {
    return;
  }

  const sparkles = ['✨', '💕', '🦋', '💖', '💫', '⭐'];
  for (let i = 0; i < 12; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'intro-sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${14 + Math.random() * 10}px`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    container.appendChild(sparkle);
  }
}

function createFloatingDecor() {
  const heartSymbols = ['🎉', '🎂', '🎈', '✨', '💫', '🎁'];

  for (let i = 0; i < 16; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    heart.style.fontSize = `${16 + Math.random() * 18}px`;
    heartLayer.appendChild(heart);
  }

  for (let i = 0; i < 22; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDuration = `${4 + Math.random() * 5}s`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    sparkle.style.transform = `scale(${0.6 + Math.random() * 1.2})`;
    sparkleLayer.appendChild(sparkle);
  }
}

function createCursorSparkle(x, y) {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.position = 'fixed';
  sparkle.style.zIndex = '999';
  sparkle.style.animation = 'none';
  sparkle.style.opacity = '0.95';
  sparkle.style.transform = 'scale(1.2)';
  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {
    sparkle.animate(
      [
        { transform: 'scale(1.2)', opacity: 1 },
        { transform: 'scale(0)', opacity: 0 }
      ],
      { duration: 700, easing: 'ease-out' }
    );
  });

  setTimeout(() => sparkle.remove(), 700);
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });

  items.forEach((item) => observer.observe(item));
}

window.addEventListener('load', () => {
  createIntroSparkles();
  createFloatingDecor();
  setupReveal();

  setTimeout(() => {
    if (introScreen) {
      introScreen.classList.add('hidden');
    }
    main.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 4200);
});

document.addEventListener('mousemove', (event) => {
  if (Math.random() > 0.55) {
    createCursorSparkle(event.clientX, event.clientY);
  }
});

document.addEventListener('click', (event) => {
  createCursorSparkle(event.clientX, event.clientY);
});
