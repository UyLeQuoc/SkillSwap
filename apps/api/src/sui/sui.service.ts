import { Injectable } from "@nestjs/common"
import { envConfig } from "../dynamic-modules/env/env.config"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { bcs } from "@mysten/sui/bcs"

@Injectable()
export class SuiService {
    private readonly client: SuiClient
    private readonly keypair: Ed25519Keypair

    constructor() {
        this.client = new SuiClient({ url: getFullnodeUrl("testnet") })

        const privateKey = envConfig().sui.privateKey
        if (!privateKey) {
            throw new Error("SUI_PRIVATE_KEY is not set in environment variables")
        }
        this.keypair = Ed25519Keypair.fromSecretKey(privateKey)
    }

    async mintSkillBadge(recipient: string, skillName: string): Promise<string> {
        try {
            const tx = new Transaction()

            const packageId = envConfig().sui.packageId
            const moduleName = envConfig().sui.moduleName
            const functionName = "mint_skill_badge"

            tx.setGasBudget(100000000)

            tx.moveCall({
                target: `${packageId}::${moduleName}::${functionName}`,
                arguments: [
                    tx.pure.address(recipient),
                    tx.pure.string(skillName),
                    tx.pure.address(envConfig().sui.verifier),
                    tx.object("0x6"),
                ],
            })

            const result = await this.client.signAndExecuteTransaction({
                transaction: tx,
                signer: this.keypair,
                options: { showEffects: true },
            })

            return result.digest
        } catch (error) {
            console.error("Error minting skill badge:", error)
            throw error
        }
    }
}
