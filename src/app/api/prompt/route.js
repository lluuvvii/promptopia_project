import { connectDb } from '@utils/database'
import Prompt from '@models/prompt'

export const dynamic = 'force-dynamic'
export const GET = async (req) => {
  try {
    await connectDb()

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (err) {
    return new Response('Failed to fetch all prompts', {
      status: 500
    })
  }
}