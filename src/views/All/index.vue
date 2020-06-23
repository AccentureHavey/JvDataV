<template>
  <div class="All-data-page">
    <!--  <dheader></dheader>-->
    <topnav></topnav>
    <div class="data-content-all">
      <div class="data-main-all">
        <div class="main-center1-all">
          <dcontent></dcontent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dheader from "./dheader";
import dcontent from "./dcontent";

export default {
  components: {
    dheader,
    dcontent
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.All-data-page {
  background: #121e34 url(../../assets/data/true.png) repeat-x;
  top: 0;
  right: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 125px;
  .data-content-all {
    height: 80%;
    .data-main-all {
      width: calc(100% - 40px);
      margin-bottom: 40px;
      margin-left: 20px;
      height: 80%;
      .main-center1-all {
        width: 100%;
        height: 80%;
      }
    }
  }
}
</style>
