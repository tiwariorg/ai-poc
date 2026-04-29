import React from 'react';

import { useAuthContext } from '../../context/AuthContext';
import styles from './UserProfile.module.css';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derives up-to-two uppercase initials from a full name string.
 *
 * @param name - The user's display name.
 * @returns One or two uppercase characters representing the user's initials.
 *
 * @example
 * getInitials('Admin User') // → 'AU'
 * getInitials('Alice')      // → 'A'
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0 || parts[0] === '') {
    return '?';
  }

  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';

  return (first + last).toUpperCase();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `UserProfile` displays the authenticated user's profile information in a
 * card-style container. It reads user data directly from `AuthContext` so it
 * requires no props.
 *
 * When there is no authenticated user it renders a friendly fallback message.
 */
function UserProfile(): React.JSX.Element {
  const { user } = useAuthContext();

  if (user === null) {
    return (
      <section className={styles.card} aria-label="User profile">
        <h1 className={styles.heading}>User Profile</h1>
        <p className={styles.empty}>No user data available.</p>
      </section>
    );
  }

  const initials = getInitials(user.name);

  return (
    <section className={styles.card} aria-label="User profile">
      <h1 className={styles.heading}>User Profile</h1>

      {/* Avatar */}
      <div className={styles.avatarWrapper}>
        <div
          className={styles.avatar}
          aria-hidden="true"
          title={user.name}
        >
          {initials}
        </div>
      </div>

      {/* User details */}
      <ul className={styles.infoList} aria-label="User details">
        <li className={styles.infoItem}>
          <p style={{ margin: 0 }}>
            <strong>Name:</strong> {user.name}
          </p>
        </li>
        <li className={styles.infoItem}>
          <p style={{ margin: 0 }}>
            <strong>Email:</strong> {user.email}
          </p>
        </li>
        <li className={styles.infoItem}>
          <p style={{ margin: 0 }}>
            <strong>Role:</strong> {user.role}
          </p>
        </li>
      </ul>
    </section>
  );
}

export default UserProfile;
