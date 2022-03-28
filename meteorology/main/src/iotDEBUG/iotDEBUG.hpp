#include "iotDEBUG.h"

void debugInfo(){

  Serial.println("IP: ");
  Serial.println(WiFi.localIP());

}

void debugData(float t, float h) {

  Serial.println("\n// ===========================================");
  Serial.println((String) "// == Temperature reading (°C): " + String(t));
  Serial.println((String) "// == Humidity reading     (%): " + String(h));
  Serial.println("\n// ===========================================");

}
