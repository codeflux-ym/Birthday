(function(){
  const CONFIG = {
    letterText: `Today Is A Special Day For Me My Favourite Person birthday — That Night 2:00 Am The Beautiful Person Came In This World.
Happy Birthday To My Favourite Person şＨ𝕀𝔳ᵃη𝐘Ａ𝐍 My Life Partner My Everything Meri Sweetu My Beetu Bachhu Today is The Best Day Of Life Because It's My Partner Birthday Being With You Today Is The Greatest Gift I could Ever Ask For God Thank you To Choosing Me And Loving Me So Much I promise to Always Keep You Happy Take Care Of You Support You And Stand For You In Every Situation Every Moment Of Life You Are The Brightness Of My Life ( Meri Roshni Ji )And Because Of You My World Is Beautiful You Are The Most Beautiful Girl In This World Meri Bachhu Every Moment With You Is Precious And Every Memory We Create Together Means Everything To Me I Always Support Your Dreams
Happy Birthday To My Everything I Wish You Always Happy With Me.
Happy birthday, My love! 🎂`,

    notes: [
      { icon:'😊', front:'Your smile', back:'Your Smile Has A Way Of Lighting Up My Whole Day .' },
      { icon:'🤍', front:'Being Together', back:'Every Moment With You Feels Like The Calmest and Safest Place.' },
      { icon:'🌱', front:'You Make Me Perfect And A Man ', back:'You Naughtiness Mastiyon Habbit I Love It .' },
      { icon:'⭐', front:'Every Moment', back:'You are My Dream Girl Bachhu.' }
    ],

    timeline: [
      { label:'HOW IT STARTED', text:"The Day We Met, I Had No Idea How Much You'd End Up Meaning To Me." },
      { label:'A FAVOURITE MEMORY', text:"That One Day We Couldn't Stop Laughing Over Something So Silly — Still Makes Me Smile." },
      { label:'RIGHT NOW', text:"Here We Are, Celebrating You, And I Couldn't Be Happier To Be Doing This." },
      { label:"WHAT'S NEXT", text:"Here's To Many More Birthdays, Memories, And Moments Together." }
    ],

    balloonWishes: [
      'Wishing You Endless Happiness 🎈',
      'May All your Dreams Comes True ✨',
      'Wishing You Health, Joy And Love 💗',
      "Coming Year Full With Happiness 🌟",
      'May You Always Safe With Me  🤍',
      'Sending You All My Love Today 💌',
      'May Be In Future Us Dream 😊',
      'Celebrate  Together That Moments 🥂'
    ]
  };

  document.getElementById('letterBody').innerText = CONFIG.letterText;
  const floaters = document.getElementById('floaters');
  const emojis = ['💗','✨','💫','🌸'];
  for(let i=0;i<16;i++){
    const el = document.createElement('span');
    el.className = 'floater';
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.setProperty('--drift', (Math.random()*80-40) + 'px');
    el.style.animationDuration = (10 + Math.random()*10) + 's';
    el.style.animationDelay = (Math.random()*10) + 's';
    el.style.fontSize = (14 + Math.random()*14) + 'px';
    floaters.appendChild(el);
  }

  const pages = ['page-0','page-1','page-2','page-3','page-4','page-5'];
  let unlocked = 0; 
  let current = 0;
  const navEl = document.getElementById('pageNav');

  function renderDots(){
    navEl.innerHTML = '';
    pages.forEach((id, i)=>{
      const b = document.createElement('button');
      b.className = 'dot' + (i===current ? ' active' : '');
      b.disabled = i > unlocked;
      b.addEventListener('click', ()=> goTo(i));
      navEl.appendChild(b);
    });
  }

  const sections = pages.map(id => document.getElementById(id));

  function showPage(i){
    sections.forEach((s, idx)=> s.classList.toggle('active', idx === i));
  }

  function goTo(i){
    if(i > unlocked) return;
    current = i;
    showPage(i);
    renderDots();
  }

  showPage(0);
  renderDots();

  function unlockUpTo(i){
    if(i > unlocked){ unlocked = i; renderDots(); }
  }

  const appEl = document.getElementById('app');
  appEl.addEventListener('wheel', (e)=>{
    if(!e.target.closest('.letter-card')) e.preventDefault();
  }, { passive:false });

  let touchStartY = 0;
  appEl.addEventListener('touchstart', (e)=>{ touchStartY = e.touches[0].clientY; }, { passive:true });
  appEl.addEventListener('touchmove', (e)=>{
    const scrollable = e.target.closest('.page, .letter-card');
    if(scrollable){
      const atTop = scrollable.scrollTop <= 0;
      const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
      const goingUp = e.touches[0].clientY > touchStartY;
      const goingDown = e.touches[0].clientY < touchStartY;
      if((atTop && goingUp) || (atBottom && goingDown)){
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  }, { passive:false });

  const envelope = document.getElementById('envelope');
  const envelopeWrap = document.getElementById('envelopeWrap');
  const letterOverlay = document.getElementById('letterOverlay');
  const closeLetterBtn = document.getElementById('closeLetterBtn');
  let opened = false;

  envelopeWrap.addEventListener('click', ()=>{
    if(opened) return;
    opened = true;
    envelope.classList.add('open');
    document.querySelector('.tap-hint').style.opacity = '0';
    setTimeout(()=>{
      letterOverlay.classList.add('show');
    }, 900);
  });

  closeLetterBtn.addEventListener('click', ()=>{
    letterOverlay.classList.remove('show');
    unlockUpTo(1);
    setTimeout(()=> goTo(1), 350);
  });

  const notesGrid = document.getElementById('notesGrid');
  CONFIG.notes.forEach(n=>{
    const card = document.createElement('div');
    card.className = 'note';
    card.innerHTML = `
      <div class="note-inner">
        <div class="note-face note-front"><span class="icon">${n.icon}</span><span>${n.front}</span></div>
        <div class="note-face note-back">${n.back}</div>
      </div>`;
    card.addEventListener('click', ()=> card.classList.toggle('flipped'));
    notesGrid.appendChild(card);
  });

  document.getElementById('toPage2').addEventListener('click', ()=>{
    unlockUpTo(2);
    goTo(2);
  });

  const timelineEl = document.getElementById('timeline');
  CONFIG.timeline.forEach(item=>{
    const div = document.createElement('div');
    div.className = 't-item';
    div.innerHTML = `<p class="t-label">${item.label}</p><p class="t-text">${item.text}</p>`;
    timelineEl.appendChild(div);
  });

  document.getElementById('toPage3').addEventListener('click', ()=>{
    unlockUpTo(3);
    goTo(3);
  });

  const candlesEl = document.getElementById('candles');
  const totalCandles = 3;
  let remaining = totalCandles;
  for(let i=0;i<totalCandles;i++){
    const c = document.createElement('div');
    c.className = 'candle';
    c.innerHTML = `<div class="flame"></div><div class="smoke"></div>`;
    c.addEventListener('click', ()=>{
      if(c.classList.contains('blown')) return;
      c.classList.add('blown');
      remaining--;
      updateCakeHint();
    });
    candlesEl.appendChild(c);
  }
  const cakeHint = document.getElementById('cakeHint');
  const cakeMsg = document.getElementById('cakeMsg');
  const toPage4Btn = document.getElementById('toPage4');

  function updateCakeHint(){
    if(remaining > 0){
      cakeHint.textContent = remaining + ' candle' + (remaining>1?'s':'') + ' left';
    } else {
      cakeHint.textContent = 'Your wish is on its way! 🌟';
      cakeMsg.textContent = "It's bound to come true 💫";
      toPage4Btn.classList.add('show');
      burstConfetti();
      unlockUpTo(4);
    }
  }
  updateCakeHint();

  toPage4Btn.addEventListener('click', ()=> goTo(4));

  const balloonField = document.getElementById('balloonField');
  const wishCaught = document.getElementById('wishCaught');
  const balloonProgress = document.getElementById('balloonProgress');
  const toPage5Btn = document.getElementById('toPage5');
  const balloonColors = ['#FF9EBB','#D9C9F5','#F3C969','#FFC3D6','#B79EF0','#FFB2CC','#EADCFA','#FCE0B8'];
  let poppedCount = 0;

  CONFIG.balloonWishes.forEach((wish, i)=>{
    const b = document.createElement('div');
    b.className = 'balloon';
    b.innerHTML = `<div class="balloon-body" style="background: radial-gradient(circle at 32% 28%, #ffffffaa, ${balloonColors[i % balloonColors.length]});"></div><div class="balloon-string"></div>`;
    b.addEventListener('click', ()=>{
      if(b.classList.contains('popped')) return;
      b.classList.add('popped');
      wishCaught.textContent = wish;
      poppedCount++;
      balloonProgress.textContent = poppedCount + ' of ' + CONFIG.balloonWishes.length + ' wishes caught';
      if(poppedCount === CONFIG.balloonWishes.length){
        toPage5Btn.classList.add('show');
        unlockUpTo(5);
      }
    });
    balloonField.appendChild(b);
  });
  balloonProgress.textContent = '0 of ' + CONFIG.balloonWishes.length + ' wishes caught';

  toPage5Btn.addEventListener('click', ()=> goTo(5));

  function burstConfetti(){
    const colors = ['#FF9EBB','#D9C9F5','#F3C969','#FFC3D6','#B79EF0'];
    for(let i=0;i<50;i++){
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      const size = 6 + Math.random()*6;
      p.style.width = size + 'px';
      p.style.height = (size*0.4) + 'px';
      p.style.left = Math.random()*100 + 'vw';
      p.style.background = colors[Math.floor(Math.random()*colors.length)];
      p.style.animationDuration = (2 + Math.random()*1.8) + 's';
      document.body.appendChild(p);
      setTimeout(()=> p.remove(), 4200);
    }
  }

  document.getElementById('restartBtn').addEventListener('click', ()=>{
    opened = false;
    envelope.classList.remove('open');
    document.querySelector('.tap-hint').style.opacity = '1';
    remaining = totalCandles;
    document.querySelectorAll('.candle').forEach(c=> c.classList.remove('blown'));
    cakeHint.textContent = totalCandles + ' candles left';
    cakeMsg.textContent = '';
    toPage4Btn.classList.remove('show');
    document.querySelectorAll('.note').forEach(n=> n.classList.remove('flipped'));
    document.querySelectorAll('.balloon').forEach(b=> b.classList.remove('popped'));
    poppedCount = 0;
    balloonProgress.textContent = '0 of ' + CONFIG.balloonWishes.length + ' wishes caught';
    wishCaught.textContent = '';
    toPage5Btn.classList.remove('show');
    unlocked = 0;
    goTo(0);
  });

})();
