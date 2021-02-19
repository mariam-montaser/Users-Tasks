import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        console.log(createUserDto);
        
        return this.authService.signup(createUserDto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{token: string}> {
        return this.authService.signin(createUserDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
        
    }

}
