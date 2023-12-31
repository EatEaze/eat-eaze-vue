//import "bootstrap/dist/css/bootstrap.css" 
import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.$emitter = emitter;


app.mount('#app')

