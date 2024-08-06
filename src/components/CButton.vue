<template>
    <button @click="onClick" class="custom-button3" :class="additionalClass">
      <svg class="icon3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon v-if="icon === 'play'" points="5 3 19 12 5 21 5 3"></polygon>
        <template v-else-if="icon === 'plus'">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </template>
      </svg>
    </button>
  </template>
  
  <script>
  export default {
    name: 'CButton',
    props: {
      icon: {
        type: String,
        required: true,
        validator: (value) => ['play', 'plus'].includes(value)
      },
      onClick: {
        type: Function,
        required: true
      },
      additionalClass: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-button3 {
    margin: 10px 0;
    padding: 12px 24px;
    background-color: #0000001b;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid white; /* Added white border */
    border-radius: 15px;
    transition: all 0.3s ease;
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    z-index: 1000;
  }
  
  .custom-button3 .icon3 {
    margin-right: 0px;
    width: 25px;
    height: 25px;
  }
  
  .custom-button3:hover {
    color: #ffffff;
    border: 2px solid #ffffff;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  </style>
  