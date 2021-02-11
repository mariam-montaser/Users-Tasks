import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";


export class TaskStatusValidatorPipe implements PipeTransform {
    readonly allowedTaskStatus = [TaskStatus.open, TaskStatus.in_progress, TaskStatus.done];

    transform(value: string, metaData: ArgumentMetadata): string {

        if(!this.isValidStatus(value)) throw new BadRequestException(`${value} is not a valid status.`)
        
        return value;
    }

    private isValidStatus(status: any): boolean {
        const idx: number = this.allowedTaskStatus.indexOf(status);
        return idx !== -1;
    }
}