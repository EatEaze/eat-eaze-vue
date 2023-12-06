<template>
  <div class="auth-modal">
    <transition name="fade">
      <div v-if="isLogining" class="auth-modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Авторизация</h2>
        <div class="input-container">
          <input type="text" placeholder="Логин" v-model="username" :class="{ 'error': usernameError }" />
          <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password"
            :class="{ 'error': passwordError }" />
          <button @click="changeIsLoginig">Еще нет аккаунта?</button>
        </div>
        <button class="auth-button" @click="validateAndLogin">Войти</button>
      </div>
      <div v-else class="auth-modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Регистрация</h2>
        <div class="input-container">
          <input type="text" placeholder="Логин" v-model="username" :class="{ 'error': usernameError }" />
          <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password"
            :class="{ 'error': passwordError }" />
          <button @click="changeIsLoginig">Есть аккаунт?</button>
        </div>
        <button class="auth-button" @click="registrate">Зарегистрироваться</button>
      </div>
    </transition>
  </div>
</template>
  
<script>
//import {v4 as uuidv4} from 'uuid';
import mitt from 'mitt';
import axios from 'axios';

const emitter = mitt();

export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      showPassword: false,
      isLogining: true,
      user: {
        userRoleId: '6974351f-c752-454e-874d-40665fe2cc32',
        login: String,
        password: String
      }
    };
  },
  methods: {
    changeIsLoginig() {
      this.isLogining = !this.isLogining
    },
    async registrate() {
      this.user.login = this.username
      this.user.password = this.password
      try {
        const response = await axios.post(`https://localhost:7242/api/Authorization/Registration`, this.user);
        if (response.status !== 200) {
          console.log("registration error")
        }
        else {
          this.user.login = ""
          this.user.password = ""
          this.changeIsLoginig()
        }
      } catch (error) {
        // Обработка ошибок при запросе
        console.error('An error occurred during authentication:', error);
      }

    },
    validateAndLogin() {
      // Валидация полей
      this.usernameError = this.username.trim() === '';
      this.passwordError = this.password.trim() === '';

      if (!this.usernameError && !this.passwordError) {
        this.login();
      }
    },
    async login() {
      try {
        const response = await axios.get(`https://localhost:7242/api/Authorization/SignIn/${this.username}/${this.password}`);
        // Проверка успешной аутентификации на бэкэнде
        if (response.data && response.data.token) {
          // Сохранение токена в localStorage или другом хранилище
          localStorage.setItem('token', response.data.token);

          emitter.emit('authentificated')

          // Закрытие модального окна
          this.$emit('close');
        } else {
          // Обработка случая неудачной аутентификации
          console.error('Authentication failed');
        }
      } catch (error) {
        // Обработка ошибок при запросе
        console.error('An error occurred during authentication:', error);
      }
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
  background-color: rgba(0, 0, 0, 0.5);
  /* Полупрозрачный фон */
}

.auth-modal-content {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.auth-modal input {
  width: 80%;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-modal button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
}

h2 {
  color: #3498db;
}

.auth-modal .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  margin-left: 50px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

.auth-modal button:hover {
  background-color: #2980b9;
}

.auth-modal input.error {
  border-color: red;
}
</style>