export const notFound = (req,res,next) => {
    res.status(404);
    const error = new Error(`URL No encotrada - ${req.originalUrl}`);
    next(error); 
}