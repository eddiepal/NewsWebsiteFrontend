<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="authors" :options="options">
        <a slot="upRep" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upRep(props.row._id)"></a>
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
  name: 'Authors',
  data () {
    return {
      messagetitle: ' Authors List ',
      authors: [],
      errors: [],
      props: ['_id'],
      sortable: ['upReps'],
      columns: ['_id', 'name', 'email', 'talent', 'articleImage', 'upReps', 'upRep'],
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
  // Fetches Authors when the component is created.
  created () {
    this.loadAuthors()
  },
  methods: {
    loadAuthors: function () {
      ArticleService.fetchAuthors()
        .then(response => {
          // JSON responses are automatically parsed.
          this.authors = response.data
          console.log(this.authors)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },

    // Fetches Donations when the component is created.
    upRep: function (id) {
      ArticleService.upRepAuthor(id)
        .then(response => {
          console.log(response)
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
  .VueTables__sortable {
    cursor: pointer;
  }
</style>
