import { defineStore } from 'pinia'

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: []
    }),
    actions: {
        init() {
            this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
        },
        addContact(contact) {
            this.contacts.push(contact)
            this.save()
        },
        updateContact(updated) {
            const index = this.contacts.findIndex(c => c.id === updated.id)
            if (index !== -1) {
                this.contacts[index] = updated
                this.save()
            }
        },
        deleteContact(id) {
            this.contacts = this.contacts.filter(c => c.id !== id)
            this.save()
        },
        save() {
            localStorage.setItem('contacts', JSON.stringify(this.contacts))
        }
    }
})
