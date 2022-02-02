import { Box, Text, Button, Card, Heading } from "@dracula/dracula-ui";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMensagemInterna from "../../../Interfaces/IMensagemInterna";
import ApiService from "../../../Services/ApiService";

export default function Diferentes() {
    const [result, setResult] = useState<IMensagemInterna | null>(null)
    useEffect(() => {
        const load = async () => {
            const result = await ApiService.getDiferentes()

            setResult(result)
        }
        load()
    }, []);

    return (

        <>
            {result?.result
                .sort(function (a: any, b: any) {
                    if (a.result[0].rank > b.result[0].rank) {
                        return -1;
                    }
                    if (a.result[0].rank < b.result[0].rank) {
                        return 1;
                    }
                    return 0;
                })
                .map((i: any, c: number) =>

                    <Box key={c} p="sm">

                        <Card color="green" variant="subtle" p="md">
                            <Heading>
                                {i.result[0].nome}
                            </Heading>
                            <Text color="white" size="sm">
                                {i.result[0].freq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} HABITANTES
                        </Text>
                            <div className="bag">
                                <Link to={"/results/" + i.result[0].nome+"/"+2}>
                                    <Button color="cyanGreen">
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