<template>
    <div id="map" class="container-map"></div> 
</template>
<script>
import AMap from 'AMap'
export default {
  data() {
    return {
      map: '',
      route: ''
    }
  },
  mounted() {
    this.loadMap()
  },
  props: {
    centerListCount: { type: Number },
    centerPathList: { type: Array }
  },
  watch: {
    centerListCount(newVal) {
      this.route.destroy()
      this.renderRoute()
    }
  },
  methods: {
    loadMap() { // 加载地图
      this.map = new AMap.Map('map', {
        resizeEnable: true
      })
      const that = this
      this.map.plugin('AMap.DragRoute', function() {
        that.renderRoute()
      })
    },
    renderRoute() { // 加载拖拽规划轨迹
      this.route = new AMap.DragRoute(this.map, this.centerPathList, AMap.DrivingPolicy.LEAST_FEE) // 构造拖拽导航类
      this.route.search() // 查询导航路径并开启拖拽导航
      AMap.event.addListener(this.route, 'complete', result => {
        this.$emit('changeCenter', this.route.getWays())
      })
    }
  }
}
</script>
