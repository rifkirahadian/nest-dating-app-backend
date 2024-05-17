import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { SwipeDto } from './dto/swipe.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/guards/auth';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('swipe')
export class SwipeController {
  constructor(
    private readonly swipeService: SwipeService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() payload: SwipeDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const { id: userId } = req.user;
    try {
      await this.swipeService.validateUserTargetId(payload.userId);
      await this.swipeService.validateSwipeDailyQuota(userId);
      await this.swipeService.validateHasSwiped(userId, payload.userId);

      await this.swipeService.create(payload, userId);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return res.json({
      message: 'Swipe success',
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async find(@Request() req, @Res() res: Response) {
    const { id: currentUserId, gender } = req.user;
    const { id, name, isVerified } = await this.userService.getViewedUser(
      currentUserId,
      gender,
    );

    return res.json({
      data: { id, name, isVerified },
    });
  }
}
