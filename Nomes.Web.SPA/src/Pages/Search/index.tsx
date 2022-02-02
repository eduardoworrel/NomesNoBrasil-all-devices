import { Box, Heading, Tabs, Text } from "@dracula/dracula-ui"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Ranking from "../../Components/Search/Ranking"
import SearchBar from "../../Components/Search/SearchBar"
import Diferentes from "../../Components/Search/Diferentes"
import Ascencao from "../../Components/Search/Ascencao"


const Search = () => {
    const params = useParams();
    const abaCallback = params.aba ?? 1;
    const callback = params.callback && (parseInt(params.callback) ?? 0);
    const [tab,setTab] = useState(abaCallback)
    return (
        <>
            <Heading size="sm" className="centered">Pesquise um nome</Heading>

            <SearchBar />
            {(callback == 1) &&
                <Box style={{ textAlign: "center" }}>
                    <Text color="white">Nome não encontrado</Text>
                </Box>
            }
            <Tabs color={tab == 1 ? 'cyan' : tab== 2 ? 'green': 'pink'} m="xs" style={{ width: "100%" }}>
                <li className={"drac-tab " + (tab == 1 && ' drac-tab-active')}>
                    <a onClick={()=>setTab(1)} className="drac-tab-link drac-text" href="#">
                        Populares
                    </a>
                </li>
                <li className={"drac-tab " + (tab == 2 && ' drac-tab-active')}>
                    <a onClick={()=>setTab(2)} className="drac-tab-link drac-text" href="#">
                        Diferentes
                    </a>
                </li>
                <li className={"drac-tab " + (tab == 3 && ' drac-tab-active')}>
                    <a onClick={()=>setTab(3)} className="drac-tab-link drac-text" href="#">
                        Ascenção
                    </a>
                </li>
            </Tabs>
            <Box>
            {tab == 1 && <Ranking />}
            {tab == 2 && <Diferentes />}
            {tab == 3 && <Ascencao />}
            </Box>
            


        </>
    )

}

export default Search