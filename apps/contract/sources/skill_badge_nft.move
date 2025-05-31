/*
/// Module: skillswap
module skillswap::skillswap;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module skillswap::skill_badge_nft {
    use std::string::String;

	public struct SkillBadge has key, store {
        id: UID,
        owner: address,
        skill_name: String,
        verifier: address,
        issued_at: u64,
    }

}