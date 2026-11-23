document.addEventListener('DOMContentLoaded', () => {
  const orderDialog = document.getElementById('order-dialog');
  const orderButtons = document.querySelectorAll('.product-card__button');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  let lastActiveElement = null;

  // Кнопки на главной странице открывают диалог с выбранным товаром.
  if (orderDialog) {
    orderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (selectedProductInput) {
          selectedProductInput.value = button.dataset.product || '';
        }

        lastActiveElement = button;
        if (!orderDialog.open) {
          orderDialog.showModal();
        }
      });
    });

    // Закрытие диалога отдельной кнопкой.
    if (closeDialogButton) {
      closeDialogButton.addEventListener('click', () => orderDialog.close());
    }

    // Закрытие при клике за пределами содержимого диалога.
    orderDialog.addEventListener('click', (event) => {
      if (event.target === orderDialog) {
        orderDialog.close();
      }
    });

    // Возвращаем клавиатурный фокус к кнопке, открывшей диалог.
    orderDialog.addEventListener('close', () => {
      if (lastActiveElement && lastActiveElement.isConnected) {
        lastActiveElement.focus();
      }
      lastActiveElement = null;
    });
  }

  // Формы работают в демонстрационном режиме: данные не отправляются на сервер.
  document.querySelectorAll('.order-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isDialogForm = Boolean(form.closest('dialog'));
      let message = isDialogForm
        ? document.getElementById('success-message')
        : null;

      if (!message) {
        message = document.createElement('p');
        message.className = 'success-message';
        message.setAttribute('tabindex', '-1');
        form.insertAdjacentElement('afterend', message);
      }

      message.hidden = false;
      message.setAttribute('role', 'status');
      message.setAttribute('aria-live', 'polite');
      message.textContent = 'Форма заполнена правильно. Это учебный проект: данные не отправляются на сервер.';

      form.reset();

      const dialog = form.closest('dialog');
      if (dialog && dialog.open) {
        dialog.close();
      }

      message.focus();
    });
  });
});
