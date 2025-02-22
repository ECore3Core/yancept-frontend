<template>
    <aside class="sidebar">
      <div class="sidebar__container">
        <div class="menu">
          <nav class="menu__nav">
            <ul class="menu__list">
              <li class="menu__item">
                <a class="menu__link" href="ssau.html">
                  <span class="menu__icon">🏠</span>
                  <span class="menu__text">Главная</span>
                </a>
              </li>
              <li class="menu__item">
                <a class="menu__link" href="/messenger">
                  <span class="menu__icon">💬</span>
                  <span class="menu__text">Мессенджер</span>
                </a>
              </li>
              <li class="menu__item">
                <a class="menu__link" href="/schedule">
                  <span class="menu__icon">📅</span>
                  <span class="menu__text">Расписание</span>
                </a>
              </li>
              <li class="menu__item">
                <a class="menu__link" href="/portfolio/resume">
                  <span class="menu__icon">📁</span>
                  <span class="menu__text">Портфолио</span>
                </a>
              </li>
              <li class="menu__item">
                <a class="menu__link" href="/vacancies?type=job">
                  <span class="menu__icon">💼</span>
                  <span class="menu__text">Вакансии</span>
                </a>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">📚</span>
                    <span class="menu__text">Учёба</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/e-journal/student">Электронный журнал</a>
                    </li>
                    <li class="submenu__item">
                      <a class="submenu__link" href="/approval/student">Согласование работ</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">🎓</span>
                    <span class="menu__text">ИОТ</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/cabinet/study/educational-trajectory">Выбор дисциплин</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">🎉</span>
                    <span class="menu__text">Выпускнику</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/bypass-sheets/student">Обходной лист</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">📰</span>
                    <span class="menu__text">Информация</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/info/news">Новости</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">👤</span>
                    <span class="menu__text">Профиль</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/profile/about-me/main">О себе</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">🔬</span>
                    <span class="menu__text">Наука</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/research/patents">Патенты</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li class="menu__item menu__item--dropdown">
                <details>
                  <summary class="menu__header">
                    <span class="menu__icon">📊</span>
                    <span class="menu__text">НИР</span>
                    <span class="menu__arrow">▼</span>
                  </summary>
                  <ul class="submenu">
                    <li class="submenu__item">
                      <a class="submenu__link" href="/research/nir">Выбор преподавателя/студента на НИР</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'SideMenu',
  };
  </script>
  
  <style scoped>
  /* Боковая панель */
  .sidebar {
    width: 250px;
    background: linear-gradient(145deg, #4e54c8, #8f94fb); /* Градиентный фон */
    padding: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 5;
    transition: all 0.3s ease;
    color: #ffffff; /* Белый текст */
  }
  
  .sidebar:hover {
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
  }
  
  /* Меню */
  .menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu__item {
    margin-bottom: 10px;
  }
  
  .menu__link,
  .menu__header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 8px;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .menu__link:hover,
  .menu__header:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Полупрозрачный фон при наведении */
    transform: translateX(5px); /* Сдвиг вправо при наведении */
  }
  
  .menu__icon {
    font-size: 1.2em;
    margin-right: 10px;
  }
  
  .menu__text {
    font-size: 1em;
    font-weight: 500;
    flex-grow: 1;
  }
  
  .menu__arrow {
    font-size: 0.8em;
    transition: transform 0.3s ease;
  }
  
  /* Выпадающие списки */
  details[open] .menu__arrow {
    transform: rotate(180deg);
  }
  
  .submenu {
    list-style: none;
    padding-left: 20px;
    margin-top: 5px;
  }
  
  .submenu__item {
    margin-bottom: 5px;
  }
  
  .submenu__link {
    display: block;
    padding: 8px 15px;
    border-radius: 6px;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .submenu__link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  /* Анимации */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .menu__item {
    animation: slideIn 0.5s ease-in-out;
  }
  
  .menu__item:nth-child(1) { animation-delay: 0.1s; }
  .menu__item:nth-child(2) { animation-delay: 0.2s; }
  .menu__item:nth-child(3) { animation-delay: 0.3s; }
  .menu__item:nth-child(4) { animation-delay: 0.4s; }
  .menu__item:nth-child(5) { animation-delay: 0.5s; }
  
  /* Адаптивные стили для мобильных устройств */
  @media (max-width: 768px) {
    .sidebar {
      width: 200px;
      padding: 15px;
    }
  
    .menu__link,
    .menu__header {
      padding: 8px 12px;
    }
  }
  
  @media (max-width: 480px) {
    .sidebar {
      width: 100%;
      position: fixed;
      height: 100vh;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
  
    .sidebar.active {
      transform: translateX(0);
    }
  
    .menu__link,
    .menu__header {
      padding: 10px 15px;
    }
  }
  </style>