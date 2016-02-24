<template>
  <swipe :auto="0" class="coach-swipe">
    <swipe-item v-for="item in coachData.images">
      <img v-bind:src="item.url" alt="{{item.title}}">
    </swipe-item>
  </swipe>
  <div class="coach-profile">
    <img v-bind:src="coachData.avatar">
    <div class="coach-info">
      <h3>{{coachData.name}}</h3>
      <p>{{coachData.description}}</p>
    </div>
  </div>
  <dl class="coach-crowd">
    <dt>适用人群</dt>
    <dd>{{coachData.crowd}}</dd>
  </dl>
  <dl class="coach-effect">
    <dt>训练效果</dt>
    <dd>{{coachData.effect}}</dd>
  </dl>
</template>

<script>
import {Swipe, SwipeItem} from 'vue-swipe'

export default {
  data() {
    return {
      coachData: {}
    }
  },
  route: {
    data(transition) {
      this.getCoach();
    }
  },
  methods: {
    getCoach() {
      this.$http.get('/api/coach/get', {id: this.$route.params.id}).then(res => {
        if (res.data.success) {
          this.coachData = res.data.data;
        }
      });
    }
  },
  components: {
    Swipe,
    SwipeItem
  }
}
</script>
