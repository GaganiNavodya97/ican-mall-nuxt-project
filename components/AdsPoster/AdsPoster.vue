<template>
  <div class="ads-card-container flex flex-col flex-wrap">
    <va-card>
      <div class="row">
        <div class="flex flex-col xs12 sm12 md6 lg6">
          <div class="ads-container">
            <div class="row">
              <div class="add-button-container">
                <div>
                  <div class="main-text">
                    <p>Tech Deals Unleashed</p>
                    <!-- <p>SKYVOX Products</p> -->
                  </div>
                  <div class="sub-text">
                    Quality Material, Advanced Tech &<br>
                    Sophisticated Design
                  </div>
                </div>
                <div>
                  <!-- <va-button
                    color="#FECD00"
                    class="shop-now"
                    :to="{ name: 'CategoriesList' }"
                  >
                    {{ $t("placeholeds.ShopNow") }}
                  </va-button> -->
                  <div class="shop-now">
                    <a class="btn-link" href="https://icanmall.lk/store/baseus/207" target="_blank">{{ $t("placeholeds.ShopNow") }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="image flex flex-col xs12 sm12 md6 lg6">
          <!-- <va-image class="image" :src="posterImg" :ratio="1" /> -->
          <!-- <img :src="posterImg" alt="" class="image"> -->
        </div>
      </div>
    </va-card>
  </div>
</template>

<script>
// import posterImg from "@/assets/images/landingpage-ads-img1.png";
export default {
  name: "AdsPoster",
  created() {},
  data() {
    return {
      // posterImg: posterImg,
    };
  },
  props: {},
  methods: {},
};
</script>

<style scoped lang="sass">

.ads-card-container
  padding-left: 1rem
  padding-right:1rem
  padding-bottom: 1rem
.ads-container
  display: flex
  background-color: black
  height: 100%
  padding: 1rem
  align-items: center
  padding-left: 3rem
  max-height: 18.75rem
  @media (max-width: 500px)
    padding-left: 2rem

.main-text
  font-size: 2.2rem
  text-transform: none
  font-weight: bold
  text-align: left
  line-height: 2.35rem
  color: white
  @media (max-width: 900px)
    font-size: 2rem
  @media (max-width: 500px)
   font-size: 2rem
.sub-text
  padding-top: 1rem
  text-transform: none
  text-align: left
  padding-bottom: 1rem
  color: white

.shop-now
  width: 7rem
  height: 2rem
  text-align: center
  background-color: #FECD00
  padding: 0.5rem
  margin-top: 2rem

.image
  height: 15.3rem
  background: url("@/assets/images/landingpage-ads-img1.webp") no-repeat
  background-size: cover
  @media (max-width: 900px)
    height: 11rem
  @media (max-width: 500px)
    height: 11rem
.add-button-container
  display: block
.btn-link
   color: black
   font-weight: 700
</style>
