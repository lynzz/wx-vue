<template>
  <nav class="navbar navbar-dark bg-inverse navbar-fixed-bottom">
    <a v-link="{name: 'course', params: {type: 'team'}}">团队课程</a>
    <a v-link="{name: 'course', params: {type: 'private'}}">私教课程</a>
    <a v-link="{name: 'course', params: {type: 'smallclass'}}">小班课程</a>
    <a v-link="{name: 'wallet'}">我的钱包</a>
    <a v-link="{name: 'order'}">我的订单</a>
  </nav>
</template>

<script>
module.exports = {
  data() {
    return {

    }
  }
}
</script>
