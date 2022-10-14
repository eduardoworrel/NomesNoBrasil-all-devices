import { Box, Button, Input } from "dracula-ui";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = (): JSX.Element => {
  const history = useNavigate();
  const params = useParams();
  const callback = params.callback && (parseInt(params.callback) ?? 0);

  
  const [nome, setNome] = useState(params.nome ?? "");
  const handleNovaBusca = () => {
    if (nome) {
      history(`/results/1/` + nome )
      window.location.reload()
    }
  };
  return (
    <>
      <Box p="xs" className="flex-cotainer">
        <section className="inputName">
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            color="white"
            placeholder="Um nome"
            autoFocus={callback == 1}
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
