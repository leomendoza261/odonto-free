// Definición del tipo para la tabla de Pacientes
export type Pacientes = {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  tipo_sangre_id: string;
  fecha_nacimiento: Date;
  numero_telefono: string;
  email: string; 
  obra_social: String;
  tutor_legal_id: String;
};

// Definición del tipo para la tabla de Tutores Legales
export type TutorLegal = {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  relacionConPaciente: string;
  telefono: string;
  email: string;
  direccion: string;
};

// Definición del tipo para la tabla de Enfermedades
export type Enfermedades = {
  id: string;
  idPaciente: string; // Referencia al paciente
  nombre: string;
  descripcion: string;
  fechaDiagnostico: Date;
};

// Definición del tipo para la tabla de Alergias
export type Alergias = {
  id: string;
  idPaciente: string; // Referencia al paciente
  nombre: string;
  gravedad: string;
  descripcion: string;
  fechaDiagnostico: Date;
};

// Definición del tipo para la tabla de Medicaciones
export type Medicacion = {
  id: string;
  idPaciente: string; // Referencia al paciente
  nombre: string;
  dosis: string;
  frecuencia: string;
  fechaInicio: Date;
  fechaFin?: Date; // Puede ser opcional si el tratamiento es indefinido
};

// Definición del tipo para la tabla de Cirugías
export type Cirugia = {
  id: string;
  idPaciente: string; // Referencia al paciente
  nombre: string;
  fecha: Date;
  descripcion: string;
  resultado: string;
};

// Definición del tipo para la tabla de Sesiones Dentales
export type Consultas = {
  id: string;
  paciente_id: string; // Referencia al paciente
  fecha_consulta: Date;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  imagenes: string[]; // Almacena las URLs de las imágenes subidas
};

// Definición del tipo para la tabla de Tratamientos Dentales
export type TratamientoDental = {
  id: string;
  paciente_id: string; // Referencia al paciente
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin?: Date; // Puede ser opcional
  resultado: string;
};
