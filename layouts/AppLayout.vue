<template>
  <div>
    <app-header></app-header>
    <div class="spacer"></div>
    <router-view class="body-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/layouts/AppHeader";
import AppFooter from "@/layouts/AppFooter";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/layout/styles/__variables.sass"
.spacer
  height: $nav-bar-height
.body-view
  position: relative
  left: 0
</style>
