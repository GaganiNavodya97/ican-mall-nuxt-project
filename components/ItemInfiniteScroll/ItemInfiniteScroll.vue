<template>
  <div>
    <div class="infinite-card-main-container">
      <div v-for="(item, index) in records" :key="index">
        <item-card class="item-details-card"
                   :picture="item.pic" :itemName="item.prodName" :soldCount="item.soldNum" :voucherCount="2" :discount="10"
                   :price="item.price" :priceSymbole="item.priceSymbol" :prevPrice="item.oriPrice" :productId="item.prodId"
        />
      </div>
    </div>
    <div v-if="this.number0fPages < 4" class="loader">
      <infinite-loading @infinite="appendRecordsAsync" spinner="circles">
        <template #spinner>
          <div class="load-massage">
            <span>{{ $t('placeholeds.Loading') }}</span>
          </div>
        </template>
      </infinite-loading>
    </div>
    <div class="see-more" v-if="this.number0fPages == 4 ">
      <button class="btn" @click="loadMore">{{ $t('placeholeds.LoadMore') }}</button>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import { getRandomProducts } from "@/api/homePage"
import { getHomeProducts } from "@/api/homePage"
import {useRegionStore} from "@/stores/regionStore"
import InfiniteLoading from 'v3-infinite-loading';
import  catchTokenError from "@/utils/catchInvalidTokenError"
// import Loading from "@/assets/images/loading.gif"
const ItemCard = defineAsyncComponent(() => import("@/components/ItemCard/ItemCard.vue"));

export default{
    components:{
      ItemCard, InfiniteLoading
    },
    setup(){
      const regionId = useRegionStore()
      return {regionId}
    },
    methods: {
      // async appendRecordsAsync() {
      //   await new Promise(() => {
      //       getRandomProducts(this.current,12,this.regionId.regionId)
      //         .then((response) => {
      //           this.current++
      //           this.records = this.records.concat(response.data.records)
      //         })
      //   });
      // },
      async appendRecordsAsync() {
        await new Promise(() => {
            getHomeProducts(this.current,24,this.regionId.regionId)
              .then((response) => {
                this.current++
                this.records = this.records.concat(response.data.records)
                if (this.number0fPages<=4) {
                  this.number0fPages ++
                }
              }).catch((err) => {
                catchTokenError(err)
              });
        });
      },
      loadMore() {
        this.number0fPages = 1
      }
    },
    created(){
        // getRandomProducts(this.current,12,this.regionId.regionId)
        //   .then((response) => {
        //     this.current++
        //     this.records = response.data.records
        //   })
    },
  data() {
    return {
      records: [],
      current:1,
      number0fPages: 1,
    };
  },
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"

.infinite-card-main-container
  padding: 1rem
  display: grid
  row-gap: 1rem
  overflow-y: hidden !important
  justify-content: space-between
  width: 100%
  @media screen and (min-width: $md)
    grid-template-rows: auto
    grid-template-columns: auto auto auto auto auto auto
  @media screen and (max-width: $md)
    justify-content: space-around
    grid-template-rows: auto
    grid-template-columns: auto auto auto auto
  @media screen and (max-width: $sm)
    justify-content: space-around
    grid-template-rows: auto
    grid-template-columns: auto auto

.item-details-card
  cursor: pointer
.see-more
  display: flex
  justify-content: center
  align-items: center
  margin: 2rem

.btn
  border: 1px solid #D50567
  color: #D50567
  font-weight: 500
  font-size: 1rem
  padding: 0.7rem
  width: 20rem
.loader
  display: flex
  justify-content: center
  align-items: center
  margin: 2rem
.load-massage
  color: #D50567
  padding: 0.7rem
  font-size: 0.9rem
</style>