const express = require("express");
const {
  findAllEnvelopes,
  findEnvelopeById,
  addEnvelope,
  deleteEvelopeById,
  updateEnvelope
} = require("./envelopes");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  const envelopes = findAllEnvelopes()
  res.send(envelopes);
});

app.get("/:id", (req, res) => {
  const envelopes = findEnvelopeById(Number(req.params.id))
  res.send(envelopes);
});

app.post("/", (req, res) => {
  const {name, balances} = req.body
  const envelope = addEnvelope(name, balances)
  res.status(201).send(envelope)
})

app.put("/:id", (req, res) => {
  const body = req.body
  const envelopeUpdate = updateEnvelope(Number(req.params.id), body)
  res.status(201).send(envelopeUpdate)
})

app.delete("/:id", (req, res) => {
  const envelope = deleteEvelopeById(Number(req.params.id))
  res.status(204).send(envelope)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is runnuing on port " + PORT);
});
