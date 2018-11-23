<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <form @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" v-model.trim="$v.email.$model"/>
      </div>
      <div class="error" v-if="!$v.email.required">Email is Required</div>
      <div class="error" v-if="!$v.email.minLength">Message must have at least {{$v.email.$params.minLength.min}} letters.</div>

      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label class="form__label">Password</label>
        <input class="form__input" input type="password" v-model.trim="$v.password.$model"/>
      </div>
      <div class="error" v-if="!$v.password.required">Password is Required</div>
      <div class="error" v-if="!$v.password.minLength">Message must have at least {{$v.password.$params.minLength.min}} letters.</div>

      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Login Successful!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Details entered are incorrect</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Logging in...</p>
    </form>
  </div>
</template>

<script>
import VueForm from 'vueform'
import VueSweetalert from 'vue-sweetalert'
import Vuelidate from 'vuelidate'
import AuthorService from '@/services/articleservice'
import { required, minLength } from 'vuelidate/lib/validators'
import Vue from 'vue'
// import VueJWT from 'vuejs-jwt'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)
// Vue.use(VueJWT, options)

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },

  methods: {
    submitAuthor: function (author) {
      AuthorService.loginAuthor(author)
        .then(response => {
          this.message = response.data

          // JSON responses are automatically parsed.
          console.log(response)
          console.log('Login complete.', 'Login is successful! ' + JSON.stringify(response.data, null, 5), 'success')
          if (response.status === 401) {
            console.log('ERROR', 'Problem logging in: ' + JSON.stringify(response.data, null, 5))
          }
        })
        .catch(error => {
          this.message = error.data

          console.log(error.status)

          // JSON responses are automatically parsed.
          console.log(error)

          /*          this.errors.push(response)
          console.log(response) */
        })
    },

    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var author = {
            email: this.email,
            password: this.password
          }
          this.author = author
          this.submitAuthor(this.author)
        }, 500)
      }
    }
  },

  validations: {
    email: {
      required,
      minLength: minLength(0)
    },
    password: {
      required,
      minLength: minLength(0)
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
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .createauthor-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
