<template>
  <div class="student-profile" v-if="student">
    <button @click="$router.push('/')" class="back-button">Назад</button>
    <h2 class="profile-title">Детали студента</h2>

    <div class="profile-content">
      <div class="card-content">
        <h2 class="student-name">{{ student.secondName }} {{ student.firstName }} {{ student.patronymic }}</h2>
        <p class="student-info">Подробная информация о студенте</p>
      </div>

      <ul class="topics-list" v-if="student?.topics?.length">
        <li v-for="topic in student.topics" :key="topic" class="topic-item">{{ topic }}</li>
      </ul>

      <p>{{ student.description }}</p>
      <p>{{ student.courseName }}</p>
      <button @click="submitApplication" v-if="!applicationSent" class="application-button">Подать заявку</button>
      <button @click="cancelApplication" v-else class="application-button cancel-button">Отменить заявку</button>
      <p v-if="applicationMessage" class="status-message">{{ applicationMessage }}</p>
    </div>
  </div>

  <div v-else class="loading-message">
    <p>Загрузка данных...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { mockstudents } from '../types.js'

export default {
  name: 'studentProfile',
  setup() {
    const route = useRoute()
    const student = ref(null)
    const applicationSent = ref(false)
    const applicationMessage = ref("")

    const fetchstudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${route.params.id}`);
        console.log("Полученные данные о преподавателе:", response.data);
        student.value = response.data;
      } catch (error) {
        console.warn('Бэкенд недоступен, загружаем мок-данные');
        student.value = mockstudents.find(t => t.id == route.params.id);
        console.log("Загружены мок-данные:", student.value);
      }
    };

    const submitApplication = async () => {
      try {
        await axios.post('https://your-backend-api.com/api/applications', { studentId: student.value.id })
        applicationSent.value = true
        applicationMessage.value = "Заявка успешно отправлена!"
      } catch (error) {
        applicationMessage.value = "Ошибка отправки заявки"
      }
    }

    const cancelApplication = async () => {
      try {
        await axios.delete(`https://your-backend-api.com/api/applications/${student.value.id}`)
        applicationSent.value = false
        applicationMessage.value = "Заявка отменена"
      } catch (error) {
        applicationMessage.value = "Ошибка отмены заявки"
      }
    }

    onMounted(fetchstudent)

    return { student, applicationSent, applicationMessage, submitApplication, cancelApplication }
  }
}
</script>

<style scoped>
/* Основной контейнер */
.student-profile {
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f0f4f8); /* Градиентный фон */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень */
  max-width: 800px;
  margin: 20px auto;
  animation: fadeIn 0.5s ease-in-out;
}

/* Кнопка "Назад" */
.back-button {
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

.back-button::after {
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

.back-button:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.back-button:hover {
  box-shadow: 0 4px 15px rgba(78, 84, 200, 0.5); /* Тень при наведении */
}

/* Заголовок страницы */
.profile-title {
  font-size: 2em;
  font-weight: bold;
  color: #2c3e50; /* Темный цвет для заголовка */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Тень для текста */
  margin-bottom: 20px;
}

/* Контент профиля */
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Фото преподавателя */
.profile-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень для фото */
}

/* Имя преподавателя */
.student-name {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50; /* Темный цвет для текста */
  margin: 10px 0;
}

/* Информация о преподавателе */
.student-info {
  font-size: 1em;
  color: #555;
  text-align: center;
}

/* Список тем */
.topics-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.topic-item {
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.topic-item::after {
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

.topic-item:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.topic-item:hover {
  box-shadow: 0 4px 15px rgba(78, 84, 200, 0.5); /* Тень при наведении */
}

/* Поле для ввода сопроводительного письма */
.application-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  margin-top: 20px;
}

/* Кнопки заявки */
.application-button {
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.application-button::after {
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

.application-button:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.application-button:hover {
  box-shadow: 0 4px 15px rgba(78, 84, 200, 0.5); /* Тень при наведении */
}

.cancel-button {
  background: linear-gradient(145deg, #dc3545, #c82333); /* Градиент для кнопки отмены */
}

.cancel-button:hover {
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.5); /* Тень при наведении */
}

/* Сообщение о статусе заявки */
.status-message {
  margin-top: 10px;
  color: green;
  font-weight: bold;
}

/* Сообщение о загрузке */
.loading-message {
  text-align: center;
  font-size: 1.2em;
  color: #555;
  margin-top: 20px;
}

/* Анимация появления */
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
</style>