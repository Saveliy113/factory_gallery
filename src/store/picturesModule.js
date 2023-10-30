import axios from "axios";
import { queryParams } from "@/configs/apiConfig";
import picturesData from "./picturesData";
import { apiConfig } from "@/configs/apiConfig";

export const picturesModule = {
  state: () => ({
    pictures: [],
    isRandom: null,
    isPicturesLoading: false,
    isPicturesError: false,
    searchQuery: "",
    limit: 8,
    page: 1,
    noImagesLeft: false,
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
    incrementPage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
    setNoImagesLeft(state, bool) {
      state.noImagesLeft = bool;
    },
    setIsRandom(state, bool) {
      state.isRandom = bool;
    },
  },

  actions: {
    async fetchPictures({ state, commit }, route) {
      try {
        commit("setIsPicturesError", false);
        commit("setIsPicturesLoading", true);
        commit("setPictures", []);
        commit("resetPage");
        commit("setNoImagesLeft", false);

        /*----------------REAL PICTURES----------------- */
        const getRandomPictures = () =>
          axios.get("https://api.unsplash.com/photos/random", {
            params: { ...queryParams, query: state.searchQuery },
          });
        const getLikedPictures = () =>
          axios.get(
            "https://api.unsplash.com/users/saveliy_d/likes",
            apiConfig
          );

        let response;
        if (route === "/") {
          commit("setIsRandom", true);
          response = await getRandomPictures();
        } else if (route === "/favorites") {
          commit("setIsRandom", false);
          response = await getLikedPictures();
        }

        commit("setPictures", response.data);
        if (response.data.length === 0) {
          commit("setNoImagesLeft", true);
        }

        /*----------------REAL PICTURES----------------- */

        /*----------------MOCK PICTURES----------------- */
        // const mockPictures = () => {
        //   return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve(picturesData);
        //     }, 3000);
        //   });
        // };
        // await mockPictures().then((data) => {
        //   console.log(data);
        //   commit("setPictures", data);
        // });
        /*----------------MOCK PICTURES----------------- */
      } catch (error) {
        commit("setIsPicturesError", true);
        commit("setPictures", []);
        console.error(error, "Ошибка при загрузке изображений");
      } finally {
        commit("setIsPicturesLoading", false);
      }
    },

    async loadMorePictures({ state, commit }, route) {
      try {
        commit("setIsPicturesError", false);
        commit("setIsPicturesLoading", true);
        commit("incrementPage");

        /*----------------REAL PICTURES----------------- */
        const getRandomPictures = () =>
          axios.get("https://api.unsplash.com/photos/random", {
            params: {
              ...queryParams,
              count: 10,
              page: state.page,
              query: state.searchQuery,
            },
          });
        const getLikedPictures = () =>
          axios.get("https://api.unsplash.com/users/saveliy_d/likes", {
            ...apiConfig,
            params: {
              per_page: 10,
              page: state.page,
            },
          });

        let response;
        if (route === "/") {
          response = await getRandomPictures();
        } else if (route === "/favorites") {
          response = await getLikedPictures();
        }

        commit("setPictures", [...state.pictures, ...response.data]);

        if (response.data.length === 0) {
          commit("setNoImagesLeft", true);
        }

        /*----------------REAL PICTURES----------------- */

        /*----------------MOCK PICTURES----------------- */
        // const mockPictures = () => {
        //   return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve(picturesData);
        //     }, 3000);
        //   });
        // };
        // await mockPictures().then((data) => {
        //   console.log(data);
        //   commit("setPictures", data);
        // });
        /*----------------MOCK PICTURES----------------- */
      } catch (error) {
        commit("setIsPicturesError", true);
        commit("setPictures", []);
        console.error(error, "Ошибка при загрузке изображений");
      } finally {
        commit("setIsPicturesLoading", false);
      }
    },
  },

  namespaced: true,
};
