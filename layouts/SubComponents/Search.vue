<template>
  <div class="search-container">
    <div class="main-section-search">
      <svg-icon :icon="back" @click="emitBack" width="1.85" height="1.85"/>
      <div class="input-container-search">
        <svg-icon class="icon-container-search" :icon="searchIcon" width="1.35" height="1.35"/>
        <form @submit.prevent="gotoSearch" >
          <input ref="inputSearch" type="text" v-model="searchText" name="searchInput" id="searchInput" :placeholder="$t('placeholeds.SearchProd')" @change="updateText">
        </form>
      </div>
    </div>
    <div class="recent-search-container">
      <h4>{{ $t("headerTitle.History") }}</h4>
      <div class="history-chips">
        <template v-for="(item,index) in history" :key="index">
          <span @click="updateSearchText(item)">{{ item }}</span>
        </template>
      </div>
    </div>
    <div class="top-search-container">
      <h4>{{ $t("headerTitle.Popular") }}</h4>
      <div class="popular-chips">
        <template v-for="(item,index) in popular" :key="index">
          <span @click="updateSearchText(item.content)">{{ item.content }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import back from "@/assets/icons/svg/drop left.svg"
import searchIcon from "@/assets/icons/svg/search-normal.svg"
const svgIcon= defineAsyncComponent(()=> import("@/components/SvgIcon/SvgIcon"))
export default {
  name: "Search",
  props:{
    modelValue: {type:String, default: ""},
    // eslint-disable-next-line vue/require-valid-default-prop
    popular: {type:Array, default: []},
    // eslint-disable-next-line vue/require-valid-default-prop
    history: {type:Array, default: []},
  },
  components:{svgIcon},
  mounted() {
    this.$refs.inputSearch.focus();
    const searchInput = document.getElementById('searchInput');
    searchInput.setAttribute('inputmode', 'search');
  },
  created() {
    this.searchText=this.modelValue
  },
  data(){
    return {
      back:back,
      searchIcon:searchIcon,
      searchText:"",
    }
  },
  methods:{
    emitBack(){
      this.$emit("back");
    },
    updateText(){
      this.$emit('update:modelValue', this.searchText)
    },
    updateSearchText(text){
      this.searchText=text
      this.updateText()
      this.gotoSearch()
    },
    gotoSearch(){
      this.$emit('search')
    }
  },
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"

.search-container
  display: flex
  flex-direction: column
  gap: 0.9rem
  top: 0
  left: 0
  width: 100%
  height: 100%
  position: fixed
  background-color: #F8F9FB
  z-index: 55
  transition: 0.5s
  padding: 0.6rem
  @media screen and (min-width: $md)
    display: none
  .main-section-search
    display: flex
    flex-direction: row
    align-items: center
    height: $nav-bar-height -  0.625rem * 2
    width: 100%
    .input-container-search
      position: relative
      margin-left: 0.8rem
      margin-right: 1.3rem
      width: 100%
      input
        border-radius: 5px
        border: 0 solid $dark-color-8
        height: $nav-bar-height -  0.625rem * 2 !important
        padding-left: 2.5rem
        width: 100%
        @media screen and (max-width : $sm)
          max-width: 100%
        &:focus
          border-color: 0 solid $dark-color-8
        ::-webkit-input-placeholder, ::-moz-placeholder, :-ms-input-placeholder, :-moz-placeholder
          color: $dark-color-4
      .icon-container-search
        position: absolute
        top: 0.54rem
        transform: translateX(calc(1 * 0.5rem))
  .top-search-container .popular-chips, .recent-search-container .history-chips
      display: flex
      flex-wrap: wrap
      flex-direction: row
      gap: 0.3rem
      margin: 0.3rem
      span
        //border: 2px solid $dark-color-5
        padding: 0.5rem
        background-color: $dark-color-7
        color: $dark-color-4
        border-radius: 16px
        min-width: 3rem
        text-align: center
        text-transform: capitalize
        font-size: 0.875rem
        cursor: pointer
</style>
