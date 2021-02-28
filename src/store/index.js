import { createStore } from "vuex"
import vehicles from './modules/vehicles';

export default createStore({
  modules: {
    vehicles,
  },
  debug: true,
})