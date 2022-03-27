const { clearScreenDown } = require("readline");

let totalBalances = 0;
let revenue = []; // [{date: '22/3/2022', deposite: 50000}]
let expenses = []; // [{category: 'clothing', withdraw: 300 }]

const envelopes = [
  {
    id: 1,
    name: "clothing",
    balances: 0,
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
const findEnvelopesById = (id) => {
  return envelopes.filter(envel => envel.id === id)
}

// find one by name
const findEnvelopesByName = (name) => {
  return envelopes.filter(envel => envel.name === name)
}

// add envelopes
const addEnvelopes = (name, balances, limits=1000) => {
  const obj = {id: countId++, name, balances, limits, spend: 0}
  envelopes.push(obj)
  return obj
}

// update envelopes
const deleteEvelopesById = (id) => {
  const envelopeIndex = envelopes.findIndex(envel => envel.id === id)
  const deleteVal = envelopes.splice(envelopeIndex, 1)
  return deleteVal

}

module.exports = {
  findAllEnvelopes,
  findEnvelopesById,
  findEnvelopesByName,
  addEnvelopes,
  deleteEvelopesById
}