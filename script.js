document.addEventListener('DOMContentLoaded',()=>{
  const cartBtn = document.getElementById('cartBtn');
  const cartCount = document.getElementById('cartCount');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkout = document.getElementById('checkout');
  const search = document.getElementById('search');

  let cart = [];

  function formatKRW(n){
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  }

  function updateCartUI(){
    cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach((item,idx)=>{
      total += item.price*item.qty;
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name} x${item.qty}</span><span>${formatKRW(item.price*item.qty)}</span>`;
      li.addEventListener('click',()=>{ removeFromCart(idx); });
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = formatKRW(total);
  }

  function addToCart(name,price){
    const existing = cart.find(c=>c.name===name);
    if(existing) existing.qty+=1; else cart.push({name,price,qty:1});
    updateCartUI();
  }

  function removeFromCart(index){
    cart.splice(index,1);
    updateCartUI();
  }

  document.querySelectorAll('.add-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const card = e.target.closest('.card');
      const name = card.dataset.name;
      const price = Number(card.dataset.price);
      addToCart(name,price);
    });
  });

  cartBtn.addEventListener('click',()=>{ cartModal.classList.remove('hidden'); });
  closeCart.addEventListener('click',()=>{ cartModal.classList.add('hidden'); });
  checkout.addEventListener('click',()=>{ alert('테스트용: 결제 처리 로직을 여기에 추가하세요.'); });

  // Filters
  document.querySelectorAll('.filter').forEach(f=>{
    f.addEventListener('click',()=>{
      const key = f.dataset.filter;
      document.querySelectorAll('.card').forEach(card=>{
        if(key==='all' || card.dataset.brand===key) card.style.display='block'; else card.style.display='none';
      });
    });
  });

  // Search
  search.addEventListener('input',()=>{
    const q = search.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(card=>{
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(q) ? 'block' : 'none';
    });
  });

  updateCartUI();
});
