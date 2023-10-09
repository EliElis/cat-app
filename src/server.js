import { createServer, Model, Factory } from 'miragejs'

function getRandom(max = 10) {
  return Math.floor(Math.random() * max)
}

function formatDate(date) {
  let dd = date.getDate()
  let mm = date.getMonth() + 1
  return `${dd}.${mm}`
}

function Last7Days() {
  const result = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
    result.push(formatDate(date))
  }

  return result.reverse()
}

function generateTime() {
  const now = new Date()
  const hoursAgo = now.getHours() - 12
  const timeList = []

  for (let i = hoursAgo; i < now.getHours(); i++) {
    let hour = i % 24
    if (hour < 0) hour = 24 + hour
    const time = `${hour}:00`

    timeList.push(time)
  }

  return timeList
}

const status = [
  'We’re all mad here',
  "It's not impossible, merely unpossible.",
  'Cats rule the world',
  'Cats will outsmart dogs every time.',
  "I love my bed, but I'd rather be in yours.",
  'Back in 5 minutes (If not, read this status again).',
  'Nothing is illegal. Until you get caught.',
  'Why there is a human in my house?',
  'Want to try new Gourmet',
  "I like you. I'll eat your food with you."
]

const activity = [
  { message: 'just get up' },
  { message: 'fall asleep' },
  { message: 'is laying on the sun now', severity: 'success' },
  { message: 'is playing in the flat', severity: 'success' },
  { message: 'broke a plate', severity: 'warn' },
  { message: 'is tired' }
]

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      cat: Model
    },
    seeds(server) {
      server.create('cat', { id: 'test' })
    },
    factories: {
      cat: Factory.extend({
        status() {
          return status[getRandom()]
        },
        birds() {
          const statistic = []
          for (let i = 0; i < 7; i++) {
            statistic[i] = getRandom()
          }
          const datesList = Last7Days()
          return { statistic, datesList }
        },
        activeMinutes() {
          const statistic = []
          for (let i = 0; i < 24; i++) {
            statistic[i] = getRandom(61)
          }
          return { statistic, datesList: generateTime() }
        }
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/cat/:id', (schema, request) => {
        return server.create('cat', { id: request.params.id })
      })

      this.get('/cat-activity/:id', (schema, request) => {
        return { activity: activity[getRandom(5)], slug: request.params.id }
      })

      this.passthrough()
      this.passthrough('https://identitytoolkit.googleapis.com/**')
      this.passthrough('https://www.googleapis.com/identitytoolkit/**')
      this.passthrough('https://cat-app-79854-default-rtdb.europe-west1.firebasedatabase.app/**')
      this.passthrough('wss://s-euw1b-nss-206.europe-west1.firebasedatabase.app/**')
      this.passthrough('https://api.thecatapi.com/**')
    }
  })

  return server
}
