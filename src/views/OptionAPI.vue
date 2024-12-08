<template>
  <option-navbar/>
  <main class="flex flex-1 flex-wrap lg:flex-nowrap overflow-y-auto lg:overflow-hidden"
        style="height:calc(100vh - 5rem)">
    <option-horse-list/>
    <option-hippodrome/>
    <option-schedule/>
  </main>
</template>
<script>
import OptionSchedule from "@/components/OptionApi/OptionSchedule.vue";
import OptionHorseList from "@/components/OptionApi/OptionHorseList.vue";
import OptionHippodrome from "@/components/OptionApi/OptionHippodrome.vue";
import OptionNavbar from "@/components/OptionApi/OptionNavbar.vue";

export default {
  components: {OptionNavbar, OptionHorseList, OptionSchedule, OptionHippodrome}
}
</script>
