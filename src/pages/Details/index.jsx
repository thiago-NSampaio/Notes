import { Container, Content } from "./styles.js";

import { Button } from "../../components/Button/";
import { Header } from "../../components/Header/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Links } from "../../components/Section/styles.js";
import { Tag } from "../../components/Tag/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";

export function Details() {
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <ButtonText titlle="Excluir Nota" />

          <h1>Introdução ao React</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo excepturi, dignissimos in provident ea beatae, id vitae natus qui commodi veritatis? Aliquam dolorum, aspernatur eos numquam earum aliquid sit molestiae.</p>

          <Section title="Links úteis">
            <Links>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </Links>
          </Section>
          <Section title="Marcadores">
            <Tag title="Node" />
            <Tag title="Express" />
          </Section>
          <Button title="Voltar" />
        </Content>
      </main>
    </Container>
  );
}
