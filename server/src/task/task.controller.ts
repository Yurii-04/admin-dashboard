import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Roles } from '../common/decorators';
import { Role } from '../common/enums';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Roles(Role.VIEWER, Role.ADMIN, Role.EDITOR)
  @Get()
  async getAll() {
    return this.taskService.findAll();
  }

  @Roles(Role.VIEWER, Role.ADMIN, Role.EDITOR)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
