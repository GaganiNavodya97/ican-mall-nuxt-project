<template>
  <div class="dropdown-category-slot">
    <div class="category-header">
      <div class="category-title" @click="handleClick">{{ dropDown.categoryName }}</div>
      <div class="dropdown-icon" v-if="dropDown.childList ? dropDown.childList.length !== 0 : false"><svg-icon :icon="(activated ? dropUpIcon : dropDownIcon)" @click="handleClick"/></div>
    </div>
    <div class="category-children" v-if="dropDown.childList !== 0 && activated">
      <template v-for="(slot,index) in dropDown.childList" :key="index">
        <app-menu-category-drop-down-slot :dropDown="slot" />
      </template>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import dropDownIcon from "@/assets/icons/svg/drop down.svg"
import dropUpIcon from "@/assets/icons/svg/drop up.svg"
const AppMenuCategoryDropDownSlot = defineAsyncComponent(() => import("@/layouts/SubComponents/AppMenuCategoryDropDownSlot"))
const SvgIcon = defineAsyncComponent(() => import("@/components/SvgIcon/SvgIcon"))
export default {
  name: "AppMenuCategoryDropDownSlot",
  props:{
    // eslint-disable-next-line vue/require-valid-default-prop
    dropDown:{type:Object, default:{} },
    redirect:{type: String, default:""}
  },
  components:{AppMenuCategoryDropDownSlot, SvgIcon},
  data(){
    return {
      activated: false,
      dropDownIcon: dropDownIcon,
      dropUpIcon: dropUpIcon,
    }
  },
  methods:{
    handleClick(){
      this.activated = !this.activated
      // if(this.activated){
      //   this.$router.push({name:"",params:{}})
      // }
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
.dropdown-category-slot
  width: 100%
  padding: 0.6rem
  & > div
    width: 100%
  .category-header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    & > div
      cursor: pointer
  .category-children
    margin-left: 1rem
</style>
