export const formatDate = (fecha: Date) => {
  return fecha.toLocaleString('es-MX', {
    dateStyle: 'medium', // 'short', 'medium', 'long', 'full'
    timeStyle: 'short', // 'short', 'medium', 'long'
  });
}