// Выбор случайного числа от min до (max+1)
// Source: https://learn.javascript.ru/task/random-int-min-max

function randomIntegerNumber (min, max) {
  if (min < 0 || max < 0) {
    return('Минимальное и максимальные значения должны быть больше 0');
  }

  if (min >= max) {
    return('Минимальное значение должно быть меньше максимального');
  }

  const rand = min + Math.random() * (max + 1 - min);
  return(Math.floor(rand));
}

randomIntegerNumber(4, 15);


// Проверка длины комментария

function commentLength (userCommentLength, maxLength) {
  if (userCommentLength > maxLength) {
    return false;
  }
  return true;
}

commentLength (30, 140);

// Не уверена, сколько должно быть подписей к фото. В массиве ниже их 25

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

// В задании написано, что нужно выбрать одно или два сообщения из массива снизу. Если я сделаю один элемент массива
// пустым, будет ли это считаться? То есть если он выберет пустую строчку и будет как будто одно.

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  '',
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

const PHOTO_DESCRIPTION_COUNT = 25;

function comment () {
  return {
    // Не знаю пределы для id для комментария
    idComment: _.uniqueId(),
    avatar: `img/avatar-${randomIntegerNumber(1,6)}.svg`,
    message: MESSAGES[randomIntegerNumber(1, MESSAGES.length-1)],
    name: NAMES[randomIntegerNumber(1, NAMES.length-1)],
  };
}

function photoDescription () {
  return {
    url: `photos/${_.random(1, PHOTO_DESCRIPTION_COUNT)}.jpg`,
    description: PHOTO_CAPTIONS[randomIntegerNumber(0, PHOTO_CAPTIONS.length - 1)],
    likes: randomIntegerNumber(15, 200),
    comments: comment(),
  };
}

const getPhotoDescriptions = () => {
  const photoDescriptionsWithoutId = Array.from({length: PHOTO_DESCRIPTION_COUNT}, photoDescription);
  const photoDescriptions = photoDescriptionsWithoutId.map((el, index) => {
    return {
      ...el,
      idPhotoDescription: index + 1,
    };
  });

  return photoDescriptions;

};

getPhotoDescriptions();
