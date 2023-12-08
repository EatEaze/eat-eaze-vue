<template>
    <div class="modal-overlay flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50">
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto relative">
            <!-- Close button -->
            <button @click="closeModal"
                class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <!-- Заголовок модального окна -->
            <div class="modal-header p-4 flex items-center">
                <img :src="position.imageURL" alt="Product Image" class="w-32 h-32 object-cover rounded">
                <div class="ml-4">
                    <h2 class="text-xl font-semibold">{{ position.positionName }}</h2>
                    <div class="flex items-center mt-2">
                        <div class="flex items-center">
                            <button @click="decrementQuantity" class="text-gray-500 focus:outline-none">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4">
                                    </path>
                                </svg>
                            </button>
                            <span class="mx-2">{{ quantity }}</span>
                            <button @click="incrementQuantity" class="text-gray-500 focus:outline-none">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </button>
                        </div>
                        <span class="ml-4 font-bold">{{ calculatePrice() }} руб.</span>
                    </div>
                </div>
            </div>

            <!-- Кнопка "Добавить в корзину" -->
            <div class="modal-footer p-4 flex justify-between items-center">
                <button @click="addToCart(position.positionId, quantity)"
                    class="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600 transition duration-300">Добавить в корзину</button>
                <span v-if="isQuantityZero" class="text-red-500">Вы не добавили товары в корзину</span>
            </div>
        </div>
    </div>
    

</template>
  

<script>
import axios from 'axios';


export default {
    components: {
        
    },
    props: {
        position: Object,
    },
    data() {
        return {
            quantity: 1,
            showErrorModal: false,
            errorMessage: "",
            isQuantityZero: false
        }
    },
    methods: {
        calculatePrice() {
            return this.quantity * this.position.price
        },
        closeModal() {
            this.$emit('close')
        },
        incrementQuantity() {
            this.quantity++
        },
        decrementQuantity() {
            if (this.quantity > 1)
                this.quantity--
        },
        async addToCart(positionId, quantity) {
            const token = localStorage.getItem('token')
            console.log(token)
            if (token === null) {
                this.$emitter.emit('authError')
            } else {
                try {
                    const response = await axios.post(`https://localhost:7242/api/Basket/Basket/add/${token}/${positionId}/${quantity}`)
                    if (response.status === 200) {
                        this.$emitter.emit('addedToCart')
                        this.closeModal()
                    }
                    else {
                        console.log("add to cart error")
                    }
                    
                }
                catch (error) {
                    console.error(error);
                }
            }
        },
    }
}
</script>