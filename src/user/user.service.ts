import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import type { ObjectId } from 'mongoose';

import type { UserDocument } from './user.schema';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { UserWithReviews } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    const savedUser = await user.save();

    return savedUser;
  }

  async findOne(userId: ObjectId): Promise<UserDocument> {
    const [user] = await this.userModel.find({
      _id: userId,
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOneWithReviews(userId: ObjectId): Promise<UserWithReviews> {
    const userWithReviews = await this.userModel
      .aggregate<UserWithReviews>([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId as unknown as string),
          },
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'userId',
            as: 'reviews',
          },
        },
        { $limit: 1 },
      ])
      .then((data) => data[0]);

    if (!userWithReviews) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return userWithReviews;
  }

  async update(
    userId: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );

    return updatedUser;
  }

  async delete(userId: ObjectId): Promise<void> {
    const user = await this.userModel.findOne(userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await user.deleteOne();
  }
}
