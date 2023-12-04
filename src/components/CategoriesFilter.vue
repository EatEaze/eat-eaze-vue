<template>
    <div class="categories-filter">
      <label for="categoriesSelect">Выберите категорию:</label>
      <select v-model="selectedCategory" @change="filterByCategory">
        <option value="" disabled>Выберите категорию</option>
        <option value="all">Все категории</option>
        <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.categoryName }}</option>
      </select> 
    </div>
</template>

<script>
  export default {
    props: {
      categories: Array,
    },
    data() {
      return {
        selectedCategory: "",
      };
    },
    methods: {
      filterByCategory() {
        console.log(this.selectedCategory)
        this.$emit("filterByCategory", this.selectedCategory);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Добавьте стили по вашему усмотрению */
  </style>