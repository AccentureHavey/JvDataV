<template>
  <div class="right-content">
    <div class="top-box">
      <databox :title="''" :dheight="780">
        <div class="right">
          <dnumber
            :dheight="110"
            :title="$t('data.dright.pubRepos')"
            :dnumber="edmQualities.EDMQuantity"
            :icon="'kucunguanli'"
            :color="'#ffff43'"
          >
          </dnumber>
        </div>
        <databox
          :title="testData.name"
          :dheight="20"
          :icon="'account'"
          :boxb="false"
        >
        </databox>
        <ve-gauge :data="chartData" :settings="chartSettings" :height="'600px'"> </ve-gauge>
      </databox>
    </div>
  </div>
</template>

<script>
import dnumber from "./dnumber";
export default {
  components: { dnumber },
  props: {
    edmQualities: Object
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
        rows: []
      },
      testData: {
        name: ""
      }
    };
  },
  created() {
    this.getData();
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
            this.edmDynamic = data.data.edmDynamic;
            let data2 = data.data.edmDynamic;
            data2.forEach(function(valus) {
              let cmm = (valus.Activation * 100).toFixed(1);
              let cnn = valus.EquipmentId;
              let ccc = {
                type: "速度",
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
.number{
  text-indent: 20px;
}
</style>
