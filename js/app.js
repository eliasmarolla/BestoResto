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
        mostrarMenu(){
            this.carta = true;
        },
        ocultarMenu(){
            this.carta = false;
        },
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
                </ul>
            </div>
        </div>
    `
});



app.component('comando-ordenes', {
    props: ['menu'],
    data() {
        return {
            principal: '',
            opcion: '',
            cantidad: 1,
            observaciones: '',
            total: 0,
            orden:{
                nombre: '',
                telefono: '',
                direccion: '',
                pedido: [],   
            },
            nuevaOrden: false,
            ordenes:[],
            mostrarOrdenes: false,
            alerta:""
     };
    },
    methods: {
        generarOrden()
            {
                this.nuevaOrden = true;
            },
        enviarOrden(orden){
            var localData = localStorage.getItem('ordenes');            
            this.ordenes = localData ? JSON.parse(localData) : [];
            this.ordenes.push({
                nombre: orden.nombre,
                telefono: orden.telefono,
                direccion: orden.direccion,
                pedido: orden.pedido
            });
            localStorage.setItem('ordenes', JSON.stringify(this.ordenes));
            this.orden = {
                nombre : '',
                telefono : '',
                direccion : '',
                pedido : []
                };
            },
        agregarAlPedido(){
            if(this.nombre == ""){
                this.alerta = "Debe ingresar un nombre";
            }else{
                if(this.telefono == ""){
                    this.alerta= "Debe ingresar un numero de telofono";
                }else{
                    if(this.direccion == ""){
                        this.alerta = "Debe ingresar una direccion";
                    }else {
                        if(this.alerta == ""){

                            
                            
                            
                            
                            this.total = this.menu.find(x => x.plato == this.principal).opciones.find(o => o.nombre == this.opcion).precio;
                            this.orden.pedido.push({
                                opcion: this.opcion,
                                cantidad: this.cantidad,
                                observaciones: this.observaciones,
                                valor: this.total
                            });
                            this.principal = '';
                            this.opcion = '';
                            this.cantidad = 1;
                            this.observaciones = '';
                            this.total = 0;
                        }
                }
            
            
            }}},
        cancelarOrden(){
            this.nuevaOrden = false;
            this.orden.nombre = '';
            this.orden.telefono = '';
            this.orden.direccion = '';
            this.orden.pedido = [];
            this.principal = '';
            this.opcion = '';
            this.cantidad = 1;
            this.observaciones = '';
        },
        mostrarOrdenesGuardadas(){
            this.mostrarOrdenes = true;
        },
        ocultarOrdenesGuardadas(){
            this.mostrarOrdenes = false;
        },
    },
    template: `
        <div>
            <button @click="generarOrden" v-if="nuevaOrden == false">Generar nueva orden</button>
        </div>
        <div v-if="nuevaOrden">
            <h2>Generar Orden</h2>
            <p>Por favor complete el siguiente formulario:</p>
            <form @submit.prevent>
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" v-model="orden.nombre" required>
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" v-model="orden.telefono" required>
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" v-model="orden.direccion" required>
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

                    <div>
                        <p v-if="opcion != ''">Total: 
                            <template v-for="x in menu">
                                <template v-if="x.plato == principal">
                                    <template v-for="o in x.opciones">
                                        <template v-if="o.nombre == opcion">
                                            $  <span id="total">{{ o.precio * cantidad }} </span>
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </p>
                    </div>
                    
                    <div v-if="alerta =! false">
                        <p>{{alerta}}</p>
                    </div>
                    <button type="submit" @click="agregarAlPedido" v-if="opcion != ''">agregar</button>
                </div>
            </form>

            <div v-if="orden.pedido.length > 0">
                    <h2>Pedido</h2>
                    <ul>
                        <li v-for="x in orden.pedido">
                            <p>{{ x.opcion }} x {{ x.cantidad }}</p>
                            <p v-if="x.observaciones.length > 0 ">Observaciones: {{ x.observaciones }}</p>
                            <p>Precio: $ {{ x.valor }}</p>
                            <p>Subtotal: $ {{ x.valor * x.cantidad }}</p>
                        </li>
                    </ul>

                    <button type="button" @click="enviarOrden(orden)">Enviar Orden</button>
                    <button type="button" @click="cancelarOrden">Cancelar</button>
            </div>
            <div v-if="ordenes.length > 0">
                <button type="button" @click="mostrarOrdenesGuardadas" v-if="mostrarOrdenes == false">Mostrar ordenes guardadas</button>
                <div v-if="mostrarOrdenes">
                    <h2>Órdenes guardadas</h2>
                    <ul>
                        <li v-for="p in ordenes">
                            <p>Nombre: {{ p.nombre }}</p>
                            <p>Teléfono: {{ p.telefono }}</p>
                            <p>Dirección: {{ p.direccion }}</p>
                            <ul>
                                <li v-for="x in p.pedido">
                                    <p>{{ x.opcion }} x {{ x.cantidad }}</p>
                                    <p v-if="x.observaciones.length > 0 ">Observaciones: {{ x.observaciones }}</p>
                                    <p>Precio: $ {{ x.valor }}</p>
                                    <p>Subtotal: $ {{ x.valor * x.cantidad }}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <button type="button" @click="ocultarOrdenesGuardadas">Ocultar ordenes guardadas</button>
                </div>
            </div>
        </div>
    `
});


app.mount('#app');