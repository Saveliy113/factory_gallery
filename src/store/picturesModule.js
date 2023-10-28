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
      return state.pictures.filter((picture) => picture.id === pictureId)[0];
    },
  },

  mutations: {
    setPictures(state, pictures) {
      state.pictures = pictures;
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

        const queryParams = {
          client_id: "SNlIyTVM4zTTQiKjAd_zwNZfAMStHzCNRsGccpetsEw",
          count: 8,
          query: state.searchQuery,
        };

        if (state.searchQuery) {
          queryParams.count = 30;
          queryParams.page = 1;
        }

        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: queryParams,
          }
        );

        // const mockPictures = () => {
        //   return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve(picturesData);
        //     }, 5000);
        //   });
        // };

        // await mockPictures().then((data) => commit("setPictures", data));
        console.log(response.data);
        commit("setPictures", response.data);
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
