<template>
  <div class="image-container ">
    <va-image
      fit="cover"
      class="ads-image"
      :src="poster"
      :ratio="14 / 5"
    />
  </div>
</template>

<script>
export default {
  name: "AdsImage",
  data() {
    return {};
  },
  props: {
    poster: {type:String, default: ""}
  },
};
</script>

<style scoped lang="sass">
.image-container
  width: 100%
  border-radius: 0.313rem
  height: 14.75rem
  padding: 0rem 1rem 1rem 1rem
  align-items: center
  max-height: 18.75rem
  @media (max-width: 850px)
      height: 19rem
      justify-content: center
  


.ads-image
  flex: 0 0 600px
  height: 100% !important
 
</style>