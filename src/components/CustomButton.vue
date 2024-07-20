<template>
    <button @click="onClick" class="custom-button">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'CustomButton',
    methods: {
      onClick(event) {
        this.$emit('click', event);
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-button {
    margin: 10px 0;
    padding: 12px 24px;
    background-color: #f4f4f400;
    border: 2px solid #f4f4f480;
    color: #f4f4f480;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 25px;
    transition: all 0.3s ease;
    width: 200px;
    display: block;
    text-align: center;
    text-transform: uppercase;
  }
  
  .custom-button:hover {
    color: #ffffff;
    transform: scale(1.05);
    border: 2px solid #ffffff;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  
  .custom-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }
  </style>
  