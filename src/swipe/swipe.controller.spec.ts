import { Test, TestingModule } from '@nestjs/testing';
import { SwipeController } from './swipe.controller';
import { SwipeService } from './swipe.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth';
import { UserService } from '../user/user.service';
import { usersProviders } from '../user/user.provider';
import { swipesProviders } from './swipe.provider';

describe('SwipeController', () => {
  let controller: SwipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [SwipeController],
      providers: [
        SwipeService,
        UserService,
        ...usersProviders,
        ...swipesProviders,
      ],
    }).compile();

    controller = module.get<SwipeController>(SwipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
