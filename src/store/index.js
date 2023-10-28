import { createStore } from "vuex";
import { picturesModule } from "./picturesModule";

export default createStore({
  modules: {
    pictures: picturesModule,
  },
});
