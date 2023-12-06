<template>
  <div class="search-bar">
    <input v-model="searchQuery" @input="search" placeholder="Search by dish name" class="w-96 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 transition-all duration-300" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      // Вызовите метод родительского компонента для выполнения поиска
      this.$emit("searchDishes", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}

/* Увеличение рамки при фокусе */
.search-bar input:focus {
  border-width: 2px;
}
</style>
