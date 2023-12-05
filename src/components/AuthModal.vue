<template>
  <div class="auth-modal">
    <transition name="fade">
      <div class="auth-modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>Авторизация</h2>
        <div class="input-container">
          <input type="text" placeholder="Логин" v-model="username" :class="{ 'error': usernameError }" />
          <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password"
            :class="{ 'error': passwordError }" />
          <!--<button class="reg-button" @click="openRegistration">Зарегистрироваться</button>-->
        </div>
        <button class="auth-button" @click="validateAndLogin">Войти</button>
      </div>
    </transition>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      showPassword: false
    };
  },
  methods: {
    validateAndLogin() {
      // Валидация полей
      this.usernameError = this.username.trim() === '';
      this.passwordError = this.password.trim() === '';

      if (!this.usernameError && !this.passwordError) {
        this.login();
      }
    },
    login() {
      // todo: связать с бэкэндом
      this.$emit('close');
    },
    closeModal() {
      this.$emit('close');
    },
    openRegistration() {

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