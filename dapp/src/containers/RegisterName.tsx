// src/components/RegisterName.tsx
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export function RegisterName() {
  const account = useCurrentAccount();
  const [name, setName] = useState("");
  const { mutate: registerName } = useSignAndExecuteTransaction();

   if (!account) {
    return;
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::name_service::register_name`,
      arguments: [
        tx.object(REGISTRY_ID), // Registry object
        tx.pure.string(name),
      ],
    });

    registerName(
      { transaction: tx },
      {
        onSuccess: () => {
          alert("Name registered!");
          setName("");
        },
        onError: (err) => alert(`Error: ${err.message}`),
      }
    );
  };

return (
  <form
    onSubmit={handleRegister}
    className="w-full max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-2xl shadow-lg space-y-5"
  >
    <h2 className="text-2xl font-bold text-gray-800">Register a Name</h2>

    <input
      type="text"
      placeholder="e.g., tomcrown.sui"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
    >
      Register Name
    </button>
  </form>
);
}
