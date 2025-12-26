const VAULT_KEY = "secure-vault";

export function saveVault(data) {
  localStorage.setItem(VAULT_KEY, JSON.stringify(data));
}

export function loadVault() {
  const data = localStorage.getItem(VAULT_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearVault() {
  localStorage.removeItem(VAULT_KEY);
}
