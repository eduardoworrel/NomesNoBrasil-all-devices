import { Box, Card, ColorNames, Divider, Heading, Text } from "@dracula/dracula-ui";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ranking from "../../Components/Search/Ranking";
import SearchBar from "../../Components/Search/SearchBar";
import Diferentes from "../../Components/Search/Diferentes";
import Ascencao from "../../Components/Search/Ascencao";
import IMensagemInterna from "../../Interfaces/IMensagemInterna";
import ApiService from "../../Services/ApiService";
import Futebol from "../../Components/Search/Futebol";
import Famosos from "../../Components/Search/Famosos";
import Astronomia from "../../Components/Search/Astronomia";
import Pensadores from "../../Components/Search/Pensadores";
import Geeks from "../../Components/Search/Geeks";
import LoadingIcons from "react-loading-icons";
import { Sugestoes } from "../../Components/Sugestoes/Sugestoes";

const Search = () => {
  const params = useParams();

  const paginaCallback = params.pagina ? parseInt(params.pagina) : 1;

  const callback = params.callback && (parseInt(params.callback) ?? 0);

  const [tab, setTab] = useState(paginaCallback);
  const [result, setResult] = useState<IMensagemInterna | null>(null);
  const [cat, setCat] = useState<IMensagemInterna | null>(null);

  const [clickAgrupar, setCA] = useState(false);
  const [clickComparar, setCC] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getPaginaInicial();
      const cat = await ApiService.getCategorias();
      
      setCat(cat);
      setResult(result);
    };
    load();
  }, []);

  return (
    <>
      <Box>
        {tab === 1 && (
          <>
            <Heading size="sm" className="centered">
              Pesquise um nome
            </Heading>

            <SearchBar />
            {callback === 1 && (
              <>
              <Box style={{ textAlign: "center" }}>
                <Text color="white">
                  Não conseguimos encontrar o nome <b style={{ fontSize: "2em" }}>😢</b> <br/>
               </Text>
               
              </Box>
              <Card variant="subtle" color="yellow" p="xs">

                <Text color="white">
                  <small style={{textAlign: "justify"}}>
                    - Para o Brasil todo só conseguimos exibir nomes com mais de <strong>19</strong> ocorrencias.<br/>
                    - Para cada estado só conseguimos exibir nomes com mais de <strong>14</strong> ocorrencias.
                  <br/> <strong>Fonte: IBGE, Censo Demográfico 2010. </strong></small>
                </Text>
                
              </Card>
              <br/> 
               </>
            )}

            <Divider />
              <Box>
                <Card onClick={() => setTab(2)} style={{width:"45%", textAlign:"center", float: "left",cursor:"pointer"}} variant="subtle" color="cyan" m="xs" p="sm"> 
                <b style={{fontSize:"1.6em"}}>🥉🥇🥈</b>
                <Divider color="red" />
                <Text >
                  POPULARES
                </Text>
                </Card>
                <Card style={{width:"45%", textAlign:"center", float: "left"}} 
                onClick={()=>{
                  setCA(true)
                  setTimeout(()=>{
                    setCA(false)
                  },2000)
                }}
                variant="subtle" color="cyan" m="xs" p="sm">
                <b style={{fontSize:"1.7em"}}>
                {clickAgrupar?
                   <>🪚</>
                  :
                  <>👥👥</>
                  }</b>
                <Divider />
                <Text>
                  {clickAgrupar?
                   <>Em construção</>
                  :
                  <>AGRUPAR 🔒</>
                  }
                </Text>
                </Card>
                <Card  onClick={() => setTab(10)}  style={{width:"45%", textAlign:"center", float: "left"}} variant="subtle" color="cyan" m="xs" p="sm">
                <b style={{fontSize:"1.5em"}}>💡</b>
                <Divider color="pink" />
                <Text>
                CONTRIBUIR
                  
                </Text>
                
                </Card>
                 <Card 
                  onClick={()=>{
                    setCC(true)
                    setTimeout(()=>{
                      setCC(false)
                    },2000)
                  }}
                 style={{width:"45%", textAlign:"center", float: "left"}} variant="subtle" color="cyan" m="xs" p="sm">
                <b style={{fontSize:"1.5em"}}>{clickComparar?
                   <>🔧</>
                  :
                  <>👤❌👤</>
                  }</b>
                <Divider />
                <Text>
                {clickComparar?
                  <>Em construção</>
                  :
                  <> COMPARAR 🔒</>
                  }
                  
                </Text>
                
                </Card>
              </Box>
            <Divider style={{clear:"both"}}/>
            <Heading size="sm" className="centered">
              Ou navegue por categoria
            </Heading>
            <br />
            <Box style={{ cursor: "pointer" }}>
            {!cat && (
              <>
                <Text as="p" align="center">
                  <LoadingIcons.Puff />
                </Text>
              </>
            )}
              {cat && cat.result.map((i: {id:number,count:number;color: ColorNames; emoji: string; titulo: string; principalNameIndex: string ; searchTabIndex: string;})=>
                i.titulo != "Populares" &&
                <Box key={i.id}>
                  <Card
                    onClick={() => setTab(parseInt(i.searchTabIndex))}
                    color={i.color}
                    style={i.color == "white" ? {borderColor: "white"} : {}}
                    variant="subtle"
                    p="sm"
                    m="xs"
                  >
                    <Text size="lg" as="span" align="right">
                    <small>{i.count} 👀</small>
                    </Text>
                    <Heading style={{ marginTop: "-30px" }} color={i.color} size="lg">
                      <b style={{ fontSize: "2em" }}>{i.emoji}</b> {i.titulo}
                    </Heading>
                    <Text color={i.color} size="xs" align="right">
                      {result?.result[i.principalNameIndex].result[0].nome},{" "}
                      {result?.result[i.principalNameIndex].result[0].freq
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      pessoas no Brasil
                    </Text>
                  </Card>
                </Box>
                
              )}
              
            </Box>
          </>
        )}
        {tab === 2 && <Ranking setTab={setTab} />}

        {tab === 3 && <Diferentes setTab={setTab} />}
        {tab === 4 && <Ascencao setTab={setTab} />}
        {tab === 5 && <Futebol setTab={setTab} />}
        {tab === 6 && <Famosos setTab={setTab} />}
        {tab === 7 && <Astronomia setTab={setTab} />}
        {tab === 8 && <Pensadores setTab={setTab} />}
        {tab === 9 && <Geeks setTab={setTab} />}
        {tab === 10 && <Sugestoes setTab={setTab} />}
      </Box>
    </>
  );
};
export default Search;
