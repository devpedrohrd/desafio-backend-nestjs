import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async findAll() {
    try {
      return await this.userService.findAll()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  async findOne(@Param('id') id: number) {
    try {
      return await this.userService.findOne(id)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(id, updateUserDto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  async remove(@Param('id') id: number) {
    try {
      await this.userService.remove(id)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
