<template>
    <div>
      <i :class="'flare-' + n" v-for="n in 10" :key="n"></i>
    </div>
  </template>
  
  <script setup></script>
  
  <style lang="scss" scoped>
    @keyframes opacity_shine {
      0% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  
    [class^="flare-"] {
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, #fff, rgba(255, 255, 255, 0) 70%);
      display: block;
      position: absolute;
      animation: opacity_shine 1s linear infinite alternate;
      mix-blend-mode: plus-lighter;
    }
  
    .flare-1 {
      top: 25%;
      left: 7%;
      animation-delay: -1s;
    }
    .flare-2 {
      top: 13%;
      left: 37%;
    }
    .flare-3 {
      top: 63%;
      left: 67%;
      animation-delay: -0.5s;
    }
    .flare-4 {
      top: 58%;
      left: 20%;
      animation-delay: -1s;
      animation-duration: 2s;
    }
    .flare-5 {
      top: 16%;
      left: 67%;
      animation-duration: 2s;
    }
    .flare-6 {
      top: 40%;
      left: 37%;
      animation-delay: -0.5s;
    }
    .flare-7 {
      top: 30%;
      left: 50%;
      animation-delay: -1.5s;
      animation-duration: 1.5s;
    }
    .flare-8 {
      top: 70%;
      left: 10%;
      animation-delay: -0.7s;
    }
    .flare-9 {
      top: 50%;
      left: 80%;
      animation-duration: 1.8s;
    }
    .flare-10 {
      top: 20%;
      left: 25%;
      animation-delay: -1s;
    }
  </style>
  