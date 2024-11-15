import { Controller, Get, Post, Query } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('/api/')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('create-stripe-intent')
  createStripeIntent(
    @Query('amt') amt: number,
    @Query('cur') cur: string,
    @Query('cusId') cusId: string,
    @Query('refId') refId: number,
  ) {
    return this.stripeService.createStripeIntent(amt, cur, cusId, +refId);
  }

  @Get('payment-success')
  paymentSuccess(
    @Query('paymentId') paymentId: string,
    @Query('cusId') cusId: string,
    @Query('refId') refId: number,
  ) {
    return this.stripeService.paymentSuccess(paymentId, cusId, +refId);
  }

  @Post('cancel-stripe-intent')
  cancelStripeIntent(@Query('paymentIntent') paymentIntent: string) {
    return this.stripeService.cancelStripeIntent(paymentIntent);
  }
}
