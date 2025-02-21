<template>
    <aside class="sidebar">
        <div class="sidebar__container">
            <div class="menu">
                <nav class="menu__nav">
                    <ul class="menu__list">
                        <li class="menu__item">
                            <a class="menu__link" href="ssau.html">Главная</a>
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="/messenger">Мессенджер</a>
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="/schedule">Расписание</a>
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="/portfolio/resume">Портфолио</a>
                        </li>
                        <li class="menu__item">
                            <a class="menu__link" href="/vacancies?type=job">Вакансии</a>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">Учёба</summary>
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
                                <summary class="menu__header">ИОТ</summary>
                                <ul class="submenu">
                                    <li class="submenu__item">
                                        <a class="submenu__link" href="/cabinet/study/educational-trajectory">Выбор дисциплин</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">Выпускнику</summary>
                                <ul class="submenu">
                                    <li class="submenu__item">
                                        <a class="submenu__link" href="/bypass-sheets/student">Обходной лист</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">Информация</summary>
                                <ul class="submenu">
                                    <li class="submenu__item">
                                        <a class="submenu__link" href="/info/news">Новости</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">Профиль</summary>
                                <ul class="submenu">
                                    <li class="submenu__item">
                                        <a class="submenu__link" href="/profile/about-me/main">О себе</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">Наука</summary>
                                <ul class="submenu">
                                    <li class="submenu__item">
                                        <a class="submenu__link" href="/research/patents">Патенты</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li class="menu__item menu__item--dropdown">
                            <details>
                                <summary class="menu__header">НИР</summary>
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
    // Логика компонента
}
</script>

<style scoped>
/* Здесь можно добавить стили для sidebar, menu и submenu */
.sidebar {
    width: 250px; /* Ширина боковой панели */
    height: 100vh; /* Высота на весь экран */
    position: fixed; /* Фиксируем сбоку */
    left: 0;
    top: 0;
    background-color: #f4f4f4; /* Фон */
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
.sidebar__container{
    margin-top: 12vh;
}
.content {
    margin-left: 270px; /* Отступ слева, чтобы контент не накладывался */
    padding: 20px;
    width: calc(100% - 270px); /* Оставшееся пространство */
}
</style>
