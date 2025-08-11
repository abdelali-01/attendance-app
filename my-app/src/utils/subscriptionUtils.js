// Utility functions for handling pending subscription data

const PENDING_SUBSCRIPTION_KEY = 'pending_subscription';

/**
 * Get pending subscription data from localStorage
 * @returns {Object|null} The pending subscription data or null if not found
 */
export const getPendingSubscription = () => {
  try {
    const data = localStorage.getItem(PENDING_SUBSCRIPTION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading pending subscription:', error);
    return null;
  }
};

/**
 * Save pending subscription data to localStorage
 * @param {Object} subscriptionData - The subscription data to save
 * @returns {boolean} True if saved successfully, false otherwise
 */
export const savePendingSubscription = (subscriptionData) => {
  try {
    localStorage.setItem(PENDING_SUBSCRIPTION_KEY, JSON.stringify(subscriptionData));
    return true;
  } catch (error) {
    console.error('Error saving pending subscription:', error);
    return false;
  }
};

/**
 * Clear pending subscription data from localStorage
 * @returns {boolean} True if cleared successfully, false otherwise
 */
export const clearPendingSubscription = () => {
  try {
    localStorage.removeItem(PENDING_SUBSCRIPTION_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing pending subscription:', error);
    return false;
  }
};

/**
 * Check if there's pending subscription data
 * @returns {boolean} True if pending subscription exists, false otherwise
 */
export const hasPendingSubscription = () => {
  return getPendingSubscription() !== null;
};

/**
 * Get formatted pending subscription info for display
 * @returns {Object|null} Formatted subscription info or null
 */
export const getPendingSubscriptionInfo = () => {
  const data = getPendingSubscription();
  if (!data) return null;

  return {
    plan: data.plan,
    duration: data.duration,
    amount: data.amount,
    monthlyPrice: data.monthlyPrice,
    savedAmount: data.savedAmount,
    timestamp: data.timestamp
  };
};

/**
 * Process pending subscription (for when user completes checkout)
 * @param {Function} onSuccess - Callback when successful
 * @param {Function} onError - Callback when error occurs
 */
export const processPendingSubscription = async (onSuccess, onError) => {
  try {
    const pendingData = getPendingSubscription();
    if (!pendingData) {
      throw new Error('No pending subscription found');
    }

    // TODO: Implement actual payment processing here
    // This would typically involve:
    // 1. Calling your payment API
    // 2. Updating user subscription in database
    // 3. Sending confirmation email
    
    console.log('Processing subscription:', pendingData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear pending subscription after successful processing
    clearPendingSubscription();
    
    if (onSuccess) onSuccess(pendingData);
  } catch (error) {
    console.error('Error processing subscription:', error);
    if (onError) onError(error);
  }
};

/**
 * Get subscription summary for display
 * @returns {Object|null} Subscription summary or null
 */
export const getSubscriptionSummary = () => {
  const data = getPendingSubscription();
  if (!data) return null;

  const totalMonths = data.duration;
  const monthlyPrice = data.monthlyPrice;
  const totalAmount = data.amount;
  const savedAmount = data.savedAmount;
  const discountPercentage = savedAmount > 0 ? Math.round((savedAmount / (monthlyPrice * totalMonths)) * 100) : 0;

  return {
    plan: data.plan,
    duration: totalMonths,
    monthlyPrice,
    totalAmount,
    savedAmount,
    discountPercentage,
    formattedDuration: totalMonths === 1 ? '1 Month' : `${totalMonths} Months`,
    formattedTotal: `${totalAmount.toLocaleString()} DA`,
    formattedMonthly: `${monthlyPrice.toLocaleString()} DA`,
    formattedSaved: savedAmount > 0 ? `${savedAmount.toLocaleString()} DA` : null
  };
}; 