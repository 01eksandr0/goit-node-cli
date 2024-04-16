const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => await fs.readFile(contactsPath, "utf-8");

const getContactById = async (id) => {
  const list = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(list).find((i) => i.id === id) || null;
};

const removeContact = async (id) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const list = JSON.parse(data);
  const index = list.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const item = list.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2), "utf-8");
  return item;
};

const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const item = { id: nanoid(), name, email, phone };
  //;
  fs.writeFile(
    contactsPath,
    JSON.stringify([...JSON.parse(data), item], null, 2),
    "utf-8"
  );
  return item;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
