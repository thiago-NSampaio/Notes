import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Link } from "react-router-dom";
import { Container, Form } from "./styles";
import { useState } from "react";

export function New() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("")
  }
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
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)} // É recomendado que um com componente rendeizado atráves de um loop tenha um identificador
                  value={link}
                  onClick={()=>{}}
                />
              ))
            }
            <NoteItem isNew placeholder="Novo link" value={newLink} onChange={e =>  setNewLink(e.target.value)} onClick={handleAddLink}/>
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
