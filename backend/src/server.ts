import WebSocket, { WebSocketServer } from 'ws';
import { sendMessageToDialogflow } from './dialogflowClient';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', async (message: Buffer) => {
    // Convert the buffer to a string
    const messageStr = message.toString();

    console.log('Received:', messageStr);

    // Call the Dialogflow function with the message string
    try {
      const answ = await sendMessageToDialogflow(messageStr);

      // Send the response back to the WebSocket client
      ws.send(`${answ}`);
    } catch (error) {
      console.error('Error communicating with Dialogflow:', error);
      ws.send('Error communicating with Dialogflow');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');

