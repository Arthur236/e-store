import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const register = async (event: APIGatewayProxyEventV2) => {
  console.log('event:', event);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Sign up response',
      data: {},
    }),
  };
};
