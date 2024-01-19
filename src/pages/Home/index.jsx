import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { FiPlus, FiSearch, FiXOctagon } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { ButtonText } from "../../components/ButtonText";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await api.get("/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes();
  },[tagsSelected, search])

  function handleTagSelected(tagName) {
    // recebe como parâmetro o nome da tag selecionada no momento
    if (tagName === "all") {
      return setTagsSelected([]); // ao clicar em todos, desmarcar todas as tags
    }

    const alreadySelected = tagsSelected.includes(tagName); // saber se a tag já está selecionada

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      // Retorna todas as tags diferentes da tag desmarcada
        setTagsSelected(filteredTags);
        console.log(filteredTags)
    } else {
      // Se não tiver selecionado, irá selecionar
      setTagsSelected((prevState) => [...prevState, tagName]); // prevState para manter as tags selecionadas anteriormente
    }
  }

  return (
    <Container>
      <Brand>
        <h1>Notes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            titlle="Todos"
            isActive={tagsSelected.length === 0}
            onClick={() => handleTagSelected("all")}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={String(tag.id)}>
              <ButtonText
                titlle={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input placeholder="pesquisar pelo título" onChange={e => setSearch(e.target.value)} icon={FiSearch} />
      </Search>

      <Content>
        <Section title="Minhas notas">
        {notes.map((note) => (
        <Note key={String(note.id)} data={note} />
      ))
     }
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
