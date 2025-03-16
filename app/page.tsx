"use client"

import { useChat } from "ai/react"
import { Message } from "ai/react"

export default function Home() {
  const prompt = `
  関西弁で話してください。
  `

  const initialMessages: Message[] = [
    { id: "initial-1", role: "system", content: prompt },
  ]

  const { messages, input, handleSubmit, setInput } = useChat({
    api: "/api/chat-gpt-api",
    initialMessages: initialMessages, // useChatフックに初期メッセージをす
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-left">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2">
          <div id="chatArea" className="mb-4 h-96 overflow-auto border p-4">
            {messages.map((message) => {
              if (message.role == "assistant") {
                return (
                  <div key={message.id}>
                    <span className="text-gray-800 font-medium">
                      AI:{message.content}
                    </span>
                  </div>
                )
              } else if (message.role == "user") {
                return (
                  <div key={message.id}>
                    <span className="font-semibold text-black">
                      USER:{message.content}
                    </span>
                  </div>
                )
              }
            })}
          </div>

          <div className="mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
                setInput("")
              }}
            >
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                type="text"
                placeholder="メッセージを入れてください"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                送信
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between"></div>
        </div>
      </main>
    </div>
  )
}
