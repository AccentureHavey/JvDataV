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
        <template>
          <ve-histogram
            :data="chart01Data"
            :extend="chartExtend"
          ></ve-histogram>
        </template>

        <databox
          :title="$t('data.myevent.accountStars')"
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
  props: {},
  data() {
    this.chartSettings = {
      yAxisType: ["percent"],
      yAxisName: ["稼动率"]
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
      chartData: {
        columns: ["EquipmentId", "Activation"],
        rows: []
      },
      chart01Data: {
        columns: ["CNCEquipment", "CNCQuantity"],
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
    }, 300000);
  },
  methods: {
    getData() {
      this.$axios
        .get("http://192.168.1.22:8081/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            let data = res.data;
            console.log(res.data);
            this.chartData.rows = data.data.cncDynamics;
            this.chart01Data.rows = data.data.cncQuatity;
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
.content {
  width: 100%;
  height: 100%;
  .content-box {
    width: 100%;
    height: 810px;
    padding-bottom: 40px;
    .left {
      width: 40%;
      margin: 30px auto;
      background: rgba(35, 72, 135, 0.4);
      border-radius: 10px;
    }
    .jdl {
      display: inline-block;
    }
  }
}
.number {
  text-indent: 14px;
}
</style>
