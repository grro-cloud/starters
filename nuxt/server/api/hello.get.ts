export default defineEventHandler((event) => {
  const { name } = getQuery(event)
  const who = typeof name === 'string' && name ? name.slice(0, 100) : 'there'
  return { message: `Hello ${who}, from Nuxt on Grro.` }
})
