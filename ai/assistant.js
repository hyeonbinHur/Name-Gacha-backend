/*
 * sample thread Id = 'thread_auTuQkZUAMRRNzERDumgI2Pr'
 * sample run Id = 'run_1IOtj8RTGUmbwQiu8lSSqZDn'
 * 1. create AI model
 * 2. create thread
 * 3. create message
 * 4. add message
 * 5. run assistant
 * 6. check status -> return message
 */

import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});
