// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container } from 'semantic-ui-react';
// Header
import Header from '../../components/Header';

export default function BasicLayout(props) {
    const { children } = props;

    return (
        <Container fluid textAlign="center" className="basic-layout">
            <Header />
            <Container className="content">
                {children}
            </Container>
        </Container>
    )
}
