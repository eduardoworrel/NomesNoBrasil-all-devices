import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { Heading } from "@dracula/dracula-ui";

import IFaixa from '../../../Interfaces/IFaixa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
interface IProps {
    faixas: IFaixa[]
}

export const HistoryChart = ({ faixas }: IProps) => {
    const labels = faixas.map(a => a.faixa);

    const dados = {
        labels,
        datasets: [
            {
                label: "",
                data: faixas.map((a) => a.freq),
                borderColor: 'yellowgreen',
                backgroundColor: 'black',
            },
        ],
    };
    return <>
        <Heading p="xs" m="xs" size="xs">
            Acompanhe a evolução históricas deste nome
        </Heading>
        <Line height={300}  data={dados} />
    </>



}