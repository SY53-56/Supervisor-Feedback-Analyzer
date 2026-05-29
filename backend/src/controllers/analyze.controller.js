const { use } = require("react")
const ai = require("../prompt/aiService")
const rubric = require("../data/rubic.json")
const analyzeTranscript= async(req,res)=>{
    const {transcript } = req.body
    
  try{
      const data = await(transcript,rubric)
      res.status(200).json({message:"it works", data})

  }catch(e){
    res.status(500).json({message:e})
  }
}