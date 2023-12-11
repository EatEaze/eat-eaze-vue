<template>
    <!-- Модальное окно -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-96 p-8 rounded shadow-md text-blue-500 relative z-50">
        <!-- Заголовок модального окна -->
        <h2 class="text-2xl font-bold mb-4">Оформление заказа</h2>
  
        <!-- Поля для ввода данных -->
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Подъезд</label>
          <input v-model="entrance" id="inputEntrance" type="text" class="w-full px-3 py-2 border rounded" />
        </div>
  
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Этаж</label>
          <input v-model="floor" id="inputFloor" type="text" class="w-full px-3 py-2 border rounded" />
        </div>
  
        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-600 mb-1">Квартира</label>
          <input v-model="apartment" id="inputApartment" type="text" class="w-full px-3 py-2 border rounded" />
        </div>
  
        <!-- Кнопка оформления заказа -->
        <button @click="submitOrder" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Оформить заказ
        </button>
      </div>
    </div>
  </template>
  
  
<script>
export default {
    data() {
        return {
            entrance: '',
            floor: '',
            apartment: ''
        };
    },
    methods: {
        submitOrder() {
            // Проверка на заполненность полей
            if (this.entrance && this.floor && this.apartment) {
                sessionStorage.setItem('address', `${sessionStorage.getItem('address')} Подъезд:${this.entrance} этаж:${this.floor} кв. ${this.apartment}`)
                this.$emit('submitOrder')
                // Ваш код для оформления заказа
                console.log('Заказ оформлен!');
                // Закрываем модальное окно после успешного оформления заказа
                this.$emit('closeModal');
            } else {
                // Пометить незаполненные поля красным (добавьте свой код для этого)
                console.log('Заполните все поля!');
            }
        }
    }
};
</script>

  