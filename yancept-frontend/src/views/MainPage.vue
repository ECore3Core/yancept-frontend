<template>
  <main>
    <div class="main-page">
      <div class="role-switcher">
        <button @click="setRole('student')" :class="{ active: role === 'student' }">Студент</button>
        <button @click="setRole('teacher')" :class="{ active: role === 'teacher' }">Преподаватель</button>
      </div>

      <div v-if="role === 'student'">
        <h2>Список преподавателей</h2>
        <input type="number" v-model="idStudent" placeholder="Введите ваш ID">
        <h3>Выберите преподавателя:</h3>
        <div class="card-container">
          <router-link v-for="teacher in teachers" :key="teacher.id" :to="`/teacher/${teacher.id}`" class="card">
            <img :src="teacher.photoUrl || 'default-photo.jpg'" alt="Фото преподавателя" class="card-photo" />
            <div class="card-content">
              <h2>{{ teacher.secondName }} {{ teacher.firstName }} {{ teacher.patronymic }}</h2>
              <p>{{ teacher.description }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="role === 'teacher'">
        <input type="number" v-model="idTeacher" placeholder="Введите ваш ID">
        <h2>Студенты</h2>
        <button @click="fetchStudents">Загрузить студентов</button>
        <h3>Список студентов, которые хотят к вам пойти:</h3>
        <div class="card-container">
          <router-link v-for="student in students" :key="student.id" :to="`/student/${student.id}`" class="card">
            <!--<img :src="teacher.photoUrl || 'default-photo.jpg'" alt="Фото преподавателя" class="card-photo" />-->
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
        console.log(idTeacher.value)
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

    

    return { teachers, students, role, setRole,idStudent,idTeacher,fetchStudents };
  }
};
</script>

<style scoped>
.main-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.role-switcher {
  margin-bottom: 20px;
}

.role-switcher button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.role-switcher button.active,
.role-switcher button:hover {
  background-color: #007bff;
  color: #fff;
}

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
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  color: inherit;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.card-photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 10px;
}

.card-content h2 {
  font-size: 1.2em;
  margin: 0 0 10px;
}

.card-content p {
  font-size: 0.9em;
  color: #555;
}
</style>
