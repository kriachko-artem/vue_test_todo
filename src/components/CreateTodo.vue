<template>
  <form @submit.prevent="onSubmit">
    <div class="top">
      <div class="input">
        <input type="text"
               autofocus
               v-model="title"
               id="title"
               v-on:input="setIsOnChange"
        >
        <label v-bind:class="{'hidden':isFilled}"
               for="title"
               style=""
        >Что нужно сделать...</label>
      </div>
      <button 
          class="close"
          v-on:click="$emit('close-creator')">&times;
      </button>
    </div>
    <div class="bottom">
      <label for="categories">Выберите категорию:</label>
      <select v-on:change="setCategory"
              id="categories">
        <option v-for="(cat,index) in categories"
                :key="index"
                >{{cat.title}}</option>
      </select>
    </div>
  </form>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "CreateTodo",
  props:{
    tables: {type:Array}
  },
  data(){
    return{
      title: '',
      categories: Array.from(this.tables),
      chosenCategory: JSON.parse(JSON.stringify(this.tables[0])),
      chosenCategory_1: null,
      isFilled: false,
    }
  },
  methods: {
    setCategory(event){
      this.chosenCategory = this.categories.find(item=>item.title === event.target.value)
    },
    onSubmit(){
      if (this.title.trim()){
        const todo = {
          id: Date.now(),
          title: this.title,
          completed: false,
          category: this.chosenCategory.id
        };
        this.$emit('add-todo',todo)
        this.title = ''
      }
    },
    setIsOnChange(){
      this.isFilled = Boolean(this.title)
    }
  },
  mounted() {
    const form = document.querySelector('form')
    gsap.from(form,{
      scale: 0,
      duration: 1,
      ease: "elastic.out(1, 0.9)",
    })
  }
}
</script>

<style scoped>
form{
  width: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #42b983;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: rgba(66, 185, 131, 0.31);
  gap: 20px;
}
form > div{
  display: flex;
  justify-content: space-between;
}
.input{
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.input input{
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: 0.5s;
  border-bottom: 1px solid transparent;
}
.input input:focus-visible{
  outline: none;
  border-bottom: 1px solid #ffd500;
}
.input label.hidden{
  transform: translateY(-100px);
}
.input label{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  font-size: 15px;
  transition: 0.5s;
}
.add{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
}
.close{
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
select{
  background: none;
  border-radius: 5px;
  text-align: center;
}
select:focus-visible{
  outline: none;
}
</style>