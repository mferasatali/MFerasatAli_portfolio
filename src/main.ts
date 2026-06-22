/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import "@/assets/scss/global.scss";
import "lenis/dist/lenis.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { requestInterceptor } from "./interceptor";
import router from './router' 
import moment from 'moment';
import { initAppTheme } from "@/composables/useAppTheme";
import { initAnalytics } from "@/composables/useAnalytics";
import { initReferralTracking } from "@/composables/useReferralTracking";

initAppTheme();
initReferralTracking();
initAnalytics();



// Components
import App from "./App.vue";
// Composables
import { createApp } from "vue";

const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.use(VueAxios, axios);
app.use(router);
app.provide("axios", app.config.globalProperties.axios);

requestInterceptor();

registerPlugins(app);

app.mount("#app");
