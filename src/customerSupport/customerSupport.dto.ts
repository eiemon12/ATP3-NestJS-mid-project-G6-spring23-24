import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator"

export class customerSupportDTO{

    id: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z' 'A-Z]+$/,{message:"Name Should be a-z or A-Z"})
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    //@Transform(({ value }) => value.toNumber())
    //@Matches(/^(13|14|15|16|17|18|19)+$/, { message: "Phone number should start with 1 and have 10 digits" })
    phone: number;

    @IsNotEmpty()
    @IsString()
    @Length(4,8)
    @Matches(/^(?=.*\d).*$/,{message:"Password must contain at least one number"})
    password: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    dateOfBirth: Date;

    
    //file: string;
   
}
