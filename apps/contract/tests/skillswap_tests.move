/*
#[test_only]
module skillswap::skillswap_tests;
// uncomment this line to import the module
// use skillswap::skillswap;

const ENotImplemented: u64 = 0;

#[test]
fun test_skillswap() {
    // pass
}

#[test, expected_failure(abort_code = ::skillswap::skillswap_tests::ENotImplemented)]
fun test_skillswap_fail() {
    abort ENotImplemented
}
*/

module skill_swap::skill_badge {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::clock;

    struct SkillBadge has key, store {
        id: UID,
        owner: address,
        skill_name: String,
        completed_at: u64,
        verified_by: address
    }

    public fun mint_badge(
        recipient: address,
        skill_name: String,
        verified_by: address,
        clock: &clock::Clock,
        ctx: &mut TxContext
    ): SkillBadge {
        SkillBadge {
            id: object::new(ctx),
            owner: recipient,
            skill_name,
            completed_at: clock::now_seconds(clock),
            verified_by
        }
    }
}
