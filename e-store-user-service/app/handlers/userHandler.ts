import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { container } from 'tsyringe';

import { UserService } from '../service/userService';

const userService = container.resolve(UserService);

export const register = middy((event: APIGatewayProxyEventV2) => {
  return userService.CreateUser(event);
}).use(jsonBodyParser());

export const login = middy((event: APIGatewayProxyEventV2) => {
  return userService.UserLogin(event);
}).use(jsonBodyParser());

export const verify = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.VerifyUser(event);
  } else if (httpMethod === 'get') {
    return userService.GetVerificationToken(event);
  } else {
    return userService.UnsupportedMethod(event);
  }
}).use(jsonBodyParser());

export const profile = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreateProfile(event);
  } else if (httpMethod === 'get') {
    return userService.GetProfile(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdateProfile(event);
  } else {
    return userService.UnsupportedMethod(event);
  }
}).use(jsonBodyParser());

export const cart = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreateCart(event);
  } else if (httpMethod === 'get') {
    return userService.GetCart(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdateCart(event);
  } else {
    return userService.UnsupportedMethod(event);
  }
}).use(jsonBodyParser());

export const payment = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  if (httpMethod === 'post') {
    return userService.CreatePayment(event);
  } else if (httpMethod === 'get') {
    return userService.GetPayment(event);
  } else if (httpMethod === 'patch' || httpMethod === 'put') {
    return userService.UpdatePayment(event);
  } else {
    return userService.UnsupportedMethod(event);
  }
}).use(jsonBodyParser());
