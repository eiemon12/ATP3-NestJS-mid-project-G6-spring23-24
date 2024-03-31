import { Matches } from "class-validator";
import { IsEmail, IsString,IsNotEmpty,Length,IsEnum} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column ,OneToOne,OneToMany} from 'typeorm';


enum Gender {
    Male = 'male',
    Female = 'female',
  }

export class CustomerDTO{


    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id:number;

    @IsNotEmpty({message: 'Please enter a valid name'})
    @IsString({message: 'Please enter a string name'})
    @Matches(/^[^\d]+$/, { message: 'Name should not contain numbers' })
    @Length(4,100)
    fullName:string;


    @IsNotEmpty({message: 'Please enter a valid name'})
    @IsString({message: 'Please enter a string name'})
    @Matches(/^[^\d]+$/, { message: 'Name should not contain numbers' })
    @Length(4,10)
    username:string;

    @IsString()
    @IsEmail({},{message: 'Please enter a valid email'})
    @Matches(/.com$/, { message: 'Email must be from .com domain' })
    email:string;

    @IsNotEmpty({message: 'Please enter a valid password'})
    @IsString({ message: 'Password should be a string' })
    @Length(6,100)
    @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    password: string;


    @IsEnum(Gender, { message: 'Gender should be either male or female' })
    gender: Gender;

    @IsNotEmpty({message: 'Please enter a valid age'})
    @Length(2,3)
    age:number;

    @IsNotEmpty({message: 'status should not be empty'})
    status:string;


    @IsString({ message: 'Phone number should be a string' })
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phoneNumber: string;

    //filename:string;
}
