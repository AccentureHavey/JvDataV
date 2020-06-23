<template>
  <div class="cnc-data-page">
    <dheader></dheader>
    <topnav></topnav>
    <div class="data-content-cnc">
      <div class="data-main-cnc">
        <div class="main-center1-cnc">
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
.cnc-data-page {
  background: #121e34 url(../../assets/data/true.png) repeat-x;
  top: 0;
  right: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 35px;
  .data-content-cnc {
    height: 80%;
    .data-main-cnc {
      width: calc(100% - 40px);
      margin-bottom: 40px;
      margin-left: 20px;
      height: 80%;
      .main-center1-cnc {
        width: 100%;
        height: 80%;
      }
    }
  }
}
</style>
