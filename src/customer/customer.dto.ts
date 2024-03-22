import { Matches } from "class-validator";
//import { IsJpeg } from "class-validator";
import { IsEmail, IsString,IsNotEmpty,Length,IsEnum} from "class-validator";


enum Gender {
    Male = 'male',
    Female = 'female',
  }

export class CustomerDTO{


    @IsNotEmpty({message: 'Please enter a valid id'})
    @Length(4,10)
    id:number;

    @IsNotEmpty({message: 'Please enter a valid name'})
    @IsString({message: 'Please enter a string name'})
    fullName:string;


    @IsNotEmpty({message: 'Please enter a valid name'})
    @IsString({message: 'Please enter a string name'})
    @Matches(/^[^\d]+$/, { message: 'Name should not contain numbers' })
    @Length(4,10)
    username:string;

    @IsString()
    @IsEmail({},{message: 'Please enter a valid email'})
    @Matches(/@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
    email:string;

    @IsNotEmpty({message: 'Please enter a valid password'})
    @IsString({ message: 'Password should be a string' })
    @Length(6,100)
    @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    password: string;


    @IsEnum(Gender, { message: 'Gender should be either male or female' })
    gender: Gender;

    @IsNotEmpty({message: 'Please enter a valid age'})
    @Length(3)
    age:number;

    @IsNotEmpty({message: 'status should not be empty'})
    status:string;


   // @IsString()
   // @IsJpeg({ message: 'Profile picture must have JPG extension' })
    //sprofilePicture?: string;



    @IsString({ message: 'Phone number should be a string' })
    @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
    phoneNumber: string;
}
