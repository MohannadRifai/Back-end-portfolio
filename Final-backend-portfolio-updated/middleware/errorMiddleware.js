// the middleware is a function that runs during the req,res cycle


// the ? is an if statement and : is the else
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV==='production' ? null: err.stack
        
    })
}

export default errorHandler;
