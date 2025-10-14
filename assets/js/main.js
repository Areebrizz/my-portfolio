// Canvas floating clouds
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cloud {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height / 2;
    this.size = 60 + Math.random() * 70; // Larger clouds for depth
    this.speed = 0.1 + Math.random() * 0.4; // Slower speed for smoother movement
    this.opacity = 0.3 + Math.random() * 0.3; // Varying opacity
    this.initialSize = this.size;
  }
  
  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.beginPath();
    // Complex cloud shape using multiple circles for a more natural look
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.arc(this.x - this.size * 0.5, this.y + this.size * 0.2, this.size * 0.6, 0, Math.PI * 2);
    ctx.arc(this.x + this.size * 0.6, this.y + this.size * 0.1, this.size * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  
  update() {
    this.x += this.speed;
    // Simple vertical oscillation for subtle movement (breathing effect)
    this.y += Math.sin(Date.now() * 0.001 * this.speed) * 0.05; 
    
    // Loop clouds back to the start
    if(this.x - this.size > canvas.width) this.x = -this.size * 2;
    
    this.draw();
  }
}

const cloudArr = [];
// Increased cloud count for a more immersive sky
for(let i=0;i<25;i++) cloudArr.push(new Cloud());

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
    // Added a small delay for a smoother cinematic transition
    setTimeout(() => {
        window.location.href = target;
    }, 200); 
  });
});
