import Contexto from "../contex/contexto";
import { useContext } from "react";
import Swal from "sweetalert2";
import { cerrarSesion } from "../auth";

const Home = () => {
  const { usuario, cerrar_sesion } = useContext(Contexto);

  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Cerrando sesion!",
      text: "Estas siendo redirigido",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      cerrarSesion();
      cerrar_sesion();
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <p>{usuario?.usuario}</p>
      <button onClick={() => logout()} className="btn btn-danger">
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Home;