import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export function GetName() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const client = useSuiClient();
  const account = useCurrentAccount();

  if (!account) return null;

  const handleLookup = async () => {
    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::name_service::get_name_by_address`,
        arguments: [tx.object(REGISTRY_ID), tx.pure.address(address)],
      });

      const res = await client.devInspectTransactionBlock({
        sender: account.address,
        transactionBlock: tx,
      });

      const returnVal = res.results?.[0].returnValues?.[0]?.[0];

      if (returnVal && Array.isArray(returnVal)) {
        const decoded = new TextDecoder().decode(Uint8Array.from(returnVal));
        setResult(decoded);
      } else {
        setResult("No result found.");
      }
    } catch (e: any) {
      alert(`Error: ${e.message}`);
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md px-6 py-6 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Get Name by Address</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter a wallet address to find its registered name.
        </p>
      </div>

      <input
        type="text"
        placeholder="0x..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        onClick={handleLookup}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Lookup
      </button>

      {result && (
        <div className="bg-gray-100 text-gray-800 p-3 rounded-md text-sm">
          <span className="font-medium">Result:</span> {result}
        </div>
      )}
    </div>
  );
}
