import { useParams } from "react-router-dom";

const Usuario = () => {
  const { nombre } = useParams();
  return <h1>Perfil de {nombre}</h1>;
};

export default Usuario;