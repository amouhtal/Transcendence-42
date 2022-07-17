import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from "express";
import { JwtAuthGuard } from './guards/jwt-auth.gguard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}


