// Запускаем код после загрузки HTML-страницы.
document.addEventListener('DOMContentLoaded', () => {

  // Получаем модальное окно.
  const orderDialog = document.getElementById('order-dialog');

  // Если на странице нет модального окна, завершаем работу.
  if (!orderDialog) {
    return;
  }

  // Получаем все кнопки заказа в карточках товаров.
  const orderButtons = document.querySelectorAll('.product-card__button');

  // Получаем кнопку закрытия модального окна.
  const closeDialogButton = document.getElementById('close-order-dialog');

  // Получаем скрытое поле выбранного товара.
  const selectedProductInput = document.getElementById('selected-product');

  // Запоминаем кнопку, которая открыла модальное окно.
  let lastActiveElement = null;


  // Перебираем все кнопки «Заказать».
  orderButtons.forEach((button) => {

    button.addEventListener('click', () => {

      // Получаем название товара из data-атрибута.
      const productName = button.dataset.product;

      // Записываем название товара в скрытое поле формы.
      if (selectedProductInput) {
        selectedProductInput.value = productName || '';
      }

      // Запоминаем кнопку для возврата фокуса.
      lastActiveElement = button;

      // Открываем модальное окно.
      if (!orderDialog.open) {
        orderDialog.showModal();
      }

    });

  });


  // Закрываем модальное окно по кнопке «Закрыть».
  if (closeDialogButton) {

    closeDialogButton.addEventListener('click', () => {

      orderDialog.close();

    });

  }


  // Закрываем окно при нажатии на затемнённую область.
  orderDialog.addEventListener('click', (event) => {

    if (event.target === orderDialog) {
      orderDialog.close();
    }

  });


  // После закрытия возвращаем фокус на кнопку открытия.
  orderDialog.addEventListener('close', () => {

    if (lastActiveElement && lastActiveElement.isConnected) {
      lastActiveElement.focus();
    }

    lastActiveElement = null;

  });

});