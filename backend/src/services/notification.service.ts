import * as admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

export interface NotificationPayload {
  token: string;
  title: string;
  body: string;
  data?: { [key: string]: string };
}

export class NotificationService {
  /**
   * Envia notificação push para um dispositivo
   */
  async sendPushNotification(payload: NotificationPayload): Promise<string> {
    try {
      const message = {
        notification: {
          title: payload.title,
          body: payload.body,
        },
        data: payload.data,
        token: payload.token,
      };

      const response = await getMessaging().send(message);
      console.log("✅ Notificação enviada:", response);
      return response;
    } catch (error) {
      console.error("❌ Erro ao enviar notificação:", error);
      throw error;
    }
  }

  /**
   * Envia notificação para múltiplos dispositivos
   */
  async sendMulticast(tokens: string[], title: string, body: string) {
    try {
      const message = {
        notification: { title, body },
        tokens,
      };

      const response = await getMessaging().sendMulticast(message);
      console.log(`✅ ${response.successCount} notificações enviadas`);

      if (response.failureCount > 0) {
        console.log(`❌ ${response.failureCount} notificações falharam`);
      }

      return response;
    } catch (error) {
      console.error("❌ Erro ao enviar notificações:", error);
      throw error;
    }
  }

  /**
   * Agenda notificação de lembrete de estudo
   */
  scheduleStudyReminder(userId: string, subject: string, time: Date) {
    return {
      userId,
      type: "study_reminder",
      title: "📚 Hora de estudar!",
      body: `Está na hora de estudar ${subject}`,
      scheduledFor: time,
    };
  }

  /**
   * Agenda notificação de meta semanal
   */
  scheduleWeeklyGoal(userId: string) {
    const monday = new Date();
    monday.setHours(8, 0, 0, 0);

    return {
      userId,
      type: "weekly_goal",
      title: "🎯 Nova semana!",
      body: "Defina suas metas para esta semana",
      scheduledFor: monday,
    };
  }

  /**
   * Agenda notificação de simulado
   */
  scheduleExamReminder(userId: string) {
    const saturday = new Date();
    saturday.setHours(8, 0, 0, 0);

    return {
      userId,
      type: "exam",
      title: "📝 Dia de simulado!",
      body: "Seu simulado está programado para hoje",
      scheduledFor: saturday,
    };
  }

  /**
   * Agenda notificação de revisão
   */
  scheduleReviewReminder(userId: string) {
    const friday = new Date();
    friday.setHours(19, 0, 0, 0);

    return {
      userId,
      type: "review",
      title: "🔄 Hora de revisar!",
      body: "Revise os erros da semana",
      scheduledFor: friday,
    };
  }

  /**
   * Notificação de relatório mensal pronto
   */
  scheduleMonthlyReport(userId: string) {
    const lastDayOfMonth = new Date();
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1, 0);
    lastDayOfMonth.setHours(20, 0, 0, 0);

    return {
      userId,
      type: "monthly_report",
      title: "📊 Relatório mensal pronto!",
      body: "Seu relatório de desempenho está disponível",
      scheduledFor: lastDayOfMonth,
    };
  }
}

export const notificationService = new NotificationService();
