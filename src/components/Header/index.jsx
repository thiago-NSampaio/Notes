import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";

export function Header() {
    // Obtendo a função de signOut do hook useAuth.
    const {signOut, user}= useAuth();
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />
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
