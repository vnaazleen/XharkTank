# XharkTank

<img src="https://user-images.githubusercontent.com/54474853/205536937-34ee3533-46fb-4b46-b011-100794dd894f.png" width="100%">

SharkTank is a panel of potential investors, termed as "Sharks", who listen to entrepreneurs pitch ideas for a business or product they wish to develop. These self-made multi-millionaires judge the business concepts and products pitched and then decide whether to invest their own money to help market and mentor each contestant.

The Backend of XharkTank where budding entrepreneurs can pitch ideas for a business or product they wish to develop by providing their name, title & idea for the business, the investment amount they expect to be fulfilled, and the percentage of equity they are ready to shed away to the potential investors. Investors must be able to retrieve the list of all pitches and share their feedback/comments with a counter offer as per their interests.

## Technologies Used
* Node.js 14
* MongoDB 4.2

## Project Flows
1. Entrepreneurs will post Pitch by providing these inputs
    * Name of the entrepreneur posting the pitch
    * Title of the pitch
    * Business Idea for the Product they wish to develop
    * Ask Expected Amount for investment
    * Percentage of Equity to be diluted
2. Investors will view all the latest pitches posted to date
    * If the entrepreneurs post a new pitch, that should also get listed. Note that these submitted pitches will be shown one below the other.
4. Investors will make a counteroffer to the pitch by providing these inputs
    * Unique Id of the Pitch made by the entrepreneur
    * Name of the investor making a counteroffer
    * Amount ready to invest in the idea
    * Ask Percentage of Equity for a company

## Tables/Collections
1. Pitches
```
{
    id: { type: Number, required: true },
    entrepreneur: { type: String, required: true },
    pitchTitle: { type: String, required: true },
    pitchIdea: { type: String, required: true },
    askAmount: { type: Number, required: true },
    equity: { type: Number, required: true, min: 0, max: 100 },
    createdAt: Date,
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }]
}
```
2. Offers
```
{
    id: { type: Number, required: true },
    investor: { type: String, required: true },
    amount: { type: Number, required: true },
    equity: { type: Number, required: true, min: 0, max: 100 },
    comment: { type: String, required: true },
}
```

## Endpoints
1. Endpoint to post a pitch to the backend (/pitches)
2. Endpoint to make a counter offer for a pitch to the backend (/pitches/<pitch_id>/makeOffer)
3. Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend (/pitches)
4. Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch. (/pitches/<pitch_id>)

## Setup
* Install [Node.js 14](https://nodejs.org/en/blog/release/v14.17.3/)
* Install [Mongodb 4.2](https://www.mongodb.com/try/download/community)
* Clone the Repository
* Run `npm i` to install all the dependent libraries
* Run `mongod` to start mongodb
* Run `npm start` to start the server

## Project Status
* Backend - Complete
* Frontend - Not started

## Contact
Created by @vnaazleen - feel free to contact me!
