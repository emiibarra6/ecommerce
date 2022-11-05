import { ventasDetalledb } from './ventas.detalle.model.js'
import { ventasdb } from './ventas.model.js'
import { productosdb } from './productos.models.js'

//relaciones
ventasdb.hasMany(ventasDetalledb, {foreignKey: 'id_venta'}),
ventasDetalledb.belongsTo(ventasdb, {foreignKey: 'id_venta'}),
ventasDetalledb.belongsTo(productosdb, {foreignKey: 'id_producto'})

export { ventasDetalledb, ventasdb }