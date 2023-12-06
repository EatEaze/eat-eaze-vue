<template>
    <div>
        <div>
            <button v-for="category in categories" :key="category.categoryId" @click="fetchRestarauntsByCategory(category.categoryId)">
                {{ category.categoryName }}
            </button>
        </div>

        <div v-if="isCategorySelected">
            <div>
                <button @click="closeModal">Закрыть</button>
            </div>
            <div>
                <button v-for="restaurant in restaurants" :key="restaurant.restarauntId"  @click="filterByRestaurant(restaurant.restarauntId)">
                    {{ restaurant.restarauntName }}
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    props: {
        categories: Array,
    },
    data() {
        return {
            selectedRestaraunt: "",
            isCategorySelected: false,
            restaurants: [],
        };
    },
    methods: {
        filterByRestaurant(restarauntId) {  
            console.log(restarauntId);
            this.selectedRestaraunt = restarauntId
            this.$emit("filterByRestaurant", this.selectedRestaraunt)
        },

        fetchRestarauntsByCategory(categoryId) {
            this.isCategorySelected = true
            
            axios.get(`https://localhost:7242/api/Restaraunts/restaraunts/category/${categoryId}`)
                .then(response => {
                    this.restaurants = response.data;
                    console.log(this.restaurants)
                })
                .catch(error => {
                    console.error(error);
                });
        },

        showRestaurants(categoryId) {
            this.selectedCategory = this.categories.find(category => category.id === categoryId);
            this.fetchRestarauntsByCategory(categoryId)
        },
        closeModal() {
            this.isCategorySelected = false
            this.selectedRestaraunt = ""
            this.filterByRestaurant(this.selectedRestaraunt)
        },
    },
};
</script>
  
<style scoped>
/* Ваши стили здесь */
</style>
  