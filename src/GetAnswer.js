import axios from "axios"

async function GetAnswer(question) {

  const apiKey = import.meta.env.VITE_API_KEY

  if(!apiKey){
    console.error("API key is missing")
  }

  try{
    const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, 
      {
        contents: [
          { parts: [{ text: question }] },
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const data = res.data
      return data.candidates[0].content.parts[0].text
  }
  catch(e){
    console.error("Error fetching answer", e.message)
    return null
  }
}

export default GetAnswer