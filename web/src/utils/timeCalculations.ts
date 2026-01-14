/**
 * Funções utilitárias para cálculos de tempo para os gráficos
 */

/**
 * Converte horas decimais para formato "Xh Ymin"
 * @param decimalHours - Horas em formato decimal (ex: 1.5)
 * @returns String formatada (ex: "1h 30min")
 */
export function formatHours(decimalHours: number): string {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  if (hours === 0 && minutes === 0) {
    return "0min";
  }

  if (hours === 0) {
    return `${minutes}min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}

/**
 * Soma total de horas de um array de valores
 * @param hours - Array de horas em formato decimal
 * @returns Total de horas somadas
 */
export function sumHours(hours: number[]): number {
  return hours.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Agrupa horas por dia para gráfico diário
 * @param data - Array de objetos com createdAt e horas
 * @returns Array com total de horas por dia
 */
export function groupByDay(
  data: { createdAt: string; hoursStudied?: number }[]
): {
  date: string;
  hours: number;
  formattedHours: string;
}[] {
  const grouped = new Map<string, number>();

  data.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString("pt-BR");
    const hours = item.hoursStudied || 0;
    grouped.set(date, (grouped.get(date) || 0) + hours);
  });

  return Array.from(grouped.entries()).map(([date, hours]) => ({
    date,
    hours: parseFloat(hours.toFixed(2)),
    formattedHours: formatHours(hours),
  }));
}

/**
 * Agrupa horas por semana para gráfico semanal
 * @param data - Array de objetos com weekNumber, year e horas
 * @returns Array com total de horas por semana
 */
export function groupByWeek(
  data: { weekNumber: number; year: number; currentHours?: number }[]
): {
  week: string;
  hours: number;
  formattedHours: string;
}[] {
  const grouped = new Map<string, number>();

  data.forEach((item) => {
    const weekKey = `Semana ${item.weekNumber}/${item.year}`;
    const hours = item.currentHours || 0;
    grouped.set(weekKey, (grouped.get(weekKey) || 0) + hours);
  });

  return Array.from(grouped.entries()).map(([week, hours]) => ({
    week,
    hours: parseFloat(hours.toFixed(2)),
    formattedHours: formatHours(hours),
  }));
}

/**
 * Agrupa horas por mês para gráfico mensal
 * @param data - Array de objetos com createdAt e horas
 * @returns Array com total de horas por mês
 */
export function groupByMonth(
  data: { createdAt: string; hoursStudied?: number }[]
): {
  month: string;
  hours: number;
  formattedHours: string;
}[] {
  const grouped = new Map<string, number>();

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const monthKey = `${date.toLocaleString("pt-BR", {
      month: "long",
    })}/${date.getFullYear()}`;
    const hours = item.hoursStudied || 0;
    grouped.set(monthKey, (grouped.get(monthKey) || 0) + hours);
  });

  return Array.from(grouped.entries()).map(([month, hours]) => ({
    month,
    hours: parseFloat(hours.toFixed(2)),
    formattedHours: formatHours(hours),
  }));
}

/**
 * Agrupa horas por matéria para análise
 * @param data - Array de objetos com subject e horas
 * @returns Array com total de horas por matéria
 */
export function groupBySubject(
  data: { subject: string; hoursStudied?: number }[]
): {
  subject: string;
  hours: number;
  formattedHours: string;
}[] {
  const grouped = new Map<string, number>();

  data.forEach((item) => {
    const hours = item.hoursStudied || 0;
    grouped.set(item.subject, (grouped.get(item.subject) || 0) + hours);
  });

  return Array.from(grouped.entries())
    .map(([subject, hours]) => ({
      subject,
      hours: parseFloat(hours.toFixed(2)),
      formattedHours: formatHours(hours),
    }))
    .sort((a, b) => b.hours - a.hours); // Ordenar por horas decrescente
}

/**
 * Calcula média de horas por dia em um período
 * @param totalHours - Total de horas estudadas
 * @param days - Número de dias
 * @returns Média de horas por dia
 */
export function averageHoursPerDay(
  totalHours: number,
  days: number
): {
  average: number;
  formattedAverage: string;
} {
  const average = days > 0 ? totalHours / days : 0;
  return {
    average: parseFloat(average.toFixed(2)),
    formattedAverage: formatHours(average),
  };
}

/**
 * Converte minutos para horas decimais
 * @param minutes - Quantidade de minutos
 * @returns Horas em formato decimal
 */
export function minutesToHours(minutes: number): number {
  return parseFloat((minutes / 60).toFixed(2));
}

/**
 * Converte horas e minutos para horas decimais
 * @param hours - Horas inteiras
 * @param minutes - Minutos
 * @returns Horas em formato decimal
 */
export function hoursMinutesToDecimal(hours: number, minutes: number): number {
  return parseFloat((hours + minutes / 60).toFixed(2));
}
