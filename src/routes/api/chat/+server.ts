import { OPENAI_API_KEY } from "$env/static/private"
import { getTokens } from "$lib/tokenizer";
import { json, type RequestHandler } from "@sveltejs/kit"
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"

export const POST: RequestHandler = async ({ request }) => {
    try {
        if (!OPENAI_API_KEY) {
            throw new Error("OpenAI API Key not set!")
        }

        const requestData = await request.json()

        if (!requestData) {
            throw new Error("No request data")
        }

        const reqMessages: ChatCompletionRequestMessage[]  =requestData.messages

        if (!reqMessages) {
            throw new Error("No messages provided")
        }

        let tokenCount = 0

        reqMessages.forEach((msg) => {
            const tokens = getTokens(msg.content)
            tokenCount += tokens
        })

        const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + OPENAI_API_KEY
            },
            method: 'POST',
            body: JSON.stringify({
                input: reqMessages[reqMessages.length - 1].content
            })
        })

        const moderationData = await moderationRes.json()
        const [results] = moderationData.results

        if (results.flagged) {
            throw new Error("Query flagged by OpenAI")
        }

        const prompt = "You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.\nVery Important: If the question is about writing code use backticks (```) at the front and end of the code snippet and include the language use after the first ticks.\nIf you don't know the answer, just say you don't know. DO NOT try to make up an answer.\nIf the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.\nUse as much detail when as possible when responding.\n\n{context}\n\nQuestion: {question}\nAll answers should be in MARKDOWN (.md) Format:"
        tokenCount += getTokens(prompt)

        if (tokenCount >= 4096) {
            throw new Error("Query too long")
        }

        const messages: ChatCompletionRequestMessage[] = [
            {role: 'system', content: prompt},
            ...reqMessages
        ]

        const chatRequestOpts: CreateChatCompletionRequest = {
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.9,
            stream: true
        }

        const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + OPENAI_API_KEY
            },
            method: 'POST',
            body: JSON.stringify(chatRequestOpts)
        })

        if (!chatResponse.ok) {
            const err = await chatResponse.json()
            throw new Error(err)
        }

        return new Response(chatResponse.body, {
            headers: {
                'Content-Type': 'text/events-stream'
            }
        })
    } catch (err) {
        console.log(err)
        return json({ error: 'There was an error processing your request' }, {status: 500 })
    }
    return new Response()

};