import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { GetAsistenciaDto } from '../../../dtos/asistencia/GetAsistenciaDto';

ChartJS.register(...registerables);

function GraficaHorasPorTipo({ asistencias }: { asistencias: GetAsistenciaDto[] }) {
  if (!asistencias.length) return null;

  // Agrupar horas trabajadas por idTipoAsistencia
  const datosAgrupados = asistencias.reduce((acc, { idTipoAsistencia, asistenciaInicio, asistenciaFin }) => {
    if (asistenciaInicio && asistenciaFin) {
      const horas = (new Date(asistenciaFin).getTime() - new Date(asistenciaInicio).getTime()) / (1000 * 60 * 60);
      acc[idTipoAsistencia == 1 ? 'Presencial' : "En linea"] = (acc[idTipoAsistencia] || 0) + horas;
    }
    return acc;
  }, {} as Record<string, number>);

  // Configuración para la gráfica
  const data = {
    labels: Object.keys(datosAgrupados),
    datasets: [
      {
        label: 'Horas trabajadas',
        data: Object.values(datosAgrupados),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = { responsive: true, scales: { y: { beginAtZero: true } } };

  return <Bar data={data} options={options} />;
}

export default GraficaHorasPorTipo;
