import TablaPacientes from "@/app/ui/pacientes/table";
import { Suspense } from "react";

export default async function Pacientes() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <TablaPacientes />
        </Suspense>
    );
}
