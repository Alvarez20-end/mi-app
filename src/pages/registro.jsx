import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../auth";

function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = registrarUsuario(form);
    if (!resultado.ok) {
      setError(resultado.error);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="contenedor-auth">
      <div className="card shadow-lg border-0 tarjeta-auth">
        <div className="card-body p-4">
          <h1 className="h2 text-center fw-bold mb-1">Crear cuenta</h1>
          <p className="text-center text-muted mb-4">Regístrate para comenzar</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100 mb-3" type="submit">
              Crear cuenta
            </button>
          </form>

          <p className="text-center mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;