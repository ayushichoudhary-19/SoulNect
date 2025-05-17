export const avatarMap = {
  twin_pink: "/assets/avatars/avatar1.png",
  charming_curls: "/assets/avatars/avatar2.png",
  cheeky_champ: "/assets/avatars/avatar3.png",
  glasses_blonde: "/assets/avatars/avatar4.png",
  cool_confident: "/assets/avatars/avatar5.png",
  smiley_senior: "/assets/avatars/avatar6.png",
};

export const getAvatarUrl = (avatarKey) => {
  return avatarKey && avatarMap[avatarKey] 
    ? avatarMap[avatarKey] 
    : null;
};