import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className='container mx-auto px-4 py-16'>
      <h1 className='text-4xl font-bold text-teal-600 mb-4 text-center'>Terms and Conditions</h1>
      <p className='text-center text-gray-500 mb-12'>Last updated: October 26, 2023</p>

      {/* --- Agreement to Terms --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>1. Agreement to Terms</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and HealthLife ("we," "us," or "our"), concerning your access to and use of the <strong>[Your Website URL]</strong> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
        </p>
        <p className='text-gray-700 leading-relaxed'>
          You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.
        </p>
      </div>

      {/* --- Intellectual Property Rights --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>2. Intellectual Property Rights</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
        </p>
        <p className='text-gray-700 leading-relaxed'>
          Except as expressly provided in these Terms and Conditions, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
        </p>
      </div>
      
      {/* --- User Representations --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>3. User Representations</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          By using the Site, you represent and warrant that:
        </p>
        <ul className='list-disc list-inside text-gray-700 leading-relaxed space-y-2'>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            <li>Your use of the Site will not violate any applicable law or regulation.</li>
        </ul>
      </div>

      {/* --- Prohibited Activities --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>4. Prohibited Activities</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:
        </p>
        <ul className='list-disc list-inside text-gray-700 leading-relaxed space-y-2'>
          <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
          <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
          <li>Use the Site to advertise or offer to sell goods and services.</li>
          <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
          <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
          <li>Attempt to impersonate another user or person.</li>
        </ul>
      </div>

      {/* --- Term and Termination --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>5. Term and Termination</h2>
        <p className='text-gray-700 leading-relaxed'>
          These Terms and Conditions shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS AND CONDITIONS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
        </p>
      </div>

      {/* --- Governing Law --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>6. Governing Law</h2>
        <p className='text-gray-700 leading-relaxed'>
          These Terms shall be governed by and defined following the laws of <strong>[Your Country/State]</strong>. HealthLife and yourself irrevocably consent that the courts of <strong>[City, State/Country]</strong> shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>
      </div>

      {/* --- Disclaimer --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>7. Disclaimer</h2>
        <p className='text-gray-700 leading-relaxed mb-4'>
          THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p className='text-gray-700 leading-relaxed'>
          WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, OR (3) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY.
        </p>
      </div>

      {/* --- Limitation of Liability --- */}
      <div className='bg-white p-8 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>8. Limitation of Liability</h2>
        <p className='text-gray-700 leading-relaxed'>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
      </div>

      {/* --- Contact Us --- */}
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>9. Contact Us</h2>
        <p className='text-gray-700 leading-relaxed'>
          In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
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

export default TermsAndConditions;
