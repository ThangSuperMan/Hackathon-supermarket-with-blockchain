use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, env, Promise, near_bindgen, AccountId};
// use near_sdk::collections::{LookupMap, UnorderedMap};
use std::collections::HashMap;

// Variables
const AMOUNT: u128 = 1_000_000_000_000_000_000_000_000; // 1 $NEAR as yoctoNEAR
// const ACCOUNT_ID: AccountId = "thangjenny2002.testnet".parse().unwrap();

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize)]
pub struct Contract {
    // Contract owner
    pub owner_id: AccountId, 
    pub status_updates: HashMap<AccountId, String>,
    pub total_donations: u128
}

impl Default for Contract {
    fn default() -> Self{
        return Self {owner_id:env::predecessor_account_id(), status_updates: todo!(), total_donations: todo!() }
    }
}

#[near_bindgen]
impl Contract {
    pub fn set_status(&mut self, status: String) {
        self.status_updates.insert(env::predecessor_account_id(), status); 
        // assert!(self.status_updates.len() == 1, "To many message");
    }

    pub fn clear(&mut self) {
        self.status_updates.clear()
    }

    pub fn get_all_updates(self) -> HashMap<AccountId, String> {
        self.status_updates
    }

    #[payable]
    pub fn donate() {
        let account_id: AccountId = "thangjenny2002.testnet".parse().unwrap();
        // let account_id: AccountId = "thangjenny2002.testnet";
        // Send the money from the contract to the specific account
        Promise::new(account_id).transfer(AMOUNT);
        log!("Deposit here: {}", near_sdk::env::attached_deposit());
        near_sdk::env::log_str("Thanks for your jummy money!");
    }
}
