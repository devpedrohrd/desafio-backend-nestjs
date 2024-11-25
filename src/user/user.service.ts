import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/Config/Prisma.service'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  private async findUserOrThrow(id: number) {
    const user = this.prismaService.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: createUserDto.email },
    })

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    await this.prismaService.user.create({ data: createUserDto })
  }

  async findAll() {
    const [users, total] = await Promise.all([
      await this.prismaService.user.findMany({
        orderBy: { id: 'desc' },
      }),
      await this.prismaService.user.count(),
    ])

    if (!users) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND)
    }

    return { total, users }
  }

  async findOne(id: number) {
    const user = await this.findUserOrThrow(id)

    return user
      ? user
      : new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findUserOrThrow(id)

    await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  async remove(id: number) {
    const user = await this.findUserOrThrow(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    await this.prismaService.user.delete({
      where: { id },
    })
  }
}
