const showPassInput = document.querySelector("#showpass"),
  form = document.querySelector("form")
  password = document.querySelector('#password'),
  eye = form.querySelector(".fa-eye"),
  addMenu = document.querySelector("#addMenu"),
  ul = document.querySelector("ul"),
  username = document.querySelector("#username")
  
showPassInput.addEventListener("change", e => {
  let bool = showPassInput.checked
  password.type = "password"
  eye.classList.remove("fa-eye-slash")
  eye.classList.add("fa-eye")
  if(bool){
    password.type = "text"
    eye.classList.remove("fa-eye")
    eye.classList.add("fa-eye-slash")
  }
})

function showMenu(){
  addMenu.style.display = "flex"
  username.focus()
}

ul.addEventListener('click', e => {
  addMenu.style.display = "none"
})
form.addEventListener("submit", e => {
  e.preventDefault()
  let name = username.value,
    pass = password.value,
    array = load(),
    obj = {name: name, pass: pass}
  array.push(obj)
  save(array)
  writeToList(obj)
  addMenu.style.display = "none"
  username.value = ""
  password.value = ""
})

function loadAll(){
  let array = load()
  try{
    array.forEach(el => {
      let id = array.indexOf(el)
      writeToList(el, id)
    })
  }catch(err){
    writeToList(array, 0)
  }
}

function writeToList(el, id){
  let name = el.name,
    pass = el.pass,
    li = document.createElement("li")
  li.id = `a${id}`
  li.innerHTML = `<p>${name}<br><br>
    <input type="password" value="${pass}" readonly/>
    <i onclick="deleteCred(a${id})" class="fa fa-trash right"></i>
    <label class="right">
    <i class="fa fa-eye" ></i>
    <input type="checkbox" onchange="toggleViewInList(a${id})" hidden>
    </label>
    <i onclick="copyPass(a${id})" class="fa fa-copy right"></i>
    </p>`
  ul.appendChild(li)
}
function toggleViewInList(con){
  let input = con.querySelector('input'),
    checkBox = con.querySelector('label').querySelector('input'),
    eye = con.querySelector('i')
  input.type = "password"
  eye.classList.remove("fa-eye-slash")
  eye.classList.add("fa-eye")
  if(checkBox.checked){
    input.type = "text"
    eye.classList.remove("fa-eye")
    eye.classList.add("fa-eye-slash")
  }
}

function copyPass(con){
  let input = con.querySelector('input')
  input.select()
  input.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(input.value)
}
function deleteCred(con){
  con.innerHTML = ""
  con.parentNode.removeChild(con)
  let array = load(),
    id = con.id.replace(/a/, "")
  
  array.forEach(el => {
    if(array.indexOf(el) == id){
      if(id == 0){
        array = array.shift()
        console.log(5)
      }else{
        array = array.splice(1, id)
      }
    }
   save(array)
  })
}

function load(){
  return JSON.parse(localStorage.nameAndPass);
}
function save(value){
  localStorage.nameAndPass = JSON.stringify(value)
}
function init(){
  if(localStorage.nameAndPass == "undefined"){
    localStorage.nameAndPass = "[]"
  }
  loadAll()
}
init()