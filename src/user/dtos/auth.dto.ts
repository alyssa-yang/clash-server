import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches, IsString } from 'class-validator'
import { regMobileCN } from '@/shared/utils/regex.util'

export class RegisterSMSDTO {
  /**
   * 手机号（系统唯一）
   */
  // @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13120776889' })
  readonly phoneNumber: string

  /**
   * 短信验证码
   */
  @IsNotEmpty({ message: '请输入验证码' })
  @ApiProperty({ example: '6889' })
  readonly smsCode: string
}

export class RegisterCodeDTO {
  /**
   * 手机号（系统唯一）
   */
  // @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13611177420' })
  readonly phoneNumber: string

  @IsNotEmpty({ message: '请输入验证码ID' })
  @ApiProperty({ example: 'GaBUGhJzESU=' })
  readonly captchaId: string

  @IsNotEmpty({ message: '请输入验证码' })
  @ApiProperty({ example: '0000' })
  readonly captchaCode: string
}

export class RegisterDTO {
  /**
   * 手机号，唯一
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13120776889' })
  readonly phoneNumber: string

  /**
   * 用户名
   */
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是 String 类型' })
  @ApiProperty({ example: 'admin' })
  readonly name: string

  /**
   * 用户密码
   */
  @IsNotEmpty({ message: '请输入密码' })
  @ApiProperty({ example: 'admin' })
  readonly password: string

  /**
   * 二次输入密码
   */
  @IsNotEmpty({ message: '请再次输入密码' })
  @ApiProperty({ example: 'admin' })
  readonly passwordRepeat: string
}

export class UserInfoDto {
  /**
   * 手机号（系统唯一）
   */
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  @ApiProperty({ example: '13120776889' })
  readonly phoneNumber: string

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  password: string

  @ApiProperty({ example: '522959323@qq.com' })
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  avatar: string

  @ApiProperty({ example: 'frontend' })
  @IsNotEmpty()
  job: string

  @ApiProperty({ example: '前端开发工程师' })
  @IsNotEmpty()
  jobName: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  organization: string

  @ApiProperty({ example: 'shanghai' })
  @IsNotEmpty()
  location: string

  @ApiProperty({ example: 'cookieboty' })
  @IsNotEmpty()
  personalWebsite: string

  @ApiProperty({ example: '{}' })
  permissions?: object | []

  salt?: string
}

export class RegisterCodeItem {
  /**
   * 手机号
   */
  mobile: string
}

export class UserInfoItem {
  /**
   * 用户id
   */
  id: number

  /**
   * 创建时间
   */
  createTime: Date

  /**
   * 更新时间
   */
  updateTime: Date

  /**
   * 手机号
   */
  mobile: string
}

export class UserInfoVO {
  info: UserInfoItem
}
