import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./DTO/create-task.dto";
import { GetTaskFilterDto } from "./DTO/get-task-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.model";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const {status, searchTerm} = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.user = :userId', {userId: user.id})

        if(searchTerm) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${searchTerm}%`});
        } 
            
        if(status) {
            query.andWhere('task.status = :status', {status: status});
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.open;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
}