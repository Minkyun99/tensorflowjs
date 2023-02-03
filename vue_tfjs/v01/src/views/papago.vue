<template>
  <div>
    <button @click="check">console로 env 체크</button>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="inData"
      placeholder="번역할 내용을 입력하시요."
    ></textarea>
    =<button @click="getTrans">한영 번역하기</button>=>
    <textarea
      readonly
      name=""
      id=""
      cols="30"
      rows="10"
      :value="trans"
    ></textarea>
  </div>
</template>

<script>
/*eslint-disable*/

import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      inData: "",
      trans: "",
    };
  },
  methods: {
    check: function () {
      console.log(process.env.VUE_APP_nID);
    },

    getTrans: function () {
      const cid = process.env.VUE_APP_nID;
      const csecret = process.env.VUE_APP_nSECRET;
      const query = this.inData;
      const url = "/v1/papago/n2mt";
      this.trans = "번역중...";

      const frm = new FormData();
      frm.append("source", "ko");
      frm.append("target", "en");
      frm.append("text", query);

      axios
        .post(url, frm, {
          headers: {
            "Content-Type": "application/json",
            "X-Naver-Client-Id": cid,
            "X-Naver-Client-Secret": csecret,
          },
        })
        .then((res) => {
          const rst = res.data.message.result.translatedText;
          console.log(rst);
          this.trans = rst;
        });
    },
  },
};
</script>

<style></style>
