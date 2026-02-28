export const scholarships_data =[
    {
    id: 1, 
    title: "PM YASASVI Post-Matric Scholarship for OBC, EBC, and DNT Students, Haryana 2025-26",
    amount: 20000,
    deadline: "2026-02-28",
    provider: "Ministry of Social Justice and Empowerment, Government of India",
    matchPercentage: 0, // To be calculated by your React logic
    category: "Government",
    gender: "All", // 30% reserved for Girls, but open to all
    disability: "Yes", // 5% reservation for students with disabilities
    isOrphan: "Not Specified",
    caste: "OBC/EBC/DNT",
    eligibilityTags: [
      "OBC, EBC or DNT category",
      "Domicile of Haryana",
      "Family income < ₹2.5L",
      "Class 11 to Postdoctoral level",
      "30% reserved for girls",
      "5% reserved for disabled"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: 'Requires OTR (One-Time Registration) and face authentication via mobile app.',
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-02-21', // Defaulted to 7 days before deadline
    
    applicationLink: "https://scholarships.gov.in/"
  },
  {
    id: 2, 
    title: "Post Matric Scholarship to SC Students, Haryana 2025-26",
    amount: 13500,
    deadline: "2026-02-28",
    provider: "Directorate of Higher Education, Haryana",
    matchPercentage: 0, 
    category: "Government",
    gender: "All", 
    disability: "Yes", // Marked 'Yes' because of the 10% extra allowance for divyang students
    isOrphan: "Not Specified",
    caste: "SC",
    eligibilityTags: [
      "Scheduled Caste (SC) only",
      "Domicile of Haryana",
      "Family income < ₹2,50,000",
      "Class 11 to Postdoctoral level",
      "10% extra allowance for Divyang students",
      "Freeship Card available"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: 'Requires Parivar Pehchaan Patra (Family ID) for registration. Freeship card allows admission without upfront fees.',
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-02-21',
    applicationLink: "https://harchhatravratti.highereduhry.ac.in/Index"
  },
  {
    id: 3,
    title: "Tata Capital Pankh Scholarship Program for Specialised Discipline 2025–26",
    amount: 100000,
    deadline: "2026-03-10",
    provider: "Tata Capital Limited",
    matchPercentage: 0,
    category: "CSR",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Minimum 80% marks required",
      "Specialised Sciences/Medicine/Engineering",
      "Family income ≤ ₹2.5 Lakh",
      "Indian Nationals only"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Covers 80% of tuition fees up to ₹1 Lakh. Targeted at high-merit students in specialised fields.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-03',
    applicationLink: "https://www.buddy4study.com/application/TCPS36/instruction"
  },
  {
    id: 4,
    title: "Tata Capital Pankh Scholarship Program for General Graduation / Diploma / ITI 2025–26",
    amount: 18000,
    deadline: "2026-03-10",
    provider: "Tata Capital Limited",
    matchPercentage: 0,
    category: "CSR",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Minimum 60% marks required",
      "Undergraduate/Diploma/ITI students",
      "Family income ≤ ₹2.5 Lakh",
      "Benefit varies by marks (₹12k - ₹18k)"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Max benefit of ₹18,000 for students scoring 91% and above.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-03',
    applicationLink: "https://www.buddy4study.com/application/TCPS35/instruction"
  },
  {
    id: 5,
    title: "Tata Capital Pankh Scholarship Program for Class 11 and 12 Students 2025–26",
    amount: 10000,
    deadline: "2026-03-10",
    provider: "Tata Capital Limited",
    matchPercentage: 0,
    category: "CSR",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Minimum 60% marks required",
      "Current Class 11 or 12 students",
      "Family income ≤ ₹2.5 Lakh",
      "Up to 80% of tuition fees"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Designed for school-level support. Max scholarship capped at ₹10,000.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-03',
    applicationLink: "https://www.buddy4study.com/application/TCPS34/instruction"
  },
  {
    id: 6,
    title: "Buddy4Study-PNB Domestic Education Loan Programme (Saraswati/Pratibha)",
    amount: "", // Loan amount is variable based on course
    deadline: "2026-03-31",
    provider: "Punjab National Bank & Buddy4Study",
    matchPercentage: 0,
    category: "Loan",
    gender: "All", // Lower interest rates for female candidates
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Resident Indians",
      "Domestic (India) Education",
      "HSC (Class 12) completed",
      "Entrance/Merit-based admission",
      "Lower interest for females"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Interest rate starts from 7.1%. Special interest concessions available for female applicants.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://www.buddy4study.com/application/BPDEL2/instruction"
  },
  {
    id: 7,
    title: "Buddy4Study-PNB International Education Loan Programme (Udaan)",
    amount: "", // Loan amount is variable based on course
    deadline: "2026-03-31",
    provider: "Punjab National Bank & Buddy4Study",
    matchPercentage: 0,
    category: "Loan",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Resident Indians",
      "Study Abroad (International)",
      "Job-oriented Professional/Technical courses",
      "Aeronautical/Pilot/Shipping included",
      "HSC (Class 12) completed"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Interest rate starts from 9.25%. Covers graduation and PG (MCA, MBA, MS, etc.) abroad.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://www.buddy4study.com/application/BPDEL3/instruction"
  },
  {
    id: 8,
    title: "Vocational Education Maintenance Allowance for ST Students, Maharashtra 2025-26",
    amount: 10000,
    deadline: "2026-03-31",
    provider: "Tribal Development Department, Maharashtra State Government",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "ST",
    eligibilityTags: [
      "Scheduled Tribe (ST) only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹2.5 Lakh",
      "Vocational course enrollment",
      "Caste Validity Certificate mandatory"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Maintenance allowance varies (₹5k - ₹10k) based on course duration and hosteller/day scholar status. Requires MahaDBT registration.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A150D8D3BD5BBF9E579F0BA8D2D926043D82C17776CB73469"
  },
  {
    id: 9,
    title: "Post-Matric Tuition Fee and Examination Fee (Freeship), Maharashtra 2025-26",
    amount: 0, // Reimbursement based on actual fees paid
    deadline: "2026-03-31",
    provider: "Department of Social Justice and Special Assistance, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Yes", // Mentioned in documents "if applicable"
    isOrphan: "Not Specified",
    caste: "SC/Neo-Buddhist",
    eligibilityTags: [
      "SC or Neo-Buddhist community only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹2.5 Lakh",
      "Class 11 and above",
      "Admission through CAP round (for professional courses)",
      "Caste Validity Certificate mandatory"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Covers full reimbursement of tuition and exam fees. Candidate must not have failed more than once in post-matric studies.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AE0CB048159E784170A4F3BD768B3A64E4772B0EF7B9990B2"
  },
  {
    id: 10,
    title: "Aspire Leaders Program 2026",
    amount: 100000, // Maximum potential grant amount
    deadline: "2026-03-16",
    provider: "Aspire Institute (founded by Harvard Professors)",
    matchPercentage: 0,
    category: "Non-Profit / Leadership",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Age 18 to 29 years",
      "First-generation college students",
      "Low-income household",
      "Enrolled in or completed any college program",
      "No documents required for initial application"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "A 9-week online program. Includes Harvard faculty masterclasses. Grants up to ₹1 Lakh available for projects post-completion.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-09',
    applicationLink: "https://engage.aspireleaders.org/"
  },
  {
    id: 11,
    title: "nurtr Nurturing Minds with Chess Program (90% Fee Waiver)",
    amount: 8999, // Savings value (Actual 9999 - Paid 1000)
    deadline: "2026-03-31", // Defaulting to end of financial year as no specific date was provided
    provider: "nurtr & Buddy4Study",
    matchPercentage: 0,
    category: "Skill Development",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Family income < ₹8 Lakh",
      "Age 5 to 25 years",
      "School or College student",
      "90% Fee Waiver"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Student pays only ₹1,000 for the Neo Course. Includes 50+ hours of live Grandmaster camps.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://www.buddy4study.com/application/NURTR6/instruction"
  },
  {
    id: 12,
    title: "nurtr Nurturing Minds with Chess Program (50% Fee Waiver)",
    amount: 5000, // Savings value (Actual 9999 - Paid 4999)
    deadline: "2026-03-31",
    provider: "nurtr & Buddy4Study",
    matchPercentage: 0,
    category: "Skill Development",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All",
    eligibilityTags: [
      "Family income ₹8L - ₹15 Lakh",
      "Age 5 to 25 years",
      "School or College student",
      "50% Fee Waiver"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Student pays ₹4,999. Requires self-declaration of income for the 8L-15L bracket.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://www.buddy4study.com/application/NURTR5/instruction"
  },
  {
    id: 13,
    title: "DOA Dr. Punjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna, Maharashtra 2025-26",
    amount: 60000, // Maximum total benefit (Food + Residence) for Metro cities
    deadline: "2026-03-31",
    provider: "Directorate of Art, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All", // Note: 33% seats reserved for girls
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "General/EWS", // Specifically for students admitted under the general category
    eligibilityTags: [
      "Wards of Registered Labour/Marginal Landholders",
      "Domicile of Maharashtra",
      "Family income < ₹8,00,000",
      "Hosteller (Govt/Private/PG/Tenant)",
      "Professional course under Directorate of Art",
      "General category admission only",
      "First two children of the family"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Maintenance allowance for hostel/living expenses. Max benefit of ₹60,000 available for students in Mumbai/Pune regions. Not available for private/self-financed universities.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A78ED7CE6EFC1BA66278D9242EB6BD70623E4341DD9200A3E"
  },
  {
    id: 14,
    title: "State Minority Scholarship for Pursuing Higher Professional Education (Part I) 2025-26",
    amount: 50000,
    deadline: "2026-03-31",
    provider: "Minority Development Department, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "Minority (Muslim, Buddhist, Christian, Sikh, Parsi, Jain, Jewish)",
    eligibilityTags: [
      "Minority Communities only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹8,00,000",
      "Passed SSC from Maharashtra",
      "Professional or Technical Degree/Diploma",
      "Admission via CAP/Institute Level"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Covers tuition and exam fees up to ₹50,000. Requires a Minority Declaration/Affidavit. Cannot be combined with other scholarships.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A2C489D8FEE1DE79D3D179EC97AB141825125A9561892EF10"
  },
  {
    id: 15,
    title: "Maintenance Allowance to VJNT and SBC Students in Professional Courses 2025-26, Maharashtra",
    amount: 10000, // ₹1,000 per month for 10 months (Max benefit)
    deadline: "2026-03-31",
    provider: "VJNT, OBC, and SBC Welfare Department, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "none",
    eligibilityTags: [
      "VJNT or SBC category only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹1,00,000",
      "Professional course (Engg, Medical, Agri, etc.)",
      "Hosteller (Attached or Private/Outside)",
      "Must be Post-Matric Scholarship recipient"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Monthly allowance for living expenses. Max ₹10k for 4-5 year courses. Note: Students in Government hostels are NOT eligible.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51ADF6AE1F1FBCD6E5590683EDAFF0DF60958CB2C07261F364B"
  },
  {
    id: 16,
    title: "MCAER Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC), Maharashtra 2025-26",
    amount: 0, // Reimbursement based on fees (50% of tuition and exam fees)
    deadline: "2026-03-31",
    provider: "Maharashtra Council Of Agriculture Education And Research (MCAER)",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "General/SEBC",
    eligibilityTags: [
      "EBC (Economically Backward Class)",
      "Domicile of Maharashtra",
      "Family income ≤ ₹8,00,000",
      "General or SEBC category admission",
      "Admission through CAP round",
      "Only first two children eligible"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Provides 50% reimbursement of tuition and exam fees. Specifically for students in Agriculture, professional, or technical courses under MCAER.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AF93663E6569EFD2493B74079C9D4BC045DDEC4D398AED1BA"
  },
  {
    id: 17,
    title: "DTE Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojana (EBC), Maharashtra 2025-26",
    amount: 0, // Reimbursement based on actual fees
    deadline: "2026-03-31",
    provider: "Directorate of Technical Education (DTE), Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All", // Benefit differs: Male 50%, Female 100%
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "General/EWS",
    eligibilityTags: [
      "EBC (Economically Backward Class)",
      "Domicile of Maharashtra",
      "Family income < ₹8,00,000",
      "Professional & Technical courses",
      "Admission through CAP round only",
      "Female: 100% Fees, Male: 50% Fees"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Covers tuition and exam fees. Female students receive 100% reimbursement, while male students receive 50%. Private/Deemed university students are ineligible.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A7F4D327BDEB7125DE0BA4AE1C51180C272281017EBEF6F7C"
  },
  {
    id: 18,
    title: "Assistance to Meritorious Students Scholarship - Senior Level, Maharashtra 2025-26",
    amount: 72000, // Maximum potential amount depending on the course
    deadline: "2026-03-31",
    provider: "Directorate of Higher Education (DHE), Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "All", // Merit-based, usually open to all castes
    eligibilityTags: [
      "Top Rank in SSC and HSC",
      "Domicile of Maharashtra",
      "Must hold DHE Sanction Letter",
      "Minimum 65% marks maintenance",
      "Open to students studying outside Maharashtra"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Exclusively for top-ranking merit students. Requires a specific sanction letter from the DHE. Maintenance of 65% marks is mandatory for renewal.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A081772910D526AF0EDDF60A95235BCA1E7C80233A30F725A"
  },
  {
    id: 19,
    title: "Vocational Education Fee Reimbursement, Maharashtra 2025-26",
    amount: 0, // 100% reimbursement based on Approved College Fee Structure
    deadline: "2026-03-31",
    provider: "Tribal Development Department, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Yes", // Explicitly mentioned in required documents
    isOrphan: "Not Specified",
    caste: "ST",
    eligibilityTags: [
      "Scheduled Tribe (ST) only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹2,50,000",
      "Vocational (Engg, Pharmacy, MBA, MCA, etc.)",
      "Reimbursement of Tuition & Exam Fees"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Covers full tuition and exam fees for ST students in specific vocational tracks. Note: If a student fails a year, they will not receive the benefit for that period.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A903EC510F2DCBF009D17A0AB763F0C2343B13AF0AB323366"
  },
  {
    id: 20,
    title: "Tuition Fees and Examination Fees to OBC Students, Maharashtra 2025-26",
    amount: 0, // Reimbursement based on fees (50% or 100% depending on institution type)
    deadline: "2026-03-31",
    provider: "VJNT, OBC, and SBC Welfare Department, Government of Maharashtra",
    matchPercentage: 0,
    category: "Government",
    gender: "All",
    disability: "Not Specified",
    isOrphan: "Not Specified",
    caste: "OBC",
    eligibilityTags: [
      "OBC Category only",
      "Domicile of Maharashtra",
      "Family income ≤ ₹8,00,000",
      "Class 11 and above",
      "Admission through CAP round (for professional courses)",
      "Professional & Non-Professional tracks"
    ],
    isSaved: false,
    userStatus: null,
    userNotes: "Reimburses 100% fees in Govt institutions and 50% in private unaided institutions for professional courses. Deemed University students are ineligible.",
    applicationId: '',
    dateApplied: '',
    reminderDate: '2026-03-24',
    applicationLink: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A19A7691F3B40AD4EE0F3DDA5DE324AC54819922BB3D36B63"
}];
