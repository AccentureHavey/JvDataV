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
        <template>
          <ve-histogram :data="chart01Data" :extend="chartExtend"></ve-histogram>
        </template>
        <databox
          :title="$t('data.dright.accountStars')"
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
  props: {
    edmQualities: Object
  },
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
        columns: ["EDMEquipment", "EDMQuantity"],
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
        .get("/api/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            let data = res.data;
            this.chartData.rows = data.data.edmDynamic;
            this.chart01Data.rows = data.data.edmQualities;
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
.number {
  text-indent: 20px;
}
</style>
