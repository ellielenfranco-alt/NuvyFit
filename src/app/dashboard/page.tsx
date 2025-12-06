'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// IMPORTA PRIMEIRO:
import { createClient } from '@/lib/supabase/client';

// DEPOIS chama a função:
const supabase = createClient();

import { 
  Calendar, 
  Scissors, 
  Dumbbell, 
  MapPin, 
  UtensilsCrossed,
  TrendingUp,
  Flame,
  Pill,
  ArrowRight,
  Sparkles,
  LogOut
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
