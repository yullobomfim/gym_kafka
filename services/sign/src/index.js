import express from 'express';
import { CompressionTypes, Kafka, logLevel, Partitioners } from 'kafkajs';
const app = express();

const kafka = new Kafka({
  clientId: 'sign',
  brokers: ['kafka:29092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
})

const producer = kafka.producer({ 
  createPartitioner: Partitioners.LegacyPartitioner 
})

app.use(express.json());
app.use((req, res, next) => {
  req.producer = producer;

  return next();
})

app.post('/sign/gym/:planId', async (req, res) => {
  const message = {
    planId: req.params.planId,
    email: req.body.email,
    signDate: new Date()
  }
  console.log({message})
  
  await producer.send({
    topic: 'code',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(message) },
    ],
  })

  return res.json({ ok: true });
})

const run = async () => {
  await producer.connect()

  const port = 9999
  app.listen(port, () => console.log(`Listening on port ${port}`))
}
run().catch()
