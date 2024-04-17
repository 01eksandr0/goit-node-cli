const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const list = await listContacts();
  return list.find((i) => i.id === id) || null;
};

const removeContact = async (id) => {
  const list = await listContacts();
  const index = list.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const item = list.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2), "utf-8");
  return item;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const item = { id: nanoid(), name, email, phone };
  //;
  fs.writeFile(contactsPath, JSON.stringify([...data, item], null, 2), "utf-8");
  return item;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
