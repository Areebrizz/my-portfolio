// Eyes follow mouse
const eyes = [document.getElementById('eye-left'), document.getElementById('eye-right')];
document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const dx = x - eyeX;
        const dy = y - eyeY;
        const angle = Math.atan2(dy, dx);
        const radius = 5; // pupil movement radius
        eye.style.transform = `translate(${radius * Math.cos(angle)}px, ${radius * Math.sin(angle)}px)`;
    });
});

// Clouds click navigation
const clouds = document.querySelectorAll('.cloud');
clouds.forEach(cloud => {
    cloud.addEventListener('click', () => {
        const target = cloud.dataset.target;
        window.location.href = target;
    });
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
        this.size = 50 + Math.random() * 50;
        this.speed = 0.2 + Math.random() * 0.5;
    }
    draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size/2, 0, 0, Math.PI*2);
        ctx.fill();
    }
    update() {
        this.x += this.speed;
        if(this.x - this.size > canvas.width) this.x = -this.size;
        this.draw();
    }
}

const cloudArr = [];
for(let i=0;i<15;i++) cloudArr.push(new Cloud());

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
