// FollowButton.js
import { useState } from 'react';
//import { followWriter, unfollowWriter } from '../utils/api';

const FollowButton = ({ writerId, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowToggle = async () => {
    if (following) {
      //await unfollowWriter(writerId);
      setFollowing(false);
    } else {
      //await followWriter(writerId);
      setFollowing(true);
    }
  };

  return (
    <button 
      onClick={handleFollowToggle}
      style={{
        backgroundColor: following ? '#74b9ff' : '#0984e3',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
        {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
