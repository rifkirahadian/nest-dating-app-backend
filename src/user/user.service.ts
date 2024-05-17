import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(payload: RegisterDto): Promise<User> {
    const { name, email, password, gender } = payload;
    return this.usersRepository.create({
      name,
      email,
      password,
      gender,
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findByPk(id);
  }

  async validateUserUniqueEmail(email: string) {
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(`Email '${email}' has been used`);
    }
  }

  async getViewedUser(userId: number, gender: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.notIn]: Sequelize.literal(
            `(SELECT "userTargetId" FROM "swipes" WHERE "userId" = ${userId})`,
          ),
        },
        gender: { [Op.ne]: gender },
      },
    });

    return user;
  }
}
