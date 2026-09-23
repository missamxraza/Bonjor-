const WHATSAPP_NUMBER = ""; // اپنا WhatsApp نمبر یہاں country code کے ساتھ لکھیں، مثال: 919876543210
let bag = JSON.parse(localStorage.getItem('bonjorBag') || '[]');
const drawer=document.getElementById('drawer'), count=document.getElementById('count'), items=document.getElementById('items'), total=document.getElementById('total');
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
function render(){count.textContent=bag.reduce((s,i)=>s+i.qty,0);items.innerHTML=bag.length?bag.map((i,idx)=>`<div class="item"><span>${i.name} × ${i.qty}</span><span>${money(i.price*i.qty)} <button onclick="removeItem(${idx})">Remove</button></span></div>`).join(''):'<p class="note">Your bag is empty. Add something you love.</p>';total.textContent=money(bag.reduce((s,i)=>s+i.price*i.qty,0));localStorage.setItem('bonjorBag',JSON.stringify(bag))}
function addItem(name,price){const x=bag.find(i=>i.name===name);x?x.qty++:bag.push({name,price:Number(price),qty:1});render();drawer.classList.add('open')}
function removeItem(i){bag.splice(i,1);render()}
document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>addItem(b.dataset.name,b.dataset.price)));
document.getElementById('bagBtn').onclick=()=>{render();drawer.classList.add('open')};document.getElementById('close').onclick=()=>drawer.classList.remove('open');drawer.addEventListener('click',e=>{if(e.target===drawer)drawer.classList.remove('open')});
document.getElementById('checkout').onclick=()=>{if(!bag.length)return alert('Please add a product first.');const lines=bag.map(i=>`${i.name} x${i.qty} — ${money(i.price*i.qty)}`).join('%0A');const msg=`Hello Bonjor!%0A%0AI want to order:%0A${lines}%0A%0ATotal: ${money(bag.reduce((s,i)=>s+i.price*i.qty,0))}`;if(WHATSAPP_NUMBER)location.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;else alert('WhatsApp number ابھی script.js میں add نہیں کیا گیا۔')};render();
