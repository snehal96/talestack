import HttpService from './HttpService'
import apiRoutes from './apiRoutes'

export class TaleService {
  async fetchUserTales(userId: string, page: Number): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.tale.taleUser}/${userId}`, { page: page })
    return data
  }

  async fetchCategoryTales(categoryId: string, page: Number): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.tale.taleCategory}/${categoryId}`, {
      page: page
    })
    return data
  }

  async fetchTaleById(taleId: string): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.tale.tale}/${taleId}`)
    return data
  }

  async addTale(body: any): Promise<any> {
    const data = await HttpService.post(`${apiRoutes.tale.tale}`, body)
    return data
  }

  async updateTale(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.tale.tale}`, body)
    return data
  }

  async fetchTaleActiveStories(taleId: String): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.story.activeTale}/${taleId}`)
    return data
  }

  async fetchActiveStory(storyId: String): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.story.active}/${storyId}`)
    return data
  }

  async addActiveStory(body: any): Promise<any> {
    const data = await HttpService.post(`${apiRoutes.story.active}`, body)
    return data
  }

  async updateActiveStory(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.story.active}`, body)
    return data
  }

  async fetchTaleDraftStories(taleId: String): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.story.draftTale}/${taleId}`)
    return data
  }

  async fetchDraftStory(storyId: String): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.story.draft}/${storyId}`)
    return data
  }

  async addDraftStory(body: any): Promise<any> {
    const data = await HttpService.post(`${apiRoutes.story.draft}`, body)
    return data
  }

  async updateDraftStory(body: any): Promise<any> {
    const data = await HttpService.put(`${apiRoutes.story.draft}`, body)
    return data
  }

  async fetchStoryById(id: String): Promise<any> {
    const data = await HttpService.get(`${apiRoutes.story.active}/${id}`)
    return data
  }

  async searchTale(term: string, page: number = 0): Promise<any[]> {
    const data = await HttpService.get(`${apiRoutes.tale.search}`, { term: term })
    return data
  }
}
