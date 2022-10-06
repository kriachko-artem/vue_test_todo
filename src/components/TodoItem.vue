<template>
<li v-bind:class="{'done':todo.completed}" class="item">
  <input type="checkbox"
         v-on:change="$emit('setComplete',todo)"/>
  <span>
      <strong>{{index}}</strong>
    {{ todo.title }}
  </span>
  <button class="remove" v-on:click="$emit('remove-todo', todo.id)">&times;</button>
</li>
</template>

<script>
export default {
  name: "TodoItem",
  data(){
    return {
    }

  },
  mounted() {
    // this.self = document.querySelectorAll('li')
    // gsap.from(this.self,{
    //   scale: 0,
    //   duration: 2,
    //   ease: "elastic.out(1, 0.8)",
    // })
  },
  methods:{
  },
  props:
      {
        todo:{
          type: Object,
          required: true,
        },
        index: Number
      },
}
</script>

<style scoped>
.item{
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #42b983;
  display: flex;
  align-items: center;
}
span{
  flex: 1;
}
span strong{
  margin: 0 10px;
}
  .done{
    opacity: 0.5;
  }
  .done span{
    text-decoration: line-through;
  }
  .remove{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
  }
</style>