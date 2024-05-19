import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.provider';
import { BadRequestException } from '@nestjs/common';
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

    expect(await service.create(registerDto)).toEqual(newUser);
  });

  it('should get user by email', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.gender = 'male';

    jest
      .spyOn(service, 'findOneByEmail')
      .mockImplementation(() => Promise.resolve(user));

    expect(await service.findOneByEmail('test@example.com')).toBe(user);
  });

  it('should get user by id', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.gender = 'male';

    jest
      .spyOn(service, 'findById')
      .mockImplementation(() => Promise.resolve(user));

    expect(await service.findById(1)).toBe(user);
  });

  it('should throw BadRequestException if email is already in use', async () => {
    const email = 'test@example.com';

    // Mock the findOneByEmail method to return a user
    jest.spyOn(service, 'findOneByEmail').mockResolvedValue(new User());

    // Expect validateUserUniqueEmail to throw BadRequestException
    await expect(service.validateUserUniqueEmail(email)).rejects.toThrow(
      new BadRequestException(`Email '${email}' has been used`),
    );

    // Verify that findOneByEmail was called with the correct parameter
    expect(service.findOneByEmail).toHaveBeenCalledWith(email);
  });

  it('should get viewed user', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.gender = 'male';

    jest
      .spyOn(service, 'getViewedUser')
      .mockImplementation(() => Promise.resolve(user));

    expect(await service.getViewedUser(1, 'female')).toBe(user);
  });

  it('should update user as verified', async () => {
    const userId = 1;

    // Create a mock user
    const mockUser = new User();
    mockUser.id = userId;
    mockUser.isVerified = false;
    mockUser.save = jest.fn().mockResolvedValue(mockUser);

    // Mock the findById method to return the mock user
    jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

    // Call the updateVerified method
    const updatedUser = await service.updateVerified(userId);

    // Verify that the user was updated correctly
    expect(updatedUser.isVerified).toBe(true);
    expect(mockUser.save).toHaveBeenCalled();

    // Verify that findById was called with the correct parameter
    expect(service.findById).toHaveBeenCalledWith(userId);
  });
});
