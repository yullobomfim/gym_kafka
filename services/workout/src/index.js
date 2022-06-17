import { Kafka, Partitioners } from 'kafkajs';

const exercises = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
  'Lat Pulldown',
  'Bicep Curl',
  'Tricep Pushdown',
  'Leg Press',
  'Leg Extension',
]
const workoutDays = [
  {
    "day": "Monday",
    "exercises": [exercises[0], exercises[1], exercises[2]]
  },
  {
    "day": "Tuesday",
    "exercises": [exercises[3], exercises[4], exercises[5]]
  },
  {
    "day": "Wednesday",
    "exercises": [exercises[6], exercises[7], exercises[8]]
  },
  {
    "day": "Thursday",
    "exercises": [exercises[9], exercises[0], exercises[1]]
  },
  {
    "day": "friday",
    "exercises": [exercises[2], exercises[3], exercises[4]]
  },
  {
    "day": "saturday",
    "exercises": [exercises[5], exercises[6], exercises[7]]
  },
  {
    "day": "sunday",
    "exercises": [exercises[8], exercises[9], exercises[0]]
  },
]

const kafka = new Kafka({
  clientId: 'workout',
  brokers: ['kafka:29092'],
})

const getWorkoutSchedule = (plan) => {
  if (parseInt(plan.id) == 1) {
    return [workoutDays[0], workoutDays[2], workoutDays[4]]
  }
  if (parseInt(plan.id) == 2) {
    return [workoutDays[0], workoutDays[1], workoutDays[2], workoutDays[3], workoutDays[4]]
  }
  if (parseInt(plan.id) == 3) {
    return [workoutDays[0], workoutDays[1], workoutDays[2], workoutDays[3], workoutDays[4], workoutDays[5], workoutDays[6]]
  }

}

const run = async () => {

  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  const consumer = kafka.consumer({ groupId: 'code-group' })

  await producer.connect()
  await consumer.connect()
  await consumer.subscribe({ topic: 'workout', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { data, plan } = JSON.parse(message.value)
      console.log({ data, plan })
      const workoutSchedule = getWorkoutSchedule(plan)

      await producer.send({
        topic: 'email',
        messages: [
          {
            value: JSON.stringify({
              message: `registered for plan [${plan.name}, your workout schedule is ${JSON.stringify(workoutSchedule)}]`,
              email: data.email
            })
          }
        ]
      })
    }
  })
}

run().catch()

