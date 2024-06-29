const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Users',
  KeySchema: [
    { AttributeName: 'email', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'email', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Error al crear tabla:', JSON.stringify(err, null, 2));
  } else {
    console.log('Table creada exitosamente:', JSON.stringify(data, null, 2));
  }
});
