document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка совпадения паролей
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Ошибка: Пароли не совпадают!');
            return;
        }
        
        // Проверка согласия с обработкой данных
        if (!document.getElementById('agreement').checked) {
            alert('Необходимо согласиться с обработкой персональных данных');
            return;
        }
        
        // Если все проверки пройдены - показываем модальное окно
        modal.classList.add('modal-show');
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('modal-show');
        // form.reset(); // Можно раскомментировать для очистки формы
    });
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('modal-show');
        }
    });
});