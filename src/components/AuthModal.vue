<template>
    <div class="auth-modal">
      <div class="auth-modal-content">
        <!-- Здесь разместите содержимое вашего окна авторизации -->
        <!-- Например, поля ввода логина и пароля, кнопка входа и т.д. -->
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Авторизация</h2>
        <input type="text" placeholder="Логин" v-model="username" />
        <input type="password" placeholder="Пароль" v-model="password" />
        <button @click="login">Войти</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Здесь можно добавить логику для обработки входа
        // Например, отправка данных на сервер для аутентификации
        // В данном примере просто закрываем модальное окно
        this.$emit('close');
      },
      closeModal() {
        this.$emit('close');
        }
    }
  };
  </script>
  
  <style scoped>
  .auth-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  }
  
  .auth-modal-content {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .auth-modal input {
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-modal button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
}

.auth-modal button:hover {
  background-color: #2980b9;
}
  </style>