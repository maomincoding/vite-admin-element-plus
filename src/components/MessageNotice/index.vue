<template>
  <div class="message-notice">
    <span class="iconfont icon-tongzhi"></span>
    <span class="message-tit">通知消息：</span>
    <template v-if="list.length > 0">
      <transition-group name="list" tag="ul" class="notice-list" id="notice-box">
        <li v-for="(item, index) in list" :key="index" id="item" @click="noticeDeatil(item.id)">
          <span class="item-inner-txt">{{ returnMessage(item) }}</span>
          <span class="time">{{ item.time }}</span>
        </li>
      </transition-group>
      <div class="prompt" @click="moreNotice">MORE >></div>
    </template>
    <div class="default-text" v-else>暂无</div>
    <!-- 报警弹窗 -->
    <dialogbox :width="'40%'" v-model:status="alarmView">
      <template v-slot:header>
        <div class="alarm-header"><span class="iconfont icon-baojing"></span></div>
      </template>
      <template v-slot:default>
        <form-item :data="alarmData" :isAlarm="true" />
      </template>
    </dialogbox>
    <!-- 报警列表 -->
    <dialogbox :width="'50%'" v-model:status="alarmListView">
      <template v-slot:header>
        <p style="text-align: center" v-if="!alarmListDeatails">报警列表</p>
        <div class="alarm-header" v-else>
          <span class="iconfont icon-fanhui" @click="useBackAlarmList"></span>
          <span class="iconfont icon-baojing"></span>
        </div>
      </template>
      <template v-slot:default>
        <AlarmList v-if="!alarmListDeatails" @rowClick="useRowClick"></AlarmList>
        <form-item :data="alarmData" :isAlarm="true" v-else />
      </template>
    </dialogbox>
  </div>
</template>

<script>
import Dialogbox from '@/components/Dialogbox';
import FormItem from '@/components/FormItem';
import AlarmList from '@/components/Tablebox/alarmList.vue';

export default {
  name: 'MessageNotice',
  components: {
    Dialogbox,
    FormItem,
    AlarmList,
  },
  data() {
    return {
      alarmView: false,
      alarmListView: false,
      alarmListDeatails: false,
      alarmData: [
        {
          name: '报警位置',
          txt: '区域名称+楼层/子区域+开关名称（照明）/设备名称（设备）',
        },
        {
          name: '负载类型',
          txt: '电梯',
        },
        {
          name: '开关状态',
          txt: '分断',
        },
        {
          name: '开关类型',
          txt: '3P带漏电保护',
        },
        {
          name: '报警类型',
          txt: '过压预警',
        },
        {
          name: '报警程度',
          txt: '橙色预警',
        },
        {
          name: '报警时间',
          txt: '2021-09-15 15:15:15',
        },
      ],
      ratio: 1,
      alarmId: '',
      list: [],
    };
  },
  watch: {
    list: {
      handler: function () {
        if (this.list.length > 1) {
          this.$nextTick(() => {
            document.getElementById('item').classList.add('new-alarm');
            setTimeout(() => {
              this.scroll('notice-box', 36 * this.ratio, 5000);
            }, 30000);
          });
        }
      },
      deep: true,
    },
  },
  computed: {
    returnMessage() {
      return function (obj) {
        let str = `${obj.equipmentName}，${obj.equipmentLoca}，${obj.alarmTypeName}`;
        return str;
      };
    },
  },
  created() {
    this.ratio = document.body.clientWidth / 1920;
  },
  mounted() {
    setTimeout(() => {
      this.list = [
        {
          id: '08d91520-d3eb-4915-8585-defb4788c4fd',
          time: '2021-08-13',
          equipmentName: '客梯C',
          equipmentLoca: '1楼大厅左侧',
          alarmTypeName: '故障报警',
          newTag: true,
        },
        {
          id: '08d91520-d3eb-4915-8585-defb4788c4fd',
          time: '2021-08-13',
          equipmentName: '客梯A',
          equipmentLoca: '2楼大厅左侧',
          alarmTypeName: '故障报警',
          newTag: false,
        },
      ];
    }, 5000);
  },
  methods: {
    scroll(id, _h, interval) {
      /*
       * notice 父容器(ul)的
       * _h 子元素li的高度
       * interval  滚动间隔时间
       * transition 轮播动画时间
       */
      let dom = document.getElementById(id);
      let _heigth = '-' + _h + 'px';
      let _field = dom.firstElementChild;
      _field.style.marginTop = _heigth;

      if (this.timer !== null) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        let _field = dom.firstElementChild;
        _field.style.marginTop = '0px';
        dom.appendChild(_field);
        let _fields = dom.firstElementChild;
        _fields.style.marginTop = _heigth;
      }, interval);
      document.getElementById('item').classList.remove('new-alarm');
    },
    //通知详情
    noticeDeatil() {
      this.alarmView = true;
    },
    //更多通知
    moreNotice() {
      this.alarmListView = true;
    },
    useRowClick() {
      this.alarmListDeatails = !this.alarmListDeatails;
    },
    // 返回报警列表
    useBackAlarmList() {
      this.alarmListDeatails = !this.alarmListDeatails;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.alarm-header {
  height: 60px;
  position: relative;
}
.icon-baojing {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  color: #f26a4f;
}
.icon-fanhui {
  cursor: pointer;
  font-size: 26px;
  color: #999999;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.icon-tongzhi {
  color: #999999;
  font-size: 22px;
  margin-right: 10px;
}
.item-inner-txt {
  font-size: 16px;
  margin-right: 30px;
  font-family: 'PuHuiTi';
  font-weight: 400;
}
.message-tit {
  font-weight: 400;
  color: #999999;
  line-height: 14px;
  font-size: 16px;
}
.message-notice {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 60px;
  font-size: 14px;
  color: #333333;
  .notice-list {
    max-width: 450px;
    height: 36px;
    overflow: hidden;
  }
  .notice-list li {
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    white-space: nowrap; /* 设置内容不换行； */
    text-overflow: ellipsis; /* 设置超出内容为省略号 */
  }
  .notice-list li:first-child {
    margin-top: 0;
    transition: margin-top 1s;
  }
  .prompt,
  .time {
    font-size: 16px;
    cursor: pointer;
  }
  .time {
    margin-right: 5px;
  }
  .prompt {
    margin-left: 20px;
  }
  .default-text {
    font-size: 16px;
  }
  .new-alarm {
    color: red;
  }
}
</style>
