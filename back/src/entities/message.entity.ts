import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('messages')
export class    messages extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    senderId : string
    
    @Column()
    reciverId : string

    @Column()
    message : string

    @Column()
    time : Date

}