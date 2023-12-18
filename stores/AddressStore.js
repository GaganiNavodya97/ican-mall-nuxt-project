import {defineStore} from 'pinia';
const store = {
    state: () => ({
        selectedAddressId: null,
    }),
    getters: {

    },
    actions:{
        setSelectedAddressId(addressId){
            this.selectedAddressId = addressId;
        },
    }
};
export const useAddressStore = defineStore("userAddrStore", store);
