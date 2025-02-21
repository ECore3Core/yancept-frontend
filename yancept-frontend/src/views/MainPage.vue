<template>
  <div class="main-page">
    <h1>Список преподавателей</h1>
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
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'MainPage',
  setup() {
    const teachers = ref([])

    // Функция для получения списка преподавателей с backend сервера
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/teachers')
        teachers.value = response.data
      } catch (error) {
        console.error('Ошибка загрузки преподавателей:', error)
      }
    }

    onMounted(() => {
      fetchTeachers()
    })

    return {
      teachers
    }
  }
}
</script>

<style scoped>
.main-page {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Стили карточки */
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
