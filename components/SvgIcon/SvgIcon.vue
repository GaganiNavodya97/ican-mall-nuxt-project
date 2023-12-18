<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="realWidth" :height="realHeight" :viewBox="viewBoxProcessed" :aria-labelledby="iconName">
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g :fill="iconColor">
      <image :href="svgContent" :height="realHeight" :width="realWidth" />
    </g>
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    iconName: { type: String, default: ''},
    width: { type: [Number, String], default: 18 },
    height: {type: [Number, String], default: 18 },
    iconColor: {type: String, default: '#000'},
    icon: {type: String, default: ""},
  },
  data(){ return { htmlFontSize:null, realWidth:null, realHeight: null } },
  created() {
    this.htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    this.realWidth = this.getValue(this.width)
    this.realHeight = this.getValue(this.height)
  },
  methods:{
    getValue(value){
      if(typeof value === 'string'){
        return this.htmlFontSize * Number(value)
      }else{
        return value
      }
    }
  },
  computed:{
    svgContent(){
      return this.icon;
    },
    viewBoxProcessed(){
      if (typeof this.width === "string" && typeof this.height === "string") {
        let width = Number(this.width) * this.htmlFontSize
        let height = Number(this.width) * this.htmlFontSize
        return "0 0 "+ width + " " + height
      } else {
        return "0 0 "+ this.width + " " + this.height
      }
    }
  }
}
</script>
