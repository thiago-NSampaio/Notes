import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function updateProfile({user, avatarFile}) {
        try {
            if (avatarFile) {
                // Formatando o arquivo da forma como o backend deseja;
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile)

                // Enviando o avatar para a rota dele com a arquivo formatado
                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            // Update de usuario
            await api.put("/users", user);
            // Atualizando no local storage o usuário.
            localStorage.setItem("@notes:user", JSON.stringify(user));

            setData({ user, token: data.token })
            alert("Perfil atualizado")

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar na aplicação")
            }
        }
    }

    function signOut() {
        // Removendo as informações do local storage.
        localStorage.removeItem("@notes:token");
        localStorage.removeItem("@notes:user");

        setData({})
    }

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            // Passando as informações para o local storage.
            localStorage.setItem("@notes:user", JSON.stringify(user));
            localStorage.setItem("@notes:token", token);

            // Usando o token para autenticar na sessão.
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({user, token})

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar na aplicação")
            }
        }

    }

    // Após o componente ser renderizado os dados do local storage serão validados.
    useEffect(() => {
        const token = localStorage.getItem("@notes:token");
        const user = localStorage.getItem("@notes:user");


        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user:JSON.parse(user),
            })
        }

    },[])

    return (
        <AuthContext.Provider value={{signIn, user: data.user, signOut, updateProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {AuthProvider, useAuth}