/* ========================================
   Video Game Animation — Pac-Man Style
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Entities
  let pacman = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    speed: 3,
    mouthOpen: 0,
    mouthDir: 1, // 1 for opening, -1 for closing
    direction: 1 // 1 for right, -1 for left
  };

  let ghosts = [
    { x: canvas.width + 50, y: canvas.height / 2, radius: 20, speed: 2.5, color: '#fca5a5' },
    { x: canvas.width + 120, y: canvas.height / 2, radius: 20, speed: 2.5, color: '#93c5fd' },
    { x: canvas.width + 190, y: canvas.height / 2, radius: 20, speed: 2.5, color: '#fcd34d' }
  ];

  let dots = [];
  for (let i = 0; i < 20; i++) {
    dots.push({ x: 100 + i * 60, y: canvas.height / 2, radius: 4, eaten: false });
  }

  function drawPacman() {
    ctx.beginPath();
    let mouthAngle = 0.2 * Math.PI * pacman.mouthOpen;

    if (pacman.direction === 1) {
      ctx.arc(pacman.x, pacman.y, pacman.radius, mouthAngle, 2 * Math.PI - mouthAngle);
    } else {
      ctx.arc(pacman.x, pacman.y, pacman.radius, Math.PI + mouthAngle, Math.PI - mouthAngle);
    }

    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = '#fbb35a';
    ctx.fill();
    ctx.closePath();
  }

  function drawGhost(ghost) {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0);
    ctx.lineTo(ghost.x + ghost.radius, ghost.y + ghost.radius);

    // Wavy bottom
    ctx.lineTo(ghost.x + ghost.radius * 0.5, ghost.y + ghost.radius - 5);
    ctx.lineTo(ghost.x, ghost.y + ghost.radius);
    ctx.lineTo(ghost.x - ghost.radius * 0.5, ghost.y + ghost.radius - 5);
    ctx.lineTo(ghost.x - ghost.radius, ghost.y + ghost.radius);

    ctx.fillStyle = ghost.color;
    ctx.fill();
    ctx.closePath();

    // Eyes
    ctx.beginPath();
    ctx.arc(ghost.x - 6, ghost.y - 4, 4, 0, 2 * Math.PI);
    ctx.arc(ghost.x + 6, ghost.y - 4, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    let pupilOffset = pacman.direction === 1 ? 2 : -2;
    ctx.arc(ghost.x - 6 + pupilOffset, ghost.y - 4, 2, 0, 2 * Math.PI);
    ctx.arc(ghost.x + 6 + pupilOffset, ghost.y - 4, 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }

  function drawDots() {
    ctx.fillStyle = '#fff';
    dots.forEach(dot => {
      if (!dot.eaten) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Pacman mouth
    pacman.mouthOpen += 0.08 * pacman.mouthDir;
    if (pacman.mouthOpen >= 1 || pacman.mouthOpen <= 0) {
      pacman.mouthDir *= -1;
    }

    // Move Pacman
    pacman.x += pacman.speed * pacman.direction;

    // Move Ghosts
    ghosts.forEach(ghost => {
      ghost.x += ghost.speed * pacman.direction;
    });

    // Eat dots
    dots.forEach(dot => {
      if (!dot.eaten && Math.abs(pacman.x - dot.x) < pacman.radius) {
        dot.eaten = true;
      }
    });

    // Reset positions when moving off screen
    if (pacman.direction === 1 && pacman.x > canvas.width + 300) {
      pacman.x = -50;
      ghosts[0].x = -150;
      ghosts[1].x = -220;
      ghosts[2].x = -290;
      dots.forEach(dot => dot.eaten = false); // Regenerate dots
    }

    // Keep y centered in case of resize
    pacman.y = canvas.height / 2;
    ghosts.forEach(g => g.y = canvas.height / 2);
    dots.forEach(d => d.y = canvas.height / 2);

    drawDots();
    drawPacman();
    ghosts.forEach(drawGhost);

    requestAnimationFrame(update);
  }

  update();
});
