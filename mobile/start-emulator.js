const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

async function listAndroidEmulators() {
  try {
    console.log("🔍 Procurando emuladores Android...\n");

    // Lista emuladores disponíveis
    const { stdout } = await execPromise("emulator -list-avds");
    const emulators = stdout
      .trim()
      .split("\n")
      .filter((e) => e);

    if (emulators.length === 0) {
      console.log("❌ Nenhum emulador Android encontrado!\n");
      console.log("📱 Opções:");
      console.log(
        "   1. Instale o Android Studio e crie um AVD (Android Virtual Device)"
      );
      console.log(
        "   2. Ou use o Expo Go no seu celular físico (escaneie o QR code)\n"
      );
      return null;
    }

    console.log("📱 Emuladores disponíveis:");
    emulators.forEach((emulator, index) => {
      console.log(`   ${index + 1}. ${emulator}`);
    });
    console.log("");

    return emulators[0]; // Retorna o primeiro emulador
  } catch (error) {
    console.log("⚠️  Android SDK não encontrado ou não configurado");
    console.log("💡 Use o Expo Go no celular para testar o app\n");
    return null;
  }
}

async function startEmulator(emulatorName) {
  try {
    console.log(`🚀 Iniciando emulador: ${emulatorName}...`);
    console.log("⏳ Aguarde, isso pode levar alguns segundos...\n");

    // Inicia o emulador em background
    exec(`emulator -avd ${emulatorName}`, (error) => {
      if (error && !error.message.includes("EPIPE")) {
        console.log("⚠️  Erro ao iniciar emulador:", error.message);
      }
    });

    // Aguarda o emulador inicializar
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("✅ Emulador iniciado com sucesso!");
    console.log(
      "📲 O Expo instalará o app automaticamente quando estiver pronto\n"
    );

    return true;
  } catch (error) {
    console.log("❌ Erro ao iniciar emulador:", error.message);
    return false;
  }
}

async function checkEmulatorRunning() {
  try {
    const { stdout } = await execPromise("adb devices");
    const devices = stdout
      .split("\n")
      .filter((line) => line.includes("emulator"))
      .filter((line) => line.includes("device"));

    return devices.length > 0;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log("\n🤖 ========== ANDROID EMULATOR MANAGER ==========\n");

  // Verifica se já tem emulador rodando
  const isRunning = await checkEmulatorRunning();

  if (isRunning) {
    console.log("✅ Emulador Android já está rodando!");
    console.log("📲 O Expo conectará automaticamente...\n");
    return;
  }

  // Lista emuladores disponíveis
  const emulator = await listAndroidEmulators();

  if (emulator) {
    // Inicia o primeiro emulador
    await startEmulator(emulator);
  } else {
    console.log("📱 ALTERNATIVA: Use o Expo Go no celular");
    console.log("   1. Instale: https://expo.dev/client");
    console.log("   2. Escaneie o QR code que aparecerá\n");
  }

  console.log("================================================\n");
}

main().catch(console.error);
