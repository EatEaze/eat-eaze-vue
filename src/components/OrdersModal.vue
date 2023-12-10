<template>
    <div>
        <!-- Модальное окно -->
        <div class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex text-blue-500">
            <div class="relative p-8 bg-white w-full max-w-4xl m-auto flex-col flex rounded">
                <!-- Закрытие модального окна -->
                <button @click="closeModal" class="absolute top-0 right-0 p-4 cursor-pointer">
                    <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>

                <!-- Таблица с данными заказа -->
                <div class="flex flex-col">
                    <div class="flex mb-2">
                        <div class="border px-4 py-2 w-1/4 font-bold">Дата заказа</div>
                        <div class="border px-4 py-2 w-1/4 font-bold">Товары в заказе</div>
                        <div class="border px-4 py-2 w-1/4 font-bold">Адрес</div>
                        <div class="border px-4 py-2 w-1/4 font-bold">Дата получения заказа</div>
                    </div>
                    <div v-for="(order, index) in orders" :key="index" class="flex mb-2">
                        <div class="border px-4 py-2 w-1/4">{{ order.orderDate }}</div>
                        <div class="border px-4 py-2 w-1/4">
                            <ul>
                                <li v-for="(product, i) in order.positionsInOrders" :key="i">{{
                                    product.position.positionName }} x{{ product.count }}</li>
                            </ul>
                        </div>
                        <div class="border px-4 py-2 w-1/4">{{ order.address }}</div>
                        <div class="border px-4 py-2 w-1/4">{{ getDeliveryDate(order) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        getOrders() {
            const token = localStorage.getItem('token')
            axios.get(`https://localhost:7242/api/Orders/orders/${token}`)
                .then(responce => {
                    this.orders = responce.data;
                })
                .catch(error => {
                    console.error(error)
                });
        },
        getDeliveryDate(order) {
            return order.deliveryDate === null ? "В процессе" : order.deliveryDate
        }
    },
    created() {
        this.getOrders()
    },

};
</script>
  