<template>
  <div class="left-content">
    <div class="left-box">
      <databox :title="''" :dheight="780">
        <div class="top-box">
          <div class="middle">
            <dnumber
              :dheight="110"
              :title="$t('data.dleft.pubRepos')"
              :size="'4rem'"
              text-align="center"
              :dnumber="cmmQualities.Quantity"
              :icon="'kucunguanli'"
              :color="'#ffff43'"
            >
            </dnumber>
          </div>
        </div>

        <databox
          :title="testData.name"
          :dheight="300"
          :icon="'account'"
          :boxb="false"
        >
          <ve-gauge
            :data="chartData"
            :settings="chartSettings"
            :height="'300px'"
          ></ve-gauge>
        </databox>
        <databox
          :title="$t('data.dleft.accountLeng')"
          :dheight="280"
          :icon="'account'"
          :boxb="false"
        >
          <ve-gauge
            :data="chartData"
            :settings="chartSettings"
            :height="'300px'"
          ></ve-gauge>
        </databox>
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
    cmmQualities: Object
  },
  data() {
    this.extend = {
      legend: {
        textStyle: { color: "#fff" }
      },
      grid: {
        textStyle: {
          color: "#fff"
        }
      },
      series: {
        radius: ["0", "40%"],
        center: ["50%", "50%"]
      }
    };
    this.chartSettings = {
      dataName: {
        稼动率: "%"
      },
      seriesMap: {
        稼动率: {
          min: 0,
          max: 100,
          splitNumber: 10,
          radius: "80%",
          axisLine: {
            lineStyle: {
              color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
              width: 2,
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
              fontSize: 20,
              fontStyle: "italic",
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
              fontWeight: "bolder",
              color: "#fff"
            }
          }
        }
      }
    };
    return {
      personalD: {},
      testData: {
        name: ""
      },
      noStarData: false,
      nolanguageData: false,
      chartData: {
        columns: ["type", "value"],
        rows: []
      }
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios
        .get("http://192.168.1.22:8081/api/data")
        .then(response => {
          let res = JSON.parse(JSON.stringify(response));
          if (res.status === 200) {
            /*            this.username = username;*/
            let data = res.data;
            let dataR = [];
            this.cmmDynamics = data.data.cmmDynamics;
            let data2 = data.data.cmmDynamics;
            data2.forEach(function(valus) {
              let cmm = (valus.Activation * 100).toFixed(1);
              let cnn = valus.EquipmentId;
              let ccc = {
                type: "稼动率",
                value: cmm,
                name: cnn+"稼动率"
              };
              dataR.push(ccc);
            });
            var i = 0;
            setInterval(() => {
              if (i < dataR.length) {
                this.testData.name = dataR[i].name;
                let test = [];
                test.push(dataR[i]);
                console.log(88888);
                console.log(this.testData.name);

                this.chartData.rows = test;
                console.log(99999);
                console.log(this.chartData.rows);
                i = i + 1;
              } else {
                i = 0;
              }
            }, 2500);
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
    height: 780px;
    padding-bottom: 40px;

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
