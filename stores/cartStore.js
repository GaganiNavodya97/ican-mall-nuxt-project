import { defineStore } from 'pinia';

const store = {
  state:() => ({
    cartItemCount: null,
  }),
  getters:{
    getCartCount(){
      return this.cartItemCount;
    }
  },
  actions:{
    setCartItemCont(count) {
      this.$state.cartItemCount = count;
    },
  }
};

export const useCartStore = defineStore("userCartStore",store);
