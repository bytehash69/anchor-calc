import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calc } from "../target/types/calc";
import { assert } from "chai";

describe("calc", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  let newAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.calc as Program<Calc>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .init(10)
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .signers([newAccount])
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.num == 10);
  });

  it("Is doubled!", async () => {
    // Add your test here.
    const tx = await program.methods
      .double()
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.num == 20);
  });

  it("Is added!", async () => {
    // Add your test here.
    const tx = await program.methods
      .add(15)
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    console.log(account.num);
    assert(account.num == 35);
  });
});
