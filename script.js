window.onload = function() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Загрузка изображения
  const goroImage = new Image();
  goroImage.src = 'gorou.png'; // Укажите путь к изображению

  // Массив для хранения частиц фейерверка
  let particles = [];

  // Класс частицы
  class Particle {
    constructor(x, y, color, velocityX, velocityY, size) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.size = size;
      this.alpha = 1; // Начальная прозрачность
    }

    draw() {
      ctx.save(); // Сохраняем текущее состояние canvas
      ctx.globalAlpha = this.alpha; // Устанавливаем прозрачность
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore(); // Восстанавливаем состояние canvas
    }

    update() {
      this.draw();
      this.x += this.velocityX;
      this.y += this.velocityY;
      this.velocityY += 0.05; // Имитация гравитации
      this.alpha -= 0.005; // Уменьшение прозрачности
      this.size *= 0.99;    // Уменьшение размера
    }
  }


  // Функция для создания фейерверка
  function createFireworks(x, y) {
    const particleCount = 100; // Количество частиц в фейерверке
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Случайный цвет

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2; // Случайный угол
      const speed = Math.random() * 3 + 1; // Случайная скорость

      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;

      particles.push(new Particle(x, y, color, velocityX, velocityY, 3));
    }
  }


  // Функция для анимации
  function animate() {
    requestAnimationFrame(animate);

    // Очищаем canvas с небольшой прозрачностью для эффекта затухания
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем изображение
    // Ждем, пока изображение загрузится
    if (goroImage.complete) {
        // Центрируем изображение
        const imageWidth = goroImage.width;
        const imageHeight = goroImage.height;
        const imageX = (canvas.width - imageWidth) / 2;
        const imageY = (canvas.height - imageHeight) / 2;
        ctx.drawImage(goroImage, imageX, imageY, imageWidth, imageHeight);
    }


    for (let i = 0; i < particles.length; i++) {
      particles[i].update();

      // Удаляем частицы, которые стали невидимыми
      if (particles[i].alpha <= 0 || particles[i].size <= 0.1) {
        particles.splice(i, 1);
        i--; // Уменьшаем индекс, чтобы не пропустить следующий элемент
      }
    }
  }

  // Запускаем анимацию
  animate();


  // Обработчик клика мыши для создания фейерверков
  canvas.addEventListener('mousedown', function(event) {
    createFireworks(event.clientX, event.clientY);
  });


  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};