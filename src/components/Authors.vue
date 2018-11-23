<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="authors" :options="options">
        <a slot="upRep" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upRep(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteAuthor(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editAuthor(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import ArticleService from '@/services/articleservice'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
Vue.use(VueSweetalert2)
export default {
  name: 'Authors',
  data () {
    return {
      messagetitle: ' Authors List ',
      authors: [],
      errors: [],
      props: ['_id'],
      sortable: ['upReps'],
      columns: ['_id', 'email', 'name', 'talent', 'articleImage', 'upReps', 'upRep', 'remove', 'edit'],
      options: {
        perPage: 10,
        filterable: ['_id', 'name', 'email'],
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
    },
    editAuthor: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },

    deleteAuthor: function (id) {
      this.$swal({
        title: 'Are you sure you want to delete this article?',
        text: 'You cannot Undo this action!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete article',
        confirmButtonColor: 'red',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          ArticleService.deleteAuthor(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadAuthors()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this Article ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your Article is still here!', 'info')
        }
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
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
</style>
