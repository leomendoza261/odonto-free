"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ModalAgregarPaciente from "./modal";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { addPaciente, fetchPacientes } from "@/app/lib/data";

export default function TablaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [dniBusqueda, setDniBusqueda] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddPaciente = (nuevoPaciente) => {
    addPaciente(nuevoPaciente);
    setPacientes((prevPacientes) => [...prevPacientes, nuevoPaciente]);
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
