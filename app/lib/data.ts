import { sql } from '@vercel/postgres';
import {Pacientes, Consultas } from './definitions';

export async function fetchPacientes() {
  try {
    const data = await sql<Pacientes>`SELECT * FROM pacientes`;
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
  tutor_legal_id: string | null;
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
  const client = await sql({ connectionString: process.env.POSTGRES_URL }).connect(); // Conectar al cliente de la base de datos

  try {
    // Inicia una transacción
    await client.query('BEGIN');

    // Inserta en la tabla pacientes
    const pacienteResult = await client.query(`
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
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
      RETURNING id
    `, [
      paciente.nombre, 
      paciente.apellido, 
      paciente.dni, 
      paciente.fecha_nacimiento, 
      paciente.numero_telefono, 
      paciente.email, 
      paciente.obra_social, 
      paciente.tutor_legal_id, 
      paciente.tipo_sanguineo_id
    ]);

    const pacienteId = pacienteResult.rows[0].id;

    // Inserta en la tabla alergias
    for (const alergia of paciente.alergias) {
      await client.query(`
        INSERT INTO alergias (paciente_id, alergia)
        VALUES ($1, $2)
      `, [pacienteId, alergia]);
    }

    // Inserta en la tabla medicaciones
    for (const medicacion of paciente.medicaciones) {
      await client.query(`
        INSERT INTO medicaciones (paciente_id, medicamento, dosis, via, frecuencia)
        VALUES ($1, $2, $3, $4, $5)
      `, [pacienteId, medicacion.medicamento, medicacion.dosis, medicacion.via, medicacion.frecuencia]);
    }

    // Inserta en la tabla consultas
    for (const consulta of paciente.consultas) {
      await client.query(`
        INSERT INTO consultas (paciente_id, fecha_consulta, motivo_consulta, diagnostico, tratamiento)
        VALUES ($1, $2, $3, $4, $5)
      `, [pacienteId, consulta.fecha_consulta, consulta.motivo_consulta, consulta.diagnostico, consulta.tratamiento]);
    }

    // Confirma la transacción
    await client.query('COMMIT');

    return { success: true, message: "Paciente agregado exitosamente." };
  } catch (error) {
    // En caso de error, deshace la transacción
    await client.query('ROLLBACK');
    console.error("Database error:", error);
    throw new Error("Error al agregar el paciente a la base de datos.");
  } finally {
    // Libera el cliente de la base de datos
    client.release();
  }
}

