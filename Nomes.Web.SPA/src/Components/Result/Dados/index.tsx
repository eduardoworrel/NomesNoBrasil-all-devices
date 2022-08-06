import { Heading, Box, Text } from "@dracula/dracula-ui";
import IBasica from "../../../Interfaces/IBasica";

interface IProps {
  informacoesBasicas: IBasica;
  localidadePersonalizada: string;
}

const Dados = ({ informacoesBasicas, localidadePersonalizada }: IProps) => {
  return (
    <>
      <Box color="cyan" rounded="lg" p="xs" m="xs">
        <Heading>
          <Text color="black">
            {informacoesBasicas.rank
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            º em popularidade
          </Text>
        </Heading>
      </Box>
      <Box color="purpleCyan" rounded="lg" p="xs" m="xs">
        <Heading>
          <Text color="black">
            São{" "}
            {informacoesBasicas.freq
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            {informacoesBasicas.nome}'s
          </Text>
        </Heading>
      </Box>
      <Box color="purpleCyan" rounded="lg" p="xs" m="xs">
        <Heading>
          <Text color="black">
            Aproximadamete{" "}
            {informacoesBasicas.percentual.toString().replace(".", ",")}% da
            população
          </Text>
        </Heading>
      </Box>
      {!localidadePersonalizada && informacoesBasicas.ufMax.length > 1 && (
        <Box color="purple" rounded="lg" p="xs" m="xs">
          <Heading>
            <Text color="black">
              {informacoesBasicas.ufMax} é o Estado com mais{" "}
              {informacoesBasicas.nome}'s (
              {parseFloat(informacoesBasicas.ufMaxProp)
                .toFixed(2)
                .replace(".", ",")}{" "}
              a cada 100 mil habitantes)
            </Text>
          </Heading>
        </Box>
      )}
    </>
  );
};
export default Dados;
