const express = require("express");
const app = express();
const data = require("./data.json");
const fs = require("fs");
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.listen(3001, () =>
  console.log("Server listening at port http://127.0.0.1:3001/")
);

const Storedpassword = "rawah21";
app.get("/data", (req, res) => {
  res.send(data);
});

let storedData = readDataFromFile();


app.post("/post", (req, res) => {
  const password = req.body.password;
  const requestData = req.body;
  if (Storedpassword !== password) {
    return res.send("wrong password");
  } else storedData.push(requestData);
  saveDataToJsonFile(storedData);

  res.send(requestData);
});

function saveDataToJsonFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync("data.json", jsonData, "utf-8");
}

function readDataFromFile() {
  try {
    const fileData = fs.readFileSync("data.json", "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading data from file:", error.message);
    return [];
  }
}
