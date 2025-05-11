// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
// Изменение цены 
document.addEventListener('DOMContentLoaded', function() {
  const priceRange = document.getElementById('priceRange');
  const minPriceInput = document.querySelector('.min-price');
  const maxPriceInput = document.querySelector('.max-price');
  
  // Обновляем input-поля при изменении range-слайдера
  priceRange.addEventListener('input', function() {
      const currentValue = parseInt(this.value);
      const maxValue = parseInt(this.max);
      
      // Определяем, к какому полю ближе текущее значение
      const minPrice = parseInt(minPriceInput.value);
      const maxPrice = parseInt(maxPriceInput.value);
      
      if (Math.abs(currentValue - minPrice) < Math.abs(currentValue - maxPrice)) {
          minPriceInput.value = currentValue;
      } else {
          maxPriceInput.value = currentValue;
      }
  });
  
  // Обновляем range-слайдер при изменении input-полей
  minPriceInput.addEventListener('input', function() {
      if (parseInt(this.value) > parseInt(maxPriceInput.value)) {
          this.value = maxPriceInput.value;
      }
      priceRange.value = this.value;
  });
  
  maxPriceInput.addEventListener('input', function() {
      if (parseInt(this.value) < parseInt(minPriceInput.value)) {
          this.value = minPriceInput.value;
      }
      priceRange.value = this.value;
  });
});
//Всплавающее окно при нажатии кнопки Добавить в корзину
let cart = JSON.parse(localStorage.getItem('cart')) || [];



 // Скрипт для работы модального окна профиля
 document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.getElementById('profileBtn');
    const profileModal = document.getElementById('profileModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const logoutBtn = document.getElementById('logoutBtn');
    const closeBtn = document.getElementById('closeBtn');
    const body = document.body;
    
    function openModal() {
        profileModal.classList.add('active');
        modalOverlay.classList.add('active');
        body.classList.add('modal-open');
    }
    
    function closeModal() {
        profileModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        body.classList.remove('modal-open');
    }
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    modalOverlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    logoutBtn.addEventListener('click', function() {
        alert('Вы вышли из профиля');
        closeModal();
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && profileModal.classList.contains('active')) {
            closeModal();
        }
    });
});


// Обработчик для всех кнопок "в корзину"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    // Показываем уведомление
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  });
});

// Обработчик для "избранного"
document.querySelectorAll('.like-icon').forEach(button => {
  button.addEventListener('click', function() {
    // Показываем уведомление
    const notification = document.getElementById('notification-like');
    notification.classList.add('show');
    
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  });
});