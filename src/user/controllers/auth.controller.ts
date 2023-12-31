import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import {
  BaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto'
import { LoginDTO } from '../dtos/login.dto'
import { AuthService } from '../services/auth.service'
import { UserInfoDto, RegisterCodeDTO, RegisterSMSDTO } from '../dtos/auth.dto'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('认证鉴权')
@Controller('api')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({
    summary: '用户登录'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO)
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @HttpCode(200)
  @Post('login')
  async login (
    @Body() loginDTO: LoginDTO,
    @Session() session: Record<string, any>
  ): Promise<any> {
    const user = await this.authService.login(loginDTO)
    session.user = user
    return user
  }

  @ApiOperation({
    summary: '用户登出'
  })
  @ApiResponse({
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @HttpCode(200)
  @Post('logout')
  async logout (): Promise<any> {
    return
  }

  @ApiOperation({
    summary: '注册'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(LoginDTO)
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @HttpCode(200)
  @Post('register')
  async register (@Body() LoginDTO: LoginDTO): Promise<any> {
    return this.authService.registerByName(LoginDTO)
  }

  @ApiOperation({
    summary: '用户当前信息'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserInfoDto)
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @ApiBearerAuth()
  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async info (@Req() req: any): Promise<any> {
    const data = await this.authService.info(req.user.id)
    return { data }
  }

  @ApiOperation({
    summary: '短信验证码'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(UserInfoDto)
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @Post('registerCode')
  async registerCode (@Body() registerCodeDto: RegisterCodeDTO): Promise<any> {
    const code = await this.authService.registerCode(registerCodeDto)

    return {
      msg: '验证码已生成',
      data: { code }
    }
  }

  @ApiOperation({
    summary: '图形验证码'
  })
  @Get('captcha') //当请求该接口时，返回一张随机图片验证码
  async getCaptcha () {
    const data = await this.authService.getCaptcha()
    return {
      data
    }
  }

  @ApiOperation({
    summary: '短信用户注册/登录'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(RegisterSMSDTO)
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse
  })
  @Post('registerBySMS')
  async registerBySMS (@Body() registerDTO: RegisterSMSDTO): Promise<any> {
    return this.authService.registerBySMS(registerDTO)
  }
}
