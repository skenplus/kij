(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'game-bg';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0'; // Behind content
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.15';

  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Space Invaders style elements
  const invaders = [];
  const rows = 3;
  const cols = 8;
  const spacing = 60;

  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      invaders.push({
        x: c * spacing + 50,
        y: r * spacing + 50,
        origX: c * spacing + 50,
        size: 20
      });
    }
  }

  let time = 0;

  function drawInvader(x, y, size, frame) {
    ctx.fillStyle = '#1a3a6c'; // Match KIJ primary
    ctx.beginPath();
    // Simple pixelated shape
    const p = size/10;

    // Body
    ctx.fillRect(x + p*2, y, p*6, p*3);
    ctx.fillRect(x, y + p*3, p*10, p*4);

    // Eyes
    ctx.clearRect(x + p*2, y + p*3, p*2, p*2);
    ctx.clearRect(x + p*6, y + p*3, p*2, p*2);

    // Tentacles/Legs alternating
    if (frame % 2 === 0) {
      ctx.fillRect(x, y + p*7, p*2, p*3);
      ctx.fillRect(x + p*3, y + p*7, p*2, p*3);
      ctx.fillRect(x + p*5, y + p*7, p*2, p*3);
      ctx.fillRect(x + p*8, y + p*7, p*2, p*3);
    } else {
      ctx.fillRect(x + p*2, y + p*7, p*2, p*3);
      ctx.fillRect(x + p*6, y + p*7, p*2, p*3);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.05;

    const wave = Math.sin(time) * 100; // side to side movement
    const frame = Math.floor(time * 2);

    // Start drawing from center top
    const startX = (width - (cols * spacing)) / 2;

    invaders.forEach(inv => {
      drawInvader(startX + inv.origX + wave, inv.y, inv.size, frame);
    });

    // Draw little player ship
    ctx.fillStyle = '#1aaa6c'; // Match secondary
    const pX = width / 2;
    const pY = height - 40;
    ctx.fillRect(pX - 15, pY + 10, 30, 10);
    ctx.fillRect(pX - 5, pY, 10, 10);

    requestAnimationFrame(animate);
  }

  animate();
})();
