
import { Anchor, Box, Divider, Heading, List } from '@dracula/dracula-ui';

export function Rodape() {
    return (
        <>
        <Box style={{ bottom: "10px" }}>
        <Divider />
        <List variant="none" color="purple">
          <li className="drac-text drac-text-white">
            Desenvolvido por <Anchor isExternal={true} href="https://eduardoworrel.com"
              color="cyanGreen" hoverColor="yellowPink" mb="sm">
              Eduardo Worrel
              </Anchor>
          </li>
          <li className="drac-text drac-text-white">Disponível em <Anchor isExternal={true} 
           href="https://github.com/eduardoworrel/NomesNoBrasil-web-app-desktop" 
           color="cyanGreen" hoverColor="yellowPink" mb="sm">
            Github
            </Anchor>
          </li>
        </List>
      </Box>
      </>
    )
}