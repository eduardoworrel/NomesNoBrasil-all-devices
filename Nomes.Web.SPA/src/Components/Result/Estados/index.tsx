import { Select } from "@dracula/dracula-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
  preSelecionado: string;
  setEstado: Function;
}

export default function Estados({ preSelecionado, setEstado }: IProps) {
  const handleEstado = (estado: string) => {
    setEstado(estado);
  };

  return (
    <>
      <Select
        onChange={(e) => handleEstado(e.target.value)}
        size="large"
        color="white"
      >
        <option value="">Brasil</option>
        <option value="12">Acre</option>
        <option value="27">Alagoas</option>
        <option value="16">Amapá</option>
        <option value="13">Amazonas</option>
        <option value="29">Bahia</option>
        <option value="23">Ceará</option>
        <option value="53">Distrito Federal</option>
        <option value="32">Espírito Santo</option>
        <option value="52">Goiás</option>
        <option value="21">Maranhão</option>
        <option value="51">Mato Grosso</option>
        <option value="50">Mato Grosso do Sul</option>
        <option value="31">Minas Gerais</option>
        <option value="15">Pará</option>
        <option value="25">Paraíba</option>
        <option value="41">Paraná</option>
        <option value="26">Pernambuco</option>
        <option value="22">Piauí</option>
        <option value="33">Rio de Janeiro</option>
        <option value="24">Rio Grande do Norte</option>
        <option value="43">Rio Grande do Sul</option>
        <option value="11">Rondônia</option>
        <option value="14">Roraima</option>
        <option value="42">Santa Catarina</option>
        <option value="35">São Paulo</option>
        <option value="28">Sergipe</option>
        <option value="17">Tocantins</option>
      </Select>
    </>
  );
}
