<template>
  <div class="data-page">
    <dheader></dheader>
    <topnav></topnav>
    <div class="data-content">
      <!-- <div class="data-time">
        {{ $t("data.index") }}
      </div> -->
      <div class="data-main">
        <div class="main-left">
          <dleft :cmmDynamic="cmmDynamic" :cmmQualities="cmmQualities"></dleft>
        </div>
        <div class="main-center">
          <dcontent :cncDynamic="cncDynamic" :cncQuantity="cncQuantity"></dcontent>
        </div>
        <div class="main-right">
          <dright :edmDynamic="edmDynamic" :edmQuantity="edmQuantity"></dright>
        </div>
      </div>
    </div>
    <nouser :isShow="isShow" v-if="isShow"></nouser>
    <loading v-if="pageShow"></loading>
  </div>
</template>

<script>
import dheader from "./dheader";
import dleft from "./dleft";
import dcontent from "./dcontent";
import dright from "./dright";
export default {
  components: {
    dheader,
    dleft,
    dcontent,
    dright
  },
  data() {
    return {
      isShow: false,
      pageShow: true,
      personalData: {},
      numberData: {},
      username: "",
      cmmDynamic: {},
      cmmQualities: {},
      cncDynamic: {},
      cncQuantity: {},
      edmDynamic: {},
      edmQuantity: {}
    };
  },
  created() {
  //  let username = this.$route.params.user;
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("http://192.168.1.22:8081/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            let data = res.data;
            this.cmmDynamic = data.cmmDynamics;
            this.cmmQualities = data.cmmQualities;
            this.cncDynamic = data.cncDynamics;
            this.cncQuantity = data.cncQuantity;
            this.edmDynamic = data.edmDynamic;
            this.edmQuantity = data.edmQuantities;
          }
          return;
        })
        .catch(err => {
          this.pageShow = false;
          this.isShow = true;
          console.log(err.message);
        });
    }
  }
};
</script>

<style lang="scss">
.data-page {
  background: url(../../assets/data/true.png) repeat-x;
  top: 0;
  right: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  min-width: 1220px;
  .data-content {
    padding-bottom: 20px;
    .data-time {
      width: 340px;
      height: 35px;
      background-color: #2c58a6;
      line-height: 35px;
      color: #fff;
      font-size: 12.8px;
      margin-bottom: 25px;
      margin-left: 20px;
      text-align: center;
    }
    .data-main {
      width: calc(100% - 40px);
      margin-bottom: 40px;
      margin-left: 20px;
      height: 720px;

      .main-left {
        width: 33%;
        float: left;
      }
      .main-center {
        float: left;
        width: 33%;
        padding: 0 20px 0 20px;
      }
      .main-right {
        float: left;
        width: 33%;
        height: 615px;
      }
    }
  }
}
</style>
