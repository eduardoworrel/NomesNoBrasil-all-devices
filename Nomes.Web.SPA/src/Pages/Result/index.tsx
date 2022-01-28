import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Heading, Input } from "@dracula/dracula-ui";
import { HistoryChart } from '../../Components/Result/Chart/HistoryChart';
import Dados from '../../Components/Result/Dados';
import ISecoes from '../../Interfaces/ISecoes';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../Services/ApiService';


function Results() {

    const history = useNavigate();
    const params = useParams();
    const nome = params.nome ?? "";

    const [secao, setSecao] = useState<ISecoes | null>(null)
    useEffect(() => {
        const handle = async () => {
            const secao: ISecoes = {
                faixa: await (await ApiService.getFaixa(nome)).result,
                basica: await (await ApiService.getBasica(nome)).result
            }
            if (!secao.faixa.length) {
                const callback = 1
                history("/" + callback);
            }
            setSecao(secao)

        }
        handle()
    }, [])

    const informacoesBasicas = secao?.basica && secao?.basica[0]
    const faixa = secao?.faixa

    if (!informacoesBasicas || !faixa) {
        return <></>
    }

    return (
        <>
            <Heading size="sm" className="centered">{informacoesBasicas.nome}</Heading>
            <Box>
                <Box p="xs" className="flex-cotainer">
                    <section className="inputName" >
                        <Input
                            style={{ color: "white" }}
                            value={informacoesBasicas.nome}
                            disabled={true}
                        />
                    </section>
                    <section className="inputButton" >
                        <Link to="/">
                            <Button color="cyanGreen" m="sm">
                                Resetar
                        </Button>
                        </Link>

                    </section>
                </Box>
                <Box>
                    <Dados informacoesBasicas={informacoesBasicas} />
                </Box>
                <br />
                <Divider />
                <Box className="grafico">
                    <Box p="xs" m="xs">
                        <HistoryChart faixas={faixa} />
                    </Box>
                </Box>
            </Box>
        </>
    )

}
export default Results;