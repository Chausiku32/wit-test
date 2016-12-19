const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')

// Related wit app: https://wit.ai/dotcypress/smart-home/stories
const app = new Telegraf("312870136:AAEYbIwTHywcEPdavStgsKj2xvVkzsTqGac")
const wit = new TelegrafWit("MHYJ7WZXQFHMMJ4THODQTCBV6MKNDMUN")

app.use(Telegraf.memorySession())
app.use(wit.middleware())

// Message handlers
wit.on('message', (ctx) => {
  if (ctx.wit.confidence > 0.01) {
    return ctx.reply(ctx.wit.message)
  }
})

// Action handlers
wit.on('getRoomTemperature', (ctx) => {
  ctx.wit.context.room = firstEntityValue(ctx.wit.entities, 'room')
  ctx.wit.context.roomInfo = `Temperature in ${ctx.wit.context.room} - As usual :)`
})

app.startPolling(30)

function firstEntityValue (entities, entity) {
  const val = entities && entities[entity] &&
  Array.isArray(entities[entity]) &&
  entities[entity].length > 0 &&
  entities[entity][0].value
  if (!val) {
    return null
  }
  return typeof val === 'object' ? val.value : val
}
