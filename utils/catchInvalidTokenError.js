import { useLoginStore } from "@/stores/userStore";
import router from "@/router";
import { getCookie } from "@/utils/cookies";

const catchTokenError = (err) => {
  const loginStore = useLoginStore()
  if( typeof getCookie('accessToken') !== "undefined"){
    if (err.status === 401) {
      loginStore.logout()
      console.log(router.currentRoute._value.path,'current route');
      if(router.currentRoute._value.path == "/"){
        location.reload()
      }
      router.push("/")
    }
  }
};
export default catchTokenError;
