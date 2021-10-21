import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { icon } = props;
    const renderItem = () => {
      if (icon) {
        return <span class={[`icon-${icon}`, 'iconfont', 'side-icon']}></span>;
      }
    };
    return () => {
      return renderItem();
    };
  },
});
