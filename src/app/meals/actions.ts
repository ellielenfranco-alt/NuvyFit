'use server';

import { analyzeMealImage } from '@/lib/openai';

export async function analyzeMealAction(imageBase64: string) {
  try {
    // A OpenAI aceita base64 diretamente
    const analysis = await analyzeMealImage(imageBase64);
    return analysis;
  } catch (error) {
    console.error('Erro na análise:', error);
    throw new Error('Falha ao analisar a imagem');
  }
}
