import React from "react";
import 'dracula-ui/styles/dracula-ui.css'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Search from "./Pages/Search";
import Results from "./Pages/Result";
import RankingEstados from "./Pages/RankingEstados";
import { Heading } from "dracula-ui";

function App() {
  return (
    <main className="App">
      <Heading style={{ textAlign: "center", padding: "10px 0 0 0" }}>
        Nomes no Brasil
        <img
          style={{ marginLeft: "7px" }}
          width="20px"
          src="./brazil-flag.png"
        />
      </Heading>
      <Heading size="xs" style={{ textAlign: "center", padding: "0 0 40px 0" }}>
        <small>Com dados do Censo (IBGE)</small>
      </Heading>

      <Routes>
        <Route path="" element={<Search />} />
        <Route path="/:pagina/" element={<Search />} />
        <Route path="/:pagina/:callback" element={<Search />} />
        <Route path="results/:pagina/:nome" element={<Results />} />
        <Route path="porEstado/" element={<RankingEstados />} />
        <Route path="porEstado/" element={<RankingEstados />} />
      </Routes>
    </main>
  );
}

export default App;
