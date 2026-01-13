/**
 * Cálculos e Métricas do Sistema
 */

import { getWeek, getYear } from "date-fns";

/**
 * Calcula o progresso de uma meta
 */
export function calculateGoalProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
}

/**
 * Calcula a taxa de acerto
 */
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return (correct / total) * 100;
}

/**
 * Calcula comparação entre semanas (crescimento percentual)
 */
export function calculateWeekComparison(
  currentWeek: number,
  previousWeek: number
): number {
  if (previousWeek === 0) return currentWeek > 0 ? 100 : 0;
  return ((currentWeek - previousWeek) / previousWeek) * 100;
}

/**
 * Obtém número da semana atual
 */
export function getCurrentWeekNumber(): number {
  return getWeek(new Date(), { weekStartsOn: 1 });
}

/**
 * Obtém ano atual
 */
export function getCurrentYear(): number {
  return getYear(new Date());
}

/**
 * Calcula média de um array de números
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Encontra melhor e pior semana baseado em critério
 */
export function findBestAndWorstWeeks(
  weekData: Array<{ week: number; value: number }>
): { best: number; worst: number } {
  if (weekData.length === 0) {
    return { best: 0, worst: 0 };
  }

  let best = weekData[0];
  let worst = weekData[0];

  weekData.forEach((data) => {
    if (data.value > best.value) best = data;
    if (data.value < worst.value) worst = data;
  });

  return { best: best.week, worst: worst.week };
}

/**
 * Calcula progresso global da meta (combinando múltiplos critérios)
 */
export function calculateOverallGoalProgress(
  hoursProgress: number,
  subjectsProgress: number,
  questionsProgress: number
): number {
  return (hoursProgress + subjectsProgress + questionsProgress) / 3;
}

/**
 * Converte minutos em horas formatadas
 */
export function minutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins > 0 ? mins + "min" : ""}`;
}

/**
 * Calcula estatísticas de um conjunto de dados
 */
export function calculateStatistics(data: number[]) {
  if (data.length === 0) {
    return {
      min: 0,
      max: 0,
      average: 0,
      total: 0,
    };
  }

  return {
    min: Math.min(...data),
    max: Math.max(...data),
    average: calculateAverage(data),
    total: data.reduce((acc, val) => acc + val, 0),
  };
}

/**
 * Calcula tendência (crescente, decrescente, estável)
 */
export function calculateTrend(
  values: number[]
): "crescente" | "decrescente" | "estável" {
  if (values.length < 2) return "estável";

  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));

  const firstAvg = calculateAverage(firstHalf);
  const secondAvg = calculateAverage(secondHalf);

  const difference = secondAvg - firstAvg;
  const threshold = firstAvg * 0.1; // 10% de variação

  if (difference > threshold) return "crescente";
  if (difference < -threshold) return "decrescente";
  return "estável";
}
