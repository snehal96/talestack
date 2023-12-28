import apiRoutes from './apiRoutes'
import httpService from './HttpService'

export class HomeService {
  async fetchFollowedTales(page: Number): Promise<any[]> {
    const data = await httpService.get(apiRoutes.home.followedTales, { page: page })
    return data
  }

  async fetchTrendingUser(page: Number): Promise<any[]> {
    const data = await httpService.get(apiRoutes.home.trendingUser, { page: page })
    return data
  }

  async fetchTrendingTales(page: Number): Promise<any[]> {
    const data = await httpService.get(apiRoutes.home.trendingTale, { page: page })
    return data
  }

  async fetchUserCurrentRead(): Promise<any[]> {
    const data = await httpService.get(apiRoutes.home.currentRead)
    return data
  }

  async fetchCategories(): Promise<any[]> {
    const data = await httpService.get(apiRoutes.category)
    return data
  }
}
