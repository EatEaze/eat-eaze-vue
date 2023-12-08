<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 w-96 text-black relative z-50">
            <button @click="close" class="absolute top-0 right-0 m-4 text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <h2 class="text-2xl font-bold mb-4">Корзина</h2>
            <BasketItem v-for="item in items" :key="item.positionId" :item="item" @increment="increment(item)"
                @decrement="decrement(item)" @removeItem="removeItem(item)" />
            <div class="flex justify-between items-center mt-4">
                <button class="bg-blue-500 text-white py-2 px-4 rounded-full">Оформить заказ</button>
                <span class="total-price">Итого: {{ calculateTotalPrice() }} руб.</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import BasketItem from './BasketItem.vue';
import axios from 'axios';

export default {
    props: {
        show: Boolean,
    },
    components: {
        BasketItem,
    },
    methods: {
        calculateTotalPrice() {
            const result = this.items.reduce((total, item) => {
                return total + item.item.price * item.count;
            }, 0);
            return `${result.toFixed(2)}`
        },
        close() {
            this.$emit('close');
        },
        async removeItem(item) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.delete(`https://localhost:7242/api/Basket/Basket/delete/${token}/${item.item.positionId}`)
                if (response.status === 200) {
                    this.getBasketItems()
                }
                else {
                    console.log("remove from cart error")
                }
            }
            catch (error) {
                console.error(error);
            }
        },
        async increment(item) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.post(`https://localhost:7242/api/Basket/Basket/add/${token}/${item.item.positionId}`)
                if (response.status === 200) {
                    this.getBasketItems()
                }
                else {
                    console.log("increment item in cart error")
                }
            }
            catch (error) {
                console.error(error);
            }
        },
        async decrement(item) {
            const token = localStorage.getItem('token')
            if (item.count === 1) {
                this.removeItem(item)
            }
            else {
                try {
                    const response = await axios.put(`https://localhost:7242/api/Basket/basket/decrement/${token}/${item.item.positionId}`)
                    if (response.status === 200) {
                        this.getBasketItems()
                    }
                    else {
                        console.log("decrement item in cart error")
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }


        },
        getBasketItems() {
            const token = localStorage.getItem('token')
            axios.get(`https://localhost:7242/api/Basket/basket/${token}`)
                .then(response => {
                    this.items = response.data.itemsInBasket;
                    console.log(this.items)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        handleLogout() {
            this.items = []
        }
    },
    data() {
        return {
            items: [],
            totalPrice: 0
        };
    },
    created() {
        if (localStorage.getItem('token') !== null) {
            this.getBasketItems()
            this.$emitter.on('addedToCart', this.getBasketItems); 
        }
    }
};
</script>
  