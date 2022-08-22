import Artistas from "../Components/Search/Artistas";
import IMensagemInterna from "../Interfaces/IMensagemInterna";
import returned from "../Interfaces/returned";
import {
  ASCENCAO,
  DIFERENTES,
  PAGINA_INICIAL,
  FUTEBOL,
  FAMOSOS,
  ASTRONOMIA,
  PENSADORES,
  GEEKS,
  FAMOSOS_NACIONAL,
  FLORES,
  PRESIDENTES,
} from "./consts";
const ENDPOINT_FAIXA =
  "https://servicodados.ibge.gov.br/api/v1/censos/nomes/faixa";
const ENDPOINT_BASICA =
  "https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica";
const ENDPOINT_RANKING =
  "https://servicodados.ibge.gov.br/api/v1/censos/nomes/ranking";

  const CATEGORIAS =
  "https://api2.nomesnobrasil.com/Categorias";
  const SUGESTOES =
  "https://api2.nomesnobrasil.com/Sugestoes";
const UF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
const MALHA_UF = "https://servicodados.ibge.gov.br/api/v3/malhas/estados/"

const SUCESSO = 1,
  ERRO = 0;
class ApiService {



  static getEstados = async (): Promise<returned[]> => {
    
    try {
      const ufs : returned[] = await (await fetch(UF)).json();
      return ufs
    } catch (e) {
      return  []
    }
  };
  

  static sendMensage = (msg : string) =>{
    try {
      const body = {
        method: 'POST',
      }
    fetch(SUGESTOES+"?mensagem=" + msg, body)   
     
    } catch (e) {
     alert(e)
    }
  }
  static getFaixa = async (
    nome: string,
    estado = ""
  ): Promise<IMensagemInterna> => {
    try {
      let stringBuilder = "?nome=" + nome;
      if (estado) {
        stringBuilder += "&regiao=" + estado;
      }
      const faixa = await (await fetch(ENDPOINT_FAIXA + stringBuilder)).json();

      return {
        mensagem: SUCESSO,
        result: faixa,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getBasica = async (
    nome: string,
    estado = ""
  ): Promise<IMensagemInterna> => {
    try {
      let stringBuilder = "?nome=" + nome;
      if (estado) {
        stringBuilder += "&regiao=" + estado;
      }
      const faixa = await (await fetch(ENDPOINT_BASICA + stringBuilder)).json();

      return {
        mensagem: SUCESSO,
        result: faixa,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getRankingByEstado = async (quantidade = 15,estado:number | string): Promise<IMensagemInterna> => {
    try {
      let stringBuilder = "?regiao="+estado+"&qtd=" + quantidade;
      const ranking = await (
        await fetch(ENDPOINT_RANKING + stringBuilder)
      ).json();

      return {
        mensagem: SUCESSO,
        result: ranking,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getRanking = async (quantidade = 50): Promise<IMensagemInterna> => {
    try {
      let stringBuilder = "?qtd=" + quantidade;
      const ranking = await (
        await fetch(ENDPOINT_RANKING + stringBuilder)
      ).json();

      return {
        mensagem: SUCESSO,
        result: ranking,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getCategorias = async (tentativa = 0): Promise<IMensagemInterna> => {
    
    try {
      const cat = await (await fetch(CATEGORIAS)).json();
     
      return {
        mensagem: SUCESSO,
        result: cat,
      };
    } catch (e) {
      if(tentativa == 3){

        return {
          mensagem: ERRO,
          result: [],
        };
      }else{
        return this.getCategorias(tentativa + 1)
      }
    }
  };
  
  static putVisit = (categoriaId : string): void => {
    
  
    const body = {
      method: 'POST',
    }
    fetch(CATEGORIAS+"?categoriaId=" + categoriaId, body).catch((e)=>{
     
    })
  };

  static getPaginaInicial = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of PAGINA_INICIAL) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getFutebol = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of FUTEBOL) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getFamosos = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of FAMOSOS) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getArtistas = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of FAMOSOS_NACIONAL) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getFlores = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of FLORES) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getPresidentes = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of PRESIDENTES) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getAstronomia = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of ASTRONOMIA) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getPensadores = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of PENSADORES) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getGeeks = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of GEEKS) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
  static getDiferentes = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of DIFERENTES) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };

  static getAsncencao = async (): Promise<IMensagemInterna> => {
    const result = [];
    try {
      for (let nome of ASCENCAO) {
        result.push(await ApiService.getBasica(nome));
      }
      return {
        mensagem: SUCESSO,
        result: result,
      };
    } catch (e) {
      return {
        mensagem: ERRO,
        result: [],
      };
    }
  };
}

export default ApiService;
