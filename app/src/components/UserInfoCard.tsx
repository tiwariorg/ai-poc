import React from 'react';

export interface UserInfoCardProps {
  name: string;
  email: string;
  role: string;
}

function UserInfoCard({ name, email, role }: UserInfoCardProps): React.JSX.Element {
  return (
    <div className="user-info-card">
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
    </div>
  );
}

export default UserInfoCard;
