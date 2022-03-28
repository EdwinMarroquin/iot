#include "iotOLED.h"
#include "inteud.c"

void InitializeOLED()
{
  display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS);
  display.cp437(true);
  display.clearDisplay();
  display.drawBitmap(4, 2, image_data_inteud, 120, 62, SSD1306_WHITE);
  display.display();
  delay(3000);

  display.clearDisplay();
  display.display();

  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);

  Serial.println("OLED Inicializado");
}

void printWiFiManager()
{
  display.setCursor(0, 0);
  display.println((String)"WIFI: " + EST_SSID);
  display.println((String)"PASS: " + EST_PASS);
  display.println();
  display.println("Open in browser:");
  display.println("192.168.4.1");
  display.println("Connect local wifi");
  display.println("Enjoy!");
  display.display();
}

void printError(String error)
{
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("********************");
  display.println(error);
  display.println("********************");
  display.display();
  delay(2000);
}

void printInfo(long oD, float oT, float oH)
{

  display.clearDisplay();

  // display ip
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print( WiFi.localIP().toString());

  // display temperatura
  display.setCursor(0, 12);
  display.print("Temperatura: ");
  display.setTextSize(2);
  display.drawBitmap(0, 22, icon_temp, 14, 14, SSD1306_WHITE);
  display.setCursor(18, 22);
  display.print(t);
  display.setTextSize(1);
  display.print(" ");
  display.cp437(true);
  display.write(167);
  display.setTextSize(2);
  display.print("C");

  // display humedad
  display.setTextSize(1);
  display.setCursor(0, 40);
  display.print("Humedad: ");
  display.setTextSize(2);
  display.drawBitmap(0, 50, icon_humi, 14, 14, SSD1306_WHITE);
  display.setCursor(18, 50);
  display.print(h);
  display.setTextSize(1);
  display.print(" ");
  display.setTextSize(2);
  display.print("%");

  // display fecha y hora
  display.setTextSize(1);
  display.setCursor(80, 0);
  display.print(stationTime);
  display.display();
}
