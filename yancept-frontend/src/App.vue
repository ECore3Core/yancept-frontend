<template>
  <div class="container">
    <TheHeader class="header" />
    <div class="content-wrapper">
      <SideMenu class="sidebar" />
      <div class="main">
        <router-view v-if="$route.name === 'TeacherPage'" />
        <router-view v-else-if="$route.name === 'StudentPage'" />
        <MainPage v-else />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import SideMenu from './components/SideMenu.vue';
import MainPage from './views/MainPage.vue';

export default {
  name: 'App',
  components: { TheHeader, SideMenu, MainPage }
}
</script>

<style>
/* Глобальные стили */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9fafb; /* Светлый фон для всей страницы */
  color: #333; /* Основной цвет текста */
}

/* Контейнер для всей страницы */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(145deg, #ffffff, #f0f4f8); /* Легкий градиент для фона */
}

/* Хедер */
.header {
  background-color: #ffffff;
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень для хедера */
  z-index: 10; /* Чтобы хедер был выше других элементов */
}

/* Обертка для контента и боковой панели */
.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden; /* Чтобы избежать лишних прокруток */
}

/* Боковая панель */
.sidebar {
  width: 250px; /* Фиксированная ширина боковой панели */
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Тень для боковой панели */
  z-index: 5; /* Чтобы боковая панель была выше основного контента */
  transition: all 0.3s ease; /* Плавные переходы */
}

.sidebar:hover {
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15); /* Увеличенная тень при наведении */
}

/* Основная часть страницы */
.main {
  flex: 1; /* Занимает оставшееся пространство */
  padding: 25px;
  overflow-y: auto; /* Добавьте прокрутку, если контент слишком длинный */
  
  background-color: #ffffff;
  border-radius: 12px 0 0 0; /* Закругленные углы */
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); /* Тень для основного контента */
  transition: all 0.3s ease; /* Плавные переходы */
}

.main:hover {
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.15); /* Увеличенная тень при наведении */
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 768px) {
  .sidebar {
    width: 200px; /* Уменьшаем ширину боковой панели */
    padding: 15px;
  }

  .main {
    margin-left: 200px; /* Уменьшаем отступ для основного контента */
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%; /* Боковая панель на всю ширину */
    position: fixed;
    height: 100vh;
    transform: translateX(-100%); /* Скрываем панель */
    transition: transform 0.3s ease;
  }

  .sidebar.active {
    transform: translateX(0); /* Показываем панель */
  }

  .main {
    margin-left: 0; /* Убираем отступ */
    padding: 10px;
  }
}

/* Дополнительные улучшения */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50; /* Темный цвет для заголовков */
  margin-bottom: 15px;
}

p {
  line-height: 1.6; /* Улучшенная читаемость текста */
  color: #555;
}

button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Темнее при наведении */
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>