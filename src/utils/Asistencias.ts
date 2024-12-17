import { GetAsistenciaDto } from "../dtos/asistencia/GetAsistenciaDto";


export function calcularHorasTrabajadas(asistencias: GetAsistenciaDto[]): string {
  return asistencias
    .reduce((totalHoras, asistencia) => {
      if (asistencia.asistenciaFin && asistencia.asistenciaInicio) {
        const inicio = new Date(asistencia.asistenciaInicio).getTime();
        const fin = new Date(asistencia.asistenciaFin).getTime();
        const horas = (fin - inicio) / (1000 * 60 * 60); // Convertir milisegundos a horas
        return totalHoras + horas;
      }
      return totalHoras;
    }, 0)
    .toFixed(2); // Limitar a dos decimales
}

export function obtenerRangoSemanaActual(): { inicio: Date; fin: Date } {
  const hoy = new Date();
  const diaDeLaSemana = hoy.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  const lunes = new Date(hoy);
  lunes.setDate(
    hoy.getDate() - (diaDeLaSemana === 0 ? 6 : diaDeLaSemana - 1)
  ); // Retrocede al lunes
  lunes.setHours(0, 0, 0, 0); // Inicio del día lunes

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6); // Avanza al domingo
  domingo.setHours(23, 59, 59, 999); // Fin del día domingo

  return { inicio: lunes, fin: domingo };
}

export function calcularHorasSemana(asistencias: GetAsistenciaDto[]): string {
  const { inicio, fin } = obtenerRangoSemanaActual();

  return asistencias
    .filter((asistencia) => {
      const diaAsistencia = new Date(asistencia.asistenciaInicio).getTime();
      return (
        diaAsistencia >= inicio.getTime() && diaAsistencia <= fin.getTime()
      );
    })
    .reduce((totalHoras, asistencia) => {
      if (asistencia.asistenciaFin && asistencia.asistenciaInicio) {
        const inicio = new Date(asistencia.asistenciaInicio).getTime();
        const fin = new Date(asistencia.asistenciaFin).getTime();
        const horas = (fin - inicio) / (1000 * 60 * 60); // Convertir a horas
        return totalHoras + horas;
      }
      return totalHoras;
    }, 0)
    .toFixed(2); // Limitar a dos decimales
}