const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await contacts.listContacts());
      break;
    case "get":
      console.log(await contacts.getContactById(id));
      break;
    case "add":
      console.log(await contacts.addContact(name, email, phone));
      break;
    case "remove":
      console.log(await contacts.removeContact(id));
      break;
    default:
      console.log("No such operation");
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
