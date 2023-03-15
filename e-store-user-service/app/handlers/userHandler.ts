import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { container } from 'tsyringe';

import { UserService } from '../service/userService';
import { ErrorResponse } from '../utility/response';

const userService = container.resolve(UserService);

export const register = middy((event: APIGatewayProxyEventV2) => {
  return userService.CreateUser(event);
}).use(jsonBodyParser());

export const login = middy((event: APIGatewayProxyEventV2) => {
  return userService.UserLogin(event);
}).use(jsonBodyParser());

export const verify = (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.VerifyUser(event);
  } else if (httpMethod === 'get') {
    return userService.GetVerificationToken(event);
  } else {
    return ErrorResponse(404, 'requested method is not supported!');
  }
};

export const profile = (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreateProfile(event);
  } else if (httpMethod === 'get') {
    return userService.GetProfile(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdateProfile(event);
  } else {
    return ErrorResponse(404, 'requested method is not supported!');
  }
};

export const cart = (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreateCart(event);
  } else if (httpMethod === 'get') {
    return userService.GetCart(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdateCart(event);
  } else {
    return ErrorResponse(404, 'requested method is not supported!');
  }
};

export const payment = (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreatePayment(event);
  } else if (httpMethod === 'get') {
    return userService.GetPayment(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdatePayment(event);
  } else {
    return ErrorResponse(404, 'requested method is not supported!');
  }
};
