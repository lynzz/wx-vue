<template>
  <div class="course-date">
    <div class="course-day" v-for="date in dates" v-bind:class="{'active': date.active}" @click="handleDate(date.index, date.day)">
      <p>{{date.day}}</p>
      <p>{{date.week}}</p>
    </div>
  </div>
  <div class="course-list">
    <div class="course-item clearfix" v-for="item in items" >
      <a class="c1" v-link="{name: 'coach', params: {id: item.coachId}}"><img class="course-avatar img-circle" v-bind:src="item.coachAvatar"></a>
      <section class="c2">
        <h3>{{item.title}}</h3>
        <div class="course-tags">
          <span class="label label-pill label-default" v-for="tag in item.tags | tagsArray">{{tag}}</span>
          <button v-if="item.status == 1" type="button" class="btn btn-success-outline">预约</button>
          <button v-if="item.status == 2" type="button" class="btn btn-warning-outline">已满</button>
          <button v-if="item.status == 3" type="button" class="btn btn-secondary-outline">结束</button>
        </div>
        <div class="course-item-footer">
          <span class="time">{{item.timeRange}}</span>
          <span class="price">{{item.price}}元/节</span>
          <span class="info">{{item.description}}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
var moment = require('moment')

const DAYS_SHORT = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const STATUS_NAME = {
  '1': '预约',
  '2': '已满',
  '3': '结束'
}

module.exports = {
  data() {
    
    return {
      pageNo: 1,
      index: 0,
      items: [],
      totalCount: 0,
      totalPage: 0
    }
  },

  computed: {
    dates() {
      let curDate = moment().format('MM-DD');
      let curWeek = moment().format('E');
      let daysShort = DAYS_SHORT.slice(curWeek - 1).concat(DAYS_SHORT.slice(0, curWeek - 1));
      let index = this.index;

      return daysShort.map((week, i) => {
        let day = i == 0 ? curDate : moment().add(i,'days').format('MM-DD');

        return {
          index: i,
          day: day,
          active: i === index,
          week: week
        };

      });
    }
  },

  ready() {
    this.fetch();
  },

  methods: {
    fetch() {
      this.$http.get('/api/course/list', {pageNo: 1, type: this.$route.params.type}).then((res) => {
        let data = res.data.data;

        if (res.data.success) {
          this.$set('items', data.listData);
          this.$set('totalCount', data.totalCount);
          this.$set('totalPage', Math.ceil(data.totalCount/this.pageSize));
        }
      })

    },
   
    handleDate(index, day) {
      this.$set('index', index);
      console.log(day);
    }
  },

  filters: {
    tagsArray(tags) {
      return tags.split(',')
    }
  }
}
</script>
