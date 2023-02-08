<template>
  <div>
    <div id="display"></div>
    <button @click="main()">스샷 분석</button>
    <button @click="alog()">디버거</button>
    <div>{{ result }}</div>
    <div>{{ trans }}</div>
  </div>
</template>

<script>
/*eslint-disable*/
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

const VideoElement = document.createElement("video"); //캠 태그 생성

export default {
  name: "app",
  data() {
    return {
      result: "",
      trans: "",
      data: "",
    };
  },

  created() {
    this.$socket.on("trans", (data) => {
      this.data = data;
    });
  },

  methods: {
    alog: function () {
      console.log(tf);
    },
    main: async function () {
      this.result = "이미지 분석중...";
      this.trans = "번역중...";
      const display = document.getElementById("display");
      display.appendChild(VideoElement);
      VideoElement.width = 400;
      VideoElement.height = 400;

      const cam = await tf.data.webcam(VideoElement);
      const net = await mobilenet.load(); //위아래 바꾸면 동작 안함
      const img = await cam.capture();
      const cresult = await net.classify(img);

      this.$socket.emit("trans", cresult[0].className);
      console.log(this.$socket.emit("trans", cresult[0].className));

      this.result =
        "분석결과" +
        this.data +
        "(" +
        (cresult[0].probability * 100).toFixed(2) +
        "%)";
    },
  },
};
</script>

<style></style>
