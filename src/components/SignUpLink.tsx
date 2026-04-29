import React from 'react';

/**
 * Placeholder "Sign Up" action.
 *
 * Rendered as a `<button>` (not an `<a href="#">`) because it triggers an
 * in-page action rather than navigating to a new URL. Using a button ensures
 * correct keyboard behaviour and screen-reader semantics.
 */
function SignUpLink(): React.JSX.Element {
  function handleClick(): void {
    // TODO: implement sign-up flow (e.g. navigate to /signup)
  }

  return (
    <p className="text-sm text-gray-600 text-center">
      Don&apos;t have an account?{' '}
      <button
        type="button"
        onClick={handleClick}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium bg-transparent border-none p-0 cursor-pointer"
      >
        Sign Up
      </button>
    </p>
  );
}

export default SignUpLink;
