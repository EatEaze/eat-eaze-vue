<template>
  <div class="flex items-center mb-4 relative">
    <img :src="item.item.imageURL" alt="Product Image" class="w-16 h-16 object-cover mr-4">
    <div>
      <h3 class="text-lg font-semibold">{{ item.item.positionName }}</h3>
      <div class="flex items-center">
        <div class="flex items-center">
          <button @click="decrement" class="bg-blue-500 text-white py-1 px-2 rounded-full mr-2">-</button>
          <span class="mr-2">{{ item.count }}</span>
          <button @click="increment" class="bg-blue-500 text-white py-1 px-2 rounded-full">+</button>
        </div>
      </div>
      <!-- Переместил надпись с ценой справа налево и добавил стили для отступа снизу -->
      <p class="text-gray-500 text-sm mt-2">{{ calculatePrice(item) }} руб. </p>
    </div>
    <!-- Добавленная кнопка удаления -->
    <button @click="removeItem" class="absolute top-0 right-0 mt-2 mr-2 text-red-500 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    item: Object,
  },
  methods: {
    calculatePrice(item) {
      return `${(item.item.price * item.count).toFixed(2)}`
    },
    increment() {
      this.$emit('increment', this.item);
    },
    decrement() {
      this.$emit('decrement', this.item);
    },
    removeItem() {
      this.$emit('removeItem', this.item);
    },
   
  },
};
</script>
