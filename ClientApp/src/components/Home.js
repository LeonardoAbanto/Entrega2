import React, { Component } from 'react';
import ProveedorForm from './ProveedorForm';

export class Home extends Component {
  static displayName = Home.name;

  state = {
    proveedores: [], 
    loading: true,
    mostrarFormulario: false,
    proveedorSeleccionado: null,
  };

  async componentDidMount() {
    await this.obtenerProveedoresDesdeAPI();
  }

  async obtenerProveedoresDesdeAPI() {
    try {
        const response = await fetch('/api/proveedores');
        if (!response.ok) {
            throw new Error(`Error al obtener proveedores: ${response.status}`);
        }
        const data = await response.json();
        this.setState({ proveedores: data, loading: false });
    } catch (error) {
        console.error('Error en obtenerProveedoresDesdeAPI:', error);
        // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    }
  }

  // Función para abrir el formulario
  abrirFormulario = () => {
    this.setState({ mostrarFormulario: true });
  };

  // Función para cerrar el formulario
  cerrarFormulario = () => {
    this.setState({ mostrarFormulario: false });
  };

  verDetallesProveedor = (proveedor) => {
    this.setState({ proveedorSeleccionado: proveedor });
  };

  // Función para cerrar los detalles del proveedor
  cerrarDetallesProveedor = () => {
    this.setState({ proveedorSeleccionado: null });
  };

  handleAgregarProveedor = async (nuevoProveedor) => {
    try {
      // Hacer la solicitud para agregar el nuevo proveedor a la base de datos
      const response = await fetch('https://localhost:5001/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProveedor),
      });

      if (response.ok) {
        // Actualizar la lista de proveedores después de agregar uno nuevo
        await this.obtenerProveedoresDesdeAPI();
      } else {
        console.error('Error al insertar proveedor:', response.status);
        // Manejo de errores
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      this.cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
  };

  handleEliminarProveedor = async (proveedorId) => {
    try {
      const response = await fetch(`https://localhost:5001/api/proveedores/${proveedorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        await this.obtenerProveedoresDesdeAPI();
      } else {
        console.error('Error al eliminar proveedor:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };
  


  render() {
    const { proveedores, loading, mostrarFormulario, proveedorSeleccionado } = this.state;

    if (loading) {
      return <p>Cargando proveedores...</p>;
    }

    return (
      <div>
        <h1>Bienvenido al sistema de administración de proveedores</h1>

        {proveedorSeleccionado ? (
          // Renderizar detalles del proveedor
          <div>
            <h2>Detalles del Proveedor</h2>
            <p>ID: {proveedorSeleccionado.id}</p>
            <p>Razón Social: {proveedorSeleccionado.razonSocial}</p>
            <p>Nombre Comercial: {proveedorSeleccionado.nombreComercial}</p>
            <p>Identificación Tributaria: {proveedorSeleccionado.identificacionTributaria}</p>
            <p>Número Telefónico: {proveedorSeleccionado.numeroTelefonico}</p>
            <p>Correo Electrónico: {proveedorSeleccionado.correoElectronico}</p>
            <p>Sitio Web: {proveedorSeleccionado.sitioWeb}</p>
            <p>Dirección Física: {proveedorSeleccionado.direccionFisica}</p>
            <p>País: {proveedorSeleccionado.pais}</p>
            <p>Facturación Anual: {proveedorSeleccionado.facturacionAnual}</p>
            <p>Última Edición: {proveedorSeleccionado.fechaUltimaEdicion}</p>
            <button className="btn btn-primary" onClick={this.cerrarDetallesProveedor}>
              Volver a la lista
            </button>
          </div>
        ) : (
          // Renderizar lista de proveedores
          <div>
            <p>Lista de proveedores actuales:</p>

            <table className='table table-striped' aria-labelledby="tabelLabel">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Razón Social</th>
                  <th>Nombre Comercial</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map(proveedor => (
                  <tr key={proveedor.id}>
                    <td>{proveedor.id}</td>
                    <td>{proveedor.razonSocial}</td>
                    <td>{proveedor.nombreComercial}</td>
                    <td>
                      <button className="btn btn-primary btn-accion" onClick={() => this.verDetallesProveedor(proveedor)}>
                        Ver
                      </button>
                      <span> </span>
                      <button className="btn btn-primary btn-accion"  onClick={() => this.verDetallesProveedor(proveedor)}>
                        Editar
                      </button>
                      <span> </span>
                      <button className="btn btn-danger" onClick={() => this.handleEliminarProveedor(proveedor.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p></p>
            <button className="btn btn-primary" onClick={this.abrirFormulario}>
              Nuevo Proveedor
            </button>
            {mostrarFormulario && (
              <ProveedorForm
                onSubmit={this.handleAgregarProveedor}
                cerrarFormulario={this.cerrarFormulario}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
