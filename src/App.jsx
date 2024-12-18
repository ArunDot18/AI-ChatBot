import { useState } from "react"
import GetAnswer from "./getAnswer"


function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const handleAnswer = async () => {
    const response = await GetAnswer(question)
    setAnswer(response)
  }
  
  return (
    <>
      <textarea 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAnswer}>get data</button>
      {answer && <div>
        <h3>answer : </h3>
        <p>{answer}</p>
        </div>
      }
    </>
  )
}

export default App
