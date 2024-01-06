import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Link } from "react-router-dom";
import { Container, Form } from "./styles";

export function New() {
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar Nota</h1>
            <Link to="/">Voltar</Link>
          </header>
          <Input placeholder="Título" />

          <Textarea placeholder="Observações" />

          <Section title="Links úteis">
            <NoteItem value="htttpsfs" />
            <NoteItem isNew />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
                <NoteItem value="react" />
                <NoteItem isNew placeholder="Nova tag" />
            </div>
          </Section>
        </Form>
      </main>
    </Container>
  );
}
