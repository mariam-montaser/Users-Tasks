import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.open, TaskStatus.in_progress, TaskStatus.done])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string;
}