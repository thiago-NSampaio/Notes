import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import {FiPlus, FiSearch} from 'react-icons/fi'
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ButtonText } from '../../components/ButtonText';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <Container>
            <Brand>
                <h1>Notes</h1>
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText titlle="Todos" isActive/></li>
                <li><ButtonText titlle="React"/></li>
                <li><ButtonText titlle="Nodejs"/></li>
            </Menu>

            <Search>
                <Input placeholder="pesquisar pelo título"icon={FiSearch}/>
            </Search>

            <Content>
                <Section title="Minhas notas">
                    <Note data={{
                        title: 'React', tags: [
                            { id: '1', name: 'react' },
                            { id: '2', name: 'node' }
                        ]
                    }} />
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus />
                Criar Nota
            </NewNote>
        </Container>
        
    )
}