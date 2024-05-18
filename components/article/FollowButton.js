import { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FollowButton = ({ writerId }) => {
  const [readerId, setReaderId] = useState("");
  const [following, setFollowing] = useState(false);
  const followId = "follow" + uuidv4();

  useEffect(()=>{
    const readerId = localStorage.getItem("userId");
    setReaderId(readerId);
    const getFollow = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/follow/get`, {
          method: 'POST',
          body:JSON.stringify({
            readerId: readerId,
            writerId:writerId,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
          },
        });
        
        if (response.status == 200) {  
          setFollowing(true);
        } 
    
        // Handle response as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getFollow();
  },[writerId]);

console.log(following);
const followWriter = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/follow/save`, {
      method: 'POST',
      body: JSON.stringify(
        {
          id:followId,
          readerId: readerId,
          writerId:writerId,
        }
      ),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
      },
    });
    // Handle response as needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const unfollowWriter = async() => {
  try {
    const response = await fetch(`http://localhost:3001/api/follow/delete`, {
      method: 'DELETE',
      body: JSON.stringify(
        {
          readerId: readerId,
          writerId:writerId,
        }
      ),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
      },
    });
    console.log(response);
    // Handle response as needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
};

  const handleFollowToggle = async () => {
    if (following) {
      await unfollowWriter();
      setFollowing(false);
    } else {
      await followWriter();
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
