<template>
  <div class="lerneinheit">
   
    <div class="columns is-centered">
        <div class="column">       
            
            <div class="content has-text-centered">             
                <div><h1>{{ lerneinheit.titel }} </h1></div>
                <div>{{ lerneinheit.beschreibung }}</div>
                <div><a class="button is-medium">START LERNEINHEIT</a></div>
            </div>
            
            <section class="section" v-bind:data-position="a.reihenfolge" v-if="lerneinheit.abschnitte && lerneinheit.abschnitte.length" v-for="a of lerneinheit.abschnitte">
                <div class="container">
                    
                          
                    <div class="has-text-centered">   
                        {{ a.titel }}
                      
                        
                        {{ a.inhalt }}
                        <div>
                            <span><a class="button is-medium"><</a></span>
                            <span><a class="button is-medium">></a></span>
                        </div>
                     </div>   
                   
                   
                </div> 
                
            </section>
                
            <div class="columns" v-if="lerneinheit.multipleChoices && lerneinheit.multipleChoices.length" v-for="m of lerneinheit.multipleChoices"  v-bind:data-position="m.reihenfolge">
                   <div class="column is-1"></div>
                    <div class="column is-1"><a class="button is-medium"><</a></div>
                          
                    <div class="column is-8 has-text-centered">   
                        {{ m.aufgabenstellung }}
                      
                        
                        {{ m.ergaenzungstext }}
                     </div>   
                      
                    <div class=" column is-2"><a class="button is-medium">></a></div>
                  
                
            </div>
                
            <div class="columns" v-if="lerneinheit.lueckenTexte && lerneinheit.lueckenTexte.length" v-for="l of lerneinheit.multipleChoices"  v-bind:data-position="l.reihenfolge">
                   <div class="column is-1"></div>
                    <div class="column is-1"><a class="button is-medium"><</a></div>
                          
                    <div class="column is-8 has-text-centered">   
                        {{ l.aufgabenstellung }}
                      
                        
                        {{ l.ergaenzungstext }}
                     </div>   
                      
                    <div class=" column is-2"><a class="button is-medium">></a></div>
                  
                
            </div>
            <div class="columns" v-if="lerneinheit.erklaerBilder && lerneinheit.erklaerBilder.length" v-for="e of lerneinheit.erklaerBilder"  v-bind:data-position="e.reihenfolge">
                   <div class="column is-1"></div>
                    <div class="column is-1"><a class="button is-medium"><</a></div>
                          
                    <div class="column is-8 has-text-centered">   
                        {{ e.aufgabenstellung }}
                      
                        
                        {{ e.ergaenzungstext }}
                     </div>   
                      
                    <div class=" column is-2"><a class="button is-medium">></a></div>
                  
                
            </div>
            
        </div>
    </div>
    </div>

      
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Lerneinheit',
        data: () => ({

            msg: 'Welcome to Your Vue.js App',
            lerneinheit: [],
            errors: [],
            counter: 1

        }),
        created() {
            axios.get('http://localhost:8080/Lerneinheit/1')
                .then(response => {
                    this.lerneinheit = response.data;
                })
                .catch(e => {
                    this.erros.push(e)
                })
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.columns
    margin-top: 5px
    margin-bottom: 5px;
    height: auto

</style>
