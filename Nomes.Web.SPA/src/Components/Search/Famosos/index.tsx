import { Box, Text, Button, Card, Heading, Divider } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { Link, useParams } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";

type IFormProps = {
  setTab: (value: number) => void;
};
export default function Famosos({ setTab }: IFormProps) {
  const params = useParams();
  const nome = params.nome ?? "";
  window.history.replaceState(null, "", `#/6/0`);

  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getFamosos();

      setResult(result);
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
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "2em" }}>✨</b> Famosos&nbsp;&nbsp;
      </Text>
      <Divider />
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
          <Box key={c} p="sm">
            <Card style={{ borderColor: "pink" }} variant="subtle" p="md">
              <Heading>{i.result[0].nome}</Heading>
              <Text color="pink" size="sm">
                {i.result[0].freq
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                HABITANTES
              </Text>
              <div className="bag">
                <Link to={"/results/6/" + i.result[0].nome + "/"}>
                  <Button color="pink">Confira</Button>
                </Link>
              </div>
            </Card>
          </Box>
        ))}
    </>
  );
}
