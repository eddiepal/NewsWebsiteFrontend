<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="articles" :options="options">
      </v-client-table>
    </div>
  </div>
</template>

<script>
import ArticleService from '@/services/articleservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
export default {
  name: 'Articles',
  data () {
    return {
      messagetitle: ' Articles List ',
      articles: [],
      errors: [],
      columns: ['_id', 'title', 'topic', 'author', 'articleImage'],
      options: {
        headings: {
          _id: 'ID',
          title: 'Article Title',
          topic: 'Topic',
          author: 'Author',
          articleImage: 'Article Image'

        }
      }
    }
  },
  // Fetches Articles when the component is created.
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles: function () {
      ArticleService.fetchArticles()
        .then(response => {
          // JSON responses are automatically parsed.
          this.articles = response.data
          console.log(this.articles)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
