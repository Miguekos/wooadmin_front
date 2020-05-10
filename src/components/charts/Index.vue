<template>
  <div class="echarts q-gutter-sm">
      <IEcharts
        :option="cahp"
        :loading="loading"
        @ready="onReady"
        @click="onClick"
      />
<!--    <div class="col-12">-->
<!--      <IEcharts-->
<!--        :option="bar"-->
<!--        :loading="loading"-->
<!--        @ready="onReady"-->
<!--        @click="onClick"-->
<!--      />-->
<!--    </div>-->
    <!--    <button @click="doRandom">Random</button>-->
  </div>
</template>

<script type="text/babel">
import IEcharts from "vue-echarts-v3/src/full.js";
export default {
  name: "view",
  components: {
    IEcharts
  },
  props: {},
  data: () => ({
    loading: true,
    bar: {
      title: {
        text: ""
      },
      tooltip: {},
      xAxis: {
        data: [
          "Shirt",
          "Sweater",
          "Chiffon Shirt",
          "Pants",
          "High Heels",
          "Socks"
        ]
      },
      yAxis: {},
      series: [
        {
          name: "Sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    },
    cahp: {
      aria: {
        show: true
      },
      title: {
        text: "",
        x: "center"
      },
      series: [
        {
          Name: "access source",
          type: "pie",
          data: [
            { value: 335, name: "direct access" },
            { value: 310, name: "mail marketing" },
            { value: 234, name: "union ad" },
            { value: 135, name: "video ad" },
            { value: 1548, name: "search engine" }
          ]
        }
      ]
    }
  }),
  methods: {
    doRandom() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.loading = !that.loading;
      that.bar.series[0].data = data;
    },
    onReady(instance, ECharts) {
      console.log(instance, ECharts);
    },
    onClick(event, instance, ECharts) {
      console.log(arguments);
    }
  },
  created() {
    this.doRandom();
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>
