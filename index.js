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
  const userDataWithoutPassword = data.map(({ password, ...user }) => user);
  res.json(userDataWithoutPassword);
});

let storedData = readDataFromFile();


app.delete('/delete/:name',(req,res) => {
  const deleteName = req.params.name;
  console.log(deleteName)
  const rawData = fs.readFileSync('data.json');
  let jsonData = JSON.parse(rawData);

  const indexToDelete = jsonData.findIndex(item => item.name === deleteName);

  if (indexToDelete !== -1) {
    jsonData.splice(indexToDelete, 1);

    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

    res.send(`Deleted entry with name: ${deleteName}`);
  } else {
    res.status(404).send(`Entry with name ${deleteName} not found`);
  }

})


app.post("/post", (req, res) => {
  const password = req.body.password;
  const requestData = req.body;
  if (Storedpassword !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  } else storedData.push(requestData);
  saveDataToJsonFile(storedData);

  res.sendStatus(200).end;
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
