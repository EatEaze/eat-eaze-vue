<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-8 rounded-md shadow-md w-96 md:w-1/2 lg:w-2/3">
            <div class="mb-4">
                <h2 class="text-2xl font-bold text-blue-500">Укажите адрес доставки</h2>
                <input v-model="address" placeholder="Введите адрес" class="w-full p-2 border border-gray-300 rounded-md"
                    @input="searchAddress" />
            </div>
            <div class="w-full h-96 rounded-md overflow-hidden mb-4">
                <!-- Увеличил высоту до h-96 -->
                <mgl-map mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=M1zVnAsC0TpjLx1wgs2I"
                    :center="[55.7522, 37.6156]" :zoom="1" class="w-full h-full">
                    <MglMarker :coordinates="[55.7522, 37.6156]"/>
                    <MglNavigationControl/>
                </mgl-map>
            </div>
            <div class="flex justify-end">
                <button @click="closeModal" class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    OK
                </button>
                <button @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>
  
  
  
  
  
<script>
import { MglMap, MglNavigationControl, MglMarker } from 'vue-maplibre-gl';


export default {
    components: {
        MglMap,
        MglNavigationControl,
        MglMarker
    },
    methods: {
        searchAddress() {
            // todo
        },
        closeModal() {
            // Ваш код для закрытия модального окна и передачи выбранного адреса
            this.$emit('close', this.address, this.selectedCoords);
        },
    },
    mounted() {
    },
};
</script>   
  