import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        console.log(createUserDto);
        
        return this.authService.signup(createUserDto)
    }

}
