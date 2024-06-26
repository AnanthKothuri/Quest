import axios from 'axios';
import supabase from '../config/supabase';
import { OPENAI_KEY } from '../config/openai';
import { GOOGLE_API_KEY } from '../config/google';


export const getQuestFromGPT = async user => {
  try {
    const userMessage = {role: 'user', content: await buildPrompt(user)};
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [userMessage],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + OPENAI_KEY,
        },
      },
    );
    console.log(response.data.choices[0].message.content);
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error sending message:', error);
    return '';
  }
};

export const getQuestLocation = async input => {
  console.log(input);
  const searchText = input.activity;
  try {

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=${GOOGLE_API_KEY}`,
    );
    console.log(response.data.results[0]);
    return response.data.results;
  } catch (error) {
    console.error('Error searching for places', error);
    return '';
  }
};

const buildPrompt = async user => {
  const {data: existingData, error} = await supabase
    .from('profile_data')
    .select('*')
    .eq('user_id', 1);
  if (error) {
    Alert.alert('Error retrieving data from Supabase.');
    console.log(error);
    return;
  }
  data = existingData[0];
  const request = `Given the following user, return a SINGLE activity for the user to do. This activity MUST be OUTSIDE of their comfort zone,
          let them try something new, or let them have fun. Activities can be visiting places, such as going to a park or eating a restaurant,
          or activities can also be simple acts such as talking to a stranger. MUST RETURN RESULT IN JSON of the form 
          {activity: string, description: string, difficulty: string}. description must be no longer than 200 characters.
          difficulty MUST be a number from 1 to 3 representing easy, medium, or hard. This is the user\'s personality; is ${data.age} years old, hobbies: ${data.hobbies}, and has
          ${data.openness}}, ${data.conscientiousness}, ${data.extroversion}, ${data.agreeableness}, ${data.emotional_stability} as values on a
          scale of 1 to 5, with 1 being the lowest and 5 being the highest, for openness, conscientiousness, extroversion, agreeableness, and
          emotional stability, respectively. From the information about their personality, choose an activity that you think could be new for them, 
          make it pretty random on different queries so the same thing isn't always recommended. Don't just give rock climbing, randomize it and make
          sure it is actually based on the information that you get from the user. ONLY INCLUDE JSON, NO OTHER TEXT`;
  console.log(request);
  return request;
};
