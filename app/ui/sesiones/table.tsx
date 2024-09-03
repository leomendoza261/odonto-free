"use client";

import { fetchConsultas } from "@/app/lib/data";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import ModalAgregarConsulta from "../sesiones/modal";
import { useState } from "react";
import Link from "next/link";

export default async function TablaConsultas() {
  /* const consultas = await fetchConsultas(); */

  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente_id: '1',
      fecha_consulta: new Date('2005-07-12T03:00:00.000Z'),
      motivo: "dolor de muela",
      diagnostico: "se comio la torta",
      tratamiento: "ibuprofeno y casa"
    },
    {
      id: 2,
      paciente_id: '5',
      fecha_consulta: new Date('2002-08-12T03:00:00.000Z'),
      motivo: "dolor de lengua",
      diagnostico: "se comio la torta",
      tratamiento: "ibuprofeno y casa"
    },
  ]);


  const [showModal, setShowModal] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  const handleAddConsulta = (nuevaConsulta) => {
    setConsultas((prevConsultas) => [...prevConsultas, nuevaConsulta]);
  };

  // Convertimos una fecha al formato yyyy-mm-dd para comparar con el input type date
  const formatDateForComparison = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredConsultas = consultas.filter((consulta) => {
    if (!searchDate) return true;
    const consultaDate = formatDateForComparison(consulta.fecha_consulta);
    return consultaDate === searchDate;
  });

  return (
    <div className="w-full">
      <h1 className="mb-8 text-xl md:text-2xl">Consultas </h1>

      <div className='flex justify-between'>
        <button
          className=" h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Añadir consulta
        </button>
        <div className="relative ml-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassCircleIcon className="h-5 w-5 text-gray-500" />
          </span>
          <input
            type="date"
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-gray-500"
            placeholder="Buscar por fecha"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>
      
      {showModal && (
        <ModalAgregarConsulta onClose={() => setShowModal(false)} onSubmit={(nuevaConsulta) => {
          handleAddConsulta(nuevaConsulta);
          setShowModal(false);
        }} />
      )}

      <div className="hidden md:block overflow-x-auto mt-2">
        <table className="min-w-full rounded-md text-gray-900">
          <thead className="bg-gray-50 text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-3">Nro consulta</th>
              <th className="px-4 py-3">ID paciente</th>
              <th className="px-4 py-3">Fecha consulta</th>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Diagnostico</th>
              <th className="px-4 py-3">Tratamiento</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consultas.map((consulta) => (
              <tr key={consulta.id} className="bg-white text-sm hover:bg-blue-400">
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.paciente_id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {new Date(consulta.fecha_consulta).toLocaleDateString()}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.motivo}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.diagnostico}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.tratamiento}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden overflow-x-auto mt-2">
        <table className="min-w-full rounded-md text-gray-900">
          <thead className="bg-gray-50 text-left text-sm font-medium">
            <tr>
              <th className="px-4 py-3">Nro consulta</th>
              <th className="px-4 py-3">ID paciente</th>
              <th className="px-4 py-3">Fecha consulta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredConsultas.map((consulta) => (
              <tr key={consulta.id} className="bg-white text-sm hover:bg-blue-400">
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {consulta.paciente_id}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={"http://localhost:3000/dashboard/sesiones/consulta"}>
                    {new Date(consulta.fecha_consulta).toLocaleDateString()}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
