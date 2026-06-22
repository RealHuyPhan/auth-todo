import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    @BeforeUpdate()
    async hashPasswordOnUpdate() {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
}
