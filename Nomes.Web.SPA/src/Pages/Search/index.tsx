import { Box, Card, Divider, Heading, Text } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
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

const Search = () => {
  const params = useParams();

  const paginaCallback = params.pagina ? parseInt(params.pagina) : 1;

  const callback = params.callback && (parseInt(params.callback) ?? 0);

  const [tab, setTab] = useState(paginaCallback);
  const [result, setResult] = useState<IMensagemInterna | null>(null);

  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getPaginaInicial();

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
              <Box style={{ textAlign: "center" }}>
                <Text color="white">Nome não encontrado</Text>
              </Box>
            )}

            <Divider />
            <Heading size="sm" className="centered">
              Ou navegue por categoria
            </Heading>
            <br />
            <Box style={{ cursor: "pointer" }}>
              <Card
                onClick={() => setTab(2)}
                color="red"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading style={{ marginTop: "-30px" }} color="red" size="lg">
                  <b style={{ fontSize: "2em" }}>🏆</b> Populares
                </Heading>
                <Text color="red" size="xs" align="right">
                  {result?.result[0].result[0].nome},{" "}
                  {result?.result[0].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>
              <Card
                onClick={() => setTab(4)}
                color="orange"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading
                  style={{ marginTop: "-30px" }}
                  color="orange"
                  size="lg"
                >
                  <b style={{ fontSize: "2em" }}>🔥</b> Ascenção
                </Heading>
                <Text color="orange" size="xs" align="right">
                  {result?.result[6].result[0].nome},{" "}
                  {result?.result[6].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>

              <Card
                onClick={() => setTab(3)}
                style={{ borderColor: "white" }}
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading style={{ marginTop: "-30px" }} color="white" size="lg">
                  <b style={{ fontSize: "2em" }}>⭐</b> Diferentes
                </Heading>
                <Text color="white" size="xs" align="right">
                  {result?.result[7].result[0].nome},{" "}
                  {result?.result[7].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>
              <Card
                onClick={() => setTab(5)}
                color="green"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading style={{ marginTop: "-30px" }} color="green" size="lg">
                  <b style={{ fontSize: "2em" }}>⚽</b> Futebol
                </Heading>
                <Text color="green" size="xs" align="right">
                  {result?.result[1].result[0].nome},{" "}
                  {result?.result[1].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>

              <Card
                onClick={() => setTab(6)}
                color="pink"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading style={{ marginTop: "-30px" }} color="pink" size="lg">
                  {" "}
                  <b style={{ fontSize: "2em" }}>✨</b> Famosos
                </Heading>
                <Text color="pink" size="xs" align="right">
                  {result?.result[2].result[0].nome},{" "}
                  {result?.result[2].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>
              <Card
                onClick={() => setTab(7)}
                color="purple"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading
                  style={{ marginTop: "-30px" }}
                  color="purple"
                  size="lg"
                >
                  {" "}
                  <b style={{ fontSize: "2em" }}>🪐</b> Astronomia
                </Heading>

                <Text color="purple" size="xs" align="right">
                  {result?.result[3].result[0].nome},{" "}
                  {result?.result[3].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>

              <Card
                onClick={() => setTab(8)}
                color="cyan"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading style={{ marginTop: "-30px" }} color="cyan" size="lg">
                  <b style={{ fontSize: "2em" }}>🧘‍♀️ </b> Pensadores
                </Heading>

                <Text color="cyan" size="xs" align="right">
                  {result?.result[4].result[0].nome},{" "}
                  {result?.result[4].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>
              <Card
                onClick={() => setTab(9)}
                color="yellow"
                variant="subtle"
                p="sm"
                m="xs"
              >
                <Text size="lg" as="span" align="right">
                  👆
                </Text>
                <Heading
                  style={{ marginTop: "-30px" }}
                  color="yellow"
                  size="lg"
                >
                  <b style={{ fontSize: "2em" }}>🦸‍♂️</b> Geeks
                </Heading>
                <Text color="yellow" size="xs" align="right">
                  {result?.result[5].result[0].nome},{" "}
                  {result?.result[5].result[0].freq
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  pessoas no Brasil
                </Text>
              </Card>
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
      </Box>
    </>
  );
};
export default Search;
