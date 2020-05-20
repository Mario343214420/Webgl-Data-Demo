<template>
  <div class="tags-view-container">
    <b-tabs v-model="activeTab" :data="tabs" type="tag"
            closable context-menu ref="tabs"
            @on-tab-close="handleCloseTab"
            @on-tab-select="handleSelect">
      <template v-slot:menu>
        <li v-if="isActive" @click="refreshSelected">
          <b-icon name="ios-refresh" size="14"></b-icon>
          刷新
        </li>
        <li @click="closeOthers">
          <b-icon name="ios-close-circle-outline" size="14"></b-icon>
          关闭其他
        </li>
        <li @click="closeAll">
          <b-icon name="ios-close-circle" size="14"></b-icon>
          关闭所有
        </li>
      </template>
    </b-tabs>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import path from 'path'

  export default {
    name: 'TagsView',
    data () {
      return {
        selectedTag: {}, // 选中的tag
        activeTab: ''
      }
    },
    computed: {
      ...mapGetters(['visitedViews', 'routers']),
      // tabs标签，根据显示的views来做格式化，主要追加key，title以及noClose属性用于配合显示tab
      tabs () {
        return this.visitedViews.map(t => {
          if (t.meta.affix) {
            return {
              key: t.name,
              title: t.meta.title,
              path: t.path,
              noClose: t.meta.affix
            }
          }
          return {
            key: t.name,
            title: t.meta.title,
            path: t.path
          }
        })
      },
      isActive () {
        return this.selectedTag.path === this.$route.path || this.selectedTag.key === this.$route.name
      }
    },
    watch: {
      $route () {
        this.addTags()
        // this.moveToCurrentTag()
      },
      activeTab (tab) {
        if (tab && tab.length > 0) {
          if (tab !== this.$route.name) {
            this.$router.push({ name: tab })
          }
        } else {
          if (this.tabs.length === 1) {
            this.$message({ content: '仅剩一个标签不可关闭!', type: 'danger' })
            return
          }
          this.$router.push('/')
        }
      }
    },
    mounted () {
      this.initTags()
      this.addTags()
    },
    methods: {
      // 初始化tags 先增加默认固定的tag
      initTags () {
        const affixTags = this.affixTags = this.filterAffixTags(this.routers)
        for (const tag of affixTags) {
          // 循环遍历固定Tags
          // Must have tag name
          if (tag.name) {
            this.$store.dispatch('addView', tag)
          }
        }
      },
      // 过滤固定的tags（即过滤meta中设置affix固定的菜单路由）
      filterAffixTags (routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      // 增加tags，根据路由名称增加view
      addTags () {
        const { name } = this.$route
        // 如果存在name切并不是刷新操作则添加一个view
        if (name && name !== 'refresh') {
          this.$store.dispatch('addView', this.$route)
          this.selectTag()
        }
        return false
      },
      // 移动到当前的tag
      selectTag () {
        for (const tab of this.tabs) {
          // 找到切换到的目标path和路由匹配的
          if (tab.key === this.$route.name) {
            // 当切换不同的路径，则更新当前路径
            this.$nextTick(() => {
              this.activeTab = tab.key
            })
            break
          }
        }
      },
      // 删除当前tab标签
      handleCloseTab (tab) {
        if (this.tabs.length === 1 && this.tabs[0].key === tab.key) {
          return
        }
        this.$store.dispatch('delView', tab)
      },
      // ===============右键菜单事件=============
      // 缓存右键选中的tab
      handleSelect (tab) {
        this.selectedTag = { ...tab }
      },
      // 刷新当前view
      refreshSelected () {
        // 先删除缓存的view
        this.$store.dispatch('delCachedView', this.selectedTag).then(() => {
          this.$nextTick(() => {
            this.$router.replace('/refresh')
          })
        })
      },
      // 关闭其他tags
      closeOthers () {
        // 利用key至触发跳转路由
        this.activeTab = this.selectedTag.key
        this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
          this.$refs.tabs.moveToCurrentTab()
        })
      },
      // 关闭所有
      closeAll () {
        this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
          if (this.affixTags.length > 0) {
            this.activeTab = this.affixTags[this.affixTags.length - 1].name
          }
          this.$refs.tabs.moveToCurrentTab()
        })
      }
    }
  }
</script>
