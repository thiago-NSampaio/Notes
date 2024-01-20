import { Container, Content } from "./styles.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/";
import { Header } from "../../components/Header/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Links } from "../../components/Section/styles.js";
import { Tag } from "../../components/Tag/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { api } from "../../services/api.js";

export function Details() {
  const params = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    // Recebe a ratificação da exclusão.
    const confirm = window.confirm("Deseja remover a nota?")

    // Se verdadeiro exclui a nota e direciona para a tela inicial.
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  return (
    <Container>
      <Header />
      {data.note && 
        <main>
          <Content>
            <ButtonText titlle="Excluir Nota" onClick={ handleRemove} />
            <h1>{data.note.title}</h1>
            <p>{data.note.description}</p>
            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url}>{link.url}</a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}
            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack } />
          </Content>
        </main>
      }
    </Container>
  );
}
