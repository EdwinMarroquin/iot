#include "iotWIFI.h"

void InitializeWiFi()
{

  if (!wm.autoConnect(EST_SSID, EST_PASS))
    printError("Error en la conexión\n\nIntente de nuevo");

  WiFi.mode(WIFI_STA);
  // STATION       = WIFI_STA
  // ACCESS POINT  = WIFI_AP

  if (MDNS.begin("esp8266"))
    Serial.println("MDNS responder started");

}

void updateWiFi()
{

  MDNS.update();
  delay(d);

}
