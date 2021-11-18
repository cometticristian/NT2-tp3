new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        listaEventos: [],
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        cura: 10,
        msjVictoria: "Ganaste!, Jugar de nuevo?",
        msjDerrota: "Perdiste!, Jugar de nuevo?"
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        empezarPartida: function () {
            this.saludJugador= 100,
            this.saludMonstruo= 100,
            this.hayUnaPartidaEnJuego = true
        },

        atacar: function () {
            let evento
            let ataque = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= ataque
            evento = {
                esJugador: !this.esJugador,
                text: "Lanzaste ataque por " + ataque + "%",
            }
            this.registrarEvento(evento)
            this.ataqueDelMonstruo()
            this.verificarGanador()
        },

        ataqueEspecial: function () {
            let evento
            let ataque = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= ataque
            evento = {
                esJugador: !this.esJugador,
                text: "Lanzaste ataque especial por " + ataque + "%",
            }
            this.registrarEvento(evento)
            this.ataqueDelMonstruo()
            this.verificarGanador()
        },

        curar: function () {
            let evento
            if(this.saludJugador <= 100) {
                this.saludJugador += this.cura
                if (this.saludJugador > 100) {
                    this.saludJugador = 100
                }
            }
            evento = {
                esJugador: !this.esJugador,
                text: "Te curaste " + this.cura + "%",
            }
            this.registrarEvento(evento)
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego= false  
        },

        ataqueDelMonstruo: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            evento = {
                esJugador: this.esJugador,
                text: "El monstruo golpea por " + ataque + "%",
            }
            this.registrarEvento(evento)
            this.saludJugador -= ataque
        },

        calcularHeridas: function (rango) {
            return (Math.floor(Math.random() * (rango[1] - rango[0] +1)) + rango[0])
        },

        verificarGanador: function () {
            if(this.saludJugador <= 0) {
                window.confirm(this.msjDerrota) ? this.empezarPartida() : ""
            } else if(this.saludMonstruo <= 0) {
                window.confirm(this.msjVictoria) ? this.empezarPartida() : ""
            }
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});