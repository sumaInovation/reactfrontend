import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaWhatsapp } from 'react-icons/fa';

const SocialMediaIcons = () => {
  return (
   <>
   <div className='text-white p-3 z-30 fixed right-2 top-80'>
    <ul>
      <li className='pb-14'>
        <a href="/analytics">
        <FaFacebook size={40} color='blue' />
        </a>
      
      </li>
      <li className='pb-14'>
        <a href="/analytics">
        <FaWhatsapp size={40} color='green' />
        </a>
      
      </li>
      
      
    </ul>
   </div>
   </>
  );
};

export default SocialMediaIcons;
