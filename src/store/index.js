import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { picturesModule } from "./picturesModule";

export default createStore({
  modules: {
    pictures: picturesModule,
  },
  plugins: [createPersistedState()],
});
