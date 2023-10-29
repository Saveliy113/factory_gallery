import { ref } from "vue";
import axios from "axios";

export default function useLikePicture(onLikeChanged) {
  const isSetLikeLoading = ref(false);
  const isSetLikeSuccess = ref(false);
  const isSetLikeError = ref(false);

  const setLike = async (pictureId, isLiked) => {
    const url = `https://api.unsplash.com/photos/${pictureId}/like`;
    const accessKey = "SNlIyTVM4zTTQiKjAd_zwNZfAMStHzCNRsGccpetsEw";
    const token = "J852REmKi49sxLd1caSHAqq8JFoDABjuH5s2i_8vCiU";
    const username = "saveliy_d";
    const collectionId = "bNrK2noljkI";
    const photoId = "z-qhQ1XP8_c";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const like = () => axios.post(url, {}, config);
    const dislike = () => axios.delete(url, config);

    // await axios
    //   .post(
    //     `https://api.unsplash.com/collections/${collectionId}/add`,
    //     {
    //       params: {
    //         photo_id: photoId,
    //       },
    //     },
    //     config
    //   )
    //   .then((response) => {
    //     // Обработка успешного ответа с коллекциями
    //     const collections = response.data;
    //     console.log("Added photo to collection", collections);
    //   })
    //   .catch((error) => {
    //     // Обработка ошибки
    //     console.error(error);
    //   });

    // const mockLike = () =>
    //   new Promise((resolve, reject) =>
    //     setTimeout(() => resolve("Like was set successfully"), 3000)
    //   );

    // const mockDislike = () =>
    //   new Promise((resolve, reject) =>
    //     setTimeout(() => resolve("DisLike was set successfully"), 3000)
    //   );

    try {
      isSetLikeLoading.value = true;
      isSetLikeSuccess.value = false;
      isSetLikeError.value = false;
      let response;

      if (!isLiked) {
        response = await like();
      } else {
        response = await dislike();
      }
      if (response.status >= 200 && response.status < 300) {
        isSetLikeSuccess.value = true;
        return response;
      }

      // if (!isLiked) {
      //   response = await mockLike().then((data) => console.log(data));
      // } else {
      //   response = await mockDislike().then((data) => console.log(data));
      // }
      // isSetLikeSuccess.value = true;
    } catch (error) {
      isSetLikeError.value = true;
      console.error(error, "Ошибка при загрузке изображений");
    } finally {
      isSetLikeLoading.value = false;
    }
  };

  return {
    setLike,
    isSetLikeLoading,
    isSetLikeSuccess,
    isSetLikeError,
  };
}
