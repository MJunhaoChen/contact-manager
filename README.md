## 🗂️ Contact Manager

A small Vue 3 app to manage contacts (CRUD).
Built with Vite + Vue Router + Pinia + `<script setup>` syntax.

## Demo

![Demo](./public/demo.gif)

### Getting Started

---

```bash
npm create vite@latest contact-manager -- --template vue
cd contact-manager
npm install
npm run dev
```

The app runs at:

```
Local: http://localhost:5173/
```

### Features

---

* Vue 3 with `<script setup>`
* Component-based structure
* Vue Router (navigate between Home / Add / Edit)
* Pinia store (for contact data + localStorage)
* CRUD functionality:
  * View contacts
  * Add contacts
  * Edit contacts
  * Delete contacts

### Vue Concepts Covered

---

| Concept            | Used in                      |
| ------------------ | ---------------------------- |
| `<script setup>`   | All components               |
| Props / Emits      | `ContactCard.vue`            |
| Vue Router         | `router/index.js`            |
| Pinia (state mgmt) | `store/contacts.js`          |
| LocalStorage       | Data persistence             |
| Dynamic routes     | Edit-contact page            |
| Computed / v-model | Forms and filtering          |

### Project Structure

---

```bash
src/
├─ components/
│  ├─ ContactCard.vue
│  ├─ ContactForm.vue
│
├─ views/
│  ├─ Home.vue
│  ├─ AddContact.vue
│  ├─ EditContact.vue
│
├─ store/
│  └─ contacts.js
├─ router/
│  └─ index.js
├─ App.vue
├─ main.js
```

### 🌲 Architecture Diagram

```mermaid
flowchart TD

subgraph group_app["Application Shell"]
  node_main["App Bootstrap<br/>[main.js]"]
  node_shell["Navigation Shell<br/>[App.vue]"]
  node_router["Route Dispatch<br/>[index.js]"]
end

subgraph group_contacts["Contact Workflows"]
  node_home["Browse Contacts<br/>[Home.vue]"]
  node_card["Contact Card<br/>[ContactCard.vue]"]
  node_add["Add Contact<br/>[AddContact.vue]"]
  node_edit["Edit Contact<br/>[EditContact.vue]"]
  node_toast["Validation Toast<br/>[Toast.vue]"]
end

subgraph group_state["Contact State"]
  node_store["Contact Store<br/>[contacts.js]"]
end

node_user(("User"))
node_storage[("Browser Storage")]

node_user -->|"uses"| node_shell
node_main -->|"mounts"| node_shell
node_main -->|"installs"| node_router
node_shell -->|"renders routes"| node_router
node_router -->|"dispatches"| node_home
node_router -->|"dispatches"| node_add
node_router -->|"dispatches"| node_edit
node_home -->|"loads, deletes, favorites"| node_store
node_home -->|"renders"| node_card
node_card -->|"emits actions"| node_home
node_add -->|"adds contact"| node_store
node_edit -->|"loads, updates"| node_store
node_add -->|"shows errors"| node_toast
node_edit -->|"shows errors"| node_toast
node_store -->|"reads, writes"| node_storage

click node_main "https://github.com/mjunhaochen/contact-manager/blob/main/src/main.js"
click node_shell "https://github.com/mjunhaochen/contact-manager/blob/main/src/App.vue"
click node_router "https://github.com/mjunhaochen/contact-manager/blob/main/src/router/index.js"
click node_home "https://github.com/mjunhaochen/contact-manager/blob/main/src/views/Home.vue"
click node_card "https://github.com/mjunhaochen/contact-manager/blob/main/src/components/ContactCard.vue"
click node_add "https://github.com/mjunhaochen/contact-manager/blob/main/src/views/AddContact.vue"
click node_edit "https://github.com/mjunhaochen/contact-manager/blob/main/src/views/EditContact.vue"
click node_toast "https://github.com/mjunhaochen/contact-manager/blob/main/src/components/Toast.vue"
click node_store "https://github.com/mjunhaochen/contact-manager/blob/main/src/store/contacts.js"

classDef toneNeutral fill:#f8fafc,stroke:#334155,stroke-width:1.5px,color:#0f172a
classDef toneBlue fill:#dbeafe,stroke:#2563eb,stroke-width:1.5px,color:#172554
classDef toneAmber fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#78350f
classDef toneMint fill:#dcfce7,stroke:#16a34a,stroke-width:1.5px,color:#14532d
classDef toneRose fill:#ffe4e6,stroke:#e11d48,stroke-width:1.5px,color:#881337
classDef toneIndigo fill:#e0e7ff,stroke:#4f46e5,stroke-width:1.5px,color:#312e81
classDef toneTeal fill:#ccfbf1,stroke:#0f766e,stroke-width:1.5px,color:#134e4a
class node_main,node_shell,node_router,node_user toneBlue
class node_home,node_card,node_add,node_edit,node_toast,node_storage toneAmber
class node_store toneMint
```

### Links

---

* [Vue 3 `<script setup>` Docs](https://vuejs.org/api/sfc-script-setup.html)
* [Vue Scaling Up: Tooling & IDE support](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)
* [Pinia – Vue's official state management](https://pinia.vuejs.org/)
