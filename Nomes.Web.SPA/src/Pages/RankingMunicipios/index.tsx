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

function RankingMunicipios() {

  const history = useNavigate();

  const [municipio, setmunicipio] = useState<returned[]>([]);
  const [selected, setSelected] = useState<number | string | undefined>();
  const [selectedName, setSelectedName] = useState< string | undefined>();
  const [ranking, setRanking] = useState<IMensagemInterna | undefined>();
  const [nome, setNome] = useState("");    

  const htmlElRef = createRef<HTMLInputElement>() 

  const toShow: any[] = []
  if(municipio.length && !nome){
  
    toShow.push(municipio.find(i => i.nome == 'Fernando de Noronha'))
    toShow.push(municipio.find(i => i.nome == 'Nova Iorque'))
    toShow.push(municipio.find(i => i.nome == 'Armação dos Búzios'))
    toShow.push(municipio.find(i => i.nome == 'Balneário Camboriú'))
    toShow.push(municipio.find(i => i.nome == 'Gramado'))
  }
  
  if(nome.length > 0){
    
    let limit = 0
     toShow.push(... municipio.filter((i) => {
      let r = limit <= 15 && replaceSpecialChars(i.nome.toLowerCase())
      .includes(replaceSpecialChars(nome.toLowerCase()));
      if(r){
        limit++;
      }
      
      return r
    }
    ).slice(0,15))
  }
  const  [searchParams, setSearchParams] = useSearchParams();

  const reference = document.querySelector(
    ".topo"
    ) as HTMLElement
    
    if(reference)
    scrollElementIntoView(reference,'smooth')
  
   
    useEffect(() => {
      const handle = async () => {
       
        if(selected){
        setRanking(await ApiService.getRankingByRegiaoIBGE(50,selected));
      }else{
        let municipios;
        if(!municipio.length){
          municipios = await ApiService.getMunicipios();
        }else{
          municipios = municipio
        }
        
        if (!municipios) {
          const callback = 1;
          history("/2/" + callback);
        }else{
          setmunicipio(municipios);
          const municipioReturn = searchParams.get("municipio") ?? "";
          const nome = searchParams.get("nome") ?? "";
      
          if(municipioReturn && municipios){
            for(let item of municipios){
              if(item.nome == municipioReturn){
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
        <b style={{ fontSize: "1.8em" }}>🌇</b> POR MUNICÍPIO&nbsp;
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
            !toShow.length && !nome ?
            <><Text as="p" align="center">
              <LoadingIcons.Puff />
            </Text></>:
            <>
            
              <Box >
              {
                !selected ?
                <>
                <Box p="xs" className="flex-cotainer">
                  <section className="inputName">
                    <Input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      color="white"
                      placeholder="Um município"
                      ref={htmlElRef}
                      m="xs"
                    />
                  </section>
                  <section className="inputButton">
                    <Button color="blackSecondary" m="sm" onClick={()=>{
                      htmlElRef.current &&  htmlElRef.current.focus()
                      }}>
                    🔎
                    </Button>
                  </section>
                </Box>
                <br/>
                <br/>
                {
                toShow?.map((item, c)=>
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
                  variant="subtle" color="orange" p="xs" m="xs">
                  
                    <img 
                    loading="lazy"
                    src={"https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+item.id+"?qualidade=minima&preenchimento=fdfdfd"} 
                    width={70} />
                    <Heading size="lg" style={{width:"155px"}}>
                      {item.nome} ({item.microrregiao.mesorregiao.UF.sigla})
                    </Heading>
                  </Card>
                )}
                </>
              :
              <>
              <Box  p="sm">
                <Card 
                 onClick={()=>{
                  setSelected(undefined)
                }}
                style={{borderColor:"white"}} variant="subtle" p="sm">
                  <Heading size="md" style={{textAlign:"center"}} color="orange">
                    <b style={{fontSize:"1.5em"}} >🔁</b> &nbsp; | {selectedName}</Heading>
                </Card>
              </Box>
              <Divider/>
                  {ranking?.result
                  .sort(function (a: any, b: any) {
                    if (a.rank > b.rank) {
                      return 1;
                    }
                    if (a.rank < b.rank) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((i: any, c: number) => (
                    <Box key={c} 
                    className={"i-am-"+i.nome}
                    p="sm">
                      <Card color="orange" variant="subtle" p="md">
                        <Heading>
                          <b>{i.rank}º</b> {i.nome}
                        </Heading>
                        <Text color="white" size="sm">
                          {i.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          HABITANTES
                        </Text>
                        <div className="bag">
                          <Link to={"/results/2/" + i.nome + "?municipio=" + selectedName}>
                            <Button color="orange">Confira</Button>
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
export default RankingMunicipios;
