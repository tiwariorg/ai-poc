import React from 'react';

import LoginForm from './LoginForm';

function LoginPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Sign In
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
