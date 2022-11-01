import { createRef, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Heading,
  Input,
  Table,
  Text,
} from "dracula-ui";
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
import ISecoes from "../../Interfaces/ISecoes";
import { CompareChart } from "../../Components/Result/Chart/CompareChart";
import IBasica from "../../Interfaces/IBasica";

function Agrupar() {
  const history = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [nomes, setNomes] = useState<string[]>([]);
  const [nomesNotFound, setNomesNotFound] = useState<string[]>([]);
  const [nome, setTempNome] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [dados, setDados] = useState<ISecoes[]>([]);

  const addName = async () => {
    if (nome.length < 2 || nomes.includes(nome)) {
      return;
    }
    setNomes([nome, ...nomes]);
    setTempNome("");
  };
  const handleBusca = async () => {
    if (nomes.length < 2) {
      alert("Digite pelo menos 2 nomes.");
      return;
    }
    setIsLoading(true);
    const temp: ISecoes[] = [];
    const tempNotfount : string[] = [];
    for (const _nome of nomes) {
      const secao: ISecoes = {
        faixa: await (await ApiService.getFaixa(_nome)).result,
        basica: await (await ApiService.getBasica(_nome)).result,
      };
      if(secao.basica && secao.basica.length > 0){

        temp.push(secao);
      }else{
        tempNotfount.push(_nome)
      }
    }
    temp.sort((a: ISecoes, b: ISecoes) => {
      if (
        a.basica != null &&
        a.basica.length > 0 &&
        b.basica != null &&
        b.basica.length > 0
      ) {
        if (a.basica[0].rank > b.basica[0].rank) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setNomesNotFound(tempNotfount);
    setDados(temp);
  };

  return !isLoading ? (
    <>
      <Heading
        className="topo"
        size="lg"
        color="white"
        style={{ float: "right" }}
      >
        <b style={{ fontSize: "1.8em" }}> 👥👥</b>
      </Heading>
      <Text>
        <Link
          to={"/1/2"}
          style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
        >
          ⏪ Voltar
        </Link>
      </Text>
      <Divider color="purple" />
      <br />
      <Heading p="sm">Agrupar nomes</Heading>
      <Box>
        <Box>
          <Box p="xs" className="flex-cotainer">
            <section className="inputName">
              <Input
                value={nome}
                onChange={(e) => setTempNome(e.target.value)}
                color="white"
                placeholder="Um nome"
                m="xs"
              />
            </section>
            <section className="inputButton">
              <Button color="purpleCyan" m="sm" onClick={addName}>
                ➕
              </Button>
            </section>
          </Box>
          <Box p="sm" className="flex-cotainer">
            <Table>
              {nomes.length > 0 ? (
                <>
                  <thead>
                    <tr>
                      <th className="drac-text drac-text-white">
                        Nomes informados
                      </th>
                      <th className="drac-text drac-text-white"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {nomes.map((e, index) => (
                      <tr key={index}>
                        <td className="drac-text drac-text-white">{e}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="drac-text drac-text-white"
                          onClick={() => {
                            setNomes(nomes.filter((i) => i != e));
                          }}
                          align="center"
                        >
                          ❌
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th className="drac-text drac-text-white">
                        Nomes informados
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="drac-text drac-text-white">
                        Insira pelo menos dois nomes
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
          </Box>
          <Text align="center" as="p" className="inputButton">
            <Button onClick={handleBusca} color="animated" m="sm">
              Agrupar
            </Button>
          </Text>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Heading
        className="topo"
        size="lg"
        color="white"
        style={{ float: "right" }}
      >
        <b style={{ fontSize: "1.8em" }}>👥👥</b>
      </Heading>
      <Text>
        <div
          onClick={() => {

          setNomesNotFound([]);
            setIsLoading(false);
          }}
          style={{ cursor: "pointer", color: "white", textDecoration: "none" }}
        >
          ⏪ Voltar
        </div>
      </Text>
      <Divider color="purple" />
      <br />
      {dados.length > 0 || nomesNotFound.length > 0 ? (
        <>
          {dados.map((i: ISecoes, c: number) => {
            if (i.basica != null && i.basica.length > 0) {
              return (
                <Box className={"i-am-" + i.basica[0].nome} key={c} p="xs">
                  <Card
                    style={{ borderColor: "purple" }}
                    variant="subtle"
                    p="sm"
                  >
                    <Heading>
                      {c == 0 ? "🏆 " : ""}
                      {c == 1 ? "🥈 " : ""}
                      {c == 2 ? "🥉 " : ""}
                      {c + 1}º {i.basica[0].nome}
                    </Heading>
                    <Text color="purple" size="sm">
                      {i.basica[0].freq
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                      HABITANTES
                    </Text>
                  </Card>
                </Box>
              );
            }
          })}
          {nomesNotFound.map((nome: string, c: number) => {
            
              return (
                <Box className={"i-am-" + nome} key={c} p="xs">
                  <Card
                    style={{ borderColor: "purple" }}
                    variant="subtle"
                    p="sm"
                  >
                    <Heading>?º {nome.toUpperCase()}</Heading>
                    <Text color="purple" size="sm">
                      Dados insuficientes ;/
                    </Text>
                  </Card>
                </Box>
              );
            
          })}
           {dados.length > 0 &&
            <CompareChart faixas={dados.map((i) => i.faixa)} />
           }
        </>
      ) : (
        <Text color="white" size="lg" align="center" as="p">
          Carregando {nomes.length} nomes
        </Text>
      )}
    </>
  );
}
export default Agrupar;
