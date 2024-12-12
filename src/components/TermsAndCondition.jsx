import React from "react";


const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h2>Terms and Conditions</h2>
      <div className="terms-text">
        <p>
          By using this service, you agree to the following terms and conditions:
        </p>
        <ul>
          <li>1. You agree to not misuse the platform for illegal activities.</li>
          <li>2. You agree to follow the community guidelines.</li>
          <li>3. We reserve the right to terminate accounts with violations.</li>
          <li>4. Your data will be handled in accordance with our privacy policy.</li>
          <li>5. You may not transfer your account without approval.</li>
        </ul>
        <p>
          By continuing, you acknowledge that you have read and understood our Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
