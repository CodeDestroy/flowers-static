// Static demo interactions: no server, database, payments or real authentication.

document.querySelector('[data-year]')?.replaceChildren(
  String(new Date().getFullYear())
);

// Mobile navigation.
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('hidden', isOpen);
    menuButton
      .querySelector('[data-menu-open-icon]')
      ?.classList.toggle('hidden', !isOpen);
    menuButton
      .querySelector('[data-menu-close-icon]')
      ?.classList.toggle('hidden', isOpen);
  });
}

// Product image gallery.
const mainImage = document.querySelector('[data-main-product-image]');

document.querySelectorAll('[data-gallery-image]').forEach((button) => {
  button.addEventListener('click', () => {
    if (mainImage) {
      mainImage.src = button.dataset.galleryImage;
    }

    document.querySelectorAll('[data-gallery-image]').forEach((item) => {
      item.classList.remove('border-[#b45d6c]');
    });

    button.classList.add('border-[#b45d6c]');
  });
});

// Product quantity controls.
const quantityInput = document.querySelector('[data-quantity]');

document.querySelector('[data-quantity-minus]')?.addEventListener('click', () => {
  if (quantityInput) {
    quantityInput.value = Math.max(1, Number(quantityInput.value || 1) - 1);
  }
});

document.querySelector('[data-quantity-plus]')?.addEventListener('click', () => {
  if (quantityInput) {
    quantityInput.value = Math.min(20, Number(quantityInput.value || 1) + 1);
  }
});

// Demo add-to-cart action.
document.querySelector('[data-add-cart]')?.addEventListener('click', () => {
  const quantity = Math.max(1, Math.min(20, Number(quantityInput?.value || 1)));
  const message = document.querySelector('[data-cart-message]');

  if (message) {
    message.textContent = `Демонстрация: в корзину добавлено ${quantity} шт. Для реального заказа нужен сервер.`;
    message.classList.remove('hidden');
  }
});

// Catalog search, category filters and sorting.
const productGrid = document.querySelector('[data-product-grid]');

if (productGrid) {
  const cards = [...productGrid.querySelectorAll('[data-product-item]')];
  const searchInput = document.querySelector('[data-product-search]');
  const sortSelect = document.querySelector('[data-product-sort]');
  const emptyMessage = document.querySelector('[data-no-products]');
  let activeCategory = 'all';

  const renderProducts = () => {
    const searchTerm = (searchInput?.value || '').trim().toLocaleLowerCase('ru');
    const visibleCards = cards.filter((card) => {
      const matchesName = (card.dataset.name || '').includes(searchTerm);
      const matchesCategory =
        activeCategory === 'all' || card.dataset.category === activeCategory;

      return matchesName && matchesCategory;
    });

    if (sortSelect?.value === 'price-asc') {
      visibleCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    }

    if (sortSelect?.value === 'price-desc') {
      visibleCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    }

    cards.forEach((card) => {
      card.hidden = !visibleCards.includes(card);
    });

    visibleCards.forEach((card) => productGrid.appendChild(card));

    if (emptyMessage) {
      emptyMessage.classList.toggle('hidden', visibleCards.length !== 0);
    }
  };

  searchInput?.addEventListener('input', renderProducts);
  sortSelect?.addEventListener('change', renderProducts);

  document.querySelectorAll('[data-category-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.categoryFilter;

      document.querySelectorAll('[data-category-filter]').forEach((item) => {
        item.className =
          'rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600';
      });

      button.className =
        'rounded-full bg-[#b45d6c] px-4 py-2 text-xs font-bold text-white';
      renderProducts();
    });
  });

  document.querySelectorAll('[data-category-jump]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.categoryJump;
      const target = document.querySelector(
        `[data-category-filter="${activeCategory}"]`
      );

      target?.click();
      document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Static feedback for forms.
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = form.querySelector('[data-form-message]');

    if (message) {
      message.textContent =
        'Это статическая демонстрация. Авторизация и отправка форм подключаются после размещения backend-сервера.';
      message.classList.remove('hidden');
    }
  });
});
