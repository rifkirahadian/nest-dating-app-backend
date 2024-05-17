import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Swipe } from './entities/swipe.entity';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { SwipeDto } from './dto/swipe.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SwipeService {
  constructor(
    @Inject('SWIPES_REPOSITORY')
    private swipesRepository: typeof Swipe,
    private userService: UserService,
  ) {}

  async getCountTodaySwipes(userId: number): Promise<number> {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const todaySwipes = await this.swipesRepository.count({
      where: {
        userId,
        [Op.and]: Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('createdAt')),
          formattedToday,
        ),
      },
    });

    return todaySwipes;
  }

  async create(payload: SwipeDto, userId: number): Promise<Swipe> {
    return this.swipesRepository.create({
      userId,
      userTargetId: payload.userId,
      type: payload.type,
    });
  }

  async validateUserTargetId(id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new BadRequestException(`User id '${id}' not found`);
    }
  }

  async validateHasSwiped(userId: number, userTargetId: number) {
    const isSwiped = await this.swipesRepository.findOne({
      where: { userId, userTargetId },
    });

    if (isSwiped) {
      throw new BadRequestException(`This user has been swiped before`);
    }
  }

  async validateSwipeDailyQuota(userId: number) {
    const user = await this.userService.findById(userId);
    if (user.dailySwipeQuota !== null) {
      const todaySwiped = await this.getCountTodaySwipes(userId);
      if (todaySwiped >= user.dailySwipeQuota) {
        throw new BadRequestException('Your daily swipe quota has run out');
      }
    }
  }
}
