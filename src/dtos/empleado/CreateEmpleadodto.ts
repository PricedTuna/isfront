export interface CreateEmpleadoDto {
  nombreEmpleado: string;
  curp: string;
  rfc: string;
  nss: string;
  emailLaboral: string;
  emailPersonal: string;
  numCelLaboral: string;
  numCelPersonal: string;
  registroPatronal: string;
  fechaNacimiento: Date;
  lugarNacimiento: string;
  idNacionalidad: number;
  idDomicilio: number;
  idEstadoCivil: number;
  idSucursal: number;
  idDepartamento: number;
  idPuesto: number;
  idTipoEmpleado: number;
  idDiasVacaciones: number;
  estatus: string;

}

export interface UpdateEmpleadoDto extends CreateEmpleadoDto {
  idEmpleado: number;
}
