#include "src/variables.h"
#include "src/iotDHT/iotDHT.hpp"
#include "src/iotDATABASE/iotDATABASE.hpp"
#include "src/iotOLED/iotOLED.hpp"
#include "src/iotGEOLOC/iotGEOLOC.hpp"
#include "src/iotDEBUG/iotDEBUG.hpp"
#include "src/iotWEBSERVER/iotWEBSERVER.hpp"
#include "src/iotWIFI/iotWIFI.hpp"

// ==================== ZONA DE CONFIGURACION DE LA ESTACION
// ==================== 1 PARA ACTIVAR SERVICIOS
// ==================== 0 PARA DESACTIVAR SERVICIOS
#define DEBUG 1
#define OLED 1
#define WEB_SERVER 1
#define FIREBASE 1
#define THINGSPEAK 1
#define GEOLOCATION 1

void setup()
{
  Serial.begin(115200);
  Serial.setDebugOutput(true);

  pinMode(ESP8266_LED, OUTPUT);
  digitalWrite(ESP8266_LED, LOW);

  InitializeOLED();
  printWiFiManager();

  InitializeWiFi();

  debugInfo();

  InitializeWebServer();
  InitializeThingSpeak();
  InitializeFirebase();
  InitializeGEOLOC();
  InitializeDHT();
}

void loop()
{

  digitalWrite(ESP8266_LED, HIGH);

  updateDHT();
  updateWebServer();

  printInfo(dataTime, t, h);

  if (isnan(h) || isnan(t))
  {
    printError("Error de lectura\n\nRevise el sistema");
    return;
  }

  debugData(t, h);
  SaveThingSpeak(t, h);
  SaveFirebase(t, h);
  getGEOLOC();

  digitalWrite(ESP8266_LED, LOW);

  updateWiFi();
}

// TODO:
//          1. Configuración de la base de datos desde el dispositivo móvil
//          2. Validaciones para el uso de los servicios
