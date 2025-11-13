// Tipos do app de saúde feminina

export type Goal = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'health';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type WorkoutType = 'strength' | 'cardio' | 'flexibility' | 'running' | 'home' | 'gym';
export type HairType = 'straight' | 'wavy' | 'curly' | 'coily';
export type HairPorosity = 'low' | 'medium' | 'high';
export type TreatmentType = 'hydration' | 'nutrition' | 'reconstruction';

export interface Profile {
  id: string;
  full_name: string | null;
  birth_date: string | null;
  height: number | null;
  weight: number | null;
  goal: Goal | null;
  activity_level: ActivityLevel | null;
  created_at: string;
  updated_at: string;
}

export interface MenstrualCycle {
  id: string;
  user_id: string;
  cycle_start: string;
  cycle_end: string | null;
  cycle_length: number | null;
  period_length: number | null;
  symptoms: string[];
  mood: string | null;
  notes: string | null;
  created_at: string;
}

export interface HairSchedule {
  id: string;
  user_id: string;
  hair_type: HairType | null;
  hair_porosity: HairPorosity | null;
  treatment_type: TreatmentType;
  treatment_date: string;
  products_used: string[];
  notes: string | null;
  created_at: string;
}

export interface Meal {
  id: string;
  user_id: string;
  meal_type: MealType;
  meal_date: string;
  image_url: string | null;
  foods_detected: string[];
  total_calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  fiber: number | null;
  ai_analysis: any;
  notes: string | null;
  created_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  workout_type: WorkoutType;
  workout_date: string;
  duration: number | null;
  calories_burned: number | null;
  exercises: any;
  ai_recommendations: any;
  notes: string | null;
  created_at: string;
}

export interface Run {
  id: string;
  user_id: string;
  run_date: string;
  distance: number | null;
  duration: number | null;
  pace: number | null;
  calories_burned: number | null;
  route_data: any;
  elevation_gain: number | null;
  notes: string | null;
  created_at: string;
}

export interface Supplement {
  id: string;
  user_id: string;
  supplement_name: string;
  dosage: string | null;
  frequency: string | null;
  time_of_day: string[];
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
}

export interface SupplementLog {
  id: string;
  supplement_id: string;
  user_id: string;
  taken_at: string;
  taken: boolean;
  notes: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalMeals: number;
  totalWorkouts: number;
  totalRuns: number;
  averageCalories: number;
  currentCycleDay: number | null;
  nextTreatment: string | null;
  weeklyProgress: {
    meals: number;
    workouts: number;
    supplements: number;
  };
}
