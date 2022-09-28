import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from './http-exception.filter';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';

@Controller('cat')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createCatDto: CreateCatDto): void {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
