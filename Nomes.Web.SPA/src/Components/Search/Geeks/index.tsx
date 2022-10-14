import { Box, Text, Button, Card, Heading, Divider } from "dracula-ui";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { Link, useParams, useSearchParams } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";
import { scrollElementIntoView } from "../../../Services/scroll";


type IFormProps = {
  setTab: (value: number) => void;
  setRef: (value: number) => void;
};
export default function Geeks({ setTab, setRef }: IFormProps) {
  const  [searchParams, setSearchParams] = useSearchParams();
 
  window.history.replaceState(null, "", `#/9/0`);

  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getGeeks();

      ApiService.putVisit("8")
      setResult(result);
      const nome = searchParams.get("callback") ?? "";
      setSearchParams({})
      if(nome){
        const reference = document.querySelector(
          ".i-am-"+nome
        ) as HTMLElement
        if(reference)
        scrollElementIntoView(reference,'smooth')
      }
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
          setRef(9)
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "2em" }}>🦸‍♂️</b> Geeks&nbsp;&nbsp;
      </Text>
      <Divider color="yellow" />
      {!result && (
        <>
          <Text as="p" align="center">
            <LoadingIcons.Puff />
          </Text>
        </>
      )}
      {result?.result
        .sort(function (a: any, b: any) {
          if (a.result[0].rank > b.result[0].rank) {
            return 1;
          }
          if (a.result[0].rank < b.result[0].rank) {
            return -1;
          }
          return 0;
        })
        .map((i: any, c: number) => (
          <Box 
          className={"i-am-" + i.result[0].nome}
          key={c} p="sm">
            <Card style={{ borderColor: "yellow" }} variant="subtle" p="md">
              <Heading>{i.result[0].nome}</Heading>
              <Text color="yellow" size="sm">
                {i.result[0].freq
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                HABITANTES
              </Text>
              <div className="bag">
                <Link to={"/results/9/" + i.result[0].nome + "/"}>
                  <Button color="yellow">Confira</Button>
                </Link>
              </div>
            </Card>
          </Box>
        ))}
    </>
  );
}
