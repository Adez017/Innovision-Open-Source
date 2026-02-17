let adminDb = null;

async function getDb() {
  if (!adminDb) {
    try {
      const { getAdminDb } = await import("./firebase-admin");
      adminDb = getAdminDb();
    } catch (error) {
      console.warn("Firebase Admin not available:", error.message);
    }
  }
  return adminDb;
}

/**
 * Get user's account creation date
 * @param {string} userEmail - User's email
 * @returns {Promise<Date|null>} - Account creation date or null
 */
export async function getUserCreatedAt(userEmail) {
  try {
    const db = await getDb();
    if (!db) return null;
    
    const userDoc = await db.collection("users").doc(userEmail).get();
    
    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    return userData.createdAt ? new Date(userData.createdAt) : null;
  } catch (error) {
    console.error("Error getting user creation date:", error);
    return null;
  }
}

/**
 * Check if user is within 7-day free trial period
 * @param {string} userEmail - User's email
 * @returns {Promise<{isInTrial: boolean, daysRemaining: number, trialExpired: boolean}>}
 */
export async function checkTrialStatus(userEmail) {
  try {
    const db = await getDb();
    if (!db) return { isInTrial: true, daysRemaining: 7, trialExpired: false };
    
    const userDoc = await db.collection("users").doc(userEmail).get();
    
    if (!userDoc.exists) {
      return { isInTrial: true, daysRemaining: 7, trialExpired: false };
    }

    const userData = userDoc.data();
    const createdAt = userData.createdAt ? new Date(userData.createdAt) : new Date();
    const now = new Date();
    const daysSinceCreation = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 7 - daysSinceCreation);

    return {
      isInTrial: daysSinceCreation < 7,
      daysRemaining,
      trialExpired: daysSinceCreation >= 7,
      trialStartDate: createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error checking trial status:", error);
    return { isInTrial: true, daysRemaining: 7, trialExpired: false };
  }
}

/**
 * Check if a user has premium access (paid or trial)
 * @param {string} userEmail - User's email
 * @returns {Promise<boolean>} - True if user is premium
 */
export async function isPremiumUser(userEmail) {
  try {
    const db = await getDb();
    if (!db) return false;
    
    const userDoc = await db.collection("users").doc(userEmail).get();
    
    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();

    // Check if user has paid premium status and it's not expired
    if (userData.isPremium && userData.premiumExpiresAt) {
      const expiryDate = new Date(userData.premiumExpiresAt);
      return expiryDate > new Date();
    }

    return false;
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
}

/**
 * Check if user has full access (premium OR within trial)
 * @param {string} userEmail - User's email
 * @returns {Promise<{hasAccess: boolean, isPremium: boolean, isInTrial: boolean, daysRemaining: number}>}
 */
export async function checkFullAccess(userEmail) {
  const isPremium = await isPremiumUser(userEmail);

  if (isPremium) {
    return { hasAccess: true, isPremium: true, isInTrial: false, daysRemaining: 0 };
  }

  const trialStatus = await checkTrialStatus(userEmail);

  return {
    hasAccess: trialStatus.isInTrial,
    isPremium: false,
    isInTrial: trialStatus.isInTrial,
    daysRemaining: trialStatus.daysRemaining,
    trialExpired: trialStatus.trialExpired,
  };
}

/**
 * Get user's course generation count
 * @param {string} userEmail - User's email
 * @returns {Promise<number>} - Number of completed courses
 */
export async function getUserCourseCount(userEmail) {
  try {
    const db = await getDb();
    if (!db) return 0;
    
    const snapshot = await db
      .collection("users")
      .doc(userEmail)
      .collection("roadmaps")
      .where("process", "==", "completed")
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting course count:", error);
    return 0;
  }
}

/**
 * Get user's YouTube course generation count
 * @param {string} userEmail - User's email
 * @returns {Promise<number>} - Number of YouTube courses
 */
export async function getYouTubeCourseCount(userEmail) {
  try {
    const db = await getDb();
    if (!db) return 0;
    
    const snapshot = await db
      .collection("users")
      .doc(userEmail)
      .collection("youtube-courses")
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting YouTube course count:", error);
    return 0;
  }
}

/**
 * Get user's Studio course generation count
 * @param {string} userEmail - User's email
 * @returns {Promise<number>} - Number of Studio courses
 */
export async function getStudioCourseCount(userEmail) {
  try {
    const db = await getDb();
    if (!db) return 0;
    
    const snapshot = await db
      .collection("users")
      .doc(userEmail)
      .collection("studio-courses")
      .get();

    return snapshot.size;
  } catch (error) {
    console.error("Error getting Studio course count:", error);
    return 0;
  }
}

/**
 * Check if user can generate more courses
 * @param {string} userEmail - User's email
 * @returns {Promise<{canGenerate: boolean, reason?: string, isPremium: boolean, courseCount: number}>}
 */
export async function canGenerateCourse(userEmail) {
  const isPremium = await isPremiumUser(userEmail);
  const courseCount = await getUserCourseCount(userEmail);

  if (isPremium) {
    // Premium users can generate unlimited courses (or up to 100)
    if (courseCount >= 100) {
      return {
        canGenerate: false,
        reason: "You have reached the maximum limit of 100 courses.",
        isPremium: true,
        courseCount,
      };
    }
    return { canGenerate: true, isPremium: true, courseCount };
  }

  // Free users limited to 3 courses
  if (courseCount >= 3) {
    return {
      canGenerate: false,
      reason: "Free users can only generate 3 courses. Upgrade to Premium for unlimited access!",
      isPremium: false,
      courseCount,
    };
  }

  return { canGenerate: true, isPremium: false, courseCount };
}

/**
 * Check if user can generate YouTube courses
 * @param {string} userEmail - User's email
 * @returns {Promise<{canGenerate: boolean, reason?: string, isPremium: boolean, count: number}>}
 */
export async function canGenerateYouTubeCourse(userEmail) {
  const isPremium = await isPremiumUser(userEmail);
  const count = await getYouTubeCourseCount(userEmail);

  if (isPremium) {
    return { canGenerate: true, isPremium: true, count };
  }

  // Free users limited to 1 YouTube course
  if (count >= 1) {
    return {
      canGenerate: false,
      reason: "Free users can only generate 1 YouTube course. Upgrade to Premium for unlimited access!",
      isPremium: false,
      count,
    };
  }

  return { canGenerate: true, isPremium: false, count };
}

/**
 * Check if user can use Studio (design courses)
 * @param {string} userEmail - User's email
 * @returns {Promise<{canGenerate: boolean, reason?: string, isPremium: boolean, count: number}>}
 */
export async function canUseStudio(userEmail) {
  const isPremium = await isPremiumUser(userEmail);
  const count = await getStudioCourseCount(userEmail);

  if (isPremium) {
    return { canGenerate: true, isPremium: true, count };
  }

  // Free users limited to 1 Studio course (for preview/testing)
  if (count >= 1) {
    return {
      canGenerate: false,
      reason: "Free users can only create 1 Studio course. Upgrade to Premium for unlimited access!",
      isPremium: false,
      count,
    };
  }

  return { canGenerate: true, isPremium: false, count };
}

/**
 * Activate premium for a user
 * @param {string} userEmail - User's email
 * @param {number} durationMonths - Duration in months (default: 1)
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<boolean>}
 */
export async function activatePremium(userEmail, durationMonths = 1, paymentId) {
  try {
    const db = await getDb();
    if (!db) return false;
    
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

    await db.collection("users").doc(userEmail).set(
      {
        isPremium: true,
        premiumActivatedAt: new Date().toISOString(),
        premiumExpiresAt: expiryDate.toISOString(),
        premiumPaymentId: paymentId,
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error activating premium:", error);
    return false;
  }
}