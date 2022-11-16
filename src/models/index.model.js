import { ventasDetalledb } from './ventas.detalle.model.js'
import { ventasdb } from './ventas.model.js'
import { productosdb } from './productos.models.js'
import { categoriasdb } from './categoria.models.js'

//relaciones
ventasdb.hasMany(ventasDetalledb, {foreignKey: 'id_venta'}),

ventasDetalledb.belongsTo(ventasdb, {foreignKey: 'id_venta'}),
ventasDetalledb.belongsTo(productosdb, {foreignKey: 'id_producto'})

productosdb.belongsTo( categoriasdb, {foreignKey: 'id_categoria'} )
export { ventasDetalledb, ventasdb }