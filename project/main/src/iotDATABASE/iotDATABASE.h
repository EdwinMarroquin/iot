#include <ThingSpeak.h>

#include <ESP8266HTTPClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// ==================== Librerias para coneccion a base datos de google
#include <FirebaseESP8266.h>    // Firebase para ESP8266
#include <addons/TokenHelper.h> // Generacion de token de acceso
#include <addons/RTDBHelper.h>

//  ==================== Configuracion Firebase (NO MODIFICAR)
#define DB_ID "hidrologia-u-distrital"                                       // Identificador de la base de datos
#define DB_HOST "https://hidrologia-u-distrital-default-rtdb.firebaseio.com" // Direccion de la base datos
#define DB_API_KEY "AIzaSyC0v-XlIcscm_BlAKdyYxHPzp5CQpmxBgw"                 // Clave de acceso a la bas de datos
#define DB_REST_SECRET "tPtDKT4ZF0nanJ9QyJYZBRMsrnnc3P1Cj0CQPGWT"            //

// ================================================================================= //
//   Para usar la base de datos de google debe solicitar la creacion del usuario a   //
//   efmarroquinb@udistrital.edu.co, enviando su correo, y datos del proyecto        //
// ================================================================================= //

// ==================== Configuracion Firebase (Datos del proyecto)
// ==================== suministrado por el administrador del sistema
// Nombre del nodo donde se almacena la informacion
#define DB_NODE "edwin-marroquin"
// Correo de validacion
#define FIREBASE_EMAIL "efmarroquinb@correo.udistrital.edu.co"
// Contraseña de validacion
#define FIREBASE_PASS "Maria-0227-"


// ==================== Datos conexion API ThingSpeak
#define THINK_CHANNEL 1662545           //  Ingrese su clave Write API de ThingSpeak
#define THINK_KEY "1VXGOVNMCWHWT3B2"      //  Ingrese su clave Write API de ThingSpeak
#define THINK_SERVER "api.thingspeak.com" // Servidos Thingspeak (Matlab)

// ==================== Configuracion Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;



