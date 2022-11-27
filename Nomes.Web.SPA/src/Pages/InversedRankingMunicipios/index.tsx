import { createRef, useEffect, useRef, useState } from "react";
import { Box, Button, Card, Divider, Heading, Input, Text } from "dracula-ui";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ApiService from "../../Services/ApiService";
import returned from "../../Interfaces/returned";
import LoadingIcons from "react-loading-icons";
import IMensagemInterna from "../../Interfaces/IMensagemInterna";
import {
  replaceSpecialChars,
  scrollElementIntoView,
} from "../../Services/scroll";

function InversedRankingMunicipios() {
  const history = useNavigate();

  const [municipio, setmunicipio] = useState<returned[]>([]);
  const [_estados, setEstados] = useState<returned[]>([]);
  const [selected, setSelected] = useState<number | string | undefined>();
  const [selectedName, setSelectedName] = useState<string | undefined>();
  const [ranking, setRanking] = useState<IMensagemInterna | undefined>();
  const [nome, setNome] = useState("");

  const htmlElRef = createRef<HTMLInputElement>();
  ApiService.putVisit("13");
  const toShow: any[] = [];
  if (municipio.length && !nome) {
    toShow.push(_estados.find((i) => i.nome == "Amapá"));
    toShow.push(municipio.find((i) => i.nome == "Macapá"));

    toShow.push(_estados.find((i) => i.nome == "São Paulo"));
    toShow.push(municipio.find((i) => i.nome == "São Paulo"));

    toShow.push(_estados.find((i) => i.nome == "Rio de Janeiro"));
    toShow.push(municipio.find((i) => i.nome == "Rio de Janeiro"));
  }
  
  if (nome.length > 0) {
    let limit = 0;
    toShow.push(..._estados
      .filter((i) => {
        let r =
          limit <= 25 &&
          replaceSpecialChars(i.nome.toLowerCase()).includes(
            replaceSpecialChars(nome.toLowerCase())
          );
        if (r) {
          limit++;
        }

        return r;
      })
      .slice(0, 25))
    toShow.push(
      ...municipio
        .filter((i) => {
          let r =
            limit <= 25 &&
            replaceSpecialChars(i.nome.toLowerCase()).includes(
              replaceSpecialChars(nome.toLowerCase())
            );
          if (r) {
            limit++;
          }

          return r;
        })
        .slice(0, 25)
        
    );
   
  }
  const [searchParams, setSearchParams] = useSearchParams();

  const reference = document.querySelector(".topo") as HTMLElement;

  if (reference) scrollElementIntoView(reference, "smooth");

  useEffect(() => {
    const handle = async () => {
      if (selected) {
        console.log(selected)
        setRanking(await ApiService.getInversedRankingByRegiaoIBGE(selected));
      } else {
        
        let municipios;
        if (!municipio.length) {
          municipios = await ApiService.getMunicipios();
        } else {
          municipios = municipio;
        }
                
        let estados;
        if (!_estados.length) {
          estados = await ApiService.getEstados();
        } else {
          estados = _estados;
        }
        setEstados(estados)

        if (!municipios) {
          const callback = 1;
          history("/2/" + callback);
        } else {
          setmunicipio(municipios);
          const municipioReturn = parseInt(searchParams.get("municipio") ?? "0");
          const nome = searchParams.get("nome") ?? "";

          if (municipioReturn && municipios) {
            for (let item of [...municipios,...estados]) {
              if (item.id == municipioReturn) {
                setSelected(item.id);
                setSelectedName(item.nome);
                setSearchParams({});
                setTimeout(() => {
                  if (nome) {
                    const reference = document.querySelector(
                      ".i-am-" + nome
                    ) as HTMLElement;

                    if (reference) scrollElementIntoView(reference, "smooth");
                  }
                }, 200);
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
      <Heading
        className="topo"
        size="lg"
        color="white"
        style={{ float: "right" }}
      >
        <b style={{ fontSize: "1.8em" }}> 💎</b> MENOS POPULARES
      </Heading>
      <Text>
        {!selected &&
          <Link
             to={"/1/2"}
            style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
          >
            ⏪ Voltar
          </Link>
        }
        {selected &&
          <Box
            onClick={() => {setSelected(undefined);setRanking(undefined)}}
            style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
          >
            ⏪ Voltar
          </Box>
        }
      </Text>
      <Divider />
      <br />

      <Box>
        <Box>
          {!toShow.length && !nome ? (
            <>
              <Text as="p" align="center">
                <LoadingIcons.Puff />
              </Text>
            </>
          ) : (
            <>
              <Box>
                {!selected ? (
                  <>
                
                    <Box p="xs" className="flex-cotainer">
                      <section className="inputName">
                        <Input
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          color="white"
                          placeholder="Estado ou município"
                          ref={htmlElRef}
                          m="xs"
                        />
                      </section>
                      <section className="inputButton">
                        <Button
                          color="greySecondary"
                          m="sm"
                          onClick={() => {
                            htmlElRef.current && htmlElRef.current.focus();
                          }}
                        >
                          🔎
                        </Button>
                      </section>
                    </Box>
                   
                    <br />
                    {toShow?.map((item, c) => (
                      <Card
                        key={c}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          textAlign: "right",
                          backgroundColor:"whitesmoke",
                          height:"105px"
                        }}
                        onClick={() => {
                          setSelected(item.id);
                          setSelectedName(item.nome);
                        }}
                        
                        p="xs"
                        m="sm"
                      >
                         {
                          item.microrregiao ?
                          <Card p="xxs" style={{alignSelf: "start",fontSize:"0.8em"
                            }} color="cyanGreen">MUNICIPIO</Card>
                          :
                          <Card style={{alignSelf: "start",
                          fontSize:"0.8em"}} p="xxs" color="purpleCyan">ESTADO</Card>
                          }
                        <img
                          src={ item.microrregiao ?
                            "https://servicodados.ibge.gov.br/api/v3/malhas/municipios/" +
                            item.id +
                            "?qualidade=minima"
                            :
                            "https://servicodados.ibge.gov.br/api/v3/malhas/estados/" +
                            item.id +
                            "?qualidade=minima"
                          }
                          width={70}
                        />
                        <Heading color={"black"} size="lg" style={{ width: "200px" }}>
                          {item.nome} {
                          item.microrregiao &&
                          <>({item.microrregiao.mesorregiao.UF.sigla})</>
                          }
                         
                        </Heading>
                     
                      </Card>
                    ))}
                  </>
                ) : (
                  <>
                    <Box p="sm">
                      <Card
                        style={{ borderColor: "white" }}
                        color="animated"
                        p="sm"
                      >
                        <Heading
                          size="lg"
                          style={{ textAlign: "center" }}
                         color="black" 
                        >
                          {selectedName}
                        </Heading>
                      </Card>
                    </Box>
                    <Divider />
                    {
                    !ranking ?
                    <><Text as="p" align="center">
                    <LoadingIcons.Puff />
                  </Text></>
                    :
                    ranking?.result
                      .sort(function (a: any, b: any) {
                        if (a.rank > b.rank) {
                          return -1;
                        }
                        if (a.rank < b.rank) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((i: any, c: number) => (
                        <Box key={c} className={"i-am-" + i.nome} p="sm">
                          <Card style={{borderColor:"white"}} variant="subtle" p="md">
                            <Heading>
                              <b>{i.rank}º</b> {i.nome}
                            </Heading>
                            <Text color="white" size="sm">
                              {i.freq
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                              HABITANTES
                            </Text>
                            <div className="bag">
                              <Link
                                to={
                                  "/results/2/" +
                                  i.nome +
                                  "?municipio=" +
                                  selected+
                                  "&inversed=1" 
                                }
                              >
                                <Button color="blackSecondary">
                                  <Text>
                                    <b>
                                    Confira
                                      
                                    </b>
                                    </Text>
                                    </Button>
                              </Link>
                            </div>
                          </Card>
                        </Box>
                      ))}
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
export default InversedRankingMunicipios;
