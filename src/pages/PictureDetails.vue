<template>
  <div v-if="picture" class="picture__details" ley="details">
    <div class="details__background">
      <img :src="picture.urls.full" alt="" />
    </div>
    <div class="container">
      <div class="details__wrapper">
        <div class="author">
          <div class="author__img">
            <img :src="picture.user.profile_image.medium" alt="" />
          </div>
          <div class="author__text">
            <h3>{{ picture.user.name }}</h3>
            <a
              v-if="picture.user.instagram_username"
              :href="'https://instagram.com/' + picture.user.instagram_username"
              target="blank"
              >@{{ picture.user.instagram_username }}</a
            >
          </div>
        </div>
        <div class="details__actions">
          <button
            @click="toggleLike()"
            :class="{ liked: this.isLiked }"
            :disabled="isSetLikeLoading"
          >
            <svg
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5778 3.86844L14.9997 4.53131L15.4215 3.86844C16.7293 1.8134 19.0364 0.5 21.6663 0.5C25.7902 0.5 29.1663 3.87614 29.1663 8C29.1663 9.84956 28.316 11.7459 26.9715 13.5793C25.6308 15.4075 23.8323 17.1272 22.0164 18.613C20.2029 20.0968 18.3869 21.3352 17.0229 22.2032C16.3414 22.6369 15.7739 22.9773 15.3776 23.2089C15.2257 23.2977 15.099 23.3705 15.0006 23.4264C14.9022 23.37 14.7753 23.2966 14.6231 23.207C14.2267 22.9737 13.6592 22.6308 12.9776 22.1945C11.6134 21.3213 9.79721 20.0765 7.98349 18.5885C6.16728 17.0983 4.36853 15.3763 3.02764 13.5509C1.68266 11.7199 0.833008 9.83208 0.833008 8C0.833008 3.87614 4.20915 0.5 8.33301 0.5C10.9629 0.5 13.2701 1.8134 14.5778 3.86844Z"
              />
            </svg>
          </button>
          <a :href="picture.links.download" download target="blank">
            <svg
              width="26"
              height="23"
              viewBox="0 0 26 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.381 10.7776C25.0395 10.7787 24.7629 11.055 24.7619 11.3966V19.209C24.759 20.2333 23.9291 21.0631 22.9048 21.0662H3.09524C2.07091 21.0631 1.241 20.2333 1.2381 19.209V11.3966C1.2381 11.0548 0.961071 10.7776 0.619048 10.7776C0.277024 10.7776 0 11.0548 0 11.3966V19.209C0.00077381 20.9182 1.38609 22.3035 3.09524 22.3043H22.9048C24.6139 22.3035 25.9992 20.9182 26 19.209V11.3966C25.999 11.055 25.7224 10.7787 25.381 10.7776Z"
                fill="black"
              />
              <path
                d="M8.46874 14.3124L12.4059 17.6862C12.4094 17.6862 12.4121 17.6891 12.4121 17.6924L12.4306 17.711C12.4368 17.7171 12.4492 17.7233 12.4554 17.7295C12.4614 17.7373 12.4703 17.7417 12.4802 17.7419C12.4864 17.7481 12.4987 17.7543 12.5049 17.7605C12.5111 17.7667 12.5235 17.7667 12.5297 17.7729C12.5359 17.779 12.5483 17.779 12.5606 17.7852C12.5668 17.7914 12.5792 17.7914 12.5854 17.7976C12.5978 17.8038 12.604 17.8038 12.6164 17.81C12.6225 17.81 12.6349 17.8162 12.6411 17.8162C12.6535 17.8162 12.6597 17.8224 12.6721 17.8224C12.6783 17.8224 12.6906 17.8286 12.6968 17.8286C12.7092 17.8286 12.7216 17.8348 12.734 17.8348H12.8949C12.9073 17.8348 12.9197 17.8286 12.9321 17.8286C12.9383 17.8286 12.9506 17.8224 12.9568 17.8224C12.9692 17.8224 12.9754 17.8162 12.9878 17.8162C12.994 17.8162 13.0064 17.81 13.0125 17.81C13.0249 17.8038 13.0311 17.8038 13.0435 17.7976C13.0497 17.7914 13.0621 17.7914 13.0683 17.7852C13.0806 17.779 13.0868 17.779 13.0992 17.7729C13.1054 17.7667 13.1178 17.7667 13.124 17.7605C13.1302 17.7543 13.1425 17.7481 13.1487 17.7419C13.1549 17.7357 13.1611 17.7357 13.1735 17.7295C13.1797 17.7233 13.1921 17.7171 13.1983 17.711L13.2168 17.6924C13.2203 17.6924 13.223 17.6895 13.223 17.6862L17.1602 14.3124C17.4202 14.0901 17.4505 13.6993 17.2283 13.4395C17.0062 13.1797 16.6154 13.1492 16.3554 13.3714L13.4335 15.8724V0.619048C13.4335 0.277024 13.1565 0 12.8145 0C12.4724 0 12.1954 0.277024 12.1954 0.619048V15.8724L9.2735 13.3714C9.0135 13.1492 8.62272 13.1797 8.40064 13.4395C8.17836 13.6993 8.20874 14.0901 8.46874 14.3124Z"
                fill="black"
              />
            </svg>
            <span>Download</span>
          </a>
        </div>
      </div>
      <div class="picture">
        <img :src="picture.urls.full" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import useLikePicture from "@/hooks/useLikePicture";

export default {
  data() {
    return {
      picture: null,
      isLiked: false,
    };
  },

  computed: {
    ...mapGetters({
      pictureById: "pictures/pictureById",
    }),
  },

  methods: {
    ...mapMutations({
      updatePictures: "pictures/updatePictures",
    }),

    async toggleLike() {
      const response = await this.setLike(this.picture.id, this.isLiked);
      if (this.isSetLikeSuccess) {
        this.updatePictures(response.data.photo);
        this.isLiked = !this.isLiked;
      }
    },
  },

  mounted() {
    const picture = this.pictureById(this.$route.params.id);

    if (picture) {
      this.picture = picture;
      this.isLiked = picture.liked_by_user;
    }
  },

  setup() {
    const { setLike, isSetLikeLoading, isSetLikeSuccess, isSetLikeError } =
      useLikePicture();

    return {
      setLike,
      isSetLikeLoading,
      isSetLikeSuccess,
      isSetLikeError,
    };
  },
};
</script>

<style lang="scss" scoped>
.picture__details {
  position: relative;
  width: 100%;
  height: 774px;
  padding-top: 43px;

  > .details__background {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 774px;
    filter: grayscale(1) blur(3px);

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  > .container {
    > .details__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > .author {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #fff200;
        padding: 5px 10px;
        border-radius: 8px;
        color: black;

        > .author__img {
          border-radius: 8px;
          overflow: hidden;
          width: 55px;
          height: 55px;

          > img {
            width: 100%;
            height: 100%;
          }
        }
        > .author__text {
          text-align: left;
          > h3 {
            font-size: 1.875rem;
            font-weight: 300;
          }

          > a {
            display: block;
            font-size: 1.125rem;
            font-weight: 200;
            transition: all 0.1s ease-in;

            &:hover {
              transform: scale(105%);
              transform-origin: bottom left;
            }
          }
        }
      }

      > .details__actions {
        display: flex;
        gap: 20px;

        > button,
        > a {
          border-radius: 8px;
          border: none;
          outline: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease-in;

          &:hover {
            transform: translateY(-3px);
          }
        }

        > button:nth-child(1) {
          width: 50px;
          height: 50px;

          > svg {
            stroke: black;
            transition: all 0.2s ease-in;
          }

          &.liked > svg {
            stroke: transparent;
            fill: #d62929;
          }

          &:disabled {
            transform: none;
            cursor: auto;

            &.liked {
              > svg {
                fill: rgba(249, 174, 174, 0.75);
              }
            }
          }
        }

        > a {
          width: 206px;
          gap: 15px;
          color: black;
          font-size: 1.25rem;
          background-color: #fff200;
        }
      }
    }

    > .picture {
      margin: 0 auto;
      position: relative;
      top: 40px;
      width: 80%;
      height: 744px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .picture__details {
    height: fit-content;

    > .container {
      > .details__wrapper {
        gap: 15px;
        > .author {
          padding: 5px;

          > .author__img {
            flex-shrink: 0;
          }
          > .author__text {
            > h3 {
              font-size: 1.125rem;
            }

            > a {
              font-size: 0.875rem;
            }
          }
        }

        > .details__actions {
          gap: 5px;

          > button,
          > a {
            width: 50px;
            > span {
              display: none;
            }
          }
        }
      }

      > .picture {
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        height: 400px;
        > img {
          object-fit: cover;
        }
      }
    }
  }
}
</style>
