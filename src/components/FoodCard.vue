<template>
  <div class="position-card">
  <img :src="position.imageURL" alt="Position Image" class="flat-image" />
  <h3 class="flat-title">{{ position.positionName }}</h3>
  <h3 class="flat-price">{{ position.price  }} руб.</h3>
  <button class="flat-button">Добавить в корзину</button>
  </div>
</template>
  
<script>
  export default {
    props: {
      position: Object,
    },
  };
</script>
  
<style>
.position-card {
text-align: center;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: transform 0.2s ease-in-out;
}

.position-card:hover {
  transform: scale(1.05);
}

.flat-image {
height: 200px;
width: 200px;
border-radius: 8px;
margin-bottom: 10px;
}

.flat-title {
font-size: 1.3rem;
margin-bottom: 10px;
}

.flat-price {
  font-size: 1rem;
margin-bottom: 10px;
}

.flat-button {
background-color: #3498db;
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
font-size: 1rem;
transition: background-color 0.3s ease;
font-family: 'Trebuchet MS';
margin-bottom: 5px;
}

.flat-button:hover {
background-color: #2980b9;

}
</style>
  
  