<template>
  <div class="order-page min-h-screen bg-gray-100">
    <HeaderComp class="mb-4" />

    <!-- Flex container для CategoriesFilter1 и SearchBar с отступом сверху -->
    <div class="flex mt-4">
      <CategoriesFilter1 :categories="categories" @filterByRestaurant="fetchDishesByRestaurant" class="mr-4" />
      <SearchBar @searchDishes="searchDishesByName" />
    </div>

    <div class="food-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <!-- Пример использования grid с колонками, зависящими от размера экрана -->
      <FoodCard v-for="foodItem in foodItems" :key="foodItem.PositionId" :position="foodItem" />
    </div>

    <FooterComponent class="mt-4" />
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import FoodCard from "@/components/FoodCard.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import SearchBar from "./components/SearchBar.vue";
import CategoriesFilter1 from "./components/CategoriesFilter1.vue";
import axios from "axios";

export default {
  components: {
    HeaderComp,
    FoodCard,
    FooterComponent,
    SearchBar,
    CategoriesFilter1
  },
  data() {
    return {
      selectedRestaraunt: null,
      selectedCategory: null,
      foodItems: [],
      restaraunts: [],
      categories: []
    };
  },
  methods: {
    fetchDishes() {
      axios.get('https://localhost:7242/api/Positions/positions')
        .then(responce => {
          this.foodItems = responce.data;
          console.log(this.foodItems);
        })
        .catch(error => {
          console.error(error)
        });
    },
    fetchRestaraunts() {
      axios.get('https://localhost:7242/api/Restaraunts/restaraunts')
        .then(responce => {
          this.restaraunts = responce.data;
        })
        .catch(error => {
          console.error(error)
        });
    },
    fetchCaterories() {
      axios.get('https://localhost:7242/api/Categories/categories')
        .then(responce => {
          this.categories = responce.data;
        })
        .catch(error => {
          console.error(error)
        });
    },
    fetchDishesByRestaurant(selectedRestaraunt) {
      if (selectedRestaraunt.trim() === "") {
        this.fetchDishes();
      }
      else {
        axios.get(`https://localhost:7242/api/Positions/positions/restaraunts/${selectedRestaraunt}`)
          .then(response => {
            this.foodItems = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    fetchDishesByCategories(selectedCategory) {
      if (selectedCategory === "all") {
        this.fetchDishes();
      }
      else {
        axios.get(`https://localhost:7242/api/Positions/positions/categories/${selectedCategory}`)
          .then(response => {
            this.foodItems = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    searchDishesByName(query) {

      if (query.trim() === "") {
        this.fetchDishes();
      }
      // Сохраните поисковой запрос в data
      this.searchQuery = query;

      // Выполните запрос на сервер с использованием нового поискового запроса
      axios.get(`https://localhost:7242/api/Positions/positions/name/${query}`)
        .then(response => {
          this.foodItems = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

  },
  created() {
    this.fetchCaterories();
    this.fetchDishes();
  },

};
</script>


