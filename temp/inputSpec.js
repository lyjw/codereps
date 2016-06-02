var userSolution = function() {
var Person = { 
  // Enter your code here
  name: "Nicholas",
  age: 29
}

return Person;
}

describe("Create an object named Person with a name of Nicholas (string) and age of 29 (Integer)", function() {
  it("returns an object", function() {
    var person = userSolution();
    expect(person).toEqual({ name: "Nicholas", age: 29 });
  });
});