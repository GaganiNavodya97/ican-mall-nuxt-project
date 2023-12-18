import {defineStore} from 'pinia'
import { getItem } from "@/libraries/Storage"

const store = {
    state: () => ({
        // Setting Sri Lanka Region id as the default region id
        regionId: getItem('localStorage', 'region') || 659006000343,
    }),
    actions: {
        setRegionId(regionId){
            this.regionId = regionId;
        }
    },
    getters:{
        getRegionId(state) {
            return state.regionId;
        }
    }
}

export const useRegionStore = defineStore("regionStore", store);