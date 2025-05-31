/*
/// Module: skillswap
module skillswap::skillswap;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module skillswap::skill_badge_nft {
    use std::string::String;
    use sui::clock::Clock;
    use sui::clock::timestamp_ms;

	public struct SkillBadge has key, store {
        id: UID,
        owner: address,
        skill_name: String,
        verifier: address,
        issued_at: u64,
    }

    public  fun mint_skill_badge(
        recipient: address,
        skill_name: String,
        verifier: address,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let time = clock.timestamp_ms();
        let badge = SkillBadge {
            id: object::new(ctx),
            owner: recipient,
            skill_name,
            verifier,
            issued_at: time,
        };

        transfer::transfer(badge, recipient);
	}
}