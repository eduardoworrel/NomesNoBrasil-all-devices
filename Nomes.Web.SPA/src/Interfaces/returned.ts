export default  interface returned {
    id : number,
    sigla:string,
    nome: string,
    img: string
    microrregiao: undefined | {
      mesorregiao: undefined | {
        UF: undefined | {
          sigla:string
        }
      }
    }
  }