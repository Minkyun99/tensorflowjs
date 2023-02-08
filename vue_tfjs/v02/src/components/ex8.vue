<template>
  <div>ex8 예제 with Chatjs</div>
  <button @click="chart">Chartjs</button>
  <canvas id="myChart" style="width: 400px, height=400px"></canvas>
</template>

<script setup>
/* eslint-disable */
import Chart from "chart.js/auto";
import data from "../assets/data.js";

function chart() {
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "radar",
    data,
    options: {
      responsive: false,
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  });
}
</script>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
