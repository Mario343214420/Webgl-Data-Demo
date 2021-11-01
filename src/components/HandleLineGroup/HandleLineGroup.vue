<template>
<div class="handle-line-group" ref="handle3DLine">
  <div class="input-group">
    <div class="handle-btn-group">
      <div class="line-count btn">{{ this.lines.length }}根</div>
      <div class="add-btn btn" @click="handleAdd(0)">增加线</div>
      <!--<div class="add-btn btn" @click="handleAdd(1)">增加点</div>-->
      <div class="del-btn btn" style="">
        <i style="font-style: normal">编号：</i>
        <input type="text" v-model="delLineIndex">
        <i style="font-style: normal; margin-left: 10px;" @click="delLine(delLineIndex - 1)">删除线</i>
      </div>
    </div>
    <div class="list-scroll-container">
      <div class="line-location-list" v-for="(item, index) in lines" :key="index">
        <div class="item">
          <span>序号</span>
          <span>x</span>
          <span>y</span>
          <span>z</span>
          <span class="handle-col">
<!--              <i class="el-icon-circle-plus add-btn"></i>-->
            </span>
        </div>
        <div class="item" v-for="(itemPoint, indexPoint) in item" :key="indexPoint">
            <span>
              {{indexPoint + 1}}
            </span>
          <span>
              <input type="text" v-model="itemPoint.x">
            </span>
          <span>
              <input type="text" v-model="itemPoint.y">
            </span>
          <span>
              <input type="text" v-model="itemPoint.z">
            </span>
          <span class="handle-col">
              <i class="el-icon-remove delete-btn" @click="delPoint({lineIdx: index, pointIdx: indexPoint})"></i>
            </span>
        </div>
        <div class="add-point">
          <div>
            <span @click="addLineEndPoint(index)">添加端点</span>
            <span @click="renderAllScreen">重绘模型</span>
          </div>
          <div>
            <span>线编号</span>
            <span>{{ index + 1 }}</span>
            <span>
                <i class="el-icon-remove"
                   style="margin-right: 1px;
                   font-size: 18px;"
                   @click="delLine(index)"></i>
              </span>
          </div>
        </div>
      </div>
      <!--<div><span @click="addLineModel">添加线段</span></div>-->
    </div>
  </div>
</div>
</template>

<script>
// import {mapState} from 'vuex'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'HandleLineGroup',
  computed: {
    ...mapState('threeTool', {
      lines: state => state.lines
    })
  },
  data() {
    return {
      delLineIndex: 0
    }
  },
  methods: {
    ...mapMutations('threeTool', {
      addLine: 'ADD_LINE',
      delLine: 'DEL_LINE',
      addPoint: 'ADD_POINT',
      delPoint: 'DEL_POINT'
    }),
    renderAllScreen() {
      this.$emit('reset-line-view')
    },
    handleAdd(type) {
      if (type === 0) {
        // this.addLine([{x: 0, y: 0, z: 0}])
        this.addLine([{ x: 0, y: 0, z: 0 }])
      }
      // else if (type === 1) {
      //   // this.addPoint()
      //   this.$store.commit('ADD_POINT', {})
      // }
    },
    addLineEndPoint(idx) {
      this.lines[idx].push({ x: undefined, y: undefined, z: undefined })
    }
  }
}
</script>

<style lang="stylus" scoped>
.handle-line-group {
  height: 100%
  padding: 10px
  box-sizing: border-box;
  .add-point {
    i {
      font-style: normal;
    }
    input {
      display: inline-block;
      width: 60px;
      margin: 0 10px;
    }
  }
  .input-group{
    background-color: #333
    padding: 20px;
    width: 408px;
    position: absolute;
    color: #000;
    display: flex;
    flex-direction: column;
    height: calc(100% - 24px);
    box-sizing: border-box;
    box-shadow: -4px 4px 2px rgba(150, 150, 150, 0.8);
    .handle-btn-group {
      display: flex;
      font-size: 14px;
      line-height: 32px;
      margin-bottom: 6px;
      .btn {
        padding: 0 18px;
        border: 1px solid #d0d0d0;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #fff;
      }
      .line-count {
      }
      .add-btn {
        cursor: pointer;
        transition: color .3s;
        &:hover {
          color: #ff6969;
        }
      }
      .del-btn {
        cursor: pointer;
        &:hover {
          color: #ff6969;
          transition: color .3s;
        }
      }
      div {
        background-color: #222
        box-shadow -1px 1px 2px #000 inset
      }
    }
    input{
      width: 40px;
    }
    .line-location-list{
      margin-bottom: 10px;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      background-color: #222
      box-shadow -1px 1px 2px #000 inset
      .item{
        line-height: 24px;
        width: 340px;
        display: flex;
        span{
          flex: 1;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 2px 8px;
          &:nth-child(1){
            flex: none;
            width: 62px;
          }
          &.handle-col{
            flex: none;
            width: 41px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            .delete-btn {
              color: #fd4747;
            }
            .add-btn {
              color: #00c70c
            }
          }
        }
      }
    }
    .list-scroll-container{
      height: 100%;
      padding-right: 10px;
      overflow-y: scroll;
      box-sizing: border-box;
      color: #fff;
    }
  }
  .add-point{
    line-height: 28px;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    //writing-mode: tb-rl;
    span{
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
