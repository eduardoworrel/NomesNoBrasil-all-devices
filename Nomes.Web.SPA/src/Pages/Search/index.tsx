import { Box, Heading, Text } from "@dracula/dracula-ui"
import { useParams } from "react-router-dom"
import Ranking from "../../Components/Search/Ranking"
import SearchBar from "../../Components/Search/SearchBar"

const Search = () => {
    const params = useParams();
    const callback = params.callback && (parseInt(params.callback) ?? 0);

    return (
        <>
            <Heading size="sm" className="centered">Pesquise um nome</Heading>

            <SearchBar />
            {(callback == 1) &&
                <Box style={{ textAlign: "center" }}>
                    <Text color="white">Nome não encontrado</Text>
                </Box>
            }
            <Ranking />
        </>
    )

}

export default Search