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
  faixas: IFaixa[][];
}

export const CompareChart = ({ faixas }: IProps) => {
  

  const dados = {
    labels: faixas[0].map((a) => a.faixa),
    datasets: 
      faixas.filter(faixa=>faixa != null && faixa.length > 0)
      .map((faixa)=>{
        
          return {
            label: faixa[0].nome,
            data: faixa.map((a) => a.freq),
            borderColor: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
            backgroundColor:'#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
          };
        
      })
    ,
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
