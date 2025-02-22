<template>
    <header class="header">
      <div class="header__content">
        <h1 class="header__title">Личный кабинет Самарского университета</h1>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'TheHeader',
  };
  </script>
  
  <style scoped>
  /* Шапка */
  .header {
    background: linear-gradient(145deg, #4e54c8, #8f94fb); /* Градиентный фон */
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень */
    color: #ffffff; /* Белый текст */
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  /* Анимация фона */
  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10.01%);
    background-size: 20px 20px;
    animation: moveBackground 3s linear infinite;
  }
  
  @keyframes moveBackground {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
  
  /* Контент шапки */
  .header__content {
    position: relative;
    z-index: 2;
  }
  
  /* Заголовок */
  .header__title {
    font-size: 2em;
    font-weight: bold;
    margin: 0;
    color: #ffffff; /* Белый текст */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Тень для текста */
    animation: fadeIn 1s ease-in-out;
  }
  
  /* Анимация появления заголовка */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Адаптивные стили для мобильных устройств */
  @media (max-width: 768px) {
    .header__title {
      font-size: 1.5em;
    }
  }
  
  @media (max-width: 480px) {
    .header__title {
      font-size: 1.2em;
    }
  }
  </style>