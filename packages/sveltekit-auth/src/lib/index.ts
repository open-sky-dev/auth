export function greet(name = "World") {
  console.log(`Hello from my local package, ${name}!`);
  return `Greetings from the package: ${name}`;
}
