import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'email',
  brokers: ['kafka:29092'],
})

const run = async () => {
  const consumer = kafka.consumer({ groupId: 'email-group' })
  await consumer.subscribe({ topic: 'email', fromBeginning: true  });
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value)
      console.log('Sending email to ', data.email, ' with value: ', data.message)
    },
  })
}

run().catch()

