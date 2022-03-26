// ojo v4 de strapi no soporta mongodb
// para crear el server en la carpeta principal ecommerce-next 
// npx create-strapi-app@3.6.8 ecommerce
// usar > que node 10 y menor de 14

// componente del layouts
import BasicLayout from '../layouts/BasicLayout';

export default function Home() {
  return (
    <div className="home">
      <BasicLayout className="home">
        <h1>Estamos en la home</h1>
      </BasicLayout>
     

    </div>
  )
}
