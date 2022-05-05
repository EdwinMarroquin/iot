const getDataChannel = async (idChannel) => {
  const data = await fetch(
    `https://api.thingspeak.com/channels/${idChannel}/feeds.json`
  );
  const d = await data.json();
  return await d;
};
const getAllDataChannels = () => {};

export { getDataChannel, getAllDataChannels };
