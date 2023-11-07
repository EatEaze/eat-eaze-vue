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
      foodItems: []
    };
  },
  mounted() {
    axios.get('http://localhost/positions')
      .then(responce => {
        this.positions = responce.data;
      })
      .catch(error => {
        console.error(error)
      });
  }
};
</script>
<style scoped>
.order-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
.content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px; /* Добавьте внутренний отступ контенту */
}

.food-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px; /* Добавьте отступ между карточками и хедером */
  margin-bottom: 20px; /* Добавьте отступ между карточками и футером */
}
</style>
