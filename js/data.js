import {randomIntegerNumber} from './scripts';
import {PHOTO_DESCRIPTION_COUNT, PHOTO_CAPTIONS, MESSAGES, NAMES} from './constants';

function getComment () {
  return {
    idComment: _.uniqueId(),
    avatar: `img/avatar-${randomIntegerNumber(1,6)}.svg`,
    message: MESSAGES[randomIntegerNumber(1, MESSAGES.length-1)],
    name: NAMES[randomIntegerNumber(1, NAMES.length-1)],
  };
}

function getPhotoDescriptionObj () {
  return {
    url: `photos/${_.random(1, PHOTO_DESCRIPTION_COUNT)}.jpg`,
    description: PHOTO_CAPTIONS[randomIntegerNumber(0, PHOTO_CAPTIONS.length - 1)],
    likes: randomIntegerNumber(15, 200),
    comments: getComment(),
  };
}

const getPhotoDescriptions = () => {
  const photoDescriptionsWithoutId = Array.from({length: PHOTO_DESCRIPTION_COUNT}, getPhotoDescriptionObj);
  const photoDescriptions = photoDescriptionsWithoutId.map((el, index) => ({
    ...el,
    idPhotoDescription: index + 1,
  }));

  return photoDescriptions;

};

getPhotoDescriptions();

export {getPhotoDescriptions};
