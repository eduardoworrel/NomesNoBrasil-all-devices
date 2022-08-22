import { Box, Text, Button, Card, Heading, Divider } from "@dracula/dracula-ui";
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
export default function Artistas({ setTab,setRef }: IFormProps) {

  const  [searchParams, setSearchParams] = useSearchParams();
 
  window.history.replaceState(null, "", `#/11`);

  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getArtistas();

      ApiService.putVisit("9")
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
          setRef(11);
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "2em" }}>👩‍🎤</b> Artistas&nbsp;&nbsp;
      </Text>
      <Divider color="orange" />
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
          <Box key={c} p="sm"
              
          className={"i-am-" + i.result[0].nome}>
        
            <Card style={{ borderColor: "orange" }} variant="subtle" p="md">
              <Heading>{i.result[0].nome}</Heading>
              <Text color="orange" size="sm">
                {i.result[0].freq
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                HABITANTES
              </Text>
              <div className="bag">
                <Link to={"/results/11/" + i.result[0].nome + "/"}>
                  <Button color="orange">Confira</Button>
                </Link>
              </div>
            </Card>
          </Box>
        ))}
    </>
  );
}
