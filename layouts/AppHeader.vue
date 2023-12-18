<template>
  <div>
    <div v-if="showSearchComponent"><custom-search v-model="searchText" :popular="popular" :history="history" @back="closeSearchComponent" @search="gotoSearch"/></div>
    <header class="navbar-container" >
      <nav>
        <div class="view-in-all">
          <va-button preset="plain" :to="{ name: 'HomeView' }" @click="handlePopstate">
            <svg-icon :icon="iCanLogo" width="1.688" height="1.688"/>
          </va-button>
          <div class="input-container" v-click-outside="checkOutSideClick">
            <input type="text" name="" v-model="searchText" id="" :placeholder="$t('placeholeds.SearchProd')" @click="showSearch" @keydown.enter="gotoSearch">
            <svg-icon class="icon-container" :icon="searchIcon" width="1.35" height="1.35" @click="gotoSearch"/>
            <div v-if="suggestListVisible" class="search-suggestion-list">
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
          </div>
          <va-dropdown :iscontentHoverable="true" :offset="[5,-10]" prevent-overflow stick-to-edges>
            <template #anchor>
              <div class="justify-start items-center pa-1 pr-2 pl-2 region-option region-option-selected">
                <va-avatar :src="regionFlag" :size="20"/>
                <span>{{ regionName }}</span>
              </div>
            </template>
            <va-dropdown-content>
              <div v-for="(option,index) in options" :key="index" class="justify-start items-center pa-1 pl-3 region-option" @click="changeRegion(option.regionId)">
                <va-avatar :src="option.flag" :size="25"/>
                <span>{{ option.regionName }}</span>
              </div>
            </va-dropdown-content>
          </va-dropdown>
        </div>
        <div class="hide-in-mobile-tab">
          <div class="cart-section" @click="goToShoppingCart">
            <svg-icon :icon="cartIcon" style="width: 20px; height: 20px"/>
            <span class="cart-count" v-if="cartAmount" style="color: red">{{ cartAmount }}</span>
          </div>
          <div class="user-section" v-if="!userLoggedIn" @click="store.toggleLoginModal()">
            <svg-icon :icon="profileIcon"/>
            <span>{{ $t("header.logIn") }}</span>
          </div>
          <div class="user-section" v-if="userLoggedIn" @click="goToProfile">
            <svg-icon :icon="profileIcon"/>
            <span class="user-name">{{ loginStore.name }}</span>
          </div>

          <!-- User notification count -->
          <div @click="openNotifications" class="cart-section">
            <svg-icon :icon="notificationIcon" style="width: 20px; height: 20px"/>
            <span class="cart-count" v-if="notificationCount" style="color: red">{{ notificationCount }}</span>
          </div>

          <!-- download app popup -->
          <div class="user-section download-modal-container" @click="store.toggleDownloadModal()">
            <svg-icon :icon="MobileIcon"/>
            <span>{{ $t('Label.GetApp') }}</span>
          </div>
        </div>
      </nav>
      <div v-if="navBarVisible" class="footer-navbar" ref="footerNavBar">
        <footer-nav-slot
          :class="'nav-slot-'+index" v-for="(slot,index) in slots" @click="go(slot.to)" :id="slot.id"
          :title="slot.title" :inactiveIcon="slot.inactiveIcon" :activeIcon="slot.activeIcon" :active="slot.active"
          :key="index" @update="updateSlots" :route="slot.to"
        />
        <div class="cart-count-bottom" v-if="cartAmount" style="background-color:red; width:16px; height:16px; position:absolute; display:flex; justify-content:center; align-items: center; border-radius: 50%; top: 3px; right: 145px; font-size: 10px; color:white;">{{ cartAmount }}</div>
        <div class="top-bar"><div id="bar-bar" class="bar"></div></div>
      </div>
    </header >
  </div>
</template>

<script>
import searchIcon from "@/assets/icons/svg/search-normal.svg"
import iCanLogo from "@/assets/icons/svg/ican mall icon white.svg"
import cartIcon from "@/assets/icons/svg/Cart'.svg"
import profileIcon from "@/assets/icons/svg/profile.svg"
import notificationIcon from "@/assets/icons/svg/notification.svg"
import MobileIcon from "@/assets/icons/svg/mobile-alt-2-svgrepo-com.svg"
import homeInactive from "@/assets/icons/svg/home-2.svg"
import homeActive from "@/assets/icons/svg/home-2-1.svg"
import discoverInactive from "@/assets/icons/svg/discover.svg"
import discoverActive from "@/assets/icons/svg/discover-1.svg"
import cartInactive from "@/assets/icons/svg/shopping-cart.svg"
import cartActive from "@/assets/icons/svg/shopping-cart-1.svg"
import profileInactive from "@/assets/icons/svg/profile-2.svg"
import profileActive from "@/assets/icons/svg/profile-1.svg"
import { getUserInfo } from "@/api/settings.js";
import {useLoginModalStore} from "@/stores/loginModalStore";
import { useLoginStore } from "@/stores/userStore";
import {useCartStore} from '@/stores/cartStore'
import { getCartItemCount } from "@/api/cart"
import {defineAsyncComponent} from "vue";
import {clickOutside} from "@/Directives/directives"
import {popularSearches} from "@/api/search";
import {unreadNotificationCount} from "@/api/user"
import {getRegionList} from "@/api/homePage";
import { setItem } from "@/libraries/Storage"
import { useRegionStore } from "@/stores/regionStore";
import  catchTokenError from "@/utils/catchInvalidTokenError"
import { toast } from 'vue3-toastify'

const FooterNavSlot = defineAsyncComponent(()=>import("@/layouts/SubComponents/FooterNavSlot"))
const SvgIcon = defineAsyncComponent(()=>import("@/components/SvgIcon/SvgIcon"))
const CustomSearch = defineAsyncComponent(()=>import("@/layouts/SubComponents/Search"))

export default {
  name: "AppHeader",
  components: {FooterNavSlot, SvgIcon, CustomSearch},
  data() {
    return {
      showSearchComponent:false,
      searchIcon: searchIcon,
      iCanLogo: iCanLogo,
      searchText:"",
      name:"",
      cartIcon: cartIcon,
      profileIcon: profileIcon,
      notificationIcon: notificationIcon,
      MobileIcon:MobileIcon,
      slots:[
        {id:1, title:"Home", activeIcon:homeActive, inactiveIcon:homeInactive, to:"HomeView", active:true, barActive:true},
        {id:2, title:"Discover", activeIcon:discoverActive, inactiveIcon:discoverInactive, to:"CategoriesList", active:false, barActive:false},
        {id:3, title:"Cart", activeIcon:cartActive, inactiveIcon:cartInactive, to:"ShoppingCart", active:false, barActive:false},
        {id:4, title:"Profile", activeIcon:profileActive, inactiveIcon:profileInactive, to:"profile", active:false, barActive:false},
      ],
      options:[],
      // options: [
      //   {value: 100000000000, label: this.$t('China'), icon: chinaFlag, countryCode:"CN"},
      //   {value: 659006000343, label: this.$t('SL'), icon: sriLankaFlag, countryCode:"LK"},
      //   {value: 659006000408, label: this.$t('Laos'), icon: laosFlag, countryCode:"LA"},
      //   {value: 659006000409, label: this.$t('Turkiye'), icon: turkeyFlag, countryCode:"TR"}
      // ],
      region: null,
      regionName:"",
      regionFlag:"",
      isScrolling: null,
      navBarVisible:true,
      suggestListVisible:false,
      popular:[],
      history: [],
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    }
  },
  setup(){
    const store = useLoginModalStore();
    const loginStore = useLoginStore()
    const isLoggedIn = loginStore.isLoggedIn()
    const regionStore = useRegionStore()
    return { store, isLoggedIn, loginStore, regionStore}
  },
  directives:{
    clickOutside
  },
  mounted() {
    window.addEventListener("scroll", () => {
      // this.myDiv = this.$refs.footerNavBar;
      clearTimeout(this.isScrolling);
      // this.myDiv.style.display = "none";
      if(this.isSafari){ //check the browser is safari and when the screen scrolled the footer navigation does not dispaly 
        this.navBarVisible=false 
      }else{
        this.navBarVisible = true; //In other browser when the screen scrolled the footer navigaton disply   
      }
      this.isScrolling = setTimeout(() => {
        // this.myDiv.style.display = "grid";
        this.navBarVisible=true
      }, 100);
    });
    window.addEventListener('popstate', this.handlePopstate);
    // this.$on('cart-updated', this.updateCartCount)
    //
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopstate);
  },
  beforeUnmount() {
    clearTimeout(this.isScrolling);
  },
  created(){
    this.GetRegions().then(()=>{
      if(region == null){
        this.$storageSetItem("localStorage",'region', this.options[1].regionId)
      }
      if(region !== null){
        this.region = this.options.filter((item) => item.regionId.toString() === region)[0]
      }else{
        this.region = this.options[1]
      }
    }).catch((error)=>{
      catchTokenError(error)
    })
    this.setCartAmount();
    clearTimeout(this.isScrolling);
    let region = this.$storageGetItem('localStorage','region')
    popularSearches()
        .then((response) => this.popular = response.data)
        .catch((error) => catchTokenError(error))
    this.history = this.$storageGetItem("localStorage","__history") || []
    if (typeof this.history === "string"){
      this.history = JSON.parse(this.history)
    }
    if(this.history.length === 0){
      this.$storageSetItem("localStorage",'__history', JSON.stringify(this.history))
    }
    if (this.isLoggedIn) {
      this.getUserDetails();
      this.getUnreadNotificationCount();
    }
  },
  methods:{
    GetRegions(){
      return new Promise((resolve, reject)=>{
      getRegionList().then((response) =>{
        this.options = response.data
        this.setHeaderRegion()
        resolve(true)
      }).catch((err)=>{
        reject(err)
        catchTokenError(err)
      })
      })
    },
    setHeaderRegion(){
      const regionId = this.regionStore.regionId;
      if (regionId) {
        let [regionValue] = this.options.filter((item) => item.regionId === Number(regionId))
        this.regionName = regionValue.regionName;
        this.regionFlag = regionValue.flag;
      }
    },
    handlePopstate() {
        this.searchText = '';
        document.title = 'iCan Mall'
    },
    checkOutSideClick(){
      this.suggestListVisible = false
    },
    go(route){
      clearTimeout(this.isScrolling);
      this.$router.push({name:route})
    },
    closeSearchComponent(){
      this.showSearchComponent = false
    },
    showSearch(){
      this.showSearchComponent = true
      this.suggestListVisible = true
      this.searchText = this.$route.params.result
      if (this.$route.name === "SearchResultsView" && this.$route.params.result === this.searchText){
        this.searchText = this.$route.params.result
      }
    },
    updateSlots(id){
      this.slots.forEach((slot)=>{
        slot.active = slot.id === id;
      })
    },
    updateSearchText(text){
      this.searchText=text
      this.gotoSearch()
    },
    gotoSearch(){
      let maximumSearchHistoryQueue = 10
      this.suggestListVisible = false
      this.showSearchComponent = false
      if(this.searchText !== ""){
        if(this.history.length >= maximumSearchHistoryQueue){
          this.history.splice((this.history.length-1),1)
          console.log(JSON.stringify(this.history));
        }
        if(!this.history.includes(this.searchText)){
          this.history.splice(0,0,this.searchText)
        }
        this.$storageSetItem("localStorage","__history",JSON.stringify(this.history))
        this.$router.push({ name: "SearchResultsView", params: { result: this.searchText } });
        if (this.$route.name === "SearchResultsView" && this.$route.params.result === this.searchText) {
        //   // If the current route is the search page with the same search query, reload it.
            this.$router.go();
        }
        //  else {
        //   console.log(this.searchText, 'search result 6666');
        //   // If it's not the search page or the search query is different, navigate to the search page.
        //   this.$router.push({ name: "SearchResultsView", params: { result: this.searchText } });
        // }
      }
    },
    goToShoppingCart() {
      if(!this.isLoggedIn){
        this.store.toggleLoginModal()
        toast.warning(this.$t('message.LoginToMall'))
      }else{
        this.handlePopstate()
        this.$router.push({ name: 'ShoppingCart' });
      }

    },
    goToProfile() {
      this.handlePopstate()
      this.$router.push({ name: 'profile' });
    },
    getUserDetails() {
      getUserInfo().then((response) => {
        this.userDetails = response.data;
        this.name = this.userDetails.nickName ?? "";
      }).catch((err) => {
        catchTokenError(err)
      });
    },
    async getUnreadNotificationCount(){
      try {
        const {data : count} = await unreadNotificationCount()
        this.loginStore.setNotificationCount(count)
      } catch (error) {
        catchTokenError(error)
        console.log("Error Setting Unread Msg Count : ", error);
      }
    },
    async setCartAmount(){
      if (this.isLoggedIn) {
        try {
          const {data} = await getCartItemCount();
          const cartStore = useCartStore()
          cartStore.setCartItemCont(data)
          this.cartCont = data;
        } catch (error) {
          console.log("Error while setting cart amount : " + JSON.stringify(error));
          catchTokenError(error)
        }
      }
    },
    changeRegion(regionId){
      const regionValue = this.options.filter((item) => item.regionId === regionId)[0]
      this.regionFlag = regionValue.flag;
      this.regionName = regionValue.regionName;
      setItem('localStorage','region',regionId)
      const regionStore = useRegionStore()
      regionStore.setRegionId(regionId)
      location.reload()
    },
    openNotifications(){
      if (this.userLoggedIn) {
        this.$router.push("/notification")
      } else {
        this.store.toggleLoginModal()
      }
    }
  },
  computed: {
    cartAmount(){
      const cartStore = useCartStore()
      return cartStore.getCartCount
    },
    notificationCount(){
      return this.loginStore.userNotificationCount;
    },
    userLoggedIn(){
      return this.loginStore.accessToken !== null;
    }
  },
}
</script>

<style scoped lang="sass">
@import "@/assets/styles/__header.sass"
.cart-section
  position: relative
.download-modal-container
  margin-left: 0.5rem
.cart-count
  position: absolute
  top: -12px
  right: -10px
  display: flex
  justify-content: center
  align-items: center
  width: 16px
  height: 16px
  border-radius: 50%
  background-color: white
  color: red
  font-size: 12px
  font-weight: bold
.footer-navbar
    .cart-count-bottom
      @media screen and (max-width: 835px)
        right: 20px

</style>
