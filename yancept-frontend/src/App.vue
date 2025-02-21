<template>
  <div class="container">
    <TheHeader class="header" />
    <div class="content-wrapper">
      <SideMenu class="sidebar" />
      <div class="main">
        <router-view v-if="$route.name === 'TeacherPage'" />
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Контейнер для всей страницы */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Хедер */
.header {
  background-color: #f4f4f4;
  padding: 10px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Обертка для контента и боковой панели */
.content-wrapper {
  display: flex;
  flex: 1;
}

/* Боковая панель */
.sidebar {
  width: 250px; /* Фиксированная ширина боковой панели */
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Основная часть страницы */
.main {
  flex: 1; /* Занимает оставшееся пространство */
  padding: 20px;
  overflow-y: auto; /* Добавьте прокрутку, если контент слишком длинный */
  margin-left: 250px; /* Отступ слева, равный ширине боковой панели */
}
</style>