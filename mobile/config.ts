// Configuração do app mobile
export const config = {
  // Use seu IP local aqui (descobra com: ipconfig no Windows ou ifconfig no Mac/Linux)
  API_URL: __DEV__
    ? "http://10.0.2.2:3000" // Android Emulator (dev)
    : // ? 'http://192.168.1.100:3000'  // Dispositivo físico na mesma rede
      "https://app-estudo.onrender.com",  // Backend no Render

  // Timeout para requisições HTTP
  TIMEOUT: 10000,

  // Configurações de tema
  THEME: {
    DARK: {
      background: "#0a1929",
      card: "#132f4c",
      text: "#ffffff",
      textSecondary: "#b0bec5",
      primary: "#90caf9",
      success: "#4caf50",
      error: "#f44336",
    },
    LIGHT: {
      background: "#f5f5f5",
      card: "#ffffff",
      text: "#000000",
      textSecondary: "#666666",
      primary: "#1976d2",
      success: "#2e7d32",
      error: "#c62828",
    },
  },
};

export default config;
