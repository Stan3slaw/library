import type { CustomScalar } from '@nestjs/graphql';
import { Scalar } from '@nestjs/graphql';
import type { ValueNode } from 'graphql';
import { Kind } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<string, string> {
  description = 'Date custom scalar type';
  serialize(value: Date): string {
    return value.toISOString();
  }

  parseValue(value: string | number | Date): string {
    return new Date(value).toISOString();
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value).toISOString();
    }

    return null;
  }
}
