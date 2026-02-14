import { Exercise } from '@/types';

const equipmentMap: Record<string, string> = {
  // Chest - Barbell
  'bench-press': 'barbell',
  'incline-bench-press': 'barbell',
  'decline-bench-press': 'barbell',
  'close-grip-bench': 'barbell',
  
  // Chest - Dumbbell
  'dumbbell-bench-press': 'dumbbell',
  'dumbbell-fly': 'dumbbell',
  
  // Chest - Cable
  'cable-crossover': 'cable',
  'pec-deck': 'machine',
  'chest-press-machine': 'machine',
  
  // Chest - Bodyweight
  'push-up': 'bodyweight',
  'chest-dip': 'bodyweight',
  
  // Back - Barbell
  'deadlift': 'barbell',
  'barbell-row': 'barbell',
  'rack-pull': 'barbell',
  'good-morning': 'barbell',
  'stiff-leg-deadlift': 'barbell',
  'romanian-deadlift': 'barbell',
  
  // Back - Dumbbell
  'dumbbell-row': 'dumbbell',
  
  // Back - Cable
  'lat-pulldown': 'cable',
  'seated-cable-row': 'cable',
  'face-pull': 'cable',
  
  // Back - Bodyweight
  'pull-up': 'bodyweight',
  'chin-up': 'bodyweight',
  'inverted-row': 'bodyweight',
  
  // Back - Machine
  't-bar-row': 'machine',
  'hyperextension': 'machine',
  
  // Legs - Barbell
  'squat': 'barbell',
  'front-squat': 'barbell',
  
  // Legs - Dumbbell
  'lunges': 'dumbbell',
  'bulgarian-split-squat': 'dumbbell',
  'step-up': 'dumbbell',
  
  // Legs - Machine
  'leg-press': 'machine',
  'hack-squat': 'machine',
  'leg-extension': 'machine',
  'leg-curl': 'machine',
  'seated-leg-curl': 'machine',
  'calf-raise-standing': 'machine',
  'calf-raise-seated': 'machine',
  
  // Legs - Bodyweight
  'glute-bridge': 'bodyweight',
  
  // Legs - Other
  'hip-thrust': 'barbell',
  
  // Shoulders - Barbell
  'overhead-press': 'barbell',
  'upright-row': 'barbell',
  'shrug': 'barbell',
  
  // Shoulders - Dumbbell
  'dumbbell-shoulder-press': 'dumbbell',
  'arnold-press': 'dumbbell',
  'lateral-raise': 'dumbbell',
  'front-raise': 'dumbbell',
  'reverse-fly': 'dumbbell',
  
  // Shoulders - Cable
  'cable-lateral-raise': 'cable',
  
  // Shoulders - Machine
  'machine-shoulder-press': 'machine',
  
  // Arms - Barbell
  'bicep-curl': 'barbell',
  'wrist-curl': 'dumbbell',
  'reverse-wrist-curl': 'dumbbell',
  
  // Arms - Dumbbell
  'dumbbell-curl': 'dumbbell',
  'hammer-curl': 'dumbbell',
  'incline-curl': 'dumbbell',
  'concentration-curl': 'dumbbell',
  'tricep-kickback': 'dumbbell',
  'overhead-tricep-extension': 'dumbbell',
  
  // Arms - Cable
  'cable-curl': 'cable',
  'tricep-pushdown': 'cable',
  
  // Arms - Machine
  'preacher-curl': 'machine',
  'skull-crusher': 'barbell',
  
  // Arms - Bodyweight
  'tricep-dip': 'bodyweight',
  
  // Core - Bodyweight
  'plank': 'bodyweight',
  'crunch': 'bodyweight',
  'sit-up': 'bodyweight',
  'bicycle-crunch': 'bodyweight',
  'leg-raise': 'bodyweight',
  'hanging-leg-raise': 'bodyweight',
  'russian-twist': 'bodyweight',
  'mountain-climber': 'bodyweight',
  'dead-bug': 'bodyweight',
  'ab-wheel-rollout': 'other',
  'side-plank': 'bodyweight',
  'v-up': 'bodyweight',
  'flutter-kick': 'bodyweight',
  'hollow-body': 'bodyweight',
  'captain-chair-leg-raise': 'machine',
  'tuck-raise': 'bodyweight',
  
  // Core - Cable
  'cable-woodchop': 'cable',
};

export const getEquipment = (exerciseId: string): string => {
  return equipmentMap[exerciseId] || 'other';
};

export const equipmentTypes = [
  { value: 'all', label: 'All Equipment' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'dumbbell', label: 'Dumbbell' },
  { value: 'machine', label: 'Machine' },
  { value: 'cable', label: 'Cable' },
  { value: 'bodyweight', label: 'Bodyweight' },
  { value: 'other', label: 'Other' },
];

export const difficultyLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'difficulty-asc', label: 'Difficulty (Easy to Hard)' },
  { value: 'difficulty-desc', label: 'Difficulty (Hard to Easy)' },
];

export const exercises: Exercise[] = [
  // CHEST EXERCISES
  { 
    id: 'bench-press', 
    name: 'Bench Press', 
    muscles: ['chest', 'shoulders', 'arms'], 
    equipment: 'barbell',
    description: 'The king of chest exercises. A compound movement that builds overall chest mass and strength.',
    instructions: [
      'Lie flat on a bench with your eyes under the barbell',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack the bar and lower it to your mid-chest',
      'Press the bar back up until arms are fully extended',
      'Keep your feet flat on the floor and maintain a slight arch in your lower back'
    ],
    tips: ['Keep your shoulder blades retracted and squeezed together', 'Drive through your legs for stability', 'Don\'t bounce the bar off your chest']
  },
  { 
    id: 'incline-bench-press', 
    name: 'Incline Bench Press', 
    muscles: ['chest', 'shoulders'], 
    equipment: 'barbell',
    description: 'Targets the upper portion of the chest muscles for a complete chest development.',
    instructions: [
      'Set the bench to a 30-45 degree angle',
      'Lie back and grip the bar slightly wider than shoulder-width',
      'Lower the bar to your upper chest',
      'Press back up to full arm extension',
      'Keep your back pressed against the bench'
    ],
    tips: ['Don\'t angle the bench too steep', 'Control the descent', 'Focus on feeling the upper chest work']
  },
  { 
    id: 'decline-bench-press', 
    name: 'Decline Bench Press', 
    muscles: ['chest'], 
    equipment: 'barbell',
    description: 'Emphasizes the lower chest muscles while minimizing shoulder involvement.',
    instructions: [
      'Secure your feet under the decline bench pad',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to your lower chest',
      'Press up with controlled movement',
      'Keep your hips on the bench throughout'
    ],
    tips: ['Use a spotter for safety', 'Don\'t use too much weight', 'Focus on the lower chest squeeze']
  },
  { 
    id: 'dumbbell-bench-press', 
    name: 'Dumbbell Bench Press', 
    muscles: ['chest', 'shoulders', 'arms'], 
    equipment: 'dumbbell',
    description: 'Allows for greater range of motion and independent arm movement.',
    instructions: [
      'Lie flat on a bench holding dumbbells at chest level',
      'Press the dumbbells up until arms are extended',
      'Lower the dumbbells back to chest level with control',
      'Keep a slight arch in your lower back',
      'Maintain tension on the chest throughout'
    ],
    tips: ['Allow dumbbells to touch at the top for full contraction', 'Don\'t let them drift too far out', 'Use a neutral grip']
  },
  { 
    id: 'dumbbell-fly', 
    name: 'Dumbbell Fly', 
    muscles: ['chest'], 
    equipment: 'dumbbell',
    description: 'An isolation exercise that stretches and contracts the chest muscles.',
    instructions: [
      'Lie on a flat bench with dumbbells extended above chest',
      'With a slight bend in elbows, lower weights out to sides',
      'Feel a stretch in your chest muscles',
      'Bring dumbbells back together above chest',
      'Squeeze chest at the top'
    ],
    tips: ['Keep the bend in your elbows constant', 'Don\'t go too heavy', 'Focus on the stretch and squeeze']
  },
  { 
    id: 'cable-crossover', 
    name: 'Cable Crossover', 
    muscles: ['chest'], 
    equipment: 'cable',
    description: 'Provides constant tension throughout the entire movement for chest isolation.',
    instructions: [
      'Stand between cable towers with pulleys at high position',
      'Step forward and lean slightly forward',
      'With arms slightly bent, bring hands together in front',
      'Squeeze chest at the bottom',
      'Slowly return to starting position'
    ],
    tips: ['Vary the angle to target different parts of chest', 'Lean forward for more chest involvement', 'Control the negative']
  },
  { 
    id: 'pec-deck', 
    name: 'Pec Deck Machine', 
    muscles: ['chest'], 
    equipment: 'machine',
    description: 'A machine exercise that provides consistent chest isolation.',
    instructions: [
      'Sit at the pec deck machine with back against pad',
      'Grip the handles or place arms against pads',
      'Push arms together in front of chest',
      'Squeeze chest at the contraction point',
      'Slowly return to starting position'
    ],
    tips: ['Don\'t use momentum', 'Focus on squeezing the pecs', 'Adjust the seat height']
  },
  { 
    id: 'push-up', 
    name: 'Push-Up', 
    muscles: ['chest', 'shoulders', 'arms'], 
    equipment: 'bodyweight',
    description: 'The classic bodyweight chest exercise that can be done anywhere.',
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Keep your body in a straight line',
      'Push back up to starting position',
      'Engage your core throughout'
    ],
    tips: ['Keep your hips from sagging', 'Modify on knees if needed', 'Try different hand positions']
  },
  { 
    id: 'chest-dip', 
    name: 'Chest Dip', 
    muscles: ['chest', 'shoulders', 'arms'], 
    equipment: 'bodyweight',
    description: 'An advanced bodyweight exercise targeting lower chest with forward lean.',
    instructions: [
      'Grip parallel bars and lift your body',
      'Lean forward slightly to target chest',
      'Lower body until you feel a stretch in chest',
      'Push back up to starting position',
      'Keep elbows close to body'
    ],
    tips: ['Lean forward to emphasize chest', 'Don\'t go too deep', 'Add weight when easier']
  },
  { 
    id: 'chest-press-machine', 
    name: 'Chest Press Machine', 
    muscles: ['chest', 'shoulders', 'arms'], 
    equipment: 'machine',
    description: 'A machine exercise great for beginners and isolating chest.',
    instructions: [
      'Sit with back against the pad',
      'Grip the handles at chest level',
      'Push handles forward until arms are extended',
      'Return with control',
      'Keep feet flat on floor'
    ],
    tips: ['Adjust the seat for proper range of motion', 'Don\'t lock out elbows completely', 'Focus on chest contraction']
  },

  // BACK EXERCISES
  { 
    id: 'deadlift', 
    name: 'Deadlift', 
    muscles: ['back', 'legs', 'core'], 
    equipment: 'barbell',
    description: 'The ultimate full-body compound exercise for overall strength.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees, grip bar outside knees',
      'Keep back flat, chest up, shoulders over bar',
      'Drive through heels and extend hips and knees',
      'Stand tall, then reverse the movement'
    ],
    tips: ['Keep the bar close to your body', 'Don\'t round your lower back', 'Engage your lats']
  },
  { 
    id: 'pull-up', 
    name: 'Pull-Up', 
    muscles: ['back', 'arms'], 
    equipment: 'bodyweight',
    description: 'The gold standard for building a wide, powerful back.',
    instructions: [
      'Hang from a bar with hands slightly wider than shoulders',
      'Pull yourself up until chin is over the bar',
      'Squeeze your back muscles at the top',
      'Lower yourself with control',
      'Keep core engaged throughout'
    ],
    tips: ['Initiate the pull with your back, not arms', 'Don\'t swing', 'Focus on driving elbows down']
  },
  { 
    id: 'chin-up', 
    name: 'Chin-Up', 
    muscles: ['back', 'arms'], 
    equipment: 'bodyweight',
    description: 'A pull-up variation with underhand grip that emphasizes biceps.',
    instructions: [
      'Hang from a bar with palms facing you, shoulder-width apart',
      'Pull yourself up until chin clears the bar',
      'Squeeze back and biceps at the top',
      'Lower with control',
      'Keep your body straight'
    ],
    tips: ['Great for biceps development', 'Easier than regular pull-ups', 'Focus on pulling elbows to hips']
  },
  { 
    id: 'lat-pulldown', 
    name: 'Lat Pulldown', 
    muscles: ['back', 'arms'], 
    equipment: 'cable',
    description: 'A machine exercise that mimics the pull-up motion.',
    instructions: [
      'Sit at lat pulldown machine, secure thighs under pad',
      'Grip bar wider than shoulder-width',
      'Pull bar down to upper chest',
      'Squeeze lats at the bottom',
      'Return bar to starting position with control'
    ],
    tips: ['Lean back slightly as you pull', 'Don\'t use momentum', 'Focus on lat contraction']
  },
  { 
    id: 'barbell-row', 
    name: 'Barbell Row', 
    muscles: ['back', 'arms'], 
    equipment: 'barbell',
    description: 'A fundamental back exercise for building thickness.',
    instructions: [
      'Bend at hips with knees slightly bent, back flat',
      'Grip bar shoulder-width or slightly wider',
      'Pull bar to lower chest/upper abdomen',
      'Squeeze shoulder blades together at top',
      'Lower with control'
    ],
    tips: ['Keep your back flat throughout', 'Don\'t jerk the weight', 'Drive elbows back']
  },
  { 
    id: 'dumbbell-row', 
    name: 'Dumbbell Row', 
    muscles: ['back', 'arms'], 
    equipment: 'dumbbell',
    description: 'Single-arm back exercise that allows for full range of motion.',
    instructions: [
      'Place one knee and hand on a bench for support',
      'Hold dumbbell in other hand, arm extended',
      'Pull dumbbell to hip, squeezing back',
      'Lower with control',
      'Repeat on other side'
    ],
    tips: ['Keep your back flat and parallel to ground', 'Don\'t rotate hips', 'Pull with your back, not arm']
  },
  { 
    id: 'seated-cable-row', 
    name: 'Seated Cable Row', 
    muscles: ['back', 'arms'], 
    equipment: 'cable',
    description: 'Targets the middle back for thickness and detail.',
    instructions: [
      'Sit at cable row station with feet on platform',
      'Grip the handle with arms extended',
      'Pull handle to midsection',
      'Squeeze shoulder blades together',
      'Return with control'
    ],
    tips: ['Keep your back straight', 'Don\'t lean too far back', 'Focus on squeezing shoulder blades']
  },
  { 
    id: 't-bar-row', 
    name: 'T-Bar Row', 
    muscles: ['back', 'arms'], 
    equipment: 'machine',
    description: 'An excellent exercise for building a thick, wide back.',
    instructions: [
      'Straddle the T-bar or place feet on platform',
      'Grip the handles and bend at hips',
      'Pull the weight to your chest',
      'Squeeze back at the top',
      'Lower with control'
    ],
    tips: ['Keep your back flat', 'Don\'t round your spine', 'Use a straps for grip']
  },
  { 
    id: 'inverted-row', 
    name: 'Inverted Row', 
    muscles: ['back', 'arms'], 
    equipment: 'bodyweight',
    description: 'A horizontal pulling movement great for back thickness.',
    instructions: [
      'Lie under a bar set at waist height',
      'Grip bar with arms extended, body straight',
      'Pull your chest to the bar',
      'Squeeze shoulder blades together',
      'Lower with control'
    ],
    tips: ['Keep body in straight line', 'Pull to lower chest', 'Easier than pull-ups']
  },
  { 
    id: 'face-pull', 
    name: 'Face Pull', 
    muscles: ['back', 'shoulders'], 
    equipment: 'cable',
    description: 'Targets rear deltoids and upper back for shoulder health.',
    instructions: [
      'Set cable pulley to face height with rope attachment',
      'Grip rope with thumbs pointing back',
      'Pull rope toward face, spreading the rope',
      'Squeeze shoulder blades and hold',
      'Return with control'
    ],
    tips: ['External rotation at shoulder', 'Pull to forehead, not chest', 'Great for posture']
  },
  { 
    id: 'rack-pull', 
    name: 'Rack Pull', 
    muscles: ['back'], 
    equipment: 'barbell',
    description: 'A partial deadlift that emphasizes the upper back and traps.',
    instructions: [
      'Set up barbell in power rack at knee height',
      'Stand with feet hip-width, grip bar outside knees',
      'Drive hips forward and pull shoulders back',
      'Squeeze back at the top',
      'Lower with control'
    ],
    tips: ['Great for building a thick upper back', 'Don\'t use too much weight', 'Focus on the squeeze']
  },
  { 
    id: 'hyperextension', 
    name: 'Hyperextension', 
    muscles: ['back'], 
    equipment: 'machine',
    description: 'Targets the lower back and glutes for posterior chain.',
    instructions: [
      'Position hips on hyperextension pad, ankles under support',
      'Lower your torso until you feel a stretch in lower back',
      'Raise torso until body is in straight line',
      'Squeeze glutes at the top',
      'Control the descent'
    ],
    tips: ['Don\'t hyperextend (go too far back)', 'Cross arms over chest', 'Add weight for resistance']
  },

  // LEG EXERCISES
  { 
    id: 'squat', 
    name: 'Barbell Squat', 
    muscles: ['legs', 'core'], 
    equipment: 'barbell',
    description: 'The king of leg exercises for overall lower body development.',
    instructions: [
      'Position bar on upper back, feet shoulder-width apart',
      'Brace core and unrack the weight',
      'Bend knees and hips to lower until thighs parallel to floor',
      'Drive through heels to stand back up',
      'Keep chest up and back flat throughout'
    ],
    tips: ['Keep knees tracking over toes', 'Don\'t let knees cave inward', 'Go as deep as mobility allows']
  },
  { 
    id: 'front-squat', 
    name: 'Front Squat', 
    muscles: ['legs', 'core'], 
    equipment: 'barbell',
    description: 'A squat variation that emphasizes quads and requires good mobility.',
    instructions: [
      'Rest bar on front delts, elbows high',
      'Feet shoulder-width or slightly wider',
      'Descend while keeping chest up',
      'Go to at least parallel',
      'Drive up through heels'
    ],
    tips: ['Keep elbows high throughout', 'Requires good ankle and shoulder mobility', 'Great for quad emphasis']
  },
  { 
    id: 'leg-press', 
    name: 'Leg Press', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'A machine exercise for building leg mass with back support.',
    instructions: [
      'Sit in leg press machine, feet shoulder-width on platform',
      'Release the safety and lower the weight',
      'Lower until knees at 90 degrees',
      'Press through heels to extend legs',
      'Don\'t lock out knees completely'
    ],
    tips: ['Don\'t let lower back round off the pad', 'Vary foot position to target different muscles', 'Control the descent']
  },
  { 
    id: 'hack-squat', 
    name: 'Hack Squat', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'A machine squat variation that targets quads and glutes.',
    instructions: [
      'Position shoulders under pads, feet on platform',
      'Release safety and lower weight',
      'Descend until thighs are parallel to platform',
      'Press up through heels',
      'Keep back flat against pad'
    ],
    tips: ['Keep feet shoulder-width apart', 'Don\'t lock out knees', 'Great for quad isolation']
  },
  { 
    id: 'lunges', 
    name: 'Walking Lunges', 
    muscles: ['legs'], 
    equipment: 'dumbbell',
    description: 'A unilateral leg exercise for balance and leg development.',
    instructions: [
      'Stand with feet together',
      'Step forward and lower back knee toward floor',
      'Front thigh should be parallel to ground',
      'Push off front foot and step forward',
      'Alternate legs'
    ],
    tips: ['Keep torso upright', 'Don\'t let front knee pass toes', 'Can add dumbbells or barbell']
  },
  { 
    id: 'bulgarian-split-squat', 
    name: 'Bulgarian Split Squat', 
    muscles: ['legs'], 
    equipment: 'dumbbell',
    description: 'An advanced single-leg exercise for quad and glute development.',
    instructions: [
      'Place rear foot on bench, front foot forward',
      'Lower your body by bending front knee',
      'Go until rear knee nearly touches ground',
      'Drive through front heel to stand',
      'Keep torso upright throughout'
    ],
    tips: ['Keep front knee over toes', 'Can add weight for challenge', 'Great for fixing imbalances']
  },
  { 
    id: 'leg-extension', 
    name: 'Leg Extension', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'An isolation exercise for the quadriceps.',
    instructions: [
      'Sit in leg extension machine, pad on lower shins',
      'Extend legs until straight',
      'Squeeze quads at the top',
      'Lower with control',
      'Don\'t use momentum'
    ],
    tips: ['Don\'t use too much weight', 'Focus on quad squeeze', 'Good for quad isolation']
  },
  { 
    id: 'leg-curl', 
    name: 'Leg Curl', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'An isolation exercise for the hamstrings.',
    instructions: [
      'Lie face down on leg curl machine',
      'Position pad just above heels',
      'Curl heels toward glutes',
      'Squeeze hamstrings at top',
      'Lower with control'
    ],
    tips: ['Don\'t lift hips off the pad', 'Control the negative', 'Great for hamstring development']
  },
  { 
    id: 'seated-leg-curl', 
    name: 'Seated Leg Curl', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'A seated variation of the leg curl for hamstrings.',
    instructions: [
      'Sit in machine with pad on lower shins',
      'Curl weight down and toward chair',
      'Squeeze hamstrings',
      'Return with control',
      'Don\'t let hips rise'
    ],
    tips: ['Keep hips pressed into seat', 'Focus on stretch and contraction', 'Great alternative to lying curl']
  },
  { 
    id: 'romanian-deadlift', 
    name: 'Romanian Deadlift', 
    muscles: ['legs', 'back'], 
    equipment: 'barbell',
    description: 'A hip hinge movement that targets hamstrings and glutes.',
    instructions: [
      'Hold barbell at hip level, slight knee bend',
      'Push hips back while lowering bar',
      'Keep bar close to legs',
      'Feel stretch in hamstrings',
      'Drive hips forward to return'
    ],
    tips: ['Keep back flat', 'Don\'t bend knees much', 'Focus on hip hinge']
  },
  { 
    id: 'stiff-leg-deadlift', 
    name: 'Stiff Leg Deadlift', 
    muscles: ['legs', 'back'], 
    equipment: 'barbell',
    description: 'A deadlift variation with straight legs for hamstring emphasis.',
    instructions: [
      'Stand with feet hip-width, hold barbell',
      'Keep legs nearly straight as you lower bar',
      'Feel hamstring stretch',
      'Return by driving hips forward',
      'Keep back flat throughout'
    ],
    tips: ['Don\'t round lower back', 'Hamstring focused', 'Use straps for grip']
  },
  { 
    id: 'hip-thrust', 
    name: 'Hip Thrust', 
    muscles: ['legs'], 
    equipment: 'barbell',
    description: 'The best exercise for building glute strength and size.',
    instructions: [
      'Sit with upper back on bench, barbell over hips',
      'Drive through heels to lift hips',
      'Squeeze glutes at the top',
      'Lower with control',
      'Keep chin tucked'
    ],
    tips: ['Use a pad for comfort', 'Drive through heels, not toes', 'Powerful for glute development']
  },
  { 
    id: 'glute-bridge', 
    name: 'Glute Bridge', 
    muscles: ['legs'], 
    equipment: 'bodyweight',
    description: 'A bodyweight exercise to activate and build glutes.',
    instructions: [
      'Lie on back, knees bent, feet flat on floor',
      'Drive through heels to lift hips',
      'Squeeze glutes at the top',
      'Lower with control',
      'Keep core engaged'
    ],
    tips: ['Don\'t hyperextend lower back', 'Great for glute activation', 'Add band for resistance']
  },
  { 
    id: 'calf-raise-standing', 
    name: 'Standing Calf Raise', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'Targets the gastrocnemius (big calf muscle).',
    instructions: [
      'Stand on calf raise machine with balls of feet on platform',
      'Lower heels for a full stretch',
      'Rise up onto toes',
      'Squeeze calves at top',
      'Control the descent'
    ],
    tips: ['Full range of motion is key', 'Don\'t bounce', 'Vary toe position']
  },
  { 
    id: 'calf-raise-seated', 
    name: 'Seated Calf Raise', 
    muscles: ['legs'], 
    equipment: 'machine',
    description: 'Targets the soleus (lower calf muscle).',
    instructions: [
      'Sit with knees under pad, feet on platform',
      'Lower heels for stretch',
      'Rise up onto toes',
      'Squeeze at top',
      'Control the movement'
    ],
    tips: ['Keep constant tension', 'Don\'t use momentum', 'Good for soleus development']
  },
  { 
    id: 'step-up', 
    name: 'Step-Up', 
    muscles: ['legs'], 
    equipment: 'dumbbell',
    description: 'A functional exercise for leg strength and balance.',
    instructions: [
      'Stand in front of a sturdy box or bench',
      'Step up with one foot, driving through heel',
      'Bring other foot up to stand on box',
      'Step back down, one foot at a time',
      'Alternate legs'
    ],
    tips: ['Use a tall box for challenge', 'Don\'t push off the standing leg', 'Add dumbbells for resistance']
  },
  { 
    id: 'good-morning', 
    name: 'Good Morning', 
    muscles: ['back', 'legs'], 
    equipment: 'barbell',
    description: 'A hip hinge exercise for posterior chain development.',
    instructions: [
      'Position bar on upper back like a squat',
      'Slight knee bend, push hips back',
      'Lower torso until parallel to floor',
      'Keep back flat throughout',
      'Drive hips forward to return'
    ],
    tips: ['Keep bar fixed on back', 'Don\'t round your back', 'Use lighter weight to master form']
  },

  // SHOULDER EXERCISES
  { 
    id: 'overhead-press', 
    name: 'Overhead Press', 
    muscles: ['shoulders', 'arms'], 
    equipment: 'barbell',
    description: 'The fundamental pressing movement for shoulder development.',
    instructions: [
      'Stand with barbell at shoulder level',
      'Grip slightly wider than shoulders',
      'Press bar overhead to full extension',
      'Lower with control to start position',
      'Keep core tight throughout'
    ],
    tips: ['Don\'t lean back excessively', 'Keep wrists straight', 'Drive through shoulders']
  },
  { 
    id: 'dumbbell-shoulder-press', 
    name: 'Dumbbell Shoulder Press', 
    muscles: ['shoulders', 'arms'], 
    equipment: 'dumbbell',
    description: 'A free-weight pressing exercise for shoulders.',
    instructions: [
      'Sit or stand with dumbbells at shoulder height',
      'Press dumbbells overhead until arms extended',
      'Bring dumbbells together at top',
      'Lower with control',
      'Keep core engaged'
    ],
    tips: ['Can do seated or standing', 'Don\'t swing the weights', 'Full range of motion']
  },
  { 
    id: 'arnold-press', 
    name: 'Arnold Press', 
    muscles: ['shoulders'], 
    equipment: 'dumbbell',
    description: 'Named after Arnold Schwarzenegger, targets all shoulder heads.',
    instructions: [
      'Start with dumbbells at shoulder height, palms facing you',
      'As you press up, rotate palms forward',
      'Full extension at the top',
      'Reverse the motion on the way down',
      'Keep controlled throughout'
    ],
    tips: ['The rotation is key', 'Start with lighter weight', 'Great for overall shoulder development']
  },
  { 
    id: 'lateral-raise', 
    name: 'Lateral Raise', 
    muscles: ['shoulders'], 
    equipment: 'dumbbell',
    description: 'An isolation exercise for the side deltoids.',
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until parallel to floor',
      'Keep slight bend in elbows',
      'Lower with control',
      'Don\'t swing weights'
    ],
    tips: ['Don\'t use momentum', 'Lead with elbows', 'Focus on side delt squeeze']
  },
  { 
    id: 'front-raise', 
    name: 'Front Raise', 
    muscles: ['shoulders'], 
    equipment: 'dumbbell',
    description: 'An isolation exercise for the front deltoids.',
    instructions: [
      'Stand with dumbbells in front of thighs',
      'Raise one or both dumbbells to shoulder height',
      'Keep arms nearly straight',
      'Lower with control',
      'Don\'t swing'
    ],
    tips: ['Can alternate or do both together', 'Keep core tight', 'Don\'t go above shoulder height']
  },
  { 
    id: 'reverse-fly', 
    name: 'Reverse Fly', 
    muscles: ['shoulders', 'back'], 
    equipment: 'dumbbell',
    description: 'Targets rear deltoids and upper back.',
    instructions: [
      'Bend forward at hips with dumbbells hanging',
      'Raise arms out to sides',
      'Squeeze shoulder blades together',
      'Lower with control',
      'Keep slight elbow bend'
    ],
    tips: ['Don\'t use momentum', 'Great for posture', 'Focus on rear delt squeeze']
  },
  { 
    id: 'upright-row', 
    name: 'Upright Row', 
    muscles: ['shoulders'], 
    equipment: 'barbell',
    description: 'Targets shoulders and traps with a pulling motion.',
    instructions: [
      'Stand with barbell or dumbbells in front of thighs',
      'Pull elbows up and out to shoulder height',
      'Keep bar close to body',
      'Lower with control',
      'Don\'t pull too high'
    ],
    tips: ['Don\'t pull above shoulder level', 'Can strain shoulders if too heavy', 'Use moderate weight']
  },
  { 
    id: 'machine-shoulder-press', 
    name: 'Machine Shoulder Press', 
    muscles: ['shoulders', 'arms'], 
    equipment: 'machine',
    description: 'A machine exercise for shoulder development with stability.',
    instructions: [
      'Sit in machine with back against pad',
      'Grip handles at shoulder level',
      'Press handles overhead',
      'Lower with control',
      'Don\'t lock out elbows'
    ],
    tips: ['Good for beginners', 'Keep back against pad', 'Focus on shoulder contraction']
  },
  { 
    id: 'cable-lateral-raise', 
    name: 'Cable Lateral Raise', 
    muscles: ['shoulders'], 
    equipment: 'cable',
    description: 'Provides constant tension on the side deltoids.',
    instructions: [
      'Stand next to low cable pulley',
      'Grab handle with far hand',
      'Raise arm out to side',
      'Squeeze at the top',
      'Lower with control'
    ],
    tips: ['Constant tension throughout', 'Lean slightly into the cable', 'Great for side delt isolation']
  },
  { 
    id: 'shrug', 
    name: 'Barbell Shrug', 
    muscles: ['shoulders'], 
    equipment: 'barbell',
    description: 'Directly targets the trapezius muscles.',
    instructions: [
      'Hold barbell with arms at sides',
      'Shrug shoulders straight up',
      'Squeeze traps at top',
      'Lower with control',
      'Don\'t roll shoulders'
    ],
    tips: ['Don\'t use momentum', 'Hold the squeeze', 'Can use dumbbells or barbell']
  },

  // ARM EXERCISES
  { 
    id: 'bicep-curl', 
    name: 'Barbell Bicep Curl', 
    muscles: ['arms'], 
    equipment: 'barbell',
    description: 'The classic bicep exercise for arm thickness.',
    instructions: [
      'Stand with barbell, arms extended, palms up',
      'Curl bar up toward shoulders',
      'Squeeze biceps at top',
      'Lower with control',
      'Don\'t swing body'
    ],
    tips: ['Keep elbows stationary', 'Don\'t swing', 'Full range of motion']
  },
  { 
    id: 'dumbbell-curl', 
    name: 'Dumbbell Bicep Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Allows for full range of motion and independent arm work.',
    instructions: [
      'Stand with dumbbells at sides, palms forward',
      'Curl dumbbells up to shoulders',
      'Squeeze at the top',
      'Lower with control',
      'Don\'t swing'
    ],
    tips: ['Supinate wrist at the top', 'Can alternate or together', 'Focus on the squeeze']
  },
  { 
    id: 'hammer-curl', 
    name: 'Hammer Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Targets biceps and brachialis with neutral grip.',
    instructions: [
      'Hold dumbbells at sides with palms facing each other',
      'Curl weights up to shoulders',
      'Keep palms facing each other throughout',
      'Squeeze at top',
      'Lower with control'
    ],
    tips: ['Great for brachialis development', 'Neutral grip is easier on wrists', 'Full range of motion']
  },
  { 
    id: 'preacher-curl', 
    name: 'Preacher Curl', 
    muscles: ['arms'], 
    equipment: 'machine',
    description: 'Provides strict form for bicep isolation.',
    instructions: [
      'Rest arms on preacher bench pad',
      'Hold barbell or dumbbells with full extension',
      'Curl weight up toward shoulders',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: ['Don\'t let arms drift', 'Full stretch at bottom', 'Great for bicep isolation']
  },
  { 
    id: 'incline-curl', 
    name: 'Incline Dumbbell Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Stretches biceps under load for greater development.',
    instructions: [
      'Sit on incline bench with dumbbells hanging',
      'Curl dumbbells up to shoulders',
      'Keep upper arms stationary',
      'Squeeze at top',
      'Lower with control'
    ],
    tips: ['Great stretch at bottom', 'Don\'t swing', 'Full range of motion']
  },
  { 
    id: 'concentration-curl', 
    name: 'Concentration Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Maximum bicep isolation for peak development.',
    instructions: [
      'Sit with elbow braced against inner thigh',
      'Hold dumbbell with arm extended',
      'Curl weight up to shoulder',
      'Squeeze bicep hard at top',
      'Lower with control'
    ],
    tips: ['Don\'t move elbow', 'Focus on the squeeze', 'Great for bicep peak']
  },
  { 
    id: 'cable-curl', 
    name: 'Cable Bicep Curl', 
    muscles: ['arms'], 
    equipment: 'cable',
    description: 'Provides constant tension throughout the movement.',
    instructions: [
      'Stand at cable machine with straight bar or rope',
      'Curl bar toward shoulders',
      'Keep elbows at sides',
      'Squeeze at top',
      'Return with control'
    ],
    tips: ['Constant tension is key', 'Can use various attachments', 'Smooth movement']
  },
  { 
    id: 'tricep-pushdown', 
    name: 'Tricep Pushdown', 
    muscles: ['arms'], 
    equipment: 'cable',
    description: 'The primary cable exercise for triceps.',
    instructions: [
      'Stand at cable with bar or rope at chest height',
      'Push down until arms are fully extended',
      'Keep elbows at sides',
      'Squeeze triceps at bottom',
      'Return with control'
    ],
    tips: ['Don\'t let elbows flare', 'Keep upper arms stationary', 'Focus on tricep squeeze']
  },
  { 
    id: 'tricep-dip', 
    name: 'Tricep Dip', 
    muscles: ['arms', 'chest'], 
    equipment: 'bodyweight',
    description: 'A bodyweight exercise for tricep development.',
    instructions: [
      'Grip parallel bars and lift body',
      'Lower body by bending elbows',
      'Keep elbows close to body',
      'Push back up to full extension',
      'Don\'t lock out completely'
    ],
    tips: ['Keep body upright for tricep focus', 'Lean forward for chest', 'Add weight for progression']
  },
  { 
    id: 'skull-crusher', 
    name: 'Skull Crusher', 
    muscles: ['arms'], 
    equipment: 'barbell',
    description: 'Lying tricep extension for mass building.',
    instructions: [
      'Lie on bench with barbell extended over chest',
      'Lower bar toward forehead by bending elbows',
      'Keep upper arms stationary',
      'Extend arms back to start',
      'Control the movement'
    ],
    tips: ['Use EZ bar for comfort', 'Don\'t actually hit skull', 'Great for tricep mass']
  },
  { 
    id: 'overhead-tricep-extension', 
    name: 'Overhead Tricep Extension', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Stretches and works all three heads of triceps.',
    instructions: [
      'Hold dumbbell or barbell overhead with both hands',
      'Lower weight behind head by bending elbows',
      'Keep upper arms close to head',
      'Extend back to start',
      'Control throughout'
    ],
    tips: ['Great for long head of tricep', 'Can do single or double arm', 'Full range of motion']
  },
  { 
    id: 'tricep-kickback', 
    name: 'Tricep Kickback', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'An isolation exercise for triceps with dumbbells.',
    instructions: [
      'Bend at hips with dumbbells in hands',
      'Extend arms straight back',
      'Squeeze triceps at top',
      'Return to starting position',
      'Keep upper arm stationary'
    ],
    tips: ['Don\'t swing', 'Focus on squeeze', 'Good finishing exercise']
  },
  { 
    id: 'close-grip-bench', 
    name: 'Close Grip Bench Press', 
    muscles: ['arms', 'chest'], 
    equipment: 'barbell',
    description: 'A compound tricep exercise with barbell.',
    instructions: [
      'Lie on bench, grip bar with hands shoulder-width or closer',
      'Lower bar to lower chest',
      'Keep elbows close to body',
      'Press back up',
      'Focus on triceps'
    ],
    tips: ['Don\'t go too narrow', 'Great for tricep strength', 'Keep elbows tucked']
  },
  { 
    id: 'wrist-curl', 
    name: 'Wrist Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Strengthens the forearms and wrist flexors.',
    instructions: [
      'Sit with forearm on thigh, wrist over knee',
      'Hold dumbbell with palm up',
      'Curl wrist upward',
      'Lower with control',
      'Repeat'
    ],
    tips: ['Support forearm properly', 'Don\'t use heavy weight', 'Full range of motion']
  },
  { 
    id: 'reverse-wrist-curl', 
    name: 'Reverse Wrist Curl', 
    muscles: ['arms'], 
    equipment: 'dumbbell',
    description: 'Strengthens wrist extensors for balanced forearms.',
    instructions: [
      'Sit with forearm on thigh, wrist over knee',
      'Hold dumbbell with palm down',
      'Lift wrist upward',
      'Lower with control',
      'Repeat'
    ],
    tips: ['Don\'t use heavy weight', 'Full motion', 'Great for forearm balance']
  },

  // CORE EXERCISES
  { 
    id: 'plank', 
    name: 'Plank', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'The fundamental core stability exercise.',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage core and glutes',
      'Hold position',
      'Don\'t let hips sag or pike'
    ],
    tips: ['Don\'t hold breath', 'Squeeze glutes', 'Keep neck neutral']
  },
  { 
    id: 'crunch', 
    name: 'Crunch', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A basic abdominal exercise for rectus abdominis.',
    instructions: [
      'Lie on back, knees bent, hands behind head',
      'Curl shoulders off the floor',
      'Contract abs at top',
      'Lower with control',
      'Don\'t pull on neck'
    ],
    tips: ['Focus on abs, not hip flexors', 'Don\'t full sit-up', 'Small range is okay']
  },
  { 
    id: 'sit-up', 
    name: 'Sit-Up', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A full-range abdominal exercise.',
    instructions: [
      'Lie on back, knees bent',
      'Curl all the way up to sitting position',
      'Contract abs at top',
      'Lower with control',
      'Don\'t pull on neck'
    ],
    tips: ['Can add weight for resistance', 'Keep core tight', 'Control the descent']
  },
  { 
    id: 'bicycle-crunch', 
    name: 'Bicycle Crunch', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'Targets obliques and rectus abdominis with rotation.',
    instructions: [
      'Lie on back, hands behind head',
      'Lift shoulders and bring elbow to opposite knee',
      'Alternate sides in a pedaling motion',
      'Keep lower back pressed to floor',
      'Don\'t pull on neck'
    ],
    tips: ['Full rotation is key', 'Don\'t rush', 'Great for obliques']
  },
  { 
    id: 'leg-raise', 
    name: 'Lying Leg Raise', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'Targets lower abs with leg movement.',
    instructions: [
      'Lie on back, legs straight',
      'Lift legs to 90 degrees',
      'Lower with control',
      'Keep lower back pressed to floor',
      'Don\'t swing'
    ],
    tips: ['Keep core tight', 'Bend knees if needed', 'Focus on lower abs']
  },
  { 
    id: 'hanging-leg-raise', 
    name: 'Hanging Leg Raise', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'Advanced core exercise for difficult abs.',
    instructions: [
      'Hang from pull-up bar',
      'Raise legs to parallel or higher',
      'Keep legs straight or bent',
      'Lower with control',
      'Don\'t swing'
    ],
    tips: ['Bend knees to start', 'Control the swing', 'Great for lower abs']
  },
  { 
    id: 'russian-twist', 
    name: 'Russian Twist', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'Targets obliques with rotation.',
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Hold weight at chest or Medicine Ball',
      'Rotate torso side to side',
      'Keep feet on floor for easier',
      'Don\'t round lower back'
    ],
    tips: ['Keep chest up', 'Full rotation', 'Can lift feet for challenge']
  },
  { 
    id: 'mountain-climber', 
    name: 'Mountain Climber', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A dynamic core exercise with cardio benefits.',
    instructions: [
      'Start in push-up position',
      'Drive one knee toward chest',
      'Quickly switch legs',
      'Keep hips low',
      'Continue alternating'
    ],
    tips: ['Keep core engaged', 'Fast pace', 'Great for conditioning']
  },
  { 
    id: 'dead-bug', 
    name: 'Dead Bug', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A safe core exercise that trains anti-extension.',
    instructions: [
      'Lie on back with arms extended to ceiling',
      'Lift legs with knees at 90 degrees',
      'Lower opposite arm and leg',
      'Return to start',
      'Keep lower back pressed to floor'
    ],
    tips: ['Don\'t let lower back arch', 'Control the movement', 'Great for core stability']
  },
  { 
    id: 'ab-wheel-rollout', 
    name: 'Ab Wheel Rollout', 
    muscles: ['core'], 
    equipment: 'other',
    description: 'An advanced core exercise for deep ab engagement.',
    instructions: [
      'Kneel with ab wheel in front',
      'Roll wheel forward, extending body',
      'Go as far as you can control',
      'Pull wheel back to start',
      'Keep core tight throughout'
    ],
    tips: ['Keep core tight, not rounded back', 'Start with small range', 'Very challenging']
  },
  { 
    id: 'cable-woodchop', 
    name: 'Cable Woodchop', 
    muscles: ['core'], 
    equipment: 'cable',
    description: 'Rotational core exercise using cable machine.',
    instructions: [
      'Set cable to low position',
      'Grip handle with both hands',
      'Rotate across body to high opposite side',
      'Control the movement',
      'Return with control'
    ],
    tips: ['Great for rotational strength', 'Don\'t use momentum', 'Both directions']
  },
  { 
    id: 'side-plank', 
    name: 'Side Plank', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'Targets the obliques and lateral core.',
    instructions: [
      'Lie on side with forearm on floor',
      'Lift hips to create straight line',
      'Hold position',
      'Keep core engaged',
      'Don\'t let hips drop'
    ],
    tips: ['Don\'t sink hips', 'Stack feet or stagger', 'Hold for time']
  },
  { 
    id: 'v-up', 
    name: 'V-Up', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'An advanced crunch with leg extension.',
    instructions: [
      'Lie flat on back, arms extended overhead',
      'Simultaneously lift legs and torso',
      'Touch toes at top (V position)',
      'Lower with control',
      'Don\'t round lower back'
    ],
    tips: ['Keep legs straight', 'Full range', 'Very challenging']
  },
  { 
    id: 'flutter-kick', 
    name: 'Flutter Kick', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A dynamic core exercise for lower abs.',
    instructions: [
      'Lie on back, legs straight',
      'Lift legs slightly off floor',
      'Alternate kicking legs up and down',
      'Keep lower back pressed down',
      'Don\'t let hips rotate'
    ],
    tips: ['Keep core tight', 'Small kicks', 'Great for lower abs']
  },
  { 
    id: 'hollow-body', 
    name: 'Hollow Body Hold', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A gymnastics core exercise for total core engagement.',
    instructions: [
      'Lie on back, arms overhead',
      'Lift shoulders and legs off floor',
      'Create a banana or hollow shape',
      'Hold position',
      'Keep lower back pressed to floor'
    ],
    tips: ['Press lower back to floor', 'Point toes', 'Great for athletes']
  },
  { 
    id: 'captain-chair-leg-raise', 
    name: 'Captain\'s Chair Leg Raise', 
    muscles: ['core'], 
    equipment: 'machine',
    description: 'An assisted hanging leg raise using machine.',
    instructions: [
      'Sit in captain\'s chair with forearms on pads',
      'Lift legs to parallel or higher',
      'Squeeze abs at top',
      'Lower with control',
      'Don\'t swing'
    ],
    tips: ['Control the descent', 'Full range', 'Great for lower abs']
  },
  { 
    id: 'tuck-raise', 
    name: 'Tuck Raise', 
    muscles: ['core'], 
    equipment: 'bodyweight',
    description: 'A hanging exercise with knee tuck.',
    instructions: [
      'Hang from pull-up bar',
      'Bring knees to chest (tuck position)',
      'Squeeze abs',
      'Lower with control',
      'Don\'t swing'
    ],
    tips: ['Control the swing', 'Full tuck for challenge', 'Great for abs']
  },
];

export const muscleGroups: { value: string; label: string }[] = [
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'legs', label: 'Legs' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'arms', label: 'Arms' },
  { value: 'core', label: 'Core' },
];
