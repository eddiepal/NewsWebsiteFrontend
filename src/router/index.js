import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Articles from '@/components/Articles'
import CreateArticle from '@/components/CreateArticle'
import About from '@/components/About'
import Contact from '@/components/Contact'
import SignUp from '@/components/SignUp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },

    {
      path: '/createarticle',
      name: 'CreateArticle',
      component: CreateArticle
    },

    {
      path: '/about',
      name: 'About',
      component: About
    },

    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
