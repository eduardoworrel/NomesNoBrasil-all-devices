import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Heading } from "dracula-ui";

import IFaixa from "../../../Interfaces/IFaixa";

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
  faixas: IFaixa[];
  paralelas: IFaixa[][];
}

export const HistoryChart = ({ faixas,paralelas }: IProps) => {
  const labels = faixas.map((a) => a.faixa);
  const ds = [{
              label: faixas[0].nome,
              data: faixas.map((a) => a.freq),
              borderColor: "yellowgreen",
              backgroundColor: "black",
            },]
  for(const p of paralelas){
    ds.push({
      label: p[0].nome,
      data: p.map((a) => a.freq),
      borderColor: "grey",
      backgroundColor: "white",
    })
  }
  const dados = {
    labels,
    datasets: ds,
  };
  return (
    <>
      <Heading p="xs" m="xs" size="md">
        Acompanhe a evolução históricas deste nome
      </Heading>
      <Line height={300} data={dados} />
    </>
  );
};
