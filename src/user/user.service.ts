import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async validateUserUniqueEmail(email: string) {
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(`Email '${email}' has been used`);
    }
  }
}
