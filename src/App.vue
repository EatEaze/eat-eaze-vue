<template>
  <div class="order-page">
    <HeaderComp />
    <div class="food-card-container">
      <FoodCard v-for="foodItem in foodItems" :key="foodItem.PositionId" :position="foodItem" />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import FoodCard from "@/components/FoodCard.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";

export default {
  components: {
    HeaderComp,
    FoodCard,
    FooterComponent,
  },
  data() {
    return {
      selectedRestaraunt: null,
      foodItems: [],
      restaraunts: []
    };
  },
  methods: {
    fetchDishesByRestaurant() {

    } 
  },
  created() {
    axios.get('https://localhost:7242/api/Positions/positions')
      .then(responce => {
        this.foodItems = responce.data;
        console.log(this.foodItems);
      })
      .catch(error => {
        console.error(error)
      });
  },
  
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.order-page {
font-family: 'Your Chosen Font', sans-serif; /* Замените 'Your Chosen Font' на выбранный вами шрифт */
background-color: #ecf0f1; /* Цвет фона */
color: #333; /* Цвет текста */
}

.food-card-container {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 10px;
padding: 20px;
}
</style>
