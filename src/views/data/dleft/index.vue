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
        <template>
          <ve-pie
            :data="chart01Data"
            :settings="chartSetting"
            :extend="chartExtend01"
          ></ve-pie>
        </template>
        <databox
          :title="$t('data.dleft.accountStars')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template>
          <ve-line
            :data="chartData"
            :settings="chartSettings"
            :extend="chartExtend"
          ></ve-line>
        </template>
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
      series:{
        label:{
          formatter:'{b}({d}%)'
        }
      }
    };
    return {
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
      this.chartData.rows = this.cmmDynamics;
      this.chart01Data.rows = this.cmmQualities;
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
</style>
