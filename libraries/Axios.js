import axiosBase from 'axios';
import moment from 'moment-timezone';
import {getCookie} from "@/utils/cookies";

const axios = axiosBase.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000,
})

axios.interceptors.request.use(async (config) => {
        let timeZone = moment.tz.guess(true)
        let authToken = getCookie('accessToken')

        // * Need to Prioritize user selected language once that feature is implemented
        let userLanguage = navigator.language || navigator.userLanguage;

        // If the userLanguage does not exist or is not chinese, default value is en-US
        if (userLanguage == 'en' || !userLanguage || !userLanguage.includes('zh')) {
            userLanguage = "en-US"
        }

        config.headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Time-Zone': timeZone,
            'Accept-Language': userLanguage,
        }
        if(authToken){
            config.headers.Authorization = "bearer"+authToken;
        }
        config.data = JSON.stringify(config.data);
        return config
    },
    (err) => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) =>{
        // if(error.response){ //need to extend
        // }
        return Promise.reject(error.response);
    }
)

export default axios;
