<template>
  <div>
    <div :class="{'main-menu-container':true,'activated':showCategoryExpanded}">
      <!-- <div class="all-category-section" v-click-outside="checkIfCategoryOpen">
        <div class="all-category" @click="handleClick">
          <div class="all-category-text">All Categories</div>
          <svg-icon :icon="(showCategoryExpanded ? dropUpIcon : dropDownIcon)"/>
        </div>
        <div ref="categorySection" v-if="showCategoryExpanded" class="expanding-section">
          <template v-for="(slot,index) in categories" :key="index">
            <app-menu-category-drop-down-slot :dropDown="slot" />
          </template>
        </div>
      </div> -->
      <div class="category-section">
        <app-menu-category-section :category="categories"/>
      </div>
    </div>
    <div class="overlay" v-if="showCategoryExpanded"></div>
  </div>
</template>

<script>
// import dropDownIcon from "@/assets/icons/svg/drop down.svg"
// import dropUpIcon from "@/assets/icons/svg/drop up.svg"
import {getCategoriesListWithParent} from "@/api/category";
import {clickOutside} from "@/Directives/directives"
import {defineAsyncComponent} from "vue";
import  catchTokenError from "@/utils/catchInvalidTokenError"

// const AppMenuCategoryDropDownSlot = defineAsyncComponent(() => import("@/layouts/SubComponents/AppMenuCategoryDropDownSlot"))
const AppMenuCategorySection = defineAsyncComponent(() => import("@/layouts/SubComponents/AppMenuCategorySection"))
// const SvgIcon = defineAsyncComponent(() => import("@/components/SvgIcon/SvgIcon"))

export default {
  name: "AppMenu",
  data(){
    return {
      // dropDownIcon:dropDownIcon,
      // dropUpIcon:dropUpIcon,
      categories:[],
      showCategoryExpanded: false,
    }
  },
  // components:{AppMenuCategoryDropDownSlot, SvgIcon, AppMenuCategorySection},
  components:{AppMenuCategorySection},
  methods:{
    // handleClick(){
    //   this.showCategoryExpanded = ! this.showCategoryExpanded
    //   if(this.showCategoryExpanded){
    //     document.body.classList.add('main-menu-model-opened');
    //   }else{
    //     document.body.classList.remove('main-menu-model-opened');
    //   }
    // },
    // checkIfCategoryOpen(){
    //   if(this.showCategoryExpanded){
    //     this.showCategoryExpanded = false
    //     document.body.classList.remove('main-menu-model-opened');
    //   }
    // },
  },
  created() {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    } else {
      getCategoriesListWithParent()
        .then((response) => {
          this.categories = response.data;
          // Save categories in local storage
          localStorage.setItem("categories", JSON.stringify(response.data));
        })
        .catch((error) => {
          catchTokenError(error)
        });
    }
  },
  directives:{
    clickOutside
  },
}
</script>

<style lang="sass">
.main-menu-model-opened
  overflow-y: hidden
</style>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
$all-category-section-max-width: 14rem
$all-category-section-min-width: 14rem

.overlay
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: $all-category-section-max-width
  background-color: rgba(0,0,0,0.50)
  z-index: $nav-bar-z-index - 5
  overflow: hidden
.activated
  z-index: $nav-bar-z-index + 5 !important
.main-menu-container
  display: flex
  flex-direction: row
  align-items: center
  position: fixed
  top: $nav-bar-height
  width: 100%
  height: 2.75rem
  max-height: 2.75rem
  background-color: white
  z-index: $nav-bar-z-index - 5
  @media screen and (max-width: $sm)
    top: 3.5rem
  & > div
    width: 100%
  .category-section
    position: relative
    height: 2.75rem
    max-height: 2.75rem
  .all-category-section
    max-width: $all-category-section-max-width
    min-width: $all-category-section-min-width
    padding: 1rem
    .all-category
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      cursor: pointer
    .expanding-section
      overflow-y: auto !important
      overflow-x: hidden
      position: fixed
      width: $all-category-section-max-width
      background-color: $dark-color-8
      top:  $main-menu-height + $nav-bar-height
      left: 0
      bottom: 0
      transition: all 1.5s ease-out
      padding: 1rem 1rem 3rem 1rem
</style>
