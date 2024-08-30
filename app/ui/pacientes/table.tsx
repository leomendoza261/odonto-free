"use client";

import React, { useState } from "react";
import ModalAgregarPaciente from "./modal";
import Link from "next/link";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { addPaciente } from "@/app/lib/data";

export default function TablaPacientes() {
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      dni: '12345678',
      nombre: 'Juanito',
      apellido: 'Pérez',
      tipo_sangre: 'A+',
      fecha_nacimiento: new Date('2005-07-12T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: null,
    },
    {
      id: 2,
      dni: '40749261',
      nombre: 'Leo',
      apellido: 'Mendoza',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('1997-03-12T15:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 3,
      dni: '40749301',
      nombre: 'Adrian',
      apellido: 'Usqueda',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('1997-06-12T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 4,
      dni: '38749245',
      nombre: 'Camila',
      apellido: 'Gómez',
      tipo_sangre: 'B+',
      fecha_nacimiento: new Date('2010-11-23T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '30749255',
    },
    {
      id: 5,
      dni: '27549322',
      nombre: 'Martín',
      apellido: 'Rodríguez',
      tipo_sangre: 'AB+',
      fecha_nacimiento: new Date('1982-09-16T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 6,
      dni: '33547281',
      nombre: 'Lucía',
      apellido: 'Martínez',
      tipo_sangre: 'A-',
      fecha_nacimiento: new Date('2008-05-02T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '30547281',
    },
    {
      id: 7,
      dni: '20458219',
      nombre: 'Joaquín',
      apellido: 'López',
      tipo_sangre: 'B-',
      fecha_nacimiento: new Date('1974-01-17T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 8,
      dni: '44548923',
      nombre: 'Sofía',
      apellido: 'Fernández',
      tipo_sangre: 'O-',
      fecha_nacimiento: new Date('2015-04-08T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '34548923',
    },
    {
      id: 9,
      dni: '33547282',
      nombre: 'Emilio',
      apellido: 'Ruiz',
      tipo_sangre: 'A+',
      fecha_nacimiento: new Date('1990-12-14T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 10,
      dni: '24578292',
      nombre: 'Valentina',
      apellido: 'Pereyra',
      tipo_sangre: 'AB-',
      fecha_nacimiento: new Date('2007-06-29T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '30578292',
    },
    {
      id: 11,
      dni: '25678943',
      nombre: 'Santiago',
      apellido: 'Gutiérrez',
      tipo_sangre: 'B+',
      fecha_nacimiento: new Date('2003-03-01T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 12,
      dni: '27894563',
      nombre: 'Carla',
      apellido: 'Sánchez',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('2011-08-15T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '27894564',
    },
    {
      id: 13,
      dni: '39876542',
      nombre: 'Lucas',
      apellido: 'Ramírez',
      tipo_sangre: 'A-',
      fecha_nacimiento: new Date('2000-05-10T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 14,
      dni: '40749502',
      nombre: 'Elena',
      apellido: 'Domínguez',
      tipo_sangre: 'B+',
      fecha_nacimiento: new Date('1999-10-21T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 15,
      dni: '30749295',
      nombre: 'Mateo',
      apellido: 'Herrera',
      tipo_sangre: 'AB+',
      fecha_nacimiento: new Date('2009-01-25T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '20749295',
    },
    {
      id: 16,
      dni: '25487632',
      nombre: 'Mía',
      apellido: 'Medina',
      tipo_sangre: 'O-',
      fecha_nacimiento: new Date('2004-07-19T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 17,
      dni: '33547283',
      nombre: 'Sebastián',
      apellido: 'Arias',
      tipo_sangre: 'A+',
      fecha_nacimiento: new Date('2013-11-30T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '33547284',
    },
    {
      id: 18,
      dni: '39876543',
      nombre: 'Florencia',
      apellido: 'Silva',
      tipo_sangre: 'B+',
      fecha_nacimiento: new Date('2001-02-13T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 19,
      dni: '24578293',
      nombre: 'Tomás',
      apellido: 'Vega',
      tipo_sangre: 'AB-',
      fecha_nacimiento: new Date('2012-03-05T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '24578294',
    },
    {
      id: 20,
      dni: '40749302',
      nombre: 'Gabriela',
      apellido: 'Molina',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('1996-06-22T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 21,
      dni: '12345679',
      nombre: 'Nicolás',
      apellido: 'Paz',
      tipo_sangre: 'A+',
      fecha_nacimiento: new Date('1995-11-01T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 22,
      dni: '40749262',
      nombre: 'Paula',
      apellido: 'Quinteros',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('2008-12-20T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '30749263',
    },
    {
      id: 23,
      dni: '30749303',
      nombre: 'Alejandro',
      apellido: 'Córdoba',
      tipo_sangre: 'O+',
      fecha_nacimiento: new Date('1998-04-15T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    },
    {
      id: 24,
      dni: '40749503',
      nombre: 'Mariana',
      apellido: 'Álvarez',
      tipo_sangre: 'B+',
      fecha_nacimiento: new Date('2014-09-10T03:00:00.000Z'),
      menor_edad: true,
      tutor_legal_id: '30749504',
    },
    {
      id: 25,
      dni: '38749246',
      nombre: 'Ricardo',
      apellido: 'Luna',
      tipo_sangre: 'A+',
      fecha_nacimiento: new Date('1987-03-07T03:00:00.000Z'),
      menor_edad: false,
      tutor_legal_id: null,
    }
]);

  const [dniBusqueda, setDniBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddPaciente = (nuevoPaciente) => {
    addPaciente(nuevoPaciente)
    /* setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]); */
  };

  const handleSearchChange = (event) => {
    setDniBusqueda(event.target.value);
  };

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.dni.includes(dniBusqueda)
  );

  return (
    <div className="w-full">
      <h1 className="mb-8 text-xl md:text-2xl">Pacientes</h1>

      <div className="flex justify-between">
        <button
          className="h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Añadir paciente
        </button>
        <div className="relative ml-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-500" />
          </span>
          <input
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-gray-500"
            placeholder="DNI paciente"
            value={dniBusqueda}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {showModal && (
        <ModalAgregarPaciente
          onClose={() => setShowModal(false)}
          onSubmit={(nuevoPaciente) => {
            handleAddPaciente(nuevoPaciente);
            setShowModal(false);
          }}
        />
      )}

      <TablaPacientesCompleta pacientes={pacientesFiltrados} />
      <TablaPacientesResumida pacientes={pacientesFiltrados} />
    </div>
  );
}

function TablaPacientesCompleta({ pacientes }) {
  return (
    <div className="hidden md:block overflow-x-auto mt-2">
      <table className="min-w-full rounded-md text-gray-900">
        <thead className="bg-gray-50 text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-3">DNI</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Apellido</th>
            <th className="px-4 py-3">Tipo de Sangre</th>
            <th className="px-4 py-3">Fecha de Nacimiento</th>
            <th className="px-4 py-3">Menor de Edad</th>
            <th className="px-4 py-3">Tutor Legal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="bg-white text-sm hover:bg-blue-400 ">
              <PacienteRow paciente={paciente} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TablaPacientesResumida({ pacientes }) {
  return (
    <div className="block md:hidden overflow-x-auto mt-2">
      <table className="min-w-full rounded-md text-gray-900">
        <thead className="bg-gray-50 text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-3">DNI</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Apellido</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="bg-white text-sm hover:bg-blue-400 ">
              <PacienteRowResumido paciente={paciente} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PacienteRow({ paciente }) {
  return (
    <>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.dni}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.nombre}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.apellido}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.tipo_sangre}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>
          {new Date(paciente.fecha_nacimiento).toLocaleDateString()}
        </Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.menor_edad ? "Sí" : "No"}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>
          {paciente.tutor_legal_id ? `Tutor ${paciente.tutor_legal_id}` : "No asignado"}
        </Link>
      </td>
    </>
  );
}

function PacienteRowResumido({ paciente }) {
  return (
    <>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.dni}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.nombre}</Link>
      </td>
      <td className="px-4 py-3">
        <Link href={`/dashboard/pacientes/${paciente.dni}`}>{paciente.apellido}</Link>
      </td>
    </>
  );
}
