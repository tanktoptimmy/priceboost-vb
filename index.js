import Axios from 'axios';
import mongoose from 'mongoose';
import dbConnect from "./utils/dbConnect.js"
import { query, variables } from "./query.js"
import { EventsModel } from "./models/eventsSchema.js"

const start = async () => {

  const { data } = await Axios.post('https://events.green-1-aws.live.skybet.com/graphql', {
    headers: {
      'Content-Type': 'application/json',
    },
    query,
    variables
  })

  await savePriceboosts(data.data)

}

const savePriceboosts = async (boosts) => {
  try {
    await dbConnect(); 
    // console.log(newBoost)
    const filter = { _id: 5 }; // Assuming _id is present in the fixtureData
    const update = { $set: {_id: 5, events: boosts.events} };
    const options = { upsert: true };
    await EventsModel.updateOne(filter, update, options);
    console.log('Priceboosts saved successfully');
  } catch (error) {
    console.log(error)
    // throw new Error('Error saving Priceboosts:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

start()


