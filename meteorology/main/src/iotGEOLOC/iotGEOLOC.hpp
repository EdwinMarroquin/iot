#include "iotGEOLOC.h"
#include <WifiLocation.h>

WifiLocation location(GOOGLE_API_GEOLOCATION_KEY);

void InitializeGEOLOC()
{
  // location.begin();
}

void getGEOLOC()
{

  // http.begin(client, SERVER_GEOLOC);
  // delay(100); // See if this prevents the problm with connection refused and deep sleep
  // http.addHeader("Content-Type", "application/json");
  // delay(100); // See if this prevents the problm with connection refused and deep sleep
  // int httpCode = http.POST(KEY_GEOLOC);
  // String payload = http.getString();
  // Serial.println(httpCode); // Print HTTP return code
  // Serial.println(payload);  // Print request response payload
  // http.end();

  // location_t loc = location.getGeoFromWiFi();

  // Serial.println("Location request data");
  // Serial.println(location.getSurroundingWiFiJson());
  // Serial.println("Latitude: " + String(loc.lat, 7));
  // Serial.println("Longitude: " + String(loc.lon, 7));
  // Serial.println("Accuracy: " + String(loc.accuracy));
}
