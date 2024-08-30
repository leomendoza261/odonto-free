'use client';

export default function ModalConfirmarBorrar({ onClose, onConfirm }) {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirmar Eliminación</h2>
                <p className="text-sm text-gray-700">¿Estás seguro de que deseas eliminar esta consulta?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    )
}