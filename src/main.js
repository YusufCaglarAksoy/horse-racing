import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from "sweetalert2";

import '@/assets/css/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App)

app.use(router)
app.use(store)
app.config.globalProperties.$swal = Swal;

app.mount('#app')
