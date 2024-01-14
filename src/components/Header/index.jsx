import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from "../../hooks/auth";

export function Header() {
    // Obtendo a função de signOut do hook useAuth.
    const {signOut}= useAuth();
    return (
        <Container>
            <Profile to="/profile">
                <img src="https://github.com/thiago-NSampaio.png" alt="Foto do usuário" />
                <div>
                    <span>Bem-vindo,</span>
                    <strong>Thiago</strong>
                </div>
            </Profile>

            {/*Passando a função para o componente*/}
            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}
