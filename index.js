import {menuArray} from './data.js'

const outerBodyContainer = document.getElementById('outerBodyContainer')
const pricingDetails = document.getElementById('PricingDetails')
pricingDetails.style.display="none"

let foodToRender = ``

function renderMenuItem(){
    for (let menu of menuArray){
        foodToRender += `<div class="itemContainer">
                            <p class="foodemoji">${menu.emoji}</p>
                            <div class="foodDetails">
                                <p class="foodname">${menu.name}</p>
                                <p class ="foodtype">${menu.ingredients}</p>
                                <p class ="foodprice">$${menu.price}</p>
                            </div>
                            <div class="addItem" data-foodid = ${menu.id}>+</div>
                    </div>`
        
    }
    outerBodyContainer.innerHTML = foodToRender
}

renderMenuItem()


let totalPrice = 0;
let value = 0;

document.addEventListener('click', function(e){
    const foodId = e.target.dataset.foodid;
  
    
    if(foodId){
        pricingDetails.style.display="block"
        
        

        if (foodId === '0') {
            document.getElementById('center').innerHTML += `
                <div class="order" >
                    <div class="left-items">${menuArray[0].name}<span class="removeItem" >Remove</span></div>
                    <div class="right-price">$${menuArray[0].price}</div>
                </div>
            `
            
            
            totalPrice += menuArray[0].price

      

        }else if(foodId==='1'){
            document.getElementById('center').innerHTML+=`
            <div class="order">
                <div class="left-items">${menuArray[1].name}<span class="removeItem">Remove</span></div>
                <div class="right-price">$${menuArray[1].price}</div>
            </div>
            `
           

            totalPrice +=menuArray[1].price
        }else if(foodId==='2'){
            document.getElementById('center').innerHTML+=`
            <div class="order">
                <div class="left-items">${menuArray[2].name}<span class="removeItem">Remove</span></div>
                <div class="right-price">$${menuArray[2].price}</div>
            </div>
            `
       
         
            totalPrice +=menuArray[2].price
        }

        document.getElementById('totalPrice').textContent ='$ '+totalPrice;


        
        
    }
})

function removeElement() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('removeItem')) {
            const clickedRemoveButton = e.target;
            const parentOrder = clickedRemoveButton.parentElement.parentElement;
            // Remove the parent order element
            const price = parentOrder.children[parentOrder.children.length - 1].textContent
            const value = parseInt(price.substring(1));
            parentOrder.remove();
            
            totalPrice = totalPrice-value;
            document.getElementById('totalPrice').textContent ='$ '+totalPrice;
            if (totalPrice<=0){
                pricingDetails.style.display="none"
            }
            }
        });
}
removeElement()

const buttonElement = document.getElementById('Conformation')
buttonElement.addEventListener('click', function(){
    document.querySelector('.formmodal').style.display='block'
    document.getElementById('finalSubmission-btn').addEventListener('click', function(event){
        event.preventDefault(); 
        const nameValue = document.getElementById('name').value
        document.querySelector('.formmodal').style.display='none'
       
        pricingDetails.innerHTML =`<p id="thankyouMessage">Thank you ${nameValue} for the purchase.</p>`

        const allPlusSign = document.getElementsByClassName('addItem')
   
        for (let sign of allPlusSign){
            sign.style.display="none"}
        
    });
  
})
