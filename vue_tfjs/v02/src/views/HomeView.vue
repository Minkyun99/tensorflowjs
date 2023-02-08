<template>
  <button @click="select = 'ex1'">ex1버튼</button>
  <button @click="select = 'ex2'">ex2버튼</button>
  <button @click="select = 'ex3'">ex3버튼</button>
  <button @click="select = 'ex4'">ex4버튼</button> |
  <button @click="select = 'ex5'">ex5버튼</button>
  <button @click="select = 'ex6'">ex6버튼</button>
  <button @click="select = 'ex7'">ex7버튼</button>
  <button @click="select = 'ex8'">ex8버튼</button>
  <button @click="select = 'ex9'">ex9버튼</button>
  <component :is="select"></component>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import ex1 from "@/components/ex1.vue";
import ex2 from "@/components/ex2.vue";
import ex3 from "@/components/ex3.vue";
import ex4 from "@/components/ex4.vue";
import ex5 from "@/components/ex5.vue";
import ex6 from "@/components/ex6.vue";
import ex7 from "@/components/ex7.vue";
import ex8 from "@/components/ex8.vue";
import ex9 from "@/components/ex9.vue";

export default {
  name: "HomeView",
  data() {
    return {
      select: "ex1",
    };
  },
  components: {
    ex1,
    ex2,
    ex3,
    ex4,
    ex5,
    ex6,
    ex7,
    ex8,
    ex9,
  },
};
</script>
