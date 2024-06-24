const path = require('path');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const { title } = require('process');

const app = express();




app.set('view engine','pug');

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));


// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


// set security HTTP headers
//app.use(helmet());

//developement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//data sanitization against NoSQL query injection
//app.use(mongoSanitize());
//app.use(xss());

//prevent parameter pollution
/*
app.use(hpp({
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));
*/



//test mideleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});






app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {  
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });

});



//app.use(gloabalErrorHandler);

module.exports = app;
