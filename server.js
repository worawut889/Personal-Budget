const express = require("express");
const {
  findAllEnvelopes,
  findEnvelopesById,
  findEnvelopesByName,
  addEnvelopes,
  deleteEvelopesById
} = require("./envelopes");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  const envelopes = findAllEnvelopes()
  res.send(envelopes);
});

app.get("/:id", (req, res) => {
  const envelopes = findEnvelopesById(Number(req.params.id))
  res.send(envelopes);
});

app.post("/", (req, res) => {
  const {name, balances} = req.body
  const envelope = addEnvelopes(name, balances)
  res.send(envelope)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is runnuing on port " + PORT);
});
