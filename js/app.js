const app = Vue.createApp({
    data() {
            return {
            titulo: 'BestoResto, tus pedidos al instante.',
            carta:false,
            menu : [
                {
                    plato:'Minutas',
                    img:'img/minutas.jpg',
                    opciones: [
                        {
                            nombre:'Milanesa de pollo',
                            descripcion:'Milanesa de pollo con guarnición',
                            precio: 3500
                        },
                        {
                            nombre:'Milanesa suiza',
                            descripcion:'Milanesa de suiza con papas noisette',
                            precio: 4200
                        },
                        {
                            nombre:'Milanesa de ternera',
                            descripcion:'Milanesa de carne con guarnición',
                            precio: 4500
                        },
                        {
                            nombre:'Milanesa a caballo',
                            descripcion:'Milanesa con huevo frito y guarnición',
                            precio: 6500
                        },
                        {
                            nombre:'Milanesa napolitana',
                            descripcion:'Milanesa con jamón y queso mas guarnición',
                            precio: 7000
                        }
                    ]
                },
                {
                    plato:'hamburguesas',
                    img:'img/hamburguesas.jpg',
                    opciones: [
                        {
                            nombre:'hamburguesa simple',
                            descripcion:'Hamburguesa simple con papas fritas',
                            precio: 5500
                        },
                        {
                            nombre:'hamburguesa monster',
                            descripcion:'Hamburguesa con queso cheddar panceta huevo morron y salsa especial, con papas fritas',
                            precio: 10500
                        },
                        {
                            nombre:'hamburguesa vegana',
                            descripcion:'Hamburguesa notco con papas fritas',
                            precio: 4500
                        },
                    ]
                },
                {
                    plato:'pastas',
                    img:'img/pastas.jpg',
                    opciones: [
                        {
                            nombre:'fetucini',
                            descripcion:'Fetucini con salsa a elección',
                            precio: 3500
                        },
                        {
                            nombre:'agnolotti',
                            descripcion:'Agnolotti con salsa a elección',
                            precio: 4500
                        },
                        {
                            nombre:'canelones',
                            descripcion:'canelones de verdura con salsa a elección',
                            precio: 6500
                        },
                    ]
                },
                {
                    plato:'Pizzas',
                    img:'img/pizzas.jpg',
                    opciones : [
                        {
                            nombre:'pizza muzzarella',
                            descripcion:'Pizza muzzarella con morrones y aceitunas',
                            precio: 3500
                        },
                        {
                            nombre:'pizza napolitana',
                            descripcion:'Pizza napolitana con jamón y morrones',
                            precio: 4500
                        },
                        {
                            nombre:'pizza fugazzeta',
                            descripcion:'Pizza fugazzeta con cebolla y morrones',
                            precio: 6500
                        },
                    ]
                },
                {
                    plato:'Postres',
                    img:'img/postres.jpg',
                    opciones: [
                        {
                            nombre:'flan con dulce de leche',
                            descripcion:'Flan casero con dulce de leche y crema',
                            precio: 1500
                        },
                        {
                            nombre:'helado de crema americana',
                            descripcion:'Helado de crema americana con chocolate y nueces',
                            precio: 2500
                        },
                        {
                            nombre:'torta de chocolate',
                            descripcion:'Torta de chocolate con helado de crema americana',
                            precio: 3500
                        },
                    ]
                }
            ]         
        }
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
            <div v-for="x in menu">
                <h3>{{ x.plato }}</h3>
                <img :src="x.img" :alt="x.nombre">
                <ul>
                    <li v-for="opcion in x.opciones">
                        <h4>{{ opcion.nombre }}</h4>
                        <p>{{ opcion.descripcion }} .......<span>Precio:$ {{ opcion.precio }}</span></p>
                        
                    </li>
            </div>
        </div>
    `
});
app.component('comando-ordenes', {
    props: ['menu'],
    data() {
        return {
            nombre: '',
            telefono: '',
            direccion: '',
            principal: '',
            opcion: '',
            cantidad: 1,
            observaciones: '',
            nuevaOrden: false
        };
    },
    methods: {
        generarOrden()
            {
                this.nuevaOrden = true;
            }
    },
    template: `
        <div>
        <button @click="generarOrden" v-if="nuevaOrden == false">Generar nueva orden</button>
        </div>
        <div v-if="nuevaOrden">
            <h2>Generar Orden</h2>
            <p>Por favor complete el siguiente formulario:</p>
            <form>
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="nombre" required>
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" v-model="telefono" required>
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" v-model="direccion" required>
                </div>
                <div>
                    <div>
                        <select id="principal" v-model="principal" required>
                            <option value="" disabled selected>Seleccione un plato</option>
                            <option v-for="x in menu" :value="x.plato">{{ x.plato }}</option>
                        </select>
                    </div>
    
                    <div v-if="principal != ''">
                        <select id="opcion" v-model="opcion" required>
                            <option value="" disabled selected>Seleccione una opción</option>
                            <template v-for="x in menu">
                                <template v-if="x.plato == principal">
                                <option v-for="o in x.opciones" :value="o.nombre">{{ o.nombre }}</option>
                                </template>
                            </template>
                        </select>
    
                    </div>
                    <div v-if="opcion != ''">
    
                        <label for="cantidad">Cantidad:</label>
                        <input type="number" id="cantidad" v-model="cantidad" min="1" required>
                    </div>
    
                    <div v-if="opcion != ''">
                        <label for="observaciones">Observaciones:</label>
                        <textarea id="observaciones" v-model="observaciones" placeholder="Escriba sus observaciones aquí..."></textarea>
                    </div>
                </div>
            </form>
        </div>
    `
});


app.mount('#app');