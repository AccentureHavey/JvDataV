<template>
  <div class="content">
    <div class="content-box">
      <databox :title="''" :dheight="810">
        <databox
          :title="$t('data.myevent.number')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="att">
          <ve-histogram
            :data="chart01Data"
            :extend="chartExtend01"
          ></ve-histogram>
        </template>
          <div class="cnc" v-else>
            <p>没有CNC加工数量数据</p>
          </div>


        <databox
          :title="$t('data.myevent.accountStars')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template v-if="trr">
          <ve-line
            :data="chartData"
            :settings="chartSettings"
            :extend="chartExtend"
          ></ve-line>
        </template>
        <div class="cnc" v-else>
          <p>没有CNC稼动率数据</p>
        </div>
      </databox>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    cncDynamics: Array
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
      timeInterval: null,
      att: true,
      trr:true,
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
      if (this.cncDynamics.length > 0) {
        console.log(777);
        this.chartData.rows = this.cncDynamics;
        this.chart01Data.rows = this.cncDynamics;
      } else {
        this.trr = false;
      }
    }
  },
  watch: {
    username(username) {
      if (username) {
        this.getData(username);
      }
    }
  }
};
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
.content {
  width: 100%;
  height: 100%;
  .content-box {
    width: 100%;
    height: 810px;
  }
}
.cnc{
  width: 100%;
  height: 35%;
  text-align: center;
  color: white;
  p {
    margin-top:30%;
  }
}

.number {
  text-indent: 14px;
}
</style>
