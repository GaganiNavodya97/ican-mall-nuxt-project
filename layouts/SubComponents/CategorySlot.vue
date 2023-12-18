<template>
  <div ref="activeSlot" @click="goToCategory">
    <div :class="{'individual-category':true,'active-category-slot':active}" >
      <span>{{ categoryName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorySlot",
  props:{
    categoryName:{type:String, default:""},
    to:{type:String, default: ""},
    categoryId:{type:Number, default:0},
    active:{type:Boolean, default:false},
    clickIndex:{type:Number, default:0}
  },
  data(){
    return {}
  },
  methods:{
    goToCategory(){
      this.$emit("clicked", this.clickIndex)
      let activeSlot = this.$refs.activeSlot.getBoundingClientRect()
      this.$emit("move", {position:activeSlot.x,index:this.clickIndex})
    }
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
$category-min-width: 12rem

.individual-category
  height: 100%
  flex: 1
  color: white
  display: flex
  justify-content: center
  align-items: center
  padding: 1rem 0rem
  cursor: pointer
  height: 100%
  font-size: 15px
  span
    display: inline-block
    margin: 0rem 1.5rem
    white-space: nowrap
    height: 100%
    text-align: center
    @media screen and (max-width: $sm)
      margin:0rem 1.25rem

.active-category-slot
  color: white 
  font-size: 17px
  font-weight: bold
  position: relative
  @media screen and (max-width : $sm)
    font-size: 14px
.active-category-slot::after 
  content: ""
  position: absolute
  align-items: center
  bottom: 5px
  width: 25%
  height: 2px
  background-color: #ffffff
  transform: scaleX(1)
  transition: transform 0.2s ease-in-out
  @media screen and (max-width : $sm)
    bottom: 7px
    width: 25%
    height: 2px

.active-category-slot:hover::after,
.active-category-slot:focus::after 
  transform: scaleX(0)


</style>
