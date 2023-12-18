<template>
  <div class="container">
    <img :src="icon" alt="Empty Page" class="Gif"/>
    <div class="text">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
    };
  },
  props: {
    icon:{type: String, default: ""},
    message: {type:String, default:'Sorry Content is Empty'}
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
@import "@/assets/layout/styles/__variables.sass"

.container
  width: 100%
  height:15rem
  display: block
  justify-content: center
  align-items: center
  text-align: center
  margin: 1rem
  @media (max-width: 900px)
     height:25rem
  @media (max-width: 500px)
     height:20rem

.Gif
  width: 7rem
  height: 7rem

.text
  color: #828282
  margin-top: 0.6rem
</style>