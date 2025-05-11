// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Brands Slider
document.addEventListener('DOMContentLoaded', function() {
    const brandsData = [
        { name: "PUMA" },
        { name: "Reebok" },
        { name: "Adidas" },
        { name: "Asics" },
        { name: "FILA" },
        { name: "Oakley" },
        { name: "New Balance" },
        { name: "Salomon" },
        { name: "Timberland" },
        { name: "Maison Margiela" },
        { name: "Lanvin" },
        { name: "Jordan" },
        { name: "Rick Owens" },
        { name: "Mihara Yasuhiro" },
        { name: "OFF WHITE" },
        { name: "Nike" },
        { name: "Onitsuka Tiger" }
    ];
    
    const track = document.getElementById('brandsTrack');
    let currentPosition = 0;
    let itemWidth = 0;
    let isAnimating = false;
    let currentIndex = 0;
    const clonesCount = 3;
    
    function createBrandItems() {
        track.innerHTML = '';
        
        const itemsToAdd = [];
        for (let i = 0; i < clonesCount; i++) {
            itemsToAdd.push(...brandsData);
        }
        itemsToAdd.push(...brandsData);
        for (let i = 0; i < clonesCount; i++) {
            itemsToAdd.push(...brandsData);
        }
        
        itemsToAdd.forEach((brand) => {
            const brandItem = document.createElement('div');
            brandItem.className = 'brand-item';
            brandItem.textContent = brand.name; 
            track.appendChild(brandItem);
        });
        
        if (track.children.length > 0) {
            itemWidth = track.children[0].offsetWidth;
        }
        
        currentIndex = brandsData.length * clonesCount;
        currentPosition = -currentIndex * itemWidth;
        track.style.transition = 'none';
        updateTrackPosition();
        setTimeout(() => {
            track.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
        }, 50);
    }
    
    function updateTrackPosition() {
        track.style.transform = `translateX(${currentPosition}px)`;
    }
    
    function handleLoop() {
        const totalRealItems = brandsData.length;
        const totalClonedItems = totalRealItems * clonesCount;
        const totalItems = totalRealItems * (2 * clonesCount + 1);
        
        if (currentIndex >= totalItems - totalClonedItems) {
            currentIndex = totalClonedItems + (currentIndex - (totalItems - totalClonedItems));
            currentPosition = -currentIndex * itemWidth;
            track.style.transition = 'none';
            updateTrackPosition();
            setTimeout(() => {
                track.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
            }, 10);
        } 
        else if (currentIndex <= totalClonedItems - totalRealItems) {
            currentIndex = totalItems - totalClonedItems - (totalClonedItems - currentIndex);
            currentPosition = -currentIndex * itemWidth;
            track.style.transition = 'none';
            updateTrackPosition();
            setTimeout(() => {
                track.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
            }, 10);
        }
        
        isAnimating = false;
    }
    
    function scrollToIndex(newIndex) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = newIndex;
        currentPosition = -currentIndex * itemWidth;
        
        updateTrackPosition();
        
        track.addEventListener('transitionend', function onTransitionEnd() {
            track.removeEventListener('transitionend', onTransitionEnd);
            handleLoop();
        }, { once: true });
    }
    
    function scrollNext() {
        scrollToIndex(currentIndex + 1);
    }
    
    function scrollPrev() {
        scrollToIndex(currentIndex - 1);
    }
    
    // Mouse control
    let isMouseDown = false;
    let startX, scrollLeft;
    
    track.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = currentPosition;
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
        e.preventDefault();
    });
    
    track.addEventListener('mouseleave', () => {
        isMouseDown = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
    });
    
    track.addEventListener('mouseup', () => {
        isMouseDown = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
    });
    
    track.addEventListener('mousemove', (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        currentPosition = scrollLeft - walk;
        updateTrackPosition();
    });
    
    // Initialize
    createBrandItems();
    
    window.addEventListener('resize', function() {
        createBrandItems();
    });
});



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