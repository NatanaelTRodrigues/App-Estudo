import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = {
    background: darkMode ? "#0a1929" : "#f5f5f5",
    card: darkMode ? "#132f4c" : "#ffffff",
    text: darkMode ? "#ffffff" : "#000000",
    textSecondary: darkMode ? "#b0bec5" : "#666666",
    primary: darkMode ? "#90caf9" : "#1976d2",
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={darkMode ? "light" : "dark"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          📚 App de Estudos
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Versão Mobile com Expo
        </Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            🎯 Dashboard
          </Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            Acompanhe seu progresso semanal
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0h
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Horas
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Questões
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Matérias
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            ⚙️ Configurações
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Text style={styles.buttonText}>
              {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            📱 Como usar
          </Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            • Baixe o app Expo Go na Play Store{"\n"}• Escaneie o QR code que
            aparece no terminal{"\n"}• Ou use o emulador Android para testar
            {"\n"}• Conecte na mesma rede WiFi do computador
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            🚀 Próximas Features
          </Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            ✅ Tema claro/escuro{"\n"}
            🔄 Login e autenticação{"\n"}
            🔄 Adicionar questões{"\n"}
            🔄 Ver estatísticas{"\n"}
            🔄 Notificações push{"\n"}
            🔄 Sincronização com web
          </Text>
        </View>

        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          Desenvolvido com ❤️ usando Expo
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    fontSize: 12,
  },
});
