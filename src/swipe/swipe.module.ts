import { Module } from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { SwipeController } from './swipe.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth';
import { UserService } from 'src/user/user.service';
import { usersProviders } from 'src/user/user.provider';
import { swipesProviders } from './swipe.provider';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SwipeController],
  providers: [SwipeService, UserService, ...usersProviders, ...swipesProviders],
})
export class SwipeModule {}
