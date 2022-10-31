export const errorHandler = (err,req,res,next) => {
    const codigoEstado = res.statusCode !== 200 ? res.statusCode : 500; 
    res.status(codigoEstado);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '😘 no voy a mostrarte detalles de error por que estoy en producción' : err.stack
    });

}