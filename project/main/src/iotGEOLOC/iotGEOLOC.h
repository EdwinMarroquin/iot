#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include "ESP8266WiFi.h"

#define GEOLOC_HOST "www.googleapis.com"
#define GEOLOC_API_KEY "AIzaSyAor4_IQ6zbgIQ44djnjKo1EdsFD8CyqfQ" // Clave de acceso a la API de geolocalizacion

#define GEOLOC_HASH "/geolocation/v1/geolocale?key="

int status = WL_IDLE_STATUS;

WiFiClientSecure client;
