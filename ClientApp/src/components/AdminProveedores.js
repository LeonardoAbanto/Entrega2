import React, { Component } from 'react';
import ProveedorForm from './ProveedorForm';

export class AdminProveedores extends Component {

    static displayName = AdminProveedores.name;

    render (){
        return (
            <div>
            <h1>Administración de Proveedores</h1>


            <h2>Listado de Proveedores</h2>
            <ul>
                {proveedores.map((proveedor, index) => (
                <li key={index}>{proveedor.razonSocial}</li>
                ))}
            </ul>
            </div>
        );
        };

}

