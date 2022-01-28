import { Box, Text, Button, Card, Heading } from "@dracula/dracula-ui";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";


const Ranking = () => {
    const [result, setResult] = useState<IMensagemInterna | null>(null)
    useEffect(() => {
        const load = async () => {
            setResult(await ApiService.getRanking(10))
        }
        load()
    }, []);

    return (

        <>
            <Heading p="sm">
                TOP 10 BRASIL
            </Heading>
            {result?.result.map((i: any, c: number) =>
                <Box key={c} p="sm">
                    <Card color="cyan" variant="subtle" p="md">
                        <Heading>
                            <b>{i.rank}º</b> {i.nome}
                        </Heading>
                        <Text color="white" size="sm">
                            {i.freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} HABITANTES
                        </Text>
                        <div className="bag">
                            <Link to={"/results/" + i.nome}>
                                <Button color="purpleCyan">
                                    Confira
                                </Button>
                            </Link>
                        </div>
                    </Card>

                </Box>

            )}

        </>
    )
}
export default Ranking