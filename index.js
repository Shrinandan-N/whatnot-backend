const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();
const port = 800;

const postData = process.env.POST_DATA;

const getHashtags = process.env.GET_HASHTAGS;
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/profile", async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    const response = await axios.post(postData, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${req.headers.authorization}`,
      },
    });

    console.log(req.headers.authorization);

    res.status(200).send({ data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error storing data");
  }
});


app.post("/hashtag", async (req, res) => {
  const { body } = req;
  try {
    const response = await axios.post(getHashtags, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${req.headers.authorization}`,
      },
    });
    res.status(200).send({ data: response.data });
  } catch (error) {
    console.error(error);
    res.status(404).send("Error posting data");
  }
});

app.listen(port, () => {
  console.log(`Server listening... `);
});
