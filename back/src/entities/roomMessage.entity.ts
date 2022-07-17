import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { chatRoom } from "./chatRoom.entity"

@Entity('roomMessage')
export class    roomMessage extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    senderId : string

    @Column()
    message : string

    @Column()
    roomId : number 

    @Column()
    time : Date

}