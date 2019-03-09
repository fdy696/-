```
async function show(){
  alert("a");
  await 12;
  alert("b")
}

show()

```
// async function show(){
//   alert("a");
//   await 12;
//   alert("b")
// }

// show()
```
async function show(){
  alert('a')
  await new Promise((resolve,reject)=>{
    setTimeout(function(){
      resolve()
    },5000)
  })
  alert("b")
}

show()

```

