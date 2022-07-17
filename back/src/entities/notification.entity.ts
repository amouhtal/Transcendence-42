import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('notification')

export class Notification extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    senderName : string
    @Column()
    reciverName : string

    @Column()
    type : string

    @Column()
    time : Date

    @Column({nullable : true})
    Accepted : boolean

}
