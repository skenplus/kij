// game-anim.js
// Autonomous Pong-style background animation for the hero section

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Colors based on the CSS variables
  const colorPrimary = "#1a3a6c";
  const colorSecondary = "#e8611a";

  let width, height;

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener("resize", resize);
  resize();

  // Game objects
  const ball = {
    x: width / 2,
    y: height / 2,
    radius: 6,
    speedX: 3,
    speedY: 2,
    color: colorSecondary
  };

  const paddleWidth = 10;
  const paddleHeight = 60;

  const leftPaddle = {
    x: 20,
    y: height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: colorPrimary,
    speed: 2.5
  };

  const rightPaddle = {
    x: width - 30,
    y: height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: colorPrimary,
    speed: 2.5
  };

  function update() {
    // Move ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > height) {
      ball.speedY = -ball.speedY;
    }

    // Ball collision with left paddle
    if (
      ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.x + ball.radius > leftPaddle.x &&
      ball.y + ball.radius > leftPaddle.y &&
      ball.y - ball.radius < leftPaddle.y + leftPaddle.height
    ) {
      ball.speedX = Math.abs(ball.speedX);
      ball.speedY += (Math.random() - 0.5); // Add some randomness
    }

    // Ball collision with right paddle
    if (
      ball.x + ball.radius > rightPaddle.x &&
      ball.x - ball.radius < rightPaddle.x + rightPaddle.width &&
      ball.y + ball.radius > rightPaddle.y &&
      ball.y - ball.radius < rightPaddle.y + rightPaddle.height
    ) {
      ball.speedX = -Math.abs(ball.speedX);
      ball.speedY += (Math.random() - 0.5); // Add some randomness
    }

    // Ball goes out of bounds (reset)
    if (ball.x < 0 || ball.x > width) {
      ball.x = width / 2;
      ball.y = height / 2;
      ball.speedX = ball.speedX > 0 ? -3 : 3;
      ball.speedY = (Math.random() > 0.5 ? 2 : -2);
    }

    // Autonomous paddle movement (AI)
    // Left paddle AI
    if (leftPaddle.y + leftPaddle.height / 2 < ball.y - 10) {
      leftPaddle.y += leftPaddle.speed;
    } else if (leftPaddle.y + leftPaddle.height / 2 > ball.y + 10) {
      leftPaddle.y -= leftPaddle.speed;
    }

    // Right paddle AI
    if (rightPaddle.y + rightPaddle.height / 2 < ball.y - 10) {
      rightPaddle.y += rightPaddle.speed;
    } else if (rightPaddle.y + rightPaddle.height / 2 > ball.y + 10) {
      rightPaddle.y -= rightPaddle.speed;
    }

    // Prevent paddles from going out of bounds
    leftPaddle.y = Math.max(0, Math.min(height - leftPaddle.height, leftPaddle.y));
    rightPaddle.y = Math.max(0, Math.min(height - rightPaddle.height, rightPaddle.y));

    // Update right paddle X pos in case of resize
    rightPaddle.x = width - 30;
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw center line
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = "rgba(26, 58, 108, 0.2)";
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw left paddle
    ctx.fillStyle = leftPaddle.color;
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    // Draw right paddle
    ctx.fillStyle = rightPaddle.color;
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Start the animation loop
  loop();
});
