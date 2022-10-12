<template>
  <div id="app">
    <div class="drag">
      <div class="funList">
        <draggable :group="{name:'Com',pull:'clone',put:false}" 
        class="dragarea" 
        touchStartThreshold='300px'
        :list="ComList" 
        :sort='false'
        :clone="handleCloneDog">
          <div v-for="element in ComList" 
          :key="element.id"
          class="Card"
          >{{element.name}}</div>
        </draggable>
      </div>
      <div class="dragList" ref="dragarea">
        <draggable class="dragarea" :group="'Com'" :list="DragList">
          <div ref="dragList"
          v-for="({name,id},index) in DragList" :key="id"
          class="comCard">
          {{
            addComList({
              props: { comItem: { name, id },},
              index
            })
          }}
          </div>
        </draggable>
        <!-- <button class="cancle-btn">cancle</button>
        <button class="delete-btn" @click="dele">delete</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CreateCom from "@/utils/generateCom.js"
export default {
  name: 'App',
  components: {
    draggable
  },
  data() {
    return {
      ComList:[
        {
          id:Math.random(),
          name:'ComA'
        },
        {
          id:Math.random(),
          name:'ComB'
        }
      ],
      DragList:[],
      comMap: new Map(),
    };
  },
  beforeDestroy() {
    this.comMap.clear();
  },
  // watch:{
  //   DragList(val){
  //     console.log(val)
  //   }
  // },
  methods: {
    addComList({ index, on = {}, props = { comItem: { name: "", id: 0 } } }){
      const {
        comItem: { id },
      } = props;
      this.$nextTick(() => {
        const childNodesLength = this.$refs.dragList[index].childNodes.length;
        const comLine = this.$refs.dragList.length;
        if (!this.comMap.get(id)) {
          const com = CreateCom({
            props,
            on: {
              handleDelete: this.handleDeleteCom,
              ...on
            },
          });
          com.$mount();
          if (childNodesLength === 2) {
            this.$refs.dragList.splice(
              index,
              0,
              this.$refs.dragList[comLine - 1]
            );
          }
          this.$refs.dragList[index].appendChild(com.$el);
          this.comMap.set(id,true);
        } else {
          return;
        }
      });
    },
    handleDeleteCom({ id }){
      const index = this.DragList.findIndex((item) => item.id === id);
      if (~index) {
        // 如果存在这个id的组件，就删除
        this.DragList.splice(index, 1);
      }
    },
    handleCloneDog(com) {
      if(!this.DragList.find(i=>{return i.name === com.name})){
        return{
          ...com,
          id:Math.random()
        }
      }else{
        return
      }
    },
  }
}
</script>

<style>
#app{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.drag{
  display: flex;
  width: 920px;
}
.funList{
  width: 300px;
  height: 500px;
  border: 1px dashed skyblue;
  border-radius: 20px;
  padding-top: 20px;
  box-sizing: border-box;
}
.dragList{
  width: 600px;
  height: 500px;
  border: 1px dashed skyblue;
  border-radius: 20px;
  margin-left: 20px;
  position: relative;
  box-sizing: border-box;  
}
.delete-btn{
  position: absolute;
  border: 1px solid skyblue;
  border-radius: 10px;
  bottom: 20px;
  right: 50px;
  outline: none;
  background: rgba(0, 0, 0,0);
}
.cancle-btn{
  position: absolute;
  border: 1px solid skyblue;
  border-radius: 10px;
  bottom: 20px;
  right: 120px;
  outline: none;
  background: rgba(0, 0, 0,0);
}
.dragarea{
  width: 100%;
  height: 460px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.Card{
  width: 100px;
  height: 100px;
  border: 1px solid rosybrown;
  margin:10px 0;
  box-sizing: border-box;
}
</style>
