import {defineStore} from 'pinia';
const store = {
    state: () =>({
        byItemsDetails: {},
        priceSymb:null,
        cod:false,
        isCodSame:true,
        deliverydate:"",
        toDeliverShop:{},
        itemDetails:{}
    }),
    getters: {

    },
    actions:{
        setItemsDetails(items, priceSymb){
           this.byItemsDetails = items;
           this.priceSymb = priceSymb;
        },
        setIsCod(isCodSame){
            this.isCodSame = isCodSame
        },
        setCod(cod){
          this.cod = cod;
        },
        setDeliveryDate(date){
          this.deliverydate=date
        },
        setToDeliverShopDetails(shop){
          this.toDeliverShop = shop
        },
        setItemDetailsforRate(item){
          this.itemDetails = item
        }
    }
};
export const useBuyItemsListStore = defineStore("userBuyItemsListStore", store)