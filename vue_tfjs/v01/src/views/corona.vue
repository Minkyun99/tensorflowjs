<template>
  <div>공공API 코로나데이터</div>
  <button>console 환경변수 테스트</button>
  <hr />
  <select name="sel" id="selbox" v-model="local">
    <option value="부산">부산</option>
    <option value="대전">대전</option>
    <option value="대구">대구</option>
    <option value="광주">광주</option>
    <option value="서울">서울</option>
  </select>
  <select name="sel2" id="selbox2" v-model="day">
    <option value="어제">어제</option>
    <option value="오늘">오늘</option>
  </select>
  <button @click="coro()">
    {{ day }}, {{ local }} 지역 코로나 데이터 가져오기
  </button>
  <div>{{ corona }}</div>
</template>

<script>
/* eslint-disable */
export default {
  name: "app",
  data() {
    return {
      corona: "",
      day: "어제",
      local: "부산",
    };
  },
  methods: {
    coro: function () {
      this.corona = "데이터 로딩 중...";
      /*날짜구하기*/
      if (this.day === "오늘") {
        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        this.day = year + "-" + month + "-" + day;
      } else {
        const Tdate = new Date();
        Tdate.setDate(Tdate.getDate() - 1);
        const date_year = Tdate.getFullYear();
        const date_month = Tdate.getMonth();
        const date_day = Tdate.getDate();
        console.log(date_day);
        const date =
          date_year +
          "-" +
          (date_month < 9 ? "0" + (date_month + 1) : date_month + 1) +
          "-" +
          (date_day < 10 ? "0" + date_day : date_day);
        this.day = date;
      }

      console.log(B);

      /*주소창에 들어갈 날짜와 지역 설정*/
      const B = this.day;
      const A = this.local;

      const key = process.env.VUE_APP_ckey;

      const curl =
        "http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=" +
        key +
        `&std_day=${B}&gubun=${A}&apiType=JSON`;

      console.log(curl);
      fetch(curl)
        .then((res) => res.json())
        .then((body) => {
          const _ = body;
          console.log(_);
          const C = _.items[0].incDec; //전일대비확진자증감수
          const D = _.items[0].isolClearCnt; //누적격리해제수
          const E = _.items[0].isolIngCnt; //격리중환자수
          this.corona = `전일 대비 확진자 증감수 ${C}, 누적 격리 해제 수 ${D}, 격리 중환자 수${E}`;
        });
    },
  },
};
</script>

<style>
@font-face {
  font-family: "NotoSans";
  src: url(../../public/fonts/NotoSansKR-Regular.otf);
}
</style>
