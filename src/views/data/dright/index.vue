<template>
  <div class="right-content">
    <div class="top-box">
      <databox :title="''" :dheight="810">
        <databox
          :title="$t('data.dright.number')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="edm">
          <ve-histogram
            :data="chart01Data"
            :extend="chartExtend01"
          ></ve-histogram>
        </template>
        <div class="edm" v-else>
          <p>没有EDM加工数量数据</p>
        </div>
        <databox
          :title="$t('data.dright.accountStars')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="EDM">
          <ve-line
            :data="chartData"
            :settings="chartSettings"
            :extend="chartExtend"
          ></ve-line>
        </template>
        <div class="edm" v-else>
          <p>没有EDM稼动率数据</p>
        </div>
      </databox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    edmDynamic: Array
  },
  data() {
    this.chartSettings = {
      yAxisType: ["percent"],
      yAxisName: ["稼动率"]
    };
    this.chartExtend01 = {
      legend: {
        right: 20,
        textStyle: {
          color: "#ffffff",
          fontSize: 16
        },
        data: {
          name: "稼动率"
        }
      },
      xAxis: {
        axisLabel: {
          color: "#ffffff"
        }
      },
      yAxis: {
        axisLabel: {
          color: "#ffffff"
        },
        nameTextStyle: {
          color: "#ffffff"
        }
      },
      series: {
        label: { show: true, position: "top" }
      }
    };
    this.chartExtend = {
      legend: {
        right: 20,
        textStyle: {
          color: "#ffffff",
          fontSize: 16
        },
        data: {
          name: "稼动率"
        }
      },
      xAxis: {
        axisLabel: {
          color: "#ffffff"
        }
      },
      yAxis: {
        axisLabel: {
          color: "#ffffff"
        },
        nameTextStyle: {
          color: "#ffffff"
        }
      }
    };
    return {
      edm:true,
      EDM:true,
      timeInterval: null,
      chartData: {
        columns: ["EquipmentId", "Activation"],
        rows: []
      },
      chart01Data: {
        columns: ["EquipmentId", "Quantity"],
        rows: []
      }
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      if (this.edmDynamic.length >0) {
        console.log(55555);
        this.chartData.rows = this.edmDynamic;
        this.chart01Data.rows = this.edmDynamic;
      } else {
        console.log(3333);
        this.EDM = false;
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.right-content {
  width: 100%;
  height: 100%;

  .top-box {
    padding-bottom: 40px;

    .right {
      width: 40%;
      margin: 30px auto;
      background: rgba(35, 72, 135, 0.4);
      border-radius: 10px;
    }
  }
}
.edm{
  width: 100%;
  height: 35%;
  text-align: center;
  color: white;
  p {
    margin-top:30%;
  }
}
.number {
  text-indent: 20px;
}
</style>
