const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

const colors = ["#F08717", "#FFEE25", "#FF4D4D", "#00C2A8", "#ffffff"];

class Confetti {
  constructor(x, y, explosion = false) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? Math.random() * canvas.height;
    this.size = Math.random() * 8 + 4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.rotation = Math.random() * 360;
    this.isExplosion = explosion;

    if (explosion) {
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 6 - 3;
      this.gravity = 0.05;
    } else {
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 2 + 2;
      this.gravity = 0;
    }
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 5;

    if (!this.isExplosion && this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

for (let i = 0; i < 120; i++) {
  pieces.push(new Confetti());
}

function createExplosion(x, y) {
  for (let i = 0; i < 80; i++) {
    pieces.push(new Confetti(x, y, true));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach((piece, index) => {
    piece.update();
    piece.draw();

    if (piece.isExplosion && piece.y > canvas.height + 20) {
      pieces.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("click", (e) => {
  createExplosion(e.clientX, e.clientY);
});

setTimeout(() => {
  pieces = pieces.filter(p => p.isExplosion);
}, 5000);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(reveal => {
    observer.observe(reveal);
});


const heroImg = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
});
