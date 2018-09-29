<template>
    <div class="container-city">
        <div class="icon-search" @click="showSearch"></div>
        <transition name="search">
            <div class="box-search" v-if="isShowSearch">
                <el-select v-model="escortType.value" placeholder="请选择" class="item-search escortType-box">
                    <el-option
                    v-for="item in escortType.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="province.value" v-if="province.show" placeholder="请选择省" class="item-search">
                    <el-option
                    v-for="item in province.options"
                    :key="item.addressName"
                    :label="item.addressName"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="city.value" v-if="city.show" placeholder="请选择市" class="item-search" @change="changeCity">
                    <el-option
                    v-for="item in city.options"
                    :key="item.addressName"
                    :label="item.addressName"
                    :value="{id:item.id, addressCode:item.addressCode}">
                    </el-option>
                </el-select>
                <el-select v-model="area.value" v-if="area.show" placeholder="请选择" class="item-search" @change="changeArea">
                    <el-option
                    v-for="item in area.options"
                    :key="item.addressName"
                    :label="item.addressName"
                    :value="{id:item.id, addressCode:item.addressCode}">
                    </el-option>
                </el-select>
                <el-select v-model="car.value" placeholder="请选择" class="item-search">
                    <el-option
                    v-for="item in car.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" class="btn-search" @click="toSearch">查询</el-button>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isShowSearch: false // 是否显示查询框
    }
  },
  props: {
    escortType: Object,
    province: Object,
    city: Object,
    area: Object,
    car: Object
  },
  methods: {
    showSearch() { // 显示查找框
      this.isShowSearch = !this.isShowSearch
    },
    changeCity(val) { // 选择城市
      this.returnInfo(val, '2')
    },
    changeArea(val) { // 选择区
      this.returnInfo(val, '3')
    },
    returnInfo(val, type) { // 返回给父组件数据
      const info = {
        id: val.id,
        type: type
      }
      this.$emit('changeId', info)
    },
    toSearch() { // 点击查询
      this.$emit('toSearch', true)
    }
  }
}
</script>
<style lang="scss">
@import '../../../styles/variables.scss';
.container-city{
    position: absolute;
    top: 160px;
    left: 30px;
    z-index: 2;
    overflow: hidden;
    width: 100%;
    height: 58px;
    border-radius: 30px;
}
.icon-search{
    display: inline-block;
    width: 58px;
    height: 58px;
    background: url(../../../assets/img/search.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 5px 0 10px rgba(0,0,0,0.2);
    border-radius: 50%;
    z-index: 2;
}
.box-search{
    display: inline-block;
    background: #fff;
    height: 58px;
    border-radius: 30px;
    padding: 12px 40px 12px 80px;
}
.item-search{
    width: 110px;
    margin-right: 15px;
}
.escortType-box{
    width: 150px;
}
.btn-search{
    width: 95px;
}
.search-enter-active, .search-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.search-enter, .search-leave-to {
    transform: translateX(-500px);
    opacity: 0;
}
</style>
