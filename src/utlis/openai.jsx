import { GoogleGenerativeAI } from '@google/generative-ai';
import { OPENAI_KEY } from './openaiAPIKEY';
const genAI = new GoogleGenerativeAI(OPENAI_KEY);


export default genAI;