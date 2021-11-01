<template>
  <div class="line-views">
    <el-dialog
      title="放大"
      :visible.sync="centerDialogVisible"
      append-to-body
      @opened="dialogRender"
      top="8vh"
      width="1050px"
      height="60%"
      center>
      <div>
        <lineView class="dialog-view"
                  ref="lineViewDialog"
                  no-magnify
                  controller
                  :size="{w: 1000, h: 700}"
                  :is-ortho="fullOptions.isOrtho"
                  :dir="fullOptions.dir"></lineView>
      </div>
      <!--<span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
    <div class="left">
      <HandleLineGroup @reset-line-view="initViews"></HandleLineGroup>
    </div>
    <div class="right">
      <div ref="lineView" class="view">
        <!--前视图-->
        <lineView ref="lineView1"
                  :size="viewSize"
                  is-ortho
                  :dir="1"
                  @open-dialog="openFullDialog"></lineView>
      </div>
      <div class="view">
        <!--左视图-->
        <lineView ref="lineView2"
                  :size="viewSize"
                  :dir="2"
                  is-ortho
                  @open-dialog="openFullDialog"></lineView>
      </div>
      <div class="view">
        <!--顶视图-->
        <lineView ref="lineView3"
                  :size="viewSize"
                  is-ortho
                  :dir="3"
                  @open-dialog="openFullDialog"></lineView>
      </div>
      <div class="view">
        <!--自由视角-->
        <lineView ref="lineView4"
                  :size="viewSize"
                  :dir="0"
                  controller
                  @open-dialog="openFullDialog"></lineView>
      </div>
    </div>
  </div>
</template>

<script>
import lineView from '../../components/LineView/LineView.vue'
import HandleLineGroup from '../../components/HandleLineGroup/HandleLineGroup.vue'
export default {
  name: 'Channel1',
  components: {
    lineView, HandleLineGroup
  },
  methods: {
    dialogRender() {
      this.$refs.lineViewDialog.render()
      this.$refs.lineViewDialog.animate()
    },
    openFullDialog(v) {
      this.centerDialogVisible = true
      this.fullOptions.dir = v
      this.fullOptions.isOrtho = true
      if (!v) {
        this.fullOptions.isOrtho = false
      }
    },
    initViews() {
      this.viewSize.h = this.$refs.lineView.clientHeight
      this.viewSize.w = this.$refs.lineView.clientWidth
      for (let i = 1; i < 5; i++) {
        this.$refs['lineView' + i].render()
        this.$refs['lineView' + i].animate()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          // this.$store.state.threeTool.lines.push()
          this.$store.state.threeTool.lines.forEach(
            (item, index) => {
              console.log(item)
              console.log(index)
              if (index !== 0) {
                item.push({ x: item[i].x, y: item[i].y - Math.random() * 1.5, z: 40 - i * 10 })
              } else {
                item.push({ x: item[i].x - 5.5, y: item[i].y - Math.random() * 1.5, z: 40 - i * 10 })
              }
              // if(index%8 === 0) {
              //   item.push({x: (Math.random()-0.49)*120, y: (Math.random()*10)*i, z: 40 - i*10 })
              // } else if(index%8 === 3) {
              //   item.push({x: (Math.random()-0.49)*30, y: (Math.random()-0.49)*30, z: 40 - i*10 })
              // } else if(index%8 === 6) {
              //   item.push({x: (Math.random()-0.49)*20, y: (Math.random()-0.49)*20, z: 40 - i*10 })
              // } else {
              //   item.push({x: (Math.random()-0.49)*10, y: (Math.random()-0.49)*10, z: 40 - i*10 })
              // }
            }
          )
          this.initViews()
        }, 400 * i)
      }
    })
  },
  data() {
    return {
      viewSize: {},
      centerDialogVisible: false,
      fullOptions: {
        isOrtho: true,
        dir: null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.line-views {
  display: flex;
  height: 100vh;
  background-color: #dcdcdc
  overflow: hidden;
  .left {
    width: 415px
  }
  .right {
    flex: 1
    overflow: hidden;
    height: 100%
    display: flex
    flex-wrap wrap
    padding: 10px
    box-sizing border-box
    padding-top: 5px
    .view {
      flex: 1
      min-width 48%
      display: block
      box-sizing: border-box;
      margin: 5px
      box-shadow: -4px 4px 2px rgba(150, 150, 150, 0.8);
    }
  }
  .dialog-view {
    background-color: #333
    box-shadow: -4px 4px 2px rgba(150, 150, 150, 0.8);
  }
}
</style>
