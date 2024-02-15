import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { ObjectId } from 'mongoose';

import type { UserDocument } from './user.schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UserWithReviews } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = await this.userRepository.create(createUserDto);

    return createdUser;
  }

  async findOne(userId: ObjectId): Promise<UserDocument> {
    const foundUser = await this.userRepository.findOne(userId);

    if (!foundUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async findOneWithReviews(userId: ObjectId): Promise<UserWithReviews> {
    const userWithReviews = await this.userRepository.findOneWithReviews(
      userId,
    );

    if (!userWithReviews) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return userWithReviews;
  }

  async update(
    userId: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userRepository.update(userId, updateUserDto);

    return updatedUser;
  }

  async delete(userId: ObjectId): Promise<void> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await user.deleteOne();
  }
}
