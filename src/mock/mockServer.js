
import Mock from 'mockjs'
// import data from './data.json'
// import data_nav from './data_nav.json'
// import home_data from './home_data.json'
// import shiwutuijian_data from './shiwutuijian_data.json'
// import shiwu_data from './shiwu_data.json'
// import shouye_data from './shouye_data.json'

// 返回data的接口
Mock.mock('/overview', {code:0, data: {
    countNumList: [0, 0, 0, 0, 0, 0, 0, 0],
    union:{
      memoCount:6666,
      measureCount:7777,
      deptCount:400,
      pieData: {
        inner: [
          { value: 1100, name: '惩戒' },
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
})
