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
                <el-select v-model="city.value" v-if="city.show" placeholder="请选择市" class="item-search" @change="changeCity" value-key="id">
                    <el-option
                    v-for="item in city.options"
                    :key="item.id"
                    :label="item.addressName"
                    :value="{id:item.id, addressCode:item.addressCode}">
                    </el-option>
                </el-select>
                <el-select v-model="area.value" v-if="area.show" placeholder="请选择" class="item-search" @change="changeArea"  value-key="id">
                    <el-option
                    v-for="item in area.options"
                    :key="item.id"
                    :label="item.addressName"
                    :value="{id:item.id, addressCode:item.addressCode}">
                    </el-option>
                </el-select>
                <el-select v-model="car.value" placeholder="请选择" class="item-search">
                    <el-option
                    v-for="item in car.options"
                    :key="item.id"
                    :label="item.cph"
                    :value="item.id">
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
    overflow: hidden;
    width: 100%;
    height: 36px;
    border-radius: 30px;
    display: flex;
}
.icon-search{
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url(../../../assets/img/search.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
    z-index: 1;
}
.box-search{
    margin-left: -25px;
    padding-left: 50px;
    height: 36px;
    border-radius: 0 30px 30px 0;
    padding-right: 40px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background: rgba(16,93,129,0.5);
}
.box-search .el-input--small .el-input__inner{
    height: 26px;
    border: solid 1px #157cac;
    background: none;
    color: #fff;
}
.item-search{
    width: 110px;
    margin-right: 10px;
}
.escortType-box{
    width: 130px;
}
.btn-search{
    width: 90px;
    height: 26px;
    background: #157cac;
    border-color: #157cac;
    padding: 0;
}
.search-enter-active, .search-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.search-enter, .search-leave-to {
    transform: translateX(-500px);
    opacity: 0;
}
</style>
