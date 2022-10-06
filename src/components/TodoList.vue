<template>
<ul>
  <TodoItem v-for="(todo,index) in todoList"
            v-bind:todo = todo
            v-bind:index = index+1
            v-on:remove-todo="removeTodo"
            v-on:close-creator="$emit('close-creator')"
            v-on:setComplete="setComplete"
            :key = index
  />
</ul>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: "TodoList",
  components: {TodoItem},
  methods:{
    removeTodo(id){
      this.$emit('removeTodo', id)
    },
    setComplete(todo){
      this.$emit('setComplete',todo)
    }

  },
  data(){
    return {cards: this.todoList}
  },
  props:{
    todoList: {
      type: Object,
      requirement: true,
    }
  }
}
</script>

<style scoped>
ul{
  padding: 0;
  list-style: none;
}
</style>