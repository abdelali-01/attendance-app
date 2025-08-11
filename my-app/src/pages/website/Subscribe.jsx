import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  getPlanDetails, 
  calculatePrice, 
  calculateTotalPrice, 
  durationOptions 
} from '../../data/plans';
import { 
  getPendingSubscription, 
  savePendingSubscription, 
  clearPendingSubscription 
} from '../../utils/subscriptionUtils';

export default function Subscribe() {
  const [searchParams] = useSearchParams();
  const [selectedDuration, setSelectedDuration] = useState(12);
  const [planName, setPlanName] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [pendingSubscription, setPendingSubscription] = useState(null);

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      setPlanName(plan);
    }
    
    // Check for pending subscription data
    const pending = getPendingSubscription();
    if (pending) {
      setPendingSubscription(pending);
    }
  }, [searchParams]);

  const planDetails = getPlanDetails(planName);
  const monthlyPrice = calculatePrice(planName.toLowerCase(), selectedDuration);
  const totalPrice = calculateTotalPrice(planName.toLowerCase(), selectedDuration);
  const isDiscounted = selectedDuration >= 12;
  
  // Calculate saved amount
  const originalTotalPrice = planDetails.basePrice * selectedDuration;
  const savedAmount = originalTotalPrice - totalPrice;

  // Handle subscription process
  const handleSubscribe = async () => {
    setIsSubscribing(true);
    
    try {
      if (!user) {
        // User is not logged in - save to localStorage
        const subscriptionData = {
          amount: totalPrice,
          plan: planName.toLowerCase(),
          duration: selectedDuration,
          monthlyPrice: monthlyPrice,
          savedAmount: savedAmount,
          timestamp: new Date().toISOString()
        };
        
        // Save to localStorage
        savePendingSubscription(subscriptionData);
        
        // Redirect to login page
        navigate('/login');
        return;
      }
      
      // User is logged in - proceed with payment API call
      // Clear any pending subscription data
      clearPendingSubscription();
      setPendingSubscription(null);
      
      // TODO: Implement payment API call here
      console.log('User is logged in, proceed with payment');
      
    } catch (error) {
      console.error('Error during subscription:', error);
    } finally {
      setIsSubscribing(false);
    }
  };


  if (!planName || planName.toLowerCase() === 'free') {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        <div className="text-center">
          <h2 className="fw-bold mb-3" style={{ color: "#1e293b" }}>
            Free Plan Selected
          </h2>
          <p className="text-secondary mb-4">
            The free plan doesn't require a subscription. You can start using it immediately.
          </p>
          <Link to="/dashboard" className="btn btn-primary px-4 py-2">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "4rem 0"
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="fw-bold mb-3" style={{ 
                fontSize: "2.2rem", 
                color: "#1e293b",
                letterSpacing: "-0.025em"
              }}>
                Subscribe to {planDetails.name}
              </h1>
              <p className="fs-5 text-secondary">
                {planDetails.description}
              </p>
            </div>

            {/* Pending Subscription Alert */}
            {pendingSubscription && (
              <div className="alert alert-info mb-4" role="alert">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Pending Subscription Found!</strong>
                    <br />
                    <small>
                      Plan: {pendingSubscription.plan} | Duration: {pendingSubscription.duration} months | 
                      Amount: {pendingSubscription.amount} DA
                    </small>
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      clearPendingSubscription();
                      setPendingSubscription(null);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}



              {/* Subscription Details */}
              <div className="">
                <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4" style={{ color: "#1e293b" }}>
                      Choose Duration
                    </h4>
                    
                    {/* Duration Selection */}
                    <div className="mb-4 d-flex flex-wrap gap-2">
                      {durationOptions.map((option) => (
                        <div 
                          key={option.value}
                          className={`p-3 mb-2 rounded-3 cursor-pointer border flex-grow-1 ${
                            selectedDuration === option.value 
                              ? 'border-primary bg-primary bg-opacity-10' 
                              : 'border-light'
                          }`}
                          style={{ 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setSelectedDuration(option.value)}
                        >
                          <div className="d-flex flex-column justify-content-between align-items-center">
                            <span className="fw-semibold">{option.label}</span>
                            <div className="text-center">
                              <div className="fw-bold" style={{ color: "#6366f1" }}>
                                {calculatePrice(planName.toLowerCase(), option.value)} DA/month
                              </div>
                              {option.value >= 12 && (
                                <small className="text-success">60% OFF</small>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Summary */}
                    <div className="border-top pt-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Monthly Price:</span>
                        <span className="fw-bold">
                          {isDiscounted && (
                            <span className="text-decoration-line-through text-muted me-2">
                              {planDetails.basePrice} DA
                            </span>
                          )}
                          {monthlyPrice} DA
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Duration:</span>
                        <span className="fw-bold">{selectedDuration} {selectedDuration === 1 ? 'Month' : 'Months'}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                        <span className="fw-bold fs-5">Total:</span>
                        <div className="text-end">
                          <span className="fw-bold fs-4" style={{ color: "#6366f1" }}>
                            {totalPrice} DA
                          </span>
                          {isDiscounted && savedAmount > 0 && (
                            <div className="text-success fw-semibold" style={{ fontSize: "0.9rem" }}>
                              You save {savedAmount} DA
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Subscribe Button */}
                    <button 
                      className="btn w-100 mt-4 fw-bold py-3"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
                        transition: "all 0.2s ease",
                        opacity: isSubscribing ? 0.7 : 1,
                        cursor: isSubscribing ? 'not-allowed' : 'pointer'
                      }}
                      disabled={isSubscribing}
                      onClick={handleSubscribe}
                      onMouseOver={e => {
                        if (!isSubscribing) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 8px 24px rgba(99, 102, 241, 0.4)";
                        }
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(99, 102, 241, 0.3)";
                      }}
                    >
                      {isSubscribing ? 'Processing...' : 'Subscribe Now'}
                    </button>

                    <div className="text-center mt-3">
                      <small className="text-muted">
                        You can cancel your subscription at any time
                      </small>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
} 