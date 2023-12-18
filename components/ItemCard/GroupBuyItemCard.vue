<template>
  <div>
    <router-link :to="{ path: `/products/${productLink}`, query: { pageName: 'groupBuy' } }">
      <va-card class="item-card-main-container">
        <div class="card-main-container">
          <div class="image-container">
            <va-image
              :src="picture"
              :ratio="8/7"
            />
          </div>
          <div class="card-botom-container">
            <div class="product-discription-top">
              <label class="product-name">{{ productName }}</label>
              <div class="progress-bar-container">
                <div class="progress" :style="{ width: persentage + '%' }">
                  <span class="persentage">{{ persentage + '%' }}</span>
                </div>
              </div>
              <div class="progress-discription" v-if="groupBuyStatus == 2">
                <label class="completed" v-if="participantNo == 0">{{ $t('GroupBuy.Completed') }}</label>
                <label class="completed" v-else>{{ $t('GroupBuy.timeOut') }}</label>
              </div>
              <div class="progress-discription">
                <label class="participant" v-if="groupBuyStatus == 1">{{ $t('GroupBuy.NeedParticipant') }} {{ participantNo }} {{ $t('GroupBuy.NoParticipant') }}</label>
              </div>
            </div>
            <div class="product-discription-bottom">
              <div class="left-section">
                <div class="price-section">
                  <label class="price">{{ priceSymbole }} {{ formattedPrice }}</label>
                </div>
                <div class="rate-section">
                  <svg-icon :icon="RateStar"/>
                  <label class="rate">{{ rate + '/5' }}</label>
                  <label class="actual-price">{{ priceSymbole }}{{ fromattedPrevPrice }}</label>
                </div>
              </div>
              <div :key="index" :class="timeCountDown" v-if="groupBuyStatus !== 2">
                <div class="date-countdown-container">
                  <div class="date-block">
                    <div class="day-count">
                      <label class="day">{{ hours }}</label>
                    </div>
                    <div :class="DayLabel">
                      <label class="label">{{ $t('GroupBuy.hour') }}</label>
                    </div>
                  </div>
                  <label class="separater">:</label>
                  <div class="date-block">
                    <div class="day-count">
                      <label class="day">{{ minutes }}</label>
                    </div>
                    <div :class="DayLabel">
                      <label class="label">{{ $t('GroupBuy.min') }}</label>
                    </div>
                  </div>
                  <label class="separater">:</label>
                  <div class="date-block">
                    <div class="day-count">
                      <label class="day">{{ seconds }}</label>
                    </div>
                    <div :class="DayLabel">
                      <label class="label">{{ $t('GroupBuy.sec') }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </va-card>
    </router-link>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import RateStar from "@/assets/icons/svg/star-rate.svg"

import {slugifyUrl} from "@/utils/slugify";

export default {
  name: "Test",
  created() {
    this.updateCountdown()
  },
  data() {
    return {
      RateStar:RateStar,
      timeCountDown:'right-section',
      DayLabel:'day-label',
      hours: 0,
      minutes: 0,
      seconds: 0,
      timeDifference:0
    };
  },
  components: {
    SvgIcon
  },
  mounted() {
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
  },
  props: {
    picture: {type: String, default:""},
    productName: {type: String, default:""},
    price: {type: Number, default:0},
    rate:{type: Number, default:0},
    priceSymbole: {type: String, default:""},
    actualPrice:{type: Number, default:0},
    groupBuyStatus:{type: Number, default:1},
    prodCount:{type: Number, default:0},
    sellCount:{type: Number, default:0},
    endTime:{type: Date, default:''},
    statTime:{type: Date, default:''},
    productId:{type: Number, default:1}
  },
  methods: {
    updateCountdown(){
      if(this.groupBuyStatus == 1){
        const targetDate = this.endTime
        const currentDate = new Date().getTime();
        this.timeDifference = targetDate - currentDate;
      }else if(this.groupBuyStatus == 3){
        const targetDate = this.statTime
        const currentDate = new Date().getTime();
        this.timeDifference = targetDate - currentDate;
      }
      this.days = Math.floor((this.timeDifference / (1000 * 60 * 60 * 24)))
      const newhours = Math.floor((this.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.timeDifference % (1000 * 60)) / 1000);
      this.hours = this.days*24 + newhours

      // Function to pad zeros to the left for two-digit formatting
      const padZero = (num) => (num < 10 ? '0' + num : num);

      // Format hours, minutes, and seconds with two digits
      this.hours = padZero(this.days * 24 + newhours);
      this.minutes = padZero(this.minutes);
      this.seconds = padZero(this.seconds);
    }
  },
  computed: {
    persentage(){
      if(this.sellCount !==0){
        return Math.floor((this.sellCount / this.prodCount) * 100);
      }else{
        return 0
      }

    },
    productLink(){
      return slugifyUrl(this.productName, this.productId);
    },
    formattedPrice() {
        return this.price.toLocaleString(); // Add commas to the price
    },
    fromattedPrevPrice(){
        return this.actualPrice.toLocaleString();
    },
    participantNo() {
      return (this.prodCount - this.sellCount)
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/assets/layout/styles/__variables.sass"
.item-card-main-container
  max-width: 14rem
  height: 21.8rem
  display: block
  flex-direction: column
  justify-content: flex-start
  &:hover
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px
  @media (max-width: 500px)
    max-width: 24rem
    height: 9.8rem
.product-discription-top
  margin: 0.5rem

.product-name
  color: #1D1D1F
  max-width: 13rem
  padding: 0.3rem
  text-align: left
  font-weight: 600
  display: -webkit-box
  display: block
  overflow: hidden
  text-overflow: ellipsis
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  height: 2.79rem
  line-height: 1.125rem
  font-size: 0.975rem
.progress-bar-container
  margin-top: 0.5rem
  max-width: 13rem
  background-color: rgba(213, 5, 103, 0.10)
  height: 0.8rem
  border-radius: 5rem
.progress
  height: 100%
  background: linear-gradient(90deg, #F97C7C 0.01%, #D50567 100%)
  position: relative
  border-radius: 5rem
  text-align: center
  color: #fff
  font-size: 0.7rem
  padding-top: 0.1rem
  @media (max-width: 500px)
    font-size: 0.6rem
.product-discription-bottom
  margin-top: 0.5rem
  display: flex
  flex-direction: row
  margin-bottom: 0.6rem
  justify-content: space-between
.left-section
  margin-left: 0.3rem
.price-section
   margin-bottom: 0.3rem
.price
  color: #EE6969
  font-size: 1.5rem
  font-weight: 600
  letter-spacing: 0.03px
.rate
  color: #4F4F4F
  font-size: 0.7rem
  font-weight: 400
  margin-left: 0.2rem
  margin-right: 0.4rem
  margin-top: 0.2rem
.actual-price
  color: rgba(39, 39, 39, 0.51)
  font-size:0.8rem
  font-style: italic
  font-weight: 400
  letter-spacing: 0.014px
  margin-top: 0.2rem
  marging-left: 0.3rem
  text-decoration: line-through
.rate-section
  display: flex
.right-section
  width: 6.938rem
  height: 59.032px
  background: #D50567
  border-radius: 28px 0px 2.512px 0px
  box-shadow: 0px 0px 5.32304px 0px rgba(0, 0, 0, 0.10)
.date-countdown-container
   display: flex
   justify-content: space-evenly
   align-items: center
   padding-top: 0.9rem
   padding-left: 0.4rem
   padding-right: 0.4rem
.date-block
  width: 1.9rem
  height: 1.9rem
  background: #AD0556
  text-align: center
  border-radius: 0.43rem
  color: #FFF
  padding-top: 0.4rem
.separater
  color: #FFF
.day-count
  font-weight: 600
.day-label
  margin-top: 0.5rem
  font-size: 0.6rem
.right-section-inprogress
  width: 6.938rem
  height: 59.032px
  background: #F7E2EC
  border-radius: 28px 0px 2.512px 0px
  box-shadow: 0px 0px 5.32304px 0px rgba(0, 0, 0, 0.10)
.day-label1
  margin-top: 0.5rem
  font-size: 0.6rem
  color: #AD0556
.image-container
   height: 12rem
   @media (max-width: 500px)
      height: 9.8rem
      width: 10rem
.completed
  font-size: 0.7rem
  color: #F31260
  margin-left: 9.5rem
.participant
  font-size: 0.7rem
  margin-left: 4rem
.card-main-container
  @media (max-width: 500px)
    display: flex

</style>