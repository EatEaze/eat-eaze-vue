<template>
    <header>
      <div class="header-content">
        <h1>Eat Eaze Delivery</h1>
        <div class="footer-buttons">
          <button class="auth-button" @click="showAuthModal">Авторизоваться</button>
          <button class="cart-button">
            <img src="https://www.svgrepo.com/show/34974/shopping-cart.svg" alt="Корзина" />
          </button>
        </div>
      </div>
      <auth-modal v-if="isAuthModalVisible" @close="hideAuthModal" />
    </header>
  </template>
    
  <script>
    import AuthModal from './AuthModal.vue';
    
    export default {
      components: {
        AuthModal
      },
      data() {
        return {
          isAuthModalVisible: false
        };
      },
      methods: {
        showAuthModal() {
          this.isAuthModalVisible = true;
        },
        hideAuthModal() {
          this.isAuthModalVisible = false;
        }
      }
    };
  </script>

<style scoped>
  header {
  background-color: #3498db; /* Цвет фона */
  color: #fff; /* Цвет текста */
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Тень */
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
  margin: 0;
  font-family: 'Your Chosen Font', sans-serif; /* Замените 'Your Chosen Font' на выбранный вами шрифт */
  font-size: 32px;
  }

  .footer-buttons {
    display: flex;
  }

  .auth-button,
  .cart-button {
    font-family: 'Trebuchet MS';
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 18px;
    color: #fff;
    transition: color 0.3s ease-in-out;
  }

  .auth-button:hover {
    color: #34dbcb;
  }
  .cart-button:hover {
    transform: scale(1.05); /* Цвет при наведении */
  }

  .cart-button img {
    width: 50px; /* Замените на размер вашей картинки корзины */
  }

</style>
  
  
  