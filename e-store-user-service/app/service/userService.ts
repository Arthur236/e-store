import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { autoInjectable } from 'tsyringe';

import { UserRepository } from '../repository/userRespository';
import { SuccessResponse } from '../utility/response';

@autoInjectable()
export class UserService {
  // Use dependency injection to access the data layer
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User creation, validation and verification
  async CreateUser(event: APIGatewayProxyEventV2) {
    const body = event.body;

    await this.repository.CreateUserOperation();

    return SuccessResponse({ message: 'Create user response' });
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'User login response' });
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Verify user response' });
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Create profile response' });
  }

  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Get profile response' });
  }

  async UpdateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Update profile response' });
  }

  // Cart
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Create cart response' });
  }

  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Get cart response' });
  }

  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Update cart response' });
  }

  // Payment
  async CreatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Create payment response' });
  }

  async GetPayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Get payment response' });
  }

  async UpdatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'Update payment response' });
  }
}
