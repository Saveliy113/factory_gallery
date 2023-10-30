import { ref } from "vue";
import axios from "axios";
import { apiConfig } from "@/configs/apiConfig";

export default function useLikePicture(onLikeChanged) {
  const isSetLikeLoading = ref(false);
  const isSetLikeSuccess = ref(false);
  const isSetLikeError = ref(false);

  const setLike = async (pictureId, isLiked) => {
    console.log(process.env.API_KEY);
    const url = `${process.env.VUE_APP_BASE_URL}/photos/${pictureId}/like`;

    const like = () => axios.post(url, {}, apiConfig);
    const dislike = () => axios.delete(url, apiConfig);

    try {
      isSetLikeLoading.value = true;
      isSetLikeSuccess.value = false;
      isSetLikeError.value = false;
      let response;

      /*----------------------------REAL LIKE---------------------------------- */
      if (!isLiked) {
        response = await like();
      } else {
        response = await dislike();
      }
      if (response.status >= 200 && response.status < 300) {
        isSetLikeSuccess.value = true;
        return response;
      }
      /*----------------------------REAL LIKE---------------------------------- */

      /*----------------------------MOCK LIKE---------------------------------- */
      // const mockLike = () =>
      //   new Promise((resolve, reject) =>
      //     setTimeout(() => resolve("Like was set successfully"), 3000)
      //   );

      // const mockDislike = () =>
      //   new Promise((resolve, reject) =>
      //     setTimeout(() => resolve("DisLike was set successfully"), 3000)
      //   );

      // if (!isLiked) {
      //   response = await mockLike().then((data) => console.log(data));
      // } else {
      //   response = await mockDislike().then((data) => console.log(data));
      // }
      // isSetLikeSuccess.value = true;
      /*----------------------------MOCK LIKE---------------------------------- */
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
