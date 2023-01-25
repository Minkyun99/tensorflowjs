console.log("Hello TensorFlow");

async function getData() {
  const boston = fetch("./boston.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let C = [];
      let D = [];
      for (i = 0; i < data.Data.length; i++) {
        let A = [];
        A.push(data.Data[i].CRIM);
        A.push(data.Data[i].ZN);
        A.push(data.Data[i].INDUS);
        A.push(data.Data[i].CHAS);
        A.push(data.Data[i].NOX);
        A.push(data.Data[i].RM);
        A.push(data.Data[i].AGE);
        A.push(data.Data[i].DIS);
        A.push(data.Data[i].RAD);
        A.push(data.Data[i].TAX);
        A.push(data.Data[i].PTRATIO);
        A.push(data.Data[i].B);
        A.push(data.Data[i].LSTAT);
        C.push(A);

        D.push(data.Data[i].MEDV);
      }
    });
}

function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [13], units: 1, useBias: true }));
  model.add(tf.layers.dense({ units: 50, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, useBias: true }));

  return model;
}

async function run() {
  const data = await getData();
  const values = data.map((d) => ({
    x: d.CRIM,
    y: d.MEDV,
  }));

  tfvis.render.scatterplot(
    { name: "CRIM v MEDV" },
    { values },
    {
      xLabel: "CRIM",
      yLabel: "MEDV",
      height: 300,
    }
  );

  const model = createModel();
  tfvis.show.modelSummary({ name: "Model Summary" }, model);

  const tensorData = convertToTensor(data);
  const { inputs, labels } = tensorData;

  // Train the model
  await trainModel(model, inputs, labels);
  console.log("Done Training");
}

function convertToTensor(data) {
  return tf.tidy(() => {
    tf.util.shuffle(data);

    const inputs = data.map((d) => d.CRIM);
    const labels = data.map((d) => d.MEDV);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(
      labelMin.div(labelMax.sub(labelMin))
    );

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    };
  });
}

async function trainmodel(model, inputs, labels) {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  });

  const batchSize = 32;
  const epochs = 50;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Trianing Performance" },
      ["loss", "mse"],
      { height: 200, callbacks: ["onEpochEnd"] }
    ),
  });
}

function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;
  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));

    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

    const unNormpreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });

  const predictePoints = Array.from(xs).map(
    (val,
    (i) => {
      return { x: val, y: preds[i] };
    })
  );

  const originalPoints = inputData.map((d) => ({
    x: d.CRIM,
    y: d.MEDV,
  }));

  tfvis.render.scatterplot(
    { name: "Model Predictions vs Original Data" },
    { values: [originalPoints, predictedPoints] }
  );
}

document.addEventListener("DOMContentLoaded", run);
