const QuizQuestions = [
  {
    question: 'Which symbol is used for comments in HTML?',
    type: 'radio',
    options: ['<!-- Comment /—>', '#Comment', '//Comment', '/* Comment */'],
    answer: '<!-- Comment /—>',
  },
  {
    question: 'Which of the following is NOT an object-oriented language?',
    type: 'radio',
    options: ['C++', 'Java', 'Python', 'C'],
    answer: 'C',
  },
  {
    question: 'What 200 in Binary?',
    type: 'input',
    answer: '11001000',
  },
  {
    question: 'What is the method signature for the main function in Java?',
    type: 'textarea',
    answer: 'public static void main(String[] args)',
  },
  {
    question: 'What is recursion in coding?',
    type: 'radio',
    options: ['a method that runs concurrently throughout the entire program', 'a method that calls itself in its implementation', 'a method that calls recursion()', 'a method that calls other methods'],
    answer: 'a method that calls itself in its implementation',
  },
  {
    question: 'What room is where ICSpace, the student lounge for the ICS department, occupies? (HINT: ____ ____)',
    type: 'input',
    answer: 'POST 318B',
  },
  {
    question: 'Which function is used to dereference space in dynamic memory in C++?',
    type: 'radio',
    options: ['malloc()', 'free()', 'delete', 'none'],
    answer: 'delete',
  },
  {
    question: 'What underscore function can be used to extract a list of property values?',
    type: 'radio',
    options: ['_.contains', '_.filter', '_.same', '_.pluck'],
    answer: '_.pluck',
  },
  {
    question: 'What command is used to start a meteor application (using npm script)',
    type: 'input',
    answer: 'meteor npm run start',
  },
  {
    question: 'In JavaScript, what does the Array.prototype.includes() method return if the array contains the specified element?',
    type: 'radio',
    options: ['the index of the element in the array', 'the element itself', 'true', 'false'],
    answer: 'true',
  },
];

export default QuizQuestions;
