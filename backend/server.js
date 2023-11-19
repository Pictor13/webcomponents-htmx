import Fastify from 'fastify'
import fastifyServe from '@fastify/static'

import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public')

const fastify = Fastify({
  logger: true
})

// serve public frontend together with the backend
fastify.register(fastifyServe, { root: publicDir })

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: 'object',
      properties: {
          name: { type: 'string'}
      },
      required: ['name'],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: request.query.name }
  }
})

async function randomEmoji() {
  const offset = Math.floor(Math.random() * (128397 - 127000) + 127000); // Randomly select an offset within the emoji range
  return String.fromCodePoint(offset);
}

fastify.route({
  method: 'GET',
  url: '/emoji/lottery',
  schema: {
    response: { 200: { type: 'string' } }
  },
  handler: async (request, reply) => randomEmoji()
})




try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}