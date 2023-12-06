<template>
  <div class="food-card rounded-lg overflow-hidden shadow-lg bg-white">
    <div class="relative h-48">
      <img :src="position.imageURL" alt="Position Image" class="w-full h-full object-cover" />
      <div v-if="position.restarauntImageURL" class="restaurant-logo">
        <img :src="position.restarauntImageURL" alt="Restaurant Logo" class="w-8 h-8 rounded-full" />
      </div>
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 truncate">{{ position.positionName }}</div>
      <div class="text-gray-600 mb-2 truncate">{{ position.restarauntName }}</div>
      <div class="flex justify-between items-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue" @click="addToCart">
          Добавить в корзину
        </button>
        <div class="text-xl font-bold">{{ position.price }} руб.</div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    position: Object,
  },
  data() {
    return {
      showErrorModal: false,
      errorMessage: "",
    }

  },
  methods: {
    addToCart() {
      // Проверка на авторизацию пользователя
      if (localStorage.getItem('token') === null) {
        this.showErrorModal = true;
        this.errorMessage = "Для добавления в корзину необходимо авторизоваться.";
        //this.$emit('showErrorModal', true, "Для добавления в корзину необходимо авторизоваться.");
      } else {
        // Логика добавления в корзину
        // ...
      }
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
  },
};



</script>
  
<style scoped>
.food-card {
  transition: transform 0.3s;
}

.food-card:hover {
  transform: scale(1.05);
}

.restaurant-logo {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
  
  