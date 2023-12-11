<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-8 rounded-md shadow-md w-96 md:w-1/2 lg:w-2/3">
            <div class="mb-4">
                <h2 class="text-2xl font-bold text-blue-500">Укажите адрес доставки</h2>
                <input v-model="address" placeholder="Введите адрес" class="w-full p-2 border border-gray-300 rounded-md"
                    @input="searchAddress" />
            </div>
            <div class="w-full h-96 rounded-md overflow-hidden mb-4" ref="mapContainer">
                <!--Карта-->
            </div>
            <div class="flex justify-end">
                <button @click="setAddress(this.address)"
                    class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    OK
                </button>
                <button @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                    Закрыть
                </button>
            </div>
            <p v-if="cityError">{{ cityError }}</p>
        </div>
    </div>
</template>
  
  
  
  
  
<script>
import maplibregl from 'maplibre-gl';
import axios from 'axios';

export default {
    data() {
        return {
            map: null,
            marker: null,
            address: '',
            mapStyle: 'https://api.maptiler.com/maps/streets/style.json?key=M1zVnAsC0TpjLx1wgs2I',
            markerImage: 'https://www.svgrepo.com/show/376955/map-marker.svg',
            opencageApiKey: '06d171e95f29406ca3cbd05d9e84f0f3',
            cities: [],
            cityError: ''
        };
    },
    methods: {
        searchAddress() {
            // todo
        },
        closeModal() {
            // Ваш код для закрытия модального окна и передачи выбранного адреса
            this.cityError = ''
            this.$emit('close', this.address, this.selectedCoords);
        },
        setAddress(address) {
            sessionStorage.setItem('address', address);
            this.closeModal();
        },
        getAvailableCities() {
            axios.get(`https://localhost:7242/api/City/cities`)
                .then(response => {
                    this.cities = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        initMap() {
            // Инициализация карты
            this.map = new maplibregl.Map({
                container: this.$refs.mapContainer,
                style: this.mapStyle,
                center: [37.6173, 55.7558], // Установите начальные координаты
                zoom: 12, // Установите начальный уровень масштабирования
            });


            const center = this.map.getCenter();
            this.marker = new maplibregl.Marker({ draggable: false })
                .setLngLat(center)
                .addTo(this.map);


            this.marker.getElement().style.backgroundImage = `url(${this.markerImage})`;
            // Handle map move events
            this.map.on('move', () => {
                const center = this.map.getCenter();
                // Update marker position to the center of the map
                this.marker.setLngLat(center);
                // Your code to handle the selected address
            });

            // Обработка клика на карту
            this.map.on('click', async (e) => {
                const { lng, lat } = e.lngLat;
                console.log(`lng: ${lng} lat: ${lat}`)
                // Установите новые координаты маркера
                this.marker.setLngLat([lng, lat]);
                // Ваш код для обработки выбранного адреса

                const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${this.opencageApiKey}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.results.length > 0) {
                        const selectedCity = data.results[0].components.city
                        const address = data.results[0].formatted;
                        // Обновление адреса в данных вашего компонента
                        var isCityInArray = this.cities.some(function (city) {
                            return city.cityName === selectedCity;
                        }) 
                        
                        if (isCityInArray) {
                            this.cityError = ''
                            this.address = address;
                            console.log(selectedCity + " | " + this.address)
                        }
                        else {
                            this.cityError = 'Мы не работаем в этом городе'
                            console.log(selectedCity + " | " + this.address)
                        }
                        
                        
                    } else {
                        this.address = 'Address not found';
                    }
                } catch (error) {
                    console.error('Error fetching geocoding data:', error);
                    this.address = 'Error fetching address';
                }
            });
        },
    },
    mounted() {
        // Вызовите метод инициализации карты при монтировании компонента
        this.getAvailableCities();
        this.initMap();
    },
};
</script>   
  