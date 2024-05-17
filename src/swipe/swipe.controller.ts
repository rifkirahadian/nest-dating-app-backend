import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { CreateSwipeDto } from './dto/create-swipe.dto';
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

  @Post()
  create(@Body() createSwipeDto: CreateSwipeDto) {
    return this.swipeService.create(createSwipeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async find(@Request() req, @Res() res: Response) {
    const { id, gender } = req.user;
    const user = await this.userService.getViewedUser(id, gender);

    return res.json({
      data: user,
    });
  }
}
