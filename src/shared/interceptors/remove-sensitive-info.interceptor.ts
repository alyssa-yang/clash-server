import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { map } from 'rxjs'

@Injectable()
export class RemoveSensitiveUserInfoInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    console.log('request', request.body, request.originalUrl, request.query)
    return next.handle().pipe(
      map(res => {
        if (res) {
          res = JSON.parse(JSON.stringify(res))
          // 全局消除
          this.delValue(res, 'password')
          this.delValue(res, 'salt')
        }

        return {
          code: 200,
          result: res
        }
      })
    )
  }

  delValue (data, targetKey) {
    for (const key in data) {
      if (key === targetKey) {
        delete data[key]
      } else if (typeof data[key] === 'object') {
        this.delValue(data[key], targetKey)
      }
    }
    return data
  }
}
