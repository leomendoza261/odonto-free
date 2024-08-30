'use client';

import React, { useState } from 'react';

export default function ModalAgregarPaciente({ onClose, onSubmit }) {
    const [step, setStep] = useState(1);
    const [paciente, setPaciente] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        tutor_legal_dni: '',
        telefono: '',
        email: '',
        alergias: [{ alergia: '' }], 
        enfermedades: [{ enfermedad: '' }], 
        medicamentos: [{ medicamento: '', dosis: '', frecuencia: '', via: '' }], 
        tipo_sanguineo: '',
        cirugias_previas: [{ cirugia: '', fecha: '', observaciones: '' }],
        observaciones: '',
        obra_social: '',
    });

    // Función para calcular la edad a partir de la fecha de nacimiento
    const calcularEdad = (fecha_nacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha_nacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e, index, section) => {
        const { name, value } = e.target;
    
        setPaciente((prev) => {
            // Si la sección es un array (como alergias, enfermedades, etc.)
            if (Array.isArray(prev[section])) {
                const updatedSection = [...prev[section]];
                updatedSection[index] = {
                    ...updatedSection[index],
                    [name]: value,
                };
                return { ...prev, [section]: updatedSection };
            } else {
                // Si no es un array, actualizar el valor directamente
                return { ...prev, [name]: value };
            }
        });
    };

    const handleAddField = (section) => {
        setPaciente((prev) => {
            const updatedSection = [...prev[section], {}];
            return { ...prev, [section]: updatedSection };
        });
    };

    const handleSubmit = () => {
        onSubmit(paciente);
        onClose();
    };

    // Determina si el paciente es menor de edad
    const esMenorEdad = calcularEdad(paciente.fecha_nacimiento) < 18;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md max-h-screen overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Cruz de cierre en la esquina superior derecha */}
                <button
                    onClick={onClose}
                    className="relative top-0 start-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    &times;
                </button>

                {step === 1 && (
                    <div>

                        <h2 className="text-blue-500 text-xl text-center mb-4">Información Personal</h2>
                        <input
                            type="text"
                            name="nombre"
                            value={paciente.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <input
                            type="text"
                            name="apellido"
                            value={paciente.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <input
                            type="text"
                            name="dni"
                            value={paciente.dni}
                            onChange={handleChange}
                            placeholder="DNI"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={paciente.fecha_nacimiento}
                            onChange={handleChange}
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        {esMenorEdad && (
                            <input
                                type="text"
                                name="tutor_legal_dni"
                                value={paciente.tutor_legal_dni}
                                onChange={handleChange}
                                placeholder="DNI del tutor legal"
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        )}
                        <input
                            type="tel"
                            name="telefono"
                            value={paciente.telefono}
                            onChange={handleChange}
                            placeholder="Número de teléfono"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <input
                            type="email"
                            name="email"
                            value={paciente.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <input
                            type="text"
                            name="obra_social"
                            value={paciente.obra_social}
                            onChange={handleChange}
                            placeholder="Obra social"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 mt-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <div className="flex justify-end mt-4">
                            <button onClick={handleNextStep} className="h-10 items-center rounded-lg bg-blue-500 px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className=''>
                        <h2 className="text-blue-500 text-xl text-center mb-4">Historia Médica</h2>
                        <div className="flex justify-between mt-2">
                            <label className="peer block w-[48%] text-sm text-gray-700 pt-4">
                                Grupo sanguíneo:
                            </label>
                            <select
                                name="tipo_sanguineo"
                                value={paciente.tipo_sanguineo}
                                onChange={handleChange}
                                className="peer block w-[48%] cursor-pointer rounded-md border border-gray-200 py-2 mt-2 text-sm outline-2 placeholder:text-gray-500"
                            >
                                <option value="" disabled>Selecciona un grupo sanguíneo</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Enfermedades */}
                        <div className="flex flex-col mt-4">
                            <label className="text-sm text-gray-700">Enfermedades Crónicas:</label>
                            {paciente.enfermedades.map((enfermedad, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        name="enfermedad"
                                        value={enfermedad.enfermedad}
                                        onChange={(e) => handleChange(e, index, 'enfermedades')}
                                        placeholder="Enfermedad crónica"
                                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddField('enfermedades')}
                                className="mt-2 h-10 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                            >
                                Agregar enfermedad
                            </button>
                        </div>

                        {/* Alergias */}
                        <div className="flex flex-col mt-4">
                            <label className="text-sm text-gray-700">Alergias:</label>
                            {paciente.alergias.map((alergia, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        name="alergia"
                                        value={alergia.alergia}
                                        onChange={(e) => handleChange(e, index, 'alergias')}
                                        placeholder="Alergia"
                                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddField('alergias')}
                                className="mt-2 h-10 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                            >
                                Agregar alergia
                            </button>
                        </div>

                        {/* Medicamentos */}
                        <div className="flex flex-col mt-4">
                            <label className="text-sm text-gray-700">Medicamentos:</label>
                            {paciente.medicamentos.map((medicamento, index) => (
                                <div key={index} className="flex flex-col mb-4">
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            name="medicamento"
                                            value={medicamento.medicamento}
                                            onChange={(e) => handleChange(e, index, 'medicamentos')}
                                            placeholder="Medicamento"
                                            className="peer block w-[48%] cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            name="dosis"
                                            value={medicamento.dosis}
                                            onChange={(e) => handleChange(e, index, 'medicamentos')}
                                            placeholder="Dosis"
                                            className="peer block w-[48%] cursor-pointer rounded-md border border-gray-200 py-2 ml-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            name="frecuencia"
                                            value={medicamento.frecuencia}
                                            onChange={(e) => handleChange(e, index, 'medicamentos')}
                                            placeholder="Frecuencia"
                                            className="peer block w-[48%] cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                        <input
                                            type="text"
                                            name="via"
                                            value={medicamento.via}
                                            onChange={(e) => handleChange(e, index, 'medicamentos')}
                                            placeholder="Vía de administración"
                                            className="peer block w-[48%] cursor-pointer rounded-md border border-gray-200 py-2 ml-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddField('medicamentos')}
                                className="mt-2 h-10 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                            >
                                Agregar medicamento
                            </button>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={handlePreviousStep} className="h-10 items-center rounded-lg bg-blue-500 px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                Anterior
                            </button>
                            <button onClick={handleNextStep} className="h-10 items-center rounded-lg bg-blue-500 px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div >
                        <h2 className="text-blue-500 text-xl text-center mb-4">Cirugias previas</h2>
                        <div className="flex flex-col mt-4 overflow-auto">
                            {paciente.cirugias_previas.map((cirugia, index) => (
                                <div key={index} className="flex flex-col mb-4">
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            name="cirugia"
                                            value={cirugia.cirugia}
                                            onChange={(e) => handleChange(e, index, 'cirugias_previas')}
                                            placeholder="Cirugía"
                                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="date"
                                            name="fecha"
                                            value={cirugia.fecha}
                                            onChange={(e) => handleChange(e, index, 'cirugias_previas')}
                                            placeholder="Fecha"
                                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            name="observaciones"
                                            value={cirugia.observaciones}
                                            onChange={(e) => handleChange(e, index, 'cirugias_previas')}
                                            placeholder="Observaciones"
                                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddField('cirugias_previas')}
                                className="mt-2 h-10 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                            >
                                Agregar cirugía
                            </button>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={handlePreviousStep} className="h-10 items-center rounded-lg bg-blue-500 px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                Anterior
                            </button>
                            <button onClick={handleSubmit} className="h-10 items-center rounded-lg bg-blue-500 px-4 mt-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                Finalizar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
