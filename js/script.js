



var app = new Vue({
        el: "#root",

        data:{
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },     
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }  
                    ],
                },
                
                
            ],
            
            // contatto corrente 
            contattoCorrente : 0,

            // variabile usata nel campo input per inviare messaggi
            inputMessaggio:"",

            // variabile usata nel campo input per filtrare i contatti
            filtro : "",

            // toggle attiva, disattiva notifiche
            notificheAttive: false,

            // toggle emote per aprire il pannello con le emote
            emoteToggle : false,

            // array con tutte le emote
            listaEmote : [
                '😅','😁','😂','😒','😏','😀','😃','😄','😁','😆','😅','😂','😉','🙂','😊','🤣','😌','😗','😁','😆','😅','😂','😉','😉'
            ],

            // toggle temi
            tema : false,

            microfono : false,
            
        },
        methods:{
            // assegna immagine
            immagineAvatar : function(contatoreImmagine){
                return "img/" + "avatar" + this.contacts[contatoreImmagine].avatar + ".jpg";
                
           },
            // toggle notifiche
            notifiche : function (){
                this.notificheAttive = !this.notificheAttive;
            },

            // ritorna ultimo messaggio per poter calcolare l'ultimo accesso    
            controllaUltimoAccesso :function (index){
                var ultimoMessaggio;
                this.contacts[index].messages.forEach(element => {
                   
                    ultimoMessaggio = element.date;
                    
                })
                return ultimoMessaggio;
            },

            // scrive il messaggio e genera una risposta per entrambi i temi
            scriviMessaggio :function (index){
                if(this.tema == false && this.inputMessaggio.trim().length  > 0 ){
                    this.contacts[index].messages.push({date: dayjs().format('DD/MM/YYYY HH:mm:ss') , text:this.inputMessaggio, status:'sent'});
                    var x = this;

                    setTimeout(function(){ 
                        x.contacts[index].messages.push({date: dayjs().format('DD/MM/YYYY HH:mm:ss') , text:'Ok', status:'received'}); 
                        console.log(x.contacts[index]);
                    }, 2000);
                    this.inputMessaggio = "";
                } else if(this.tema == true && this.inputMessaggio.trim().length  > 0) {
                    this.contacts[index].messages.push({date: dayjs().format('DD/MM/YYYY HH:mm:ss') , text:this.inputMessaggio, status:'sent-2'});
                    var x = this;

                    setTimeout(function(){ 
                        x.contacts[index].messages.push({date: dayjs().format('DD/MM/YYYY HH:mm:ss') , text:'Ok', status:'received-2'}); 
                        console.log(x.contacts[index]);
                    }, 2000);
                    this.inputMessaggio = "";
                }
                
                
            } ,
            // toggle emote
            emote : function (){
                this.emoteToggle = !this.emoteToggle;
            },
            
            scriviEmote : function(contatoreElemento) {
                this.inputMessaggio += this.listaEmote[contatoreElemento];
               
            },
            // quando si clicca sull'input per scrivere il messaggio il pannello emote si chiude
            togliEmote : function(){
                this.emoteToggle = false;
            },
            // permette di ricercare un contatto che inizia con una determinata lettera
            filtraContatti : function(){
                this.contacts.forEach(element => {
                element.visible = false;
                if(element.name.startsWith(this.filtro.toUpperCase())){
                    element.visible = true;
                    
                }
                
                });
            } ,
            // toggle tema
            cambioTema : function (){
                this.tema = !this.tema;
                return this.tema;
            },

            // cambia lo status dei messaggi in base al tema
            cambioTemaMessaggi : function (){
                this.contacts.forEach(element => {
                    var messaggi = element.messages;
                    if(this.tema == true){
                        for (let index = 0; index < messaggi.length; index++) {
                            if(messaggi[index].status == 'sent'){
                                messaggi[index].status = 'sent-2';
                            } else {
                                messaggi[index].status = 'received-2'; 
                            }
                            
                        }  
                        console.log(element); 
                    }
                     
                    if(this.tema == false){
                        for (let index = 0; index < messaggi.length; index++) {
                            if(messaggi[index].status == 'sent-2'){
                                messaggi[index].status = 'sent';
                            } else {
                                messaggi[index].status = 'received'; 
                            }
                           
                        }   
                        console.log(element);  
                    } 
                });
            },
            // metodo per la classe attivo per il tema 2
            contattoAttivoTemaAlternativo : function (index){
                if(this.contattoCorrente == (index) && this.tema == true){
                    return true;
                }
            },

            // metodo per cancellare i messaggi
            rimuoviMessaggio:function(index){
                this.contacts[this.contattoCorrente].messages.splice( index , 1 );
              
            },
            
            toggleMicrofono : function (){
               this.microfono = !this.microfono; 
            }   
        }
});

