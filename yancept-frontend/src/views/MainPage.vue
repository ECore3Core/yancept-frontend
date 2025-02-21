<template>
  <main>
    <div class="main-page">
      <h2>Список преподавателей</h2>
      <div class="role-switcher">
        <button @click="setRole('student')" :class="{ active: role === 'student' }">Студент</button>
        <button @click="setRole('teacher')" :class="{ active: role === 'teacher' }">Преподаватель</button>
      </div>

      <div v-if="role === 'student'">
        <h3>Выберите преподавателя:</h3>
        <div class="card-container">
          <router-link
            v-for="teacher in teachers"
            :key="teacher.id"
            :to="`/teacher/${teacher.id}`"
            class="card"
          >
            <img :src="teacher.photoUrl" alt="Фото преподавателя" class="card-photo" />
            <div class="card-content">
              <h2>{{ teacher.lastName }} {{ teacher.firstName }} {{ teacher.middleName }}</h2>
              <p>{{ teacher.description }}</p>
              <ul>
                <li v-for="topic in teacher.topics" :key="topic">{{ topic }}</li>
              </ul>
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="role === 'teacher'">
        <h3>Список студентов</h3>
        <ul>
          <li v-for="student in students" :key="student.id">
            {{ student.lastName }} {{ student.firstName }} (GPA: {{ student.gpa }})
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { mockTeachers, mockStudents } from '../types.js'

export default {
  name: 'MainPage',
  setup() {
    const teachers = ref([])
    const students = ref([])
    const role = ref('student')  // Режим по умолчанию – студент

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/teachers')
        teachers.value = response.data
      } catch (error) {
        console.warn('Бэкенд недоступен, загружаем мок-данные')
        teachers.value = mockTeachers
      }
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/students')
        students.value = response.data
      } catch (error) {
        console.warn('Бэкенд недоступен, загружаем мок-данные')
        students.value = mockStudents
      }
    }

    const setRole = (newRole) => {
      role.value = newRole
    }

    onMounted(() => {
      fetchTeachers()
      fetchStudents()
    })

    return { teachers, students, role, setRole }
  }
}
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

.card-content ul {
  list-style: disc;
  margin: 10px 0 0 20px;
  padding: 0;
}
</style>
