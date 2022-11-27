import React from "react";
import "dracula-ui/styles/dracula-ui.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Search from "./Pages/Search";
import Results from "./Pages/Result";
import RankingEstados from "./Pages/RankingEstados";
import { Heading } from "dracula-ui";
import RankingMunicipios from "./Pages/RankingMunicipios";
import Comparar from "./Pages/Comparar";
import Agrupar from "./Pages/Agrupar";
import InversedRankingMunicipios from "./Pages/InversedRankingMunicipios";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <main className="App">
      <ScrollToTop style={{width:"45px",backgroundColor:"transparent", boxShadow:"none"}}
       smooth component={<p style={{ fontSize: '30px',
          marginTop: '5px'}}>🔼</p>} />
      <br></br>
      <Heading style={{fontSize:"2.2em", textAlign: "center", padding: "10px 0 0 0" }}>
        Nomes no Brasil
      </Heading>
      <Heading size="xs" style={{ textAlign: "center", padding: "0 0 40px 0" }}>
        <small>Com dados do <b>IBGE</b></small>
      </Heading>
      <br></br>
      <br></br>
      <br></br>
      <Routes>
        <Route path="" element={<Search />} />
        <Route path="/:pagina/" element={<Search />} />
        <Route path="/:pagina/:callback" element={<Search />} />
        <Route path="results/:pagina/:nome" element={<Results />} />
        <Route path="porEstado/" element={<RankingEstados />} />
        <Route path="porMunicipio/" element={<RankingMunicipios />} />
        <Route path="porMunicipioInvertido/" element={<InversedRankingMunicipios />} />
        <Route path="comparar/" element={<Comparar />} />
        <Route path="agrupar/" element={<Agrupar />} />
      </Routes>
      <br></br>
      <br></br>
      <br></br>
    </main>
  );
}

export default App;
