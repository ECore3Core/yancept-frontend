<template>
  <div class="content">
  <div v-if="teacher">

    <button @click="$router.push('/')">Назад</button>
    <h2>Детали преподавателя</h2>
    <!-- Здесь информация о преподавателе -->
    <h1>{{ teacher.lastName }} {{ teacher.firstName }} {{ teacher.middleName }}</h1>
    <img :src="teacher.photoUrl" alt="Фото преподавателя" class="profile-photo" />
    <p>{{ teacher.description }}</p>
    <ul>
      <li v-for="topic in teacher.topics" :key="topic">{{ topic }}</li>
    </ul>
    <button @click="submitApplication" v-if="!applicationSent">Подать заявку</button>
    <button @click="cancelApplication" v-else>Отменить заявку</button>
    <p v-if="applicationMessage" class="status-message">{{ applicationMessage }}</p>
  </div>

  <div v-else>
    <p>Загрузка данных...</p>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { mockTeachers } from '../types.js'

export default {
  name: 'TeacherProfile',
  setup() {
    const route = useRoute()
    const teacher = ref(null)
    const applicationSent = ref(false)
    const applicationMessage = ref("")

    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`https://your-backend-api.com/api/teachers/${route.params.id}`)
        console.log("Полученные данные о преподавателе:", response.data) // <-- Проверка данных
        teacher.value = response.data
      } catch (error) {
        console.warn('Бэкенд недоступен, загружаем мок-данные')
        teacher.value = mockTeachers.find(t => t.id == route.params.id)
        console.log("Загружены мок-данные:", teacher.value) // <-- Проверка мок-данных
      }
    }

    const submitApplication = async () => {
      try {
        await axios.post('https://your-backend-api.com/api/applications', { teacherId: teacher.value.id })
        applicationSent.value = true
        applicationMessage.value = "Заявка успешно отправлена!"
      } catch (error) {
        applicationMessage.value = "Ошибка отправки заявки"
      }
    }

    const cancelApplication = async () => {
      try {
        await axios.delete(`https://your-backend-api.com/api/applications/${teacher.value.id}`)
        applicationSent.value = false
        applicationMessage.value = "Заявка отменена"
      } catch (error) {
        applicationMessage.value = "Ошибка отмены заявки"
      }
    }

    onMounted(fetchTeacher)

    return { teacher, applicationSent, applicationMessage, submitApplication, cancelApplication }
  }
}
</script>

<style scoped>
.teacher-profile {
  padding: 20px;
}

.profile-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.content {
  flex: 1;
  /* Занимает оставшееся пространство */
  padding: 20px;
  overflow-y: auto;
  /* Добавьте прокрутку, если контент слишком длинный */
}

.status-message {
  margin-top: 10px;
  color: green;
}
</style>
