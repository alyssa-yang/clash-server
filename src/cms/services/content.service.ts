import { Injectable, Inject } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { Content } from '../entities/content.mongo.entity'
import { UpdateContentDto } from '../dtos/content.dto'
import puppeteer from 'puppeteer'
import { join } from 'path'
import { ensureDir } from 'fs-extra'

@Injectable()
export class ContentService {
  constructor (
    @Inject('CONTENT_REPOSITORY')
    private contentRepository: MongoRepository<Content>
  ) {}

  async create (dto: UpdateContentDto) {
    const has = await this.contentRepository.findOneBy({
      id: parseInt(dto.id as any)
    })
    let ret
    if (!has) {
      // 判断是否存在
      const count = await this.contentRepository.count()
      dto.id = count + 1
      dto['isDelete'] = false
      dto.publish = false
      // 异步生成缩略图
      ret = await this.contentRepository.save(dto)
    } else {
      ret = await this.contentRepository.updateOne(
        { id: dto.id },
        { $set: dto }
      )
    }

    // if (dto.publish) {
    const thumbnail = await this.takeScreenshot(dto.id)
    dto.thumbnail = thumbnail
    // }
    console.log(1111, thumbnail)
    return dto
  }

  async findAll ({
    pageSize,
    page,
    userId
  }): Promise<{ data: Content[]; count: number }> {
    const [data, count] = await this.contentRepository.findAndCount({
      where: {
        userId,
        isDelete: false
        // type: 'content'
      },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true
    })

    return {
      data,
      count
    }
  }

  async publishList () {
    const data = await this.contentRepository.findBy({
      where: {
        isDelete: false,
        publish: true
      }
    })
    return data.map(v => '' + v.id)
  }

  async findAllTemplate ({
    pageSize,
    page,
    userId
  }): Promise<{ data: Content[]; count: number }> {
    const [data, count] = await this.contentRepository.findAndCount({
      where: {
        // userId,
        isDelete: false,
        type: 'template'
      },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize * 1,
      cache: true
    })

    return {
      data,
      count
    }
  }

  async findOne (id: string) {
    const ret = await this.contentRepository.findOneBy({
      id: parseInt(id),
      isDelete: false
    })
    return ret
  }

  async update (id: string, dto: UpdateContentDto) {
    const ret = await this.contentRepository.update(id, dto)
    return ret
  }

  async remove (id: number): Promise<any> {
    const ret = await this.contentRepository.updateOne(
      { id },
      { $set: { isDelete: true, publish: false } }
    )

    return ret
  }

  /**
   * 截取缩略图
   * @param url
   * @param id
   */
  async takeScreenshot (id) {
    const url = `http://clash-builder.echoyore.tech/?id=${id}`
    const host = 'http://clash-server.echoyore.tech/'
    // const url = `http://localhost:5002/?id=${id}`
    // const host = 'http://localhost:4000/'
    const prefix = `static/upload/`
    const imgPath = join(__dirname, '../../../..', prefix)
    await ensureDir(imgPath)
    const thumbnailFilename = `thumb_header_${id}.png`
    const thumbnailFullFilename = `thumb_full_${id}.png`
    this.runPuppeteer(url, {
      thumbnailFilename: join(imgPath, thumbnailFilename),
      thumbnailFullFilename: join(imgPath, thumbnailFullFilename)
    })

    const thumbnail = {
      header: host + prefix + thumbnailFilename,
      full: host + prefix + thumbnailFullFilename
    }

    await this.contentRepository.updateOne({ id }, { $set: { thumbnail } })

    return thumbnail
  }

  async runPuppeteer (url, { thumbnailFilename, thumbnailFullFilename }) {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--lang=zh-CN',
        '--font-render-hinting=medium',
        '--font-antialiasing=standard',
        `--font-family="WenQuanYi Zen Hei"`
      ],
      headless: 'new'
    })
    const page = await browser.newPage()

    // 设置打开分辨率
    await page.setViewport({ width: 750, height: 800 })

    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.screenshot({
      path: thumbnailFilename
    })

    await page.screenshot({
      fullPage: true, // 是否截全屏
      path: thumbnailFullFilename
    })
    console.log('缩略图生成完成。。。。')
    await browser.close()
  }
}
