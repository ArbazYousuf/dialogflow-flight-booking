import * as dialogflow from '@google-cloud/dialogflow';
import { v4 as uuid } from 'uuid';
import * as path from 'path';

// Set the path to your service account key file
const serviceAccountPath = path.join(__dirname, '/config', 'dialogflow.json');

// Set up Dialogflow session client
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: serviceAccountPath,
});

// Send a message to Dialogflow and get a response
export const sendMessageToDialogflow = async (message: string, projectId = "composed-region-435314-m1") => {
    const sessionId = uuid();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message, // Correctly pass the message string
                languageCode: 'en-US',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result: any = responses[0].queryResult;

        // Safely check for intent
        if (result && result.intent) {
            console.log('Detected Intent:', result.intent.displayName);
        } else {
            console.log('No intent detected.');
        }

        // Debugging details
        console.log('Detected Intent:', result?.intent?.displayName);
        console.log('Fulfillment Text:', result?.fulfillmentText);
        console.log('Parameters:', result?.parameters);

        return result?.fulfillmentText || 'No response from Dialogflow.';
    } catch (err) {
        console.error('ERROR:', err);
        throw err;
    }
};
