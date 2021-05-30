import express from 'express';
import diagnoseRouter from './src/routes/diagnoseRouter';
import patientRouter from './src/routes/patientRouter';
import cors from 'cors';

const app = express();
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors(),
  express.json()
);

//Routers
app.use('/api/diagnostics', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});