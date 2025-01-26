import * as arxiv from './arxiv'
import * as reader from './reader'
import * as unsplash from './unsplash'
import * as time from './time'
import * as weather from './weather'
import * as search from './search'

export const officialPlugins: Record<string, OpenAPIDocument> = {
  OfficialReader: reader.openapi,
  OfficialArxiv: arxiv.openapi,
  OfficialUnsplash: unsplash.openapi,
  OfficialTime: time.openapi,
  OfficialWeather: weather.openapi,
  OfficialSearch: search.openapi,
}

export const OFFICAL_PLUGINS = {
  SEARCH: 'OfficialSearch',
  READER: 'OfficialReader',
  WEATHER: 'OfficialWeather',
  TIME: 'OfficialTime',
  UNSPLASH: 'OfficialUnsplash',
  ARXIV: 'OfficialArxiv',
}

export function pluginHandle(name: string, options: any) {
  switch (name) {
    case 'OfficialArxiv':
      return arxiv.handle(options.query)
    case 'OfficialReader':
      return reader.handle(options.query)
    case 'OfficialUnsplash':
      return unsplash.handle(options.query)
    case 'OfficialTime':
      return time.handle(options.query)
    case 'OfficialWeather':
      return weather.handle(options.query)
    case 'OfficialSearch':
      return search.handle(options.query)
    default:
      throw new Error('Unable to find plugin')
  }
}
