
import ComA from "@/components/ComA"
import ComB from "@/components/ComB"
import Vue from "vue";
const _comMap = {
  ComA,
  ComB
};
const ReturnNewCom = function ({ props = { comItem: { name: "", id: 0 } }, on={} }) {
  const {
    comItem: { name },
  } = props;
  const newComponent = Vue.extend({
    render(createElement) {
      // 使用传进来的组件name来决定渲染哪一个组件。
      return createElement(_comMap[name], {
        props,
        on,
      });
    },
  });
  return new newComponent();
};
 
export default ReturnNewCom;