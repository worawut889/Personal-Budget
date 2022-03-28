let totalBalances = 0;
let revenue = []; // [{date: '22/3/2022', deposite: 50000}]
let expenses = []; // [{category: 'clothing', withdraw: 300 }]

const envelopes = [
  {
    id: 1,
    name: "clothing",
    balances: 9000,
    limits: 1000,
    spend: 0,
  },
  {
    id: 2,
    name: "groceries",
    balances: 0,
    limits: 1000,
    spend: 0,
  },
]

let countId = 3

// find all envelopes
const findAllEnvelopes = () => {
  return envelopes
}

// find one by id
const findEnvelopeById = (id) => {
  return envelopes.filter(envel => envel.id === id)
}

// find one by name
const findEnvelopeByName = (name) => {
  return envelopes.filter(envel => envel.name === name)
}

// add envelopes
const addEnvelope = (name, balances, limits=1000) => {
  const obj = {id: countId++, name, balances, limits, spend: 0}
  envelopes.push(obj)
  return obj
}

// update envelopes
const deleteEvelopeById = (id) => {
  const envelopeIndex = envelopes.findIndex(envel => envel.id === id)
  const deleteVal = envelopes.splice(envelopeIndex, 1)
  return deleteVal
}

const updateEnvelope = (id, obj) => {
  const envelopeIndex = envelopes.findIndex(evel => evel.id === id)
  const updateAllow = ["name", "balances", "limits"]
  const objKey = Object.keys(obj)
  objKey.forEach(key => {
    if (updateAllow.includes(key)) {
      envelopes[envelopeIndex][key] = obj[key]
    }
  })
  return envelopes[envelopeIndex]
}

const transfer = (fromName, toName, amount) => {
  let from = findEnvelopeByName(fromName)[0]
  let to = findEnvelopeByName(toName)[0]
  if (from.balances < amount) {
    throw new Error("Not enough balances.")
  }
  from.balances -= amount
  to.balances += amount
  updateEnvelope(from.id, {balances: from.balances})
  updateEnvelope(to.id, {balances: to.balances})
  return envelopes
}

module.exports = {
  findAllEnvelopes,
  findEnvelopeById,
  addEnvelope,
  deleteEvelopeById,
  updateEnvelope,
  transfer
}