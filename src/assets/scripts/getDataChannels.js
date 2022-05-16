import { addZeros } from "@/assets/scripts/converUnits.js";

const getDataChannel = async (idChannel) => {
  const data = await fetch(
    `https://api.thingspeak.com/channels/${idChannel}/feeds.json`
  );
  const d = await data.json();
  return await d;
};

const getLastDataChannel = async (idChannel) => {
  let response = {
    channel: {
      id: null,
      name: "",
      field1: "",
      field2: "",
      latitude: "",
      longitude: "",
    },
    lastFeed: {
      create_at: "",
      field1: "",
      field2: "",
    },
  };
  const data = await fetch(
    `https://api.thingspeak.com/channels/${idChannel}/feeds.json?result=1`
  );
  const d = await data.json();
  const date = new Date(d.feeds[0].created_at);

  response = {
    channel: {
      id: d.channel.id,
      name: d.channel.name,
      field1: d.channel.field1,
      field2: d.channel.field2,
      latitude: d.channel.latitude,
      longitude: d.channel.longitude,
    },
    lastFeed: {
      created_at: d.feeds[0].created_at,
      date: `${await addZeros(date.getDate())}/${await addZeros(
        date.getMonth()
      )}/${await addZeros(date.getFullYear())}`,
      time: `${addZeros(date.getHours())}:${addZeros(
        date.getMinutes()
      )}:${addZeros(date.getSeconds())}`,
      temperature: parseFloat(d.feeds[0].field1),
      humidity: parseFloat(d.feeds[0].field2),
    },
  };
  return await response;
};
const getAllDataChannels = () => {
  const data = [];
  return data;
};

export { getDataChannel, getLastDataChannel, getAllDataChannels };
