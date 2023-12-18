<template>
  <va-card class="item-card-main-container">
    <router-link :to="`/products/${productLink}`">
      <va-image
        :src="picture"       
      />
      <va-card-content class="price-container">
        <label class="price-label" style="font-size: 1.35rem; padding-right: 0.25rem">{{ priceSymbole }}</label>
        <label class="price-label">{{ formattedPrice }}</label>
        <label class="prev-price" v-if="prevPrice > 0 && prevPrice > price">{{ priceSymbole }} {{ fromattedPrevPrice }}</label>
      </va-card-content>
      <va-card-content class="item-name">
        {{ itemName }}
      </va-card-content>
      <va-card-content class="sold-count">
        {{ soldCount }} {{ $t('Label.Sold') }}
      </va-card-content>
    </router-link>
    <!-- <va-card-content class="voucher-container">
      <label v-if="voucherCount" class="voucher-label">{{ voucherCount }} {{ $t('Label.Vouchers') }}</label>
      <label v-if="discount" class="discount-label">{{ discount }}%</label>
    </va-card-content> -->
  </va-card>
</template>
<script>

import {slugifyUrl} from "@/utils/slugify";

  export default {
    // data() {
    //   return {
    //     showPrevPrice: false
    //   };
    // },
    props:{
        picture: {type: String, default:""},
        itemName: {type: String, default:""},
        soldCount: {type: Number, default:0},
        voucherCount: {type: Number, default:0},
        discount: {type: Number, default:0},
        price: {type: Number, default:0},
        priceSymbole: {type: String, default:""},
        productId: {type: Number, default: null},
        prevPrice: {type: Number, default: 0}
    },
    computed: {
      productLink(){
        return slugifyUrl(this.itemName, this.productId);
      },
      formattedPrice() {
        return this.price.toLocaleString(); // Add commas to the price
      },
      fromattedPrevPrice(){
        return this.prevPrice.toLocaleString();
      }
    }
  }
</script>

<style scpoed lang="sass">
@import "@/assets/layout/styles/__variables.sass"

.item-card-main-container
  height: 17.5rem
  max-width: 10.438rem
  display: flex
  flex-direction: column
  justify-content: flex-start
  &:hover
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px
  @media (max-width: 430px)
    max-width: 10.438rem
  @media (max-width: 360px)
    max-width: 9.5rem
    max-height: 18rem
  .va-image
    height: 10.398rem
    width: 10.438rem
    @media (max-width: 430px)
      width: 10.438rem
    @media (max-width: 360px)
      max-width: 9.5rem
  .item-name
    color: $dark-color-3
    max-width: 10.438rem
    padding: 0.5rem
    text-align: left
    font-weight: 600
    display: -webkit-box
    display: block
    overflow: hidden
    text-overflow: ellipsis
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    height: 2.79rem
    line-height: 1.125rem
    font-size: 0.975rem
    @media (max-width: 430px)
      max-width: 10.438rem
  .sold-count
    text-align: left
    color: $dark-color-5
    padding: 0.625rem 0.625rem
    font-size: 0.875rem
  .voucher-container
    display: flex
    padding: 0.625rem
    font-size: 0.875rem
    justify-content: space-between
    font-weight: bold
    padding-top: 0px

    .voucher-label
      height: 1.375rem
      width: 5.5rem
      background-color: $orange-shaded
      color: $orange
      display: flex
      align-items: center
      justify-content: center
      border-radius: 0.188rem
    .discount-label
      height: 1.375rem
      width: 3.298rem
      background-color: $green-shaded
      color: $green
      display: flex
      align-items: center
      justify-content: center
      border-radius: 0.188rem
  .price-container
    height: 1.7rem
    padding: 0.35rem 0.4rem
    .price-label
      color: $main-theme-color
      font-size: 1.5rem
      font-weight: bold
    .prev-price
      color: $dark-color-5
      text-decoration: line-through
      font-size: 0.6rem
      padding-left: 0.2rem

</style>