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
          <ve-pie :data="chart01Data" :settings="chartSetting" :extend="chartExtend01"></ve-pie>
        </template>
        <databox
          :title="$t('data.dleft.accountStars')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <template>
          <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend"></ve-line>
        </template>
      </databox>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
        },
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
  mounted(){
    this.timeInterval = setInterval(() => {
      this.getData()
    }, 300000)
  },
  methods: {
    getData() {
      this.$axios
        .get("/api/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            let data = res.data;
            console.log(res.data);
            this.chartData.rows = data.data.cmmDynamics;
            this.chart01Data.rows = data.data.cmmQualities;
          }
          return;
        })
        .catch(err => {
          this.pageShow = false;
          this.isShow = true;
          console.log(err.message);
        });
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
