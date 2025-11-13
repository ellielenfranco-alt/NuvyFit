import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Analisar foto de refeição com MÁXIMO DETALHAMENTO
export async function analyzeMealImage(imageBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Melhor modelo para análise visual
      messages: [
        {
          role: 'system',
          content: 'Você é uma nutricionista especializada em análise nutricional detalhada. Seja extremamente precisa e detalhista.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise esta foto de refeição com MÁXIMO DETALHAMENTO e retorne um JSON estruturado com:

1. "foods": array de TODOS os alimentos identificados, cada um com:
   - "name": nome do alimento
   - "quantity": quantidade estimada (ex: "150g", "1 unidade", "2 colheres")
   - "weight_grams": peso estimado em gramas
   - "calories": calorias deste alimento específico
   - "protein": proteína em gramas
   - "carbs": carboidratos em gramas
   - "fats": gorduras em gramas
   - "fiber": fibras em gramas

2. "total": totais da refeição:
   - "calories": total de calorias
   - "protein": total de proteínas (g)
   - "carbs": total de carboidratos (g)
   - "fats": total de gorduras (g)
   - "fiber": total de fibras (g)

3. "meal_type": tipo de refeição (café da manhã, almoço, jantar, lanche)

4. "quality_score": nota de 0-10 para qualidade nutricional

5. "analysis": análise detalhada da refeição (texto)

6. "suggestions": array de sugestões para melhorar a refeição

7. "warnings": array de alertas (se houver excesso de algo, falta de nutrientes, etc)

Seja EXTREMAMENTE DETALHISTA. Identifique até temperos e molhos visíveis.`
            },
            {
              type: 'image_url',
              image_url: { 
                url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    throw error;
  }
}

// Gerar plano de treino personalizado DETALHADO
export async function generateWorkoutPlan(profile: {
  height: number;
  weight: number;
  age: number;
  goal: string;
  activity_level: string;
  location: 'home' | 'gym';
  experience?: string;
  limitations?: string[];
}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é uma personal trainer certificada especializada em saúde feminina, com expertise em treinos funcionais, musculação e condicionamento físico.'
        },
        {
          role: 'user',
          content: `Crie um plano de treino EXTREMAMENTE DETALHADO e personalizado para:

PERFIL:
- Altura: ${profile.height}cm
- Peso: ${profile.weight}kg
- Idade: ${profile.age} anos
- Objetivo: ${profile.goal}
- Nível de atividade: ${profile.activity_level}
- Local de treino: ${profile.location === 'home' ? 'Casa (sem equipamentos)' : 'Academia (equipamentos completos)'}
${profile.experience ? `- Experiência: ${profile.experience}` : ''}
${profile.limitations?.length ? `- Limitações: ${profile.limitations.join(', ')}` : ''}

Retorne um JSON estruturado com:

1. "weekly_plan": array de 7 dias, cada dia com:
   - "day": nome do dia
   - "workout": nome do treino ou "Descanso"
   - "focus": grupo muscular principal
   - "duration": duração em minutos
   - "intensity": baixa/média/alta

2. "workouts": objeto com cada tipo de treino detalhado:
   - "name": nome do treino
   - "exercises": array de exercícios, cada um com:
     * "name": nome do exercício
     * "sets": número de séries
     * "reps": repetições (ou tempo)
     * "rest": descanso entre séries (segundos)
     * "technique": como executar corretamente
     * "alternative": exercício alternativo se necessário

3. "progression": como progredir nas próximas semanas

4. "tips": array de dicas importantes

5. "nutrition_tips": dicas de alimentação para o objetivo

6. "estimated_calories_burned": calorias queimadas por treino (estimativa)

Seja DETALHISTA e considere o perfil feminino (ciclo menstrual, necessidades específicas).`
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 3000,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Erro ao gerar plano de treino:', error);
    throw error;
  }
}

// Analisar dados capilares e recomendar tratamento DETALHADO
export async function analyzeHairData(hairData: {
  hair_type?: string;
  hair_porosity?: string;
  current_condition?: string;
  concerns?: string[];
  image?: string; // Opcional: foto do cabelo
}) {
  try {
    const messages: any[] = [
      {
        role: 'system',
        content: 'Você é uma tricologista e hair stylist especializada em cronograma capilar, química capilar e tratamentos naturais.'
      },
      {
        role: 'user',
        content: hairData.image ? [
          {
            type: 'text',
            text: `Analise esta foto do cabelo e os dados fornecidos para criar um cronograma capilar EXTREMAMENTE DETALHADO:

DADOS FORNECIDOS:
${hairData.hair_type ? `- Tipo de cabelo: ${hairData.hair_type}` : ''}
${hairData.hair_porosity ? `- Porosidade: ${hairData.hair_porosity}` : ''}
${hairData.current_condition ? `- Condição atual: ${hairData.current_condition}` : ''}
${hairData.concerns?.length ? `- Preocupações: ${hairData.concerns.join(', ')}` : ''}

Retorne um JSON estruturado com:

1. "hair_analysis": análise detalhada do cabelo observado na foto:
   - "type": tipo de cabelo identificado (1A-4C)
   - "porosity": porosidade identificada
   - "condition": condição atual
   - "damage_level": nível de dano (0-10)
   - "observations": observações detalhadas

2. "schedule": cronograma semanal detalhado (array de 4 semanas):
   - Cada semana com dias e tratamentos específicos
   - "day": dia da semana
   - "treatment": hidratação/nutrição/reconstrução
   - "products": produtos específicos recomendados
   - "steps": passo a passo da aplicação

3. "products": produtos recomendados por categoria:
   - "shampoo": array de opções
   - "conditioner": array de opções
   - "masks": array de máscaras
   - "oils": óleos recomendados
   - "leave_in": leave-ins recomendados

4. "techniques": técnicas de aplicação e cuidados

5. "tips": dicas importantes para o tipo de cabelo

6. "expected_results": resultados esperados por semana (4 semanas)

7. "warnings": alertas e cuidados importantes

Seja EXTREMAMENTE DETALHISTA e específica.`
          },
          {
            type: 'image_url',
            image_url: { 
              url: hairData.image.startsWith('data:') ? hairData.image : `data:image/jpeg;base64,${hairData.image}`
            }
          }
        ] : `Crie um cronograma capilar EXTREMAMENTE DETALHADO baseado nestes dados:

DADOS:
- Tipo de cabelo: ${hairData.hair_type || 'Não informado'}
- Porosidade: ${hairData.hair_porosity || 'Não informada'}
- Condição atual: ${hairData.current_condition || 'Não informada'}
- Preocupações: ${hairData.concerns?.join(', ') || 'Nenhuma'}

Retorne um JSON estruturado com:

1. "schedule": cronograma semanal detalhado (4 semanas)
2. "products": produtos recomendados por categoria
3. "techniques": técnicas de aplicação
4. "tips": dicas importantes
5. "expected_results": resultados esperados
6. "warnings": alertas importantes

Seja DETALHISTA e específica para o tipo de cabelo.`
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      response_format: { type: 'json_object' },
      max_tokens: 3000,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Erro ao analisar dados capilares:', error);
    throw error;
  }
}

// Analisar suplementação e recomendar
export async function analyzeSupplements(userData: {
  age: number;
  weight: number;
  height: number;
  goal: string;
  current_supplements?: string[];
  deficiencies?: string[];
  diet_type?: string;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é uma nutricionista especializada em suplementação feminina e saúde hormonal.'
        },
        {
          role: 'user',
          content: `Analise o perfil e recomende suplementação DETALHADA:

PERFIL:
- Idade: ${userData.age} anos
- Peso: ${userData.weight}kg
- Altura: ${userData.height}cm
- Objetivo: ${userData.goal}
${userData.current_supplements?.length ? `- Suplementos atuais: ${userData.current_supplements.join(', ')}` : ''}
${userData.deficiencies?.length ? `- Deficiências conhecidas: ${userData.deficiencies.join(', ')}` : ''}
${userData.diet_type ? `- Tipo de dieta: ${userData.diet_type}` : ''}

Retorne um JSON com:

1. "recommended_supplements": array de suplementos recomendados:
   - "name": nome do suplemento
   - "dosage": dosagem recomendada
   - "timing": quando tomar
   - "benefits": benefícios específicos
   - "priority": alta/média/baixa

2. "warnings": alertas importantes

3. "interactions": possíveis interações entre suplementos

4. "tips": dicas de uso

5. "food_sources": fontes alimentares alternativas

Considere necessidades específicas femininas (ferro, cálcio, vitamina D, ômega-3, etc).`
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Erro ao analisar suplementação:', error);
    throw error;
  }
}

// Analisar ciclo menstrual e dar recomendações
export async function analyzeMenstrualCycle(cycleData: {
  cycle_length: number;
  period_duration: number;
  symptoms?: string[];
  pain_level?: number;
  flow_intensity?: string;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é uma ginecologista especializada em saúde menstrual e bem-estar feminino.'
        },
        {
          role: 'user',
          content: `Analise estes dados do ciclo menstrual e forneça recomendações DETALHADAS:

DADOS DO CICLO:
- Duração do ciclo: ${cycleData.cycle_length} dias
- Duração da menstruação: ${cycleData.period_duration} dias
${cycleData.symptoms?.length ? `- Sintomas: ${cycleData.symptoms.join(', ')}` : ''}
${cycleData.pain_level ? `- Nível de dor: ${cycleData.pain_level}/10` : ''}
${cycleData.flow_intensity ? `- Intensidade do fluxo: ${cycleData.flow_intensity}` : ''}

Retorne um JSON com:

1. "cycle_analysis": análise do ciclo
   - "regularity": regular/irregular
   - "health_status": saudável/atenção necessária
   - "observations": observações importantes

2. "phase_recommendations": recomendações por fase do ciclo:
   - "menstrual": fase menstrual (dias 1-5)
   - "follicular": fase folicular (dias 6-14)
   - "ovulatory": fase ovulatória (dias 14-16)
   - "luteal": fase lútea (dias 17-28)
   
   Cada fase com:
   - "nutrition": recomendações nutricionais
   - "exercise": tipo de exercício recomendado
   - "self_care": cuidados pessoais
   - "energy_level": nível de energia esperado

3. "symptom_management": como gerenciar sintomas específicos

4. "red_flags": sinais de alerta que requerem atenção médica

5. "tips": dicas gerais para saúde menstrual

Seja DETALHISTA e empática.`
        }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Erro ao analisar ciclo menstrual:', error);
    throw error;
  }
}
