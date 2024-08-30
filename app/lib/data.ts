import { sql } from '@vercel/postgres';
import {Pacientes, Consultas } from './definitions';

export async function fetchPacientes() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Pacientes>`SELECT * FROM pacientes`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('No se han obtenido los datos de pacientes.');
  }
}

export async function fetchConsultas() {
  try{
    const data = await sql<Consultas>`SELECT * FROM consultas`
    return data.rows
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("No se han obtenido los datos de consultas.")
  }
}

export async function fetchPaciente(pacienteId: number) {
  try {
    const data = await sql<Consultas[]>`
      SELECT 
        p.id AS paciente_id,
        p.nombre,
        p.apellido,
        p.dni,
        ts.tipo AS tipo_sanguineo,
        a.alergia,
        m.medicamento,
        m.dosis,
        m.via,
        m.frecuencia,
        c.fecha_consulta,
        c.motivo_consulta,
        c.diagnostico,
        c.tratamiento
      FROM 
        pacientes p
      LEFT JOIN 
        tipos_sanguineos ts ON p.tipo_sanguineo_id = ts.id
      LEFT JOIN 
        alergias a ON p.id = a.paciente_id
      LEFT JOIN 
        medicaciones m ON p.id = m.paciente_id
      LEFT JOIN 
        consultas c ON p.id = c.paciente_id
      WHERE 
        p.id = ${pacienteId};
    `;
    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("No se han obtenido los datos del paciente.");
  }
}

export async function addPaciente(paciente: {
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: Date;
  numero_telefono: string;
  email: string; 
  obra_social: string;
  tutor_legal_id: string | null; // Si no siempre tienes un tutor legal, esto puede ser null
  tipo_sanguineo_id: number;
  alergias: string[];
  medicaciones: {
    medicamento: string;
    dosis: string;
    via: string;
    frecuencia: string;
  }[];
  consultas: {
    fecha_consulta: string;
    motivo_consulta: string;
    diagnostico: string;
    tratamiento: string;
  }[];
}) {
  try {
    // Inicia una transacción
    await sql.begin(async (transaction) => {
      // Inserta en la tabla pacientes
      const pacienteResult = await transaction`
        INSERT INTO pacientes (
          nombre, 
          apellido, 
          dni, 
          fecha_nacimiento, 
          numero_telefono, 
          email, 
          obra_social, 
          tutor_legal_id, 
          tipo_sanguineo_id
        ) VALUES (
          ${paciente.nombre}, 
          ${paciente.apellido}, 
          ${paciente.dni}, 
          ${paciente.fecha_nacimiento}, 
          ${paciente.numero_telefono}, 
          ${paciente.email}, 
          ${paciente.obra_social}, 
          ${paciente.tutor_legal_id}, 
          ${paciente.tipo_sanguineo_id}
        )
        RETURNING id
      `;
      
      const pacienteId = pacienteResult[0].id;

      // Inserta en la tabla alergias
      for (const alergia of paciente.alergias) {
        await transaction`
          INSERT INTO alergias (paciente_id, alergia)
          VALUES (${pacienteId}, ${alergia})
        `;
      }

      // Inserta en la tabla medicaciones
      for (const medicacion of paciente.medicaciones) {
        await transaction`
          INSERT INTO medicaciones (paciente_id, medicamento, dosis, via, frecuencia)
          VALUES (${pacienteId}, ${medicacion.medicamento}, ${medicacion.dosis}, ${medicacion.via}, ${medicacion.frecuencia})
        `;
      }

      // Inserta en la tabla consultas
      for (const consulta of paciente.consultas) {
        await transaction`
          INSERT INTO consultas (paciente_id, fecha_consulta, motivo_consulta, diagnostico, tratamiento)
          VALUES (${pacienteId}, ${consulta.fecha_consulta}, ${consulta.motivo_consulta}, ${consulta.diagnostico}, ${consulta.tratamiento})
        `;
      }
    });

    return { success: true, message: "Paciente agregado exitosamente." };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Error al agregar el paciente a la base de datos.");
  }
}
