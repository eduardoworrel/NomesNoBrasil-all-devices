import { Box, Button, Input } from "@dracula/dracula-ui";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = (): JSX.Element => {
  const history = useNavigate();

  const [nome, setNome] = useState("");
  const handleNovaBusca = () => {
    if (nome) history(`/results/1/` + nome);
  };
  return (
    <>
      <Box p="xs" className="flex-cotainer">
        <section className="inputName">
          <Input
            value={nome}
            autoFocus={true}
            onChange={(e) => setNome(e.target.value)}
            color="white"
            placeholder="Um nome"
            m="xs"
          />
        </section>
        <section className="inputButton">
          <Button color="purpleCyan" m="sm" onClick={handleNovaBusca}>
            Pesquisar
          </Button>
        </section>
      </Box>
    </>
  );
};

export default SearchBar;
