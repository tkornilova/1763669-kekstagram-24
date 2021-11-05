import { getRandomIntegerNumber } from './utils.js';

const PHOTO_DESCRIPTION_COUNT = 25;

const PHOTO_CAPTIONS = [
  'Это моя жизнь, и мне так повезло ее жить.',
  'В любой ситуации всегда улыбайтесь.',
  'Не сомневайся, просто делай и осуществи мечту.',
  'Что вы об этом думаете?',
  'Соскучились?',
  'Я устал сегодня. Пожалуйста, дайте мне новый день.',
  'Позвольте жизни вас удивить.',
  'Лучшие моменты ждут вас за пределами зоны комфорта.',
  'Кусочек настоящей жизни.',
  '*Добавить остроумную подпись*',
  'Да, еще одно фото.',
  'Когда радости нет предела.',
  'Любовь в каждом пикселе.',
  'Как мало нужно для счастья.',
  'On my way to paradise.',
  'Релаксирую. А как вы проводите выходные?',
  'А как выглядит ваш идеальный день?',
  'Просто оставлю это здесь.',
  'Просто красивое фото.',
  'Такое же фото, как все остальные.',
  'Наконец-то, пятница.',
  'Наши уютные вечера.',
  'Навстречу новым приключениям.',
  'Коллекционирую эмоции.',
  'Вперед к новым вершинам.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Семён',
  'Александра',
  'Марк',
  'Арина',
  'Лев',
  'Дарья',
  'Максим',
  'Анна',
  'Даниил',
  'Кристина',
  'Виктор',
  'Майя',
  'Дмитрий',
  'Алиса',
  'Анастасия',
  'Илья',
  'София',
  'Артём',
  'Алиса',
  'Глеб',
  'Мария',
  'Александр',
  'Ольга',
  'Андрей',
];

const getComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomIntegerNumber(1,6)}.svg`,
  message: MESSAGES[getRandomIntegerNumber(1, MESSAGES.length-1)],
  name: NAMES[getRandomIntegerNumber(1, NAMES.length-1)],
});

const getComments = () => Array.from({length: getRandomIntegerNumber(2, 10)}, (_el, i) => getComment(i + 1));

const getPhotoDescriptionObj = (id) => ({
  id,
  url: `photos/${_.random(1, PHOTO_DESCRIPTION_COUNT)}.jpg`,
  description: PHOTO_CAPTIONS[getRandomIntegerNumber(0, PHOTO_CAPTIONS.length - 1)],
  likes: getRandomIntegerNumber(15, 200),
  comments: getComments(),
});

export const photoDescriptions = Array.from({length: PHOTO_DESCRIPTION_COUNT}, (_el, i) => getPhotoDescriptionObj(i + 1));

export const USER_COMMENT_LENGTH = 5;
