import React from 'react';

function SignUpLink(): React.JSX.Element {
  return (
    <p className="text-sm text-gray-600 text-center">
      Don't have an account?
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium ml-1"
      >
        Sign Up
      </a>
    </p>
  );
}

export default SignUpLink;
