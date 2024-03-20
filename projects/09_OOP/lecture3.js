// ---- ---- Object Constructor ---- ----
// The least used way to create Class-like
// 💡 But crucial when implementing class-inheritance
const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  // For Sarah
  // ENTIRELY NOT constructor
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
console.log(sarah);

// ---- ---- Inheritance ---- ----
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I studied ${this.course}`);
};

const mike = new Student("Mike", 2000, "Computer Science");
console.log(mike);
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);
mike.introduce();
mike.calcAge();
