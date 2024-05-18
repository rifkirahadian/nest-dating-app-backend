import { Test, TestingModule } from '@nestjs/testing';
import { SwipeService } from './swipe.service';
import { swipesProviders } from './swipe.provider';
import { usersProviders } from '../user/user.provider';
import { UserService } from '../user/user.service';

describe('SwipeService', () => {
  let service: SwipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
});
