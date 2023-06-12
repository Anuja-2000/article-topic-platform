const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const params = {
      TableName: 'topicDom-type-template',
      ProjectionExpression: 'topicDomainId, topicDomainName'
    };
    const data = await docClient.scan(params).promise();
    const items = data.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(items)
    };
  } catch (err) {
    return {
      statusCode: 400,
      error: `Could not fetch topics: ${err}`
    };
  }
};




/*

export function getTopics() {
    return [
      { id: 1, name: 'Topic 1', description: 'This is the first topic' },
      { id: 2, name: 'Topic 2', description: 'This is the second topic' },
      { id: 3, name: 'Topic 3', description: 'This is the third topic' },
      { id: 4, name: 'Topic 4', description: 'This is the fourth topic' },
      { id: 5, name: 'Topic 5', description: 'This is the fifth topic' },
      { id: 6, name: 'Topic 6', description: 'This is the sixth topic' },
      { id: 7, name: 'Topic 7', description: 'This is the seventh topic' },
      { id: 8, name: 'Topic 8', description: 'This is the eighth topic' },
      { id: 9, name: 'Topic 9', description: 'This is the ninth topic' },
      { id: 10, name: 'Topic 10', description: 'This is the tenth topic' },
      { id: 11, name: 'Topic 11', description: 'This is the eleventh topic' },
      { id: 12, name: 'Topic 12', description: 'This is the twelfth topic' },
      { id: 13, name: 'Topic 13', description: 'This is the thirteenth topic' },
      { id: 14, name: 'Topic 14', description: 'This is the fourteenth topic' },
      { id: 15, name: 'Topic 15', description: 'This is the fifteenth topic' },
    ];
  }
  */