export interface EmpleadoDto {
  idEmpleado:       number;
  nombreEmpleado:   string;
  curp:             string;
  rfc:              string;
  nss:              string;
  emailLaboral:     string;
  emailPersonal:    string;
  numCelLaboral:    string;
  numCelPersonal:   string;
  registroPatronal: string;
  fechaNacimiento: Date | null; 
  lugarNacimiento:  string;
  idNacionalidad:   number;
  idDomicilio:      number;
  idEstadoCivil:    number;
  idSucursal:       number;
  idDepartamento:   number;
  idPuesto:         number;
  idTipoEmpleado:   number;
  idDiasVacaciones: number;
  estatus:          string;
  createDate:       Date;
  updateDate:       Date;
}
