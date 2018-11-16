import Api from '@/services/api'

export default {
  fetchArticles () {
    return Api().get('/articles')
  },

  postArticle (article) {
    return Api().post('/articles', article,
      { headers: {'Content-type': 'application/json'} })
  },

  postAuthor (author) {
    return Api().post('/authors', author,
      { headers: {'Content-type': 'application/json'} })
  }
}
