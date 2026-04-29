import React from 'react';

/**
 * Placeholder "Forgot Password?" action.
 *
 * Rendered as a `<button>` (not an `<a href="#">`) because it triggers an
 * in-page action rather than navigating to a new URL. Using a button ensures
 * correct keyboard behaviour and screen-reader semantics.
 */
function ForgotPasswordLink(): React.JSX.Element {
  function handleClick(): void {
    // TODO: implement forgot-password flow (e.g. open modal or navigate to /forgot-password)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none p-0"
    >
      Forgot Password?
    </button>
  );
}

export default ForgotPasswordLink;
