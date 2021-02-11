import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepo: TaskRepository
    ) {}

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepo.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this.taskRepo.findOne(id);
        if(!task) throw new NotFoundException(`Task with id ${id} is not found.`);
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepo.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        // const task = await this.getTaskById(id);
        const result = await this.taskRepo.delete(id);
        console.log(result);
        if(result.affected === 0) throw new NotFoundException(`Task with id ${id} is not found.`);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    //     const {status, searchTerm} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) tasks = tasks.filter((task: Task) => task.status === status);
    //     if(searchTerm) tasks = tasks.filter((task:Task) => task.title.includes(searchTerm) || task.description.includes(searchTerm))
    //     return tasks;
    // }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskById(id: string): Task {
    //     const task =  this.tasks.find((task: Task) => task.id === id );
    //     if(!task) throw new NotFoundException(`Task with id ${id} is not found.`)
    //     return task;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description} = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.open
    //     }
    //     // console.log(task);
        
    //     this.tasks = [...this.tasks, task];
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const delTask = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task: Task) => task.id !== delTask.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     // const task = this.tasks.find((task: Task) => task.id === id);
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     console.log(this.tasks);
        
    //     return task;
    // }
}
