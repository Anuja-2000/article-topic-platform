import { v4 as uuidv4 } from 'uuid';

import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { templateId, templateContent, topicDomain, articleType } = req.body;

  // Create a new item with a generated UUID
  const item = {
    id: uuidv4(),
    templateId,
    templateContent,
    topicDomain,
    articleType,
  };

  // Create a DynamoDB client
  const client = new DynamoDBClient({ region: 'us-east-1' }); 

  // Create a PutItemCommand to save the item in DynamoDB
  const command = new PutItemCommand({
    TableName: 'topicDom-type-template-pro', 
    Item: {
      id: { S: item.id },
      templateId: { S: item.templateId },
      templateContent: { S: item.templateContent },
      topicDomain: { S: item.topicDomain },
      articleType: { S: item.articleType },
    },
  });

  try {
    // Send the command to DynamoDB
    await client.send(command);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
