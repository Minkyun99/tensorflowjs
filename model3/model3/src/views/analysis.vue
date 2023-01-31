<template>
  <label for="file">파일 등록</label>
  <v-form ref="form" @submit.prevent="send">
    <input type="file" id="file" ref="files" @change="exel_file" multiple />
    <input type="submit" @click="imageUpload" />
    <canvas id="myChart"></canvas>
  </v-form>
</template>

<script>
/* eslint-disable */
export default {
  name: "app",
  data() {
    return {};
  },

  methods: {
    exel_file: function () {
      let father = [],
        son = [];
      // excel.js 사용
      const readExcel = () => {
        let input = this.event.target;
        let reader = new FileReader();
        reader.onload = function () {
          let data = reader.result;
          let wordBook = XLSX.read(data, { type: "binary" });
          const x = wordBook.Sheets.train;
          for (let j = 2; j < 757; j++) {
            let line = [],
              line2 = [];
            line.push(x["A" + j].v);
            line2.push(x["B" + j].v);
            father.push(line);
            son.push(line2);
          }
        };
        reader.readAsBinaryString(input.files[0]);
      };
      console.log(father);
      console.log(son);
    },

    imageUpload: function () {
      let key = document.getElementById("key");
      let kv = Number(key.value);
      console.log(kv);
      let xt = tf.tensor(father);
      let yt = tf.tensor(son);
      let X = tf.input({ shape: [1] });
      let Y = tf.layers.dense({ units: 1 }).apply(X);
      let model = tf.model({ inputs: X, outputs: Y });

      let comileParam = {
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
      };
      model.compile(comileParam);
      model.summary();
      const labels = [];
      const loss = [];
      const fitParm = {
        epochs: 200,
        callbacks: {
          onEpochEnd: function (epoch, logs) {
            console.log("epoch", epoch, logs, "RMSE=>", Math.sqrt(logs.loss));
            /* 차트 chart.js */
            labels.push(epoch);
            console.log(labels);
            loss.push(logs.loss);
            console.log(loss);

            let context = document.getElementById("myChart").getContext("2d");
            let myChart = new Chart(context, {
              type: "line", // 차트의 형태
              data: {
                // 차트에 들어갈 데이터
                labels: labels, // x축
                datasets: [
                  {
                    //데이터
                    label: "ㅇㅅㅇ", //차트 제목
                    fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: loss, //x축 label에 대응되는 데이터 값
                    backgroundColor: [
                      //색상
                      "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                      //경계선 색상
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1, //경계선 굵기
                  },
                ],
              },
              options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              },
            });
          },
        },
      };
      const my = tf.tensor([kv]);
      console.log(typeof my);
      model.fit(xt, yt, fitParm).then((_) => {
        let result = model.predict(my);
        result.print();
      });
    },
  },

  fileDeleteButton(e) {
    const name = e.target.getAttribute("name");
    this.files = this.files.filter((data) => data.number !== Number(name));
    // console.log(this.files);
  },
};
</script>

<style>
.main-container {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
}

.room-deal-information-container {
  margin-top: 50px;
  color: #222222;
  border: 1px solid #dddddd;
}

.room-deal-information-title {
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-content-wrapper {
  min-height: 50px;
  display: flex;
}

.room-deal-informtaion-content-title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  background-color: #f9f9f9;
}

.room-deal-information-content {
  width: 100%;
  font-size: 14px;
}

.room-deal-option-selector {
  display: flex;
  align-items: center;
  padding: 15px;
}

.room-deal-option-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: pointer;
}

.room-deal-option-item:last-child {
  margin-left: 10px;
}

.room-deal-option-notice {
  margin-left: auto;
  font-size: 14px;
  color: #888888;
}

.room-deal-option-item-deposit {
  margin-left: 10px;
}

.room-deal-information-wrapper {
  display: flex;
  flex-direction: column;
}

.room-deal-information-option {
  padding: 10px;
  display: flex;
  align-items: center;
}

.room-deal-information-option:last-child {
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-item-type {
  font-size: 13px;
  color: #fff;
  background-color: #61b6e5;
  min-width: 50px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

.room-deal-information-item-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 46px;
  width: 100%;
}

.room-deal-information-item-wrapper > input {
  border: 1px solid #dddddd;
  width: 140px;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
}

.room-deal-inforamtion-won {
  margin: 0 10px;
}

.room-deal-information-example {
  color: #888888;
}

.room-deal-information-option:not(:first-child) {
  margin-top: 10px;
}

.room-deal-inforamtion-divide {
  font-size: 22px;
  margin: 0 8px;
  color: #222222;
  font-weight: 100;
}

.room-deal-close-button-wrapper {
  margin-left: auto;
  cursor: pointer;
}

.room-deal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #666666;
  color: rgb(220, 220, 220);
}

.room-deal-cliked {
  background-color: rgb(235, 235, 235);
  color: rgb(170, 170, 170);
}

.room-file-upload-example {
  height: 100%;
}

.room-write-content-container {
  border-top: 1px solid #dddddd;
  min-height: 260px;
}

.room-picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}

.file-preview-content-container {
  height: 100%;
}

.room-file-upload-wrapper {
  margin: 20px;
  border: 1px solid #dddddd;
  background-color: #f4f4f4;
  min-height: 350px;
  font-size: 15px;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.room-file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%;
  width: 100%; */
}

.room-file-image-example-wrapper {
  text-align: center;
}

.room-file-notice-item {
  margin-top: 5px;
  text-align: center;
}

.room-file-notice-item-red {
  color: #ef4351;
}

.image-box {
  margin-top: 30px;
  padding-bottom: 20px;
  text-align: center;
}

.image-box input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.image-box label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #232d4a;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}

.file-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}

.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-wrapper-upload {
  margin: 10px;
  padding-top: 20px;
  background-color: #888888;
  width: 190px;
  height: 130px;
}

.room-write-button-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222222;
}

.room-write-button-wrapper > div {
  width: 160px;
  height: 50px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.room-write-button {
  margin-left: 15px;
  color: #fff;
  background-color: #1564f9;
}

.room-write-button:hover {
  opacity: 0.8;
}
</style>
