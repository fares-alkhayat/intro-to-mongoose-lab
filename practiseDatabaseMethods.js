const mongoose = require('mongoose')


async function connectDatabase(){
    try{
        await mongoose.connect('mongodb://localhost:27017/recipes')
    console.log('Connected to database')
    }
    catch(err){
        console.log('ERROR: Connection failed.', err)
    }
}

connectDatabase()

// Schema
const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    instructions: {
        type: [String]
    },
    prepTime: {
        type: Number,
        min: 5,
        max: 500,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Normal', 'Hard']
    },
    new: {
        type: Boolean
    }
},{timestamps:true})

// Model

const Recipe = mongoose.model('Recipes',recipeSchema)

async function createRecipe(){
try {
const newRecipe = await Recipe.create({
         recipeName: "Um Ali",
         instructions: "bake at 180C",
         prepTime: 120,
         difficulty: "Normal"
    })
console.log("Recipe created successfully.")
}
catch(err){
    console.log("Failed to create recipe.", err)
}
}

// createRecipe()

module.exports = Recipe

async function getAllRecipes(){
    const allRecipes = await Recipe.find()
    console.log(allRecipes)
}

getAllRecipes()


async function getRecipeById(){
    const oneRecipeId = await Recipe.findById('6adf3b25cbdabd57120c9dbb')
    console.log(oneRecipeId)
}

getRecipeById()

async function updateRecipe(){
        const oneRecipeIdUpdate = await Recipe.findByIdAndUpdate('6adf3b25cbdabd57120c9dbb',{new: true})
    console.log(oneRecipeIdUpdate)
}

updateRecipe()


async function deleteRecipe(){
        const oneRecipeIdDelete = await Recipe.findByIdAndDelete('6adf3b25cbdabd57120c9dbb')
        console.log(oneRecipeIdDelete),
        console.log("Recipe successfully deleted.")
        }

deleteRecipe()