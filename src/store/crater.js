import DDPClient from '../lib/ddp';

const Crater = new DDPClient({
  url: 'wss://crater.io/websocket',
});

export default Crater;
