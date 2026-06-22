import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ name: 'user_id' })
    userId: string; // Links the todo to the Supabase Auth User ID
}
