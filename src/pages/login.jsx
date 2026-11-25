import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Contexto from "../contex/contexto";
import { useContext } from "react";
import Swal from "sweetalert2";
import { iniciarSesion, obtenerSesion } from "../auth";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(Contexto);
  const navegacion = useNavigate();

  const onSubmit = (data) => {
    const resultado = iniciarSesion(data.email, data.password);

    if (!resultado.ok) {
      Swal.fire({ icon: "error", title: "Error", text: resultado.error });
      return;
    }

    const sesion = obtenerSesion();
    login({ usuario: sesion.nombre, email: sesion.email });

    Swal.fire({
      icon: "success",
      title: "Acceso correcto!",
      text: "Estas siendo redirigido...",
      timer: 1200,
      showConfirmButton: false,
    });
    navegacion("/", { replace: true });
  };

  return (
    <div className="contenedor-auth">
      <div className="card border-0 tarjeta-auth">
        <div className="card-body p-4 p-md-5">
          <div className="icono-auth">🔐</div>
          <h2 className="titulo-auth text-center mb-1">Bienvenido</h2>
          <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                id="email"
                {...register("email", { required: "El campo correo es requerido!" })}
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="correo"
              />
              <label htmlFor="email">Correo</label>
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-floating mb-4">
              <input
                id="password"
                {...register("password", { required: "El campo contraseña es requerido!" })}
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="password"
              />
              <label htmlFor="password">Contraseña</label>
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-auth w-100 mb-3">
              Iniciar Sesion
            </button>
            <NavLink to="/registro" className="btn btn-secundario w-100">
              Registrarse
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;