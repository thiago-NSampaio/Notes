import { Container } from "./styles";

export function ButtonText({titlle, isActive = false, ...rest}) {
    return (
        <Container
            type="button"
            $isactive={isActive}
            {...rest}
        >
            {titlle}
        </Container>
    )
}