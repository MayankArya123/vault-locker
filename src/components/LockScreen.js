import { useState } from "react";
import { deriveKey, encryptData, decryptData } from "../crypto/crypto";
import { loadVault, saveVault } from "../services/vaultService";

const SALT = new Uint8Array([11, 22, 33, 44]);

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function unlockVault() {
    const storedVault = loadVault();

    // FIRST TIME: no vault exists → require master password
    if (!storedVault) {
      if (!password || password.trim() === "") {
        setError("Please set a master password to create vault");
        return;
      }

      try {
        // derive key from user-provided password
        const key = await deriveKey(password, SALT);

        // initialize empty vault
        const emptyVault = { secrets: [] };

        // encrypt empty vault
        const encryptedVault = await encryptData(emptyVault, key);

        // save encrypted vault (as string) using your vaultService
        saveVault(encryptedVault);

        onUnlock(key);
      } catch (err) {
        console.error(err);
        setError("Failed to create vault");
      }

      return;
    }

    // RETURNING USER: vault exists → password REQUIRED
    if (!password || password.trim() === "") {
      setError("Please enter master password");
      return;
    }

    try {
      const key = await deriveKey(password, SALT);

      // decrypt stored vault using key
      await decryptData(storedVault, key);

      onUnlock(key);
    } catch {
      setError("Incorrect master password");
    }
  }

  return (
    <div>
      <h2>🔒 Vault Locked</h2>

      <input
        type="password"
        placeholder="Master Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={unlockVault}>Unlock Vault</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
