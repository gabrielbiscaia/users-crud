import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users', error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user', error);
    }
  }

  async findWithQuery(page: number = 1, limit: number = 10, query?: string) {
    try {
      const skip = (page - 1) * limit;
      let where: Prisma.UserWhereInput = {};

      if (query) {
        where = {
          OR: [{ nome: { contains: query, mode: 'insensitive' } }],
        };
      }

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          take: limit,
          skip: skip,
          orderBy: { id: 'asc' },
        }),
        this.prisma.user.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      if (page > totalPages) {
        throw new NotFoundException(
          `Page ${page} not found. Total pages: ${totalPages}`,
        );
      }

      return {
        data: users,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch users', error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user', error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user', error);
    }
  }
}
