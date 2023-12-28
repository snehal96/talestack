import HttpService from './HttpService'
import apiRoutes from './apiRoutes'

export class UserService {
  async updateUserInteraction(body: any): Promise<any[]> {
    const data = await HttpService.post(`${apiRoutes.interaction.interaction}`, body)
    return data
  }

  async fetchUserSavedTales(): Promise<any[]> {
    const data = HttpService.get(`${apiRoutes.interaction.savedTale}`)
    return data
  }

  async fetchUserInfo(userId: String): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.user.user}/${userId}`)
    return data
  }

  async fetchUserCurrentRead(): Promise<any[]> {
    const data = HttpService.get(`${apiRoutes.user.currentRead}`)
    return data
  }

  async fetchTrendingUser(): Promise<any[]> {
    const data = HttpService.get(`${apiRoutes.user.trendingUser}`)
    return data
  }

  async addUserInfo(body: any): Promise<any> {
    const data = await HttpService.post(`${apiRoutes.user.user}`, body)
    return data
  }

  async addUserCurrentRead(body: any): Promise<any> {
    const data = await HttpService.post(`${apiRoutes.user.currentRead}`, body)
    return data
  }

  async updateUser(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.user.user}`, body)
    return data
  }

  async updateTrendingTale(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.user.trendingTale}`, body)
    return data
  }

  async updateTrendingUser(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.user.trendingUser}`, body)
    return data
  }

  async deleteUserCurrentRead(body: any): Promise<any> {
    const data = await HttpService.delete(`${apiRoutes.user.currentRead}`, body)
    return data
  }
}
