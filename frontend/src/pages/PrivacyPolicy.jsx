import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-4xl font-bold text-teal-600 mb-4 text-center'>Privacy Policy</h1>
      <p className='text-center text-gray-500 mb-12'>Last updated: October 26, 2023</p>

      {/* --- Introduction --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>1. Introduction</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Welcome to HealthLife ("we," "us," or "our"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and when using our services (collectively, the "Services").
        </p>
        <p className='text-gray-700 leading-relaxed mb-4'>
          This Privacy Policy outlines our practices regarding the collection, use, disclosure, and safeguarding of your information when you visit our website <strong>[Your Website URL]</strong>. It also describes your privacy rights and how the law protects you.
        </p>
        <p className='text-gray-700 leading-relaxed'>
          Please read this Privacy Policy carefully. By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our Services.
        </p>
      </div>

      {/* --- Information We Collect --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>2. Information We Collect</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>

        <h3 className='text-xl font-semibold text-gray-800 mb-2 mt-6'>Personal Data</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
        </p>

        <h3 className='text-xl font-semibold text-gray-800 mb-2 mt-6'>Derivative Data</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
        </p>

        <h3 className='text-xl font-semibold text-gray-800 mb-2 mt-6'>Financial Data</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, or exchange from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, <strong>[e.g., Stripe, PayPal]</strong>, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
        </p>
      </div>

      {/* --- Use of Your Information --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>3. Use of Your Information</h2>
        <p className='text-gray-700 leading-relaxed'>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul className='list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2'>
          <li>Create and manage your account.</li>
          <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Generate a personal profile about you to make your visit to the Site more personalized.</li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Notify you of updates to the Site and our services.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
          <li>Perform other business activities as needed.</li>
          <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          <li>Request feedback and contact you about your use of the Site.</li>
        </ul>
      </div>

      {/* --- Disclosure of Your Information --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>4. Disclosure of Your Information</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul className='list-disc list-inside text-gray-700 leading-relaxed mt-4 space-y-2'>
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
        </ul>
      </div>

      {/* --- Tracking Technologies --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>5. Tracking Technologies</h2>
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>Cookies and Web Beacons</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
        </p>
      </div>

      {/* --- Security of Your Information --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>6. Security of Your Information</h2>
        <p className='text-gray-700 leading-relaxed'>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>
      </div>

      {/* --- Policy for Children --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>7. Policy for Children</h2>
        <p className='text-gray-700 leading-relaxed'>
          We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
        </p>
      </div>

      {/* --- Your Privacy Rights --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>8. Your Privacy Rights</h2>
        <h3 className='text-xl font-semibold text-gray-800 mb-2'>Account Information</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
            You may at any time review or change the information in your account or terminate your account by:
        </p>
        <ul className='list-disc list-inside text-gray-700 leading-relaxed ml-4'>
            <li>Logging into your account settings and updating your account.</li>
            <li>Contacting us using the contact information provided below.</li>
        </ul>
        <h3 className='text-xl font-semibold text-gray-800 mb-2 mt-6'>Emails and Communications</h3>
        <p className='text-gray-700 leading-relaxed mb-4'>
            If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
        </p>
         <ul className='list-disc list-inside text-gray-700 leading-relaxed ml-4'>
            <li>Noting your preferences at the time you register your account with the Site.</li>
            <li>Logging into your account settings and updating your preferences.</li>
            <li>Clicking the unsubscribe link in the footer of our emails.</li>
        </ul>
      </div>

      {/* --- Changes to this Policy --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>9. Changes to This Privacy Policy</h2>
        <p className='text-gray-700 leading-relaxed'>
          We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </div>

      {/* --- Contact Us --- */}
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>10. Contact Us</h2>
        <p className='text-gray-700 leading-relaxed'>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <p className='text-gray-700 leading-relaxed mt-4'>
            <strong>Cywala Inc.</strong><br/>
            .ULTIMATE ELECTRONICS. 10-3-6/5/A Beside Max Showroom MehdTelangana<br/>
            Hyderabad 500028 Telangana<br/>
            <a href="mailto:info@cywala.com" className='text-teal-600 hover:underline'>info@cywala.com</a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
