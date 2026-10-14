/* وضع الصيانة: ON=true يعرض صفحة "قيد الصيانة" للزوار، و ON=false يرجّع الموقع */
(function(){
  var ON=true;
  try{
    if(/[?&]preview/.test(location.search))sessionStorage.setItem('mpv','1');
    if(sessionStorage.getItem('mpv'))ON=false;
  }catch(e){}
  if(!ON)return;
  window.stop();
  var d=document.documentElement;
  d.className='';d.setAttribute('lang','ar');d.setAttribute('dir','rtl');
  d.innerHTML='<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>الموقع قيد الصيانة | Ink Master</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f8f8f9;color:#141415;font-family:Cairo,"Segoe UI",Tahoma,sans-serif;text-align:center;padding:24px}.c{max-width:520px;background:#fff;border-radius:10px;padding:48px 32px;box-shadow:0 8px 30px rgba(0,0,0,.08)}img{max-width:180px;height:auto;margin-bottom:24px}.l{height:4px;width:80px;margin:0 auto 24px;background:linear-gradient(90deg,#17A2E8 50%,#FFC20E 50%)}h1{font-size:28px;margin:0 0 8px}p{margin:0;color:#5a5a60;line-height:1.8}.e{margin-top:20px;direction:ltr;font-family:Archivo,"Helvetica Neue",Arial,sans-serif}.e h2{font-size:20px;margin:0 0 4px;color:#141415}</style></head><body><div class="c"><img src="img/logo.png" alt="Ink Master"><div class="l"></div><h1>الموقع قيد الصيانة</h1><p>نعمل على تحسين الموقع، وسنعود قريباً. شكراً لصبركم.</p><div class="e"><h2>Site Under Maintenance</h2><p>We are improving our website and will be back soon. Thank you for your patience.</p></div></div></body>';
})();
