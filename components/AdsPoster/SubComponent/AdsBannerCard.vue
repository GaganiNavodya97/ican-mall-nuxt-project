<template>
  <va-carousel v-model="bannerImage" :items="items" :height="bannerHeight" swipable infinite stateful autoscroll
               :autoscroll-interval="3000" :ratio="21 / 8.55" :arrows="false"
               @click="viewAd()"
  >
    <template #indicator >
      <div class="indicator">.</div>
    </template>
  </va-carousel>
</template>

<script>

import {getBannerImages} from "@/api/homePage"
import { useRegionStore } from "@/stores/regionStore";
import  catchTokenError from "@/utils/catchInvalidTokenError"
import { getShopDetails} from "@/api/product";
import {slugifyUrl} from "@/utils/slugify";
export default {
  name: "AdsBannerCard",
  setup() {
    const regionStore = useRegionStore()
    const regionId = regionStore.getRegionId
    return {regionId}
  },
  created() {
    this.getBannerImagesFunc()
  },
  data() {
    return {
      bannerImage:null,
      orignalAds:[],
      items: [],
      adsType:'',
      relation:0,
      shopName:''
    };
  },
  methods: {
    async getBannerImagesFunc(){
      try {
        const {data} = await getBannerImages(this.regionId)
        this.orignalAds = data
        this.items = data.map((img) => img.imgUrl)
        this.adsType = data.map((type) => type.type)
      } catch (error) {
        catchTokenError(error)
        console.log("Error getting banner images : ", error);
      }
    },
    getShopDetails(id){
      getShopDetails(id).then((response) =>{
        this.shopName = slugifyUrl(response.data.shopName, '')
        this.$router.push({name:'store', params:{shop:this.shopName,storeId:this.relation}})
      })
    },
    viewAd(){
      if((this.orignalAds[this.bannerImage].relation)){
        this.relation = (this.orignalAds[this.bannerImage].relation);
      }
      switch(this.orignalAds[this.bannerImage].type){
        case 0:
          this.$router.push({ name: 'viewGoods', query: {a:this.relation}});
          break;
        case 3:
          this.getShopDetails(this.relation)
          break;
      }
    }
  },
  computed: {
    bannerHeight() {
      return window.innerWidth >= 768 ? '240px' : '155px';
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "@/assets/layout/styles/__variables.sass"
  .indicator
    font-size: 3.5rem
    color: $dark-color-8
    cursor: pointer
</style>