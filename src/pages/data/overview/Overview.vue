<template>
  <div class="overview" flex>
    <Panel>
      <template slot="inner">
        <div style="height: 100%" flex="main:justify dir:top">
          <div class="title">联合奖惩</div>
          <div class="count-wrapper">
            <span class="square-bg">
              <i class="count-title">备忘录数量</i><br>
              <i class="num">{{ union.memoCount }}</i><i class="white-font">（个）</i>
            </span>
            <span class="square-bg">
              <i class="count-title">措施数量</i><br>
              <i class="num">{{ union.measureCount }}</i><i class="white-font">（个）</i>
            </span>
            <span class="square-bg">
              <i class="count-title">实施部门数量</i><br>
              <i class="num">{{ union.deptCount }}</i><i class="white-font">（个）</i>
            </span>
          </div>
          <chart ref="chart1" :options="returnPie(union.pieData)" style="width: 100%; height: 220px;display:block;"></chart>
          <div class="title" flex="main:justify">
            <span> 数据交换流向分析</span>
            <span class="handle-btn" flex>
              <i class="btn" :class="handleBtnTab === 0 ? 'active' : ''" @click="handleBtnTab = 0">本月</i>
              <i class="btn" :class="handleBtnTab === 1 ? 'active' : ''" @click="handleBtnTab = 1">本年</i>
              <b-date-picker type="date"
                             :open="dateOpen1"
                             :value="date1"
                             confirm
                             @on-change="handleChange1"
                             @on-clear="handleClear"
                             @on-ok="handleOk"
                             placeholder="Select date">
                <a style="display: block;width: 76px;" href="javascript:void(0)" @click="handleClick('dateOpen1')">
                  <template v-if="date1 === ''">选择日期</template>
                  <template v-else>{{ date1 }}</template>
                </a>
              </b-date-picker>
            </span>
          </div>
          <div class="count-wrapper nowrap" style="padding: 0 8px 20px">
            <span class="square-bg data-change">
              <img src="~@/assets/images/overview/icon_data.png" alt=""><br>
              <i>交换数据总量</i><br>
              <i class="num">{{ dataExchange.getIn + dataExchange.getOut }}</i><i>（个）</i>
            </span>
            <span class="square-bg data-change" flex>
              <span>
                <i class="num">{{ dataExchange.getIn }}</i><i>（个）</i><br>
                <i>归集数据量</i><br>
                <i style="line-height: 40px;">正确率</i><i style="color: #00ccff; line-height: 40px;">&nbsp;{{ dataExchange.getInCorrect }}</i><br>
              </span>
              <span>
                <i class="num">{{ dataExchange.getOut }}</i><i>（个）</i><br>
                <i>输出数据量</i><br>
                <i style="line-height: 40px;">正确率</i><i style="color: #00ccff; line-height: 40px;">&nbsp;{{ dataExchange.getOutCorrect }}</i><br>
              </span>
            </span>
            <span class="square-bg data-change mt-5" style="padding-top: 12px;">
              <i>已对接部门数</i><br>
              <i class="num">{{ dataExchange.dockedNormal + dataExchange.dockedAbnormal }}</i><i>（个）</i>
            </span>
            <span class="square-bg data-change mt-5">
              <span style="padding-bottom: 0; padding-top: 0;">
                <i>任务监控</i><br>
                <i style="line-height: 40px;">正常任务</i>&nbsp;<i class="num">{{ dataExchange.dockedNormal }}</i>&nbsp;<i
                style="line-height: 40px;">异常</i>&nbsp;<i class="num">{{ dataExchange.dockedAbnormal }}</i>
              </span>
            </span>
          </div>
          <chart ref="chart2" :options="returnBar(dataExchange.barData)" style="width: 100%; height: 300px;display:block;"></chart>
        </div>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="outer">
        <div class="inner" style="overflow: hidden; width: 800px">
          <div class="total-count">
            <i>数据归集总量</i>
            <i v-for="(item, index) in countNumList" :key="index" class="total-num" :class="'num' + item"></i>
          </div>
          <div class="cube">
            <div class="inner-float"></div>
            <div class="cir-box">
              <div class="cir1">
                <img src="~@/assets/images/overview/yuan01.png" alt="">
              </div>
              <div class="cir2">
                <img src="~@/assets/images/overview/yuan02.png" alt="">
              </div>
              <div class="cir"></div>
            </div>
          </div>
          <div class="rotate">
            <div class="rotate-inner">
              <div class="inner-item">
                <p><i>{{ rotateData[0].name }}</i></p>
                <p><i class="num">{{ rotateData[0].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
              <div class="inner-item">
                <p><i>{{ rotateData[1].name }}</i></p>
                <p><i class="num">{{ rotateData[1].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
              <div class="inner-item">
                <p><i>{{ rotateData[2].name }}</i></p>
                <p><i class="num">{{ rotateData[2].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
              <div class="inner-item">
                <p><i>{{ rotateData[3].name }}</i></p>
                <p><i class="num">{{ rotateData[3].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
              <div class="inner-item">
                <p><i>{{ rotateData[4].name }}</i></p>
                <p><i class="num">{{ rotateData[4].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
              <div class="inner-item">
                <p><i>{{ rotateData[5].name }}</i></p>
                <p><i class="num">{{ rotateData[5].value }}</i><i>(个)</i></p>
                <div>
                  <img src="~@/assets/images/overview/data.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="inner">
        <div class="title">红黑名单统计</div>
        <div class="red-black-wrapper" flex>
          <div class="container">
            <div class="red-list">
              <img src="~@/assets/images/overview/icon_hong.png" alt="">
              <i class="white-font">红名单</i>
              <i class="num">12566</i>
              <i class="white-font">（个）</i>
            </div>
            <div class="msg-list" flex="wrap:wrap">
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_hgrz.png" alt="">
                <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">{{ redList.signCom }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_ajnsr.png" alt="">
                <span>
                  <p class="white-font">A级纳税人</p>
                  <p><i class="num">{{ redList.taxpayer  }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_shfr.png" alt="">
                <span>
                  <p class="white-font">社会法人诚实守信</p>
                  <p><i class="num">{{ redList.corp }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_zyz.png" alt="">
                <span>
                  <p class="white-font">优秀青年志愿者</p>
                  <p><i class="num">{{ redList.volunteer }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="red-list">
              <img src="~@/assets/images/overview/icon_hei.png" alt="">
              <i class="white-font">黑名单</i>
              <i class="num">12566</i>
              <i class="white-font">（个）</i>
            </div>
            <div class="msg-list" flex="wrap:wrap">
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_hgrz.png" alt="">
                <span>
                  <p class="white-font">失信被执行人</p>
                  <p><i class="num">{{ blackList.performed }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_ajnsr.png" alt="">
                <span>
                  <p class="white-font">重大税收违法案件</p>
                  <p><i class="num">{{ blackList.case }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_shfr.png" alt="">
                <span>
                  <p class="white-font">拖欠农民工工资</p>
                  <p><i class="num">{{ blackList.unpaid }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
              <div class="msg-list-item" flex="main:center">
                <img class="rb-icon" src="~@/assets/images/overview/icon_zyz.png" alt="">
                <span>
                  <p class="white-font">严重失信债务人</p>
                  <p><i class="num">{{ blackList.lose }}</i><i class="white-font">（个）</i></p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template slot="inner">
        <div style="height: 100%" flex="main:justify dir:top">
          <div class="title">
            资源信息分类统计
          </div>
          <div class="count-wrapper">
            <div class="count-item square-bg">
              <i class="white-font" style="line-height: 40px;">一级分类</i><br>
              <i class="num">{{ classify.lv1 }}</i><i>（个）</i>
            </div>
            <div class="count-item square-bg">
              <i class="white-font" style="line-height: 40px;">二级分类</i><br>
              <i class="num">{{ classify.lv2 }}</i><i>（个）</i>
            </div>
            <div class="count-item square-bg">
              <i class="white-font" style="line-height: 40px;">资源数</i>
              <i class="num">{{ classify.lv3 }}</i><i>（个）</i>
            </div>
            <div class="count-item square-bg">
              <i class="white-font" style="line-height: 40px;">部门数</i>
              <i class="num">{{ classify.lv4 }}</i><i>（个）</i>
            </div>
          </div>
          <chart ref="chart2" :options="classifyChart" style="width: 100%; height: 220px;display:block;"></chart>
          <div class="title" style="margin-top: 10px;" flex="main:justify">
            <span>信用报告查询趋势分析</span>
            <span class="handle-btn" flex>
              <i class="btn" :class="handleBtnTab === 0 ? 'active' : ''" @click="handleBtnTab = 0">本月</i>
              <i class="btn" :class="handleBtnTab === 1 ? 'active' : ''" @click="handleBtnTab = 1">本年</i>
              <b-date-picker type="date"
                             :open="dateOpen2"
                             :value="date2"
                             confirm
                             @on-change="handleChange2"
                             @on-clear="handleClear"
                             @on-ok="handleOk"
                             placeholder="Select date">
                <a style="display: block;width: 76px;"
                   href="javascript:void(0)"
                   @click="handleClick('dateOpen2')">
                  <template v-if="date2 === ''">选择日期</template>
                  <template v-else>{{ date2 }}</template>
                </a>
              </b-date-picker>
            </span>
          </div>
          <div class="chart-msg-bar">信用报告查询总次数：{{ reSum(area.dataset.source, 'count') }}（次）</div>
          <chart ref="chart2" :options="area" style="width: 100%; height: 220px;display:block;"></chart>
          <div class="title">
            数据提报部门
          </div>
          <div class="dept-list" style="margin-bottom: 10px;">
            <div class="header-wrapper" flex="main:justify">
              <span class="list-header" flex-box="1">部门名称</span>
              <span class="list-header" flex-box="1">数量</span>
              <span class="list-header" flex-box="1">入库率</span>
            </div>
            <div class="body-wrapper" flex="main:justify" v-for="(item, index) in deptList" :key="index">
              <span flex-box="1">{{item.name}}</span>
              <span flex-box="1">{{item.count}}</span>
              <span flex-box="1">{{item.percent}}</span>
            </div>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Panel from '../../../components/Panel/Panel'
  import {mapState} from 'vuex'
  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#283353'
  export default {
    name: 'Overview',
    data() {
      return {
        color: ['#1167e2', '#4dcea7', '#fc9530', '#ff3b3c', '#563cff', '#0fbce0', '#0c31e2'],
        // chart
        classifyChart: {
          color: '#00abfb',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: 0,
            top: '12%',
            containLabel: true
          },
          dataset: {
            source: [
              ['product', '信息量'],
              ['基础信息', 80],
              ['业务信息', 100],
              ['司法信息', 20],
              ['行政执法信息', 300],
              ['公共事业信息', 400],
              ['信用评级信息', 500],
              ['其他信息', 600],
              ['累计', 700]
            ]
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            },
            splitLine: { lineStyle: { color: splitLineColor } }
          },
          yAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            },
            inverse: true
          },
          series: [
            {
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                barBorderRadius: 8
              },
              data: [1100, 800, 550, 350, 200, 100, 80]
            }
          ]
        },
        area: {
          dataset: {
            source: [
              { product: '1月', count: 1006 },
              { product: '2月', count: 1006 },
              { product: '3月', count: 1007 },
              { product: '4月', count: 1002 },
              { product: '5月', count: 1010 },
              { product: '6月', count: 1007 },
              { product: '7月', count: 1008 },
              { product: '8月', count: 1010 },
              { product: '9月', count: 1006 },
              { product: '10月', count: 1011 },
              { product: '11月', count: 1006 },
              { product: '12月', count: 1003 }
            ]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '6%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: { lineStyle: { color: xyLineColor } }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: xyLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } },
            max: function (value) {
              return value.min - 1
            },
            min: function (value) {
              return value.max + 1
            }
          },
          series: [{
            type: 'line',
            itemStyle: {
              color: 'rgba(2,203,255,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(2,203,255,0.8)'
              }, {
                offset: 1,
                color: 'rgba(2,203,255,0.2)'
              }])
            }
          }]
        },
        deptList: [
          { name: '部门名称', count: 56987, percent: '95%' }
        ],
        handleBtnTab: 0,
        date1: '',
        date2: '',
        dateOpen1: false,
        dateOpen2: false,

        // 动态数据
        countNumList: [3, 9, 6, 3, 6, 0, 5, 8],
        union:{
          memoCount:8848,
          measureCount:9527,
          deptCount:996,
          pieData: {
            inner: [
              { value: 1000, name: '惩戒' },
              { value: 2000, name: '激励' }
            ],
            outer: [
              { value: 400, name: '法人惩戒' },
              { value: 600, name: '自然人惩戒' },
              { value: 1400, name: '法人激励' },
              { value: 600, name: '自然人激励' }
            ]
          }
        },
        dataExchange: {
          // total: 8848,
          getIn: 4480,
          getInCorrect: '60%',
          getOut: 4480,
          getOutCorrect: '40%',
          dockedNormal: 120,
          dockedAbnormal: 80,
          barData: [
            { product: '1月', 'collection': 100, 'output': 100 },
            { product: '2月', 'collection': 83.1, 'output': 73.4 },
            { product: '3月', 'collection': 86.4, 'output': 65.2 },
            { product: '4月', 'collection': 72.4, 'output': 53.9 },
            { product: '5月', 'collection': 72.4, 'output': 53.9 },
            { product: '6月', 'collection': 72.4, 'output': 53.9 },
            { product: '7月', 'collection': 72.4, 'output': 53.9 },
            { product: '8月', 'collection': 72.4, 'output': 53.9 },
            { product: '9月', 'collection': 72.4, 'output': 53.9 },
            { product: '10月', 'collection': 72.4, 'output': 53.9 },
            { product: '11月', 'collection': 72.4, 'output': 53.9 },
            { product: '12月', 'collection': 72.4, 'output': 53.9 }
          ]
        },
        rotateData: [
          {
            name:'自然人基础信息',
            value:'264531'
          },
          {
            name:'自然人人均数量',
            value:'14'
          },
          {
            name:'法人人均数量',
            value:'16'
          },
          {
            name:'法人信用信息',
            value:'23655'
          },
          {
            name:'自然人信用信息',
            value:'36542'
          },
          {
            name:'法人基础信息',
            value:'32456'
          },
        ],
        redList:{ signCom: 4456, taxpayer: 7413, corp:1142, volunteer:5541 },
        blackList:{ performed: 236, case: 713, unpaid:112, lose:141 }
      }
    },
    components: {
      Panel
    },
    created() {
      for (let i = 0; i < 5; i++) {
        this.deptList.push(this.deptList[0])
      }
      this.$store.dispatch('getOverview').then(()=>{
        // console.log(this.overview)
        this.initData()
      })
    },
    computed: {
      classify (){
        return { lv1:10, lv2: 15, lv3: 18, lv4:13 }
      },
      ...mapState(['overview'])
    },
    watch: {
      date1: (n,o) => {
        console.log(n)
        if(n !== ''){
          this.handleBtnTab = 2
        }
      },
      handleBtnTab: () => {

      }
    },
    methods: {
      initData(){
        this.countNumList = this.overview.countNumList
        this.union = this.overview.union
        this.dataExchange = this.overview.dataExchange
        this.rotateData = this.overview.rotateData
        this.redList = this.overview.redList
        this.blackList = this.overview.blackList

        this.numChange()
      },
      reSum(arr, key) {
        let sum = 0
        arr.forEach((item) => {
          sum += item[key]
        })
        return sum
      },
      handleClick(param) {
        this[param] = !this[param]
      },
      handleChange1(date) {
        this.date1 = date
      },
      handleChange2(date) {
        this.date2 = date
      },
      handleClear() {
        this.dateOpen1 = false
        this.dateOpen2 = false
      },
      handleOk() {
        this.dateOpen1 = false
        this.dateOpen2 = false
      },
      // 渲染pie图
      returnPie(data){
        return {
          color: ['#34aec5', '#4065f1', '#fc9530', '#f93b3b'],
            tooltip: {
            trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '50%'],
              label: {
                position: 'inner'
              },
              labelLine: {
                show: false
              },
              /*data: [
                { value: 1000, name: '惩戒' },
                { value: 2000, name: '激励' }
              ]*/
              data: data.inner
            },
            {
              name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: ['60%', '75%'],
              label: {
                formatter: '  {a|{a}}  \n    {d}%   ',
                rich: {
                  a: {
                    color: '#fff',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              /*data: [
                { value: 400, name: '法人惩戒' },
                { value: 600, name: '自然人惩戒' },
                { value: 1400, name: '法人激励' },
                { value: 600, name: '自然人激励' }
              ],*/
              data: data.outer
            }
          ]
        }
      },
      returnBar(data){
        return {
          grid: {
            top: 20,
              left: 50,
              right: 10
          },
          legend: {
            bottom: '2%',
              textStyle: { color: '#fff' }
          },
          tooltip: {},
          dataset: {
            dimensions: ['product', 'collection', 'output'],
              source: data
          },
          xAxis: {
            type: 'category',
            axisLine: { lineStyle: { color: xyLineColor } },
            boundaryGap: ['20%', '20%']
          },
          yAxis: {
            boundaryGap: ['20%', '20%'],
            axisLine: { lineStyle: { color: xyLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } }
          },
          series: [
            {
              type: 'bar',
              barWidth: 8,
              barGap: 0,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#00befc' },
                    { offset: 1, color: '#00befc33' }
                  ]
                )
              }
            },
            {
              type: 'bar',
              barWidth: 8,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#294bd5' },
                    { offset: 1, color: '#294bd533' }
                  ]
                )
              }
            }
          ]
        }
      },
      numChange(){
        let copy = JSON.parse(JSON.stringify(this.countNumList))
        let change = setInterval(() => {
          let arr = []
          this.countNumList.forEach(item => {
            arr.push(parseInt(Math.random() * 10))
          })
          this.countNumList = arr
        }, 20)
        setTimeout(() => {
          window.clearInterval(change)
          this.countNumList = copy
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $p = 156
  $itemW = 110
  $itemH = 110
  $rotateW = 4 * $p
  $rotateH = 3.46 * $p

  [flex~="content:around"]
    -webkit-box-pack: justify;
    -webkit-justify-content: space-around;
    -ms-flex-pack: justify;
    justify-content: space-around

  .white-font
    color #fff

  .overview
    width: 100%
    height: 1000px
    box-sizing border-box
    padding: 20px 0
    background-image: url('~@/assets/images/overview/ge.png')
    background-repeat: no-repeat
    background-position: center 40%

    .dept-list
      color #fff

      .list-header
        font-weight: 700

      div
        height 28px
        line-height: 28px

        &:nth-child(odd)
          background-color: #001739

        &:nth-child(even)
          background-color: #061029

        span
          text-align center

    .title
      font-weight: 700
      color #ffffff
      font-size: 18px
      line-height: 32px
      background-image: url('~@/assets/images/summary/t_bg.png')
      background-repeat: no-repeat
      background-position: left bottom
      -webkit-background-size: 100% 20px
      background-size: 100% 20px
      height 36px
      margin-top: 6px
      margin-bottom: 10px

    > div
      &:nth-child(1)
        width 450px

      &:nth-child(2)
        width calc(100% - 900px)

      &:nth-child(3)
        width 450px

    .count-wrapper
      display flex
      justify-content space-between
      width: 100%

      .count-item
        width 23%
        padding-bottom 8px
        text-align center
        color #fff

      .count-title
        color #ffffff
        line-height: 30px
        font-size: 14px

      span
        padding 8px
        display inline-block

        .iconfont
          color $fontColor
          font-weight: 700
          font-size: 32px

      .data-change
        color #fff
        text-align center
        line-height: 26px
        width: 120px

        &:nth-child(2)
          span
            padding-right: 0

        &:nth-child(even)
          text-align left
          width: 228px
          padding-top: 12px
          padding-left: 10px

    .nowrap
      flex-wrap wrap

    .inner
      position relative
      width ($rotateW) px
      height: 640 px
      margin 0 auto

      .total-count
        position absolute
        top: 0
        left 50%
        transform translateX(-50%)
        width: 800px
        text-align center
        font-size: 26px
        font-weight: 700
        color #fff
        letter-spacing 8px

        i
          display inline-block
          vertical-align middle
          margin 4px

          &:first-of-type
            padding-right: 20px

          &.total-num
            width 49px
            height: 55px

          &.num0
            background-image: url('~@/assets/images/overview/0.png')

          &.num1
            background-image: url('~@/assets/images/overview/1.png')

          &.num2
            background-image: url('~@/assets/images/overview/2.png')

          &.num3
            background-image: url('~@/assets/images/overview/3.png')

          &.num4
            background-image: url('~@/assets/images/overview/4.png')

          &.num5
            background-image: url('~@/assets/images/overview/5.png')

          &.num6
            background-image: url('~@/assets/images/overview/6.png')

          &.num7
            background-image: url('~@/assets/images/overview/7.png')

          &.num8
            background-image: url('~@/assets/images/overview/8.png')

          &.num9
            background-image: url('~@/assets/images/overview/9.png')

      .cube
        display inline-block
        width: 100%
        height: 100%
        position relative
        z-index 10

        .inner-float
          position absolute
          width: 100%
          height: 100%
          background-image: url('~@/assets/images/overview/cube.png')
          background-repeat: no-repeat
          background-position: center 256px;
          -webkit-background-size: 160px 160px
          background-size: 160px 160px
          z-index 20
          animation infinite shineCube 4s linear

        .cir-box
          width: 100%
          height: 100%
          position absolute
          z-index 10

        .cir
          position absolute
          width 500px
          height: 500px
          top: calc(50% + 100px)
          left: 50%
          animation shine infinite linear 6s

          &::before
            position absolute
            top: 0
            left: 0
            content ''
            width: 110%
            height: 110%
            display block
            transform translate(-50%, -50%) rotateX(60deg)
            border: 1px dashed $fontColor
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%

          &::after
            content ''
            width: 130%
            height: 130%
            display block
            transform translate(-50%, -50%) rotateX(60deg)
            border: 1px solid $fontColor
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%

        .cir1
          position absolute
          top: calc(50% + 100px)
          left: 50%
          animation shine infinite linear 6s

          img
            width 450px
            height: auto
            transform translate(-50%, -50%) rotateX(60deg)

        .cir2
          position absolute
          top: calc(50% + 100px)
          left: 50%
          animation shine infinite linear 6s
          // animation-delay 3s

          img
            width 300px
            height: auto
            transform translate(-50%, -50%) rotateX(60deg)

    .red-black-wrapper
      .container
        width 50%

        .red-list
          padding-bottom: 10px
          text-align center
          background-image: url('~@/assets/images/overview/tuopan.png')
          background-repeat: no-repeat
          background-position: bottom center

          img, i
            vertical-align middle
            padding 10px

        .msg-list
          padding-top: 20px
          .msg-list-item
            width: 50%
            margin-top: 15px
            .rb-icon
              margin-right: 10px
              width: 52px
              height: 52px
            span
              width: 112px

  .rotate
    position absolute
    margin 0 auto
    top 5px
    left 86px
    width ($rotateW) px
    height: ($rotateH) px
    transform-style preserve-3d
    // transform rotateX(-10deg)
    // background-color: #fff
    animation rotate3d linear 30s infinite
    z-index 20

    &:hover
      animation-play-state: paused;
      -webkit-animation-play-state: paused;

      .rotate-inner
        .inner-item
          animation-play-state: paused;
          -webkit-animation-play-state: paused;

    .rotate-inner
      position relative
      width: 100%
      height: 100%
      color #fff

      .inner-item
        animation rotate3dOpposite linear infinite 30s
        // transform-style preserve-3d
        // transform perspective(1000)
        text-align center
        width: ($itemW) px
        height: ($itemH) px
        position relative

        p
          text-align center
          transform rotateX(10deg) scaleY(2)
          height: 32px;
        div
          position absolute
          left: 50%
          top: 130px
          width: 120px
          height: 105px
          text-align center
          transform translateX(-50%) rotateX(10deg) scaleY(2)
          background-image: url('~@/assets/images/overview/pan.png')
          background-position: center bottom
          -webkit-background-size: contain
          background-size: contain
          background-repeat: no-repeat

        &:nth-child(1)
          position absolute
          top: (0 - $itemH/ 2) px
          left: ($p - $itemW/ 2) px

        &:nth-child(2)
          position absolute
          top: (0 - $itemH/ 2) px
          left: ($p* 3 - $itemW/ 2) px

        &:nth-child(3)
          position absolute
          top: ($rotateH/ 2 - $itemH/ 2) px
          left: ($p* 4 - $itemW/ 2) px

        &:nth-child(4)
          position absolute
          top: ($rotateH - $itemH/ 2) px
          left: ($p* 3 - $itemW/ 2) px

        &:nth-child(5)
          position absolute
          top: ($rotateH - $itemH/ 2) px
          left: ($p - $itemW/ 2) px

        &:nth-child(6)
          position absolute
          top: ($rotateH/ 2 - $itemH/ 2) px
          left: (0 - $itemW/ 2) px

  .square-bg
    background-color: #01173a
    padding-bottom: 8px

  .chart-msg-bar
    text-align center
    color #fff

  .handle-btn
    color #fff
    font-size: 12px

    .active
      background-color: #0d1b4d

    .btn
      white-space nowrap
      line-height: 32px
      height: 32px
      padding: 0 10px;
      margin-right: 4px
      -webkit-border-radius: 16px
      -moz-border-radius: 16px
      border-radius: 16px
      cursor pointer

  .handle-btn >>> .bin-select-dropdown
    background-color: #01173a

  .handle-btn >>> .bin-date-picker-rel
    line-height: 32px

  @keyframes rotate3d {
    0% {
      transform: rotateX(60deg) rotateZ(0)
    }
    100% {
      transform: rotateX(60deg) rotateZ(1turn)
    }
  }

  @keyframes rotate3dOpposite {
    0% {
      transform: rotateZ(0)
    }
    100% {
      transform: rotateZ(-1turn)
    }
  }

  @keyframes shine {
    0% {
      opacity: 0;
      transform: scale(.8);
      transform-origin: 0 0;
    }
    50% {
      opacity: .8;
      transform: scale(.9);
      transform-origin: 0 0;
    }
    100% {
      opacity: 0;
      transform: scale(1);
      transform-origin: 0 0;
    }
  }

  @keyframes shineCube {
    0% {
      opacity: 1;
    }
    50% {
      opacity: .8;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes shadowShine {
    0% {
      box-shadow: 0 0 20px $lightShadowColor;
    }
    50% {
      box-shadow: 0 0 2px $lightShadowColor;
    }
    100% {
      box-shadow: 0 0 20px $lightShadowColor;
    }
  }
</style>
