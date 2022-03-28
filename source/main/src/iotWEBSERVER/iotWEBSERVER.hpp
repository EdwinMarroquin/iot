#include "iotWEBSERVER.h"
#include "index.h"

void handle_OnConnect();
void handle_ApiData();
void handle_NotFound();
String dataJson(int d, float t, float h);

void InitializeWebServer()
{

  server.on("/", []()
            { server.send(200, "text/html", index_html); });

  server.on("/data", []()
            {
    String dataJ = "{ \"d\": " + String(dataTime) + " , \"t\" : " + String(t) + " , \"h\" : " + String(h) + "}";
    server.send(200, "application/json", dataJ); });

  server.onNotFound([]()
                    { server.send(404, "text/plain", "Opps! regrese a la pagina anterior"); });

  server.begin();
}

void updateWebServer()
{
  server.handleClient();
}
