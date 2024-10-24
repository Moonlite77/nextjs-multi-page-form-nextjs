'use server'

import OpenAI from "openai";
import StoreLink from "@/app/add/review/storeLink"


export default async function CreatePicture(character, years, education, clearance, email, awsCloudPractitioner, securityPlusCompTIA, cisspISC2){
    
    const mainStringArray = [];
    const mainItemArray = [];

    switch(character){
        case "Cybersecurity":{
            mainStringArray.push('cat')
            break;
        }
        case "Software Developement/engineer":{
            mainStringArray.push('dog')
            break;
        }
        case "Linux Administrator":{
            mainStringArray.push('penguin')
            break;
        }
    }

    console.log(`array at 0 is ${mainStringArray[0]}`)

    var yofe = Number(years)
    if (yofe < 3){
        mainStringArray.push('a baby')
    }
    if (yofe > 2 && yofe < 6){
        mainStringArray.push('a teenager')
    }
    if (yofe > 5 && yofe < 8){
        mainStringArray.push('a young adult')
    }
    if (yofe > 7 && yofe < 11){
        mainStringArray.push('an adult')
    }
    if (yofe > 10 && yofe < 16){
        mainStringArray.push('an older adult')
    }
    if (yofe > 15){
        mainStringArray.push('an ancient wizard')
    }

    console.log(`array at 1 is ${mainStringArray[1]}`)

    //ITEM ARRAY PUSHING BEGINS

    if(awsCloudPractitioner == true){
        mainItemArray.push(' cloud')
    }
    if(securityPlusCompTIA == true){
        mainItemArray.push(' shield')
    }
    if(cisspISC2 == true){
        mainItemArray.push(' ancient golden shield')
    }

    switch(clearance){
        case "None":{
            mainItemArray.push(" leather necklace")
            break;
        }
        case "Public Trust":{
            mainItemArray.push(" silver necklace")
            break;
        }
        case "Secret":{
            mainItemArray.push(" gold necklace")
            break;
        }
        case "Top Secret":{
            mainItemArray.push(" large purple necklace")
            break;
        }
    }
    console.log(`item array is ${mainItemArray}`)
    
    //constructing prompt
    let allItems = '';


    mainItemArray.forEach((val) => allItems = allItems + val + ",");

    let mainPrompt = `A cold wax oil painting of a genius ${mainStringArray[0]}. This ${mainStringArray[0]} is ${mainStringArray[1]}. The ${mainStringArray[0]} has or is holding a${allItems}`

    console.log(mainPrompt)

    const openai = new OpenAI();
    const image = await openai.images.generate({ model: "dall-e-3", prompt: mainPrompt });
    const returnedURL = image.data[0].url;


    console.log(image.data[0].url);

    
    console.log(character)
    console.log(years)
    console.log(education)
    console.log(clearance)
    console.log(email)
    console.log(awsCloudPractitioner)
    console.log(securityPlusCompTIA)
    console.log(cisspISC2)
    return returnedURL;
}