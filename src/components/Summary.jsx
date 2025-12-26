import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Summary.css';

const Summary = () => {
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    try {
      const data = localStorage.getItem('financeFormData');
      if (!data) {
        navigate('/finance-fill-form');
        return;
      }

      const parsed = JSON.parse(data);

      // If it's not an array, treat it as invalid and send user back
      if (!Array.isArray(parsed)) {
        navigate('/finance-fill-form');
        return;
      }

      // Normalise data and guard against bad values
      const safeData = parsed.map((item) => {
        const amountNumber = Number(item?.amount);
        return {
          categoryId: item?.categoryId ?? '',
          categoryName: item?.categoryName ?? 'Unknown Category',
          subcategoryId: item?.subcategoryId ?? '',
          subcategoryName: item?.subcategoryName ?? 'Unknown Item',
          amount: Number.isFinite(amountNumber) ? amountNumber : 0,
        };
      });

      const total = safeData.reduce((sum, item) => sum + (item.amount || 0), 0);
      setSubmissionData(safeData);
      setTotalAmount(total);
    } catch (err) {
      console.error('Failed to load summary data', err);
      navigate('/finance-fill-form');
    }
  }, [navigate]);

  const handleConfirm = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to submit the form.');
      localStorage.setItem('postLoginRedirect', '/summary');
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');

      const payload = {
        userId,
        formData: submissionData,
      };

      const response = await fetch('http://127.0.0.1:54321/functions/v1/submit_form_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to submit form');
      }

      // Clear stored data after successful submit
      localStorage.removeItem('financeFormData');
      alert('Data submitted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Submit failed:', err);
      setSubmitError(err.message || 'Failed to submit form');
      alert(err.message || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="summary-page">
      <div className="summary-container">
        <div className="summary-header">
          <h1 className="summary-title">Finance Summary</h1>
        </div>

        <div className="summary-content">
          <div className="summary-card total-only">
            <div className="summary-total-label">Total Amount</div>
            <div className="summary-total-value">
              ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="summary-actions single">
            <button
              onClick={handleConfirm}
              className="confirm-btn"
              disabled={submitting || submissionData.length === 0}
            >
              {submitting ? 'Submitting...' : 'Confirm & Submit →'}
            </button>
          </div>

          {submitError && (
            <div className="submit-error">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;

