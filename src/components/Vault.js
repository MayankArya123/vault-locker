import { useEffect, useState } from "react";
import { encryptData, decryptData } from "../crypto/crypto";
import { loadVault, saveVault } from "../services/vaultService";
import SecretForm from "./SecretForm";
import SecretList from "./SecretList";

export default function Vault({ cryptoKey, onLock }) {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const stored = loadVault();
    if (stored) {
      decryptData(stored, cryptoKey)
        .then((vault) => setSecrets(vault.secrets || [])) // <- extract secrets array
        .catch(() => setSecrets([]));
    }
  }, [cryptoKey]);

  async function addSecret(secret) {
    const updatedSecrets = [...secrets, secret];
    setSecrets(updatedSecrets);

    const vault = { secrets: updatedSecrets }; // <- save as object
    const encrypted = await encryptData(vault, cryptoKey);
    saveVault(encrypted);
  }

  async function deleteSecret(id) {
    const updatedSecrets = secrets.filter((s) => s.id !== id);
    setSecrets(updatedSecrets);

    const vault = { secrets: updatedSecrets }; // <- save as object
    const encrypted = await encryptData(vault, cryptoKey);
    saveVault(encrypted);
  }

  return (
    <div>
      <div className="vault-locker-home">
        🔐 <h2> Your Vault Locker </h2>
      </div>
      <div className="main-wrapper">
        <SecretForm onAdd={addSecret} onLock={onLock} />
        <SecretList secrets={secrets} onDelete={deleteSecret} />
      </div>
    </div>
  );
}
