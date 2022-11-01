let productos = [
    {
        title: 'Camisa',
        price: 200,
        thumbnail: 'https://res.cloudinary.com/casamoda-b2c/image/upload/w_560/e_multiply,h_1.1,w_1.1,l_f7f7f7,fl_relative/venti-b2c/production/product/1560/456/1560-456-image-1-60a3198c5bfa9.jpg',
        id: 1
    },
    {
        title: 'Pantalon',
        price: 320,
        thumbnail:'https://img01.ztat.net/article/spp-media-p1/62194f9c83814c2397a48a8d5e4f5200/0247784367c643fdbe1a99070e9e48ac.jpg?imwidth=1800',
        id: 2
    }
];

module.exports = class Contenedor {

    getAll () {
        return productos;
    }

    save (producto) {
        let nuevoId
                
        if (productos.length > 0) {
            let prodExistentes = this.getAll()
            let ultimoProducto = prodExistentes[prodExistentes.length - 1]

            nuevoId = ultimoProducto.id + 1
            producto.id = nuevoId
            prodExistentes.push(producto)
            
            productos = prodExistentes
        } else {
            nuevoId = 1
            producto.id = nuevoId
            productos.push(producto)
        }
        return producto
    }

    getById (id) {
        let prodExistentes = this.getAll()
        let producto = prodExistentes.find(producto => producto.id == id)

        if (typeof(producto) != "undefined") {
            return producto 
        } else {
            return { error : 'producto no encontrado' }
        }  
    }

    update (productoId, propiedades) {
        productos = productos.map(producto => {
            if (producto.id == productoId) {
              return {...producto, ...propiedades}
            }
          
            return producto;
        });

        let producto = this.getById(productoId)

        return producto
    }  
    
    deleteById(productoId) {
        productos = productos.filter(producto => {
            return producto.id != productoId
        })

        return  { message : 'producto eliminado' }
    }
        
}
