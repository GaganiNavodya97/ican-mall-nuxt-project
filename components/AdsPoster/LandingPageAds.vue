<template>
  <div class="ads-loader-container">
    <div class="ads-loadar">
      <div class="dis-card-loader">
        <ads-banner-card></ads-banner-card>
      </div>  
      <div class="image-card-loader">
        <ads-discription-card></ads-discription-card>
      </div>
    </div>
  </div>
</template>

<script>
import AdsBannerCard from '@/components/AdsPoster/SubComponent/AdsBannerCard.vue';
import  AdsDiscriptionCard from '@/components/AdsPoster/SubComponent/AdsDiscriptionCard.vue';

export default {
  name: "LandingPageAds",
  created() {},
  data() {
    return {};
  },
  props: {},
  components:{AdsBannerCard, AdsDiscriptionCard,},
  methods: {},
};
</script>

<style lang="sass" scoped>
.ads-loader-container
  margin: 1rem

.ads-loadar 
  width: 100%
  display: flex
  @media (max-width: 1050px)
    display: block
    flex-direction: column

.image-card-loader
  width:  100%
  @media (max-width: 912px)
    display: none
.dis-card-loader
  width: 100%
</style>