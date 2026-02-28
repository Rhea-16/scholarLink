// src/utils/scholarshipFilterUtils.js

export const filterScholarships = (scholarships, filters) => {
  // If no filters are active, return all scholarships
  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== 'any'
  );
  
  if (!hasActiveFilters) {
    return scholarships;
  }

  return scholarships.filter((sch) => {
    // First check search (scholarship-level)
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase().trim();
      const nameMatch = sch.scholarship_name?.toLowerCase().includes(searchTerm) || false;
      const providerMatch = sch.provider_name?.toLowerCase().includes(searchTerm) || false;
      
      if (!nameMatch && !providerMatch) {
        return false;
      }
    }

    // Check provider type (scholarship-level filter)
    if (filters.providerType && filters.providerType !== '') {
      const normalize = (val) => typeof val === "string" ? val.toLowerCase().trim() : val;
      const providerType = normalize(sch.provider_type);
      const filterProviderType = normalize(filters.providerType);
      
      if (providerType && providerType !== "any" && providerType !== filterProviderType) {
        return false;
      }
    }

    // Get eligibility array
    const eligibilityArray = sch.eligibility || [];
    
    // If no eligibility rules and we have other filters active, exclude
    // (but only if we have filters other than search and providerType)
    const hasOtherFilters = filters.state || filters.category || filters.gender || 
                           filters.incomeLimit || filters.branch;
    
    if (hasOtherFilters && !eligibilityArray.length) {
      return false;
    }

    // If no eligibility rules and no other filters, include
    if (!eligibilityArray.length) {
      return true;
    }

    // Now check if ANY eligibility object matches ALL active filters
    const matches = eligibilityArray.some((eligibility) => {
      const normalize = (val) => typeof val === "string" ? val.toLowerCase().trim() : val;

      // State filter
      if (filters.state && filters.state !== '') {
        const state = normalize(eligibility.domicile_state);
        const filterState = normalize(filters.state);
        
        // If state is specified and not "any", it must match
        if (state && state !== "any" && state !== filterState) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== '') {
        const category = normalize(eligibility.category);
        const filterCategory = normalize(filters.category);
        
        if (category && category !== "any" && category !== filterCategory) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender && filters.gender !== '') {
        const gender = normalize(eligibility.gender);
        const filterGender = normalize(filters.gender);
        
        if (gender && gender !== "any" && gender !== filterGender) {
          return false;
        }
      }

      // Income filter
      if (filters.incomeLimit && filters.incomeLimit !== '') {
        const maxIncome = eligibility.family_income_max;
        
        if (maxIncome && maxIncome !== "any") {
          // Student's income should be <= max allowed income
          if (Number(filters.incomeLimit) > Number(maxIncome)) {
            return false;
          }
        }
      }

      // Branch filter
      if (filters.branch && filters.branch !== '') {
        const stream = eligibility.course_stream;
        const filterBranch = normalize(filters.branch);
        
        if (stream && stream !== "any") {
          if (Array.isArray(stream)) {
            const match = stream.some(s => normalize(s) === filterBranch);
            if (!match) return false;
          } else {
            if (normalize(stream) !== filterBranch) {
              return false;
            }
          }
        }
      }

      // If reached here → this eligibility rule matches all active filters
      return true;
    });

    return matches;
  });
};

export const sortScholarships = (scholarships, sortBy) => {
  if (!scholarships || !scholarships.length) return [];
  
  const sorted = [...scholarships];

  switch (sortBy) {
    case "deadline":
      sorted.sort((a, b) => {
        const dateA = new Date(a.application_end_date || '2099-12-31');
        const dateB = new Date(b.application_end_date || '2099-12-31');
        return dateA - dateB;
      });
      break;

    case "amount":
      sorted.sort((a, b) => {
        const amountA = Number(a.benefit_amount) || 0;
        const amountB = Number(b.benefit_amount) || 0;
        return amountB - amountA;
      });
      break;

    case "relevance":
    default:
      sorted.sort((a, b) => {
        // Sort by featured first, then by priority score
        const featuredA = a.is_featured ? 1 : 0;
        const featuredB = b.is_featured ? 1 : 0;
        
        if (featuredA !== featuredB) {
          return featuredB - featuredA;
        }
        
        const priorityA = a.priority_score || 0;
        const priorityB = b.priority_score || 0;
        return priorityB - priorityA;
      });
      break;
  }

  return sorted;
};