import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/auth/DTO/create-user.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signup(createUserDto: CreateUserDto ): Promise<void> {
        const { username, password } = createUserDto;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
        } catch(error) {
            if(error.code === '23505') { // dublicate username
                throw new ConflictException('Username already exists.');
            } else {
                throw new InternalServerErrorException('.');
            }
        }
    }

    private hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    } 

}