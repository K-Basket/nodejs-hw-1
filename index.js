const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');
const { Command } = require('commander');

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const allContacts = await listContacts();
            console.log(allContacts);
            break;

        case 'get':
            const oneContact = await getContactById(id);
            console.log(oneContact);
            break;

        case 'add':
            const newContact = await addContact({ name, email, phone });
            console.log(newContact);
            break;

        case 'remove':
            const deleteContact = await removeContact(id);
            console.log(deleteContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

/*
    1. list:     / node index -a list /
    2. get:      / node index -a get -i sIoX7X5crlWhjGtUWs7Au /
    3. add:      / node index -a add -n Kostiantyn -e kostiantyn@mail.com -p 095-888-39-59 /
    4. femove:   / node index -a remove -i sIoX7X5crlWhjGtUWs7Au /
*/
