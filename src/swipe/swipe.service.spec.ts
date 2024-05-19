import { Test, TestingModule } from '@nestjs/testing';
import { SwipeService } from './swipe.service';
import { swipesProviders } from './swipe.provider';
import { usersProviders } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { SwipeDto } from './dto/swipe.dto';
import { Swipe } from './entities/swipe.entity';
import { SequelizeModule } from '@nestjs/sequelize';

describe('SwipeService', () => {
  let service: SwipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          useFactory: async () => ({
            dialect: 'sqlite',
            storage: ':memory:',
            synchronize: true,
            models: [Swipe],
          }),
        }),
      ],
      providers: [
        SwipeService,
        ...swipesProviders,
        UserService,
        ...usersProviders,
      ],
    }).compile();

    service = module.get<SwipeService>(SwipeService);
  });

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
});
