<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <signUp-form :author="author" authorBtnTitle="Make Author" @author-is-created-updated="submitAuthor"></signUp-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ArticleService from '@/services/articleservice'
import SignUpForm from '@/components/SignUpForm'

export default {
  data () {
    return {
      author: {authorName: '', email: '', password: ''},
      messagetitle: ' Create Account '
    }
  },
  components: {
    'signUp-form': SignUpForm
  },
  methods: {
    submitAuthor: function (author) {
      ArticleService.postAuthor(author)
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
