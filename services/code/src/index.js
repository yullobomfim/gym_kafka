import { Kafka, Partitioners } from 'kafkajs';

const plans = [
    {
      "id": 1,
      "name": "Simple Plan",
      "workoutPerweek": 3,
    },
    {
      "id": 2,
      "name": "Go Muscle",
      "workoutPerweek": 5,
    },
    {
      "id": 3,
      "name": "Insane",
      "workoutPerweek": 7,
    }
  ]


const kafka = new Kafka({
  clientId: 'code',
  brokers: ['kafka:29092'],
})

const run = async () => {
  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  const consumer = kafka.consumer({ groupId: 'workout-group' })

  await producer.connect()
  await consumer.connect()
  await consumer.subscribe({ topic: 'code', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value)
      console.log({ data })
      const planExists = plans.find(plan => plan.id === parseInt(data.planId))
      if (!planExists) {
        await producer.send({
          topic: 'email',
          messages: [
            { value: JSON.stringify({ message: 'sign cancelled: plan not found ', email: data.email }) }
          ]
        })
        return
      }
      const accesscode = Math.floor(Math.random() * 10000000)
      await producer.send({
        topic: 'email',
        messages: [
          {
            value: JSON.stringify({
              message: `sign completed: your access code is ${accesscode}`, email: data.email
            })
          }
        ]
      })

      await producer.send({
        topic: 'workout',
        messages: [
          { value: JSON.stringify({ data, plan: planExists }) },
        ],
      })
    },
  })
}

run().catch()

