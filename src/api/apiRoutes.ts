export default {
  baseUrl: 'http://localhost:4000/api/v1',
  category: 'category',
  home: {
    followedTales: 'home/followedtales',
    trendingUser: 'home/trendinguser',
    trendingTale: 'home/trendingtale',
    currentRead: 'home/currentread'
  },
  interaction: {
    interaction: 'interaction',
    savedTale: 'interaction/tale/saved'
  },
  story: {
    active: 'story/active',
    activeTale: 'story/active/tale',
    draft: 'story/draft',
    draftTale: 'story/draft/tale',
    draftUser: 'story/draft/user',
    upload: 'story/upload/image'
  },
  tale: {
    tale: 'tale',
    taleUser: 'tale/user',
    taleCategory: 'tale/category',
    search: 'search'
  },
  user: {
    user: 'user',
    trendingTale: 'user/trending/tale',
    trendingUser: 'user/trending/user',
    currentRead: 'user/current/read'
  }
}
