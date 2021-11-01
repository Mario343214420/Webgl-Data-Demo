const state = {
  /* lines: [
    [
      {x: 0, y: 0, z: 50},
      {x: 0, y: 10, z: 30},
      {x: 10, y: 0, z: 10},
      {x: 12, y: 10, z: -10},
      {x: 20, y: 10, z: -30},
      {x: 20, y: 10, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 10, y: 10, z: 30},
      {x: 20, y: 0, z: 10},
      {x: 9, y: 20, z: -10},
      {x: 11, y: 10, z: -30},
      {x: 30, y: 10, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 0, y: 0, z: 30},
      {x: 0, y: 0, z: 10},
      {x: 0, y: 0, z: -10},
      {x: 0, y: 0, z: -30},
      {x: 0, y: 0, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 20, y: 0, z: 30},
      {x: 30, y: 0, z: 10},
      {x: 40, y: 0, z: -10},
      {x: 50, y: 0, z: -30},
      {x: 60, y: 0, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 10, y: 10, z: 30},
      {x: 12, y: 12, z: 10},
      {x: 14, y: 14, z: -10},
      {x: 16, y: 16, z: -30},
      {x: 20, y: 20, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: -14, y: 12, z: 30},
      {x: -12, y: 14, z: 10},
      {x: -14, y: 16, z: -10},
      {x: -16, y: 18, z: -30},
      {x: -18, y: 20, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 0, y: -10, z: 30},
      {x: 10, y: 0, z: 10},
      {x: 12, y: -10, z: -10},
      {x: 20, y: -10, z: -30},
      {x: 20, y: -10, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: -10, y: 10, z: 30},
      {x: -20, y: 0, z: 10},
      {x: -9, y: 20, z: -10},
      {x: -11, y: 10, z: -30},
      {x: -30, y: 10, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 10, y: -10, z: 30},
      {x: 12, y: -12, z: 10},
      {x: 14, y: -14, z: -10},
      {x: 16, y: -16, z: -30},
      {x: 20, y: -20, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: -14, y: -12, z: 30},
      {x: -12, y: -14, z: 10},
      {x: -14, y: -16, z: -10},
      {x: -16, y: -18, z: -30},
      {x: -18, y: -20, z: -50},
    ],
    [
      {x: 0, y: 0, z: 50},
      {x: 0, y: -10, z: 30},
      {x: 20, y: -11, z: 10},
      {x: 22, y: -12, z: -10},
      {x: 23, y: -13, z: -30},
      {x: 24, y: -15, z: -50},
    ]
  ], */
  lines: [
      [{ x: -10, y: -10, z: 50 }],
      [{ x: 0, y: 0, z: 50 }],
      [{ x: 10, y: 10, z: 50 }],
      [{ x: 0, y: 10, z: 50 }],
      [{ x: -10, y: 0, z: 50 }],
      [{ x: 10, y: -10, z: 50 }],
      [{ x: -10, y: 10, z: 50 }],
      [{ x: 10, y: 0, z: 50 }]
  ],
  colors: [
    '#fd4747',
    '#b0e5f4',
    '#fcc199',
    '#95c1f9',
    '#e2fc99',
    '#f9c5b6',
    '#f4b2d8',
    '#6588d8',
    '#a2f9b8',
    '#80f7f5',
    '#ffdfcc',
    '#b0e5f4',
    '#fcc199',
    '#95c1f9',
    '#e2fc99',
    '#f9c5b6',
    '#f4b2d8',
    '#6588d8',
    '#a2f9b8',
    '#80f7f5',
    '#ffdfcc'
  ]
}
const mutations = {
  ADD_LINE: (state, line) => {
    state.lines.push(line)
  },
  ADD_POINT: (state, lineIdx, point) => {
    state.lines[lineIdx].push({ x: point.x, y: point.y, z: point.z })
  },
  DEL_LINE: (state, lineIdx) => {
    state.lines.splice(lineIdx, 1)
  },
  DEL_POINT: (state, params) => {
    state.lines[params.lineIdx].splice(params.pointIdx, 1)
  }
}
const actions = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
