// ==================== PCM × TECH GAME LEVELS ====================
// Complete journey from Class 11 Chapter 1 to Grand Master

const GAME_LEVELS = {
  class11: {
    name: "Class 11 Journey",
    icon: "🎓",
    description: "Begin your PCM × Tech adventure",
    totalLevels: 45,
    levels: [
      // PHYSICS LEVELS (15 levels)
      {
        id: 1,
        title: "Motion Basics × Programming Logic",
        subject: "Physics",
        chapter: "Kinematics",
        difficulty: "Beginner",
        xp: 100,
        concepts: ["Distance & Displacement", "Speed & Velocity", "Variables & Data Types"],
        techBlend: "Learn how motion equations are like programming loops - both follow step-by-step logic!",
        challenge: {
          type: "quiz",
          question: "A car moves 100m east, then 60m west. Write code to calculate displacement.",
          options: [
            "displacement = 100 + 60",
            "displacement = 100 - 60",
            "displacement = abs(100 - 60)",
            "displacement = (100 + 60) / 2"
          ],
          correct: 1,
          explanation: "Displacement = Final - Initial = 100 - 60 = 40m east. In code: displacement = 100 - 60"
        },
        unlocks: "Motion Simulator Tool"
      },
      {
        id: 2,
        title: "Acceleration × Loops",
        subject: "Physics",
        chapter: "Kinematics",
        difficulty: "Beginner",
        xp: 120,
        concepts: ["Acceleration", "Equations of Motion", "For Loops", "While Loops"],
        techBlend: "Acceleration changes velocity over time - just like loops change variables in each iteration!",
        challenge: {
          type: "code",
          question: "Create a function that calculates final velocity: v = u + at",
          starter: "function finalVelocity(u, a, t) {\n  // Your code here\n}",
          solution: "function finalVelocity(u, a, t) {\n  return u + a * t;\n}",
          testCases: [
            { input: [0, 10, 5], output: 50 },
            { input: [20, 5, 3], output: 35 }
          ]
        },
        unlocks: "Projectile Motion Game"
      },
      {
        id: 3,
        title: "Projectile Motion × Canvas Graphics",
        subject: "Physics",
        chapter: "Kinematics",
        difficulty: "Intermediate",
        xp: 150,
        concepts: ["2D Motion", "Trajectory", "HTML5 Canvas", "Animation"],
        techBlend: "Draw projectile paths using Canvas - visualize physics with code!",
        challenge: {
          type: "project",
          question: "Build a projectile motion simulator that shows the trajectory",
          requirements: [
            "Take angle and velocity as input",
            "Calculate range and max height",
            "Draw trajectory on canvas",
            "Show time of flight"
          ]
        },
        unlocks: "Physics Visualizer Pro"
      },
      {
        id: 4,
        title: "Newton's Laws × Conditional Logic",
        subject: "Physics",
        chapter: "Laws of Motion",
        difficulty: "Beginner",
        xp: 130,
        concepts: ["Force = ma", "Friction", "If-Else Statements"],
        techBlend: "Forces act conditionally - if friction > applied force, object won't move!",
        challenge: {
          type: "quiz",
          question: "A 5kg box needs 30N to overcome friction. Applied force is 25N. Will it move?",
          options: ["Yes", "No", "Depends on surface", "Need more info"],
          correct: 1,
          explanation: "Applied force (25N) < Friction (30N), so box won't move. In code: if (appliedForce > friction) { move(); }"
        }
      },
      {
        id: 5,
        title: "Work & Energy × Functions",
        subject: "Physics",
        chapter: "Work, Energy & Power",
        difficulty: "Intermediate",
        xp: 140,
        concepts: ["Work = F·d", "Kinetic Energy", "Potential Energy", "Functions", "Return Values"],
        techBlend: "Energy calculations are perfect for functions - input values, return energy!",
        challenge: {
          type: "code",
          question: "Create functions for KE and PE, then calculate total mechanical energy",
          starter: "function kineticEnergy(m, v) {\n  // KE = 0.5 * m * v²\n}\n\nfunction potentialEnergy(m, g, h) {\n  // PE = m * g * h\n}",
          testCases: [
            { input: { m: 10, v: 5, g: 10, h: 20 }, output: 2125 }
          ]
        }
      },

      // CHEMISTRY LEVELS (15 levels)
      {
        id: 16,
        title: "Atomic Structure × Data Structures",
        subject: "Chemistry",
        chapter: "Atomic Structure",
        difficulty: "Beginner",
        xp: 110,
        concepts: ["Protons, Neutrons, Electrons", "Objects & Arrays"],
        techBlend: "Atoms are like objects - they have properties (protons, neutrons, electrons)!",
        challenge: {
          type: "code",
          question: "Create an object to represent a Hydrogen atom",
          starter: "const hydrogen = {\n  // Add properties\n};",
          solution: "const hydrogen = {\n  name: 'Hydrogen',\n  symbol: 'H',\n  atomicNumber: 1,\n  protons: 1,\n  neutrons: 0,\n  electrons: 1\n};"
        }
      },
      {
        id: 17,
        title: "Periodic Table × JSON Database",
        subject: "Chemistry",
        chapter: "Periodic Table",
        difficulty: "Intermediate",
        xp: 160,
        concepts: ["Element Properties", "JSON", "Database Queries"],
        techBlend: "Build an interactive periodic table using JSON - search elements by properties!",
        challenge: {
          type: "project",
          question: "Create a searchable periodic table",
          requirements: [
            "Store elements in JSON format",
            "Search by name, symbol, or atomic number",
            "Display element properties",
            "Color-code by element type"
          ]
        },
        unlocks: "Periodic Table Explorer"
      },
      {
        id: 18,
        title: "Chemical Bonding × Graph Theory",
        subject: "Chemistry",
        chapter: "Chemical Bonding",
        difficulty: "Advanced",
        xp: 180,
        concepts: ["Ionic & Covalent Bonds", "Graphs & Networks"],
        techBlend: "Molecules are graphs - atoms are nodes, bonds are edges!",
        challenge: {
          type: "code",
          question: "Represent a water molecule (H2O) as a graph",
          starter: "class Molecule {\n  constructor() {\n    this.atoms = [];\n    this.bonds = [];\n  }\n}",
          requirements: [
            "Add 3 atoms (1 O, 2 H)",
            "Add 2 bonds (O-H, O-H)",
            "Calculate total electrons"
          ]
        }
      },
      {
        id: 19,
        title: "Organic Chemistry × String Manipulation",
        subject: "Chemistry",
        chapter: "Organic Chemistry",
        difficulty: "Intermediate",
        xp: 150,
        concepts: ["Hydrocarbons", "Nomenclature", "String Methods"],
        techBlend: "Chemical formulas are strings - parse and manipulate them with code!",
        challenge: {
          type: "code",
          question: "Parse a chemical formula and count atoms",
          starter: "function parseFormula(formula) {\n  // Parse 'H2O' to {H: 2, O: 1}\n}",
          testCases: [
            { input: "H2O", output: { H: 2, O: 1 } },
            { input: "C6H12O6", output: { C: 6, H: 12, O: 6 } }
          ]
        }
      },
      {
        id: 20,
        title: "Chemical Reactions × State Management",
        subject: "Chemistry",
        chapter: "Chemical Reactions",
        difficulty: "Advanced",
        xp: 170,
        concepts: ["Reactants & Products", "State Changes", "React/Vue State"],
        techBlend: "Chemical reactions change state - like state management in web apps!",
        challenge: {
          type: "project",
          question: "Build a reaction simulator that shows before/after states",
          requirements: [
            "Input reactants",
            "Apply reaction rules",
            "Show products",
            "Balance equation automatically"
          ]
        },
        unlocks: "Reaction Predictor Tool"
      },

      // MATHS LEVELS (15 levels)
      {
        id: 31,
        title: "Sets × Arrays",
        subject: "Maths",
        chapter: "Sets & Relations",
        difficulty: "Beginner",
        xp: 100,
        concepts: ["Set Operations", "Array Methods"],
        techBlend: "Sets in maths = Sets in JavaScript - union, intersection, difference!",
        challenge: {
          type: "code",
          question: "Implement set union using arrays",
          starter: "function union(setA, setB) {\n  // Return union of two sets\n}",
          solution: "function union(setA, setB) {\n  return [...new Set([...setA, ...setB])];\n}",
          testCases: [
            { input: [[1,2,3], [3,4,5]], output: [1,2,3,4,5] }
          ]
        }
      },
      {
        id: 32,
        title: "Functions × JavaScript Functions",
        subject: "Maths",
        chapter: "Functions",
        difficulty: "Beginner",
        xp: 120,
        concepts: ["Domain & Range", "Function Composition", "Higher-Order Functions"],
        techBlend: "Math functions = Code functions - both take input and return output!",
        challenge: {
          type: "code",
          question: "Implement function composition: (f ∘ g)(x) = f(g(x))",
          starter: "function compose(f, g) {\n  return function(x) {\n    // Your code\n  };\n}",
          solution: "function compose(f, g) {\n  return function(x) {\n    return f(g(x));\n  };\n}"
        }
      },
      {
        id: 33,
        title: "Trigonometry × Game Development",
        subject: "Maths",
        chapter: "Trigonometry",
        difficulty: "Intermediate",
        xp: 150,
        concepts: ["Sin, Cos, Tan", "Angles", "Game Physics"],
        techBlend: "Trig is essential for game dev - calculate positions, rotations, trajectories!",
        challenge: {
          type: "project",
          question: "Create a circular motion animation using sin/cos",
          requirements: [
            "Object moves in circle",
            "Use Math.sin() and Math.cos()",
            "Control speed with angle increment",
            "Add trail effect"
          ]
        },
        unlocks: "Trig Visualizer"
      },
      {
        id: 34,
        title: "Calculus × Rate of Change",
        subject: "Maths",
        chapter: "Limits & Derivatives",
        difficulty: "Advanced",
        xp: 180,
        concepts: ["Derivatives", "Rate of Change", "Animation Timing"],
        techBlend: "Derivatives measure rate of change - crucial for smooth animations!",
        challenge: {
          type: "code",
          question: "Implement numerical differentiation",
          starter: "function derivative(f, x, h = 0.0001) {\n  // f'(x) ≈ (f(x+h) - f(x)) / h\n}",
          testCases: [
            { input: { f: x => x*x, x: 3 }, output: 6 } // d/dx(x²) at x=3 is 6
          ]
        }
      },
      {
        id: 35,
        title: "Probability × Random Numbers",
        subject: "Maths",
        chapter: "Probability",
        difficulty: "Intermediate",
        xp: 140,
        concepts: ["Probability Theory", "Random Events", "Math.random()"],
        techBlend: "Simulate probability experiments with code - run thousands of trials instantly!",
        challenge: {
          type: "project",
          question: "Simulate coin flips and verify probability approaches 0.5",
          requirements: [
            "Flip coin N times",
            "Count heads and tails",
            "Calculate probability",
            "Show convergence graph"
          ]
        },
        unlocks: "Probability Simulator"
      }
    ]
  },

  class12: {
    name: "Class 12 Mastery",
    icon: "🚀",
    description: "Advanced PCM × Tech challenges",
    totalLevels: 45,
    levels: [
      // Similar structure for Class 12
      // Physics: Electrostatics, Current Electricity, Magnetism, etc.
      // Chemistry: Solutions, Electrochemistry, Chemical Kinetics, etc.
      // Maths: Integration, Differential Equations, Vectors, etc.
    ]
  },

  grandMaster: {
    name: "Grand Master Challenges",
    icon: "👑",
    description: "Ultimate PCM × Tech fusion",
    totalLevels: 30,
    levels: [
      {
        id: 91,
        title: "Build a Physics Engine",
        subject: "All",
        difficulty: "Master",
        xp: 1000,
        concepts: ["All Physics", "Advanced Programming", "Game Development"],
        techBlend: "Create a complete 2D physics engine from scratch!",
        challenge: {
          type: "mega-project",
          requirements: [
            "Implement collision detection",
            "Add gravity and friction",
            "Support multiple objects",
            "Real-time simulation",
            "Adjustable parameters"
          ],
          timeEstimate: "20-30 hours"
        },
        unlocks: "Physics Engine Certificate"
      },
      {
        id: 92,
        title: "Molecular Dynamics Simulator",
        subject: "All",
        difficulty: "Master",
        xp: 1000,
        concepts: ["Chemistry", "Physics", "3D Graphics"],
        techBlend: "Simulate molecular interactions in 3D!",
        challenge: {
          type: "mega-project",
          requirements: [
            "3D molecule visualization",
            "Calculate bond energies",
            "Simulate reactions",
            "Temperature effects",
            "Export data"
          ]
        },
        unlocks: "Chemistry Simulator Pro"
      },
      {
        id: 93,
        title: "Mathematical Modeling Platform",
        subject: "All",
        difficulty: "Master",
        xp: 1000,
        concepts: ["Advanced Maths", "Data Visualization", "Algorithms"],
        techBlend: "Build a platform to model real-world problems with math!",
        challenge: {
          type: "mega-project",
          requirements: [
            "Solve differential equations",
            "Plot 3D graphs",
            "Optimization algorithms",
            "Statistical analysis",
            "Export reports"
          ]
        },
        unlocks: "Math Modeling Certificate"
      }
    ]
  }
};

// Calculate total XP and levels
let totalXP = 0;
let totalLevels = 0;

Object.values(GAME_LEVELS).forEach(section => {
  section.levels.forEach(level => {
    totalXP += level.xp;
    totalLevels++;
  });
});

console.log(`🎮 Game System Loaded:`);
console.log(`📊 Total Levels: ${totalLevels}`);
console.log(`⭐ Total XP Available: ${totalXP}`);
console.log(`🏆 Sections: Class 11, Class 12, Grand Master`);
