<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-right" v-show="sideToggle" id="sidebar-wrapper">
      <div class="sidebar-heading">Start Bootstrap</div>
      <div class="list-group list-group-flush">
        <router-link class="list-group-item list-group-item-action bg-light text-center" tag="a" to="/userarea">
          userarea
        </router-link>
        <router-link v-show="isAdminMenu" class="list-group-item list-group-item-action bg-light text-center" tag="a"
                     to="/employeeprocess">
          create employeer id
        </router-link>
        <router-link class="list-group-item list-group-item-action bg-light text-center" tag="a" to="/appointments">
          appointments
        </router-link>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->

    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn btn-primary" v-show="isLogin() === '/logout'" id="menu-toggle" @click="toggleSide">Toggle
          Menu
        </button>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <!--            <li class="nav-item active">
                          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>-->
            <router-link class="nav-item" tag="li" :to="isLogin()">
              <a class="nav-link" @click="authprocess">{{ isLogin() === '/auth' ? 'login' : 'logout' }}</a>
            </router-link>
            <!-- <li class="nav-item dropdown">
               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                 Dropdown
               </a>
               <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                 <a class="dropdown-item" href="#">Action</a>
                 <a class="dropdown-item" href="#">Another action</a>
                 <div class="dropdown-divider"></div>
                 <a class="dropdown-item" href="#">Something else here</a>
               </div>
             </li>-->
          </ul>
        </div>
      </nav>

      <main role="main" class="container">
        <div class="container">
          <div class="row">
            <router-view @permissionForMenu="authorizationForMenu($event)"/>
          </div>
        </div>
      </main>
    </div>

    <!-- /#page-content-wrapper -->

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      sideToggle: false,
      isLogin: () => {
        return this.$store.getters.isAuthenticated ? '/logout' : '/auth'
      },
      isAdminMenu: false
    }
  },
  watch: {
    $route: function (val) {
      // if user logout and close side menu everytime !
      if (val.path === '/auth' || val.path === '/checkemployee') {
        this.sideToggle = false
      }
    }
  },
  methods: {
    authorizationForMenu(e) {
      if (e === true) {
        this.isAdminMenu = true
      }
    },
    toggleSide() {
      if (this.$router.currentRoute.path === '/auth' || this.$router.currentRoute.path === '/checkemployee') {
        return this.sideToggle = false
      } else {
        return this.sideToggle = !this.sideToggle
      }
    },
    authprocess() {
      if (this.isLogin() == '/auth') {
        return false
      } else {
        this.$store.dispatch('logout')
        this.$router.push('/auth')
        this.sideToggle = false
      }
    }
  },
  created() {
    if (this.$route.name !== 'checkemployee') {
      let isAuth = this.$store.dispatch('initAuth')
      isAuth.then(e => {
        if (e === false) {
          if (this.$router.currentRoute.path !== '/auth') {
            this.$router.push('/auth')
          }
        } else {
          this.$router.push('/userarea')
        }
      })
    } else {
      let checkedId = this.$store.dispatch('checkemployee', {employeeId: this.$route.params.id})
      checkedId.then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

/*!
 * Start Bootstrap - Simple Sidebar (https://startbootstrap.com/templates/simple-sidebar)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */

#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 300px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
