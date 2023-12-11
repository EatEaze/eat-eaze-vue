<template>
    <div class="categories-filter1 p-4">
        <div>
            <button v-for="category in categories" :key="category.categoryId" @click="fetchRestarauntsByCategory(category.categoryId)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                {{ category.categoryName }}
            </button>
        </div>

        <div v-if="isCategorySelected" class="mt-4">
            <div class="flex items-center mb-2">
                <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Закрыть</button>
            </div>
            <div>
                <button v-for="restaurant in restaurants" :key="restaurant.restarauntId"  @click="filterByRestaurant(restaurant.restarauntId)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
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
            
            axios.get(`http://localhost:7242/api/Restaraunts/restaraunts/category/${categoryId}`)
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
  