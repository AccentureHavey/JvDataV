<template>
  <div class="content">
    <div class="content-box">
      <div class="nav-edm">
        <div class="image-item-edm" v-for="item in img" :key="item.id">
          <databox :title="''" :dheight="240">
            <div class="title">
              <div class="title-item icon">
                <img :src="item.url" alt="" />
                <!--
                    <el-image :src="item.url" ></el-image>
  -->
              </div>
              <div class="title-item title1">
                <span style="text-align: center;font-size: 12px !important;">{{
                  item.EquipmentId
                }}</span>
              </div>
            </div>

            <div class="image">
              <div class="image-item img">
                <img :src="item.src" style="width:100%" alt="" />
              </div>
              <div class="image-item slider">
                <span>{{ item.Activation + "%" }}</span>
                <el-slider v-model="item.Activation" vertical height="90px">
                </el-slider>
              </div>
            </div>

            <p>{{ item.PoleInfo }}</p>
          </databox>
        </div>
      </div>
      <div class="edm-chart">
        <ve-histogram
          :data="chart01Data"
          :extend="chartExtend01"
          height="250px"
        ></ve-histogram>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      axisSite: { left: ["Activation"] },
      yAxisType: ["percent"]
    };
    this.chartExtend01 = {
      legend: {
        right: 20,
        textStyle: {
          color: "#ffffff",
          fontSize: 16
        },
        data: {
          name: "Activation"
        }
      },
      xAxis: {
        axisLabel: {
          color: "#ffffff"
        }
      },
      yAxis: {
        axisLabel: {
          color: "#ffffff",
          show: true,
          interval: "auto",
          formatter: "{value} %"
        },
        nameTextStyle: {
          color: "#ffffff"
        }
      },
      series: {
        label: { show: true, position: "top", formatter: "{c}%" }
      }
    };
    return {
      img: [
        { src: require("../../../assets/image/img/EDM01.png") },
        { src: require("../../../assets/image/img/EDM02.png") },
        { src: require("../../../assets/image/img/EDM03.png") },
        { src: require("../../../assets/image/img/EDM04.png") }
      ],
      chart01Data: {
        columns: ["EquipmentId", "Activation"],
        rows: []
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    window.setInterval(() => {
      setTimeout(this.getData(), 0);
    }, 180000);
  },
  methods: {
    getData() {
      this.$axios(this.baseURL + "/api/GetEDMMachineState").then(data => {
        console.log(data);
        console.log(data.data);
        let arr = data.data;
        var obj = this.img.map((item, index) => {
          return { ...item, ...arr[index] };
        });
        obj.forEach(item => {
          if (item.State === "运行") {
            item.url = require("../../../assets/image/icon/run.png");
          }
          if (item.State === "暂停") {
            item.url = require("../../../assets/image/icon/timeOut.png");
          }
          item.Activation = parseInt(item.Activation);
        });
        console.log(obj);
        this.img = obj;
      });
      this.$axios(this.baseURL + "/api/EDMDynamic").then(data => {
        console.log(data);
        this.chart01Data.rows = data.data;
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
.content {
  width: 100%;
  height: 100%;
  .content-box {
    width: 100%;
    height: 405px;
  }
}
.number {
  text-indent: 14px;
}
.nav-edm {
  display: flex;
  flex-wrap: wrap;
  .image-item-edm {
    width: 24%;
    color: white;
    margin: 7px 0 7px 8px;
    p {
      font-size: 12px !important;
      text-indent: 3em;
    }
  }
}

.title {
  font-size: 0;
  .title-item {
    display: inline-block !important;
    vertical-align: middle;
    text-align: center
  }
  .title1 {
    text-align: center !important;
  }
}
.image {
  margin-bottom: 10px;
  font-size: 0;
  .image-item {
    display: inline-block !important;
    vertical-align: middle;
  }
  .img {
    width: 80%;
  }
  .slider {
    span {
      font-size: 10px;
    }
    width: 19%;
  }
}
.all-chart {
  position: relative;
  top: -35px;
}
</style>
