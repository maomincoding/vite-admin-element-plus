import store from '@/store';
import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design
export default function () {
  const $_isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const $_isShowSideBar = () => {
    const rect = body.getBoundingClientRect();
    return rect.width < 1400;
  };

  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isShowSideBar = $_isShowSideBar();
      if (isShowSideBar) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }

      const isMobile = $_isMobile();
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    }
  };

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler);
  });

  onMounted(() => {
    const isMobile = $_isMobile();
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile');
      store.dispatch('app/closeSideBar', { withoutAnimation: true });
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler);
  });
}
