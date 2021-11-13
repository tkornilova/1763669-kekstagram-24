

//const getComment = (id) => ({
//  id,
//  avatar: `img/avatar-${getRandomIntegerNumber(1,6)}.svg`,
//  message: MESSAGES[getRandomIntegerNumber(1, MESSAGES.length-1)],
//  name: NAMES[getRandomIntegerNumber(1, NAMES.length-1)],
//});

//const getComments = () => Array.from({length: getRandomIntegerNumber(2, 10)}, (_el, i) => getComment(i + 1));

//const getPhotoDescriptionObj = (id) => ({
//  id,
//  url: `photos/${_.random(1, PHOTO_DESCRIPTION_COUNT)}.jpg`,
//  description: PHOTO_CAPTIONS[getRandomIntegerNumber(0, PHOTO_CAPTIONS.length - 1)],
// likes: getRandomIntegerNumber(15, 200),
//  comments: getComments(),
//});

//export const photoDescriptions = Array.from({length: PHOTO_DESCRIPTION_COUNT}, (_el, i) => getPhotoDescriptionObj(i + 1));

export const USER_COMMENT_LENGTH = 5;

export const scaleValueStep = 25;
