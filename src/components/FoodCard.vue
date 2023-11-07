<template>
  <div class="position-card">
    <img :src="position.ImageURL" alt="Position Image" />
    <h3>{{ position.PositionName }}</h3>
    <p>Цена: {{ position.Count }}</p>
    <p>Категория: {{ position.Category.CategoryName }}</p>
    <p>Ресторан: {{ position.Restaraunt.RestaurantName }}</p>
  </div>
</template>
  
<script>
  export default {
    props: {
      position: Object,
    },
  };
</script>
  
  <style scoped>
  .position-card {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    background-color: #ffffff; /* Белый фон */
  }
  
  .order-button {
    background-color: #6a0dad; /* Фиолетовый цвет для кнопки */
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  
  