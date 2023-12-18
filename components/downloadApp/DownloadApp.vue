<template>
  <div>
    <div class="container" ref="downloadModal" v-if="userLoginModal.downloadModal || isDownloadPopup == 'true'">
      <div class="item-container">
        <div class="close-btn-container" @click="closeModal()">
          <img :src="CloseBtn" alt="">
        </div>
        <div class="header">
          <h1>{{ $t('placeholeds.DownloadApp') }}</h1>
        </div>
        <div class="discription-container">
          <span class="discription">
            {{ $t('Label.UseAppDiscription') }}
          </span>
        </div>
        <div class="qr-container">
          <img :src="QrImage" alt="" class="qr-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginModalStore } from "@/stores/loginModalStore";
import CloseBtn from '@/assets/icons/png/close-btn.png';
import QrImage from '@/assets/images/QR.webp'

export default {
  name: "Test",
  setup(){
    const userLoginModal = useLoginModalStore();
    const { toggleLoginModal } = userLoginModal;
    const isDownloadPopup = localStorage.getItem('isDownloadPopup')
    if (isDownloadPopup === null) {
       // 'ispopupopen' is not in local storage, set it to true
      localStorage.setItem('isDownloadPopup', 'true');
    }
    return { userLoginModal, toggleLoginModal}
  },
  created() {
    this.isDownloadPopup = localStorage.getItem('isDownloadPopup');
    if (this.isDownloadPopup === null) {
       // 'ispopupopen' is not in local storage, set it to true
      localStorage.setItem('isDownloadPopup', 'true');
    }
  },
  data() {
    return {
      CloseBtn:CloseBtn,
      QrImage:QrImage,
      isDownloadPopup: true
    };
  },
  props: {},
  methods: {
    closeModal(){
      this.userLoginModal.downloadModal = false;
      this.isDownloadPopup='false';
      localStorage.setItem('isDownloadPopup', 'false');
    }
  },
};
</script>

<style lang="sass" scoped>
.container
  position: fixed
  top: 0
  left: 0
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  justify-content: center
  align-items: center
  background-color: rgba(0, 0, 0, 0.4)
  z-index: 999
  @media screen and (max-width : 900px)
    display: none
.item-container
  background-color: white
  position: relative
  width: 39rem
  height: 24rem
  border-radius: 15px
  background: url("@/assets/images/bg-png-poup.webp") no-repeat
  background-size: contain
  @media screen and (max-width : 900px)
    display: none
.close-btn-container
  position: absolute
  top: -3.5rem
  right: -1rem
  cursor: pointer
.header
  font-size: 2.3rem
  margin-left: 1.6rem
  margin-top: 1rem
  font-weight: 600
.discription-container
   width: 23rem
   margin-top: 0.6rem
   margin-left: 1.6rem
   font-size: 0.87rem
   line-height: 1rem
   color: #666666
   margin-top: 0.5rem
.qr-image
  position: absolute
  width: 9rem
  height: 9rem
  margin: 1rem
  left: 2rem
  top: 9.4rem
  
</style>