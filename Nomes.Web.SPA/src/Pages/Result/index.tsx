import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Text,
} from "@dracula/dracula-ui";
import { HistoryChart } from "../../Components/Result/Chart/HistoryChart";
import Dados from "../../Components/Result/Dados";
import Estados from "../../Components/Result/Estados";
import ISecoes from "../../Interfaces/ISecoes";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import SearchBar from "../../Components/Search/SearchBar";

function Results() {
  const history = useNavigate();
  const params = useParams();
  const nome = params.nome ?? "";
  const abaCallback = params.pagina ?? 1;

  const [estado, setEstado] = useState("");

  const [secao, setSecao] = useState<ISecoes | null>(null);
  useEffect(() => {
    const handle = async () => {
      const secao: ISecoes = {
        faixa: await (await ApiService.getFaixa(nome, estado)).result,
        basica: await (await ApiService.getBasica(nome, estado)).result,
      };
      if (!secao.faixa.length) {
        const callback = 1;
        history("/1/" + callback);
      }else{
        setSecao(secao);
      }
    };
    handle();
  }, [estado]);

  const informacoesBasicas = secao?.basica && secao?.basica[0];
  const faixa = secao?.faixa;

  if (!informacoesBasicas || !faixa) {
    return <></>;
  }

  return (
    <>
      
      <Text size="lg" color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "1em" }}>👤</b> {informacoesBasicas.nome}&nbsp;&nbsp;
      </Text>
      <Text>
      
      <Link to={"/" + abaCallback + "/0"}
        style={{ cursor: "pointer" ,color:"white", textDecoration:"none"}}>
       
        ⏪ Voltar
      </Link>
    </Text>
      <Divider />
      <br/>
      <SearchBar />
      
      <Box m="xs">
        <Box p="xs">
          <Estados setEstado={setEstado} preSelecionado={estado}></Estados>
        </Box>
        <Box>
          <Dados
            informacoesBasicas={informacoesBasicas}
            localidadePersonalizada={estado}
          />
        </Box>
        <br />
        <Divider />
        <Box className="grafico">
          <Box p="xs" m="xs">
            <HistoryChart faixas={faixa} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Results;
