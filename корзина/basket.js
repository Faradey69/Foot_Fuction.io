// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});



document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const selector = this.closest('.quantity-selector');
      const valueElement = selector.querySelector('.quantity-value');
      let value = parseInt(valueElement.textContent);
      
      if (this.classList.contains('minus') && value > 1) {
        value--;
      } else if (this.classList.contains('plus')) {
        value++;
      }
      
      valueElement.textContent = value;
      
      // Можно добавить здесь логику обновления общей суммы
      updateTotalPrice();
    });
  });
  
  function updateTotalPrice() {
    // Ваша логика пересчёта общей стоимости
  }


// Обработчик для всех кнопок "Убрать"
document.querySelectorAll('.remove').forEach(button => {
  button.addEventListener('click', function() {
    // Показываем уведомление
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    // Удаляем конкретную карточку товара (опционально)
    this.closest('.product-card').remove();
    
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

  



// Получаем элементы
const modal = document.getElementById("paymentModal");
const btn = document.getElementById("pay");
const span = document.getElementsByClassName("close")[0];
const payBtn = document.querySelector(".pay-btn");
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const addressField = document.getElementById("addressField");
const addressInput = document.getElementById("address");

// Открываем модальное окно при нажатии на кнопку
btn.onclick = function() {
    modal.style.display = "block";
}

// Закрываем модальное окно при нажатии на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрываем модальное окно при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Обработка изменения способа доставки
deliveryOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.value === "courier") {
            addressField.style.display = "block";
            addressInput.required = true;
        } else {
            addressField.style.display = "none";
            addressInput.required = false;
        }
    });
});

// Обработка нажатия кнопки "Оплатить"
payBtn.onclick = function() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const promoCode = document.getElementById("promoCode").value;
    const address = deliveryMethod === "courier" ? document.getElementById("address").value : "";
    
    // Проверка адреса при доставке курьером
    if (deliveryMethod === "courier" && address.trim() === "") {
        alert("Пожалуйста, введите адрес доставки");
        return;
    }
    
    // Здесь можно добавить логику обработки данных
    console.log("Способ оплаты:", paymentMethod);
    console.log("Способ доставки:", deliveryMethod);
    console.log("Адрес доставки:", address);
    console.log("Промокод:", promoCode);
    
    let message = "Заказ оформлен!\n";
    message += "Способ оплаты: " + (paymentMethod === "card" ? "Банковской картой" : "Долями") + "\n";
    message += "Доставка: " + (deliveryMethod === "pickup" ? "Самовывоз" : "Курьером");
    
    if (deliveryMethod === "courier") {
        message += "\nАдрес: " + address;
    }
    
    alert(message);
    
    modal.style.display = "none";
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//Всплавающее окно при нажатии кнопки Добавить в корзину
let cartt = JSON.parse(localStorage.getItem('cart')) || [];



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