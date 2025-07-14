module name_service::name_service;

use std::string::String;
use sui::table::{Self, Table};
use sui::event;

const E_NAME_TAKEN: u64 = 0;
const E_ADDRESS_REGISTERED: u64 = 1;


public struct NameRegistered has copy, drop{
    name: String,
    owner: address,
}


public struct Registry has key {
    id: UID,
    name_to_address: Table<String, address>,
    address_to_name: Table<address, String>,
}


fun init(ctx: &mut TxContext){
    let id = object::new(ctx);
    let name_to_address = table::new<String, address>(ctx);
    let address_to_name = table::new<address, String>(ctx);

    let registry = Registry {
        id,
        name_to_address,
        address_to_name,
    };

    transfer::share_object(registry);
}


public fun register_name(
    registry: &mut Registry,
    name: String,
    ctx: &mut TxContext
) {

    let sender = tx_context::sender(ctx);

    assert!(!table::contains(&registry.name_to_address, name), E_NAME_TAKEN);
    assert!(!table::contains(&registry.address_to_name, sender), E_ADDRESS_REGISTERED);

    table::add(&mut registry.name_to_address, name, sender);
    table::add(&mut registry.address_to_name, sender, name);

    event::emit(
        NameRegistered {
            name,
            owner: sender,
        });
}