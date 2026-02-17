// Reinforcement Learning for Personalization
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * User learning profile with RL state
 */
export class LearningProfile {
  constructor(userId) {
    this.userId = userId;
    this.state = {
      preferences: {},
      performance: {},
      engagement: {},
      learningStyle: null,
    };
  }

  async load() {
    const docRef = doc(db, "learningProfiles", this.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.state = docSnap.data();
    }
    return this.state;
  }

  async save() {
    const docRef = doc(db, "learningProfiles", this.userId);
    await setDoc(docRef, this.state, { merge: true });
  }

  /**
   * Update based on user interaction (reward signal)
   */
  async recordInteraction(action, reward, context) {
    const interaction = {
      action,
      reward,
      context,
      timestamp: Date.now(),
    };

    // Update preferences using simple Q-learning approach
    const stateKey = JSON.stringify(context);
    if (!this.state.preferences[stateKey]) {
      this.state.preferences[stateKey] = {};
    }

    const alpha = 0.1; // learning rate
    const currentQ = this.state.preferences[stateKey][action] || 0;
    this.state.preferences[stateKey][action] = currentQ + alpha * (reward - currentQ);

    await this.save();
    return this.state;
  }

  /**
   * Get recommended action based on learned preferences
   */
  getRecommendation(context, actions) {
    const stateKey = JSON.stringify(context);
    const preferences = this.state.preferences[stateKey] || {};

    // Epsilon-greedy strategy (90% exploit, 10% explore)
    if (Math.random() < 0.1) {
      return actions[Math.floor(Math.random() * actions.length)];
    }

    // Choose action with highest Q-value
    let bestAction = actions[0];
    let bestValue = preferences[bestAction] || 0;

    for (const action of actions) {
      const value = preferences[action] || 0;
      if (value > bestValue) {
        bestValue = value;
        bestAction = action;
      }
    }

    return bestAction;
  }

  /**
   * Detect learning style from behavior patterns
   */
  async detectLearningStyle() {
    const { performance, engagement } = this.state;

    // Analyze patterns
    const visualScore = (engagement.imageInteractions || 0) + (performance.visualTasks || 0);
    const auditoryScore = (engagement.audioInteractions || 0) + (performance.audioTasks || 0);
    const kinestheticScore = (engagement.interactiveTasks || 0) + (performance.practicalTasks || 0);

    const styles = { visual: visualScore, auditory: auditoryScore, kinesthetic: kinestheticScore };
    const dominantStyle = Object.keys(styles).reduce((a, b) => styles[a] > styles[b] ? a : b);

    this.state.learningStyle = dominantStyle;
    await this.save();

    return dominantStyle;
  }
}

/**
 * Calculate reward signal from user behavior
 */
export function calculateReward(metrics) {
  const {
    completed = false,
    timeSpent = 0,
    score = 0,
    revisited = false,
    helpRequested = false,
  } = metrics;

  let reward = 0;

  if (completed) reward += 10;
  if (score > 0.8) reward += 5;
  if (score > 0.6) reward += 2;
  if (timeSpent > 60 && timeSpent < 600) reward += 3; // optimal time range
  if (revisited) reward += 1;
  if (helpRequested) reward -= 1;

  return reward;
}
