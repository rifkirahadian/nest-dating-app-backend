import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() payload: CreateTransactionDto,
    @Res() res: Response,
    @Request() req,
  ) {
    const { id: userId } = req.user;
    const { type } = payload;

    try {
      await this.transactionService.validateExistTransaction(userId, type);
      await this.transactionService.create(userId, type);
      await this.transactionService.updateUserTransaction(type, userId);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return res.json({
      message: 'Transaction created',
    });
  }
}
