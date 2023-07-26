import { ApiProperty } from '@nestjs/swagger'

import { IsNotEmpty, Matches, Max, Min, Length, IsEmail } from 'class-validator'

export class CreateUserDto {
  /**
   * 手机号（系统唯一）
   */
  @Matches(/^1\d{10}$/g, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13120776889' })
  readonly phoneNumber?: string

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  name?: string

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  password?: string

  salt?: string

  @ApiProperty({ example: '522959323@qq.com' })
  @IsNotEmpty()
  email?: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  avatar?: string

  @ApiProperty({ example: 'frontend' })
  @IsNotEmpty()
  job?: string

  @ApiProperty({ example: '前端开发工程师' })
  @IsNotEmpty()
  jobName?: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  organization?: string

  @ApiProperty({ example: 'shanghai' })
  @IsNotEmpty()
  location?: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  personalWebsite?: string

  @ApiProperty({ example: '637855e9e8c408970ef9f4de' })
  role?
}
