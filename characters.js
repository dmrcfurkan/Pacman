let pacX = 0,
  pacY = 0,
  counter = 0,
  intervalId = null;
const pacman = document.querySelector(".pacman");
const mouth = document.querySelector(".pacman-mouth");
const timeInterval = 100;

function toggleMouth(open) {
  mouth.style.clipPath = open
    ? "polygon(100% 74%, 24% 48%, 100% 21%)"
    : "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)";
}

function startAnimation() {
  toggleMouth(true);
  setTimeout(() => {
    toggleMouth(false);
    setTimeout(startAnimation, timeInterval);
  }, timeInterval);
}

startAnimation();

document.addEventListener("keyup", (e) => {
  if (intervalId) clearInterval(intervalId);

  const directions = {
    ArrowRight: [5, 0, 0],
    ArrowLeft: [-5, 0, 180],
    ArrowDown: [0, 5, 90],
    ArrowUp: [0, -5, 270],
  };

  const [moveX = 0, moveY = 0, rotation = 0] = directions[e.key] || [];

  if (moveX || moveY) {
    intervalId = setInterval(() => {
      if (!collisionDetection(moveX, moveY)) {
        pacX += moveX;
        pacY += moveY;
        pacman.style.transform = `translate(${pacX}px, ${pacY}px) rotate(${rotation}deg)`;
        foodDetection(moveX, moveY);
      }
    }, 35);
  }
});

function collisionDetection(moveX, moveY) {
  const pacmanRect = pacman.getBoundingClientRect();
  const newRect = {
    left: pacmanRect.left + moveX,
    right: pacmanRect.right + moveX,
    top: pacmanRect.top + moveY,
    bottom: pacmanRect.bottom + moveY,
  };

  return document.querySelectorAll(".wall").some((wall) => {
    const wallRect = wall.getBoundingClientRect();
    return (
      newRect.right > wallRect.left &&
      newRect.left < wallRect.right &&
      newRect.bottom > wallRect.top &&
      newRect.top < wallRect.bottom
    );
  });
}

function foodDetection(moveX, moveY) {
  const pacmanRect = pacman.getBoundingClientRect();
  const newRect = {
    left: pacmanRect.left + moveX,
    right: pacmanRect.right + moveX,
    top: pacmanRect.top + moveY,
    bottom: pacmanRect.bottom + moveY,
  };

  [...document.querySelectorAll(".food")].forEach((food) => {
    const foodRect = food.getBoundingClientRect();
    if (
      newRect.right > foodRect.left &&
      newRect.left < foodRect.right &&
      newRect.bottom > foodRect.top &&
      newRect.top < foodRect.bottom
    ) {
      food.remove();
      if (++counter == 215) alert("Bitti");
    }
  });
}
