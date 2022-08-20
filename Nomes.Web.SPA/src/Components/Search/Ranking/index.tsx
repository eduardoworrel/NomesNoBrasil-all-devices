import { Box, Text, Button, Card, Heading, Divider } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";

import LoadingIcons from "react-loading-icons";

type IFormProps = {
  setTab: (value: number) => void;
};
const Ranking = ({ setTab }: IFormProps) => {
  const params = useParams();
  const nome = params.nome ?? "";
  window.history.replaceState(null, "", `#/2/0`);
 
  const [result, setResult] = useState<IMensagemInterna | null>(null);
  useEffect(() => {
    const load = async () => {
      setResult(await ApiService.getRanking());
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
      {!result && (
        <>
          <Text as="p" align="center">
            <LoadingIcons.Puff />
          </Text>
        </>
      )}
      {result?.result.map((i: any, c: number) => (
        <Box key={c} p="sm">
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
