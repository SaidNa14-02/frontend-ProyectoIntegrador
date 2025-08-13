import React from 'react';
import defaultAvatar from './assets/defaultAvatar.png';
import './styles/Profile.css';

function GetAvatar({ avatar = defaultAvatar, updateAvatar, text = 'Get avatar!' }) {
  const fr = new FileReader();
  const myFileField = React.createRef();

  const uploadImage = (ev) => {
    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];
      fr.addEventListener('load', getImage);
      fr.readAsDataURL(myFile);
    }
  };

  const getImage = () => {
    const image = fr.result;
    updateAvatar(image);
  };

  return (
    <div className="get-avatar">
      <label className="get-avatar__label">
        {text}
        <input
          type="file"
          ref={myFileField}
          style={{ display: 'none' }}
          onChange={uploadImage}
        />
      </label>

      <div
        className="get-avatar__preview"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
    </div>
  );
}

export default GetAvatar;