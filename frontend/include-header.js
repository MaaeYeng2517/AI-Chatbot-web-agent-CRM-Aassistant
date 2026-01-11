(async function(){
    try {
        const res = await fetch('/header.html');
        if(!res.ok) return;
        const html = await res.text();
        const container = document.getElementById('site-header');
        if(!container) return;
        container.innerHTML = html;

        // mark active nav link based on current path
        const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        const links = container.querySelectorAll('.nav-link');
        let matched = false;
        links.forEach(a=>{
            const href = (a.getAttribute('href')||'').toLowerCase();
            if(href.endsWith(path)){
                a.classList.add('active'); matched = true;
            } else {
                a.classList.remove('active');
            }
        });
        if(!matched){
            const home = container.querySelector('.nav-link[data-tab="home"]');
            if(home) home.classList.add('active');
        }
    } catch(e){ console.warn('header load failed', e); }
})();
