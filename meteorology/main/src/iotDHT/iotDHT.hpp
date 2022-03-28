#include "iotDHT.h"

void InitializeDHT()
{
  dht.begin();
}

void updateDHT()
{
  t = dht.readTemperature();
  h = dht.readHumidity();
}
