<template>
  <div style="height: 650px;">
    <div class="rightullidiv">
      <template>
        <img :src="imgUrl" alt=""  class="rightulliimg">
      </template>
    </div>
    <keep-alive>
      <el-row :gutter="20" type="flex">
        <el-col :span="12">
          <el-card class="chart-card" shadow="hover">
            <!-- 访问人数报表 -->
            <div id="visitedNum" style="width: 700px;height:500px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </keep-alive>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "HomePage",
  data(){
    return{
      imgUrl:require("../assets/user_login_bg.jpg"),
    }
  },
  mounted() {
    console.log(echarts);
    this.drawVisitedNum();
  },
  methods: {
    drawVisitedNum() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visitedNum"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "近七日访问人数"
        },
        tooltip: {},
        legend: {
          data: ["访问人数"]
        },
        xAxis: {
          type: 'category',
          data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: "访问人数",
            type: "line",
            data: [5, 20, 36, 10, 10, 20, 56]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  }
}
</script>

<style >
.rightullidiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightulliimg {
  max-width: 100%;
  max-height: 200px;
}
</style>