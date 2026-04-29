import React from 'react';

function ForgotPasswordLink(): React.JSX.Element {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
    >
      Forgot Password?
    </a>
  );
}

export default ForgotPasswordLink;
