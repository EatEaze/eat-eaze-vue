<template>
  <header class="bg-blue-500 p-4 text-white">
    <div class="header-content flex justify-between items-center container mx-auto">
      <h1 class="text-2xl font-bold ml-0 transition duration-300 ease-in-out transform hover:scale-105">Eat Eaze Delivery
      </h1>
      <div class="footer-buttons flex items-center space-x-6">
        <button v-if="!isAuthenticated"
          class="auth-button px-4 py-2 bg-white text-blue-500 rounded-full border border-blue-500 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white transform hover:scale-105"
          @click="showAuthModal">Авторизоваться</button>
        <button v-else
          class="auth-button px-4 py-2 bg-white text-blue-500 rounded-full border border-blue-500 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white transform hover:scale-105"
          @click="logout">Выйти</button>
        <button
          class="cart-button p-3 bg-white rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          @click="toggleCart"
        >
          <img src="https://www.svgrepo.com/show/34974/shopping-cart.svg" alt="Корзина" class="w-6 h-6" />
        </button>
      </div>
    </div>
    <auth-modal v-if="isAuthModalVisible" @authentificated="onAuthenticated" @close="hideAuthModal"/>
    <basket-modal :show="showCart" @close="toggleCart"/>
  </header>
</template>

<script>
import AuthModal from './AuthModal.vue';
import BasketModal from './BasketModal.vue';

export default {
  components: {
    AuthModal,
    BasketModal
  },
  data() {
    return {
      isAuthenticated: false,
      isAuthModalVisible: false,
      showCart: false
    };
  },
  methods: {
    showAuthModal() {
      this.isAuthModalVisible = true;
    },
    hideAuthModal() {
      this.isAuthModalVisible = false;
    },
    handleLogined() {
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$emitter.emit('loggedOut')
    },
    onAuthenticated() {
      this.isAuthenticated = true;
    },
    isAuthenticatedOnStart() {
      if (localStorage.getItem('token') !== null) {
        this.isAuthenticated = true
      }
    },
    toggleCart() {
      if (localStorage.getItem('token') !== null) {
        this.showCart = !this.showCart;
      }
      else {
        this.$emitter.emit('authError')
      }
    },
  },
  created() {
    this.isAuthenticatedOnStart()
  }
};
</script>


  
  
  