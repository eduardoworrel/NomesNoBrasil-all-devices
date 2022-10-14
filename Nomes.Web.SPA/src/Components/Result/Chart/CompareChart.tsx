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

import { Heading } from "@dracula/dracula-ui";

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
  faixas1: IFaixa[];
  faixas2: IFaixa[];
}

export const CompareChart = ({ faixas1, faixas2 }: IProps) => {
  

  const dados = {
    labels: faixas1.map((a) => a.faixa),
    datasets: [
      {
        label: faixas1[0].nome,
        data: faixas1.map((a) => a.freq),
        borderColor: "cyan",
        backgroundColor: "black",
      },
      {
        label: faixas2[0].nome,
        data: faixas2.map((a) => a.freq),
        borderColor: "yellow",
        backgroundColor: "black",
      },
    ],
  };
  return (
    <>
      <Heading p="xs" m="xs" size="md">
        Acompanhe a evolução históricas destes nomes
      </Heading>
      <Line height={200} data={dados} />
    </>
  );
};
