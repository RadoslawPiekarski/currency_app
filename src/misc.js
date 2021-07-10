// console.log("Test");
//
// const bill = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//     resolve("ok");
//     }, 2000);
//
//     setTimeout(()=>{
//         reject("Not ok");
//     },2001);
// });
//
//
// bill.then((result)=>{
//     console.log(result);
//     })
//     .catch((result)=>{
//         console.log(result);
//     })
//     .finally(()=>{
//         console.log("always");
//     });
//
// function*  gen() {
//     console.log(1);
//     yield 2;
//     console.log(3);
//     yield 4;
//     console.log(4);
// }
//
// const g = gen();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
//
// function* gen(idx){
//     let a = idx;
//     let b = yield a;
//     yield b + 10;
// }
//

// const result =fetch('https://jsonplaceholder.typicode.com/todos');
// result.then((res)=>res.json()).then((r)=>console.log(r));

// function* getFutureData() {
//   const result = yield fetch("https://jsonplaceholder.typicode.com/todos/2");
//   console.log(result);
// }
// const res = getFutureData();
// res
//   .next()
//   .value.then((data) => data.json())
//   .then((data) => res.next(data));

// async function getFutureData() {
//   const result = await fetch(
//       "https://jsonplaceholder.typicode.com/todos/2"
//   ).then((r)=>r.json());
//   console.log(result);
// }
//
// getFutureData();


async function getFutureData() {
  const result = await fetch(
      "https://jsonplaceholder.typicode.com/todos/2"
  ).then((r)=>r.json());
  console.log(result);
}




