import {defineStore} from 'pinia';
const store = {
    state: () => ({
        checkoutResponse:[],
        totalPrice: null,
        priceUnit:null,
    }),
    getters:{

    },
    actions:{
        setTotalPrice(total, unit, response){
            this.checkoutResponse = response
            this.totalPrice = total;
            this.priceUnit = unit;
        }
    }
};
export const useCheckoutStore = defineStore("userCheckoutStore", store)