<template>
  <div>1. 실시간 환율 API</div>
  원화로 계산할 엔은 <input type="text" v-model="input" />엔

  <div>현시세 : 1엔에 {{ onedollar }}원 입니다.</div>
  <br />
  <div>입력하신 {{ input }}엔에 {{ result }}</div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "app",
  data() {
    return {
      input: 0,
      onedollar: 0,
      result: "엔화를 입력해주세요.",
    };
  },
  watch: {
    input: function () {
      const dollar = this.input;
      if (isNaN(dollar)) {
        this.result = "계산중...";
        return;
      }
      const url =
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWJPY";
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.onedollar = data[0].basePrice;
          const mydata = this.input * this.onedollar;
          this.result = `${mydata.toLocaleString("ko-KR")}원 입니다.`;
        });
    },
  },
  methods: {},
};
</script>

<style>
@font-face {
  font-family: "NotoSans";
  src: url(../../public/fonts/NotoSansKR-Regular.otf);
}
input {
  width: 80px;
  text-align: right;
  border-style: none;
  font-size: 1em;
  border-bottom: 1px solid cadetblue;
  border-bottom-color: cadetblue;
  font-family: "NotoSans";
}
input:focus {
  outline: none;
}
div {
  font-family: "NotoSans";
}
</style>
