<template>
    <div class="food-card">
      <img :src="item.image" alt="Food" width="150" height="200"/>
      <h3>{{ item.name }}</h3>
      <button class="order-button">{{ item.price }}</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: Object,
    },
  };
  </script>
  
  <style scoped>
  .food-card {
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
  
  