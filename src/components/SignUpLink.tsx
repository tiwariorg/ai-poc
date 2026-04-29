import React from 'react';

/**
 * Placeholder "Sign up" link rendered inside a descriptive paragraph.
 *
 * Uses an `<a href="#">` with `e.preventDefault()` to suppress navigation.
 * This is a non-functional placeholder — the actual sign-up flow (e.g.
 * navigating to /signup or opening a modal) should be wired in once that
 * feature is implemented.
 */
function SignUpLink(): React.JSX.Element {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    // TODO: implement sign-up flow (e.g. navigate to /signup)
  }

  return (
    <p className="text-sm text-gray-600 text-center">
      Don&apos;t have an account?{' '}
      <a
        href="#"
        onClick={handleClick}
        className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
      >
        Sign up
      </a>
    </p>
  );
}

export default SignUpLink;
