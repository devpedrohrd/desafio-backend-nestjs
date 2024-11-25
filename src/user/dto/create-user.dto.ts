import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import {
  IsString,
  IsInt,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  name: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ description: 'User id' })
  id: number

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  email: string

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'User birthday' })
  birthDay: Date

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'User created  at' })
  createdAt: Date

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: 'User updated at' })
  updatedAt: Date
}
