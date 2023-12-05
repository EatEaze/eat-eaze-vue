<template>
  <div class="search-bar">
    <input v-model="searchQuery" @input="search" placeholder="Search by dish name" />
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
  margin: 10px 0;
}
</style>
