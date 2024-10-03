// import { PREVIEW } from '$env/static/private'
import { createClient } from 'contentful'

const preview = false
export const content = createClient({
  space: '9d2oeyoein1b',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'fEFxwiIT7AZI78MPL5Rsj7N99NDRVbPuLFG9gQ88-BM' : 'p9EswN7-ExmeVr1lzMuJ5uuAY-UzfqmgjXjeE1YqVio',
}).withoutUnresolvableLinks