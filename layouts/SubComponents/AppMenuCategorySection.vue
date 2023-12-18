<template>
  <div class="category-section-container">
    <div class="categories" ref="categorySection">
      <template v-for="(slot, index) in category" :key="index">
        <category-slot
          :categoryName="slot.categoryName"
          :active="slot.active"
          :clickIndex="index"
          :categoryId="slot.categoryId"
          @move="moveBar"
          @clicked="handleActiveSlot"
        />
      </template>
    </div>
    <!-- <div class="category-bar-section">
      <div class="category-bar" ref="categoryBar"></div>
    </div> -->
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import {slugifyUrl} from "@/utils/slugify";

const CategorySlot = defineAsyncComponent(() =>
  import("@/layouts/SubComponents/CategorySlot")
);
export default {
  name: "AppMenuCategorySection",
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    category: { type: Array, default: [] },
  },
  components: { CategorySlot },
  data(){
    return{
       idxChecked: null
    }
  },
  watch: {
    idxChecked(newIndex) {
      //console.log("newindex",newIndex)
      this.category.forEach((cat, index) => {
        cat.active = index === newIndex;
        //console.log("new idx saved")
      });
    }
  },
  created() {
    const activeCategory = localStorage.getItem('activeCategory')
    if (activeCategory !== null) {
      this.idxChecked = Number(activeCategory);
      this.category.map((cat, index) => {
        cat.active = index === this.idxChecked;
      });
    }
  },
  
  methods: {
    handleActiveSlot(clickedIndex) {
      this.idxChecked = clickedIndex
      localStorage.setItem('activeCategory', clickedIndex)
      const clickedIdx = localStorage.getItem('activeCategory')
      this.category.map((cat, index) => {
        cat.active = index === clickedIdx;
      });
      const categoryLink = slugifyUrl('cat-id='+this.category[clickedIdx].categoryId, clickedIndex);
      const catname = slugifyUrl(this.category[clickedIdx].categoryName, '')
      this.$router.push({ name: 'CategoryListView',params:{ categoryList:catname, categoryId: categoryLink } });
    },
    moveBar(x) {
      let container = this.$refs.categorySection;
      let slot = this.$refs.categorySection.children[x.index];
      // let totalCats = container.children.length - 1
      // let fromRear = totalCats - x.index 
      //slotrect.width
      let widthFromLeftToClicked = 0 
      let widthFromRightToClicked = 0
      for(let i = 0; i < x.index; i++){
        //console.log("width",this.$refs.categorySection.children[i].getBoundingClientRect().width)
        widthFromLeftToClicked = widthFromLeftToClicked+ this.$refs.categorySection.children[i].getBoundingClientRect().width
        widthFromLeftToClicked = Math.round(widthFromLeftToClicked)
      }
      for(let i = x.index; i < container.children.length; i++){
        widthFromRightToClicked += this.$refs.categorySection.children[i].getBoundingClientRect().width
        widthFromRightToClicked = Math.round(widthFromRightToClicked)
      }
      let slotRect = slot.getBoundingClientRect(); // size of one category slot
      let containerRect = container.getBoundingClientRect(); //size of whole category section
      let leftOffset = Math.round(slotRect.left - containerRect.left); //distance from the left to the left of slot
      let rightOffset = Math.round(Math.abs(slotRect.right - containerRect.right)); //distance from the left to the left of slot
      let scrollAmount

      if(Math.abs(leftOffset - widthFromLeftToClicked) <= 1){ //first category as the first visible element in the header
        if(leftOffset < window.innerWidth / 2){
          // scrollAmount = 0
        } else {
          scrollAmount = window.innerWidth / 2
        }
      }

      if(rightOffset == widthFromRightToClicked){//last category as the last visible element in the header
        if(rightOffset <  window.innerWidth / 2){
          // scrollAmount = 0
        }
        else {
          scrollAmount = -window.innerWidth / 4
        }
      }

      if(leftOffset < widthFromLeftToClicked && rightOffset < widthFromRightToClicked){//part of both front and rear of the category are overflown
        if(leftOffset < window.innerWidth / 4){
          scrollAmount = -window.innerWidth / 4
        }
        else if(leftOffset > window.innerWidth / 2){
          scrollAmount =  window.innerWidth / 2.5 
        }
        else{
          scrollAmount =  window.innerWidth / 2.5 
        }
      }
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });

      // let categoryBar = this.$refs.categoryBar
      // let barPosition
      // if(scrollAmount > 0){
      //   barPosition = leftOffset - scrollAmount
      // } else if (scrollAmount < 0 ){
      //   barPosition = leftOffset + scrollAmount
      // }else{
      //   barPosition = leftOffset
      // }
      // categoryBar.style.marginLeft = barPosition +'px';
    },
    // -------------------
    // -----------------
    // moveBar(x){
    //   let containerRect = this.$refs.categoryBar
    //   containerRect.style.marginLeft = (x.index * 7) +x.index/70+ 'rem';
    // }
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
$active-text-color: #D50567
.category-section-container
  overflow-x: auto
  .categories
    height: 100%
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
    overflow-x: hidden
    background: $nav-bar-background
    @media screen and (max-width: $sm)
      overflow-x: scroll
    @media screen and (max-width: $md)
      overflow-x: scroll   
    ul
      display: inline-flex
      height: 100%
      list-style: none
      scrollbar-width: none //hide the scrollbar in Firefox
      -ms-overflow-style: none //hide the scrollbar in Edge
      ::-webkit-scrollbar //hide the scrollbar in Chrome and Safari
        display: none
      li
        height: 100%
  .category-bar-section
    .category-bar
      width: 6.94rem
      height: 3px
      background-color: $active-text-color
      transition: 0.3s
</style>
