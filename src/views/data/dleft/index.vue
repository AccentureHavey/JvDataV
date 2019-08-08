<template>
  <div class="left-content">
    <div class="left-box">
      <databox :title="''" :dheight="780">
        <!-- <personal :personalData="personalData" :username="username"></personal> -->
        <div class="top-box">
          <div class="left">
        <dnumber
          :dheight="115"
          :title="$t('data.myevent.pubRepos')"
          :size="'4rem'"
          :dnumber="120"
          :icon="'kucunguanli'"
          :color="'#ffff43'"
        >
        </dnumber>
        </div>

        <div class="middle">
        <dnumber
          :dheight="115"
          :title="$t('data.myevent.pubRepos')"
          :size="'4rem'"
          :dnumber="120"
          :icon="'kucunguanli'"
          :color="'#ffff43'"
        >
        </dnumber>
        </div>
                <div class="right">
        <dnumber
          :dheight="115"
          :title="$t('data.myevent.pubRepos')"
          :size="'4rem'"
          :dnumber="120"
          :icon="'kucunguanli'"
          :color="'#ffff43'"
        >
        </dnumber>
        </div>

        </div>

        <databox
          :title="$t('data.dleft.accountStars')"
          :dheight="300"
          :icon="'account'"
          :boxb="false"
        >
          <!-- <ve-pie :data="starData" :extend="extend" :height="'250px'"></ve-pie> -->
        <ve-gauge :data="chartData" :settings="chartSettings" :height="'300px'"></ve-gauge>
        </databox>
        <databox
          :title="$t('data.dleft.accountLeng')"
          :dheight="280"
          :icon="'account'"
          :boxb="false"
        >
          <!-- <ve-ring
            :data="languageData"
            :extend="extend"
            :height="'230px'"
          ></ve-ring> -->
        <ve-gauge :data="chartData" :settings="chartSettings" :height="'300px'"></ve-gauge>
        </databox>
      </databox>
    </div>
  </div>
</template>

<script>
import personal from "./personal";
import dnumber from "../dcontent/dnumber";
export default {
  components: {
    personal,
    dnumber
  },
  props: {
    personalData: Object,
    username: String
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
          '稼动率': '%'
        },
        seriesMap: {
          '稼动率': {
            min:0,
            max:100,
            splitNumber:10,
            radius: '80%',
            axisLine: {
              lineStyle: {
                color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                width: 2,
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisLabel: {
              textStyle: {
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            axisTick: {
              length:15,
              lineStyle: {
                color: 'auto',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            splitLine: {
              length:25,
              lineStyle: {
                width:3,
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            pointer: {
              shadowColor: '#fff',
              shadowBlur: 5
            },
            title: {
              textStyle: {
                fontWeight: 'bolder',
                fontSize: 20,
                fontStyle: 'italic',
                color: '#fff',
                shadowColor: '#fff',
                shadowBlur: 10
              }
            },
            detail: {
              backgroundColor: 'rgba(30,144,255,0.8)',
              borderWidth: 1,
              borderColor: '#fff',
              shadowColor: '#fff',
              shadowBlur: 5,
              offsetCenter: [0, '50%'],
              textStyle: {
                fontWeight: 'bolder',
                color: '#fff'
              }
            }
          }
        }
      };
    return {
      personalD: {},
      starData: {
        columns: ["reposName", "getStars"],
        rows: []
      },
      noStarData: false,
      languageData: {
        columns: ["lang", "number"],
        rows: []
      },
      nolanguageData: false,
      chartData: {
          columns: ['type', 'value'],
          rows: [
            { type: '稼动率', value: 50.8 }
          ]
        }
    };
  },
  created() {},
  methods: {
    getData(username) {
      this.$axios
        .get("/api/users/" + username + "/repos")
        .then(response => {
          let data = JSON.parse(JSON.stringify(response.data));
          if (data.length < 1) {
            this.noStarData = true;
          } else {
            let rowdata = [];
            let languages = {};
            for (var i = 0; i < data.length; i++) {
              // 仓库和仓库star
              let reposName = data[i].name;
              let getStars = data[i].stargazers_count;
              let obj = {
                reposName: reposName,
                getStars: getStars
              };
              rowdata.push(obj);

              //梳理语言，计算语言类型和各个语言的数量
              let langData = data[i].language;
              if (langData) {
                if (langData in languages) {
                  languages[langData]++;
                } else {
                  languages[langData] = 1;
                }
              }
            }
            //把值附到starData.rows
            this.starData.rows = rowdata;
            //console.log(this.starData.rows)

            //重新组装语言封成对象
            let objL = JSON.parse(JSON.stringify(languages));
            let dataL = [];
            for (var key in objL) {
              dataL.push({ lang: key, number: objL[key] });
            }
            this.languageData.rows = dataL;
            //console.log(objL)
            //console.log(this.languageData.rows)
          }
          return;
        })
        .catch(err => {
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
    height: 900px;
    padding-bottom: 40px;
    .top-box {
    display: flex;
    width: 100%;
    height: 110px;
    overflow: hidden;
     .left {
      width: 30%;
      background: rgba(35, 72, 135, 0.4);
    }
    .middle {
      padding-left: 15px;
      width: 30%;
      background: rgba(35, 72, 135, 0.4);
    }
    .right {
      padding-left: 15px;
      width: 30%;
      background: rgba(35, 72, 135, 0.4);
    }

    }

    .content-wapper {
      padding-top: 40px;
      height: 220px;
    }
  }
}

</style>
