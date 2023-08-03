import { Entity, Column, ObjectID, OneToOne } from 'typeorm'
import { Common } from '../../shared/entities/common.entity'
import { Role } from './role.mongo.entity'

@Entity()
export class User extends Common {
  // 昵称
  @Column('text')
  name: string

  @Column('text')
  avatar: string

  @Column({ length: 200 })
  email: string

  @Column('text')
  phoneNumber: string

  @Column()
  password: string

  role?: ObjectID

  @Column()
  job: string

  @Column()
  jobName: string

  @Column()
  organization: string

  @Column()
  organizationName: string

  @Column()
  location: string

  @Column()
  locationName: string

  @Column()
  introduction: string

  @Column()
  personalWebsite: string

  @Column('boolean')
  verified: boolean

  @Column({
    type: 'text',
    select: false
  })
  salt: string

  @Column()
  isAccountDisabled?: boolean
}
