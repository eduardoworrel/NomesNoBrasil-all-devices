import { Box, Text, Button, Card, Heading, Divider } from "@dracula/dracula-ui";
import { useContext, useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";
import { Link, useParams } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";
type IFormProps = {
  setTab: (value: number) => void;
};
export default function Ascencao({ setTab }: IFormProps) {
  const params = useParams();
  const nome = params.nome ?? "";
  window.history.replaceState(null, "", `#/4/${nome}/0`);
  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      const result = await ApiService.getAsncencao();
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
          window.history.replaceState(null, "", "#/1/0/0");
          setTab(1);
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text color="orange" style={{ float: "right" }}>
        {" "}
        <a style={{ fontSize: "2em" }}>🔥</a> Ascenção&nbsp;&nbsp;
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
          <Box key={c} p="sm">
            <Card color="orange" variant="subtle" p="md">
              <Heading>{i.result[0].nome}</Heading>
              <Text color="white" size="sm">
                {i.result[0].freq
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                HABITANTES
              </Text>
              <div className="bag">
                <Link to={"/results/4/" + i.result[0].nome + "/"}>
                  <Button color="orange">Confira</Button>
                </Link>
              </div>
            </Card>
          </Box>
        ))}
    </>
  );
}
