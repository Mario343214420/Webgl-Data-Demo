import Mock from 'mockjs'
// import data from './data.json'
// import data_nav from './data_nav.json'
// import home_data from './home_data.json'
// import shiwutuijian_data from './shiwutuijian_data.json'
// import shiwu_data from './shiwu_data.json'
// import shouye_data from './shouye_data.json'

// 返回data的接口

Mock.mock('/overviewData', {
  code: 0, data: {
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
    submission: [
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' },
      { name: '部门名称', count: 56987, percent: '95%' }
    ]
  }
})

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
  RegExp('/overviewDataExchange' + ".*"),
  'get',
  options => {
    const url = options.url
    const param = options.url.substring(url.indexOf('?'), url.length)
    switch (param) {
      case '?thisYear':
        return  {
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
        return  {
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
        return  {
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
  RegExp('/overviewOverviewReport' + ".*"),
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
Mock.mock('/summaryData', {
  code: 0,
  data: {
    monthAnalysis: {
      collection: 100,
      appear: 200,
      reflux: 300
    }, // 本月数据分析
    classifyStatistic:{
      lv1:20,
      lv2:30,
      resourceCount:40,
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
        ['product','奖','惩'],
        ['1月',1000,500],
        ['2月',1400,600],
        ['3月',2000,700],
        ['4月',1500,500],
        ['5月',1200,400],
        ['6月',1300,500],
        ['7月',1400,600],
        ['8月',2000,500],
        ['9月',2200,300],
        ['10月',1600,500],
        ['11月',1700,600],
        ['12月',1400,400],
      ]
    }, // 中心数据
    source:[
      ['product','数据来源'],
      ['手工填报',10],
      ['et对接',5],
      ['内部接口',15],
      ['其他',25]
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
})
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
        ['基础信息', 100],
        ['业务信息', 100],
        ['司法信息', 200],
        ['行政执法信息', 300],
        ['公共事业信息', 400],
        ['信用评级信息', 500],
        ['其他信息', 600]
      ],
      gather: [
        ['product','行政许可','行政处罚'],
        ['1月',1000,500],
        ['2月',1400,600],
        ['3月',2000,700],
        ['4月',1500,500],
        ['5月',1200,400],
        ['6月',1300,500],
        ['7月',1400,600],
        ['8月',2000,500],
        ['9月',2200,300],
        ['10月',1600,500],
        ['11月',1700,600],
        ['12月',1400,400]
      ], // 双公示采集情况
      publicCounts: {
        naturalPersonPermit: 2,
        legalPersonPermit: 2,
        naturalPersonPunish: 2,
        legalPersonPunish: 2,
      },
      weekCase:{
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
