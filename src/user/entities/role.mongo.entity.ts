/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm'
import { Common } from 'src/shared/entities/common.entity'

@Entity()
export class Role extends Common {
  @Column('text')
  name: string

  @Column('')
  permissions: object
}
