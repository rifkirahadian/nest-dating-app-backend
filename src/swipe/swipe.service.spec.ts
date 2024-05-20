import { Test, TestingModule } from '@nestjs/testing';
import { SwipeService } from './swipe.service';
import { swipesProviders } from './swipe.provider';
import { usersProviders } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { SwipeDto } from './dto/swipe.dto';
import { Swipe } from './entities/swipe.entity';
// import { BadRequestException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { createMemDB } from '../database/create-mem-db';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('SwipeService', () => {
  let service: SwipeService;
  let userService: UserService;
  let memDb: Sequelize;

  beforeEach(async () => {
    memDb = await createMemDB([User, Swipe]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwipeService,
        ...swipesProviders,
        UserService,
        ...usersProviders,
      ],
    }).compile();
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [UserService, ...usersProviders, JwtService],
    }).compile();

    service = module.get<SwipeService>(SwipeService);
    userService = userModule.get<UserService>(UserService);
  });

  afterAll(() => memDb.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should count today swipes', async () => {
    const count = 5;
    jest
      .spyOn(service, 'getCountTodaySwipes')
      .mockImplementationOnce(() => Promise.resolve(count));

    expect(await service.getCountTodaySwipes(1)).toEqual(count);
  });

  it('should create swipes', async () => {
    const swipeDto: SwipeDto = {
      userId: 3,
      type: 'like',
    };

    const newSwipe: Swipe = Swipe.build({
      userId: 1,
      userTargetId: 2,
      type: 'like',
    });

    jest
      .spyOn(service, 'create')
      .mockImplementationOnce(() => Promise.resolve(newSwipe));

    expect(await service.create(swipeDto, newSwipe.userId)).toEqual(newSwipe);
  });

  it('should throw BadRequestException if user is not found', async () => {
    const userId = 1;

    // Mock the findById method to return null (user not found)
    jest.spyOn(userService, 'findById').mockResolvedValue(null);

    // Expect validateUserTargetId to throw BadRequestException
    await expect(service.validateUserTargetId(userId)).rejects.toThrow(
      new BadRequestException(`User id '${userId}' not found`),
    );
  });
});
