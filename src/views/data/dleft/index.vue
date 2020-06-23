<template>
  <div class="left-content">
    <div class="left-box">
      <databox :title="''" :dheight="810">
        <databox
          :title="$t('data.dleft.accountLeng')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="cmm">
          <ve-pie
            :data="chart01Data"
            :settings="chartSetting"
            :extend="chartExtend01"
          ></ve-pie>
        </template>
        <div class="cmm" v-else>
          <p>没有CMM合格率数据</p>
        </div>
        <databox
          :title="$t('data.dleft.accountStars')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="CMM">
          <ve-histogram :data="chartData" :extend="chartExtend"></ve-histogram>
        </template>
        <div class="cmm" v-else>
          <p>没有CMM稼动率数据</p>
        </div>
      </databox>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    cmmDynamics: Array,
    cmmQualities: Array
  },
  data() {
    this.chartSettings = {
      yAxisType: ["percent"],
      yAxisName: ["稼动率"]
    };
    this.chartSetting = {
      dimension: "Quality",
      metrics: "Quantity"
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
      },
      series: {
        label: { show: true, position: "top" }
      }
    };
    this.chartExtend01 = {
      legend: {
        right: 20,
        textStyle: {
          color: "#ffffff",
          fontSize: 16
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
        label: {
          formatter: "{b}({d}%)"
        }
      }
    };
    return {
      cmm: true,
      CMM: true,
      timeInterval: null,
      chartData: {
        columns: ["EquipmentId", "Activation"],
        rows: []
      },
      chart01Data: {
        columns: ["Quality", "Quantity"],
        rows: []
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.cmmDynamics.length > 0) {
        this.chartData.rows = this.cmmDynamics;
      } else {
        this.CMM = false;
      }
      if (this.cmmQualities.length > 0) {
        this.chart01Data.rows = this.cmmQualities;
      } else {
        this.cmm = false;
      }
    }
  }
};
</script>

<style lang="scss">
.left-content {
  width: 100%;
  height: 100%;

  .left-box {
    width: 100%;
    height: 810px;

    .middle {
      width: 40%;
      margin: 30px auto;
      background: rgba(35, 72, 135, 0.4);
      border-radius: 10px;
    }

    .content-wapper {
      padding-top: 40px;
      height: 220px;
    }
  }
}
.cmm {
  width: 100%;
  height: 35%;
  text-align: center;
  color: white;
  p {
    margin-top: 30%;
  }
}
</style>
