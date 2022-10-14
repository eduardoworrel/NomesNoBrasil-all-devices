import { createRef, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Input,
  Text,
} from "dracula-ui";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ApiService from "../../Services/ApiService";
import returned from "../../Interfaces/returned";
import LoadingIcons from "react-loading-icons";
import IMensagemInterna from "../../Interfaces/IMensagemInterna";
import { replaceSpecialChars, scrollElementIntoView } from "../../Services/scroll";
import ISecoes from "../../Interfaces/ISecoes";
import { CompareChart } from "../../Components/Result/Chart/CompareChart";

function Comparar() {

  const history = useNavigate();

 
 
  const  [searchParams, setSearchParams] = useSearchParams();

  const [nome1,setNome1] = useState("");
  const [nome2,setNome2] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [notFound,setNotFound] = useState(false);
  const [dados,setDados] = useState<{a:ISecoes,b:ISecoes} | undefined>();
 
  const handleCompara = async ()=>{
    if(nome1 && nome2){
      setNotFound(false)
      setIsLoading(true)
      const secao1: ISecoes = {
        faixa: await (await ApiService.getFaixa(nome1)).result,
        basica: await (await ApiService.getBasica(nome1)).result,
      };
      const secao2: ISecoes = {
        faixa: await (await ApiService.getFaixa(nome2)).result,
        basica: await (await ApiService.getBasica(nome2)).result,
      };
      if(secao1.faixa.length == 0 || secao2.faixa.length == 0){
        setNotFound(true)
      }else{
        setDados({a:secao1,b:secao2})
      }
      setIsLoading(false)
    }
  }
  
  return (
    <>
      
      <Heading className="topo" size="lg" color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "1.8em" }}> 👤 ❌ 👤</b> 
      </Heading>
      <Text>
      <Link to={"/1"}
        style={{ cursor: "pointer" ,color:"white", textDecoration:"none"}}>
       
        ⏪ Voltar
      </Link>
    </Text>
      <Divider color="yellow" />
      <br/>
      <Heading p="sm">
        Comparar nomes
      </Heading>
      <Box >
        <Box>
        
        <Box className="flex-cotainer">
        <Box m="xs" className="inputName">
          <Input
            value={nome1}
            onChange={(e) => setNome1(e.target.value)}
            color="white"
            placeholder="Um nome"
            autoFocus={true}
            m="xs"
          />
        </Box>
        <Box m="xs" className="inputName">
          <Input
           value={nome2}
           onChange={(e) => setNome2(e.target.value)}
            color="white"
            placeholder="Outro nome"
            autoFocus={false}
            m="xs"
          />
        </Box>
        
      </Box>

      <Text align="center" as="p" className="inputButton">
          <Button onClick={handleCompara} color="animated" m="sm">
            Comparar
          </Button>
      </Text>
    </Box>
    <Box>
      {
        isLoading && 
        
        <Text as="p" align="center">
          <LoadingIcons.Puff />
        </Text>
      
      }
    {
      !isLoading && !notFound && dados?.a.faixa[0] && dados?.b.faixa[0] &&
      <CompareChart faixas={[dados.a.faixa,dados.b.faixa]} />
    }
    {
      notFound &&
      <Text>Não achamos ;/</Text>
    }
    </Box>
  </Box>
</>
  );
}
export default Comparar;
