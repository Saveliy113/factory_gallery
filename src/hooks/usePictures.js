import { onMounted, ref } from "vue";
import axios from "axios";

export default function usePictures(limit) {
  const pictures = ref([]);
  const isPicturesLoading = ref(true);
  const isPicturesError = ref(false);

  const fetchPictures = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            client_id: "SNlIyTVM4zTTQiKjAd_zwNZfAMStHzCNRsGccpetsEw",
            count: 8,
          },
        }
      );

      pictures.value = response.data;
      console.log(response.data);
    } catch (error) {
      isPicturesError.value = true;
      console.error("Ошибка при загрузке изображений");
    } finally {
      isPicturesLoading.value = false;
    }
  };

  // onMounted(fetchPictures);

  return {
    pictures,
    isPicturesLoading,
    isPicturesError,
  };
}
