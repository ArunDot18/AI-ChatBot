import { useEffect, useState } from "react"
import GetAnswer from "./GetAnswer"
import { RiRobot2Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { ThreeDots } from 'react-loader-spinner'

function App() {
  const [question, setQuestion] = useState("") // user's input
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("messages")) || []
  })  // initialized local storage chat
  const [loading, setLoading] = useState(false)
  
  // setting messages
  const handleSendMessage = async () => {
    setMessages([...messages, { type: "user", text: question}])
    setQuestion("")
    setLoading(true)

    const response = await GetAnswer(question)
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: response}
    ])
    setLoading(false)
  }

  // save chat to local storage
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages))
  },[messages])

  //clear chat
  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("messages")
  }
  
  return (
    
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 p-4">

      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-lg shadow-md">
        <h2 className="flex items-center text-2xl font-bold">PixoB<RiRobot2Fill/>t</h2>
        <button
          onClick={clearChat}
          className="w-18 p-2 bg-red-600 rounded-lg"
          aria-label="Clear Chat"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-5xl p-3 rounded-lg ${
                msg.type === "user" ? "bg-indigo-700 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
          <div className="p-3 rounded-lg">
          <ThreeDots
          visible={true}
          height="60"
          width="60"
          color="#1A237E"
          radius="9"
          ariaLabel="three-dots-loading"
          />
          </div>
        </div>
        )}
      </div>

      <div className="flex items-center p-3 bg-gray-800 border-t-2 border-gray-700 rounded-b-lg">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg shadow-sm resize-none placeholder-gray-400"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-900 transition: background-color 0.3s ease;"
          disabled={loading}
        >
          <IoSend />
        </button>
      </div>
    </div>
  )  
}

export default App
