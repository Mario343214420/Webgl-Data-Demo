import Mock from 'mockjs'
// import data from './data.json'
// import data_nav from './data_nav.json'
// import home_data from './home_data.json'
// import shiwutuijian_data from './shiwutuijian_data.json'
// import shiwu_data from './shiwu_data.json'
// import shouye_data from './shouye_data.json'

// 返回data的接口

Mock.mock(
  '/overviewData',
  // 返回数据格式
  {
    code: 0, // 状态码
    data: {
      union: {
        memoCount: 10,
        measureCount: 20,
        deptCount: 30,
        chartData: {
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
      }, // 联合奖惩
      dataExchange: {
        getIn: 0,
        getOut: 0,
        getInCorrect: '0%',
        getOutCorrect: '0%',
        dockedAbnormal: 0,
        dockedNormal: 0,
        chartData: [
          ['product', '归集', '输出'],
          ['1月', 120, 95],
          ['2月', 83.1, 73.4],
          ['3月', 86.4, 65.2],
          ['4月', 72.4, 53.9],
          ['5月', 72.4, 53.9],
          ['6月', 72.4, 53.9],
          ['7月', 72.4, 53.9],
          ['8月', 72.4, 53.9],
          ['9月', 72.4, 53.9],
          ['10月', 72.4, 53.9],
          ['11月', 72.4, 53.9],
          ['12月', 72.4, 53.9]
        ]
      },
      total: [0, 0, 0, 0, 0, 0, 0, 0],
      rotateData: [
        { name: '法人基础数量', value: 0 },
        { name: '自然人基础数量', value: 0 },
        { name: '法人信用信息', value: 0 },
        { name: '自然人信用信息', value: 0 },
        { name: '法人人均数量', value: 0 },
        { name: '自然人人均数量', value: 0 }
      ],
      redBlackList: {
        redList: {
          signCom: 0,
          taxpayer: 0,
          corp: 0,
          volunteer: 0
        },
        blackList: {
          performed: 0,
          case: 0,
          unpaid: 0,
          lose: 0
        }
      }, // 红黑名称
      collection: {
        lv1: 0,
        lv2: 0,
        resourceCount: 0,
        deptCount: 0,
        chartData: [
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
      }, // 部门数据归集统计
      report: {
        chartData: [
          ['product', '数量'],
          ['1月', 1006],
          ['2月', 1006],
          ['3月', 1007],
          ['4月', 1002],
          ['5月', 1010],
          ['6月', 1007],
          ['7月', 1008],
          ['8月', 1010],
          ['9月', 1006],
          ['10月', 1011],
          ['11月', 1006],
          ['12月', 1003]
        ]
      },
      submission: [
        { name: '部门名称', count: 56987, percent: '95%' },
        { name: '部门名称', count: 56987, percent: '95%' },
        { name: '部门名称', count: 56987, percent: '95%' },
        { name: '部门名称', count: 56987, percent: '95%' },
        { name: '部门名称', count: 56987, percent: '95%' },
        { name: '部门名称', count: 56987, percent: '95%' }
      ]
    } // 数据体
  }
)

/*
Mock.mock(
  '/overviewDataExchange?2020-06-01',
  {
    code: 0, data: {
      getIn: 10,
      getOut: 10,
      getInCorrect: '0%',
      getOutCorrect: '0%',
      dockedAbnormal: 0,
      dockedNormal: 0,
      chartData: [
        ['product', '归集', '输出'],
        ['1月', 120, 95],
        ['2月', 83.1, 73.4],
        ['3月', 86.4, 65.2],
        ['4月', 72.4, 53.9],
        ['5月', 72.4, 53.9],
        ['6月', 72.4, 53.9],
        ['7月', 72.4, 53.9],
        ['8月', 72.4, 53.9],
        ['9月', 72.4, 53.9],
        ['10月', 72.4, 53.9],
        ['11月', 72.4, 53.9],
        ['12月', 72.4, 53.9]
      ]
    }
  })
*/

Mock.mock(
  RegExp('/overviewDataExchange' + '.*'),
  'get',
  options => {
    const url = options.url
    const param = options.url.substring(url.indexOf('?'), url.length)
    switch (param) {
      case '?thisYear':
        return {
          code: 0, data: {
            getIn: 10,
            getOut: 10,
            getInCorrect: '0%',
            getOutCorrect: '0%',
            dockedAbnormal: 0,
            dockedNormal: 0,
            chartData: [
              ['product', '归集', '输出'],
              ['1月', 120, 95],
              ['2月', 83.1, 73.4],
              ['3月', 86.4, 65.2],
              ['4月', 72.4, 53.9],
              ['5月', 72.4, 53.9],
              ['6月', 72.4, 53.9],
              ['7月', 72.4, 53.9],
              ['8月', 72.4, 53.9],
              ['9月', 72.4, 53.9],
              ['10月', 72.4, 53.9],
              ['11月', 72.4, 53.9],
              ['12月', 72.4, 53.9]
            ]
          }
        }
      case '?thisMonth':
        return {
          code: 0, data: {
            getIn: 20,
            getOut: 10,
            getInCorrect: '0%',
            getOutCorrect: '0%',
            dockedAbnormal: 0,
            dockedNormal: 0,
            chartData: [
              ['product', '归集', '输出'],
              ['1月', 120, 95],
              ['2月', 83.1, 73.4],
              ['3月', 86.4, 65.2],
              ['4月', 72.4, 53.9],
              ['5月', 72.4, 53.9],
              ['6月', 72.4, 53.9],
              ['7月', 72.4, 53.9],
              ['8月', 72.4, 53.9],
              ['9月', 72.4, 53.9],
              ['10月', 72.4, 53.9],
              ['11月', 72.4, 53.9],
              ['12月', 72.4, 53.9]
            ]
          }
        }
      default:
        return {
          code: 0, data: {
            getIn: 30,
            getOut: 30,
            getInCorrect: '0%',
            getOutCorrect: '0%',
            dockedAbnormal: 0,
            dockedNormal: 0,
            chartData: [
              ['product', '归集', '输出'],
              ['1月', 120, 95],
              ['2月', 83.1, 73.4],
              ['3月', 86.4, 65.2],
              ['4月', 72.4, 53.9],
              ['5月', 72.4, 53.9],
              ['6月', 72.4, 53.9],
              ['7月', 72.4, 53.9],
              ['8月', 72.4, 53.9],
              ['9月', 72.4, 53.9],
              ['10月', 72.4, 53.9],
              ['11月', 72.4, 53.9],
              ['12月', 72.4, 53.9]
            ]
          }
        }
    }
  }
)
Mock.mock(
  RegExp('/overviewOverviewReport' + '.*'),
  'get',
  options => {
    const url = options.url
    const param = options.url.substring(url.indexOf('?'), url.length)
    switch (param) {
      case '?thisYear':
        return {
          code: 0, data: {
            chartData: [
              ['product', '数量'],
              ['1月', 900],
              ['2月', 1006],
              ['3月', 1007],
              ['4月', 1002],
              ['5月', 1010],
              ['6月', 1007],
              ['7月', 1008],
              ['8月', 1010],
              ['9月', 1006],
              ['10月', 1011],
              ['11月', 1006],
              ['12月', 1003]
            ]
          }
        }
      case '?thisMonth':
        return {
          code: 0, data: {
            chartData: [
              ['product', '数量'],
              ['1月', 950],
              ['2月', 1006],
              ['3月', 1007],
              ['4月', 1002],
              ['5月', 1010],
              ['6月', 1007],
              ['7月', 1008],
              ['8月', 1010],
              ['9月', 1006],
              ['10月', 1011],
              ['11月', 1006],
              ['12月', 1003]
            ]
          }
        }
      default:
        return {
          code: 0, data: {
            chartData: [
              ['product', '数量'],
              ['1月', 1006],
              ['2月', 1006],
              ['3月', 1007],
              ['4月', 1002],
              ['5月', 1010],
              ['6月', 1007],
              ['7月', 1008],
              ['8月', 1010],
              ['9月', 1006],
              ['10月', 1011],
              ['11月', 1006],
              ['12月', 1003]
            ]
          }
        }
    }
  }
)
Mock.mock(
  '/summaryData',
  {
    code: 0,
    data: {
      monthAnalysis: {
        collection: 100,
        appear: 200,
        reflux: 300
      }, // 本月数据分析
      classifyStatistic: {
        lv1: 20,
        lv2: 30,
        resourceCount: 40,
        deptCount: 50,
        chartData: [
          ['product', '信息量'],
          ['基础信息', 80],
          ['业务信息', 100],
          ['司法信息', 20],
          ['行政执法信息', 300],
          ['公共事业信息', 400],
          ['信用评级信息', 500],
          ['其他信息', 600],
          ['累计', 700]
        ],
        deptList: [
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 }
        ]
      }, // 分类统计
      summaryCounts: {
        resource: 0,
        collection: 0,
        month: 0,
        naturalPerson: 0,
        legalPerson: 0,
        focusPerson: 0,
        passPercent: 80,
        chartList: [
          ['product', '自然人', '法人及其他组织'],
          ['1月', 1000, 500],
          ['2月', 1400, 600],
          ['3月', 2000, 700],
          ['4月', 1500, 500],
          ['5月', 1200, 400],
          ['6月', 1300, 500],
          ['7月', 1400, 600],
          ['8月', 2000, 500],
          ['9月', 2200, 300],
          ['10月', 1600, 500],
          ['11月', 1700, 600],
          ['12月', 1400, 400],
        ]
      }, // 中心数据
      source: [
        ['product', '数据来源'],
        ['手工填报', 10],
        ['et对接', 5],
        ['内部接口', 15],
        ['其他', 25]
      ], // 来源
      naturalPersonAnalysis: [
        {
          outer: [
            { value: 335, name: '业务信息' },
            { value: 310, name: '司法信息' },
            { value: 234, name: '行政执法信息' },
            { value: 235, name: '信用评价信息' },
            { value: 248, name: '公共事业信息' },
            { value: 248, name: '其他信息' },
            { value: 248, name: '基本信息' }
          ],
          inner: [
            { value: 535, name: '直接访问' }
          ]
        },
        {
          outer: [
            { value: 365, name: '业务信息' },
            { value: 340, name: '司法信息' },
            { value: 264, name: '行政执法信息' },
            { value: 225, name: '信用评价信息' },
            { value: 218, name: '公共事业信息' },
            { value: 228, name: '其他信息' },
            { value: 218, name: '基本信息' }
          ],
          inner: [
            { value: 635, name: '直接访问' }
          ]
        }
      ],
      /*[
        ['product','分类'],
        ['基本信息',2365466],
        ['业务信息',5466],
        ['司法信息',5638],
        ['行政执法信息',3256],
        ['信用评价信息',3256],
        ['公共事业信息',5456],
        ['其他信息',5456]
      ], */
      // 自然人资源数据分类数据分析
      newestFillInDept: [
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 }
      ] // 最新填报部门
    }
  }
)
Mock.mock(
  '/publicData',
  'get',
  {
    code: 0,
    data: {
      newClassifyList: [
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 },
        { name: '部门名称一', count: 0, percent: 0 }
      ],
      weekSubmit: [
        ['product', '提报率'],
        ['1天', 100],
        ['2天', 100],
        ['3天', 200],
        ['4天', 300],
        ['5天', 400],
        ['6天', 500],
        ['7天', 600]
      ],
      gather: [
        ['product', '行政许可', '行政处罚'],
        ['1月', 1000, 500],
        ['2月', 1400, 600],
        ['3月', 2000, 700],
        ['4月', 1500, 500],
        ['5月', 1200, 400],
        ['6月', 1300, 500],
        ['7月', 1400, 600],
        ['8月', 2000, 500],
        ['9月', 2200, 300],
        ['10月', 1600, 500],
        ['11月', 1700, 600],
        ['12月', 1400, 400]
      ], // 双公示采集情况
      publicCounts: {
        naturalPersonPermit: 2,
        legalPersonPermit: 2,
        naturalPersonPunish: 2,
        legalPersonPunish: 2,
      },
      weekCase: {
        permit: 0,
        punish: 0
      },
      punishRepair: [
        ['product', '数量'],
        ['1月', 1006],
        ['2月', 1006],
        ['3月', 1007],
        ['4月', 1002],
        ['5月', 1010],
        ['6月', 1007],
        ['7月', 1008],
        ['8月', 1010],
        ['9月', 1006],
        ['10月', 1011],
        ['11月', 1006],
        ['12月', 1003]
      ],
      permitDistribute: {
        outer: [
          { value: 335, name: '业务信息' },
          { value: 310, name: '司法信息' },
          { value: 234, name: '行政执法信息' },
          { value: 235, name: '信用评价信息' },
          { value: 248, name: '公共事业信息' },
          { value: 248, name: '其他信息' },
          { value: 248, name: '基本信息' }
        ],
        inner: [
          { value: 335, name: '直接访问' }
        ]
      }
    }
  }
)
Mock.mock(
  '/unionData',
  'get',
  {
    code: 0,
    data: {
      unionRewardPunish: {
        total: 110,
        memo: 20,
        dept: 30,
        naturalPerson: {
          total: 10,
          reward: 20,
          punish: 30
        },
        legalPerson: {
          total: 10,
          reward: 20,
          punish: 30
        }
      },
      redBlackStatistics: {
        red: {
          total: 140,
          approve: 20,
          taxpayer: 30,
          honor: 40,
          excellent: 50
        },
        black: {
          total: 140,
          approve: 50,
          taxpayer: 20,
          honor: 20,
          excellent: 20
        }
      },
      trend: [
        ['product', '惩戒', '激励'],
        ['1月', 1000, 500],
        ['2月', 1400, 600],
        ['3月', 2000, 700],
        ['4月', 1500, 500],
        ['5月', 1200, 400],
        ['6月', 1300, 500],
        ['7月', 1400, 600],
        ['8月', 2000, 500],
        ['9月', 2200, 300],
        ['10月', 1600, 500],
        ['11月', 1700, 600],
        ['12月', 1400, 400]
      ],
      query: [
        ['product', '次数'],
        ['部门1', 1000],
        ['部门2', 900],
        ['部门3', 800],
        ['部门4', 700],
        ['部门5', 600],
        ['部门6', 500],
        ['部门7', 400],
        ['部门8', 300],
      ],
      feedback: [
        ['product', '次数'],
        ['部门1', 1000],
        ['部门2', 900],
        ['部门3', 800],
        ['部门4', 700],
        ['部门5', 600],
        ['部门6', 500],
        ['部门7', 400],
        ['部门8', 300],
      ],
      memoTrend: [
        ['product', '趋势'],
        ['10:00', 35],
        ['10:30', 50],
        ['11:00', 52],
        ['11:30', 55],
        ['12:00', 60],
        ['12:30', 56],
        ['13:00', 50],
        ['13:30', 51],
        ['14:00', 54],
        ['14:30', 57],
        ['15:00', 60],
        ['15:30', 70]
      ],
      memoStatusList: [
        { name: '房产交易', count: 8848, time: 9527 },
        { name: '规划设计方案', count: 8848, time: 9527 },
        { name: '股票交易', count: 8848, time: 9527 },
        { name: '不动产转移', count: 8848, time: 9527 }
      ],
      punishRewardList: [
        { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
        { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' }
      ],
      measure: [
        ['product', '措施数量'],
        ['措施名称1', 800],
        ['措施名称2', 700],
        ['措施名称3', 600],
        ['措施名称4', 500],
        ['措施名称5', 400],
        ['措施名称6', 350],
        ['措施名称7', 320],
        ['措施名称8', 310]
      ],
      quitTrend: [
        ['product', '数量'],
        ['1月', 1000],
        ['3月', 2000],
        ['4月', 1500],
        ['5月', 1200],
        ['6月', 1300],
        ['7月', 1400],
        ['8月', 2000]
      ]
    }
  }
)
Mock.mock(
  '/mapData',
  'get',
  {
    code: 0,
    data: {
      month: {
        collection: 0,
        submit: 0,
        reflux: 0
      },
      classify: {
        lv1: 2,
        lv2: 2,
        resourceCount: 2,
        deptCount: 2,
        chartData: [
          ['product', '数量'],
          ['基础信息', 100],
          ['业务信息', 100],
          ['司法信息', 200],
          ['行政执法信息', 300],
          ['公共事业信息', 400],
          ['信用评级信息', 500],
          ['其他信息', 600],
          ['累计', 700]
        ]
      },
      classifyList: [
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 }
      ],
      resource: {
        resourceCount: 0,
        dataCount: 0,
        monthCount: 0
      },
      mapData: [
        [{
          name: '黑龙江',
          value: 1
        }], [{
          name: '北京市',
          value: 3
        }], [{
          name: '内蒙古',
          value: 1
        }], [{
          name: '吉林',
          value: 1
        }], [{
          name: '辽宁',
          value: 1
        }], [{
          name: '河北',
          value: 2
        }], [{
          name: '天津',
          value: 2
        }], [{
          name: '山西',
          value: 1
        }], [{
          name: '陕西',
          value: 1
        }], [{
          name: '甘肃',
          value: 1
        }], [{
          name: '宁夏',
          value: 1
        }], [{
          name: '青海',
          value: 1
        }], [{
          name: '新疆',
          value: 1
        }], [{
          name: '西藏',
          value: 1
        }], [{
          name: '四川',
          value: 2
        }], [{
          name: '重庆',
          value: 2
        }], [{
          name: '山东',
          value: 1
        }], [{
          name: '河南',
          value: 1
        }], [{
          name: '江苏',
          value: 2
        }], [{
          name: '安徽',
          value: 1
        }], [{
          name: '湖北',
          value: 2
        }], [{
          name: '浙江',
          value: 2
        }], [{
          name: '福建',
          value: 2
        }], [{
          name: '江西',
          value: 1
        }], [{
          name: '湖南',
          value: 2
        }], [{
          name: '贵州',
          value: 1
        }], [{
          name: '广西',
          value: 1
        }], [{
          name: '海南',
          value: 2
        }], [{
          name: '上海',
          value: 3
        }], [{
          name: '云南',
          value: 1
        }]
      ],
      sourceData: [
        { value: 10, name: '手工填报' },
        { value: 5, name: 'et对接' },
        { value: 15, name: '内部接口' },
        { value: 25, name: '其他' }
      ],
      naturalPersonData: {
        legalPerson: {
          inner: [
            { value: 335, name: '业务信息' },
            { value: 310, name: '司法信息' },
            { value: 234, name: '行政执法信息' },
            { value: 235, name: '信用评价信息' },
            { value: 248, name: '公共事业信息' },
            { value: 248, name: '其他信息' },
            { value: 248, name: '基本信息' }
          ],
          outer: [
            { value: 335, name: '直接访问' }
          ]
        },
        naturalPerson: {
          inner: [
            { value: 235, name: '业务信息' },
            { value: 210, name: '司法信息' },
            { value: 134, name: '行政执法信息' },
            { value: 135, name: '信用评价信息' },
            { value: 148, name: '公共事业信息' },
            { value: 148, name: '其他信息' },
            { value: 148, name: '基本信息' }
          ],
          outer: [
            { value: 235, name: '直接访问' }
          ]
        }
      },
      newestList: [
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 },
        { name: '部门名称一', count: 8848, percent: 10 }
      ]
    }
  }
)
