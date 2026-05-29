const ollama = require("ollama")
const {buildPrompt} = require("./analyzePrompt")
const ai =async(transcript , rubric)=>{
    const propmt = buildPrompt(transcript,rubric)
  const response =await fetch("http://localhost:11434/api/generate",{
 method:"post",
 headers: {
      "Content-Type": "application/json",
    },
   body:JSON.stringify({
    model: "llama3.2",
      prompt: prompt,
      stream: false,
   })
  })
  const data= response.json()
  return data.response
}

module.exports = ai;