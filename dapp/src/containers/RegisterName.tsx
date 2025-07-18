import {
  useSignAndExecuteTransaction,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { PACKAGE_ID, REGISTRY_ID } from "../constants";

export function RegisterName() {
  const account = useCurrentAccount();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate: registerName } = useSignAndExecuteTransaction();

  if (!account) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ID}::name_service::register_name`,
      arguments: [tx.object(REGISTRY_ID), tx.pure.string(name)],
    });

    registerName(
      { transaction: tx },
      {
        onSuccess: () => {
          alert("✅ Name registered!");
          setName("");
        },
        onError: (err) => alert(`❌ Error: ${err.message}`),
        onSettled: () => setLoading(false),
      },
    );
  };

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md px-6 py-8"
    >
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Register a Name</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose a unique name for your wallet
        </p>
      </div>

      {/* Input + Button */}
      <div className="flex flex-col gap-4">
        <input
          id="name"
          type="text"
          placeholder="e.g., tomcrown.sui"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register Name"}
        </button>
      </div>
    </form>
  );
}
