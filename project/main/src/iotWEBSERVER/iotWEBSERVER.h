#include <ESP8266WiFi.h> // Libreria ESP8266
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

ESP8266WebServer server(SERVER_PORT);

String dataWebServer = "";
