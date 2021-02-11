import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private userRepo: UserRepository
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        return this.userRepo.signup(createUserDto)
    }

}
