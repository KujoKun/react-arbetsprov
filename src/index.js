import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); //Normalt sätt så ska strict mode vara på, men jag fick lite oförväntade side effects.
//just nu experimenterar React med att lägga till lite fler effecter. TLDR; useEffect körs 2 gånger varje render I DEVELOPMENT,
//men inte i production.
//Så därför har jag stängt av det just nu. Om jag hade publicerat appen någonstans hade jag självklart lagt tillbaka det
//Jag lämnar strict mode av då jag antar att ni kör appen med npm start.
