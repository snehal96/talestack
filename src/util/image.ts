import config from '@/api/apiRoutes'

export const getImageUrl = (url:string) => `${config.baseUrl}${url}`

