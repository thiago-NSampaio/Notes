import { useState } from "react";
import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const { user, updateProfile} = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState()

    const navigate = useNavigate()

    async function handleUpdate(e) {
        e.preventDefault();
        // Criando o objeto para enviar para a função de updateProfile.
        const updated = {
            name, email, password: newPassword, old_password: oldPassword,
        }

        const userUpdate = Object.assign(user, updated)

        await updateProfile({user : userUpdate, avatarFile})
    }

    function handleChangeAvatar(e) {
        const file = e.target.files[0];
        setAvatarFile(file)

        const imgPreview = URL.createObjectURL(file);
        setAvatar(imgPreview);
    }

    function handleBack() {
        navigate(-1);
      }

    return (
        <Container>
            <header>
                <button titlle="voltar" onClick={handleBack}><FiArrowLeft /></button>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} alt="Foto do usuário" />

                    <label htmlFor="avatar">
                        <FiCamera />
                        
                        <input type="file" id="avatar" onChange={handleChangeAvatar}/>
                    </label>
                </Avatar>
                <Input placeholder="Nome" type="text" icon={FiUser} value={name } onChange={e => setName(e.target.value)}/>
                <Input placeholder="E-mail" type="text" icon={FiMail} value={email } onChange={e => setEmail(e.target.value)}/>
                <Input placeholder="Senha atual" type="password" icon={FiLock} onChange={e => setOldPassword(e.target.value)}/>
                <Input placeholder="Nova senha" type="password" icon={FiLock} onChange={e => setNewPassword(e.target.value)}/>
                
                <Button title="Salvar" onClick={ handleUpdate} />
            </Form>
        </Container>
    )
}