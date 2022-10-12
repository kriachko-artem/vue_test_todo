<template>
  <SidebarMenu
      v-if="this.isReady"
      v-bind:tables="this.tables"
      v-bind:chosenCategory="chosenCategory"
      v-on:updateTable="updateTables"
      v-on:setChosenCategory="setChosenCategory"
      v-on:removeCategory="removeCategory"
  />
 <main>
   <div class="list">
     <h1>Напоминания</h1>
     <TodoList
         v-if="this.isReady"
         v-bind:todoList="this.chosenTodos"
         v-on:remove-todo="removeTodo"
         v-on:setComplete="setComplete"
     />
     <h2 v-if="!todos.length">Пусто</h2>
     <CreateTodo
         v-if="isCreateTodoShowed"
         v-bind:tables="tables"
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
import SidebarMenu from "@/views/SidebarMenu";
export default {
  name: 'HomeView',
  components: {
    SidebarMenu,
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
      tables: [],
      chosenTodos: [],
      chosenCategory: 1,
      isCreateTodoShowed: false,
      isReady: false,
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
          idb.mode(todo)
        }
      })
    },
    setChosenCategory(categoryId){
      this.chosenCategory = categoryId
      this.updateList()
    },
    updateList(){
      if (this.chosenCategory===1){
        this.chosenTodos = this.todos
      } else this.chosenTodos = this.todos.filter(item=>item.category===this.chosenCategory)
    },
    addTodo(todo){
      this.todos.push(todo)
      idb.put(todo)
      this.setIsCreateTodoShowed()
      this.updateList()
    },
    removeTodo(id){
      idb.delete(id)
      this.todos = this.todos.filter(item=>item.id !== id)
      this.updateList()
    },
    removeCategory(id){
      this.setChosenCategory(1)
      idb.deleteTable(id)
      this.todos = this.todos.filter(item=>{
        if (item.category === id){
          idb.delete(item.id)
        }
        return item.category !== id
      })
      this.updateTables()
    },
    updateTables(){
      idb.getTables().then(value => this.tables = value)
    }
  },
  mounted() {
    // console.log(localStorage.todoList)
    idb.init()
    idb.getAll().then(value=> {
      this.todos = value
      idb.getTables().then(value => {
        this.tables = value;
        this.setChosenCategory(1)
        this.updateList()
        this.isReady = true;
          }
      )
    })
  }
}
</script>

<style scoped>
main{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>