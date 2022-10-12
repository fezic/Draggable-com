<template>
  <div class="dragCom">
    <div class="content" @click="fun">ComA</div>
    <span @click="handleDelete">x</span>
  </div>
</template>

<script>
export default {
  name: "ComB",
  data() {
    return {
      comDetail: this.comItem,
    };
  },
  props: {
    comItem: {
      type: Object,
      default() {
        return {
          id: 0,
          name: "",
        };
      },
    },
  },
  computed: {
  },
  mounted() {

  },
  watch: {
    comItem(val) {
      this.comDetail = val;
      return val;
    },
  },
  methods: {
    fun() {
      alert("Function from ComA");
    },
    handleDelete() {
      this.$el.remove();
      this.$emit("handleDelete", this.comDetail);
    },
  },
};
</script>

<style scoped>
.content {
  width: 100px;
  height: 100px;
  border: 1px solid rosybrown;
  margin: 10px;
  color: #fff;
  background-color: #f3e3e3;
  text-align: center;
  line-height: 100px;
}
.dragCom {
  position: relative;
}
span {
  position: absolute;
  color: #ed4014;
  top: 0px;
  right: 0px;
}
</style>