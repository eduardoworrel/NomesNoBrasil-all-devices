import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Text,
} from "dracula-ui";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import returned from "../../Interfaces/returned";
import LoadingIcons from "react-loading-icons";
import IMensagemInterna from "../../Interfaces/IMensagemInterna";
import { scrollElementIntoView } from "../../Services/scroll";

function RankingEstados() {

  const history = useNavigate();

  const [estado, setEstado] = useState<returned[]>([]);
  const [selected, setSelected] = useState<number | string | undefined>();
  const [selectedName, setSelectedName] = useState< string | undefined>();
  const [ranking, setRanking] = useState<IMensagemInterna | undefined>();

  
  const  [searchParams, setSearchParams] = useSearchParams();

  const reference = document.querySelector(
    ".topo"
    ) as HTMLElement
    
    if(reference)
    scrollElementIntoView(reference,'smooth')
  

  useEffect(() => {
    const handle = async () => {
      if(selected){
        setRanking(await ApiService.getRankingByEstado(50,selected));
      }else{
        let estados;
        if(!estado.length){
          estados = await ApiService.getEstados();
        }else{
          estados = estado
        }
        
        if (!estados) {
          const callback = 1;
          history("/2/" + callback);
        }else{
          setEstado(estados);
          const estadoReturn = searchParams.get("estado") ?? "";
          const nome = searchParams.get("nome") ?? "";
      
          if(estadoReturn && estados){
            for(let item of estados){
              if(item.nome == estadoReturn){
                setSelected(item.id)
                setSelectedName(item.nome)
                setSearchParams({})
                setTimeout(()=>{

                  if(nome){
                    const reference = document.querySelector(
                      ".i-am-"+nome
                      ) as HTMLElement
                      
                      if(reference)
                      scrollElementIntoView(reference,'smooth')
                    }
                },200)
               
              }
            }
          }
          
        }
        
    }
    };
    handle();
  }, [selected]);


  
  return (
    <>
      
      <Heading className="topo" size="lg" color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "1.8em" }}>🌌</b> POR ESTADO&nbsp;&nbsp;
      </Heading>
      <Text>
      <Link to={"/2/0"}
        style={{ cursor: "pointer" ,color:"white", textDecoration:"none"}}>
       
        ⏪ Voltar
      </Link>
    </Text>
      <Divider />
      <br/>
      <Box >
        <Box>
        
          {
            !estado?
            <><Text as="p" align="center">
              <LoadingIcons.Puff />
            </Text></>:
            <>
              <Box >
              {
                !selected ?
                estado?.map((item, c)=>
                  <Card
                  key={c}
                  style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign:"right"
                  }}  
                  onClick={()=>{
                    setSelected(item.id)
                    setSelectedName(item.nome)
                  }}
                  variant="subtle" color="purple" p="xs" m="xs">
                  
                    <img 
                    loading="lazy"
                    src={"https://servicodados.ibge.gov.br/api/v3/malhas/estados/"+item.id+"?qualidade=minima&preenchimento=fdfdfd"} 
                    width={70} />
                    <Heading size="lg" style={{width:"155px"}}>
                      {item.nome}
                    </Heading>
                  </Card>
                )
                
              :
              <>
              <Box  p="sm">
                <Card 
                 onClick={()=>{
                  setSelected(undefined)
                }}
                style={{borderColor:"white"}} variant="subtle" p="sm">
                  <Heading size="md" style={{textAlign:"center"}} color="purple">
                    <b style={{fontSize:"1.5em"}} >🔁</b> &nbsp; | {selectedName}</Heading>
                </Card>
              </Box>
              <Divider/>
                  {ranking?.result.map((i: any, c: number) => (
                    <Box key={c} 
                    className={"i-am-"+i.nome}
                    p="sm">
                      <Card color="purple" variant="subtle" p="md">
                        <Heading>
                          <b>{i.rank}º</b> {i.nome}
                        </Heading>
                        <Text color="white" size="sm">
                          {i.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          HABITANTES
                        </Text>
                        <div className="bag">
                          <Link to={"/results/2/" + i.nome + "?estado=" + selectedName}>
                            <Button color="purple">Confira</Button>
                          </Link>
                        </div>
                      </Card>
                    </Box>
                  ))}
                  </>
              }
              </Box>
              </>
          }
         
        </Box>
        
      </Box>
    </>
  );
}
export default RankingEstados;
