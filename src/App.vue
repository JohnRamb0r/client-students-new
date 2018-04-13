<template>
  <div id="app">
    <section id="header" class="hero is-dark">
        <div class="hero-body">

            <div class="container">
                <div class="level">
                    <div class="level-item"><span class="icon is-large"><i class="fas fa-graduation-cap"></i></span><b>MICROLEARNING FAALRASC</b></div>

                </div>
            </div>
        </div>

    </section>




    <router-view></router-view>
    <footer class="footer isprimary">
        <div class="container">
          <div class="content has-text-centered">
                FAALRASC ist eine Microlearning Plattform für Bildungseinrichtungen. Wissen wird schnell und kompakt vermittelt!
          </div>
        </div>
    </footer>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
@import '/assets/style/style.sass'
@import '../node_modules/bulma/bulma.sass'
#header
  height: 108px
  a:hover
    color: green
  .container
    margin-top: -20px



footer
  background-color: $primary !important
  color: #F1F1F1
  clear: both
  height: 100px
  padding-top: 0
  position: relative
  width: 100%
  // right: 0
  // bottom: 0
  // left: 0
  // position: absolute
  // right: 0
  // bottom: 0
  // left: 0
  // padding: 1rem
  // background-color: #efefef
  // text-align: center
  // background-color: $primary !important
  // color: #F1F1F1
  // position: absolute
  // bottom: 0
  // width: 100%
  // overflow: hidden

//  position: absolute
//  width: 100%
//  bottom: 0
//  overflow:hidden

  .icon
    color: #fff
    margin-left: 20px





</style>
