import Api from '@/services/api'

export default {
  fetchArticles () {
    return Api().get('/articles')
  },

  fetchAuthors () {
    return Api().get('/authors')
  },

  postArticle (article) {
    return Api().post('/articles', article,
      { headers: {'Content-type': 'application/json'} })
  },

  postAuthor (author) {
    return Api().post('/authors', author,
      { headers: {'Content-type': 'application/json'} })
  },

  loginAuthor (login) {
    return Api().post('/login', login,
      { headers: {'Content-type': 'application/json'} })
  },

  upRepAuthor (id) {
    return Api().put(`/authors/${id}/upRep`)
  }
}
