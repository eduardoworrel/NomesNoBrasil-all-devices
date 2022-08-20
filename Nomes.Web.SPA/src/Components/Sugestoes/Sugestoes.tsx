import { Box, Button, Divider, Heading, Text } from "@dracula/dracula-ui";
import { useState } from "react";
import ApiService from "../../Services/ApiService";
type IFormProps = {
  setTab: (value: number) => void;
};

export const Sugestoes = ({ setTab }: IFormProps) => {

  window.history.replaceState(null, "", `#/10/0`);
  const [style,setStyle] = useState({
    height:"50px",
    opacity:"1"
  });
  const [send,setSend] = useState(false);
  function thanks(){
    if(msg.length == 0){
      alert("Escreva algo ;/ ")
      return 
    }
    if(msg.length < 3){
      alert("Se puder escrever uma mensagem maior ;D ")
      return 
    }
    setStyle({
      height:"0px",
      opacity:"0"
    })
    ApiService.sendMensage(msg);
    setSend(true)
  }
  const [msg,setMsg] = useState("")

  return (
    <>
     <Text
        style={{ cursor: "pointer" }}
        as="a"
        color="white"
        onClick={() => {
          window.history.replaceState(null, "", "#/1/0");
          setTab(1);
        }}
      >
        {" "}
        ⏪ Voltar
      </Text>
      <Text color="white" style={{ float: "right" }}>
        <b style={{ fontSize: "2em" }}>💡</b> CONTRIBUIR&nbsp;&nbsp;
      </Text>
      <Divider color="pink" />
      <br/>
      
      <br/>
      <Box>
        {!send ?
        <>
        <Heading>
        Nos ajude a crescer
        </Heading>
        <Text as="p">
          Contribua com sugestões de qualquer tipo 😁
        </Text>
        <textarea value={msg} style={style}
          onChange={(e) => setMsg(e.target.value)}
          onFocus={()=>{
            setStyle({
              height:"200px",
              opacity:"1"
            })
          }}
        className="drac-input drac-input-white drac-text-white"></textarea>
        <Text as="p" align="right">
          <Button color="yellowPink"  onClick={()=>{
            thanks();
          }} >Enviar</Button>
        </Text>
        </>
        : <>
          <Heading size="xl" >
        Obrigado pela mensagemn
        </Heading>  
        <Text as="p" align="center">
       
          <b style={{fontSize:"5em"}}>💖</b>
        </Text>
        </>
      }
        

    </Box>
    </>
  );
};
