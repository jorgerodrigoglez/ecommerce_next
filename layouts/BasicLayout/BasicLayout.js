// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container } from 'semantic-ui-react';
// Header
import Header from '../../components/Header';
// para cambiar classes de css principales de Basic Layout : npm i classnames
import classNames from "classnames";

export default function BasicLayout(props) {
    const { children, className } = props;
    // classNames
    //const test = true;

    return (
        <Container fluid textAlign="center" className={classNames("basic-layout",{
            //active: test,
            [className] : className,
        })}>
            <Header />
            <Container className="content">
                {children}
            </Container>
        </Container>
    )
}
