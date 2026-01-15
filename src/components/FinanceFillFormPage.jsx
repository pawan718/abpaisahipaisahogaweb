import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinanceFillFormPage.css';

const supabaseUrl = 'https://bbzjpkynmsxwjvzpidwn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiempwa3lubXN4d2p2enBpZHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDYxNDEsImV4cCI6MjA2MzA4MjE0MX0.7QtxPFHHa74ZSabzznjzpmcYnwE76qEJQFI6l-T5PC0';

const FinanceFillFormPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [expandedSubcategoryId, setExpandedSubcategoryId] = useState(null);
  const [completedCategories, setCompletedCategories] = useState(new Set());
  const [completedSubcategories, setCompletedSubcategories] = useState(new Set());
  const [categoryFormData, setCategoryFormData] = useState({});
  
  // Gradient backgrounds for each category
  const categoryGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  ];

  // Gradient backgrounds for subcategories (lighter versions)
  const subcategoryGradients = [
    'linear-gradient(135deg, #a8c0ff 0%, #c4b5fd 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #fda4af 100%)',
    'linear-gradient(135deg, #84d9f7 0%, #7dd3fc 100%)',
    'linear-gradient(135deg, #86efac 0%, #6ee7b7 100%)',
    'linear-gradient(135deg, #fbb6ce 0%, #fde68a 100%)',
    'linear-gradient(135deg, #67e8f9 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #c4f1f9 0%, #fbcfe8 100%)',
    'linear-gradient(135deg, #fbbf24 0%, #f87171 100%)',
    'linear-gradient(135deg, #fcd34d 0%, #fb923c 100%)',
    'linear-gradient(135deg, #fdba74 0%, #93c5fd 100%)',
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-focus input when subcategory expands
  useEffect(() => {
    if (expandedSubcategoryId) {
      // Small delay to allow the accordion animation to complete
      setTimeout(() => {
        const inputField = document.querySelector(`#subcategory-${expandedSubcategoryId} .form-input`);
        if (inputField) {
          inputField.focus();
        }
      }, 350); // Matches the animation duration
    }
  }, [expandedSubcategoryId]);

  const fetchCategories = async () => {
    const apiUrl = `https://bbzjpkynmsxwjvzpidwn.supabase.co/functions/v1/get_categories`;
    const method = 'GET';
    const requestHeaders = {
      'Content-Type': 'application/json',
    };
    
    try {
      setLoading(true);
      setError('');
      const response = await fetch(apiUrl);
      if (!response.ok) {
        let errorText = '';
        let errorJson = null;
        
        try {
          errorText = await response.clone().text();
          try {
            errorJson = JSON.parse(errorText);
          } catch (jsonError) {
            // Not valid JSON
          }
        } catch (e) {
          // Could not read error response
        }
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Authentication failed. Please check API credentials.');
        } else if (response.status === 404) {
          throw new Error('API endpoint not found. Please verify the endpoint URL.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
        }
      }
      
      // Try to parse successful response
      let data;
      try {
        const responseText = await response.text();
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error('Invalid JSON response from API');
        }
      } catch (parseError) {
        throw parseError;
      }
      
      // Handle both direct array and object with categories property
      let categoriesToSet = [];
      if (Array.isArray(data)) {
        categoriesToSet = data;
      } else if (data.categories && Array.isArray(data.categories)) {
        categoriesToSet = data.categories;
      } else if (data.data && Array.isArray(data.data)) {
        categoriesToSet = data.data;
      } else {
        throw new Error('Invalid data format received from API');
      }
      
      setCategories(categoriesToSet);
      
    } catch (err) {
      // Handle network errors specifically
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection.');
      } else if (err.name === 'SyntaxError') {
        setError('Invalid response format from server.');
      } else {
        const errorMessage = err.message || 'Failed to load categories. Please try again later.';
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
    setExpandedSubcategoryId(null); // Close any open subcategory when switching categories
  };

  const toggleSubcategory = (subcategoryId) => {
    setExpandedSubcategoryId(expandedSubcategoryId === subcategoryId ? null : subcategoryId);
  };

  const handleInputChange = (categoryId, subcategoryId, field, value) => {
    const key = `${categoryId}-${subcategoryId}`;
    setCategoryFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleSubcategorySubmit = (categoryId, subcategoryId, category, subcategory) => {
    const key = `${categoryId}-${subcategoryId}`;
    const formData = categoryFormData[key];

    if (!formData?.amount) {
      alert('Please fill in the amount field');
      return;
    }

    // Mark subcategory as completed
    setCompletedSubcategories((prev) => new Set([...prev, subcategoryId]));
    
    // Find all subcategories in current category
    const allSubcategories = category.subcategory || [];
    const currentSubIndex = allSubcategories.findIndex((sub) => sub.id === subcategoryId);
    const nextSubcategory = allSubcategories[currentSubIndex + 1];
    
    // Auto-advance with smooth transition
    setTimeout(() => {
      setExpandedSubcategoryId(null);
      setTimeout(() => {
        if (nextSubcategory) {
          // Move to next subcategory
          setExpandedSubcategoryId(nextSubcategory.id);
          const nextElement = document.getElementById(`subcategory-${nextSubcategory.id}`);
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          // All subcategories in this category completed
          setCompletedCategories((prev) => new Set([...prev, categoryId]));
          
          // Move to next category
          const currentCatIndex = categories.findIndex((cat) => cat.id === categoryId);
          const nextCategory = categories[currentCatIndex + 1];
          
          setTimeout(() => {
            setExpandedCategoryId(null);
            setTimeout(() => {
              if (nextCategory) {
                setExpandedCategoryId(nextCategory.id);
                const nextElement = document.getElementById(`category-${nextCategory.id}`);
                if (nextElement) {
                  nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              } else {
                // All categories completed
                handleFinalSubmit();
              }
            }, 300);
          }, 200);
        }
      }, 300);
    }, 200);
  };

  const handleFinalSubmit = () => {
    // Collect all form data
    const allSubmissions = [];
    categories.forEach((cat) => {
      if (cat.subcategory) {
        cat.subcategory.forEach((subcat) => {
          const key = `${cat.id}-${subcat.id}`;
          const data = categoryFormData[key];
          if (data && completedSubcategories.has(subcat.id)) {
            allSubmissions.push({
              categoryId: cat.id,
              categoryName: cat.name,
              subcategoryId: subcat.id,
              subcategoryName: subcat.name,
              amount: parseFloat(data.amount),
            });
          }
        });
      }
    });

    // Store the submission data in localStorage or state management
    localStorage.setItem('financeFormData', JSON.stringify(allSubmissions));
    
    // Navigate to the next page (you can change '/summary' to your desired route)
    navigate('/summary');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="loader-wrapper">
          <div className="circle-loader"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="finance-form-page">
        <div className="finance-form-container">
          <div className="finance-form-header">
            <button onClick={handleBack} className="back-btn">
              ← Back
            </button>
            <h1 className="finance-form-title">Expense Details Form</h1>
          </div>
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{error}</p>
            <p className="error-hint">Please check your internet connection and try again.</p>
            <button onClick={fetchCategories} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="finance-form-page">
      <div className="finance-form-container">
        <div className="finance-form-header">
          <button onClick={handleBack} className="back-btn">
            ← Back
          </button>
          <h1 className="finance-form-title">Expense Details Form</h1>
        </div>

        {/* Progress Indicator */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${
                  categories.reduce((total, cat) => total + (cat.subcategory?.length || 0), 0) > 0
                    ? (completedSubcategories.size / categories.reduce((total, cat) => total + (cat.subcategory?.length || 0), 0)) * 100
                    : 0
                }%` 
              }}
            ></div>
          </div>
          <div className="progress-text">
            {completedSubcategories.size} of {categories.reduce((total, cat) => total + (cat.subcategory?.length || 0), 0)} items completed
          </div>
        </div>

        {/* Accordion Categories */}
        <div className="accordion-container">
          {categories.map((category, index) => {
            const isExpanded = expandedCategoryId === category.id;
            const isCompleted = completedCategories.has(category.id);
            const gradient = categoryGradients[index % categoryGradients.length];
            const formData = categoryFormData[category.id] || {
              selectedSubcategory: null,
              amount: '',
            };

            return (
              <div
                key={category.id}
                id={`category-${category.id}`}
                className={`accordion-item ${isExpanded ? 'expanded' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                {/* Accordion Header */}
                <div
                  className="accordion-header"
                  style={{ background: gradient }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="accordion-header-content">
                    <div className="accordion-title-section">
                      <div className="category-number">Step {index + 1}</div>
                      <h3 className="accordion-title">{category.name}</h3>
                    </div>
                    <div className="accordion-status">
                      {isCompleted && (
                        <span className="status-badge completed-badge">
                          ✓ Completed
                        </span>
                      )}
                      <span className={`accordion-icon ${isExpanded ? 'rotated' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                  {category.subcategory && category.subcategory.length > 0 && (
                    <div className="accordion-subtitle">
                      {category.subcategory.length} options available
                    </div>
                  )}
                </div>

                {/* Accordion Content */}
                <div className={`accordion-content ${isExpanded ? 'show' : ''}`}>
                  <div className="accordion-content-inner">
                    {/* Subcategory Accordions */}
                    {category.subcategory && category.subcategory.length > 0 && (
                      <div className="subcategory-accordion-container">
                        {category.subcategory.map((subcat, subIndex) => {
                          const isSubExpanded = expandedSubcategoryId === subcat.id;
                          const isSubCompleted = completedSubcategories.has(subcat.id);
                          
                          // Create gradient from backend colors array [color1, color2]
                          let subGradient;
                          if (subcat.colors && Array.isArray(subcat.colors) && subcat.colors.length >= 2) {
                            // Backend provides two colors, create gradient
                            subGradient = `linear-gradient(135deg, ${subcat.colors[0]} 0%, ${subcat.colors[1]} 100%)`;
                          } else {
                            // Fallback to hardcoded gradients
                            subGradient = subcategoryGradients[subIndex % subcategoryGradients.length];
                          }
                          
                          const key = `${category.id}-${subcat.id}`;
                          const subFormData = categoryFormData[key] || {
                            amount: '',
                          };

                          return (
                            <div
                              key={subcat.id}
                              id={`subcategory-${subcat.id}`}
                              className={`subcategory-accordion-item ${isSubExpanded ? 'expanded' : ''} ${isSubCompleted ? 'completed' : ''}`}
                            >
                              {/* Subcategory Header */}
                              <div
                                className="subcategory-accordion-header"
                                style={{ background: subGradient }}
                                onClick={() => toggleSubcategory(subcat.id)}
                              >
                                <div className="subcategory-header-content">
                                  <div className="subcategory-title-section">
                                    <div className="subcategory-number">Option {subIndex + 1}</div>
                                    <h4 className="subcategory-accordion-title">{subcat.name}</h4>
                                  </div>
                                  <div className="subcategory-status">
                                    {isSubCompleted && (
                                      <span className="status-badge sub-completed-badge">
                                        ✓
                                      </span>
                                    )}
                                    <span className={`subcategory-accordion-icon ${isSubExpanded ? 'rotated' : ''}`}>
                                      ▼
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Subcategory Content */}
                              <div className={`subcategory-accordion-content ${isSubExpanded ? 'show' : ''}`}>
                                <div className="subcategory-accordion-content-inner">
                                  <div className="form-section">
                                    {(subcat.input_type === 'COUNT' || subcat.name.toLowerCase().includes('lounge access')) ? (
                                      <div className="form-group">
                                        <label className="form-label">
                                          Count <span className="required">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          className="form-input"
                                          placeholder="Enter count"
                                          value={subFormData.amount}
                                          onChange={(e) => handleInputChange(category.id, subcat.id, 'amount', e.target.value)}
                                          onKeyPress={(e) => {
                                            if (e.key === 'Enter' && subFormData.amount) {
                                              e.preventDefault();
                                              handleSubcategorySubmit(category.id, subcat.id, category, subcat);
                                            }
                                          }}
                                          min="0"
                                          step="1"
                                        />
                                      </div>
                                    ) : (
                                      <div className="form-group">
                                        <label className="form-label">
                                          Amount (₹) <span className="required">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          className="form-input"
                                          placeholder="Enter amount"
                                          value={subFormData.amount}
                                          onChange={(e) => handleInputChange(category.id, subcat.id, 'amount', e.target.value)}
                                          onKeyPress={(e) => {
                                            if (e.key === 'Enter' && subFormData.amount) {
                                              e.preventDefault();
                                              handleSubcategorySubmit(category.id, subcat.id, category, subcat);
                                            }
                                          }}
                                          min="0"
                                          step="0.01"
                                        />
                                      </div>
                                    )}

                                    <button
                                      type="button"
                                      className="next-btn"
                                      onClick={() => handleSubcategorySubmit(category.id, subcat.id, category, subcat)}
                                    >
                                      {subIndex === category.subcategory.length - 1 && index === categories.length - 1
                                        ? 'Complete All'
                                        : subIndex === category.subcategory.length - 1
                                        ? 'Next Category'
                                        : 'Save & Next'}
                                      <span className="btn-arrow">→</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {(() => {
          const totalSubcategories = categories.reduce((total, cat) => total + (cat.subcategory?.length || 0), 0);
          return completedSubcategories.size === totalSubcategories && totalSubcategories > 0 && (
            <div className="completion-message">
              <div className="completion-icon">🎉</div>
              <h2 className="completion-title">All Items Completed!</h2>
              <p className="completion-text">
                You've successfully filled out all {totalSubcategories} items across {categories.length} categories.
              </p>
              <button className="view-summary-btn" onClick={handleFinalSubmit}>
                View Summary & Submit
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default FinanceFillFormPage;
