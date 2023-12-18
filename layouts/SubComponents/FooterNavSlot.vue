<template>
  <div :class="{'nav-slot':true,'active-slot':isCurrentRoute}" @click="navigateUser">
    <svg-icon class="nav-slot-icon" :icon="(isCurrentRoute ? activeIcon:inactiveIcon)" width="1.25" height="1.25"/>
    <span :class="{'slot-title':true,'slot-title-active':isCurrentRoute}">{{ title }}</span>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import {useLoginStore} from "@/stores/userStore"

const svgIcon = defineAsyncComponent(()=> import("@/components/SvgIcon/SvgIcon"))
export default {
  name: "FooterNavSlot",
  components:{svgIcon},
  setup(){
    const userStore = useLoginStore();
    return {userStore}
  },
  props:{
    inactiveIcon:{type:String, default:""},
    activeIcon: {type:String, default:""},
    active: {type:Boolean, default:false},
    title: {type:String, default:""},
    id:{type:Number, default:0, required:true},
    route:{type:String, default:"", required:true},
  },
  computed: {
    isCurrentRoute(){
      return this.userStore.userCurrentRoute === this.route;
    }
  },
  methods:{
    navigateUser(){
      this.$emit('update', this.id);
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
$active-text-color: #D50567
.nav-slot
  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: center
  height: 100%
  width: 4.5rem
  overflow-y: hidden
  .slot-title
    margin-top: 0.3rem
    margin-bottom: 0.8rem
    font-size: 0.8rem
    color: $dark-color-5
  .slot-title-active
    color: $active-text-color
.count-bubble 
   position: absolute
   top: -8px
   right: -8px
   background-color: red
   color: white
   width: 20px
   height: 20px
   border-radius: 50%
   display: flex
   align-items: center
   justify-content: center
   font-size: 12px
</style>
