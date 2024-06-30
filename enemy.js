const playArea = document.querySelector(".play-ground");
class Enemy {
  constructor(x, y, color, moveX, moveY) {
    Object.assign(this, { x, y, color, moveX, moveY });
  }
}
function createEnemy() {
  const [w, h] = [playArea.offsetWidth / 2, playArea.offsetHeight / 2];
  const enemies = [
    new Enemy(50, 45, "red", 275, 0),
    new Enemy(-300, 0, "green", 0, 300),
    new Enemy(315, 0, "orange", 0, 290),
  ];

  enemies.forEach((enemy, i) => {
    const el = document.createElement("span");
    Object.assign(el.style, {
      backgroundColor: enemy.color,
      top: h - enemy.y + "px",
      left: w - enemy.x + "px",
    });
    el.classList.add("enemy");
    playArea.appendChild(el);
  });

  const [firstEnemy, secondEnemy, thirdEnemy] =
    document.querySelectorAll(".enemy");

  function animate() {
    firstEnemy.style.transform = `translate(${enemies[0].moveX}px, 0)`;
    secondEnemy.style.transform = `translate(0, ${enemies[1].moveY}px)`;
    thirdEnemy.style.transform = `translate(0, ${enemies[2].moveY}px)`;

    setTimeout(() => {
      firstEnemy.style.transform = `translate(${-enemies[0].moveX}px, 0)`;
      secondEnemy.style.transform = `translate(0, ${-enemies[1].moveY}px)`;
      thirdEnemy.style.transform = `translate(0, ${-enemies[2].moveY}px)`;
      setTimeout(animate, 1000);
    }, 1000);
  }
  animate();
}

function collision() {
  const pacmanRect = document.querySelector(".pacman").getBoundingClientRect();
  document.querySelectorAll(".enemy").forEach((el) => {
    const enemyRect = el.getBoundingClientRect();
    if (
      pacmanRect.right >= enemyRect.left &&
      pacmanRect.left < enemyRect.right &&
      pacmanRect.bottom >= enemyRect.top &&
      pacmanRect.top < enemyRect.bottom
    ) {
      alert("Öldün");
      window.location.reload();
    }
  });
}
createEnemy();
setInterval(collision, 50);
