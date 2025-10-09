import React, { useState } from 'react';

// --- FAQ Data ---
// It's good practice to keep your data separate from your component logic.
const faqData = [
  {
    id: 1,
    question: 'What is this platform and how does it work?',
    answer: 'Our platform is a secure hospital consultancy service that connects patients with certified doctors for live chat and video consultations. Simply create an account, choose a specialist, book a time slot, and connect with your doctor live from the comfort of your home.',
    category: 'General',
  },
  {
    id: 2,
    question: 'Is this service a replacement for an in-person hospital visit?',
    answer: 'While our platform is excellent for initial consultations, second opinions, and follow-ups, it is not intended to replace emergency medical care. For any critical or life-threatening conditions, please visit your nearest hospital immediately.',
    category: 'General',
  },
  {
    id: 3,
    question: 'Who are the doctors on this platform?',
    answer: 'All doctors on our platform are highly qualified, board-certified specialists who have undergone a rigorous verification process. You can view each doctor\'s profile, including their credentials, experience, and patient reviews, before booking a consultation.',
    category: 'General',
  },
  {
    id: 4,
    question: 'How do I schedule a consultation?',
    answer: 'Scheduling is easy! After logging in, browse our list of doctors, select the one that fits your needs, view their available time slots, and book your appointment. You will receive a confirmation email and a reminder before your session.',
    category: 'For Patients',
  },
  {
    id: 5,
    question: 'What are the consultation fees?',
    answer: 'Consultation fees vary depending on the doctor\'s specialty and experience. The fee for each doctor is clearly listed on their profile. Payment is required at the time of booking to confirm your appointment.',
    category: 'For Patients',
  },
  {
    id: 6,
    question: 'Can I get a prescription through the live chat?',
    answer: 'Yes, if the consulting doctor deems it medically appropriate, they can issue a digital prescription which will be sent directly to your registered email and can be used at most pharmacies.',
    category: 'For Patients',
  },
  {
    id: 7,
    question: 'How do I join the platform as a doctor?',
    answer: 'We are always looking to partner with qualified medical professionals. Please navigate to our "For Doctors" page and fill out the registration form. Our team will review your application and guide you through the verification and onboarding process.',
    category: 'For Doctors',
  },
  {
    id: 8,
    question: 'What are the requirements to become a consultant?',
    answer: 'To join as a consultant, you must have a valid medical license, board certification in your specialty, and a minimum of 5 years of clinical experience. We conduct a thorough background check for all applicants.',
    category: 'For Doctors',
  },
  {
    id: 9,
    question: 'How are payments handled for consultants?',
    answer: 'Payments are processed securely through our platform. Consultants receive their earnings on a bi-weekly basis directly to their linked bank account, minus a small platform service fee.',
    category: 'For Doctors',
  },
  {
    id: 10,
    question: 'What do I do if my video or audio is not working?',
    answer: 'First, check your internet connection and ensure you have given your browser permission to access your camera and microphone. If the problem persists, try refreshing the page. Our live technical support is also available via a chat widget during your consultation.',
    category: 'Technical Support',
  },
  {
    id: 11,
    question: 'Can I share medical reports or images during the chat?',
    answer: 'Yes, our chat interface has a secure file-sharing feature. You can upload documents, lab reports, and images directly in the chat window for the doctor to review in real-time.',
    category: 'Technical Support',
  },
  {
    id: 12,
    question: 'I forgot my password. How can I reset it?',
    answer: 'On the login page, click the "Forgot Password?" link. Enter your registered email address, and we will send you a link to reset your password.',
    category: 'Technical Support',
  },
  {
    id: 13,
    question: 'Is my personal and medical information secure?',
    answer: 'Absolutely. We use end-to-end encryption for all communications and are compliant with industry-standard data privacy regulations (like HIPAA). Your privacy and security are our top priorities.',
    category: 'Privacy & Security',
  },
  {
    id: 14,
    question: 'Are the consultations recorded?',
    answer: 'No, to protect your privacy, live chat and video consultations are never recorded. You will, however, receive a written summary and any prescriptions from the doctor after the session concludes.',
    category: 'Privacy & Security',
  },
  {
    id: 15,
    question: 'How is my payment information stored?',
    answer: 'We do not store your full credit card details on our servers. All payments are handled by a certified, PCI-compliant payment processor, ensuring the highest level of security for your financial information.',
    category: 'Privacy & Security',
  },
];

// --- Individual FAQ Item Component ---
const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-gray-800 focus:outline-none"
        onClick={onClick}
      >
        <span className="text-md md:text-lg font-medium">{question}</span>
        <span className="transform transition-transform duration-300">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};


// --- Main FAQ Section Component ---
const FaqSection = () => {
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamically get unique categories from the data, including 'All'
  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  const filteredFaqs = activeCategory === 'All'
    ? faqData
    : faqData.filter(faq => faq.category === activeCategory);

  const handleToggle = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Can't find the answer you're looking for? We're here to help.
        </p>

        {/* Category Buttons */}
        <div className="mt-10 flex justify-center flex-wrap gap-2 sm:gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenQuestionId(null); // Close any open question when changing category
              }}
              className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-300
                ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-blue-600 hover:bg-blue-100 border border-blue-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="mt-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openQuestionId === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No questions in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;