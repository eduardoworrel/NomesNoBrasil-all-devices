import IMensagemInterna from '../Interfaces/IMensagemInterna';
import { ASCENCAO, DIFERENTES } from './consts';
const ENDPOINT_FAIXA = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/faixa';
const ENDPOINT_BASICA = 'https://servicodados.ibge.gov.br/api/v1/censos/nomes/basica';
const ENDPOINT_RANKING = "https://servicodados.ibge.gov.br/api/v1/censos/nomes/ranking"

const SUCESSO = 1, ERRO = 0
class ApiService {
    static getFaixa = async (nome: string, estado = ""): Promise<IMensagemInterna> => {
        try {
            let stringBuilder = "?nome=" + nome
            if (estado) {
                stringBuilder += "&regiao=" + estado
            }
            const faixa = await (
                await fetch(ENDPOINT_FAIXA + stringBuilder)
            ).json();

            return {
                mensagem: SUCESSO,
                result: faixa,
            }

        } catch (e) {
            return {
                mensagem: ERRO,
                result: [],
            }
        }
    }
    static getBasica = async (nome: string, estado = ""): Promise<IMensagemInterna> => {
        try {
            let stringBuilder = "?nome=" + nome
            if (estado) {
                stringBuilder += "&regiao=" + estado
            }
            const faixa = await (
                await fetch(ENDPOINT_BASICA + stringBuilder)
            ).json();

            return {
                mensagem: SUCESSO,
                result: faixa,
            }
        } catch (e) {
            return {
                mensagem: ERRO,
                result: [],
            }
        }
    }
    static getRanking = async (quantidade = 15): Promise<IMensagemInterna> => {
        try {
            let stringBuilder = "?qtd=" + quantidade
            const ranking = await (
                await fetch(ENDPOINT_RANKING + stringBuilder)
            ).json();

            return {
                mensagem: SUCESSO,
                result: ranking,
            }
        } catch (e) {
            return {
                mensagem: ERRO,
                result: [],
            }
        }
    }
    static getDiferentes = async (): Promise<IMensagemInterna> => {
        const result = [];
        try {
            for (let nome of DIFERENTES) {
                result.push(await ApiService.getBasica(nome))
            }
            return {
                mensagem: ERRO,
                result: result,
            }
        } catch (e) {
            return {
                mensagem: ERRO,
                result: [],
            }
        }
    }
    
    static getAsncencao = async (): Promise<IMensagemInterna> => {
        const result = [];
        try {
            for (let nome of ASCENCAO) {
                result.push(await ApiService.getBasica(nome))
            }
            return {
                mensagem: ERRO,
                result: result,
            }
        } catch (e) {
            return {
                mensagem: ERRO,
                result: [],
            }
        }
    }
}

export default ApiService