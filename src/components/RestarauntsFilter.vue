<template>
  <div class="restaurant-filter">
    <label for="restaurantSelect">Выберите ресторан:</label>
    <select v-model="selectedRestaraunt" @change="filterByRestaurant">
      <option value="" disabled>Выберите ресторан</option>
      <option value="all">Все рестораны</option>
      <option v-for="restaurant in restaraunts" :key="restaurant.restarauntId" :value="restaurant.restarauntId">{{
        restaurant.restarauntName }}</option>
    </select>
  </div>
</template>
  
<script>
export default {
  props: {
    restaraunts: Array,
  },
  data() {
    return {
      selectedRestaraunt: "",
    };
  },
  methods: {
    filterByRestaurant() {
      console.log(this.selectedRestaraunt)
      // Вы можете добавить здесь логику для фильтрации карточек товаров по выбранному ресторану
      // Например, можете использовать axios для отправки запроса на сервер с выбранным рестораном
      // и обновления списка foodItems
      this.$emit("filterByRestaurant", this.selectedRestaraunt);
    },
  },
};
</script>
  
<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
  