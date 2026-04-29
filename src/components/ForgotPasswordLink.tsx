import React from 'react';

/**
 * Placeholder "Forgot Password?" link.
 *
 * Rendered as an `<a href="#">` that suppresses default navigation via
 * `e.preventDefault()`. This is a non-functional placeholder — the actual
 * forgot-password flow (e.g. modal or /forgot-password route) should be
 * wired in once that feature is implemented.
 */
function ForgotPasswordLink(): React.JSX.Element {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    // TODO: implement forgot-password flow (e.g. open modal or navigate to /forgot-password)
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
    >
      Forgot Password?
    </a>
  );
}

export default ForgotPasswordLink;
