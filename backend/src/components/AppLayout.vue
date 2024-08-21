<template>
    <div class="min-h-full bg-gray-200 flex">
      <div class="flex-1">
        <!--      Content-->
        <main class="p-6">
          <router-view></router-view>
        </main>
        <!--      Content-->
      </div>
    </div>
    <div class="min-h-full bg-gray-200 flex items-center justify-center">
    </div>
  </template>
  
  
  <script setup>
  import {ref, computed, onMounted, onUnmounted} from 'vue'
  import store from "../store";
  
  const {title} = defineProps({
    title: String
  })

  onMounted(() => {
  })
  
  onUnmounted(() => {
  })
  
  </script>
  
  <style scoped>
  
  </style>