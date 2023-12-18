import {defineStore} from 'pinia'
import { getItem} from "@/libraries/Storage"
import {deleteAllCookies, getCookie, setCookie} from "@/utils/cookies";

const store = {
    state: () => ({
        accessToken: getCookie('accessToken') || null,
        refreshToken: getCookie('refreshToken') || null,
        expiresIn: getCookie('sessonStorage','expiresIn') || null,
        pic: getCookie('pic') || null,
        userId: getCookie('userId') || null,
        name: getCookie('name') || null,
        enabled:getCookie('enabled') || null,
        userRegion: getItem('localStorage','region') || 659006000343, // Setting Sri Lanka Region id as the default region id
        userNotificationCount:0 ,
        userCurrentRoute: null,
        isNewUser: false
    }),
    getters: {
    },
    actions: {
        isLoggedIn() {
            return this.accessToken !== null
        },
        logout() {
            deleteAllCookies()
            this.$reset()
        },
        async login(payload) {
            this.accessToken = payload.access_token
            this.refreshToken = payload.refresh_token
            this.expiresIn = payload.expires_in
            this.pic = payload.pic
            this.userId = payload.userId
            this.name = payload.nickName
            this.enabled = payload.enabled

            setCookie('accessToken', payload.access_token)
            setCookie('refreshToken', payload.refresh_token)
            setCookie('expiresIn', payload.expires_in)
            setCookie('pic', payload.pic)
            setCookie('userId', payload.userId)
            setCookie('name', payload.nickName)
            setCookie('enabled', payload.enabled)
        },
        setUserRegion(regionId){
            this.userRegion = regionId;
        },
        setUserCurrentRoute(route){
            this.userCurrentRoute = route;
        },
        setNotificationCount(count){
            this.userNotificationCount = count;
        },
        setNewUser(newUser){
            this.isNewUser = newUser
        }
    }
};

export const useLoginStore = defineStore("userStore", store);
