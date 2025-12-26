import "./App.css";
import { useState } from "react";
import Vault from "./components/Vault";
import LockScreen from "./components/LockScreen";

function App() {
  const [cryptoKey, setCryptoKey] = useState(null);

  return (
    <div
      style={{
        width: cryptoKey ? "90%" : "40%",
        marginTop: cryptoKey ? "4rem" : "5rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {cryptoKey ? (
        <Vault cryptoKey={cryptoKey} onLock={() => setCryptoKey(null)} />
      ) : (
        <LockScreen onUnlock={setCryptoKey} />
      )}
    </div>
  );
}

export default App;
