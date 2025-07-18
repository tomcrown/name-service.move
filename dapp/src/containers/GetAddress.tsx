import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export function GetAddress() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const client = useSuiClient();
  const account = useCurrentAccount();

  if (!account) return null;

  const handleLookup = async () => {
  try {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::name_service::get_address_by_name`,
      arguments: [tx.object(REGISTRY_ID), tx.pure.string(name)],
    });

    const res = await client.devInspectTransactionBlock({
      sender: account.address,
      transactionBlock: tx,
    });

    const returnVal = res.results?.[0].returnValues?.[0]?.[0];
    if (returnVal && Array.isArray(returnVal)) {
      // Convert bytes to hex string
      const hex = "0x" + returnVal.map((x: number) => x.toString(16).padStart(2, "0")).join("");
      setResult(hex);
    } else {
      setResult("No result found.");
    }
  } catch (e: any) {
    alert(`Error: ${e.message}`);
    setResult(null);
  }
};

  return (
    <div className="p-4 border rounded shadow space-y-3">
      <h2 className="text-lg font-semibold">Get Address by Name</h2>
      <input
        type="text"
        placeholder="example.sui"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <button onClick={handleLookup} className="bg-purple-500 text-white px-4 py-2 rounded">
        Lookup
      </button>
      {result && (
        <p className="text-sm mt-2">
          Address: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}
