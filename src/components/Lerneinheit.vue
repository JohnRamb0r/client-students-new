<template>
  <div class="lerneinheit">

    <div class="columns is-centered">
        <div class="column is-four-fifths">

            <div id="start_element" class="content has-text-centered">

                <div><h1>{{ lerneinheit.titel }} </h1></div>
                <div>{{ lerneinheit.beschreibung }}</div>
                <div><a class="button is-medium" v-on:click="start_lerneinheit">START LERNEINHEIT</a></div>
            </div>

            <div class="content has-text-centered is-hidden unit" v-bind:data-position="a.reihenfolge" v-if="lerneinheit.abschnitte && lerneinheit.abschnitte.length" v-for="a in lerneinheit.abschnitte">

              <div>
                <h1>{{ a.reihenfolge }}. - {{ a.titel }}</h1>
                <p>
                  {{ a.inhalt }}
                </p>


                <div v-if="a.media && a.media.length" v-for="aMedia in a.media">
                  <img v-bind:src="aMedia.datei" v-bind:alt="aMedia.beschreibung" />
                </div>

              </div>



            </div>

            <div class="is-hidden unit" v-if="lerneinheit.multipleChoices && lerneinheit.multipleChoices.length" v-for="m in lerneinheit.multipleChoices"  v-bind:data-position="m.reihenfolge">

              <div class="content has-text-centered">
                <h1>
                  {{ m.aufgabenstellung }}
                </h1>
                <p>
                  {{ m.ergaenzungstext }}
                </p>

              </div>

              <ul class="multipleChoiceAntworten">
                <li v-for="mAntworten in m.antworten">
                  <label  class="checkbox" v-bind:data-isCorrect="mAntworten.istRichtig">
                    <input type="checkbox" /> <b>{{ mAntworten.text }}</b>
                  </label>
                </li>
                <div class="has-text-centered"><a class="button is-medium" v-on:click="checkCorrectAnswers">CHECK</a></div>
              </ul>



            </div>

            <div class="is-hidden unit lueckenTexte-unit" v-if="lerneinheit.lueckenTexte && lerneinheit.lueckenTexte.length" v-for="l in lerneinheit.lueckenTexte"  v-bind:data-position="l.reihenfolge">

              <div class="content has-text-centered">
                <h1>
                  {{ l.aufgabenstellung }}
                </h1>
                <p>
                  {{ l.ergaenzungstext }}
                </p>

                <div class="lueckenText-div">
                  {{ l.text }}


                </div>
                <div class="has-text-centered"><a class="button is-medium" v-on:click="checkCorrectAnswersLueckentext">CHECK</a></div>



              </div>

            </div>
            <div class="is-hidden unit" v-if="lerneinheit.erklaerBilder && lerneinheit.erklaerBilder.length" v-for="e in lerneinheit.erklaerBilder"  v-bind:data-position="e.reihenfolge">
              <div class="content has-text-centered">
                <h1>{{ e.reihenfolge }}. - {{ e.aufgabenstellung }}</h1>
                <p>
                  {{ e.ergaenzungstext }}
                </p>

                <img v-bind:src="e.media.datei" v-bind:alt="e.media.beschreibung" />



              </div>
              <ul class="multipleChoiceAntworten">
                <li v-for="eAntworten in e.antworten">
                  <label  class="checkbox" v-bind:data-isCorrect="eAntworten.istRichtig">
                    <input type="checkbox" /> <b>{{ eAntworten.text }}</b>
                  </label>
                </li>
                <div class="has-text-centered"><a class="button is-medium" v-on:click="checkCorrectAnswers">CHECK</a></div>
              </ul>



            </div>

            <div id="forward_back_buttons" class="is-hidden has-text-centered">
                <span class="is-1"></span>
                <span><a class="button is-medium is-1" v-on:click="back_lerneinheit"><</a></span>
                <span class="is-8"></span>
                <span><a class="button is-medium is-2" v-on:click="forward_lerneinheit">></a></span>
            </div>

        </div>
    </div>
    </div>


</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: 'Lerneinheit',
        data: () => ({

            msg: 'Welcome to Your Vue.js App',
            lerneinheit: [],
            errors: [],
            counter: 1,
            max_units: 0

        }),
        created() {
            axios.get('http://localhost:8080/Lerneinheit/'+ this.$route.params.id)
                .then(response => {
                    this.lerneinheit = response.data;
                    setTimeout(this.generate_lueckenText, 2000);

                })
                .catch(e => {
                    this.errors.push(e)
                })


        },
        methods:{
          // Kontrolliert, ob die richtigen Antworten von Elementen mit dem Attribut "data-iscorrect" ausgewählt wurden.
          // true --> KLasse "is-correct" wird gesetzt
          // false --> Klasse "is-incorrect" wird gesetzt
          checkCorrectAnswers: function(event){
            //console.log($(event.target).parent().siblings());
            $(event.target).parent().siblings().map(function(value, key){
              //console.log($(key).children().attr("data-iscorrect"));
              if($(key).children().attr("data-iscorrect")+"" == "true"){
                console.log($(key));
                $(key).addClass("is-correct");
              }else{
                $(key).addClass("is-incorrect");
              }
            });
          },
          // Kontrolliert, ob die richtige Antwort beim Lüchentext eingegeben wurde.
          // Je nach eingabe, wird die Klasse "is-success" oder "is-danger" gesetzt.
          checkCorrectAnswersLueckentext: function(event){

            $(event.target).parent().siblings(".lueckenText-div").find("input").map(function(value, key){


              if($.trim($(key).val().toLowerCase()) == $(key).attr("data-answer").toLowerCase()){
                $(key).removeClass("input is-success is-danger");
                $(key).addClass("input is-success");

              }else{
                $(key).removeClass("input is-success is-danger");
                $(key).addClass("input is-danger");

                $(key).val("Richtige Antwort: " + $(key).attr("data-answer"));
              }



            });
          },
          // Startet und zeigt die Lerneinheit nach zB einem Buttonclick
          start_lerneinheit: function(event){
            this.max_units = $(".unit").length;

            $('[data-position="'+this.counter+'"]').removeClass("is-hidden");
            $('#forward_back_buttons').removeClass("is-hidden");
            $('#start_element').addClass("is-hidden");
          },
          // Erniedrigt den Seitencounter "counter" um eines.
          // Setzt die aktuelle Page auf "is-hidden" und entfernt die "is-hidden" Klasse von der vorherigen Page, um diese anzuzeigen. Ebenfalls wird davor der counter um 1 erniedrigt
          // counter > 0
         back_lerneinheit: function(event){
            if(this.counter > 1){
              $('[data-position="'+this.counter+'"]').addClass("is-hidden");

              this.counter--;

              $('[data-position="'+this.counter+'"]').removeClass("is-hidden");
            }
          },
          // Erhöht den Seitencounter "counter" um eines.
          // Setzt die aktuelle Page auf "is-hidden" und entfernt die "is-hidden" Klasse von der nächsten Page, um diese anzuzeigen. Ebenfalls wird davor der counter um 1 erhöht
          // counter < Anzahl der Pages.
          forward_lerneinheit: function(event){
            if(this.counter <  this.max_units){
              $('[data-position="'+this.counter+'"]').addClass("is-hidden");

              this.counter++;

              $('[data-position="'+this.counter+'"]').removeClass("is-hidden");


            }
          },
          generate_lueckenText: function(event){
            var $lueckenText = $(".lueckenTexte-unit");

            $lueckenText.children().children().map(function(value, key){

              if(value == 2){
                $(key).html($(key).text());
              }
            });
          }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.columns
    margin-top: 5px
    margin-bottom: 5px
    height: auto

li.is-correct
    background-color: green
    color: white


li.is-incorrect
    background-color: red
    color: white

.button.is-medium
    margin-top: 40px
</style>
