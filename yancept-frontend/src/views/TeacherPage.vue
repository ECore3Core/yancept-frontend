<template>
  <div class="teacher-page">
    <div class="header">
      <img :src="teacher.photoUrl" alt="Фото преподавателя" class="teacher-photo" />
      <div class="teacher-info">
        <h1>{{ teacher.lastName }} {{ teacher.firstName }} {{ teacher.middleName }}</h1>
      </div>
    </div>

    <div class="topics">
      <h2>Доступные темы проектов</h2>
      <ul>
        <li 
          v-for="topic in teacher.topics" 
          :key="topic.id" 
          :class="{ active: selectedTopic && selectedTopic.id === topic.id }"
          @click="selectTopic(topic)"
        >
          {{ topic.name }}
        </li>
      </ul>
    </div>

    <div class="application">
      <h2>Сопроводительное письмо</h2>
      <textarea v-model="coverLetter" placeholder="Напишите сопроводительное письмо..."></textarea>
      <button @click="submitApplication">Подать заявку</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'TeacherPage',
  setup() {
    const route = useRoute()
    const teacher = ref({
      // начальные значения для безопасности доступа
      id: null,
      photoUrl: '',
      firstName: '',
      lastName: '',
      middleName: '',
      topics: []
    })
    const selectedTopic = ref(null)
    const coverLetter = ref('')

    const fetchTeacher = async () => {
      const teacherId = route.params.id
      try {
        // Замените URL на актуальный адрес API для получения данных преподавателя
        const response = await axios.get(`https://your-backend-api.com/api/teachers/${teacherId}`)
        teacher.value = response.data
      } catch (error) {
        console.error('Ошибка загрузки данных преподавателя:', error)
      }
    }

    const selectTopic = (topic) => {
      selectedTopic.value = topic
    }

    const submitApplication = () => {
      if (!selectedTopic.value) {
        alert('Пожалуйста, выберите тему проекта.')
        return
      }
      const applicationData = {
        teacherId: teacher.value.id,
        topicId: selectedTopic.value.id,
        coverLetter: coverLetter.value
      }
      // Замените URL на актуальный адрес API для отправки заявки
      axios.post('https://your-backend-api.com/api/applications', applicationData)
        .then(() => {
          alert('Заявка успешно отправлена!')
        })
        .catch(error => {
          console.error('Ошибка отправки заявки:', error)
          alert('Ошибка отправки заявки.')
        })
    }

    onMounted(() => {
      fetchTeacher()
    })

    return {
      teacher,
      selectedTopic,
      coverLetter,
      selectTopic,
      submitApplication
    }
  }
}
</script>

<style scoped>
.teacher-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.teacher-photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.teacher-info h1 {
  font-size: 1.8em;
  margin: 0;
}

.topics {
  margin-bottom: 20px;
}

.topics h2 {
  margin-bottom: 10px;
}

.topics ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.topics li {
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.topics li.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.application h2 {
  margin-bottom: 10px;
}

.application textarea {
  width: 100%;
  height: 100px;
  resize: vertical;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  margin-bottom: 10px;
}

.application button {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.application button:hover {
  background-color: #369d75;
}
</style>
