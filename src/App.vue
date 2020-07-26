<template>
  <div id="app">
        <div>
            <b-navbar
                toggleable="lg"
                type="dark"
                variant="info"
                sticky>
                <b-navbar-brand href="#">Stechs</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"/>

                <b-collapse
                    id="nav-collapse"
                    is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Modems</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                </b-collapse>
            </b-navbar>
        </div>
        <b-container class="bv-example-row">
            <b-col sm="12">
                <vendor/>
            </b-col>
        </b-container>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vendor from './components/vendors/vendor.vue'

export default {
  name: 'App',
  components: {
    vendor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
