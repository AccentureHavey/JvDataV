<template>
  <div class="data-page">
    <dheader></dheader>
    <topnav></topnav>
    <div class="data-content">
      <div class="data-main">
        <div class="main-left">
          <dleft
            v-if="flag"
            :cmmDynamics="cmmDynamics"
            :cmmQualities="cmmQualities"
          ></dleft>
        </div>
        <div class="main-center">
          <dcontent
            v-if="flag"
            :cncDynamics="cncDynamics"
            :cncQuatity="cncQuatity"
          ></dcontent>
        </div>
        <div class="main-right">
          <dright
            v-if="flag"
            :edmDynamic="edmDynamic"
            :edmQualities="edmQualities"
          ></dright>
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
      cmmDynamics: [],
      cmmQualities: [],
      cncDynamics: [],
      cncQuatity: [],
      edmDynamic: [],
      edmQualities: [],
      timeInterval: null,
      flag: false
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    /*    this.timeInterval = setInterval(() => {
      this.getData();
    }, 300000);*/
  },
  methods: {
    getData() {
      this.$axios
        .get("/api/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            let data = res.data;
            console.log(898989);
            console.log(res.data.cmmDynamics)
            console.log(data.data.cmmDynamics);
            this.cmmDynamics = data.data.cmmDynamics;
            console.log(88888);
            console.log(this.cmmDynamics);
            this.cmmQualities = data.data.cmmQualities;
            this.cncDynamics = data.data.cncDynamics;
            this.cncQuatity = data.data.cncQuatity;
            this.edmDynamic = data.data.edmDynamic;
            this.edmQualities = data.data.edmQualities;
            this.flag = true;
            this.pageShow = false;
          }
          return;
        })
        .catch(err => {
          console.log(111);
          this.pageShow = false;
          this.isShow = true;
          console.log(err.message);
        });
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.data-page {
  background: #121e34 url(../../assets/data/true.png) repeat-x;
  top: 0;
  right: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  min-width: 1220px;
  .data-content {
    padding-bottom: 80px;
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
      height: 810px;

      .main-left {
        width: 33%;
        float: left;
      }
      .main-center {
        float: left;
        width: 34%;
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
