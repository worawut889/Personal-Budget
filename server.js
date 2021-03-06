const express = require("express");
const cors = require('cors')
const {
  findAllEnvelopes,
  findEnvelopeById,
  addEnvelope,
  deleteEvelopeById,
  updateEnvelope,
  transfer,
} = require("./envelopes");

const app = express();

app.use(cors())
app.use(express.json());

app.param('id', (req, res, next, id) => {
  const envelopeId = Number(id)
  req.id = envelopeId
  next()
})

app.get("/", (req, res) => {
  const envelopes = findAllEnvelopes();
  res.send(envelopes);
});

app.get("/:id", (req, res) => {
  const envelopes = findEnvelopeById(req.id);
  res.send(envelopes);
});

app.post("/", (req, res) => {
  let { name, balances } = req.body;
  if (!balances) {
    balances = 0
  }
  const envelope = addEnvelope(name, balances);
  res.status(201).send(envelope);
});

app.put("/:id", (req, res) => {
  const body = req.body;
  const envelopeUpdate = updateEnvelope(req.id, body);
  res.status(201).send(envelopeUpdate);
});

app.delete("/:id", (req, res) => {
  const envelope = deleteEvelopeById(req.id);
  res.status(204).send(envelope);
});

app.post("/transfer/:from/:to", (req, res) => {
  const nameFrom = req.params.from;
  const nameTo = req.params.to;
  const { amount } = req.body;
  const envelopes = transfer(nameFrom, nameTo, Number(amount));
  res.status(201).send(envelopes);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is runnuing on port " + PORT);
});
