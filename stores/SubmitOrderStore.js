import {defineStore} from 'pinia';
const store ={
    state: () => ({
        orderNum: null
    }),
    getters:{

    },
    actions:{
        setOrderNum(order){
            this.orderNum=order
        }
    }
};
export const useSubmitOrderStore = defineStore("userSubmitOrderStore",store)