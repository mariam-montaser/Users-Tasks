import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private userRepo: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        return this.userRepo.signup(createUserDto)
    }

    async signin(createUserDto: CreateUserDto): Promise<{token: string}> {
        const username = await this.userRepo.validatePassword(createUserDto);
        console.log(username);
        if(!username) {
            throw new UnauthorizedException('Invalid username or password')
        } 
        const payload: JwtPayload = {username};
        const token = await this.jwtService.sign(payload);
        return {token}
    }

}
