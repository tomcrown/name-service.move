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


public struct NameLookupResult has copy, drop {
    address: address,
    name: String,
}


public struct AddressLookupResult has copy, drop {
    name: String,
    address: address,
}


public struct Registry has key {
    id: UID,
    name_to_address: Table<String, address>,
    address_to_name: Table<address, String>,
    all_names: vector<String>,
}


fun init(ctx: &mut TxContext){
    let id = object::new(ctx);
    let name_to_address = table::new<String, address>(ctx);
    let address_to_name = table::new<address, String>(ctx);

    let registry = Registry {
        id,
        name_to_address,
        address_to_name,
        all_names: vector::empty()
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
    vector::push_back(&mut registry.all_names, name);

    event::emit(
        NameRegistered {
            name,
            owner: sender,
        });
}


public entry fun get_name_by_address(registry: &Registry, addr: address, _ctx: &mut TxContext) {
    let name_ref = table::borrow(&registry.address_to_name, addr);
    let name = *name_ref;

    event::emit(NameLookupResult {
        address: addr,
        name,
    });
}


public entry fun get_address_by_name_(registry: &Registry, name: String, _ctx: &mut TxContext) {
    let addr_ref = table::borrow(&registry.name_to_address, name);
    let addr = *addr_ref; 

    event::emit(AddressLookupResult {
        name,
        address: addr,
    });
}


public entry fun emit_all_names(registry: &Registry, _ctx: &mut TxContext) {
    let names = &registry.all_names;
    let len = vector::length(names);
    let mut i = 0;
    while (i < len) {
        let name_ref = vector::borrow(names, i);
        let addr_ref = table::borrow(&registry.name_to_address, *name_ref);

        event::emit(AddressLookupResult {
            name: *name_ref,
            address: *addr_ref,
        });

        i = i + 1;
    };
}


