<template>
  <button class="showForm closed"
          v-on:click="$emit('remove-todo')">
    New
  </button>
</template>

<script>
import {gsap} from "gsap";
export default {
  name: "ButtonAddTodo",
  mounted() {
    const button = document.querySelector('.showForm');
    const buttonParams = {};
    function moveButton(event){
      gsap.to(button,{
        bottom: 20,
        translateX: buttonParams.fromCenterX + event.offsetX,
        translateY: buttonParams.fromCenterY + event.offsetY,
        duration: 1,
        ease: "power4.out",
      })
    }
    button.addEventListener('mouseenter',function (event){
      buttonParams.fromCenterX = -(button.clientWidth/2)
      buttonParams.fromCenterY = -(button.clientHeight/2)

      moveButton(event)
      button.addEventListener('mousemove',moveButton)
    })
    button.addEventListener('touch',(event)=>{
      buttonParams.fromCenterX = -(button.clientWidth/2)
      buttonParams.fromCenterY = -(button.clientHeight/2)
      moveButton(event)
    })
//Отлипание кнопки от курсора
    button.addEventListener('mouseleave',()=>{
      button.removeEventListener('mousemove',moveButton)
      gsap.to(button,{
        bottom: pageYOffset ? 0 - button.clientHeight / 2 : 20,
        translateX: 'unset',
        translateY: 'unset',
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      })
    })
    gsap.from(button,{
      scale: 0,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
    })
  }
}

// eslint-disable-next-line no-undef

</script>

<style scoped>
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