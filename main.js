//output Totale

let title = document.getElementById("title");
let Price = document.getElementById("Price");
let Fees = document.getElementById("Fees");
let Ads = document.getElementById("Ads");
let Discount = document.getElementById("Discount");
let totle = document.getElementById("totle")
let count = document.getElementById("count")
let Category = document.getElementById("Category")
let submit = document.getElementById("submit");
let btnDeletAll = document.getElementById("deletAll");


//help Variables ->
let situation = "Create";
let swap;
// <-|
function outputTotle(){
    if(Price.value != ""){
      let result =`${(+Price.value + +Fees.value + +Ads.value)- (+Discount.value)} $` ;
      totle.innerHTML = result; 
      totle.style.background = "black"
    }else{
        totle.innerHTML = "";
        totle.style.background = "rgb(209, 14, 14)"
    }
    
}



// Start create Product
let arry;
if(localStorage.product != null){
  arry = JSON.parse(localStorage.product);
}else{
  arry=[];
}

submit.onclick = function(){
    let newPro = {
    title:title.value.toLowerCase(),
    Price:Price.value,
    Fees:Fees.value,
    Ads:Ads.value,
    Discount:Discount.value,
    totle:totle.innerHTML,
    count:count.value,
    Category:Category.value.toLowerCase(),
    }

if(title.value != "" && Category.value != "" && count.value <= 100){
  if(situation === "Create"){
if(count.value > 1){
     for(let i = 0 ; i < newPro.count;i++){
    arry.push(newPro)
      }
}else{
    arry.push(newPro)
}
}else{
  arry[swap] = newPro;
  submit.innerHTML = "Create";
  count.style.display = "block"
}
clearData()
}

    
    localStorage.setItem('product' , JSON.stringify(arry));
 
    showData()
    

//save localestorge 
}// End create Product 


// start clear inputs
function clearData(){
  title.value = '';
  Price.value = '';
  Fees.value = '';
  Ads.value = '';
  Discount.value = '';
  totle.innerHTML = '';
  count.value = '';
  Category.value = '';
}// end clear inputs


//Start reed product
function showData(){

  let table = "";
  for(let i = 0 ; i < arry.length;i++){
    table += `
    <tr>
           <th>${[i+1]}</th>
           <th>${arry[i].title}</th>
           <th>${arry[i].Price}</th>
           <th>${arry[i].Fees}</th>
           <th>${arry[i].Ads}</th>
           <th>${arry[i].Discount}</th>
           <th>${arry[i].totle}</th>
           <th>${arry[i].Category}</th>
           <th><button onclick ="Update(${i})" id="Update">Update</button></th>
           <th><button onclick ="deleteOnProduct(${i})" id="Delete">Delete</button></th>
      </tr>  
    `
    
  }

  document.getElementById("tbody").innerHTML = table;
if(arry.length > 0){ // privet Delete All
  btnDeletAll.innerHTML=`
   <button id="btn" onclick = "deletAll()">Delete All:(${arry.length})</button>

  `
}else{
  btnDeletAll.innerHTML = "";
}

}//End reed product

showData() //this made function is always show glapla page to so looked user



//Sart(delete one product)
  function deleteOnProduct(i){
    arry.splice(i,1);
    localStorage.product = JSON.stringify(arry)
    showData()
    
  }

//delete All
function deletAll(){
  localStorage.clear();
  arry.splice(0);
  showData()
}//End(delete one product) and All
//i would did when click on create  is number he show in deleteAll-?


//Start count and update
function Update(i){
  title.value = arry[i].title
  Price.value = arry[i].Price
  Fees.value = arry[i].Fees
  Ads.value = arry[i].Ads
  Discount.value = arry[i].Discount
  totle.innerHTML = arry[i].totle
  count.style.display = "none"
  submit.innerHTML = "Update"
  Category.value = arry[i].Category
  situation = "Update";
  swap = i;  scroll({
    top:0,
    behavior:"smooth",
  })

}//End count and update




//Start search
let searchMood = "Title";


function getSearch(id){        //this function used selected in btns only

  let search = document.getElementById("search");
  if(id == "searchTitle"){
    searchMood = "Title";
    search.placeholder = "search by Title";
  }else{
    searchMood = "Category";
    search.placeholder = "search by Category";
  }
  search.focus()
  search.value = "";
  
}

function realResearch(value){
  let table = "";
    if(searchMood == "Title"){
      for(let i = 0 ; i < arry.length; i++){
        if(arry[i].title.includes(value.toLowerCase())){
          table += `
          <tr>
                 <th>${[i]}</th>
                 <th>${arry[i].title}</th>
                 <th>${arry[i].Price}</th>
                 <th>${arry[i].Fees}</th>
                 <th>${arry[i].Ads}</th>
                 <th>${arry[i].Discount}</th>
                 <th>${arry[i].totle}</th>
                 <th>${arry[i].Category}</th>
                 <th><button onclick ="Update(${i})" id="Update">Update</button></th>
                 <th><button onclick ="deleteOnProduct(${i})" id="Delete">Delete</button></th>
            </tr>  
          `
        }
      }
    }else{
        if( searchMood == "Category"){
          for(let i = 0 ; i < arry.length; i++){
            if(arry[i].Category.includes(value)){
              table += `
              <tr>
                     <th>${[i]}</th>
                     <th>${arry[i].title}</th>
                     <th>${arry[i].Price}</th>
                     <th>${arry[i].Fees}</th>
                     <th>${arry[i].Ads}</th>
                     <th>${arry[i].Discount}</th>
                     <th>${arry[i].totle}</th>
                     <th>${arry[i].Category}</th>
                     <th><button onclick ="Update(${i})" id="Update">Update</button></th>
                     <th><button onclick ="deleteOnProduct(${i})" id="Delete">Delete</button></th>
                </tr>  
              `
        }
      }
      

    }
}
document.getElementById("tbody").innerHTML = table;

}//End search





// start collapse

// end collapse



