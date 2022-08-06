import IBasica from "./IBasica";
import IFaixa from "./IFaixa";
export default interface ISecoes {
  faixa: IFaixa[];
  basica?: IBasica[];
}
