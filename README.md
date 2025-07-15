---

# 🟦 Name Service on Sui

This project is a minimal, on-chain **name registration system** built in Sui Move. Inspired by [Suins](https://suins.io), it demonstrates how to implement bi-directional name ↔ address mapping, unique name enforcement, and event-driven lookups using core Move primitives.

---

## ✨ Features

* ✅ One unique name per address
* ✅ One address per name (no duplicates)
* 🔁 Bi-directional lookup: name → address & address → name
* 📦 Emits events on name registration and lookups
* 🧾 Emits the full list of all registered names
* ⚙️ Built using native `table`, `vector`, and `event` modules in Sui Move

---

## 📦 Smart Contract Overview

### Structs

* `Registry`
  Stores all mappings and registered names.

* `NameRegistered` (event)
  Emitted when a user registers a name.

* `NameLookupResult` (event)
  Emitted when looking up an address by name.

* `AddressLookupResult` (event)
  Emitted when looking up a name by address.

---

### Core Functions

| Function                 | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| `init()`                 | Initializes and publishes a shared `Registry` object.                |
| `register_name()`        | Registers a unique name for the sender. Enforces 1 name per address. |
| `get_name_by_address()`  | Emits the name linked to a specific address.                         |
| `get_address_by_name_()` | Emits the address linked to a specific name.                         |
| `emit_all_names()`       | Emits an event for each name/address pair stored in the registry.    |

---

## 🛠 Usage

1. **Deploy the contract**
   Use the Sui CLI to publish the module.

2. **Initialize the registry**
   Call `init()` once to create and share the `Registry` object.

3. **Register a name**
   Call `register_name(registry, "yourname", ctx)` from a wallet address.

4. **Lookup functions**
   Use `get_name_by_address` or `get_address_by_name_` to fetch mappings.

---

## 🧪 Events

* All major interactions emit events for easier off-chain indexing and transparency.
* You can listen to:

  * `NameRegistered`
  * `NameLookupResult`
  * `AddressLookupResult`

---

## 🔒 Error Codes

| Code                       | Meaning                                         |
| -------------------------- | ----------------------------------------------- |
| `E_NAME_TAKEN (0)`         | The name is already registered by another user. |
| `E_ADDRESS_REGISTERED (1)` | This address has already registered a name.     |

---

## 🧠 Why This?

This project was built to learn Move by rebuilding a real-world concept from scratch. It prioritizes simplicity, clarity, and full on-chain logic with no external dependencies.

---

## 📁 File Structure

```
/name_service
├── sources/
│   └── name_service.move
├── Move.toml
└── README.md
```

---

## 👨🏾‍💻 Author

Built by [@tomcrown](https://github.com/tomcrown) — passionate about building clean and practical smart contracts on Sui.

---

