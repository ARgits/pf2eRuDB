<template>
  <TransitionGroup
    name="fadeSlide"               
  >
    <slot />
  </TransitionGroup>
</template>
<style lang="scss">
 .fadeSlide-move,
 .fadeSlide-enter-active,
 .fadeSlide-leave-active {
  transition: transform .5s ease;
 }

 .fadeSlide-enter-from,
 .fadeSlide-leave-to {
   opacity: 0;
   transform: scaleY(0.1);
 }

 .fadeSlide-leave-active {
   position: absolute;
 }
</style>