<template>
  <div class="bg-container">
  <!-- <div
    :style="[ days <=0 && hours<=0 && minutes<=0 && seconds<=0 ? {background: `url('${defaultBannerImgUrl}') no-repeat`, height: bannerHeight} : {background: `url('@/assets/images/Defaultbanner.jpg') no-repeat`, height: bannerHeight}]" class="bg-container">
    <div class="date-counter-container" v-if="(days >=0 && hours >=0 && minutes>=0 && seconds>=0)">
      <vue3-flip-countdown
        :deadlineISO="targetDate"
        countdownSize="1.9rem"
        labelSize="0.75rem"
        mainColor="#ffff"
        labelColor="#222222"
        class="flip-clock"
      />
      
    </div> -->
  </div>
</template>

<script>
export default {
  name: "AdsDiscriptionCard",
  created() {
   },
  data() {
    return {
      targetDate:'',
      currentDate: new Date(),
      jsonData: null,
      campainBannerImageUrl:'',
      defaultBannerImgUrl:'@/assets/images/Defaultbanner.jpg'
    };
  },
  computed: {
    timeRemaining() {
      const timeDiff = this.targetDate - this.currentDate;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds,timeDiff};
    },

    days() {
      return this.timeRemaining.days;
    },
    hours() {
      return this.timeRemaining.hours;
    },
    minutes() {
      return this.timeRemaining.minutes;
    },
    seconds() {
      return this.timeRemaining.seconds;
    },
    // bannerHeight() {
    //   console.log(window.innerWidth, 'innerwidth');
    //   return window.innerWidth >= 1920 ? '320px' : '241.44px';
    // }
  },
  props: {},
  methods: {
    updateCurrentTime() {
      this.currentDate = new Date();
    },
  },
  mounted() {
    // Update the current time every second
    setInterval(this.updateCurrentTime, 1000);

    // Fetch the JSON data from the provided URL
    fetch('https://ican-mall.oss-accelerate-overseas.aliyuncs.com/images/BannerH5/domain.json')
      .then(response => response.text())
      .then(data => {
        this.jsonData = JSON.parse(data);
        this.targetDate = new Date(this.jsonData.time)
        const language = this.$i18n.locale //check browser language
        if(language == 'en'){
          this.campainBannerImageUrl = this.jsonData.en.campaignImageTopRightBanner
          this.defaultBannerImgUrl = this.jsonData.en.DefaultTopRightBanner
        }else if (language == 'zn'){
          this.campainBannerImageUrl = this.jsonData.zn.campaignImageTopRightBanner
          this.defaultBannerImgUrl = this.jsonData.zn.DefaultTopRightBanner
        }
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }
};
</script>

<style lang="sass" scoped>
@import "@/assets/layout/styles/__variables.sass"

.bg-container
  background: url("@/assets/images/Defaultbanner.webp") no-repeat
  width: 100%
  margin-left: 1rem
  position: relative
  border-radius: 6px
  height: 15rem
.flip-clock
  margin-left: auto !important
  margin-right: 0rem
.flip-card__top

.text-container
  display: flex
  flex-direction: column

.title
  font-size: 40px
  font-weight: bold
  color: $dark-color-9
  line-height: 46.88px
  letter-spacing: 1.25px
  margin: 10px 0 0 30px

  span
    color: $cream

.para
  color: $dark-color-9
  position: absolute
  left: 25px
  bottom: 25px
  line-height: 20px

.scan-qr
  color: $cream
  font-family: hurricane
  font-size: 32px
  position: absolute
  left: 270px
  top: 140px
.date-counter-container
  display: flex
  justify-content: flex-end
  font-size: 30px
  font-weight: 700
  color: white
  font-family: Poppins
  padding-top: 2.8rem
  margin-right: 1.6rem
.date-block
  display: block
  text-align: center
.day-count
  width: 3.258rem
  height: 3.258rem
  background-color: black
  align-items: center
  padding-top: 0.6rem
  border-radius: 8px
.days
  font-size: 12px
  font-weight: 600
  color: white
  padding-top: 0.1rem
.separator
  padding-top: 0.4rem
  padding-left: 0.1rem
  padding-right: 0.1rem

</style>