<template>
  <div class="content">
    <div class="content-box">
      <databox :title="''" :dheight="720">
        <div class="left">
          <dnumber
            :dheight="110"
            :title="$t('data.myevent.pubRepos')"
            :size="'4rem'"
            :dnumber="numberData.pubRepos"
            :icon="'kucunguanli'"
            :color="'#ffff43'"
          >
          </dnumber>
        </div>
        <databox
          :title="$t('data.dright.message')"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >

        </databox>
        <ve-gauge :data="chartData" :settings="chartSettings"> </ve-gauge>
      </databox>
    </div>
  </div>
</template>

<script>
import dnumber from "./dnumber";
export default {
  components: {
    dnumber
  },
  props: {
    numberData: Object
  },
  data() {
    this.chartSettings = {
      dataName: {
        速度: "%"
      },
      seriesMap: {
        速度: {
          min: 0,
          max: 100,
          splitNumber: 10,
          radius: "50%",
          axisLine: {
            // 坐标轴线
            lineStyle: {
              color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
              width: 3,
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bolder",
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: "auto",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          splitLine: {
            length: 25,
            lineStyle: {
              width: 3,
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          pointer: {
            shadowColor: "#fff",
            shadowBlur: 5
          },
          title: {
            textStyle: {
              fontWeight: "bolder",
              fontSize: 30,
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: "rgba(30,144,255,0.8)",
            borderWidth: 1,
            borderColor: "#fff",
            shadowColor: "#fff",
            shadowBlur: 5,
            offsetCenter: [0, "50%"],
            textStyle: {
              color: "#fff"
            }
          }
        }
      }
    };
    return {
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "速度", value: 60 }]
      }
    };
  },
  created() {},
  methods: {},
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
    height: 720px;
    padding-bottom: 40px;
    .left {
      width: 40%;
      margin: 30px auto;
      background: rgba(35, 72, 135, 0.4);
      border-radius: 10px;

    }
    databox{
      margin: 0 auto;
    }
  }
}
</style>
