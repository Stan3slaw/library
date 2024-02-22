import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { UserWithReviews } from './dto/user.dto';
import type { UserDocument } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.update(userId, updateUserDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
  ): Promise<UserDocument> {
    return this.userService.findOne(userId);
  }

  @Get('/reviews/:id')
  async findOneWithReviews(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
  ): Promise<UserWithReviews> {
    return this.userService.findOneWithReviews(userId);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseObjectIdPipe) userId: ObjectId,
  ): Promise<void> {
    return this.userService.delete(userId);
  }
}
