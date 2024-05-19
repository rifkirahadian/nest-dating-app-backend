import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.provider';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          useFactory: async () => ({
            dialect: 'sqlite',
            storage: ':memory:',
            synchronize: true,
            models: [User],
          }),
        }),
      ],
      providers: [UserService, ...usersProviders, JwtService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const registerDto: RegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      gender: 'male',
    };

    const newUser = new User();
    newUser.id = 1;
    newUser.name = 'Test User';
    newUser.email = 'test@example.com';
    newUser.password = 'password123';
    newUser.gender = 'male';
    newUser.isVerified = false;
    newUser.dailySwipeQuota = 10;

    jest
      .spyOn(service, 'create')
      .mockImplementationOnce(() => Promise.resolve(newUser));

    // Call the create method of the UserService with the registerDto
    const createdUser = await service.create(registerDto);

    // Verify that the created user matches the expected newUser
    expect(createdUser).toEqual(newUser);
  });
});
