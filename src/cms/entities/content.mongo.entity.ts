import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ObjectID,
  OneToOne
} from 'typeorm'
import { Common } from '@/shared/entities/common.entity'
import { User } from '@/user/entities/user.mongo.entity'
@Entity()
export class Content extends Common {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @Column('text')
  content: string

  @Column('text')
  type: string

  @OneToOne(() => User)
  userId?: ObjectID

  @Column('boolean')
  publish: boolean
}
