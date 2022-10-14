import { Box, Text, Button, Card, Heading, Divider } from "dracula-ui";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";

import LoadingIcons from "react-loading-icons";
import { scrollElementIntoView } from "../../../Services/scroll";

type IFormProps = {
  setTab: (value: number) => void;
  setRef: (value: number) => void;
};
const Ranking = ({ setTab,setRef }: IFormProps) => {
  const params = useParams();
  window.history.replaceState(null, "", `#/2/`);

  const  [searchParams, setSearchParams] = useSearchParams();

        
  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      
      setResult(await ApiService.getRanking());

      const nome = searchParams.get("callback") ?? "";
      setSearchParams({})
      if(nome){
        const reference = document.querySelector(
          ".i-am-"+nome
        ) as HTMLElement
        if(reference)
        scrollElementIntoView(reference,'smooth')
      }
      ApiService.putVisit("1")
  
    };
    load();
  }, []);

  return (
    <>
      <Text
        style={{ cursor: "pointer" }}
        as="a"
        color="white"
        onClick={() => {
          window.history.replaceState(null, "", "#/1/0");
          setTab(1);
          setRef(2);
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text style={{ float: "right" }}>
        {" "}
        <b style={{ fontSize: "2em" }}>🥇</b> Populares&nbsp;&nbsp;
      </Text>
      <Divider color="red" />

      <br/>
      <Link to={"/porEstado/"}
        style={{ cursor: "pointer" ,color:"white", textDecoration:"none"}}>
       
       <Card 
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign:"right"
        }}
      p="xs" m="xs" borderColor="purple"  variant="subtle">
        <b style={{ fontSize: "2.5em" }}>🌌</b>
        <Heading size="lg" >
         VER POR ESTADO 
        </Heading>
      </Card>
      </Link>
      <Card 
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign:"right"
        }}
      p="xs" m="xs" borderColor="orange"  variant="subtle">
        <b style={{ fontSize: "2.5em" }}>🌇</b>
        <Heading size="lg" >
        POR MUNICÍPIO 🔒
        </Heading>
      </Card>

        <br/>
      <Divider color="red" />
        <Heading >&nbsp;Todo o Brasil</Heading>
      {!result && (
        <>
          <Text as="p" align="center">
            <LoadingIcons.Puff />
          </Text>
        </>
      )}
      {result?.result.map((i: any, c: number) => (
        <Box key={c} p="sm" 
        
        className={"i-am-" + i.nome}>
        
          <Card color="red" variant="subtle" p="md">
            <Heading>
              <b>{i.rank}º</b> {i.nome}
            </Heading>
            <Text color="white" size="sm">
              {i.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
              HABITANTES
            </Text>
            <div className="bag">
              <Link to={"/results/2/" + i.nome}>
                <Button color="red">Confira</Button>
              </Link>
            </div>
          </Card>
        </Box>
      ))}
    </>
  );
};
export default Ranking;
