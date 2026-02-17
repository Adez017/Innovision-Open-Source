// Project-Based Learning & Capstone Management
import { db } from "./firebase";
import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, addDoc } from "firebase/firestore";

/**
 * Project Templates
 */
export const projectTemplates = [
  {
    id: "web-app",
    title: "Full-Stack Web Application",
    description: "Build a complete web application with frontend and backend",
    difficulty: "intermediate",
    duration: "8-12 weeks",
    skills: ["React", "Node.js", "Database", "API Design"],
    milestones: [
      { title: "Project Planning & Design", duration: "1 week" },
      { title: "Backend API Development", duration: "3 weeks" },
      { title: "Frontend Development", duration: "3 weeks" },
      { title: "Testing & Deployment", duration: "2 weeks" },
      { title: "Documentation & Presentation", duration: "1 week" }
    ],
    deliverables: ["Source Code", "Documentation", "Live Demo", "Presentation"]
  },
  {
    id: "ml-project",
    title: "Machine Learning Model",
    description: "Develop and deploy a machine learning solution",
    difficulty: "advanced",
    duration: "10-14 weeks",
    skills: ["Python", "ML Algorithms", "Data Analysis", "Model Deployment"],
    milestones: [
      { title: "Problem Definition & Data Collection", duration: "2 weeks" },
      { title: "Data Preprocessing & EDA", duration: "2 weeks" },
      { title: "Model Development", duration: "4 weeks" },
      { title: "Model Evaluation & Tuning", duration: "2 weeks" },
      { title: "Deployment & Documentation", duration: "2 weeks" }
    ],
    deliverables: ["Trained Model", "Analysis Report", "API/Interface", "Documentation"]
  },
  {
    id: "mobile-app",
    title: "Mobile Application",
    description: "Create a cross-platform mobile application",
    difficulty: "intermediate",
    duration: "8-10 weeks",
    skills: ["React Native", "Mobile UI/UX", "API Integration", "App Store Deployment"],
    milestones: [
      { title: "UI/UX Design", duration: "2 weeks" },
      { title: "Core Features Development", duration: "4 weeks" },
      { title: "Testing & Optimization", duration: "2 weeks" },
      { title: "Deployment & Launch", duration: "2 weeks" }
    ],
    deliverables: ["App Binary", "Source Code", "User Guide", "Demo Video"]
  },
  {
    id: "research-paper",
    title: "Research & Analysis Project",
    description: "Conduct research and produce a comprehensive analysis",
    difficulty: "beginner",
    duration: "6-8 weeks",
    skills: ["Research Methods", "Data Analysis", "Technical Writing", "Presentation"],
    milestones: [
      { title: "Literature Review", duration: "2 weeks" },
      { title: "Data Collection", duration: "2 weeks" },
      { title: "Analysis & Findings", duration: "2 weeks" },
      { title: "Paper Writing & Review", duration: "2 weeks" }
    ],
    deliverables: ["Research Paper", "Data Analysis", "Presentation Slides"]
  }
];

/**
 * Create a new project
 */
export async function createProject(userEmail, projectData) {
  try {
    const projectRef = doc(collection(db, "projects"));
    const project = {
      ...projectData,
      userId: userEmail,
      status: "planning",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      currentMilestone: 0,
      progress: 0
    };

    await setDoc(projectRef, project);
    return { id: projectRef.id, ...project };
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

/**
 * Get user's projects
 */
export async function getUserProjects(userEmail) {
  try {
    const q = query(collection(db, "projects"), where("userId", "==", userEmail));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

/**
 * Update project progress
 */
export async function updateProjectProgress(projectId, milestoneIndex, progress) {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, {
    currentMilestone: milestoneIndex,
    progress,
    updatedAt: Date.now()
  });
}

/**
 * Mentor Matching Algorithm
 */
export async function findMentors(projectSkills, userLevel) {
  const mentorsRef = collection(db, "mentors");
  const snapshot = await getDocs(mentorsRef);
  const mentors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Score mentors based on skill match and availability
  const scoredMentors = mentors.map(mentor => {
    const skillMatch = projectSkills.filter(skill =>
      mentor.skills?.includes(skill)
    ).length / projectSkills.length;

    const levelMatch = mentor.experienceLevel >= userLevel ? 1 : 0.5;
    const availabilityScore = mentor.available ? 1 : 0;

    const score = (skillMatch * 0.5) + (levelMatch * 0.3) + (availabilityScore * 0.2);

    return { ...mentor, matchScore: score };
  });

  return scoredMentors.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}

/**
 * Submit project for review
 */
export async function submitProjectForReview(projectId, submissionData) {
  const reviewRef = doc(collection(db, "projectReviews"));
  const review = {
    projectId,
    ...submissionData,
    status: "pending",
    submittedAt: Date.now(),
    score: null,
    feedback: null
  };

  await setDoc(reviewRef, review);

  // Update project status
  await updateDoc(doc(db, "projects", projectId), {
    status: "under_review",
    updatedAt: Date.now()
  });

  return { id: reviewRef.id, ...review };
}

/**
 * Review Rubric
 */
export const reviewRubric = {
  categories: [
    {
      name: "Code Quality",
      weight: 0.25,
      criteria: [
        { name: "Clean Code", maxScore: 10 },
        { name: "Documentation", maxScore: 10 },
        { name: "Best Practices", maxScore: 10 },
        { name: "Error Handling", maxScore: 10 }
      ]
    },
    {
      name: "Functionality",
      weight: 0.30,
      criteria: [
        { name: "Feature Completeness", maxScore: 10 },
        { name: "User Experience", maxScore: 10 },
        { name: "Performance", maxScore: 10 }
      ]
    },
    {
      name: "Innovation",
      weight: 0.20,
      criteria: [
        { name: "Creativity", maxScore: 10 },
        { name: "Problem Solving", maxScore: 10 }
      ]
    },
    {
      name: "Presentation",
      weight: 0.15,
      criteria: [
        { name: "Documentation Quality", maxScore: 10 },
        { name: "Demo/Presentation", maxScore: 10 }
      ]
    },
    {
      name: "Technical Depth",
      weight: 0.10,
      criteria: [
        { name: "Complexity", maxScore: 10 },
        { name: "Technical Skills", maxScore: 10 }
      ]
    }
  ]
};

/**
 * Calculate project score based on rubric
 */
export function calculateProjectScore(scores) {
  let totalScore = 0;

  reviewRubric.categories.forEach((category, catIndex) => {
    let categoryScore = 0;
    category.criteria.forEach((criterion, critIndex) => {
      const score = scores[catIndex]?.[critIndex] || 0;
      categoryScore += score;
    });

    const categoryAverage = categoryScore / category.criteria.length;
    totalScore += categoryAverage * category.weight;
  });

  return Math.round(totalScore * 10) / 10;
}
