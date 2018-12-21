<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <signUp-form :author="author" authorBtnTitle="Update Author"
                           @author-is-created-updated="updateAuthor"></signUp-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService'
import SignUpForm from '@/components/SignUpForm'

export default {
  data () {
    return {
      author: {},
      childDataLoaded: true,
      temp: {},
      messagetitle: ' Update Author '
    }
  },
  components: {
    'signUp-form': SignUpForm
  },
  created () {
    this.getAuthor()
  },
  methods: {
    getAuthor: function () {
      ArticleService.fetchAuthor(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.author = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Author in Edit: ' + JSON.stringify(this.author, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateAuthor: function (author) {
      console.log('Before PUT ' + JSON.stringify(author, null, 5))
      ArticleService.putAuthor(this.$router.params, author)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(author, null, 5))
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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
