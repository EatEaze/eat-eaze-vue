<template>
  <div class="auth-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
    <transition name="fade">
      <div v-if="isLogining" class="auth-modal-content bg-white p-8 rounded-md shadow-md relative">
        <button class="close-button absolute top-0 right-0 p-4" @click="closeModal">&times;</button>
        <h2 class="text-2xl font-bold mb-4">Авторизация</h2>
        <div class="input-container mb-4 ">
          <input type="text" placeholder="Логин" v-model="username" :class="{ 'error': usernameError }"
            class="w-full p-2 border border-gray-300 rounded mb-2 bg-gray-100" />
          <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password"
            :class="{ 'error': passwordError }" class="w-full p-2 border border-gray-300 rounded mb-2 bg-gray-100" />
          <button @click="changeIsLoginig" class="text-blue-500">Еще нет аккаунта?</button>
        </div>
        <button class="auth-button bg-blue-500 text-white py-2 px-4 rounded" @click="validateAndLogin">Войти</button>
        <div v-if="loginErrorMessage" class="text-red-500 mb-4">{{ loginErrorMessage }}</div>
      </div>
      <div v-else class="auth-modal-content bg-white p-8 rounded-md shadow-md relative">
        <button class="close-button absolute top-0 right-0 p-4" @click="closeModal">&times;</button>
        <h2 class="text-2xl font-bold mb-4">Регистрация</h2>
        <div class="input-container mb-4">
          <input type="text" placeholder="Логин" v-model="username" :class="{ 'error': usernameError }"
            class="w-full p-2 border border-gray-300 rounded mb-2 bg-gray-100" />
          <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password"
            :class="{ 'error': passwordError }" class="w-full p-2 border border-gray-300 rounded mb-2 bg-gray-100" />
          <button @click="changeIsLoginig" class="text-blue-500">Есть аккаунт?</button>
        </div>
        <button class="auth-button bg-blue-500 text-white py-2 px-4 rounded"
          @click="validateAndRegister">Зарегистрироваться</button>
      </div>
    </transition>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      showPassword: false,
      isLogining: true,
      loginErrorMessage: '',
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
    validateAndRegister() {
      this.usernameError = this.username.trim() === '';
      this.passwordError = this.password.trim() === '';

      if (!this.usernameError && !this.passwordError) {
        this.registrate();
      }
    },
    async registrate() {
      this.user.login = this.username
      this.user.password = this.password
      try {
        const response = await axios.post(`https://localhost:7242/api/Authorization/Registration`, this.user);
        if (response.status !== 200) {
          console.log("registration error")
        }
        this.user.login = ""
        this.user.password = ""
        this.changeIsLoginig()
      } catch (error) {
        // Обработка ошибок при запросе
        console.error('An error occurred during authentication:', error);
      }

    },
    async validateAndLogin() {
      // Валидация полей
      this.usernameError = this.username.trim() === '';
      this.passwordError = this.password.trim() === '';

      if (!this.usernameError && !this.passwordError) {
        await this.login();
        this.$emitter.emit('authentificatedForBasket')
      }
    },
    async login() {
      try {
        const response = await axios.get(`https://localhost:7242/api/Authorization/SignIn/${this.username}/${this.password}`);
        // Проверка успешной аутентификации на бэкэнде
        if (response.data && response.data.token) {
          // Сохранение токена в localStorage или другом хранилище
          localStorage.setItem('token', response.data.token);
          this.$emit('authentificated')
          // Закрытие модального окна
          this.$emit('close');
        } else {
          // Обработка случая неудачной аутентификации
          console.error('Authentication failed');
        }
      } catch (error) {
        // Обработка ошибок при запросе
        this.loginErrorMessage = 'Неправильный логин или пароль';
        console.error('An error occurred during authentication:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style>
.error {
  border-color: red;
}
</style>

  