import express, { Request, Response, NextFunction } from 'express';
import sleepDurationRoutes from './routes/sleepDuration';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/sleepduration', sleepDurationRoutes);

mongoose.connect('mongodb://localhost:27017/sleep-duration', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database')
})

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});