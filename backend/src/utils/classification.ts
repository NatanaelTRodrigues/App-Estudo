/**
 * Classificação de Desempenho
 */

export type Classification = "ruim" | "regular" | "bom" | "ótimo";

export interface ClassificationResult {
  label: string;
  emoji: string;
  classification: Classification;
  color: string;
}

/**
 * Classifica o desempenho baseado na taxa de acerto
 * @param accuracy - Taxa de acerto em porcentagem (0-100)
 * @returns Objeto com classificação e metadados
 */
export function classifyPerformance(accuracy: number): ClassificationResult {
  if (accuracy < 50) {
    return {
      label: "Ruim",
      emoji: "❌",
      classification: "ruim",
      color: "#f44336",
    };
  }

  if (accuracy < 70) {
    return {
      label: "Regular",
      emoji: "⚠️",
      classification: "regular",
      color: "#ff9800",
    };
  }

  if (accuracy < 85) {
    return {
      label: "Bom",
      emoji: "✅",
      classification: "bom",
      color: "#4caf50",
    };
  }

  return {
    label: "Ótimo",
    emoji: "⭐",
    classification: "ótimo",
    color: "#2196f3",
  };
}

/**
 * Classifica meta semanal baseada no progresso
 * @param progress - Progresso em porcentagem (0-100)
 */
export function classifyGoalProgress(progress: number): ClassificationResult {
  if (progress < 25) {
    return {
      label: "Muito Baixo",
      emoji: "🔴",
      classification: "ruim",
      color: "#f44336",
    };
  }

  if (progress < 50) {
    return {
      label: "Baixo",
      emoji: "🟠",
      classification: "regular",
      color: "#ff9800",
    };
  }

  if (progress < 75) {
    return {
      label: "Bom",
      emoji: "🟡",
      classification: "bom",
      color: "#ffc107",
    };
  }

  if (progress < 100) {
    return {
      label: "Muito Bom",
      emoji: "🟢",
      classification: "ótimo",
      color: "#4caf50",
    };
  }

  return {
    label: "Completado",
    emoji: "⭐",
    classification: "ótimo",
    color: "#2196f3",
  };
}

/**
 * Classifica desempenho mensal
 */
export function classifyMonthlyPerformance(
  averageAccuracy: number,
  totalHours: number,
  targetHours: number = 120 // 30h por semana * 4 semanas
): ClassificationResult {
  const hoursRatio = totalHours / targetHours;
  const score = (averageAccuracy / 100) * 0.6 + hoursRatio * 0.4;

  if (score < 0.4) {
    return {
      label: "Ruim",
      emoji: "❌",
      classification: "ruim",
      color: "#f44336",
    };
  }

  if (score < 0.65) {
    return {
      label: "Regular",
      emoji: "⚠️",
      classification: "regular",
      color: "#ff9800",
    };
  }

  if (score < 0.85) {
    return {
      label: "Bom",
      emoji: "✅",
      classification: "bom",
      color: "#4caf50",
    };
  }

  return {
    label: "Ótimo",
    emoji: "⭐",
    classification: "ótimo",
    color: "#2196f3",
  };
}
