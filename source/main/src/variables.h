#include "variablesComponents.h"

// ==================== Inicializacion de variables
#define EST_SSID "METEOROLOGIA"
#define EST_PASS "estacion2022"

#define SERVER_PORT 80

String nodePath;

float lat = 0.0;
float lon = 0.0;

float t = 0.0;
float h = 0.0;

int d = 10000;
long dataTime = 0;
int utcOffset = -5;
String stationTime = "";
// GMT+5 =  5
// GMT-5 =  -5

unsigned long sendDataPrevMillis = 0;
