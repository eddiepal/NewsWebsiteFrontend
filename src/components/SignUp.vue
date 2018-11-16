<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label class="form-label">Select Payment Type</label>
        <select id="topic" name="topic" class="form-control" type="text" v-model="topic">
          <option value="null" selected disabled hidden>Choose Payment Type</option>
          <option value="Direct">Direct</option>
          <option value="PayPal">PayPal</option>
          <option value="Visa">Visa</option>
        </select>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.amount.$error }">
        <label class="form-control-label" name="amount">Amount (Enter a number between 1 and 1000)</label>
        <input class="form__input" type="number" v-model.trim="amount"/>
      </div>
      <div class="error" v-if="!$v.amount.between">Amount must be between 1 and 1000</div>


      <div class="form-group" :class="{ 'form-group--error': $v.authorName.$error }">
        <label class="form__label">Personal Message</label>
        <input class="form__input" v-model.trim="$v.authorName.$model"/>
      </div>
      <div class="error" v-if="!$v.authorName.required">Message is Required</div>
      <div class="error" v-if="!$v.authorName.minLength">Message must have at least {{$v.authorName.$params.minLength.min}} letters.</div>


      <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" v-model.trim="$v.email.$model"/>
      </div>
      <div class="error" v-if="!$v.email.required">Email is Required</div>
      <div class="error" v-if="!$v.email.minLength">Message must have at least {{$v.authorName.$params.minLength.min}} letters.</div>


      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label class="form__label">Password</label>
        <input class="form__input" input type="password" v-model.trim="$v.password.$model"/>
      </div>
      <div class="error" v-if="!$v.password.required">Password is Required</div>
      <div class="error" v-if="!$v.password.minLength">Message must have at least {{$v.authorName.$params.minLength.min}} letters.</div>




      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Create Author</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Account created!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Creating author...</p>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueForm from 'vueform'
  import VueSweetalert from 'vue-sweetalert'
  import Vuelidate from 'vuelidate'
  import AuthorService from '@/services/articleservice'
  import { required, minLength, between } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)
  Vue.use(VueSweetalert)
  export default {
    name: 'CreateAuthor',
    data () {
      return {
        messagetitle: ' New Author ',
        authorName: '',
        topic: 'Direct',
        amount: 0,
        upvotes: 0,
        author: {},
        email: '',
        password: '',
        submitStatus: null
      }
    },

    methods: {
      submitAuthor: function (author) {
        AuthorService.postAuthor(author)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
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
              authorName: this.authorName,
              topic: this.topic,
              amount: this.amount,
              upvotes: this.upvotes,
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
      authorName: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        minLength: minLength(5)
      },
      password: {
        required,
        minLength: minLength(5)
      },
      amount: {
        required,
        between: between(1, 1000)
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
