import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'
import { ObjectId } from 'mongoose'

export abstract class Common {
  @ObjectIdColumn()
  _id: ObjectId

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({
    default: false,
    select: false
  })
  isDelete: boolean

  @VersionColumn({
    select: false
  })
  version: number

  @Column()
  thumbnail: object
}
