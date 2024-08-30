"use client"

import { PhotoIcon } from "@heroicons/react/24/outline";
import { Suspense, useState } from "react";
import ModalConfirmarBorrar from "./modalConfirmarBorrar";
import ModalAgregarConsulta from "./modal";

export default function ConsultaInfo() {
    const [showModalModificar, setShowModalModificar] = useState(false);
    const [showModalBorrar, setShowModalBorrar] = useState(false);

    const consulta = {
        nombreCompleto: 'Margot Foster',
        fechaConsulta: 'dd/mm/aa hh:mm',
        motivo: 'motivo de la consulta',
        diagnostico: 'carie en el Nº 32',
        tratamiento: 'endodoncia',
        notas: 'notas de la consulta',
    };

    const handleModificarSubmit = (formData) => {
        console.log('Consulta modificada:', formData);
        // Aquí agregarías la lógica para actualizar la consulta
    };

    const handleBorrarConfirm = () => {
        console.log('Consulta borrada');
        // Aquí agregarías la lógica para borrar la consulta
        setShowModalBorrar(false);
    };

    return (
        <Suspense fallback={<div>Cargando datos de la consulta...</div>}>
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Consulta Numero: 231</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-blue-500">Informacion de la consulta</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre Completo</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de consulta</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">dd/mm/aa hh:mm</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Motivo</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">motivo de la consulta</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Diagnostico</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">carie en el Nº 32</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Tratamiento</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">endodoncia</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Notas</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">notas de la consulta</dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Archivo</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PhotoIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">dd/mm/aaaa</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Ver
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PhotoIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">dd/mm/aaaa</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Ver
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="flex justify-end ">
                    <button
                        className="bg-blue-500 h-10 items-center rounded-lg px-4 mr-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
                    onClick={() => setShowModalModificar(true)}
                    >
                        Modificar consulta
                    </button>
                    <button
                        className="bg-red-500 h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-600"
                        onClick={() => setShowModalBorrar(true)}
                    >
                        Borrar consulta
                    </button>
                </div>
            </div>

            {showModalModificar && (
                <ModalAgregarConsulta
                    
                    onClose={() => setShowModalModificar(false)}
                    onSubmit={handleModificarSubmit}
                />
            )}

            {showModalBorrar && (
                <ModalConfirmarBorrar
                    onClose={() => setShowModalBorrar(false)}
                    onConfirm={handleBorrarConfirm}
                />
            )}
        </Suspense>

        
    )
} 