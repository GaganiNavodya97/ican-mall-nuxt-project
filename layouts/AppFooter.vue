<template>
  <footer class="main-footer-container">
    <div class="footer-container">
      <div class="footer-description-section">
        <div class="first-Column">
          <span class="coloum-topic">{{ $t("footer.Services") }}</span>
          <div>
            <dl class="lists">
              <dt class="list-item"><a href="https://play.google.com/store/apps/details?id=com.easypay.ican" class="link" target="_blank" >{{ $t("footer.ICanMeta") }}</a></dt>
              <dt class="list-item"><a href="https://icanchat.app/" class="link" target="_blank"> {{ $t("footer.ICanChat") }}</a></dt>
              <dt class="list-item"><a href="https://properties.icanlk.com/home" class="link" target="_blank"> {{ $t("footer.Properties") }}</a></dt>
            </dl>
          </div>
        </div>
        <div class="second-column">
          <span class="coloum-topic">{{ $t("footer.Company") }}</span>
          <div>
            <dl class="lists">
              <dt v-for="(policy,index) in policies" :key="index" class="list-item" @click="redirectToPolicies(policy)" >{{ policy.title }}</dt>
              <dt class="list-item" >{{ $t("footer.QRPay") }}</dt>
            </dl>
          </div>
        </div>
        <div class="third-column">
          <span class="coloum-topic">{{ $t("footer.Social") }}</span>
          <div class="icons-set">
            <a href="https://www.facebook.com/iicanmall" class="link" target="_blank"><svg-icon :icon="FbIcon" class="icon"></svg-icon></a>
            <a href="https://twitter.com/icanmeta" class="link" target="_blank"><svg-icon :icon="TwiterIcon" class="icon"></svg-icon></a>
            <a href="https://www.linkedin.com/company/ican-lanka-pvt-ltd/mycompany/verification/" class="link" target="_blank"><svg-icon :icon="LinkedinIcon" class="icon"></svg-icon></a>
          </div>
        </div>
        <div class="fourth-column">
          <div class="qr-and-logo-section">
            <img :src="qrImage" alt="">
            <img :src="MallLogo" alt="">
          </div>
          <div class="app-gallery-section">
            <a href="https://apps.apple.com/lk/app/ican-mall/id1542182604" class="link" target="_blank"><img :src="AppstoreImg" alt="" class="app-store-img"></a>
            <a href="https://play.google.com/store/apps/details?id=com.easypay.shop&hl=en&gl=US" class="link" target="_blank"><img :src="PlaystoreImg" alt=""></a>
          </div>
        </div>
      </div>
      <div class="social-icon-on-tab-mobile">
        <div class="social-icon-set">
          <a href="https://www.facebook.com/p/ICan-Lanka-Pvt-Ltd-100085346082708/" class="link" target="_blank"><svg-icon :icon="FbIcon" width="2.875" height="2.875"></svg-icon></a>
          <a href="https://twitter.com/icanmeta" class="link" target="_blank"><svg-icon :icon="TwiterIcon" width="2.875" height="2.875"></svg-icon></a>
          <a href="https://www.linkedin.com/company/ican-lanka-pvt-ltd/mycompany/verification/" class="link" target="_blank"><svg-icon :icon="LinkedinIcon" width="2.875" height="2.875"></svg-icon></a>
        </div>
      </div>
    </div>
    <div class="reserved-container">
      <span>&#169; {{ new Date().getFullYear() }} {{ $t('headerTitle.Mall') }}. {{ $t('Label.CopyRight') }}</span>
    </div>
  </footer>
</template>

<script>
import FbIcon from '@/assets/icons/svg/fb.svg'
import TwiterIcon from '@/assets/icons/svg/sky.svg'
import LinkedinIcon from '@/assets/icons/svg/linkedin.svg'
import MallLogo from '@/assets/icons/png/footer-imall-logo.webp'
import qrImage from '@/assets/icons/png/footer-qr.webp'
import AppstoreImg from '@/assets/icons/png/footer-appstore.png'
import PlaystoreImg from '@/assets/icons/png/footer-playstore.png'
import {defineAsyncComponent} from "vue";


const SvgIcon = defineAsyncComponent(() => import("@/components/SvgIcon/SvgIcon"))

// import {getDownloadApp} from "@/api/appfooter"
export default {
  name: "AppFooter",
  created() {
    // this.getDownloadAppLink();
  },
  data() {
    return {
      FbIcon:FbIcon,
      TwiterIcon:TwiterIcon,
      LinkedinIcon:LinkedinIcon,
      MallLogo:MallLogo,
      AppstoreImg:AppstoreImg,
      PlaystoreImg:PlaystoreImg,
      qrImage:qrImage,
      policies: [
        {
          title: this.$t("footer.ServiceAgreement"),
          link: "https://icanlk.com/static/agreement/html/ican_mall_terms_of_service.html"
        },
        {
          title: this.$t("footer.PrivacyAgreement"),
          link: "https://icanlk.com//static/agreement/html/ican_mall_privacy_policy.html"
        },
      ]
    };
  },
  components:{ SvgIcon },
  methods: {
      redirectToPolicies({link}){
        let browserLang = this.$i18n.locale
        let query;
        if (link) {
          if (browserLang == "en") {
            query = "?language=en-us"
          }else if (browserLang == "zn"){
            query = "?language=zh-cn"
          }
        }
        window.open(link+query)
      }
    },
  };

</script>

<style scoped lang="sass">
@import "@/assets/styles/__footer.sass"
</style>
