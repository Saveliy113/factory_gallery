import { ref } from "vue";
import axios from "axios";
import { apiConfig } from "@/configs/apiConfig";

export default function useLikePicture(onLikeChanged) {
  const isSetLikeLoading = ref(false);
  const isSetLikeSuccess = ref(false);
  const isSetLikeError = ref(false);

  const setLike = async (pictureId, isLiked) => {
    const url = `${process.env.VUE_APP_BASE_URL}/photos/${pictureId}/like`;

    const like = () => axios.post(url, {}, apiConfig);
    const dislike = () => axios.delete(url, apiConfig);

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
    } catch (error) {
      isSetLikeError.value = true;
      console.error(error, "Ошибка при попытке поставить лайк!");
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
