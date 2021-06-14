import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from './controllers/dogs.js';
import candyController from './controllers/candies.js';
import drinkController from './controllers/drinks.js';

const app = express();

app.use(express.json());
app.use(dogController);
app.use(candyController);
app.use(drinkController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
