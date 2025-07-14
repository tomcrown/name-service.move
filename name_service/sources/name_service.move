module name_service::name_service;

use std::string::String;
use sui::table::{Self, Table};
use sui::event;


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