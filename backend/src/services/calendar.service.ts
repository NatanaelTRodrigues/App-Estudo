import { google } from "googleapis";

export class CalendarService {
  private calendar;
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    this.calendar = google.calendar({ version: "v3", auth: this.oauth2Client });
  }

  /**
   * Define tokens de autenticação do usuário
   */
  setCredentials(accessToken: string, refreshToken: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  /**
   * Cria evento no Google Calendar
   */
  async createEvent(
    summary: string,
    description: string,
    startTime: Date,
    endTime: Date,
    location?: string
  ) {
    try {
      const event = {
        summary,
        description,
        location,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: "America/Sao_Paulo",
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 30 },
            { method: "email", minutes: 60 },
          ],
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
      });

      console.log("✅ Evento criado:", response.data.htmlLink);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar evento:", error);
      throw error;
    }
  }

  /**
   * Sincroniza plano semanal com calendário
   */
  async syncWeeklyPlan(weeklyPlan: any) {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const events = [];

    for (let i = 0; i < days.length; i++) {
      const day = weeklyPlan[days[i]];

      if (day && day.subjects) {
        for (const subject of day.subjects) {
          const startTime = new Date();
          startTime.setDate(startTime.getDate() + i);
          startTime.setHours(14, 0, 0, 0); // Ajustar horário conforme necessário

          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + subject.duration);

          const event = await this.createEvent(
            `📚 ${subject.name}`,
            `Sessão de estudo: ${subject.name}`,
            startTime,
            endTime
          );

          events.push(event);
        }
      }
    }

    return events;
  }

  /**
   * Cria evento de simulado
   */
  async createExamEvent(date: Date, duration: number = 240) {
    const endTime = new Date(date);
    endTime.setMinutes(endTime.getMinutes() + duration);

    return await this.createEvent(
      "📝 Simulado",
      "Realizar simulado semanal",
      date,
      endTime
    );
  }

  /**
   * Lista eventos futuros
   */
  async listUpcomingEvents(maxResults: number = 10) {
    try {
      const response = await this.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: "startTime",
      });

      return response.data.items;
    } catch (error) {
      console.error("❌ Erro ao listar eventos:", error);
      throw error;
    }
  }

  /**
   * Atualiza evento
   */
  async updateEvent(eventId: string, updates: any) {
    try {
      const response = await this.calendar.events.patch({
        calendarId: "primary",
        eventId,
        requestBody: updates,
      });

      console.log("✅ Evento atualizado");
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao atualizar evento:", error);
      throw error;
    }
  }

  /**
   * Deleta evento
   */
  async deleteEvent(eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId: "primary",
        eventId,
      });

      console.log("✅ Evento deletado");
    } catch (error) {
      console.error("❌ Erro ao deletar evento:", error);
      throw error;
    }
  }
}

export const calendarService = new CalendarService();
