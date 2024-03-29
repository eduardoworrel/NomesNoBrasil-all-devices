import { useEffect, useState } from "react";
import { Box, Divider, Heading, Text } from "dracula-ui";
import { HistoryChart } from "../../Components/Result/Chart/HistoryChart";
import Dados from "../../Components/Result/Dados";
import Estados from "../../Components/Result/Estados";
import ISecoes from "../../Interfaces/ISecoes";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ApiService from "../../Services/ApiService";
import SearchBar from "../../Components/Search/SearchBar";
import { scrollElementIntoView } from "../../Services/scroll";
import LoadingIcons from "react-loading-icons";
import IFaixa from "../../Interfaces/IFaixa";

function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rankEstado = searchParams.get("estado") ?? "";
  const rankMunicipio = searchParams.get("municipio") ?? "";

  const params = useParams();
  const nome = params.nome ?? "";
  const abaCallback = params.pagina ?? 1;
  const inversed =searchParams.get("inversed") ?? false;
  const reference = document.querySelector(".topo") as HTMLElement;

  const [faixas,setFaixas] = useState<IFaixa[][]>([]);
  if (reference) scrollElementIntoView(reference, "smooth");

  const [estado, setEstado] = useState("");

  const [secao, setSecao] = useState<ISecoes | null>(null);
  const [none, setNone] = useState(false);
  useEffect(() => {
    const handle = async () => {
      const secao: ISecoes = {
        faixa: await (await ApiService.getFaixa(nome, estado)).result,
        basica: await (await ApiService.getBasica(nome, estado)).result,
      };
      if (!secao.basica?.length) {
        setNone(true);
      } else {
        setNone(false);
        setSecao(secao);

        const paralelos = secao.basica[0].nomes.split(",");
        if(paralelos.length > 0){
          const fxs = [];
          for(const paralelo of paralelos){
            const temp = await (await ApiService.getFaixa(paralelo, estado)).result
            if(temp.length > 0)
              fxs.push(temp)
          }
          setFaixas(fxs)
        }

      }
   };
    handle();
  }, [estado]);

  const informacoesBasicas = secao?.basica && secao?.basica[0];
  const faixa = secao?.faixa;
  console.log(faixa)
  return (
    <>
      <Text className="topo" size="lg" color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "1em" }}>👤</b>{" "}
        {typeof informacoesBasicas == "object"
          ? informacoesBasicas?.nome
          : nome}
        &nbsp;&nbsp;
      </Text>
      <Text>
        <Link
          to={
            !rankEstado && !rankMunicipio
              ? "/" + abaCallback + "?callback=" + nome
              : rankEstado
              ? "/porEstado/?estado=" + rankEstado + "&nome=" + nome
              : !inversed ?
               "/porMunicipio/?municipio=" + rankMunicipio + "&nome=" + nome
               :"/porMunicipioInvertido/?municipio=" + rankMunicipio + "&nome=" + nome
          }
          style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
        >
          ⏪ Voltar
        </Link>
      </Text>
      <Divider />
      <br />
      <SearchBar />

      <Box m="xs">
        <Box p="xs">
          <Estados setEstado={setEstado} preSelecionado={estado}></Estados>
        </Box>
        <Box>
          {typeof informacoesBasicas == "object" ? (
            <>
              <Dados
                informacoesBasicas={informacoesBasicas}
                localidadePersonalizada={estado}
              />
            </>
          ) : 
          !none ? ( <>
            <Text as="p" align="center">
              <LoadingIcons.Puff />
            </Text>
          </>) :(
            <>
              <Box color="purpleCyan" rounded="lg" p="xs" m="xs">
                <Heading>
                  <Text color="black">
                    São menos que {estado ? "15" : "20"} {nome}'s{" "}
                    {estado ? "neste estado" : "no Brasil"}
                  </Text>
                </Heading>
              </Box>
              <Box color="purpleCyan" rounded="lg" p="xs" m="xs">
                <Heading>
                  <Text color="black">
                    infelizmente a falta de registros nos impede de fornecer
                    mais detalhes ;/
                  </Text>
                </Heading>
              </Box>

              <Box color="cyanGreen" rounded="lg" p="xs" m="xs">
                <Heading>
                  <Text color="black">
                    Com o censo 2022 novos nomes surgirão
                  </Text>
                </Heading>
              </Box>
            </>
          )}
        </Box>

        <br />
        {!none && (
          typeof faixa == "object"
          && faixa.length >0
          ) && (
          <>
            <Divider />
            <Box className="grafico">
              <Box p="xs" m="xs">
                <HistoryChart faixas={faixa} paralelas={faixas} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
export default Results;
