import TablaConsultas from "@/app/ui/sesiones/table";
import { Suspense } from "react";

export default async function Sesiones() {
    return(
        <Suspense fallback={<div>Cargando...</div>}>
           <TablaConsultas /> 
        </Suspense>
    )
}