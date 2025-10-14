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
    this.initialSize = this.size;
    this.wobble = Math.random() * 0.02;
  }
  
  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.beginPath();
    // More complex cloud shape for cinematic effect
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.arc(this.x - this.size * 0.5, this.y + this.size * 0.2, this.size * 0.6, 0, Math.PI * 2);
    ctx.arc(this.x + this.size * 0.6, this.y + this.size * 0.1, this.size * 0.7, 0, Math.PI * 2);
    ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.2, this.size * 0.5, 0, Math.PI * 2);
    ctx.arc(this.x + this.size * 0.3, this.y - this.size * 0.1, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  update() {
    this.x += this.speed;
    // More natural vertical movement
    this.y += Math.sin(Date.now() * 0.001 * this.speed + this.wobble) * 0.05;
    
    // Loop clouds back to the start
    if(this.x - this.size > canvas.width) {
      this.x = -this.size * 2;
      this.y = Math.random() * canvas.height / 2;
    }
    
    this.draw();
  }
}

const cloudArr = [];
for(let i=0; i<25; i++) cloudArr.push(new Cloud());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cloudArr.forEach(c => c.update());
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Cloud clicks navigate to pages with enhanced transition
const clouds = document.querySelectorAll('.cloud');
clouds.forEach(cloud => {
  cloud.addEventListener('click', () => {
    const target = cloud.dataset.target;
    
    // Add click feedback
    cloud.style.transform = 'scale(0.95)';
    
    // Create a ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    cloud.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.transition = 'all 0.5s ease-out';
      ripple.style.width = '200px';
      ripple.style.height = '200px';
      ripple.style.opacity = '0';
    }, 10);
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = target;
    }, 500);
  });
});

// Add scroll indicator if content extends beyond viewport
window.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main && main.scrollHeight > window.innerHeight) {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.textContent = 'Scroll to explore';
    document.querySelector('.hero-container').appendChild(scrollIndicator);
  }
});

// Add parallax effect for cinematic depth
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.speed;
    const yPos = -(scrolled * speed);
    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});
