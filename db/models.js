import mongoose from "mongoose";

export const inputSchema = mongoose.Schema ({
    id : {
      type: 'string',
      required: true
    },
    name: {
        type: 'string',
        // required: true
      },
    number : {
        type: 'string',
        // required: true
    },
    email :{
        type: 'string',
        // required: true
    },
    linkedurl :{
        type: 'string',
    },
    git :{
        type: 'string',
    },
    education :{
        type: 'string',
        // required: true
    },
    education1 : {
      type: 'string',
        
    },
    skills :{
      type: 'string',
      // required: true
  },
  skills1 :{
    type: 'string',
    // required: true
},
skills2 :{
  type: 'string',
  
},
skills3 :{
  type: 'string',
  
},
    
summary :{
        type: 'string',
        
    },
companyName :{
  type: 'string',
 
} ,
desig :{
  type: 'string',
 
},
expYearStart : {
  type: 'string',
  
},
expYearEnd : {
  type: 'string',
  
},
explanation : {
  type: 'string',

},
companyName1 :{
  type: 'string',
 
} ,
desig1 :{
  type: 'string',
},
expYearStart1 : {
  type: 'string',
},
expYearEnd1 : {
  type: 'string',
},
explanation1 : {
  type: 'string', 
},
companyName2 :{
  type: 'string',
} ,
desig2 :{
  type: 'string',
},
expYearStart2 : {
  type: 'string',
},
expYearEnd2 : {
  type: 'string',
},
explanation2 : {
  type: 'string',
},
filename: String,
path: String,
})

export const inputModel = mongoose.model('inputs', inputSchema)


// Register and login

export const registerSchema = mongoose.Schema({
  id:{
    type: 'string',
    required: true
  },
  name:{
    type: 'string',
    required: true
  }, 
  email:{
    type: 'string',
    required: true
  }, 
  password:{
    type: 'string',
    required: true
  },
})

export const registerModel=mongoose.model("register", registerSchema)