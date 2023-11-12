<template>
  <div class="position-card">
    <img :src="position.imageURL" alt="Position Image" height="300" width="300" />
    <h3>{{ position.positionName }}</h3>
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
  
  