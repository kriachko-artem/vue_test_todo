<template>
 <main>
   <div class="list">
     <h1>Напоминания</h1>
     <TodoList
         v-bind:todoList="this.todos"
         v-on:remove-todo="removeTodo"
         v-on:setComplete="setComplete"
     />
     <h2 v-if="!todos.length">Пусто</h2>
     <CreateTodo
         v-if="isCreateTodoShowed"
         v-on:add-todo="addTodo"
         v-on:close-creator="setIsCreateTodoShowed"
     />
     <ButtonAddTodo v-bind:isShowed="isCreateTodoShowed"
                    v-if="!this.isCreateTodoShowed"
                    v-on:remove-todo="setIsCreateTodoShowed"
     />
   </div>
 </main>
</template>

<script>
// @ is an alias to /src
// import TodoList from "@/components/TodoList";
import {idb} from "@/api/idb"
import TodoList from "@/components/TodoList";
import CreateTodo from "@/components/CreateTodo";
import ButtonAddTodo from "@/components/ButtonAddTodo";
export default {
  name: 'HomeView',
  components: {
    ButtonAddTodo,
    CreateTodo,
    TodoList
    // TodoList,
  },
  props:{
    data: Array,
    columns: Array,
    filterKey: String,
    editName: String,
    deleteData: Function,
  },
  data(){
    return {
      todos:[],
      isCreateTodoShowed: false
    }
  },
  methods:{
    setIsCreateTodoShowed(){
      this.isCreateTodoShowed = !this.isCreateTodoShowed
    },
    setComplete(todo){
      this.todos.map(item=>{
         if (item.id === todo.id){
          item.completed = !item.completed
          idb.put(todo)
        }
      })
    },
    addTodo(todo){
      this.todos.push(todo)
      idb.put(todo)
      this.setIsCreateTodoShowed()
    },
    removeTodo(id){
      idb.delete(id)
      this.todos = this.todos.filter(item=>item.id !== id)
    },
  },
  mounted() {
    // console.log(localStorage.todoList)
    idb.init()
    idb.getAll().then(value=> {
      this.todos = value
    })
    // storageData?this.todos = JSON.parse(storageData):localStorage.setItem('todoList', '[]')
    
  }
}
</script>

<style scoped>
main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list{
  width: 50%;
}
ul{
}
.showForm{
  width: 100px;
  height: 100px;
  background-color: #42b983;
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
  border: none;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>