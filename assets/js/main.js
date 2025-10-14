// Loading screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1000);
  }
});

// Canvas floating clouds
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height / 2;
    this.size = 60 + Math.random() * 70;
    this.speed = 0.1 + Math.random() * 0.4;
    this.opacity = 0.3 + Math.random() * 0.3;
  }
  
  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.arc(this.x - this.size * 0.5, this.y + this.size * 0.2, this.size * 0.6, 0, Math.PI * 2);
    ctx.arc(this.x + this.size * 0.6, this.y + this.size * 0.1, this.size * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  
  update() {
    this.x += this.speed;
    if(this.x - this.size > canvas.width) this.x = -this.size * 2;
    this.draw();
  }
}

const cloudArr = [];
for(let i=0; i<20; i++) cloudArr.push(new Cloud());

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  cloudArr.forEach(c => c.update());
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Cloud clicks navigate to pages
const clouds = document.querySelectorAll('.cloud');
clouds.forEach(cloud => {
  cloud.addEventListener('click', () => {
    const target = cloud.dataset.target;
    setTimeout(() => {
        window.location.href = target;
    }, 200);
  });
});
