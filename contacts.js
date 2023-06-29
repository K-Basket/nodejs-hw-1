const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
}

async function getContactById(contactId) {
    const list = await listContacts();
    const contact = list.find(contact => contact.id === contactId);

    return contact || null;
}

async function removeContact(contactId) {
    const list = await listContacts();
    const index = list.findIndex(contact => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const [result] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

    return result;
}

async function addContact(data) {
    const list = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };

    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

    return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
