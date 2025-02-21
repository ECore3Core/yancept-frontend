<template>
  <main>
    <div class="main-page">
      <div class="role-switcher">
        <button @click="setRole('student')" :class="{ active: role === 'student' }">Студент</button>
        <button @click="setRole('teacher')" :class="{ active: role === 'teacher' }">Преподаватель</button>
      </div>

      <div v-if="role === 'student'">
        <h2>Список преподавателей</h2>
        <input type="number" v-model="idStudent" placeholder="Введите ваш ID" class="input-field">
        <h3>Выберите преподавателя:</h3>
        <div class="card-container">
          <router-link v-for="teacher in teachers" :key="teacher.id" :to="`/teacher/${teacher.id}`" class="card">
            <div class="card-content">
              <h2>{{ teacher.secondName }} {{ teacher.firstName }} {{ teacher.patronymic }}</h2>
              <p>{{ teacher.description }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="role === 'teacher'">
        <input type="number" v-model="idTeacher" placeholder="Введите ваш ID" class="input-field">
        <h2>Студенты</h2>
        <button @click="fetchStudents" class="action-button">Загрузить студентов</button>
        <h3>Список студентов, которые хотят к вам пойти:</h3>
        <div class="card-container">
          <router-link v-for="student in students" :key="student.id" :to="`/student/${student.id}`" class="card">
            <div class="card-content">
              <h2>{{ student.secondName }} {{ student.firstName }} {{ student.patronymic }}</h2>
              <p>{{ student.description }}</p>
              <p>{{ student.courseName }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { mockTeachers, mockStudents } from '../types.js';

export default {
  name: 'MainPage',
  setup() {
    const teachers = ref([]);
    const students = ref([]);
    const role = ref('student'); // Режим по умолчанию – студент
    const idStudent = ref("");
    const idTeacher = ref("");

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teacher');
        console.log('Полученные данные от бэка:', response); // Отладочный вывод
        teachers.value = response.data;
      } catch (error) {
        console.warn('Ошибка при загрузке преподавателей, загружаем мок-данные', error);
        teachers.value = mockTeachers;
      }
    };

    const fetchStudents = async () => {
      if (!idTeacher.value) {
        console.warn('Введите ID преподавателя');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/request/in-process/teacher/${idTeacher.value}`);
        console.log(idTeacher.value);
        console.log('Полученные данные студентов:', response.data);
        students.value = response.data;
      } catch (error) {
        console.warn('Ошибка при загрузке студентов, загружаем мок-данные', error);
        students.value = mockStudents;
      }
    };

    const setRole = (newRole) => {
      role.value = newRole;
    };

    onMounted(() => {
      fetchTeachers();
    });

    return { teachers, students, role, setRole, idStudent, idTeacher, fetchStudents };
  }
};
</script>

<style scoped>
/* Основные стили */
.main-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(145deg, #f9fafb, #e0e4e8); /* Градиентный фон */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Переключатель ролей */
.role-switcher {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.role-switcher button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: #ffffff;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.role-switcher button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s ease;
}

.role-switcher button:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.role-switcher button:hover {
  box-shadow: 0 4px 15px rgba(78, 84, 200, 0.5); /* Тень при наведении */
}

.role-switcher button.active {
  background: linear-gradient(145deg, #8f94fb, #4e54c8); /* Инвертированный градиент для активной кнопки */
}

/* Поле ввода */
.input-field {
  width: 98.5%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4e54c8;
  outline: none;
}

/* Карточки */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  display: block;
  width: 250px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.card-content {
  padding: 20px;
}

.card-content h2 {
  font-size: 1.2em;
  margin: 0 0 10px;
  color: #2c3e50; /* Темный цвет для заголовка */
}

.card-content p {
  font-size: 0.9em;
  color: #555;
  margin: 5px 0;
}

/* Кнопка "Загрузить студентов" */
.action-button {
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.action-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s ease;
}

.action-button:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.action-button:hover {
  box-shadow: 0 4px 15px rgba(78, 84, 200, 0.5); /* Тень при наведении */
}

/* Анимации */
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

.main-page {
  animation: fadeIn 0.5s ease-in-out;
}
</style>