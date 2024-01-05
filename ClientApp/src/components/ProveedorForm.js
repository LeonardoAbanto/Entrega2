import React, { useState, useEffect } from 'react';

const ProveedorForm = ({ onSubmit, cerrarFormulario, proveedorEdit }) => {

  const initialState = {
  razonSocial: '',
  nombreComercial: '',
  identificacionTributaria: '',
  numeroTelefonico: '',
  correoElectronico: '',
  sitioWeb: 'https://',
  direccionFisica: '',
  pais: '',
  facturacionAnual: 0,
  }

  const [proveedor, setProveedor] = useState(initialState);

  useEffect(() => {
    // Cuando el componente se monta o cambia proveedorEdit, actualiza el estado del formulario
    setProveedor(proveedorEdit ? { ...initialState, ...proveedorEdit } : initialState);
  }, [proveedorEdit]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor((prevProveedor) => ({ ...prevProveedor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proveedor, facturacionAnual: Number(proveedor.facturacionAnual), fechaUltimaEdicion: new Date().toISOString().slice(0, -1), }),
      });
      if (response.ok) {
        console.log('Proveedor insertado exitosamente');
        onSubmit(); // Llamada a la función del padre para recargar la lista de proveedores
      } else {
        // Almacenar el resultado de response.json() en una variable
        const errorResponse = await response.json();
    
        console.error('Error al insertar proveedor:', response);
        console.error('Detalles del error:', errorResponse);
    
        // Puedes manejar el error de alguna manera
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
    
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://localhost:5001/api/proveedores/${proveedor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proveedor, facturacionAnual: Number(proveedor.facturacionAnual), fechaUltimaEdicion: new Date().toISOString(), }),
      });
      console.log(JSON.stringify({ ...proveedor, facturacionAnual: Number(proveedor.facturacionAnual), fechaUltimaEdicion: new Date().toISOString(), }),
      )
      if (response.ok) {
        console.log('Proveedor insertado exitosamente');
        onSubmit(); // Llamada a la función del padre para recargar la lista de proveedores
      } else {
        // Almacenar el resultado de response.json() en una variable
        const errorResponse = await response.json();
    
        console.error('Error al insertar proveedor:', response);
        console.error('Detalles del error:', errorResponse);
    
        // Puedes manejar el error de alguna manera
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
  }


  return (
    <form onSubmit={ proveedorEdit ? (handleEdit) : (handleSubmit)}>
      <fieldset>
        {proveedorEdit ? (<legend>Editar Proveedor {proveedor.id} - {proveedor.nombreComercial}</legend>) : (<legend>Información del Proveedor</legend>)}

        <label>Razón Social: </label>
        <input type="text" name="razonSocial" value={proveedor.razonSocial} onChange={handleChange} required />
        <p></p>

        <label>Nombre Comercial: </label>
        <input type="text" name="nombreComercial" value={proveedor.nombreComercial} onChange={handleChange} required />
        <p></p>

        <label>Identificación Tributaria: </label>
        <input type="text" name="identificacionTributaria" value={proveedor.identificacionTributaria} onChange={handleChange} minLength={11} maxLength={11} required/>
        <p></p>

        <label>Número Telefónico: </label>
        <input type="number" name="numeroTelefonico" value={proveedor.numeroTelefonico} onChange={handleChange} required />
        <p></p>

        <label>Correo Electrónico: </label>
        <input type="text" name="correoElectronico" value={proveedor.correoElectronico} onChange={handleChange} required/>
        <p></p>

        <label>Sitio Web: </label>
        <input type="url" name="sitioWeb" value={proveedor.sitioWeb} onChange={handleChange} required/>
        <p></p>

        <label>Dirección Física: </label>
        <input type="text" name="direccionFisica" value={proveedor.direccionFisica} onChange={handleChange} required/>
        <p></p>

        <label>País: </label>
        <select name="pais" value={proveedor.pais} onChange={handleChange} required>
          <option value="">Selecciona un país</option>
          <option value="Peru">Perú</option>
          <option value="Mexico">México</option>
          <option value="Argentina">Argentina</option>
        </select>
        <p></p>

        <label>Facturación Anual: </label>
        <input type="number" name="facturacionAnual" value={parseFloat(proveedor.facturacionAnual)} onChange={handleChange} required/>
      </fieldset>
      <p></p>

      <button className="btn btn-primary" type="submit">Agregar Proveedor</button>
      <p></p>
    </form>
   

  );
};

export default ProveedorForm;
