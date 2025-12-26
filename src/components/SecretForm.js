import { useState } from "react";

export default function SecretForm({ onAdd, onLock }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    notes: "",
  });

  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!form.password.trim()) {
      setError("Password is required");
      return;
    }

    if (form.password.length < 5) {
      setError("Password should be at least 5 characters");
      return;
    }
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm({ name: "", username: "", password: "", notes: "" });
  }

  return (
    <div className="secret-addition-form">
      {error && <p className="error-text">{error}</p>}

      <button className="vault-lock-btn" onClick={onLock}>
        🔐 Lock Vault
      </button>
      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          value={form.password}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <textarea
          value={form.notes}
          placeholder="Notes"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button>Add Secret</button>
      </form>
    </div>
  );
}
