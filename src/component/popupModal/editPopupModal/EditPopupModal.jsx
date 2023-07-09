import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import CloseIcon from "../../../assets/closeIcon.svg";
import CameraIcon from "../../../assets/camera.svg";
import WhiteCloseIcon from "../../../assets/whiteClose.svg";
import "./EditPopupModal.scss";
import { updateUserProfile } from "../../../api/popupEditModal";
import defaultBanner from "../../../assets/backgroundImage.svg";
import defaultUserLogo from "../../../assets/logoGray.svg";

const EditPopupModal = ({
  open,
  onClose,
  userData,
  onUserDataUpdate,
  setUserData,
}) => {
  const [username, setUsername] = useState(userData.user.name);
  const [intro, setIntro] = useState(userData.user.introduction);
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState(null);
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const [errorMessageUsername, setErrorMessageUsername] = useState(null);
  const [errorMessageIntro, setErrorMessageIntro] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  useEffect(() => {
    if (isSaving) {
      saveUserData();
    }
  }, [isSaving]);

  const handlePopupClose = () => {
    onClose();
  };

  const handleRemoveBackgroundPhoto = () => {
    setBackgroundPhotoFile(null);
  };

  const handleBackgroundPhotoUpload = (e) => {
    const file = e.target.files[0];
    setBackgroundPhotoFile(file);

    const updatedData = {
      ...updatedUserData,
      banner: file,
    };
    setUpdatedUserData(updatedData);
  };

  const handleUserPhotoUpload = (e) => {
    const file = e.target.files[0];
    setUserPhotoFile(file);

    const updatedData = {
      ...updatedUserData,
      avatar: file,
    };
    setUpdatedUserData(updatedData);
  };

  const handleUsernameChange = (e) => {
    const updatedName = e.target.value;
    setUsername(updatedName);
    setErrorMessageUsername(null);

    const updatedData = {
      ...updatedUserData,
      name: updatedName,
    };
    setUpdatedUserData(updatedData);
  };

  const handleIntroChange = (e) => {
    const updatedIntro = e.target.value;
    setIntro(updatedIntro);
    setErrorMessageIntro(null);

    const updatedData = {
      ...updatedUserData,
      introduction: updatedIntro,
    };
    setUpdatedUserData(updatedData);
  };

  const saveUserData = async () => {
    const formData = new FormData();
    formData.append("avatar", userPhotoFile);
    formData.append("banner", backgroundPhotoFile);
    formData.append("name", username);
    formData.append("introduction", intro);

    const updatedData = {
      ...userData.user,
      ...updatedUserData,
      banner: backgroundPhotoFile
        ? URL.createObjectURL(backgroundPhotoFile)
        : userData.user.banner,
      avatar: userPhotoFile
        ? URL.createObjectURL(userPhotoFile)
        : userData.user.avatar,
    };

    try {
      const response = await updateUserProfile(userData.user.id, formData);
      console.log("Update successful:", response);
      onUserDataUpdate(updatedData);
      setUserData({ ...userData, user: updatedData });
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleSave = () => {
    if (username.length > 50 && intro?.length > 160) {
      setErrorMessageUsername("Exceeded character limit!");
      setErrorMessageIntro("Exceeded character limit!");
      return;
    } else if (username.length > 50) {
      setErrorMessageUsername("Exceeded character limit!");
      setErrorMessageIntro(null);
      return;
    } else if (intro?.length > 160) {
      setErrorMessageIntro("Exceeded character limit!");
      setErrorMessageUsername(null);
      return;
    } else if (!username.length) {
      setErrorMessageUsername("Name cannot be empty!");
      return;
    }

    if (Object.keys(updatedUserData).length === 0) {
      onClose();
      return;
    }
    setIsEditSuccess(true);
    setIsSaving(true);
  };

  const popupContentStyle = isMobile
    ? {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        borderRadius: "0",
        background: "var(--white)",
      }
    : {
        position: "absolute",
        top: "56px",
        left: "50%",
        width: "634px",
        height: "auto",
        borderRadius: "14px",
        background: "var(--white)",
        transform: "translateX(-50%)",
      };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Popup
      open={open}
      modal
      closeOnDocumentClick
      onClose={handlePopupClose}
      contentStyle={popupContentStyle}
      overlayStyle={overlayStyle}
    >
      <div className="editModal">
        {isEditSuccess && (
          <div className="successMessage">Edit successful!</div>
        )}
        <div className="modalHeader">
          <img
            src={CloseIcon}
            alt="close"
            className="close"
            onClick={handlePopupClose}
          />
          <h5 className="medium">Edit profile</h5>
          <button type="submit" className="orangeButton" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="modalBody">
          <div className="background">
            {backgroundPhotoFile ? (
              <img
                src={URL.createObjectURL(backgroundPhotoFile)}
                alt="background"
                className="backgroundImage"
              />
            ) : (
              <img
                src={userData.user.banner ?? defaultBanner}
                alt="background"
                className="backgroundImage"
              />
            )}
            <div className="backgroundOverlay">
              <label htmlFor="backgroundPhotoInput">
                <input
                  type="file"
                  id="backgroundPhotoInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleBackgroundPhotoUpload}
                />
                <img src={CameraIcon} alt="camera" className="cameraIcon" />
              </label>
              {backgroundPhotoFile && (
                <img
                  src={WhiteCloseIcon}
                  alt="close"
                  className="whiteCloseIcon"
                  onClick={handleRemoveBackgroundPhoto}
                />
              )}
            </div>
          </div>
          <div className="editUserAvatar">
            {userPhotoFile ? (
              <img
                src={URL.createObjectURL(userPhotoFile)}
                alt="avatar"
                className="avatarIcon"
              />
            ) : (
              <img
                src={userData.user.avatar ?? defaultUserLogo}
                alt="avatar"
                className="avatarIcon"
              />
            )}
            <div className="editUserAvatarOverlay">
              <label htmlFor="userPhotoInput">
                <input
                  type="file"
                  id="userPhotoInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUserPhotoUpload}
                />
                <img src={CameraIcon} alt="camera" className="cameraIcon" />
              </label>
            </div>
          </div>
        </div>
        <div className="userContext">
          <div
            className={`nameInputContainer ${
              errorMessageUsername ? "error" : ""
            }`}
          >
            <label htmlFor="nameInput" className="inputLabel nameLabel">
              Name
            </label>
            <input
              id="nameInput"
              className="nameInput"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          {errorMessageUsername && (
            <p className="errorMessage">{errorMessageUsername}</p>
          )}
          <div
            className={`introInputContainer ${
              errorMessageIntro ? "error" : ""
            }`}
          >
            <label htmlFor="introInput" className="inputLabel introLabel">
              Bio
            </label>
            <textarea
              id="introInput"
              className="introInput"
              value={intro}
              onChange={handleIntroChange}
            />
          </div>
          {errorMessageIntro && (
            <p className="errorMessage">{errorMessageIntro}</p>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default EditPopupModal;
