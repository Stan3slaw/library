import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({});

export { UserSchema };
