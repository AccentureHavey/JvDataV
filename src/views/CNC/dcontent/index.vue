<template>
  <div class="content">
    <div class="content-box">
      <div class="nav-cnc">
        <div class="image-item-all" v-for="item in img" :key="item.id">
          <databox :title="''" :dheight="200">
            <div class="title">
              <div class="title-item icon">
                <img :src="item.url" alt="" />
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
                <el-slider
                  v-model="item.Activation"
                  vertical
                  height="90px"
                >
                </el-slider>
              </div>
            </div>

            <p>{{ item.PoleInfo }}</p>
          </databox>
        </div>
      </div>
      <div class="cnc-chart">
        <template>
          <ve-histogram
            :data="chart01Data"
            :extend="chartExtend01"
            height="310px"
          ></ve-histogram>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
      url: "",
      img: [
        { src: require("../../../assets/image/img/CNC01.png") },
        { src: require("../../../assets/image/img/CNC02.png") },
        { src: require("../../../assets/image/img/CNC03.png") },
        { src: require("../../../assets/image/img/CNC04.png") },
        { src: require("../../../assets/image/img/CNC05.png") },
        { src: require("../../../assets/image/img/CNC06.png") },
        { src: require("../../../assets/image/img/CNC07.png") }
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
    this.timeInterval = setInterval(() => {
      this.getData();
    }, 180000);
  },
  methods: {
    async getData() {
      await this.$axios(this.baseURL + "/api/GetCNCMachineState").then(data => {
        console.log(data);
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
      this.$axios(this.baseURL + "/api/CNCDynamic").then(data => {
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
.nav-cnc {
  display: flex;
  .image-item-all {
    width: 16%;
    height: 190px;
    color: white;
    margin: 5px 3px;
    p {
      font-size: 10px !important;
      text-indent: 1em;
    }
  }
}

.title {
  margin: 10px 0px;
  font-size: 0;
  .title-item {
    display: inline-block !important;
    vertical-align: middle;
    width: 30%;
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
