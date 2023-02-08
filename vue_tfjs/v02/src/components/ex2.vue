<template>
  <div>
    <textarea name="" id="" cols="30" rows="10" v-model="url"></textarea>
    <button @click="short">눌러봐</button>
    <div>단축 url</div>
    <textarea
      readonly
      name=""
      id=""
      cols="30"
      rows="10"
      :value="shorturl"
    ></textarea>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "app",
  data() {
    return {
      url: "",
      shorturl: "",
    };
  },
  created() {
    this.$socket.on("data", (data) => {
      this.shorturl = data;
    });
  },

  methods: {
    short: function () {
      this.$socket.emit("data", this.url);
    },
  },
};
</script>

<style></style>
