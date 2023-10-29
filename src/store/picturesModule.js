import axios from "axios";
import picturesData from "./picturesData";

export const picturesModule = {
  state: () => ({
    pictures: [],
    isPicturesLoading: false,
    isPicturesError: false,
    searchQuery: "",
    limit: 8,
  }),

  getters: {
    pictureById: (state) => (pictureId) => {
      console.log("Picture ID in module: ", pictureId);
      console.log(
        "Picture: ",
        state.pictures.find((picture) => picture.id === pictureId)
      );
      return state.pictures.filter((picture) => picture.id === pictureId)[0];
    },
  },

  mutations: {
    setPictures(state, pictures) {
      state.pictures = pictures;
    },
    updatePictures(state, picture) {
      state.pictures = state.pictures.map((oldPicture) => {
        if (oldPicture.id === picture.id) {
          return picture;
        }
        return oldPicture;
      });
    },
    setIsPicturesLoading(state, bool) {
      state.isPicturesLoading = bool;
    },
    setIsPicturesError(state, bool) {
      state.isPicturesError = bool;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },

  actions: {
    async fetchPictures({ state, commit }) {
      try {
        commit("setIsPicturesError", false);
        commit("setIsPicturesLoading", true);
        commit("setPictures", []);

        const queryParams = {
          client_id: "SNlIyTVM4zTTQiKjAd_zwNZfAMStHzCNRsGccpetsEw",
          count: 8,
          query: state.searchQuery,
        };

        if (state.searchQuery) {
          queryParams.count = 30;
          queryParams.page = 1;
        }

        // const response = await axios.get(
        //   "https://api.unsplash.com/photos/random",
        //   {
        //     params: queryParams,
        //   }
        // );
        // commit("setPictures", response.data);

        const mockPictures = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(picturesData);
            }, 3000);
          });
        };
        await mockPictures().then((data) => {
          console.log(data);
          commit("setPictures", data);
        });

        // console.log(response);
        // console.log(response.data);
        // console.log(response.data);
      } catch (error) {
        commit("setIsPicturesError", true);
        console.error("Ошибка при загрузке изображений");
      } finally {
        commit("setIsPicturesLoading", false);
      }
    },
  },

  namespaced: true,
};
