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
            // console.log(error);
            if(error.code === 'ER_DUP_ENTRY') { // dublicate entry (username)
                
                throw new ConflictException('Username already exists.');
            } else {
                throw new InternalServerErrorException('.');
            }
        }
    }

    async validatePassword(createUserDto: CreateUserDto): Promise<string> {
        const {username, password} = createUserDto;
        const user = await this.findOne({username});
        
        if(user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    } 

}