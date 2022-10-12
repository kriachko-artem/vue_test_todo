<template>
  <aside v-on:click="check">
    <nav>
      <ul>
        <li v-for="(table,index) in tables"
            v-bind:class="{'active':table.id===this.chosenCat}"
            v-on:click="setChosen(table.id)"
           :key="index"
        >{{table.title}}
          <button v-if="table.id!==1" class="remove" v-on:click="remove(table.id)">&times;</button>
        </li>
      </ul>
    </nav>
    <CreateTable
        v-if="isCreation"
        v-on:createTable="createTable"
        v-on:close-creator="setIsCreation"
    />
    <button class="create"
        v-if="!isCreation"
        v-on:click="setIsCreation">Create new list</button>
  </aside>
</template>
<script>
import CreateTable from "@/components/CreateTable";
import {idb} from "@/api/idb";

export default {
  name: "SidebarMenu",
  components: {CreateTable},
  props: {
    tables:{
      type: Object
    },
    chosenCategory: {
      type: Number,
      required: true,
    }
  },
  data(){
    return {
      chosenCat: this.chosenCategory,
      chosen: this.tables.find(item=>item.id===this.chosenCategory),
      isCreation: false
    }
  },
  methods:{
    setChosen(category){
      this.chosenCat = category
      this.$emit('setChosenCategory',category)
    },
    createTable(table){
      idb.createNewTable(table)
      this.setIsCreation()
      this.$emit('updateTable')
    },
    setIsCreation(){
      this.isCreation = !this.isCreation
    },
    remove(id){
      event.stopPropagation()
      this.$emit('removeCategory', id)
      this.setChosen(1)
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
aside{
  padding: 25px;
  width: 35%;
  height: 100vh;
  background-color: #d7fdeb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #212121;
}
nav{
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
}
ul{
  margin: unset;
  padding: unset;
  list-style: none
}
li{
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  text-decoration: none;
  color: #212121;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 20px;
}
li:not(:last-child){
  border-bottom: 1px solid #dbdbdb;
}
li.active{
  background-color: #dbdbdb;
  border-bottom: 1px solid transparent;
}
.create{
  border-radius: 15px;
  background-color: #6fffb6;
  border: none;
  padding: 10px 15px;
  color: #fff;
  font-size: 20px;
}
.remove{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
}
</style>