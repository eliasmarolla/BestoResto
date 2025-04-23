const app = Vue.createApp({
    data() {
        return {
            titulo: 'BestoResto, tus pedidos al instante.',
            carta:false,
            menu : [
                {
                    id: 1,
                    nombre: 'Hamburguesa',
                    precio: 12000,
                    img: 'img/hamburguesa.jpg',
                    descripcion: 'Deliciosa hamburguesa con queso y tocino.'
                },
                {
                    id: 2,
                    nombre: 'Pizza',
                    precio: 14500,
                    img: 'img/pizza.jpg',
                    descripcion: 'Pizza de pepperoni con extra de queso.'
                },
                {
                    id: 3,
                    nombre: 'Ensalada',
                    precio: 6800,
                    img: 'img/ensalada.jpg',
                    descripcion: 'Ensalada fresca con aderezo de mostaza y miel.'
                }
            ]
        };
    },
    methods: {
        mostrarmenu(){
            this.carta = true;
        }
    },
});
app.component('mi-carta', {
    props: ['menu'],
    template: `
        <div class="carta">
            <h2>Menú</h2>
            <div v-for="plato in menu" :key="plato.id">
                <img :src="plato.img" :alt="plato.nombre">
                <h3>{{ plato.nombre }}</h3>
                <p>{{ plato.descripcion }}</p>
                <p>Precio:$ {{ plato.precio }}</p>
            </div>
        </div>
    `
});
app.mount('#app');