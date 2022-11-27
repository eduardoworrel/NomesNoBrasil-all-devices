export default interface returned {
  id: number;
  sigla: string;
  nome: string;
  img: string;
  municipio: {
    id: number;
    nome: string;
  } | undefined;
  microrregiao:
    | undefined
    | {
        mesorregiao:
          | undefined
          | {
              UF:
                | undefined
                | {
                    sigla: string;
                  };
            };
      };
}
