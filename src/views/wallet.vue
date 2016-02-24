<template>
  <div class="wallet-person">
    <div class="wallet-person-bg">
      <img class="img-circle" v-bind:src="walletData.avatar" @click="handleAvatar"></img>
      <div class="wallet-person-name">{{walletData.name}}</div>
      <div class="wallet-person-level">{{walletData.level}}</div>
    </div>
    <div class="wallet-person-info">
      <dl class="cell">
        <dt>余额</dt>
        <dd>{{walletData.balance}}</dd>
      </dl>
      <dl class="cell">
        <dt>体验券</dt>
        <dd>{{walletData.spa}}</dd>
      </dl>
      <dl class="cell">
        <dt>积分</dt>
        <dd>{{walletData.integration}}</dd>
      </dl>
    </div>
  </div>
  <div class="wallet-bind">
    <div class="wallet-bind-header">绑定年卡享受特权 
      <span v-if="walletData.hasPrivilege">已绑定</span>
      <a v-else href="javascript:;" @click="showPrivilegeForm = true" v-show="!showPrivilegeForm">绑定</a>
    </div>
    <div class="wallet-bind-form" v-show="showPrivilegeForm">
      <form class="form-inline">
        <div class="form-group">
          <input type="text" class="form-control">
          <button class="btn btn-default" type="button">绑定</button>
        </div>
      </form>
    </div>
  </div>
  <div class="wallet-profile">
    <div class="wallet-profile-header">
      修改个人资料
      <a href="javascript:;" @click="showProfileForm = true" v-show="!showProfileForm">编辑</a>
      <a href="javascript:;" v-show="showProfileForm">返回</a>
    </div>
    <form v-show="showProfileForm">
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">昵称：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">手机号码：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">出生年月：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">姓别：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 form-control-label">地址：</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-secondary">确认修改</button>
        </div>
      </div>
    </form>
  </div>
  <div class="wallet-action">
    <button class="btn btn-default">充值</button>
    <button class="btn btn-default">查看消费记录</button>
  </div>

  <h3>说明：</h3>
  <ul class="wallet-explain">
    <li>1、充值满500送80、满2000送500；</li>
    <li>2、每个月预约健身满10天，奖励100元；</li>
    <li>3、充值满3000即可开通高级会员服务，享受所有课程85折优惠。</li>
  </ul>
  <menu/>
</template>

<script>
  import Menu from '../components/nav.vue'

  const wx = require('wx');
  
  export default {
    data() {
      return {
        walletData: {},
        showPrivilegeForm: false,
        showProfileForm: false
      }
    },

    route: {
      data(transition) {
        this.fetch();
      }
    },

    methods: {
      fetch() {
        this.$http.get('/api/wallet/get').then((res) => {
          if (res.data.success) {
            this.walletData = res.data.data;
          }
        })
      },
      handlePrivilege() {
        this.$set('showPrivilegeForm', true);
      },
      handleAvatar() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(res);
          }
        });
      }
    },

    components: {
      Menu
    }
  }
</script>
