
 let productArray=[];
function chckAuth(){
            let sessionUser = localStorage.getItem('session-user');
            let str;
            if(sessionUser){
              let userObj = JSON.parse(sessionUser);
              str =`
                   <span>Welcome to ${userObj.username.toUpperCase()}</span>
                 <button onclick="logout()" class="nav-link">logout</button>
               `
            }
            else{
                str=` <a href="login.html" class="nav-link">Login</a>`
            }

            document.getElementById('rightdiv').innerHTML=str;
       }

       document.onload= comman();


       function comman(){
            chckAuth();
            getProduct();
       }

       function logout(){
            let sessionUser = localStorage.getItem('session-user');
            let str;
            if(sessionUser){
                 localStorage.removeItem('session-user');
                 window.location='index.html'
            }
       }

       async function getProduct(){
           try {
                let res = await fetch('https://fakestoreapi.com/products');
                 productArray = await res.json();
                printData(productArray)
                

           } catch (error) {
            
           }
       }

       function printData(array){
        let str="";
                 if(array.length > 0){
                     array.map((index,i)=>{
                    let name = index.title.substr(0,15);
                    let description = index.description.substr(0,50);
                    str+=`
                    <div class="col-xl-3 mt-5">
                <div class="card" style="width: 18rem;">
                <img src="${index.image}" class="card-img-top" alt="..." height="150px">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">${description}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
          </div>
                    `
                });

                 }
                 else{
                    str+=`<p>No Records Found</p>`
                 }
                console.log(str);
                document.getElementById('prodata').innerHTML=str;
       }


       document.getElementById('searchid').addEventListener('keyup',(e)=>{
           let str = e.target.value;
           console.log(str);
            if(str!="" && str.length>0){
                
                    let filterArray=   productArray.filter((index,i)=>{
                        if(index.title.toLowerCase().indexOf(str) !== -1){
                            return str;
                        }
                })
                //console.log(filterArray);
                printData(filterArray)
            }
            else{
                printData(productArray)
            }
           
           
       })