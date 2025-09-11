// Complete list of all features
export const allFeatures = [
  "Class Limit",
  "Student Limit",
  "Statistics",
  "Attendance Tracking", 
  "Reports Feature",
  "Email Notifications",
  "Class Attendance Reminders",
  "Messages Feature"
];

// Feature availability for each plan
export const featureAvailability = {
  free: {
    "Class Limit": "1 Class",
    "Student Limit": "15 Students",
    "Statistics": true,
    "Attendance Tracking": true,
    "Reports Feature": false,
    "Email Notifications": false,
    "Class Attendance Reminders": false,
    "Messages Feature": false
  },
  standard: {
    "Class Limit": "3 Classes",
    "Student Limit": "45 Students per class",
    "Statistics": true,
    "Attendance Tracking": true,
    "Reports Feature": true,
    "Email Notifications": true,
    "Class Attendance Reminders": false,
    "Messages Feature": false
  },
  premium: {
    "Class Limit": "Unlimited",
    "Student Limit": "Unlimited",
    "Statistics": true,
    "Attendance Tracking": true,
    "Reports Feature": true,
    "Email Notifications": true,
    "Class Attendance Reminders": true,
    "Messages Feature": true
  }
};

// Base prices (monthly)
export const basePrices = {
  free: 0,
  standard: 800,
  premium: 990
};

// Calculate price based on duration
export const calculatePrice = (plan, duration) => {
  const basePrice = basePrices[plan];
  if (plan === 'free') return 0;
  
  if (duration >= 12) {
    // 60% discount for 12+ months
    return Math.round(basePrice * 0.4);
  }
  
  return basePrice;
};

// Calculate total price
export const calculateTotalPrice = (plan, duration) => {
  const monthlyPrice = calculatePrice(plan, duration);
  return monthlyPrice * duration;
};

// Calculate savings amount
export const calculateSavings = (plan, duration) => {
  if (plan === 'free') return 0;
  const originalTotalPrice = basePrices[plan] * duration;
  const discountedTotalPrice = calculateTotalPrice(plan, duration);
  return originalTotalPrice - discountedTotalPrice;
};

// Get plan details
export const getPlanDetails = (planName) => {
  const plan = planName.toLowerCase();
  return {
    name: planName,
    features: featureAvailability[plan],
    basePrice: basePrices[plan],
    description: plan === 'free' ? "Perfect for getting started" : 
                 plan === 'standard' ? "Great for growing classes" : 
                 "For professional educators"
  };
};

// Duration options
export const durationOptions = [
  { value: 1, label: "1 Month" },
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 12, label: "12 Months" },
  { value: 24, label: "24 Months" },
  { value: 48, label: "48 Months" },
]; 