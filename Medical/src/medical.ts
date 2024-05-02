let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement=0;
let UserIdAutoIncrement=1000;
let currentUser:string;
let currentmedicineID: string;
class user{
    emailID: string;
    password: string;
    phoneno: string;
    UserId: string;
    constructor(emailID: string, password: string,phoneno: string){
        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.emailID=emailID;
        this.password=password;
        this.phoneno=phoneno;
    }

}

class medicine{
    medicinename: string;
    medicineid:string;
    
    price: number;
    quantity: number;
    expiry: string;
    

    constructor(medicinename: string,price:number,quantity:number,expiry:string){
        MedicineIdAutoIncrement++;
        this.medicineid="MD"+MedicineIdAutoIncrement.toString();
        this.medicinename=medicinename;
        this.price=price;
        this.quantity=quantity;
        this.expiry=expiry;
        
    }
}
class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;

    MedicineName: string;
    MedicineCount: number;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;

        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
}

let userarraylist:  Array<user> = new Array<user>();
userarraylist.push(new user("raagav@gmail.com","raagav","90237421"));
userarraylist.push(new user("raagav1@gmail.com","xxxx","7823123123"));
userarraylist.push(new user("raagav2@gmail.com","yyyyy","2123214214"));

let medicinelist: Array<medicine> = new Array<medicine>();
medicinelist.push(new medicine("Paracetomol", 50,5,"23/05/2024"));
medicinelist.push(new medicine("Colpal", 60, 5, "23/05/2024"));
medicinelist.push(new medicine("Stepsil",70, 5,"23/05/2024" ));
medicinelist.push(new medicine("Iodex", 80, 5,"23/05/2024"));
medicinelist.push(new medicine("Acetherol",100, 5, "23/05/2024"));

let orderlist: Array<Order>= new Array<Order>();

function medicinetable(){
    let home = document.getElementById('homepage')as HTMLDivElement;
    home.style.display='none';
    let medicinepage = document.getElementById('medicinedetail')as HTMLDivElement;
    medicinepage.style.display='block';
   
    let tableelement = document.getElementById('medicaltable')as HTMLTableElement;
    
        for (let index = 0; index < medicinelist.length; index++) {
           let tabledata=document.createElement('tr');
            tabledata.innerHTML=`<td>${medicinelist[index].medicinename}</td><td>${medicinelist[index].price}</td>${medicinelist[index].quantity}</td><td>${medicinelist[index].expiry}</td>`;
            tableelement.appendChild(tabledata);
            
        }


}
function purchasetable(){
    let medicinepage = document.getElementById('medicinedetail')as HTMLDivElement;
    medicinepage.style.display='none';
    let purchasepage = document.getElementById('purchase')as HTMLDivElement;
    purchasepage.style.display='block';

    let tableelement = document.getElementById('purchasetable')as HTMLTableElement;
    for (let index = 0; index < medicinelist.length; index++) {
        let tabledata=document.createElement('tr');
        const button = document.createElement('button');
        button.textContent = 'buy';
        button.addEventListener('click', () => {
            setglobal(medicinelist[index].medicineid);
            })
        
     tabledata.innerHTML=`<td>${medicinelist[index].medicinename}</td><td>${medicinelist[index].price}</td>${medicinelist[index].quantity}</td><td>${medicinelist[index].expiry}</td>`;
         
         tableelement.append(tabledata);
         tableelement.append(button);
         
         
     }
}

function setglobal(medicineid:string){
    let quantityblock = (document.getElementById('quantityblock') as HTMLDivElement)
    quantityblock.style.display='block';
    currentmedicineID=medicineid;
}

function quantity()
{
    
   let quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value ) ;
   
    buymedicine(quantity,currentmedicineID);
    
    

   
}
function buymedicine(quantity:number,medicineid:string){
    for (let index = 0; index < medicinelist.length; index++) {
        if(medicinelist[index].medicineid==medicineid){
            medicinelist[index].quantity-=quantity;

            orderlist.push(new Order(medicinelist[index].medicineid,currentUser,medicinelist[index].medicinename,quantity))
        }
    }
}

function orderHistory(){

    let tableelement=document.getElementById("Order-table") as HTMLDivElement;
    tableelement.style.display='block';
    for(var i=0;i<orderlist.length;i++){
        let tabledata=document.createElement("tr");
        tabledata.innerHTML=`<td>${orderlist[i].MedicineId}</td><td>${orderlist[i].UserId}</td><td>${orderlist[i].MedicineName}</td><td>${orderlist[i].MedicineCount}</td>`
        tableelement.append(tabledata);;
    }
}

function Login(){
    let email = (document.getElementById('login-name')as HTMLInputElement).value;
    let pass = (document.getElementById('login-password')as HTMLInputElement).value;

    for(var i = 0;i<userarraylist.length;i++) {
       if(userarraylist[i].emailID==email && userarraylist[i].password==pass){
        currentUser = userarraylist[i].UserId;
        homepage();
       }
     }

}

function homepage(){
    let login = document.getElementById('container')as HTMLDivElement;
    login.style.display='none';
    let home = document.getElementById('homepage')as HTMLDivElement;
    let menu = document.getElementById('menu') as HTMLDivElement;
    home.style.display='block';
    menu.style.display='block';


}

function signup() {
   
    let password =(document.getElementById('pass')as HTMLInputElement).value;
    let email =(document.getElementById('email')as HTMLInputElement).value;
    let phone =(document.getElementById('phone')as HTMLInputElement).value;
    userarraylist.push(new user(email,password,phone));
    homepage();
}

function validateSignup(){
    event?.preventDefault();
    let name = (document.getElementById('name')as HTMLInputElement).value;
    let error1 = (document.getElementById('name-error')as HTMLLabelElement);
    let regx = /^[a-z A-z]{3,20}$/
    let valid =true;

    if( !regx.test(name)){
        error1.innerHTML="please enter valid name";
        error1.style.color='red';
        valid= false;
    }else{
        error1.innerHTML='valid';
        error1.style.color='green'
    }

    // let email =(document.getElementById('email')as HTMLInputElement).value;
    // let error2 = (document.getElementById('email-error')as HTMLLabelElement);
    // let regx1 =/^([a-z 0-9\.-]+)@([a-z0-9-]+).([a-z {2,8}])$/
    // if(!regx1.test(email)){
    //     error2.innerHTML="Invalid";
    //     error2.style.color='red';
    //     valid= false;
    // }

   
    // let pass = (document.getElementById('pass-error')as HTMLInputElement).value;
    // let error3 =(document.getElementById('email-error')as HTMLLabelElement);
    // let regx2 = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/

    // if(!regx2.test(pass)){
    //     error3.innerHTML="Invalid";
    //     error3.style.color='red';
    //     valid= false;
    // }

    // let newpass=( document.getElementById('pass')as HTMLInputElement).value;
    
    // let error4 =(document.getElementById('cpass-error')as HTMLLabelElement);


    // if(newpass!=pass){
    //     error4.innerHTML="Invalid";
    //     error4.style.color='red';
    //     valid= false;
    // }

    return valid;


    }



     
