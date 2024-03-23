import { Injectable, UnauthorizedException } from '@nestjs/common';
import { customerSupportEntity } from './customerSupport.entity';
import { busEntity } from './customerSupport.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class customerSupportService {
    constructor(
        @InjectRepository(customerSupportEntity)
        private userRepository: Repository<customerSupportEntity>,
        @InjectRepository(busEntity) 
        private busRepository: Repository<busEntity>,
    ) {}

    getHello(): string {
        return 'Hello CustomerSupport!';
    }
    async createEMP(user: customerSupportEntity): Promise<customerSupportEntity> {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        user.password = hashedPassword; // Update the password with the hashed one
        return this.userRepository.save(user);
    }

    //auth
    async login(email: string, password: string): Promise<customerSupportEntity> {
        const user = await this.userRepository.findOne({ where: { email, userType: 'customerSupport' } });
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    //user
    async createUser(user: customerSupportEntity): Promise<customerSupportEntity> {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        user.password = hashedPassword; // Update the password with the hashed one
        return this.userRepository.save(user);
    }

    async getUsersByType(userType: string): Promise<customerSupportEntity[]> {
        return this.userRepository.find({ where: { userType } });
    }

    async getUserById(id: number, userType: string): Promise<customerSupportEntity> {
        return this.userRepository.findOne({ where: { id, userType } });
    }

    async findUserByPhone(phone: number, userType: string): Promise<customerSupportEntity> {
        return this.userRepository.findOne({ where: { phone, userType } });
    }

    async updateUser(id: number, updatedUserData: Partial<customerSupportEntity>): Promise<customerSupportEntity> {
        await this.userRepository.update(id, updatedUserData);
        return this.userRepository.findOne({where:{id}});
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async createBus(bus: busEntity): Promise<busEntity> {
        return this.busRepository.save(bus);
    }

    async getAllBuses(): Promise<busEntity[]> {
        return this.busRepository.find();
    }

    async getBusById(id: number): Promise<busEntity> {
        return this.busRepository.findOne({where:{id}});
    }

    async updateBus(id: number, updatedBus: busEntity): Promise<busEntity> {
        await this.busRepository.update(id, updatedBus);
        return this.busRepository.findOne({where:{id}});
    }

    async deleteBus(id: number): Promise<void> {
        await this.busRepository.delete(id);
    }
}
