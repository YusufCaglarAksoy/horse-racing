<template>
  <navbar/>
  <main class="flex flex-1" style="height:calc(100vh - 5rem)">
    <horse-list/>
    <hippodrome/>
    <schedule/>
  </main>
</template>
<script setup>
import HorseList from "@/components/CompositionApi/HorseList.vue";
import hippodrome from "@/components/CompositionApi/hippodrome.vue";
import Navbar from "@/components/CompositionApi/Navbar.vue";
import Schedule from "@/components/CompositionApi/Schedule.vue";
</script>
