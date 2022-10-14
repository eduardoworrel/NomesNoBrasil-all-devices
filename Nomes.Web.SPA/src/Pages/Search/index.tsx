import { Box, Card, ColorNames, Divider, Heading, Text } from "dracula-ui";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
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
import Artistas from "../../Components/Search/Artistas";
import Flores from "../../Components/Search/Flores";
import Presidentes from "../../Components/Search/Presidentes";
import { scrollElementIntoView } from "../../Services/scroll";
import { Link } from "react-router-dom";

const Search = () => {
  const params = useParams();

  const paginaCallback = params.pagina ? parseInt(params.pagina) : 1;

  const callback = params.callback && (params.callback ?? "");

  const [tab, setTab] = useState(paginaCallback);
  const [result, setResult] = useState<IMensagemInterna | null>(null);
  const [cat, setCat] = useState<IMensagemInterna | null>(null);

  const [clickAgrupar, setCA] = useState(false);
  const [clickComparar, setCC] = useState(false);

  const [ref, setRef] = useState(0);

  useEffect(() => {


    const load = async () => {
      try {
        if (!cat) {
          const categoria = await ApiService.getCategorias();
          setCat(categoria);
        }
        if (ref != 0) {
          const reference = document.querySelector(
            `.from-aba-` + ref
          ) as HTMLElement
          scrollElementIntoView(reference, 'smooth')
          setRef(0)
        }
      } catch { }
      try {
        if (!result) {
          const result = await ApiService.getPaginaInicial();
          setResult(result);
        }

      } catch { }


    };
    load();
  }, [ref]);

  return (
    <>
      <Box>
        {tab === 1 && (
          <>
            <Heading size="sm" className="centered">
              Pesquise um nome
            </Heading>

            <SearchBar />

            <Divider />
            <Box style={{ justifyContent: "center", display: "flex", flexFlow: "row wrap", cursor: "pointer", width: "100%" }}>
              <Card
                className="from-aba-2"
                onClick={() => {
                  setTab(2)
                }} style={{ width: "45%", textAlign: "center", float: "left", cursor: "pointer" }} variant="subtle" color="cyan" m="xs" p="sm">
                <b style={{ fontSize: "1.6em" }}>🥉🥇🥈</b>
                <Divider color="red" />
                <Text >
                  POPULARES
                </Text>
              </Card>

              <Link style={{ textDecoration: "none", display: "contents" }} to={"/agrupar/"}>
                <Card style={{ width: "45%", textAlign: "center", float: "left" }}
                  onClick={() => {
                    setCA(true)
                    setTimeout(() => {
                      setCA(false)
                    }, 2000)
                  }}
                  variant="subtle" color="cyan" m="xs" p="sm">
                  <b style={{ fontSize: "1.7em" }}>
                    👥👥
                  </b>
                  <Divider  color="purple"  />
                  <Text>

                    AGRUPAR

                  </Text>
                </Card>
              </Link>
              <Card className="from-aba-10"
                onClick={() => setTab(10)} style={{ width: "45%", textAlign: "center", float: "left" }} variant="subtle" color="cyan" m="xs" p="sm">
                <b style={{ fontSize: "1.5em" }}>💡</b>
                <Divider color="pink" />
                <Text>
                  CONTRIBUIR
                </Text>

              </Card>
              <Link style={{ textDecoration: "none", display: "contents" }} to={"/comparar/"}>
                <Card
                  style={{ width: "45%", textAlign: "center", float: "left" }} variant="subtle" color="cyan" m="xs" p="sm">

                  <b style={{ fontSize: "1.5em" }}>
                    👤 ❌ 👤
                  </b>
                  <Divider color="yellow" />
                  <Text>

                    COMPARAR


                  </Text>
                </Card>
              </Link>
            </Box>
            <Divider style={{ clear: "both" }} />
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
              {cat && cat.result.map((i: { id: number, count: number; color: ColorNames; emoji: string; titulo: string; principalNameIndex: string; searchTabIndex: string; }) =>
                i.titulo != "Populares" &&
                <Box
                  className={"from-aba-" + i.searchTabIndex}
                  key={i.id}>
                  <Card
                    onClick={() => setTab(parseInt(i.searchTabIndex))}
                    color={i.color}
                    style={i.color == "white" ? { borderColor: "white" } : {}}
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
        {tab === 2 && <Ranking setRef={setRef} setTab={setTab} />}

        {tab === 3 && <Diferentes setRef={setRef} setTab={setTab} />}
        {tab === 4 && <Ascencao setRef={setRef} setTab={setTab} />}
        {tab === 5 && <Futebol setRef={setRef} setTab={setTab} />}
        {tab === 6 && <Famosos setRef={setRef} setTab={setTab} />}
        {tab === 7 && <Astronomia setRef={setRef} setTab={setTab} />}
        {tab === 8 && <Pensadores setRef={setRef} setTab={setTab} />}
        {tab === 9 && <Geeks setRef={setRef} setTab={setTab} />}
        {tab === 10 && <Sugestoes setRef={setRef} setTab={setTab} />}
        {tab === 11 && <Artistas setRef={setRef} setTab={setTab} />}
        {tab === 12 && <Flores setRef={setRef} setTab={setTab} />}
        {tab === 13 && <Presidentes setRef={setRef} setTab={setTab} />}
      </Box>
    </>
  );
};
export default Search;
