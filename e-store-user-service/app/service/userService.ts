import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { plainToClass } from 'class-transformer';
import { autoInjectable } from 'tsyringe';

import { LoginInput } from '../models/dto/LoginInput';
import { SignupInput } from '../models/dto/SignupInput';
import { VerificationInput } from '../models/dto/UpdateInput';
import { UserRepository } from '../repository/userRespository';
import { TimeDifference } from '../utility/dateHelper';
import { AppValidationError } from '../utility/errors';
import {
  generateAccessCode,
  sendVerificationCode,
} from '../utility/notifications';
import {
  getSalt,
  getHashedPassword,
  validatePassword,
  getToken,
  verifyToken,
} from '../utility/password';
import { ErrorResponse, SuccessResponse } from '../utility/response';

@autoInjectable()
export class UserService {
  // Use dependency injection to access the data layer
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async UnsupportedMethod(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, 'requested method is not supported!');
  }

  // User creation, validation and verification
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);

      if (error) return ErrorResponse(404, error);

      const salt = await getSalt();
      const hashedPassword = await getHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: 'BUYER',
        salt: salt,
      });

      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(LoginInput, event.body);
      const error = await AppValidationError(input);

      if (error) return ErrorResponse(404, error);

      const data = await this.repository.findAccount(input.email);
      const verified = await validatePassword(
        input.password,
        data.password,
        data.salt
      );

      if (!verified) {
        throw new Error('password does not match!');
      }

      const token = getToken(data);

      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const payload = await verifyToken(token);

    if (!payload) return ErrorResponse(403, 'authorization failed');

    const { code, expiry } = generateAccessCode();
    await this.repository.updateVerificationCode(payload.user_id, code, expiry);

    // const response = await sendVerificationCode(code, payload.email);

    return SuccessResponse({
      message: 'verification code is sent to your registered email!',
    });
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const payload = await verifyToken(token);

    if (!payload) return ErrorResponse(403, 'authorization failed');

    const input = plainToClass(VerificationInput, event.body);
    const error = await AppValidationError(input);

    if (error) return ErrorResponse(404, error);

    const { verification_code, expiry } = await this.repository.findAccount(
      payload.email
    );

    if (verification_code === parseInt(input.code, 10)) {
      // check expiry
      const currentTime = new Date();
      const diff = TimeDifference(expiry, currentTime.toISOString(), 'm');

      if (diff > 0) {
        await this.repository.updateVerifyUser(payload.user_id);
        return SuccessResponse({ message: 'user verified successfully' });
      } else {
        return ErrorResponse(403, 'verification code is expired');
      }
    }

    return ErrorResponse(403, 'verification code is expired');
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
