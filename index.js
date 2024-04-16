const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return await console.table(await contacts.listContacts());
    case "get":
      return await console.log(await contacts.getContactById(id));
    case "add":
      return await console.log(await contacts.addContact(name, email, phone));
    case "remove":
      return await console.log(await contacts.removeContact(id));
  }
};

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-p, --phone, <type>")
  .option("-e, --email, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
