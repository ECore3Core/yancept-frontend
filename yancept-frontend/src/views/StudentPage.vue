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

      <!-- Кнопки для принятия или отказа -->
      <div class="action-buttons">
        <button @click="acceptStudent" class="application-button accept-button">Принять студента</button>
        <button @click="openRejectModal" class="application-button reject-button">Отказать студенту</button>
      </div>

      <!-- Модальное окно для отказа -->
      <div v-if="showRejectModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Укажите причину отказа</h3>
          <textarea v-model="rejectReason" placeholder="Введите причину отказа..." class="reject-textarea"></textarea>
          <div class="modal-buttons">
            <button @click="rejectStudent" class="modal-button confirm-button">Подтвердить</button>
            <button @click="closeRejectModal" class="modal-button cancel-button">Отмена</button>
          </div>
        </div>
      </div>

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
  name: 'StudentProfile',
  setup() {
    const route = useRoute()
    const student = ref(null)
    const applicationMessage = ref("")
    const showRejectModal = ref(false) // Открытие модального окна для отказа
    const rejectReason = ref("") // Причина отказа

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/student/${route.params.id}`);
        console.log("Полученные данные о студенте:", response.data);
        student.value = response.data;
      } catch (error) {
        console.warn('Бэкенд недоступен, загружаем мок-данные');
        student.value = mockstudents.find(t => t.id == route.params.id);
        console.log("Загружены мок-данные:", student.value);
      }
    };

    // Принять студента
    const acceptStudent = async () => {
      try {
        await axios.post('https://your-backend-api.com/api/accept-student', { studentId: student.value.id });
        applicationMessage.value = "Студент успешно принят!";
      } catch (error) {
        applicationMessage.value = "Ошибка при принятии студента";
      }
    };

    // Открыть модальное окно для отказа
    const openRejectModal = () => {
      showRejectModal.value = true;
    };

    // Закрыть модальное окно
    const closeRejectModal = () => {
      showRejectModal.value = false;
      rejectReason.value = ""; // Очищаем поле ввода
    };

    // Отказать студенту
    const rejectStudent = async () => {
      if (!rejectReason.value) {
        applicationMessage.value = "Укажите причину отказа";
        return;
      }

      try {
        await axios.post('https://your-backend-api.com/api/reject-student', {
          studentId: student.value.id,
          reason: rejectReason.value,
        });
        applicationMessage.value = "Студенту отправлен отказ с причиной: " + rejectReason.value;
        closeRejectModal();
      } catch (error) {
        applicationMessage.value = "Ошибка при отправке отказа";
      }
    };

    onMounted(fetchStudent);

    return {
      student,
      applicationMessage,
      showRejectModal,
      rejectReason,
      acceptStudent,
      openRejectModal,
      closeRejectModal,
      rejectStudent,
    };
  },
};
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

/* Имя студента */
.student-name {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50; /* Темный цвет для текста */
  margin: 10px 0;
}

/* Информация о студенте */
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

/* Кнопки действий */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.application-button {
  background: linear-gradient(145deg, #4e54c8, #8f94fb);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
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

/* Кнопка "Принять" */
.accept-button {
  background: linear-gradient(145deg, #28a745, #218838); /* Зеленый градиент */
}

/* Кнопка "Отказать" */
.reject-button {
  background: linear-gradient(145deg, #dc3545, #c82333); /* Красный градиент */
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.modal-content h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #2c3e50;
}

.reject-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  margin-bottom: 20px;
  resize: vertical;
  min-height: 100px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.modal-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-button {
  background: linear-gradient(145deg, #dc3545, #c82333); /* Красный градиент */
  color: #ffffff;
}

.cancel-button {
  background: linear-gradient(145deg, #6c757d, #5a6268); /* Серый градиент */
  color: #ffffff;
}

.modal-button:hover {
  opacity: 0.9;
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