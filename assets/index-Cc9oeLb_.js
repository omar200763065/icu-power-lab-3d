(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const ne={panelWp:2400,mpptEfficiency:.97,inverterEfficiency:.94,batteryWh:9600,inverterLimitW:2e3,batteryMaxDischargeW:1800,batteryMaxChargeW:1200,minimumSoc:3},dn=[{id:"vent",name:"جهاز التنفس الاصطناعي",en:"Mechanical Ventilator",watts:350,on:!0,category:"طبي",model:"جهاز تنفس"},{id:"monitor",name:"شاشة مراقبة المريض",en:"Patient Monitor",watts:60,on:!0,category:"طبي",model:"شاشة مراقبة"},{id:"infusion",name:"مضخّتا التسريب",en:"Infusion Pumps ×2",watts:60,on:!0,category:"طبي",model:"مضخات تسريب"},{id:"syringe",name:"مضخة الحقن",en:"Syringe Pump",watts:25,on:!0,category:"طبي",model:"مضخة حقن"},{id:"defib",name:"مزيل الرجفان",en:"Defibrillator",watts:200,on:!0,category:"طبي",model:"مزيل الرجفان"},{id:"incubator",name:"حاضنة الأطفال",en:"Infant Incubator",watts:400,on:!1,category:"طبي",model:"حاضنة أطفال"},{id:"oxygen",name:"مركّز الأوكسجين",en:"Oxygen Concentrator",watts:300,on:!1,category:"طبي",model:"مركّز أوكسجين"}],cs=[{id:"solar",name:"مصفوفة الألواح الشمسية",en:"Solar PV Array",family:"مصدر طاقة",rating:"2400 Wp",description:"تحوّل الإشعاع الشمسي إلى طاقة كهربائية مستمرة (DC). القدرة الاسمية ليست إنتاجاً مضموناً؛ الإنتاج الفعلي يتأثر بالإشعاع والحرارة والاتجاه والظل.",specs:[["القدرة الاسمية","2400 واط ذروة"],["نوع الألواح","Mono-Si حسب الملف"],["الخَرْج","تيار مستمر DC"]],safety:"يلزم تحديد عدد الألواح، سلاسلها، جهد الدارة المفتوحة، تيار القصر، الحمايات والعزل حسب أوراق بيانات الألواح."},{id:"mppt",name:"منظّم الشحن MPPT",en:"MPPT Charge Controller",family:"تحويل/تحكم",rating:"97% كفاءة مفترضة",description:"يتتبع نقطة القدرة العظمى للألواح وينظّم الطاقة المتجهة إلى ناقل البطارية. النسبة في هذا النموذج مقتبسة من الملف الأصلي.",specs:[["الكفاءة المفترضة","97%"],["المدخل","DC من الألواح"],["الخرج","DC منظّم"]],safety:"يجب مطابقة نطاق جهد PV وحدود التيار مع الألواح والبطارية؛ لا تُعتبر النسبة قيمة مؤكدة لجهاز بعينه."},{id:"battery",name:"حزمة البطارية",en:"LiFePO₄ Battery Bank",family:"خزن الطاقة",rating:"48 V · 9.6 kWh",description:"تخزن الطاقة لاستخدامها عند ضعف الشمس أو انقطاع الشبكة. حالة الشحن (SOC) في المحاكاة تقديرية وليست قياساً من BMS حقيقي.",specs:[["الجهد الاسمي","48 فولت"],["السعة","9.6 kWh"],["الكيمياء المذكورة","LiFePO₄"]],safety:"اختيار البطارية يتطلب تيار التفريغ، BMS، حدود الحرارة، تيار الشحن، الحماية من القصر والتوافق المعتمد مع العاكس."},{id:"inverter",name:"العاكس الهجين",en:"Hybrid Inverter",family:"تحويل الطاقة",rating:"2000 W · 94%",description:"يحوّل التيار المستمر إلى تيار متناوب لتغذية الأحمال. الحد والكفاءة مأخوذان من الملف التعليمي الأصلي.",specs:[["حد قدرة العاكس","2000 واط"],["الكفاءة المفترضة","94%"],["الخرج","AC"]],safety:"قدرة 2000 واط ليست حكماً كافياً لتغذية الأجهزة الطبية؛ يلزم التحقق من تيار البدء، جودة الموجة، العزل، زمن التحويل والمعايير الطبية."},{id:"ats",name:"مفتاح التحويل ATS",en:"Automatic Transfer Switch",family:"تحويل مصدر",rating:"منطق تعليمي",description:"يمثل مفتاحاً يبدّل مصدر التغذية بين العاكس والشبكة وفق مخطط النظام. في هذه النسخة تُعرض حالة الشبكة يدوياً لأغراض التعلم.",specs:[["المهمة","اختيار مصدر AC"],["الحالة","شبكة متاحة / منقطعة"],["عتبة SOC","3% في المصدر الأصلي"]],safety:"لا يمكن تحديد ATS أو زمن تحويله دون طراز فعلي ودراسة تنسيق الحماية. عتبة 3% ليست توصية تشغيلية."},{id:"grid",name:"الشبكة الكهربائية",en:"Utility Grid",family:"مصدر احتياطي",rating:"مصدر خارجي",description:"مصدر بديل مفترض يمكن تشغيله أو انقطاعه في السيناريوهات. النموذج لا يحاكي جودة الشبكة أو تذبذب الجهد.",specs:[["الحالة","تفاعلية"],["تأثيرها","تغطية الحمل المتبقي"],["القياس","تعليمي فقط"]],safety:"يحتاج الربط الواقعي إلى تصميم حماية وتأريض ومفتاح تحويل مناسب وتنفيذ مختص مرخّص."},{id:"icu",name:"منطقة أجهزة العناية المركزة",en:"ICU Critical Loads",family:"الأحمال الطبية",rating:"متغيرة حسب الأجهزة",description:"سرير مريض مع نماذج تمثيلية لأجهزة التنفس والمراقبة والمضخات ومزيل الرجفان والحاضنة ومركّز الأوكسجين.",specs:[["الأحمال المبدئية","695 واط"],["عدد الأجهزة","7 مجموعات"],["التحكم","من لوحة المحاكاة"]],safety:"الواطات هنا أمثلة تعليمية وليست قيماً سريرية معتمدة. يجب الرجوع إلى ملصق كل جهاز ودليل الشركة وإدارة الهندسة الطبية."}],Dl=[{id:"solar-peak",name:"ذروة الإشعاع الشمسي",icon:"☀️",badge:"إنتاج 100%",description:"إشعاع كامل 100% يغطي كامل أحمال العناية المركزة مع شحن بنك البطاريات بالطاقة الفائضة.",irradiance:100,soc:85,grid:!0,allDevices:!1},{id:"outage-day",name:"انقطاع الشبكة نهاراً",icon:"⚡",badge:"ATS فوري <10ms",description:"انقطاع الشبكة نهاراً؛ يحوّل نظام ATS الحمل فورياً إلى الألواح والبطارية دون انقطاع سريري.",irradiance:70,soc:70,grid:!1,allDevices:!1},{id:"night-discharge",name:"تفريغ ليلي (غياب الشمس)",icon:"🌙",badge:"اعتماد 100% بطارية",description:"غياب الشمس كلياً (0%) مع انقطاع الشبكة؛ تتولى البطارية عبر العاكس تغذية أجهزة المريض.",irradiance:0,soc:60,grid:!1,allDevices:!1},{id:"heavy-load",name:"أقصى استهلاك طبي طارئ",icon:"🚨",badge:"7 أحمال نشطة",description:"تشغيل جميع الأجهزة الطبية السبع بما فيها الحاضنة ومركّز الأوكسجين لاختبار قدرة العاكس القصوى.",irradiance:80,soc:75,grid:!0,allDevices:!0},{id:"cloudy",name:"يوم غائم وضعف التوليد",icon:"☁",badge:"إشعاع 20%",description:"إشعاع منخفض يختبر توزيع الحمل المشترك بين الطاقة الشمسية المتبقية وبنك البطاريات.",irradiance:20,soc:50,grid:!1,allDevices:!1},{id:"outage",name:"انقطاع مفاجئ وحرج للشبكة",icon:"⚡",badge:"اختبار ATS",description:"انقطاع الشبكة وغياب الشمس، اختبار أداء العاكس واستقلالية البطارية لحالات الطوارئ.",irradiance:0,soc:25,grid:!1,allDevices:!1},{id:"emergency",name:"حمل الطوارئ الشامل",icon:"🚨",badge:"طوارئ قصوى",description:"تشغيل جميع الأجهزة الطبية مع إشعاع متوسط والاعتماد على التغذية الهجينة المشتركة.",irradiance:50,soc:70,grid:!0,allDevices:!0}];function En({irradiance:i=70,soc:t=71,gridAvailable:e=!0,devices:n=dn}={}){const s=ja(Number(i)||0,0,100),a=ja(Number(t)||0,0,100),r=n.reduce((h,T)=>h+(T.on?T.watts:0),0),o=s/100*ne.panelWp*ne.mpptEfficiency,l=Math.min(o*ne.inverterEfficiency,ne.inverterLimitW),c=Math.min(r,l),d=Math.max(0,r-c);let u=0,f=0,p=0,g=0;if(e){u=d;const h=Math.max(0,o-r/ne.inverterEfficiency),T=(100-a)/100*ne.batteryWh;g=Math.min(h,ne.batteryMaxChargeW,T)}else{const h=a>ne.minimumSoc,T=Math.max(0,ne.inverterLimitW-c);f=h?Math.min(d,T,ne.batteryMaxDischargeW):0,p=Math.max(0,d-f)}const v=f/ne.inverterEfficiency,m=(()=>{if(e)return null;const h=Math.max(0,r/ne.inverterEfficiency-o),T=Math.max(0,a-ne.minimumSoc)/100*ne.batteryWh;return h<=1?null:T/h})();return{loadW:r,irradiance:s,soc:a,gridAvailable:!!e,solarDcW:o,potentialSolarAcW:l,solarToLoadW:c,gridSupplyW:u,batterySupplyW:f,batteryChargeW:g,dcBatteryDischargeW:v,unmetLoadW:p,autonomyHours:m,sourceTotalW:c+u+f,inverterLimitW:ne.inverterLimitW,overload:r>ne.inverterLimitW}}function Rc({soc:i,hours:t=1/60,irradiance:e=70,gridAvailable:n=!0,devices:s=dn}={}){const a=En({irradiance:e,soc:i,gridAvailable:n,devices:s}),r=ne.batteryWh;let o=a.batteryChargeW*t*.95-a.dcBatteryDischargeW*t;n&&a.batteryChargeW<=0&&(o=0);const l=ja((Number(i)||0)+o/r*100,0,100);return Math.max(0,Math.min(100,l))}function Dt(i){return`${Math.round(i||0).toLocaleString("en-US")} W`}function Di(i){return i==null||!Number.isFinite(i)?"يعتمد على توفر الشمس":i<=0?"لا توجد طاقة قابلة للاستخدام":i>=24?`${(i/24).toFixed(1)} يوم`:i>=1?`${i.toFixed(1)} ساعة`:`${Math.max(1,Math.round(i*60))} دقيقة`}function ja(i,t,e){return Math.min(e,Math.max(t,i))}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wr="170",Ii={ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Pc=0,vo=1,Lc=2,Il=1,Ul=2,xn=3,An=0,Fe=1,on=2,zn=0,Ui=1,Pi=2,_o=3,xo=4,Dc=5,ti=100,Ic=101,Uc=102,Nc=103,Fc=104,Oc=200,Bc=201,kc=202,zc=203,Ja=204,Qa=205,Vc=206,Hc=207,Gc=208,Wc=209,Xc=210,$c=211,qc=212,Yc=213,Zc=214,tr=0,er=1,nr=2,Oi=3,ir=4,sr=5,ar=6,rr=7,Nl=0,Kc=1,jc=2,Vn=0,Jc=1,Qc=2,td=3,Fl=4,ed=5,nd=6,id=7,Ol=300,Bi=301,ki=302,or=303,lr=304,sa=306,cr=1e3,ni=1001,dr=1002,nn=1003,sd=1004,ms=1005,cn=1006,ha=1007,ii=1008,Cn=1009,Bl=1010,kl=1011,ds=1012,Xr=1013,si=1014,Sn=1015,hs=1016,$r=1017,qr=1018,zi=1020,zl=35902,Vl=1021,Hl=1022,tn=1023,Gl=1024,Wl=1025,Ni=1026,Vi=1027,Xl=1028,Yr=1029,$l=1030,Zr=1031,Kr=1033,Xs=33776,$s=33777,qs=33778,Ys=33779,hr=35840,ur=35841,fr=35842,pr=35843,mr=36196,gr=37492,vr=37496,_r=37808,xr=37809,yr=37810,br=37811,Sr=37812,Mr=37813,Er=37814,Tr=37815,wr=37816,Ar=37817,Cr=37818,Rr=37819,Pr=37820,Lr=37821,Zs=36492,Dr=36494,Ir=36495,ql=36283,Ur=36284,Nr=36285,Fr=36286,ad=3200,rd=3201,Yl=0,od=1,kn="",ge="srgb",Xi="srgb-linear",aa="linear",oe="srgb",hi=7680,yo=519,ld=512,cd=513,dd=514,Zl=515,hd=516,ud=517,fd=518,pd=519,Or=35044,bo="300 es",Mn=2e3,Qs=2001;class oi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ks=Math.PI/180,Br=180/Math.PI;function Hn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[n&255]+Ae[n>>8&255]+Ae[n>>16&255]+Ae[n>>24&255]).toLowerCase()}function Te(i,t,e){return Math.max(t,Math.min(e,i))}function md(i,t){return(i%t+t)%t}function ua(i,t,e){return(1-e)*i+e*t}function ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const gd={DEG2RAD:Ks};class gt{constructor(t=0,e=0){gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),a=this.x-t.x,r=this.y-t.y;return this.x=a*n-r*s+t.x,this.y=a*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,s,a,r,o,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,a,r,o,l,c)}set(t,e,n,s,a,r,o,l,c){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=a,d[5]=l,d[6]=n,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],p=n[5],g=n[8],v=s[0],m=s[3],h=s[6],T=s[1],M=s[4],b=s[7],D=s[2],A=s[5],R=s[8];return a[0]=r*v+o*T+l*D,a[3]=r*m+o*M+l*A,a[6]=r*h+o*b+l*R,a[1]=c*v+d*T+u*D,a[4]=c*m+d*M+u*A,a[7]=c*h+d*b+u*R,a[2]=f*v+p*T+g*D,a[5]=f*m+p*M+g*A,a[8]=f*h+p*b+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return e*r*d-e*o*c-n*a*d+n*o*l+s*a*c-s*r*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=d*r-o*c,f=o*l-d*a,p=c*a-r*l,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-d*n)*v,t[2]=(o*n-s*r)*v,t[3]=f*v,t[4]=(d*e-s*l)*v,t[5]=(s*a-o*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(r*e-n*a)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(fa.makeScale(t,e)),this}rotate(t){return this.premultiply(fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new Gt;function Kl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ta(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vd(){const i=ta("canvas");return i.style.display="block",i}const So={};function as(i){i in So||(So[i]=!0,console.warn(i))}function _d(i,t,e){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:n()}}setTimeout(a,e)})}function xd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function yd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=Tn(i.r),i.g=Tn(i.g),i.b=Tn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kn?aa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Mo=[.64,.33,.3,.6,.15,.06],Eo=[.2126,.7152,.0722],To=[.3127,.329],wo=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ao=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Xi]:{primaries:Mo,whitePoint:To,transfer:aa,toXYZ:wo,fromXYZ:Ao,luminanceCoefficients:Eo,workingColorSpaceConfig:{unpackColorSpace:ge},outputColorSpaceConfig:{drawingBufferColorSpace:ge}},[ge]:{primaries:Mo,whitePoint:To,transfer:oe,toXYZ:wo,fromXYZ:Ao,luminanceCoefficients:Eo,outputColorSpaceConfig:{drawingBufferColorSpace:ge}}});let ui;class bd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ui===void 0&&(ui=ta("canvas")),ui.width=t.width,ui.height=t.height;const n=ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ta("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Tn(a[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Sd=0;class jl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Hn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(pa(s[r].image)):a.push(pa(s[r]))}else a=pa(s);n.url=a}return e||(t.images[this.uuid]=n),n}}function pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Md=0;class Ie extends oi{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=ni,s=ni,a=cn,r=ii,o=tn,l=Cn,c=Ie.DEFAULT_ANISOTROPY,d=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=Hn(),this.name="",this.source=new jl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ol)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cr:t.x=t.x-Math.floor(t.x);break;case ni:t.x=t.x<0?0:1;break;case dr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cr:t.y=t.y-Math.floor(t.y);break;case ni:t.y=t.y<0?0:1;break;case dr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=Ol;Ie.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,n=0,s=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,a;const l=t.elements,c=l[0],d=l[4],u=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],h=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,b=(p+1)/2,D=(h+1)/2,A=(d+f)/4,R=(u+v)/4,L=(g+m)/4;return M>b&&M>D?M<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(M),s=A/n,a=R/n):b>D?b<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(b),n=A/s,a=L/s):D<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(D),n=R/a,s=L/a),this.set(n,s,a,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-d)*(f-d));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-v)/T,this.z=(f-d)/T,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ed extends oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Ie(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new jl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends Ed{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jl extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Td extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=nn,this.minFilter=nn,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ri{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,a,r,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const f=a[r+0],p=a[r+1],g=a[r+2],v=a[r+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==p||d!==g){let m=1-o;const h=l*f+c*p+d*g+u*v,T=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const D=Math.sqrt(M),A=Math.atan2(D,h*T);m=Math.sin(m*A)/D,o=Math.sin(o*A)/D}const b=o*T;if(l=l*m+f*b,c=c*m+p*b,d=d*m+g*b,u=u*m+v*b,m===1-o){const D=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=D,c*=D,d*=D,u*=D}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,a,r){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=a[r],f=a[r+1],p=a[r+2],g=a[r+3];return t[e]=o*g+d*u+l*p-c*f,t[e+1]=l*g+d*f+c*u-o*p,t[e+2]=c*g+d*p+o*f-l*u,t[e+3]=d*g-o*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(a/2),f=l(n/2),p=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=f*d*u+c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u-f*p*g;break;case"YXZ":this._x=f*d*u+c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u+f*p*g;break;case"ZXY":this._x=f*d*u-c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u-f*p*g;break;case"ZYX":this._x=f*d*u-c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u+f*p*g;break;case"YZX":this._x=f*d*u+c*p*g,this._y=c*p*u+f*d*g,this._z=c*d*g-f*p*u,this._w=c*d*u-f*p*g;break;case"XZY":this._x=f*d*u-c*p*g,this._y=c*p*u-f*d*g,this._z=c*d*g+f*p*u,this._w=c*d*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],a=e[8],r=e[1],o=e[5],l=e[9],c=e[2],d=e[6],u=e[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(d-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,a=t._z,r=t._w,o=e._x,l=e._y,c=e._z,d=e._w;return this._x=n*d+r*o+s*c-a*l,this._y=s*d+r*l+a*o-n*c,this._z=a*d+r*c+n*l-s*o,this._w=r*d-n*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,a=this._z,r=this._w;let o=r*t._w+n*t._x+s*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=n,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*a+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-e)*d)/c,f=Math.sin(e*d)/c;return this._w=r*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=a*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,n=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Co.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Co.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*s,this.y=a[1]*e+a[4]*n+a[7]*s,this.z=a[2]*e+a[5]*n+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,a=t.elements,r=1/(a[3]*e+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*e+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*e+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*n),d=2*(o*e-a*s),u=2*(a*n-r*e);return this.x=e+l*c+r*u-o*d,this.y=n+l*d+o*c-a*u,this.z=s+l*u+a*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s,this.y=a[1]*e+a[5]*n+a[9]*s,this.z=a[2]*e+a[6]*n+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,a=t.z,r=e.x,o=e.y,l=e.z;return this.x=s*l-a*o,this.y=a*r-n*l,this.z=n*o-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ma.copy(this).projectOnVector(t),this.sub(ma)}reflect(t){return this.sub(ma.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ma=new E,Co=new ri;class us{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Ye):Ye.fromBufferAttribute(a,r),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gs.copy(n.boundingBox)),gs.applyMatrix4(t.matrixWorld),this.union(gs)}const s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zi),vs.subVectors(this.max,Zi),fi.subVectors(t.a,Zi),pi.subVectors(t.b,Zi),mi.subVectors(t.c,Zi),Dn.subVectors(pi,fi),In.subVectors(mi,pi),Xn.subVectors(fi,mi);let e=[0,-Dn.z,Dn.y,0,-In.z,In.y,0,-Xn.z,Xn.y,Dn.z,0,-Dn.x,In.z,0,-In.x,Xn.z,0,-Xn.x,-Dn.y,Dn.x,0,-In.y,In.x,0,-Xn.y,Xn.x,0];return!ga(e,fi,pi,mi,vs)||(e=[1,0,0,0,1,0,0,0,1],!ga(e,fi,pi,mi,vs))?!1:(_s.crossVectors(Dn,In),e=[_s.x,_s.y,_s.z],ga(e,fi,pi,mi,vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pn=[new E,new E,new E,new E,new E,new E,new E,new E],Ye=new E,gs=new us,fi=new E,pi=new E,mi=new E,Dn=new E,In=new E,Xn=new E,Zi=new E,vs=new E,_s=new E,$n=new E;function ga(i,t,e,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){$n.fromArray(i,a);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=t.dot($n),c=e.dot($n),d=n.dot($n);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const wd=new us,Ki=new E,va=new E;class ra{constructor(t=new E,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):wd.setFromPoints(t).getCenter(n);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ki.subVectors(t,this.center);const e=Ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(va.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ki.copy(t.center).add(va)),this.expandByPoint(Ki.copy(t.center).sub(va))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new E,_a=new E,xs=new E,Un=new E,xa=new E,ys=new E,ya=new E;class oa{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mn.copy(this.origin).addScaledVector(this.direction,e),mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_a.copy(t).add(e).multiplyScalar(.5),xs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(_a);const a=t.distanceTo(e)*.5,r=-this.direction.dot(xs),o=Un.dot(this.direction),l=-Un.dot(xs),c=Un.lengthSq(),d=Math.abs(1-r*r);let u,f,p,g;if(d>0)if(u=r*l-o,f=r*o-l,g=a*d,u>=0)if(f>=-g)if(f<=g){const v=1/d;u*=v,f*=v,p=u*(u+r*f+2*o)+f*(r*u+f+2*l)+c}else f=a,u=Math.max(0,-(r*f+o)),p=-u*u+f*(f+2*l)+c;else f=-a,u=Math.max(0,-(r*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-r*a+o)),f=u>0?-a:Math.min(Math.max(-a,-l),a),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-a,-l),a),p=f*(f+2*l)+c):(u=Math.max(0,-(r*a+o)),f=u>0?a:Math.min(Math.max(-a,-l),a),p=-u*u+f*(f+2*l)+c);else f=r>0?-a:a,u=Math.max(0,-(r*f+o)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_a).addScaledVector(xs,f),p}intersectSphere(t,e){mn.subVectors(t.center,this.origin);const n=mn.dot(this.direction),s=mn.dot(mn)-n*n,a=t.radius*t.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,a,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),d>=0?(a=(t.min.y-f.y)*d,r=(t.max.y-f.y)*d):(a=(t.max.y-f.y)*d,r=(t.min.y-f.y)*d),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,mn)!==null}intersectTriangle(t,e,n,s,a){xa.subVectors(e,t),ys.subVectors(n,t),ya.crossVectors(xa,ys);let r=this.direction.dot(ya),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Un.subVectors(this.origin,t);const l=o*this.direction.dot(ys.crossVectors(Un,ys));if(l<0)return null;const c=o*this.direction.dot(xa.cross(Un));if(c<0||l+c>r)return null;const d=-o*Un.dot(ya);return d<0?null:this.at(d/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,a,r,o,l,c,d,u,f,p,g,v,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,a,r,o,l,c,d,u,f,p,g,v,m)}set(t,e,n,s,a,r,o,l,c,d,u,f,p,g,v,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=a,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=u,h[14]=f,h[3]=p,h[7]=g,h[11]=v,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/gi.setFromMatrixColumn(t,0).length(),a=1/gi.setFromMatrixColumn(t,1).length(),r=1/gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,a=t.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(a),u=Math.sin(a);if(t.order==="XYZ"){const f=r*d,p=r*u,g=o*d,v=o*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-v*c,e[9]=-o*l,e[2]=v-f*c,e[6]=g+p*c,e[10]=r*l}else if(t.order==="YXZ"){const f=l*d,p=l*u,g=c*d,v=c*u;e[0]=f+v*o,e[4]=g*o-p,e[8]=r*c,e[1]=r*u,e[5]=r*d,e[9]=-o,e[2]=p*o-g,e[6]=v+f*o,e[10]=r*l}else if(t.order==="ZXY"){const f=l*d,p=l*u,g=c*d,v=c*u;e[0]=f-v*o,e[4]=-r*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=r*d,e[9]=v-f*o,e[2]=-r*c,e[6]=o,e[10]=r*l}else if(t.order==="ZYX"){const f=r*d,p=r*u,g=o*d,v=o*u;e[0]=l*d,e[4]=g*c-p,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=r*l}else if(t.order==="YZX"){const f=r*l,p=r*c,g=o*l,v=o*c;e[0]=l*d,e[4]=v-f*u,e[8]=g*u+p,e[1]=u,e[5]=r*d,e[9]=-o*d,e[2]=-c*d,e[6]=p*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=r*l,p=r*c,g=o*l,v=o*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=f*u+v,e[5]=r*d,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*d,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ad,t,Cd)}lookAt(t,e,n){const s=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Nn.crossVectors(n,ke),Nn.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Nn.crossVectors(n,ke)),Nn.normalize(),bs.crossVectors(ke,Nn),s[0]=Nn.x,s[4]=bs.x,s[8]=ke.x,s[1]=Nn.y,s[5]=bs.y,s[9]=ke.y,s[2]=Nn.z,s[6]=bs.z,s[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],h=n[14],T=n[3],M=n[7],b=n[11],D=n[15],A=s[0],R=s[4],L=s[8],S=s[12],x=s[1],C=s[5],B=s[9],k=s[13],q=s[2],Y=s[6],H=s[10],Q=s[14],W=s[3],it=s[7],nt=s[11],ot=s[15];return a[0]=r*A+o*x+l*q+c*W,a[4]=r*R+o*C+l*Y+c*it,a[8]=r*L+o*B+l*H+c*nt,a[12]=r*S+o*k+l*Q+c*ot,a[1]=d*A+u*x+f*q+p*W,a[5]=d*R+u*C+f*Y+p*it,a[9]=d*L+u*B+f*H+p*nt,a[13]=d*S+u*k+f*Q+p*ot,a[2]=g*A+v*x+m*q+h*W,a[6]=g*R+v*C+m*Y+h*it,a[10]=g*L+v*B+m*H+h*nt,a[14]=g*S+v*k+m*Q+h*ot,a[3]=T*A+M*x+b*q+D*W,a[7]=T*R+M*C+b*Y+D*it,a[11]=T*L+M*B+b*H+D*nt,a[15]=T*S+M*k+b*Q+D*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],u=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],h=t[15];return g*(+a*l*u-s*c*u-a*o*f+n*c*f+s*o*p-n*l*p)+v*(+e*l*p-e*c*f+a*r*f-s*r*p+s*c*d-a*l*d)+m*(+e*c*u-e*o*p-a*r*u+n*r*p+a*o*d-n*c*d)+h*(-s*o*d-e*l*u+e*o*f+s*r*u-n*r*f+n*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],h=t[15],T=u*m*c-v*f*c+v*l*p-o*m*p-u*l*h+o*f*h,M=g*f*c-d*m*c-g*l*p+r*m*p+d*l*h-r*f*h,b=d*v*c-g*u*c+g*o*p-r*v*p-d*o*h+r*u*h,D=g*u*l-d*v*l-g*o*f+r*v*f+d*o*m-r*u*m,A=e*T+n*M+s*b+a*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=T*R,t[1]=(v*f*a-u*m*a-v*s*p+n*m*p+u*s*h-n*f*h)*R,t[2]=(o*m*a-v*l*a+v*s*c-n*m*c-o*s*h+n*l*h)*R,t[3]=(u*l*a-o*f*a-u*s*c+n*f*c+o*s*p-n*l*p)*R,t[4]=M*R,t[5]=(d*m*a-g*f*a+g*s*p-e*m*p-d*s*h+e*f*h)*R,t[6]=(g*l*a-r*m*a-g*s*c+e*m*c+r*s*h-e*l*h)*R,t[7]=(r*f*a-d*l*a+d*s*c-e*f*c-r*s*p+e*l*p)*R,t[8]=b*R,t[9]=(g*u*a-d*v*a-g*n*p+e*v*p+d*n*h-e*u*h)*R,t[10]=(r*v*a-g*o*a+g*n*c-e*v*c-r*n*h+e*o*h)*R,t[11]=(d*o*a-r*u*a-d*n*c+e*u*c+r*n*p-e*o*p)*R,t[12]=D*R,t[13]=(d*v*s-g*u*s+g*n*f-e*v*f-d*n*m+e*u*m)*R,t[14]=(g*o*s-r*v*s-g*n*l+e*v*l+r*n*m-e*o*m)*R,t[15]=(r*u*s-d*o*s+d*n*l-e*u*l-r*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,a=t.z;return e[0]*=n,e[4]*=s,e[8]*=a,e[1]*=n,e[5]*=s,e[9]*=a,e[2]*=n,e[6]*=s,e[10]*=a,e[3]*=n,e[7]*=s,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),a=1-n,r=t.x,o=t.y,l=t.z,c=a*r,d=a*o;return this.set(c*r+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*r,0,c*l-s*o,d*l+s*r,a*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,a,r){return this.set(1,n,a,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,a=e._x,r=e._y,o=e._z,l=e._w,c=a+a,d=r+r,u=o+o,f=a*c,p=a*d,g=a*u,v=r*d,m=r*u,h=o*u,T=l*c,M=l*d,b=l*u,D=n.x,A=n.y,R=n.z;return s[0]=(1-(v+h))*D,s[1]=(p+b)*D,s[2]=(g-M)*D,s[3]=0,s[4]=(p-b)*A,s[5]=(1-(f+h))*A,s[6]=(m+T)*A,s[7]=0,s[8]=(g+M)*R,s[9]=(m-T)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let a=gi.set(s[0],s[1],s[2]).length();const r=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],Ze.copy(this);const c=1/a,d=1/r,u=1/o;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=d,Ze.elements[5]*=d,Ze.elements[6]*=d,Ze.elements[8]*=u,Ze.elements[9]*=u,Ze.elements[10]*=u,e.setFromRotationMatrix(Ze),n.x=a,n.y=r,n.z=o,this}makePerspective(t,e,n,s,a,r,o=Mn){const l=this.elements,c=2*a/(e-t),d=2*a/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,g;if(o===Mn)p=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===Qs)p=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,a,r,o=Mn){const l=this.elements,c=1/(e-t),d=1/(n-s),u=1/(r-a),f=(e+t)*c,p=(n+s)*d;let g,v;if(o===Mn)g=(r+a)*u,v=-2*u;else if(o===Qs)g=a*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const gi=new E,Ze=new he,Ad=new E(0,0,0),Cd=new E(1,1,1),Nn=new E,bs=new E,ke=new E,Ro=new he,Po=new ri;class hn{constructor(t=0,e=0,n=0,s=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Te(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Te(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ro.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ro,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Po.setFromEuler(this),this.setFromQuaternion(Po,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class jr{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rd=0;const Lo=new E,vi=new ri,gn=new he,Ss=new E,ji=new E,Pd=new E,Ld=new ri,Do=new E(1,0,0),Io=new E(0,1,0),Uo=new E(0,0,1),No={type:"added"},Dd={type:"removed"},_i={type:"childadded",child:null},ba={type:"childremoved",child:null};class be extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new E,e=new hn,n=new ri,s=new E(1,1,1);function a(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Gt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.multiply(vi),this}rotateOnWorldAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.premultiply(vi),this}rotateX(t){return this.rotateOnAxis(Do,t)}rotateY(t){return this.rotateOnAxis(Io,t)}rotateZ(t){return this.rotateOnAxis(Uo,t)}translateOnAxis(t,e){return Lo.copy(t).applyQuaternion(this.quaternion),this.position.add(Lo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Do,t)}translateY(t){return this.translateOnAxis(Io,t)}translateZ(t){return this.translateOnAxis(Uo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ss.copy(t):Ss.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(ji,Ss,this.up):gn.lookAt(Ss,ji,this.up),this.quaternion.setFromRotationMatrix(gn),s&&(gn.extractRotation(s.matrixWorld),vi.setFromRotationMatrix(gn),this.quaternion.premultiply(vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(No),_i.child=t,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Dd),ba.child=t,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(No),_i.child=t,this.dispatchEvent(_i),_i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,t,Pd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];a(t.shapes,u)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(t.animations,l))}}if(e){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),u=r(t.shapes),f=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}be.DEFAULT_UP=new E(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ke=new E,vn=new E,Sa=new E,_n=new E,xi=new E,yi=new E,Fo=new E,Ma=new E,Ea=new E,Ta=new E,wa=new de,Aa=new de,Ca=new de;class Xe{constructor(t=new E,e=new E,n=new E){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ke.subVectors(t,e),s.cross(Ke);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,e,n,s,a){Ke.subVectors(s,e),vn.subVectors(n,e),Sa.subVectors(t,e);const r=Ke.dot(Ke),o=Ke.dot(vn),l=Ke.dot(Sa),c=vn.dot(vn),d=vn.dot(Sa),u=r*c-o*o;if(u===0)return a.set(0,0,0),null;const f=1/u,p=(c*l-o*d)*f,g=(r*d-o*l)*f;return a.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(t,e,n,s,a,r,o,l){return this.getBarycoord(t,e,n,s,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,_n.x),l.addScaledVector(r,_n.y),l.addScaledVector(o,_n.z),l)}static getInterpolatedAttribute(t,e,n,s,a,r){return wa.setScalar(0),Aa.setScalar(0),Ca.setScalar(0),wa.fromBufferAttribute(t,e),Aa.fromBufferAttribute(t,n),Ca.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(wa,a.x),r.addScaledVector(Aa,a.y),r.addScaledVector(Ca,a.z),r}static isFrontFacing(t,e,n,s){return Ke.subVectors(n,e),vn.subVectors(t,e),Ke.cross(vn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ke.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Ke.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,a){return Xe.getInterpolation(t,this.a,this.b,this.c,e,n,s,a)}containsPoint(t){return Xe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,a=this.c;let r,o;xi.subVectors(s,n),yi.subVectors(a,n),Ma.subVectors(t,n);const l=xi.dot(Ma),c=yi.dot(Ma);if(l<=0&&c<=0)return e.copy(n);Ea.subVectors(t,s);const d=xi.dot(Ea),u=yi.dot(Ea);if(d>=0&&u<=d)return e.copy(s);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return r=l/(l-d),e.copy(n).addScaledVector(xi,r);Ta.subVectors(t,a);const p=xi.dot(Ta),g=yi.dot(Ta);if(g>=0&&p<=g)return e.copy(a);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(yi,o);const m=d*g-p*u;if(m<=0&&u-d>=0&&p-g>=0)return Fo.subVectors(a,s),o=(u-d)/(u-d+(p-g)),e.copy(s).addScaledVector(Fo,o);const h=1/(m+v+f);return r=v*h,o=f*h,e.copy(n).addScaledVector(xi,r).addScaledVector(yi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ql={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Ra(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=md(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,r=2*n-a;this.r=Ra(r,a,t+1/3),this.g=Ra(r,a,t),this.b=Ra(r,a,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=ge){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ge){const n=Ql[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ge){return Qt.fromWorkingColorSpace(Ce.copy(this),t),Math.round(Te(Ce.r*255,0,255))*65536+Math.round(Te(Ce.g*255,0,255))*256+Math.round(Te(Ce.b*255,0,255))}getHexString(t=ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,a=Ce.b,r=Math.max(n,s,a),o=Math.min(n,s,a);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=d<=.5?u/(r+o):u/(2-r-o),r){case n:l=(s-a)/u+(s<a?6:0);break;case s:l=(a-n)/u+2;break;case a:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=ge){Qt.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==ge?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(Ms);const n=ua(Fn.h,Ms.h,e),s=ua(Fn.s,Ms.s,e),a=ua(Fn.l,Ms.l,e);return this.setHSL(n,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*s,this.g=a[1]*e+a[4]*n+a[7]*s,this.b=a[2]*e+a[5]*n+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new zt;zt.NAMES=Ql;let Id=0;class li extends oi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=Hn(),this.name="",this.blending=Ui,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ja,this.blendDst=Qa,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Qa&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(e){const a=s(t.textures),r=s(t.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Je extends li{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xe=new E,Es=new gt;class sn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Or,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Es.fromBufferAttribute(this,e),Es.applyMatrix3(t),this.setXY(e,Es.x,Es.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,a){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),a=le(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Or&&(t.usage=this.usage),t}}class tc extends sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ec extends sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ve extends sn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ud=0;const Ge=new he,Pa=new be,bi=new E,ze=new us,Ji=new us,Ee=new E;class Oe extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kl(t)?ec:tc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Gt().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ge.makeRotationFromQuaternion(t),this.applyMatrix4(Ge),this}rotateX(t){return Ge.makeRotationX(t),this.applyMatrix4(Ge),this}rotateY(t){return Ge.makeRotationY(t),this.applyMatrix4(Ge),this}rotateZ(t){return Ge.makeRotationZ(t),this.applyMatrix4(Ge),this}translate(t,e,n){return Ge.makeTranslation(t,e,n),this.applyMatrix4(Ge),this}scale(t,e,n){return Ge.makeScale(t,e,n),this.applyMatrix4(Ge),this}lookAt(t){return Pa.lookAt(t),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,a=t.length;s<a;s++){const r=t[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ve(n,3))}else{for(let n=0,s=e.count;n<s;n++){const a=t[n];e.setXYZ(n,a.x,a.y,a.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const a=e[n];ze.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ra);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(t){const n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let a=0,r=e.length;a<r;a++){const o=e[a];Ji.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors(ze.min,Ji.min),ze.expandByPoint(Ee),Ee.addVectors(ze.max,Ji.max),ze.expandByPoint(Ee)):(ze.expandByPoint(Ji.min),ze.expandByPoint(Ji.max))}ze.getCenter(n);let s=0;for(let a=0,r=t.count;a<r;a++)Ee.fromBufferAttribute(t,a),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let a=0,r=e.length;a<r;a++){const o=e[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ee.fromBufferAttribute(o,c),l&&(bi.fromBufferAttribute(t,c),Ee.add(bi)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new E,l[L]=new E;const c=new E,d=new E,u=new E,f=new gt,p=new gt,g=new gt,v=new E,m=new E;function h(L,S,x){c.fromBufferAttribute(n,L),d.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),f.fromBufferAttribute(a,L),p.fromBufferAttribute(a,S),g.fromBufferAttribute(a,x),d.sub(c),u.sub(c),p.sub(f),g.sub(f);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(C),o[L].add(v),o[S].add(v),o[x].add(v),l[L].add(m),l[S].add(m),l[x].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let L=0,S=T.length;L<S;++L){const x=T[L],C=x.start,B=x.count;for(let k=C,q=C+B;k<q;k+=3)h(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const M=new E,b=new E,D=new E,A=new E;function R(L){D.fromBufferAttribute(s,L),A.copy(D);const S=o[L];M.copy(S),M.sub(D.multiplyScalar(D.dot(S))).normalize(),b.crossVectors(A,S);const C=b.dot(l[L])<0?-1:1;r.setXYZW(L,M.x,M.y,M.z,C)}for(let L=0,S=T.length;L<S;++L){const x=T[L],C=x.start,B=x.count;for(let k=C,q=C+B;k<q;k+=3)R(t.getX(k+0)),R(t.getX(k+1)),R(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new sn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new E,a=new E,r=new E,o=new E,l=new E,c=new E,d=new E,u=new E;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,v),r.fromBufferAttribute(e,m),d.subVectors(r,a),u.subVectors(s,a),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),a.fromBufferAttribute(e,f+1),r.fromBufferAttribute(e,f+2),d.subVectors(r,a),u.subVectors(s,a),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*d;for(let h=0;h<d;h++)f[g++]=c[p++]}return new sn(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],p=t(f,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];d.push(p.toJSON(t.data))}d.length>0&&(s[l]=d,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(e))}const a=t.morphAttributes;for(const c in a){const d=[],u=a[c];for(let f=0,p=u.length;f<p;f++)d.push(u[f].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,d=r.length;c<d;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oo=new he,qn=new oa,Ts=new ra,Bo=new E,ws=new E,As=new E,Cs=new E,La=new E,Rs=new E,ko=new E,Ps=new E;class K extends be{constructor(t=new Oe,e=new Je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(a&&o){Rs.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],u=a[l];d!==0&&(La.fromBufferAttribute(u,t),r?Rs.addScaledVector(La,d):Rs.addScaledVector(La.sub(e),d))}e.add(Rs)}return e}raycast(t,e){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(a),qn.copy(t.ray).recast(t.near),!(Ts.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Ts,Bo)===null||qn.origin.distanceToSquared(Bo)>(t.far-t.near)**2))&&(Oo.copy(a).invert(),qn.copy(t.ray).applyMatrix4(Oo),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qn)))}_computeIntersections(t,e,n){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,u=a.attributes.normal,f=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,v=f.length;g<v;g++){const m=f[g],h=r[m.materialIndex],T=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=T,D=M;b<D;b+=3){const A=o.getX(b),R=o.getX(b+1),L=o.getX(b+2);s=Ls(this,h,t,n,c,d,u,A,R,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,h=v;m<h;m+=3){const T=o.getX(m),M=o.getX(m+1),b=o.getX(m+2);s=Ls(this,r,t,n,c,d,u,T,M,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,v=f.length;g<v;g++){const m=f[g],h=r[m.materialIndex],T=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=T,D=M;b<D;b+=3){const A=b,R=b+1,L=b+2;s=Ls(this,h,t,n,c,d,u,A,R,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,h=v;m<h;m+=3){const T=m,M=m+1,b=m+2;s=Ls(this,r,t,n,c,d,u,T,M,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Nd(i,t,e,n,s,a,r,o){let l;if(t.side===Fe?l=n.intersectTriangle(r,a,s,!0,o):l=n.intersectTriangle(s,a,r,t.side===An,o),l===null)return null;Ps.copy(o),Ps.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ps);return c<e.near||c>e.far?null:{distance:c,point:Ps.clone(),object:i}}function Ls(i,t,e,n,s,a,r,o,l,c){i.getVertexPosition(o,ws),i.getVertexPosition(l,As),i.getVertexPosition(c,Cs);const d=Nd(i,t,e,n,ws,As,Cs,ko);if(d){const u=new E;Xe.getBarycoord(ko,ws,As,Cs,u),s&&(d.uv=Xe.getInterpolatedAttribute(s,o,l,c,u,new gt)),a&&(d.uv1=Xe.getInterpolatedAttribute(a,o,l,c,u,new gt)),r&&(d.normal=Xe.getInterpolatedAttribute(r,o,l,c,u,new E),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new E,materialIndex:0};Xe.getNormal(ws,As,Cs,f.normal),d.face=f,d.barycoord=u}return d}class Lt extends Oe{constructor(t=1,e=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],d=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,r,a,0),g("z","y","x",1,-1,n,e,-t,r,a,1),g("x","z","y",1,1,t,n,e,s,r,2),g("x","z","y",1,-1,t,n,-e,s,r,3),g("x","y","z",1,-1,t,e,n,s,a,4),g("x","y","z",-1,-1,t,e,-n,s,a,5),this.setIndex(l),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(d,3)),this.setAttribute("uv",new ve(u,2));function g(v,m,h,T,M,b,D,A,R,L,S){const x=b/R,C=D/L,B=b/2,k=D/2,q=A/2,Y=R+1,H=L+1;let Q=0,W=0;const it=new E;for(let nt=0;nt<H;nt++){const ot=nt*C-k;for(let Ct=0;Ct<Y;Ct++){const Wt=Ct*x-B;it[v]=Wt*T,it[m]=ot*M,it[h]=q,c.push(it.x,it.y,it.z),it[v]=0,it[m]=0,it[h]=A>0?1:-1,d.push(it.x,it.y,it.z),u.push(Ct/R),u.push(1-nt/L),Q+=1}}for(let nt=0;nt<L;nt++)for(let ot=0;ot<R;ot++){const Ct=f+ot+Y*nt,Wt=f+ot+Y*(nt+1),X=f+(ot+1)+Y*(nt+1),tt=f+(ot+1)+Y*nt;l.push(Ct,Wt,tt),l.push(Wt,X,tt),W+=6}o.addGroup(p,W,S),p+=W,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Pe(i){const t={};for(let e=0;e<i.length;e++){const n=Hi(i[e]);for(const s in n)t[s]=n[s]}return t}function Fd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Od={clone:Hi,merge:Pe};var Bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends li{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bd,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=Fd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ic extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const On=new E,zo=new gt,Vo=new gt;class Ve extends ic{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Br*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Br*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,zo,Vo),e.subVectors(Vo,zo)}setViewOffset(t,e,n,s,a,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,e-=r.offsetY*n/c,s*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Si=-90,Mi=1;class zd extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ve(Si,Mi,t,e);s.layers=this.layers,this.add(s);const a=new Ve(Si,Mi,t,e);a.layers=this.layers,this.add(a);const r=new Ve(Si,Mi,t,e);r.layers=this.layers,this.add(r);const o=new Ve(Si,Mi,t,e);o.layers=this.layers,this.add(o);const l=new Ve(Si,Mi,t,e);l.layers=this.layers,this.add(l);const c=new Ve(Si,Mi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,a,r,o,l]=e;for(const c of e)this.remove(c);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,d]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,a),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sc extends Ie{constructor(t,e,n,s,a,r,o,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:Bi,super(t,e,n,s,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vd extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Lt(5,5,5),a=new Gn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:zn});a.uniforms.tEquirect.value=e;const r=new K(s,a),o=e.minFilter;return e.minFilter===ii&&(e.minFilter=cn),new zd(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(a)}}const Da=new E,Hd=new E,Gd=new Gt;class Bn{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Da.subVectors(n,e).cross(Hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Da),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Gd.getNormalMatrix(t),s=this.coplanarPoint(Da).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new ra,Ds=new E;class Jr{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,a=new Bn,r=new Bn){this.planes=[t,e,n,s,a,r]}set(t,e,n,s,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn){const n=this.planes,s=t.elements,a=s[0],r=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],h=s[12],T=s[13],M=s[14],b=s[15];if(n[0].setComponents(l-a,f-c,m-p,b-h).normalize(),n[1].setComponents(l+a,f+c,m+p,b+h).normalize(),n[2].setComponents(l+r,f+d,m+g,b+T).normalize(),n[3].setComponents(l-r,f-d,m-g,b-T).normalize(),n[4].setComponents(l-o,f-u,m-v,b-M).normalize(),e===Mn)n[5].setComponents(l+o,f+u,m+v,b+M).normalize();else if(e===Qs)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(t){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ds.x=s.normal.x>0?t.max.x:t.min.x,Ds.y=s.normal.y>0?t.max.y:t.min.y,Ds.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ac(){let i=null,t=!1,e=null,n=null;function s(a,r){e(a,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){i=a}}}function Wd(i){const t=new WeakMap;function e(o,l){const c=o.array,d=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const v=u[p];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}class Le extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const a=t/2,r=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=t/o,f=e/l,p=[],g=[],v=[],m=[];for(let h=0;h<d;h++){const T=h*f-r;for(let M=0;M<c;M++){const b=M*u-a;g.push(b,-T,0),v.push(0,0,1),m.push(M/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let T=0;T<o;T++){const M=T+c*h,b=T+c*(h+1),D=T+1+c*(h+1),A=T+1+c*h;p.push(M,b,A),p.push(b,D,A)}this.setIndex(p),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(v,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.width,t.height,t.widthSegments,t.heightSegments)}}var Xd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$d=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,th=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ih=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ah=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,oh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ch=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ph=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_h=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Eh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Th=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ah=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ch=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ph=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ih=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Oh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Bh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$h=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,tu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,su=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,au=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ru=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ou=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,du=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_u=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Su=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Eu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Au=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ru=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Du=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Uu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ou=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ku=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ku=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ju=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ju=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,of=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,df=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ff=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ef=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:Xd,alphahash_pars_fragment:$d,alphamap_fragment:qd,alphamap_pars_fragment:Yd,alphatest_fragment:Zd,alphatest_pars_fragment:Kd,aomap_fragment:jd,aomap_pars_fragment:Jd,batching_pars_vertex:Qd,batching_vertex:th,begin_vertex:eh,beginnormal_vertex:nh,bsdfs:ih,iridescence_fragment:sh,bumpmap_pars_fragment:ah,clipping_planes_fragment:rh,clipping_planes_pars_fragment:oh,clipping_planes_pars_vertex:lh,clipping_planes_vertex:ch,color_fragment:dh,color_pars_fragment:hh,color_pars_vertex:uh,color_vertex:fh,common:ph,cube_uv_reflection_fragment:mh,defaultnormal_vertex:gh,displacementmap_pars_vertex:vh,displacementmap_vertex:_h,emissivemap_fragment:xh,emissivemap_pars_fragment:yh,colorspace_fragment:bh,colorspace_pars_fragment:Sh,envmap_fragment:Mh,envmap_common_pars_fragment:Eh,envmap_pars_fragment:Th,envmap_pars_vertex:wh,envmap_physical_pars_fragment:Oh,envmap_vertex:Ah,fog_vertex:Ch,fog_pars_vertex:Rh,fog_fragment:Ph,fog_pars_fragment:Lh,gradientmap_pars_fragment:Dh,lightmap_pars_fragment:Ih,lights_lambert_fragment:Uh,lights_lambert_pars_fragment:Nh,lights_pars_begin:Fh,lights_toon_fragment:Bh,lights_toon_pars_fragment:kh,lights_phong_fragment:zh,lights_phong_pars_fragment:Vh,lights_physical_fragment:Hh,lights_physical_pars_fragment:Gh,lights_fragment_begin:Wh,lights_fragment_maps:Xh,lights_fragment_end:$h,logdepthbuf_fragment:qh,logdepthbuf_pars_fragment:Yh,logdepthbuf_pars_vertex:Zh,logdepthbuf_vertex:Kh,map_fragment:jh,map_pars_fragment:Jh,map_particle_fragment:Qh,map_particle_pars_fragment:tu,metalnessmap_fragment:eu,metalnessmap_pars_fragment:nu,morphinstance_vertex:iu,morphcolor_vertex:su,morphnormal_vertex:au,morphtarget_pars_vertex:ru,morphtarget_vertex:ou,normal_fragment_begin:lu,normal_fragment_maps:cu,normal_pars_fragment:du,normal_pars_vertex:hu,normal_vertex:uu,normalmap_pars_fragment:fu,clearcoat_normal_fragment_begin:pu,clearcoat_normal_fragment_maps:mu,clearcoat_pars_fragment:gu,iridescence_pars_fragment:vu,opaque_fragment:_u,packing:xu,premultiplied_alpha_fragment:yu,project_vertex:bu,dithering_fragment:Su,dithering_pars_fragment:Mu,roughnessmap_fragment:Eu,roughnessmap_pars_fragment:Tu,shadowmap_pars_fragment:wu,shadowmap_pars_vertex:Au,shadowmap_vertex:Cu,shadowmask_pars_fragment:Ru,skinbase_vertex:Pu,skinning_pars_vertex:Lu,skinning_vertex:Du,skinnormal_vertex:Iu,specularmap_fragment:Uu,specularmap_pars_fragment:Nu,tonemapping_fragment:Fu,tonemapping_pars_fragment:Ou,transmission_fragment:Bu,transmission_pars_fragment:ku,uv_pars_fragment:zu,uv_pars_vertex:Vu,uv_vertex:Hu,worldpos_vertex:Gu,background_vert:Wu,background_frag:Xu,backgroundCube_vert:$u,backgroundCube_frag:qu,cube_vert:Yu,cube_frag:Zu,depth_vert:Ku,depth_frag:ju,distanceRGBA_vert:Ju,distanceRGBA_frag:Qu,equirect_vert:tf,equirect_frag:ef,linedashed_vert:nf,linedashed_frag:sf,meshbasic_vert:af,meshbasic_frag:rf,meshlambert_vert:of,meshlambert_frag:lf,meshmatcap_vert:cf,meshmatcap_frag:df,meshnormal_vert:hf,meshnormal_frag:uf,meshphong_vert:ff,meshphong_frag:pf,meshphysical_vert:mf,meshphysical_frag:gf,meshtoon_vert:vf,meshtoon_frag:_f,points_vert:xf,points_frag:yf,shadow_vert:bf,shadow_frag:Sf,sprite_vert:Mf,sprite_frag:Ef},ct={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},rn={basic:{uniforms:Pe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Pe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new zt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Pe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Pe([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Pe([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new zt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Pe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Pe([ct.points,ct.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Pe([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Pe([ct.common,ct.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Pe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Pe([ct.sprite,ct.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Pe([ct.common,ct.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Pe([ct.lights,ct.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};rn.physical={uniforms:Pe([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const Is={r:0,b:0,g:0},Zn=new hn,Tf=new he;function wf(i,t,e,n,s,a,r){const o=new zt(0);let l=a===!0?0:1,c,d,u=null,f=0,p=null;function g(T){let M=T.isScene===!0?T.background:null;return M&&M.isTexture&&(M=(T.backgroundBlurriness>0?e:t).get(M)),M}function v(T){let M=!1;const b=g(T);b===null?h(o,l):b&&b.isColor&&(h(b,1),M=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,M){const b=g(M);b&&(b.isCubeTexture||b.mapping===sa)?(d===void 0&&(d=new K(new Lt(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Hi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(D,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Zn.copy(M.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),d.material.uniforms.envMap.value=b,d.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Tf.makeRotationFromEuler(Zn)),d.material.toneMapped=Qt.getTransfer(b.colorSpace)!==oe,(u!==b||f!==b.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,u=b,f=b.version,p=i.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new K(new Le(2,2),new Gn({name:"BackgroundMaterial",uniforms:Hi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(b.colorSpace)!==oe,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,p=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function h(T,M){T.getRGB(Is,nc(i)),n.buffers.color.setClear(Is.r,Is.g,Is.b,M,r)}return{getClearColor:function(){return o},setClearColor:function(T,M=1){o.set(T),l=M,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,h(o,l)},render:v,addToRenderList:m}}function Af(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let a=s,r=!1;function o(x,C,B,k,q){let Y=!1;const H=u(k,B,C);a!==H&&(a=H,c(a.object)),Y=p(x,k,B,q),Y&&g(x,k,B,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(Y||r)&&(r=!1,b(x,C,B,k),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,C,B){const k=B.wireframe===!0;let q=n[x.id];q===void 0&&(q={},n[x.id]=q);let Y=q[C.id];Y===void 0&&(Y={},q[C.id]=Y);let H=Y[k];return H===void 0&&(H=f(l()),Y[k]=H),H}function f(x){const C=[],B=[],k=[];for(let q=0;q<e;q++)C[q]=0,B[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:B,attributeDivisors:k,object:x,attributes:{},index:null}}function p(x,C,B,k){const q=a.attributes,Y=C.attributes;let H=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){const nt=q[W];let ot=Y[W];if(ot===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(ot=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(ot=x.instanceColor)),nt===void 0||nt.attribute!==ot||ot&&nt.data!==ot.data)return!0;H++}return a.attributesNum!==H||a.index!==k}function g(x,C,B,k){const q={},Y=C.attributes;let H=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){let nt=Y[W];nt===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(nt=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(nt=x.instanceColor));const ot={};ot.attribute=nt,nt&&nt.data&&(ot.data=nt.data),q[W]=ot,H++}a.attributes=q,a.attributesNum=H,a.index=k}function v(){const x=a.newAttributes;for(let C=0,B=x.length;C<B;C++)x[C]=0}function m(x){h(x,0)}function h(x,C){const B=a.newAttributes,k=a.enabledAttributes,q=a.attributeDivisors;B[x]=1,k[x]===0&&(i.enableVertexAttribArray(x),k[x]=1),q[x]!==C&&(i.vertexAttribDivisor(x,C),q[x]=C)}function T(){const x=a.newAttributes,C=a.enabledAttributes;for(let B=0,k=C.length;B<k;B++)C[B]!==x[B]&&(i.disableVertexAttribArray(B),C[B]=0)}function M(x,C,B,k,q,Y,H){H===!0?i.vertexAttribIPointer(x,C,B,q,Y):i.vertexAttribPointer(x,C,B,k,q,Y)}function b(x,C,B,k){v();const q=k.attributes,Y=B.getAttributes(),H=C.defaultAttributeValues;for(const Q in Y){const W=Y[Q];if(W.location>=0){let it=q[Q];if(it===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),it!==void 0){const nt=it.normalized,ot=it.itemSize,Ct=t.get(it);if(Ct===void 0)continue;const Wt=Ct.buffer,X=Ct.type,tt=Ct.bytesPerElement,ht=X===i.INT||X===i.UNSIGNED_INT||it.gpuType===Xr;if(it.isInterleavedBufferAttribute){const rt=it.data,bt=rt.stride,At=it.offset;if(rt.isInstancedInterleavedBuffer){for(let Ut=0;Ut<W.locationSize;Ut++)h(W.location+Ut,rt.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ut=0;Ut<W.locationSize;Ut++)m(W.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let Ut=0;Ut<W.locationSize;Ut++)M(W.location+Ut,ot/W.locationSize,X,nt,bt*tt,(At+ot/W.locationSize*Ut)*tt,ht)}else{if(it.isInstancedBufferAttribute){for(let rt=0;rt<W.locationSize;rt++)h(W.location+rt,it.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let rt=0;rt<W.locationSize;rt++)m(W.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let rt=0;rt<W.locationSize;rt++)M(W.location+rt,ot/W.locationSize,X,nt,ot*tt,ot/W.locationSize*rt*tt,ht)}}else if(H!==void 0){const nt=H[Q];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(W.location,nt);break;case 3:i.vertexAttrib3fv(W.location,nt);break;case 4:i.vertexAttrib4fv(W.location,nt);break;default:i.vertexAttrib1fv(W.location,nt)}}}}T()}function D(){L();for(const x in n){const C=n[x];for(const B in C){const k=C[B];for(const q in k)d(k[q].object),delete k[q];delete C[B]}delete n[x]}}function A(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const B in C){const k=C[B];for(const q in k)d(k[q].object),delete k[q];delete C[B]}delete n[x.id]}function R(x){for(const C in n){const B=n[C];if(B[x.id]===void 0)continue;const k=B[x.id];for(const q in k)d(k[q].object),delete k[q];delete B[x.id]}}function L(){S(),r=!0,a!==s&&(a=s,c(a.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Cf(i,t,e){let n;function s(c){n=c}function a(c,d){i.drawArrays(n,c,d),e.update(d,n,1)}function r(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),e.update(d,n,u))}function o(c,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let p=0;for(let g=0;g<u;g++)p+=d[g];e.update(p,n,1)}function l(c,d,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],d[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,d,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Rf(i,t,e,n){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==tn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Sn&&!L)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:b,vertexTextures:D,maxSamples:A}}function Pf(i){const t=this;let e=null,n=0,s=!1,a=!1;const r=new Bn,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,f){e=d(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,h=i.get(u);if(!s||g===null||g.length===0||a&&!m)a?d(null):c();else{const T=a?0:n,M=T*4;let b=h.clippingState||null;l.value=b,b=d(g,f,M,p);for(let D=0;D!==M;++D)b[D]=e[D];h.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,f,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const h=p+v*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<h)&&(m=new Float32Array(h));for(let M=0,b=p;M!==v;++M,b+=4)r.copy(u[M]).applyMatrix4(T,o),r.normal.toArray(m,b),m[b+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Lf(i){let t=new WeakMap;function e(r,o){return o===or?r.mapping=Bi:o===lr&&(r.mapping=ki),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===or||o===lr)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Vd(l.height);return c.fromEquirectangularTexture(i,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class rc extends ic{constructor(t=-1,e=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-t,r=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Li=4,Ho=[.125,.215,.35,.446,.526,.582],ei=20,Ia=new rc,Go=new zt;let Ua=null,Na=0,Fa=0,Oa=!1;const Jn=(1+Math.sqrt(5))/2,Ei=1/Jn,Wo=[new E(-Jn,Ei,0),new E(Jn,Ei,0),new E(-Ei,0,Jn),new E(Ei,0,Jn),new E(0,Jn,-Ei),new E(0,Jn,Ei),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class Xo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,s,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ua,Na,Fa),this._renderer.xr.enabled=Oa,t.scissorTest=!1,Us(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Fa=this._renderer.getActiveMipmapLevel(),Oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:hs,format:tn,colorSpace:Xi,depthBuffer:!1},s=$o(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$o(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Df(a)),this._blurMaterial=If(a,t,e)}return s}_compileMaterial(t){const e=new K(this._lodPlanes[0],t);this._renderer.compile(e,Ia)}_sceneToCubeUV(t,e,n,s){const o=new Ve(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Go),d.toneMapping=Vn,d.autoClear=!1;const p=new Je({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),g=new K(new Lt,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Go),v=!0);for(let h=0;h<6;h++){const T=h%3;T===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):T===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const M=this._cubeSize;Us(s,T*M,h>2?M:0,M,M),d.setRenderTarget(s),v&&d.render(g,o),d.render(t,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Bi||t.mapping===ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qo());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new K(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;const l=this._cubeSize;Us(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,Ia)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Wo[(s-a-1)%Wo.length];this._blur(t,a-1,a,r,o)}e.autoClear=n}_blur(t,e,n,s,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",a),this._halfBlur(r,t,n,n,s,"longitudinal",a)}_halfBlur(t,e,n,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new K(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*ei-1),v=a/g,m=isFinite(a)?1+Math.floor(d*v):ei;m>ei&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ei}`);const h=[];let T=0;for(let R=0;R<ei;++R){const L=R/v,S=Math.exp(-L*L/2);h.push(S),R===0?T+=S:R<m&&(T+=2*S)}for(let R=0;R<h.length;R++)h[R]=h[R]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const b=this._sizeLods[s],D=3*b*(s>M-Li?s-M+Li:0),A=4*(this._cubeSize-b);Us(e,D,A,3*b,2*b),l.setRenderTarget(e),l.render(u,Ia)}}function Df(i){const t=[],e=[],n=[];let s=i;const a=i-Li+1+Ho.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);e.push(o);let l=1/o;r>i-Li?l=Ho[r-i+Li-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,g=6,v=3,m=2,h=1,T=new Float32Array(v*g*p),M=new Float32Array(m*g*p),b=new Float32Array(h*g*p);for(let A=0;A<p;A++){const R=A%3*2/3-1,L=A>2?0:-1,S=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];T.set(S,v*g*A),M.set(f,m*g*A);const x=[A,A,A,A,A,A];b.set(x,h*g*A)}const D=new Oe;D.setAttribute("position",new sn(T,v)),D.setAttribute("uv",new sn(M,m)),D.setAttribute("faceIndex",new sn(b,h)),t.push(D),s>Li&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $o(i,t,e){const n=new ai(i,t,e);return n.texture.mapping=sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Us(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function If(i,t,e){const n=new Float32Array(ei),s=new E(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function qo(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Yo(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Qr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Uf(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===or||l===lr,d=l===Bi||l===ki;if(c||d){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Xo(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&s(p)?(e===null&&(e=new Xo(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",a),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Nf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&as("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ff(i,t,e,n){const s={},a=new WeakMap;function r(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,h=v.length;m<h;m++)t.remove(v[m])}f.removeEventListener("dispose",r),delete s[f.id];const p=a.get(f);p&&(t.remove(p),a.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",r),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,h=v.length;m<h;m++)t.update(v[m],i.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const T=p.array;v=p.version;for(let M=0,b=T.length;M<b;M+=3){const D=T[M+0],A=T[M+1],R=T[M+2];f.push(D,A,A,R,R,D)}}else if(g!==void 0){const T=g.array;v=g.version;for(let M=0,b=T.length/3-1;M<b;M+=3){const D=M+0,A=M+1,R=M+2;f.push(D,A,A,R,R,D)}}else return;const m=new(Kl(f)?ec:tc)(f,1);m.version=v;const h=a.get(u);h&&t.remove(h),a.set(u,m)}function d(u){const f=a.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Of(i,t,e){let n;function s(f){n=f}let a,r;function o(f){a=f.type,r=f.bytesPerElement}function l(f,p){i.drawElements(n,p,a,f*r),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,a,f*r,g),e.update(p,n,g))}function d(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,a,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];e.update(m,n,1)}function u(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/r,p[h],v[h]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,a,f,0,v,0,g);let h=0;for(let T=0;T<g;T++)h+=p[T]*v[T];e.update(h,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Bf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=o*(a/3);break;case i.LINES:e.lines+=o*(a/2);break;case i.LINE_STRIP:e.lines+=o*(a-1);break;case i.LINE_LOOP:e.lines+=o*a;break;case i.POINTS:e.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function kf(i,t,e){const n=new WeakMap,s=new de;function a(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let x=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var p=x;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;g===!0&&(b=1),v===!0&&(b=2),m===!0&&(b=3);let D=o.attributes.position.count*b,A=1;D>t.maxTextureSize&&(A=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const R=new Float32Array(D*A*4*u),L=new Jl(R,D,A,u);L.type=Sn,L.needsUpdate=!0;const S=b*4;for(let C=0;C<u;C++){const B=h[C],k=T[C],q=M[C],Y=D*A*4*C;for(let H=0;H<B.count;H++){const Q=H*S;g===!0&&(s.fromBufferAttribute(B,H),R[Y+Q+0]=s.x,R[Y+Q+1]=s.y,R[Y+Q+2]=s.z,R[Y+Q+3]=0),v===!0&&(s.fromBufferAttribute(k,H),R[Y+Q+4]=s.x,R[Y+Q+5]=s.y,R[Y+Q+6]=s.z,R[Y+Q+7]=0),m===!0&&(s.fromBufferAttribute(q,H),R[Y+Q+8]=s.x,R[Y+Q+9]=s.y,R[Y+Q+10]=s.z,R[Y+Q+11]=q.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new gt(D,A)},n.set(o,f),o.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:a}}function zf(i,t,e,n){let s=new WeakMap;function a(l){const c=n.render.frame,d=l.geometry,u=t.get(l,d);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:a,dispose:r}}class oc extends Ie{constructor(t,e,n,s,a,r,o,l,c,d=Ni){if(d!==Ni&&d!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ni&&(n=si),n===void 0&&d===Vi&&(n=zi),super(null,s,a,r,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:nn,this.minFilter=l!==void 0?l:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const lc=new Ie,Zo=new oc(1,1),cc=new Jl,dc=new Td,hc=new sc,Ko=[],jo=[],Jo=new Float32Array(16),Qo=new Float32Array(9),tl=new Float32Array(4);function $i(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let a=Ko[s];if(a===void 0&&(a=new Float32Array(s),Ko[s]=a),t!==0){n.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=e,i[r].toArray(a,o)}return a}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function la(i,t){let e=jo[t];e===void 0&&(e=new Int32Array(t),jo[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Hf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function Gf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function Wf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function Xf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(Se(e,n))return;tl.set(n),i.uniformMatrix2fv(this.addr,!1,tl),Me(e,n)}}function $f(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(Se(e,n))return;Qo.set(n),i.uniformMatrix3fv(this.addr,!1,Qo),Me(e,n)}}function qf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(Se(e,n))return;Jo.set(n),i.uniformMatrix4fv(this.addr,!1,Jo),Me(e,n)}}function Yf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function Kf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function jf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function Jf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function tp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function ep(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function np(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(Zo.compareFunction=Zl,a=Zo):a=lc,e.setTexture2D(t||a,s)}function ip(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||dc,s)}function sp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||hc,s)}function ap(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||cc,s)}function rp(i){switch(i){case 5126:return Vf;case 35664:return Hf;case 35665:return Gf;case 35666:return Wf;case 35674:return Xf;case 35675:return $f;case 35676:return qf;case 5124:case 35670:return Yf;case 35667:case 35671:return Zf;case 35668:case 35672:return Kf;case 35669:case 35673:return jf;case 5125:return Jf;case 36294:return Qf;case 36295:return tp;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return np;case 35679:case 36299:case 36307:return ip;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return ap}}function op(i,t){i.uniform1fv(this.addr,t)}function lp(i,t){const e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function cp(i,t){const e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function dp(i,t){const e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function hp(i,t){const e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function up(i,t){const e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fp(i,t){const e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pp(i,t){i.uniform1iv(this.addr,t)}function mp(i,t){i.uniform2iv(this.addr,t)}function gp(i,t){i.uniform3iv(this.addr,t)}function vp(i,t){i.uniform4iv(this.addr,t)}function _p(i,t){i.uniform1uiv(this.addr,t)}function xp(i,t){i.uniform2uiv(this.addr,t)}function yp(i,t){i.uniform3uiv(this.addr,t)}function bp(i,t){i.uniform4uiv(this.addr,t)}function Sp(i,t,e){const n=this.cache,s=t.length,a=la(e,s);Se(n,a)||(i.uniform1iv(this.addr,a),Me(n,a));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||lc,a[r])}function Mp(i,t,e){const n=this.cache,s=t.length,a=la(e,s);Se(n,a)||(i.uniform1iv(this.addr,a),Me(n,a));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||dc,a[r])}function Ep(i,t,e){const n=this.cache,s=t.length,a=la(e,s);Se(n,a)||(i.uniform1iv(this.addr,a),Me(n,a));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||hc,a[r])}function Tp(i,t,e){const n=this.cache,s=t.length,a=la(e,s);Se(n,a)||(i.uniform1iv(this.addr,a),Me(n,a));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||cc,a[r])}function wp(i){switch(i){case 5126:return op;case 35664:return lp;case 35665:return cp;case 35666:return dp;case 35674:return hp;case 35675:return up;case 35676:return fp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return vp;case 5125:return _p;case 36294:return xp;case 36295:return yp;case 36296:return bp;case 35678:case 36198:case 36298:case 36306:case 35682:return Sp;case 35679:case 36299:case 36307:return Mp;case 35680:case 36300:case 36308:case 36293:return Ep;case 36289:case 36303:case 36311:case 36292:return Tp}}class Ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rp(e.type)}}class Cp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wp(e.type)}}class Rp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(t,e[o.id],n)}}}const Ba=/(\w+)(\])?(\[|\.)?/g;function el(i,t){i.seq.push(t),i.map[t.id]=t}function Pp(i,t,e){const n=i.name,s=n.length;for(Ba.lastIndex=0;;){const a=Ba.exec(n),r=Ba.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){el(e,c===void 0?new Ap(o,i,t):new Cp(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Rp(o),el(e,u)),e=u}}}class js{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=t.getActiveUniform(e,s),r=t.getUniformLocation(e,a.name);Pp(a,r,this)}}setValue(t,e,n,s){const a=this.map[e];a!==void 0&&a.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let a=0,r=e.length;a!==r;++a){const o=e[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,a=t.length;s!==a;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function nl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Lp=37297;let Dp=0;function Ip(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let r=s;r<a;r++){const o=r+1;n.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return n.join(`
`)}const il=new Gt;function Up(i){Qt._getMatrix(il,Qt.workingColorSpace,i);const t=`mat3( ${il.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case aa:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function sl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+Ip(i.getShaderSource(t),r)}else return s}function Np(i,t){const e=Up(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fp(i,t){let e;switch(t){case Jc:e="Linear";break;case Qc:e="Reinhard";break;case td:e="Cineon";break;case Fl:e="ACESFilmic";break;case nd:e="AgX";break;case id:e="Neutral";break;case ed:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ns=new E;function Op(){Qt.getLuminanceCoefficients(Ns);const i=Ns.x.toFixed(4),t=Ns.y.toFixed(4),e=Ns.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rs).join(`
`)}function kp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function zp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(t,s),r=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),e[r]={type:a.type,location:i.getAttribLocation(t,r),locationSize:o}}return e}function rs(i){return i!==""}function al(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vp=/^[ \t]*#include +<([\w\d./]+)>/gm;function kr(i){return i.replace(Vp,Gp)}const Hp=new Map;function Gp(i,t){let e=$t[t];if(e===void 0){const n=Hp.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return kr(e)}const Wp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(i){return i.replace(Wp,Xp)}function Xp(i,t,e,n){let s="";for(let a=parseInt(t);a<parseInt(e);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function ll(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $p(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Il?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ul?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function qp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case ki:t="ENVMAP_TYPE_CUBE";break;case sa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Yp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ki:t="ENVMAP_MODE_REFRACTION";break}return t}function Zp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Nl:t="ENVMAP_BLENDING_MULTIPLY";break;case Kc:t="ENVMAP_BLENDING_MIX";break;case jc:t="ENVMAP_BLENDING_ADD";break}return t}function Kp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function jp(i,t,e,n){const s=i.getContext(),a=e.defines;let r=e.vertexShader,o=e.fragmentShader;const l=$p(e),c=qp(e),d=Yp(e),u=Zp(e),f=Kp(e),p=Bp(e),g=kp(a),v=s.createProgram();let m,h,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(rs).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(rs).join(`
`),h.length>0&&(h+=`
`)):(m=[ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rs).join(`
`),h=[ll(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Vn?Fp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Np("linearToOutputTexel",e.outputColorSpace),Op(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(rs).join(`
`)),r=kr(r),r=al(r,e),r=rl(r,e),o=kr(o),o=al(o,e),o=rl(o,e),r=ol(r),o=ol(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=T+m+r,b=T+h+o,D=nl(s,s.VERTEX_SHADER,M),A=nl(s,s.FRAGMENT_SHADER,b);s.attachShader(v,D),s.attachShader(v,A),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(v).trim(),k=s.getShaderInfoLog(D).trim(),q=s.getShaderInfoLog(A).trim();let Y=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,D,A);else{const Q=sl(s,D,"vertex"),W=sl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+Q+`
`+W)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||q==="")&&(H=!1);H&&(C.diagnostics={runnable:Y,programLog:B,vertexShader:{log:k,prefix:m},fragmentShader:{log:q,prefix:h}})}s.deleteShader(D),s.deleteShader(A),L=new js(s,v),S=zp(s,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,Lp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=D,this.fragmentShader=A,this}let Jp=0;class Qp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tm(t),e.set(t,n)),n}}class tm{constructor(t){this.id=Jp++,this.code=t,this.usedTimes=0}}function em(i,t,e,n,s,a,r){const o=new jr,l=new Qp,c=new Set,d=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,C,B,k){const q=B.fog,Y=k.geometry,H=S.isMeshStandardMaterial?B.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||H),W=Q&&Q.mapping===sa?Q.image.height:null,it=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const nt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ot=nt!==void 0?nt.length:0;let Ct=0;Y.morphAttributes.position!==void 0&&(Ct=1),Y.morphAttributes.normal!==void 0&&(Ct=2),Y.morphAttributes.color!==void 0&&(Ct=3);let Wt,X,tt,ht;if(it){const re=rn[it];Wt=re.vertexShader,X=re.fragmentShader}else Wt=S.vertexShader,X=S.fragmentShader,l.update(S),tt=l.getVertexShaderID(S),ht=l.getFragmentShaderID(S);const rt=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),At=k.isInstancedMesh===!0,Ut=k.isBatchedMesh===!0,Bt=!!S.map,Nt=!!S.matcap,jt=!!Q,P=!!S.aoMap,Zt=!!S.lightMap,kt=!!S.bumpMap,qt=!!S.normalMap,Rt=!!S.displacementMap,Yt=!!S.emissiveMap,Pt=!!S.metalnessMap,w=!!S.roughnessMap,_=S.anisotropy>0,F=S.clearcoat>0,G=S.dispersion>0,j=S.iridescence>0,Z=S.sheen>0,St=S.transmission>0,dt=_&&!!S.anisotropyMap,_t=F&&!!S.clearcoatMap,Jt=F&&!!S.clearcoatNormalMap,st=F&&!!S.clearcoatRoughnessMap,xt=j&&!!S.iridescenceMap,It=j&&!!S.iridescenceThicknessMap,Ft=Z&&!!S.sheenColorMap,yt=Z&&!!S.sheenRoughnessMap,Kt=!!S.specularMap,Xt=!!S.specularColorMap,ue=!!S.specularIntensityMap,U=St&&!!S.transmissionMap,ut=St&&!!S.thicknessMap,$=!!S.gradientMap,et=!!S.alphaMap,vt=S.alphaTest>0,pt=!!S.alphaHash,Vt=!!S.extensions;let _e=Vn;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(_e=i.toneMapping);const we={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:Wt,fragmentShader:X,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:ht,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Ut,batchingColor:Ut&&k._colorsTexture!==null,instancing:At,instancingColor:At&&k.instanceColor!==null,instancingMorph:At&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Xi,alphaToCoverage:!!S.alphaToCoverage,map:Bt,matcap:Nt,envMap:jt,envMapMode:jt&&Q.mapping,envMapCubeUVHeight:W,aoMap:P,lightMap:Zt,bumpMap:kt,normalMap:qt,displacementMap:f&&Rt,emissiveMap:Yt,normalMapObjectSpace:qt&&S.normalMapType===od,normalMapTangentSpace:qt&&S.normalMapType===Yl,metalnessMap:Pt,roughnessMap:w,anisotropy:_,anisotropyMap:dt,clearcoat:F,clearcoatMap:_t,clearcoatNormalMap:Jt,clearcoatRoughnessMap:st,dispersion:G,iridescence:j,iridescenceMap:xt,iridescenceThicknessMap:It,sheen:Z,sheenColorMap:Ft,sheenRoughnessMap:yt,specularMap:Kt,specularColorMap:Xt,specularIntensityMap:ue,transmission:St,transmissionMap:U,thicknessMap:ut,gradientMap:$,opaque:S.transparent===!1&&S.blending===Ui&&S.alphaToCoverage===!1,alphaMap:et,alphaTest:vt,alphaHash:pt,combine:S.combine,mapUv:Bt&&v(S.map.channel),aoMapUv:P&&v(S.aoMap.channel),lightMapUv:Zt&&v(S.lightMap.channel),bumpMapUv:kt&&v(S.bumpMap.channel),normalMapUv:qt&&v(S.normalMap.channel),displacementMapUv:Rt&&v(S.displacementMap.channel),emissiveMapUv:Yt&&v(S.emissiveMap.channel),metalnessMapUv:Pt&&v(S.metalnessMap.channel),roughnessMapUv:w&&v(S.roughnessMap.channel),anisotropyMapUv:dt&&v(S.anisotropyMap.channel),clearcoatMapUv:_t&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:It&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:yt&&v(S.sheenRoughnessMap.channel),specularMapUv:Kt&&v(S.specularMap.channel),specularColorMapUv:Xt&&v(S.specularColorMap.channel),specularIntensityMapUv:ue&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:ut&&v(S.thicknessMap.channel),alphaMapUv:et&&v(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(qt||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(Bt||et),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:bt,skinning:k.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:Ct,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:Bt&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===oe,decodeVideoTextureEmissive:Yt&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===oe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===on,flipSided:S.side===Fe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Vt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&S.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function h(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)x.push(C),x.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(T(x,S),M(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function T(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function M(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function b(S){const x=g[S.type];let C;if(x){const B=rn[x];C=Od.clone(B.uniforms)}else C=S.uniforms;return C}function D(S,x){let C;for(let B=0,k=d.length;B<k;B++){const q=d[B];if(q.cacheKey===x){C=q,++C.usedTimes;break}}return C===void 0&&(C=new jp(i,x,S,a),d.push(C)),C}function A(S){if(--S.usedTimes===0){const x=d.indexOf(S);d[x]=d[d.length-1],d.pop(),S.destroy()}}function R(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:b,acquireProgram:D,releaseProgram:A,releaseShaderCache:R,programs:d,dispose:L}}function nm(){let i=new WeakMap;function t(r){return i.has(r)}function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function n(r){i.delete(r)}function s(r,o,l){i.get(r)[o]=l}function a(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:a}}function im(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function cl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dl(){const i=[];let t=0;const e=[],n=[],s=[];function a(){t=0,e.length=0,n.length=0,s.length=0}function r(u,f,p,g,v,m){let h=i[t];return h===void 0?(h={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=h):(h.id=u.id,h.object=u,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=v,h.group=m),t++,h}function o(u,f,p,g,v,m){const h=r(u,f,p,g,v,m);p.transmission>0?n.push(h):p.transparent===!0?s.push(h):e.push(h)}function l(u,f,p,g,v,m){const h=r(u,f,p,g,v,m);p.transmission>0?n.unshift(h):p.transparent===!0?s.unshift(h):e.unshift(h)}function c(u,f){e.length>1&&e.sort(u||im),n.length>1&&n.sort(f||cl),s.length>1&&s.sort(f||cl)}function d(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:a,push:o,unshift:l,finish:d,sort:c}}function sm(){let i=new WeakMap;function t(n,s){const a=i.get(n);let r;return a===void 0?(r=new dl,i.set(n,[r])):s>=a.length?(r=new dl,a.push(r)):r=a[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function am(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new E,color:new zt};break;case"SpotLight":e={position:new E,direction:new E,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new E,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new E,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new E,halfWidth:new E,halfHeight:new E};break}return i[t.id]=e,e}}}function rm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let om=0;function lm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cm(i){const t=new am,e=rm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const s=new E,a=new he,r=new he;function o(c){let d=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,v=0,m=0,h=0,T=0,M=0,b=0,D=0,A=0,R=0;c.sort(lm);for(let S=0,x=c.length;S<x;S++){const C=c[S],B=C.color,k=C.intensity,q=C.distance,Y=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=B.r*k,u+=B.g*k,f+=B.b*k;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],k);R++}else if(C.isDirectionalLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=C.shadow.matrix,T++}n.directional[p]=H,p++}else if(C.isSpotLight){const H=t.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(B).multiplyScalar(k),H.distance=q,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[v]=H;const Q=C.shadow;if(C.map&&(n.spotLightMap[D]=C.map,D++,Q.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[v]=Q.matrix,C.castShadow){const W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=Y,b++}v++}else if(C.isRectAreaLight){const H=t.get(C);H.color.copy(B).multiplyScalar(k),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=H,m++}else if(C.isPointLight){const H=t.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const Q=C.shadow,W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=t.get(C);H.skyColor.copy(C.color).multiplyScalar(k),H.groundColor.copy(C.groundColor).multiplyScalar(k),n.hemi[h]=H,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==h||L.numDirectionalShadows!==T||L.numPointShadows!==M||L.numSpotShadows!==b||L.numSpotMaps!==D||L.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=b+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,L.directionalLength=p,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=h,L.numDirectionalShadows=T,L.numPointShadows=M,L.numSpotShadows=b,L.numSpotMaps=D,L.numLightProbes=R,n.version=om++)}function l(c,d){let u=0,f=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let h=0,T=c.length;h<T;h++){const M=c[h];if(M.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),u++}else if(M.isSpotLight){const b=n.spot[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),r.identity(),a.copy(M.matrixWorld),a.premultiply(m),r.extractRotation(a),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(r),b.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const b=n.hemi[v];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function hl(i){const t=new cm(i),e=[],n=[];function s(d){c.camera=d,e.length=0,n.length=0}function a(d){e.push(d)}function r(d){n.push(d)}function o(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function dm(i){let t=new WeakMap;function e(s,a=0){const r=t.get(s);let o;return r===void 0?(o=new hl(i),t.set(s,[o])):a>=r.length?(o=new hl(i),r.push(o)):o=r[a],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class hm extends li{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class um extends li{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mm(i,t,e){let n=new Jr;const s=new gt,a=new gt,r=new de,o=new hm({depthPacking:rd}),l=new um,c={},d=e.maxTextureSize,u={[An]:Fe,[Fe]:An,[on]:on},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:fm,fragmentShader:pm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Oe;g.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new K(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Il;let h=this.type;this.render=function(A,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(zn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=h!==xn&&this.type===xn,q=h===xn&&this.type!==xn;for(let Y=0,H=A.length;Y<H;Y++){const Q=A[Y],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const it=W.getFrameExtents();if(s.multiply(it),a.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/it.x),s.x=a.x*it.x,W.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/it.y),s.y=a.y*it.y,W.mapSize.y=a.y)),W.map===null||k===!0||q===!0){const ot=this.type!==xn?{minFilter:nn,magFilter:nn}:{};W.map!==null&&W.map.dispose(),W.map=new ai(s.x,s.y,ot),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const nt=W.getViewportCount();for(let ot=0;ot<nt;ot++){const Ct=W.getViewport(ot);r.set(a.x*Ct.x,a.y*Ct.y,a.x*Ct.z,a.y*Ct.w),B.viewport(r),W.updateMatrices(Q,ot),n=W.getFrustum(),b(R,L,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===xn&&T(W,L),W.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(S,x,C)};function T(A,R){const L=t.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ai(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,L,f,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,L,p,v,null)}function M(A,R,L,S){let x=null;const C=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)x=C;else if(x=L.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const B=x.uuid,k=R.uuid;let q=c[B];q===void 0&&(q={},c[B]=q);let Y=q[k];Y===void 0&&(Y=x.clone(),q[k]=Y,R.addEventListener("dispose",D)),x=Y}if(x.visible=R.visible,x.wireframe=R.wireframe,S===xn?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:u[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=i.properties.get(x);B.light=L}return x}function b(A,R,L,S,x){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===xn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const k=t.update(A),q=A.material;if(Array.isArray(q)){const Y=k.groups;for(let H=0,Q=Y.length;H<Q;H++){const W=Y[H],it=q[W.materialIndex];if(it&&it.visible){const nt=M(A,it,S,x);A.onBeforeShadow(i,A,R,L,k,nt,W),i.renderBufferDirect(L,null,k,nt,A,W),A.onAfterShadow(i,A,R,L,k,nt,W)}}}else if(q.visible){const Y=M(A,q,S,x);A.onBeforeShadow(i,A,R,L,k,Y,null),i.renderBufferDirect(L,null,k,Y,A,null),A.onAfterShadow(i,A,R,L,k,Y,null)}}const B=A.children;for(let k=0,q=B.length;k<q;k++)b(B[k],R,L,S,x)}function D(A){A.target.removeEventListener("dispose",D);for(const L in c){const S=c[L],x=A.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const gm={[tr]:er,[nr]:ar,[ir]:rr,[Oi]:sr,[er]:tr,[ar]:nr,[rr]:ir,[sr]:Oi};function vm(i,t){function e(){let U=!1;const ut=new de;let $=null;const et=new de(0,0,0,0);return{setMask:function(vt){$!==vt&&!U&&(i.colorMask(vt,vt,vt,vt),$=vt)},setLocked:function(vt){U=vt},setClear:function(vt,pt,Vt,_e,we){we===!0&&(vt*=_e,pt*=_e,Vt*=_e),ut.set(vt,pt,Vt,_e),et.equals(ut)===!1&&(i.clearColor(vt,pt,Vt,_e),et.copy(ut))},reset:function(){U=!1,$=null,et.set(-1,0,0,0)}}}function n(){let U=!1,ut=!1,$=null,et=null,vt=null;return{setReversed:function(pt){if(ut!==pt){const Vt=t.get("EXT_clip_control");ut?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const _e=vt;vt=null,this.setClear(_e)}ut=pt},getReversed:function(){return ut},setTest:function(pt){pt?rt(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(pt){$!==pt&&!U&&(i.depthMask(pt),$=pt)},setFunc:function(pt){if(ut&&(pt=gm[pt]),et!==pt){switch(pt){case tr:i.depthFunc(i.NEVER);break;case er:i.depthFunc(i.ALWAYS);break;case nr:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case ir:i.depthFunc(i.EQUAL);break;case sr:i.depthFunc(i.GEQUAL);break;case ar:i.depthFunc(i.GREATER);break;case rr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}et=pt}},setLocked:function(pt){U=pt},setClear:function(pt){vt!==pt&&(ut&&(pt=1-pt),i.clearDepth(pt),vt=pt)},reset:function(){U=!1,$=null,et=null,vt=null,ut=!1}}}function s(){let U=!1,ut=null,$=null,et=null,vt=null,pt=null,Vt=null,_e=null,we=null;return{setTest:function(re){U||(re?rt(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(re){ut!==re&&!U&&(i.stencilMask(re),ut=re)},setFunc:function(re,$e,un){($!==re||et!==$e||vt!==un)&&(i.stencilFunc(re,$e,un),$=re,et=$e,vt=un)},setOp:function(re,$e,un){(pt!==re||Vt!==$e||_e!==un)&&(i.stencilOp(re,$e,un),pt=re,Vt=$e,_e=un)},setLocked:function(re){U=re},setClear:function(re){we!==re&&(i.clearStencil(re),we=re)},reset:function(){U=!1,ut=null,$=null,et=null,vt=null,pt=null,Vt=null,_e=null,we=null}}}const a=new e,r=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,h=null,T=null,M=null,b=null,D=null,A=null,R=new zt(0,0,0),L=0,S=!1,x=null,C=null,B=null,k=null,q=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Q=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=Q>=2);let it=null,nt={};const ot=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Wt=new de().fromArray(ot),X=new de().fromArray(Ct);function tt(U,ut,$,et){const vt=new Uint8Array(4),pt=i.createTexture();i.bindTexture(U,pt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<$;Vt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,et,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ut+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return pt}const ht={};ht[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),ht[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ht[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),rt(i.DEPTH_TEST),r.setFunc(Oi),kt(!1),qt(vo),rt(i.CULL_FACE),P(zn);function rt(U){d[U]!==!0&&(i.enable(U),d[U]=!0)}function bt(U){d[U]!==!1&&(i.disable(U),d[U]=!1)}function At(U,ut){return u[U]!==ut?(i.bindFramebuffer(U,ut),u[U]=ut,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ut),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function Ut(U,ut){let $=p,et=!1;if(U){$=f.get(ut),$===void 0&&($=[],f.set(ut,$));const vt=U.textures;if($.length!==vt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,Vt=vt.length;pt<Vt;pt++)$[pt]=i.COLOR_ATTACHMENT0+pt;$.length=vt.length,et=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,et=!0);et&&i.drawBuffers($)}function Bt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const Nt={[ti]:i.FUNC_ADD,[Ic]:i.FUNC_SUBTRACT,[Uc]:i.FUNC_REVERSE_SUBTRACT};Nt[Nc]=i.MIN,Nt[Fc]=i.MAX;const jt={[Oc]:i.ZERO,[Bc]:i.ONE,[kc]:i.SRC_COLOR,[Ja]:i.SRC_ALPHA,[Xc]:i.SRC_ALPHA_SATURATE,[Gc]:i.DST_COLOR,[Vc]:i.DST_ALPHA,[zc]:i.ONE_MINUS_SRC_COLOR,[Qa]:i.ONE_MINUS_SRC_ALPHA,[Wc]:i.ONE_MINUS_DST_COLOR,[Hc]:i.ONE_MINUS_DST_ALPHA,[$c]:i.CONSTANT_COLOR,[qc]:i.ONE_MINUS_CONSTANT_COLOR,[Yc]:i.CONSTANT_ALPHA,[Zc]:i.ONE_MINUS_CONSTANT_ALPHA};function P(U,ut,$,et,vt,pt,Vt,_e,we,re){if(U===zn){v===!0&&(bt(i.BLEND),v=!1);return}if(v===!1&&(rt(i.BLEND),v=!0),U!==Dc){if(U!==m||re!==S){if((h!==ti||b!==ti)&&(i.blendEquation(i.FUNC_ADD),h=ti,b=ti),re)switch(U){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFunc(i.ONE,i.ONE);break;case _o:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case _o:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,M=null,D=null,A=null,R.set(0,0,0),L=0,m=U,S=re}return}vt=vt||ut,pt=pt||$,Vt=Vt||et,(ut!==h||vt!==b)&&(i.blendEquationSeparate(Nt[ut],Nt[vt]),h=ut,b=vt),($!==T||et!==M||pt!==D||Vt!==A)&&(i.blendFuncSeparate(jt[$],jt[et],jt[pt],jt[Vt]),T=$,M=et,D=pt,A=Vt),(_e.equals(R)===!1||we!==L)&&(i.blendColor(_e.r,_e.g,_e.b,we),R.copy(_e),L=we),m=U,S=!1}function Zt(U,ut){U.side===on?bt(i.CULL_FACE):rt(i.CULL_FACE);let $=U.side===Fe;ut&&($=!$),kt($),U.blending===Ui&&U.transparent===!1?P(zn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),a.setMask(U.colorWrite);const et=U.stencilWrite;o.setTest(et),et&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Yt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function kt(U){x!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),x=U)}function qt(U){U!==Pc?(rt(i.CULL_FACE),U!==C&&(U===vo?i.cullFace(i.BACK):U===Lc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),C=U}function Rt(U){U!==B&&(H&&i.lineWidth(U),B=U)}function Yt(U,ut,$){U?(rt(i.POLYGON_OFFSET_FILL),(k!==ut||q!==$)&&(i.polygonOffset(ut,$),k=ut,q=$)):bt(i.POLYGON_OFFSET_FILL)}function Pt(U){U?rt(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function w(U){U===void 0&&(U=i.TEXTURE0+Y-1),it!==U&&(i.activeTexture(U),it=U)}function _(U,ut,$){$===void 0&&(it===null?$=i.TEXTURE0+Y-1:$=it);let et=nt[$];et===void 0&&(et={type:void 0,texture:void 0},nt[$]=et),(et.type!==U||et.texture!==ut)&&(it!==$&&(i.activeTexture($),it=$),i.bindTexture(U,ut||ht[U]),et.type=U,et.texture=ut)}function F(){const U=nt[it];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function G(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Jt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){Wt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Wt.copy(U))}function yt(U){X.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),X.copy(U))}function Kt(U,ut){let $=c.get(ut);$===void 0&&($=new WeakMap,c.set(ut,$));let et=$.get(U);et===void 0&&(et=i.getUniformBlockIndex(ut,U.name),$.set(U,et))}function Xt(U,ut){const et=c.get(ut).get(U);l.get(ut)!==et&&(i.uniformBlockBinding(ut,et,U.__bindingPointIndex),l.set(ut,et))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},it=null,nt={},u={},f=new WeakMap,p=[],g=null,v=!1,m=null,h=null,T=null,M=null,b=null,D=null,A=null,R=new zt(0,0,0),L=0,S=!1,x=null,C=null,B=null,k=null,q=null,Wt.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:rt,disable:bt,bindFramebuffer:At,drawBuffers:Ut,useProgram:Bt,setBlending:P,setMaterial:Zt,setFlipSided:kt,setCullFace:qt,setLineWidth:Rt,setPolygonOffset:Yt,setScissorTest:Pt,activeTexture:w,bindTexture:_,unbindTexture:F,compressedTexImage2D:G,compressedTexImage3D:j,texImage2D:xt,texImage3D:It,updateUBOMapping:Kt,uniformBlockBinding:Xt,texStorage2D:Jt,texStorage3D:st,texSubImage2D:Z,texSubImage3D:St,compressedTexSubImage2D:dt,compressedTexSubImage3D:_t,scissor:Ft,viewport:yt,reset:ue}}function ul(i,t,e,n){const s=_m(n);switch(e){case Vl:return i*t;case Gl:return i*t;case Wl:return i*t*2;case Xl:return i*t/s.components*s.byteLength;case Yr:return i*t/s.components*s.byteLength;case $l:return i*t*2/s.components*s.byteLength;case Zr:return i*t*2/s.components*s.byteLength;case Hl:return i*t*3/s.components*s.byteLength;case tn:return i*t*4/s.components*s.byteLength;case Kr:return i*t*4/s.components*s.byteLength;case Xs:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ur:case pr:return Math.max(i,16)*Math.max(t,8)/4;case hr:case fr:return Math.max(i,8)*Math.max(t,8)/2;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xr:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case yr:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case br:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Sr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Mr:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Er:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Tr:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case wr:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ar:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Cr:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Rr:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Pr:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Lr:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Zs:case Dr:case Ir:return Math.ceil(i/4)*Math.ceil(t/4)*16;case ql:case Ur:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Nr:case Fr:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _m(i){switch(i){case Cn:case Bl:return{byteLength:1,components:1};case ds:case kl:case hs:return{byteLength:2,components:1};case $r:case qr:return{byteLength:2,components:4};case si:case Xr:case Sn:return{byteLength:4,components:1};case zl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function xm(i,t,e,n,s,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,d=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return p?new OffscreenCanvas(w,_):ta("canvas")}function v(w,_,F){let G=1;const j=Pt(w);if((j.width>F||j.height>F)&&(G=F/Math.max(j.width,j.height)),G<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Z=Math.floor(G*j.width),St=Math.floor(G*j.height);u===void 0&&(u=g(Z,St));const dt=_?g(Z,St):u;return dt.width=Z,dt.height=St,dt.getContext("2d").drawImage(w,0,0,Z,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+St+")."),dt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function m(w){return w.generateMipmaps}function h(w){i.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(w,_,F,G,j=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Z=_;if(_===i.RED&&(F===i.FLOAT&&(Z=i.R32F),F===i.HALF_FLOAT&&(Z=i.R16F),F===i.UNSIGNED_BYTE&&(Z=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Z=i.R8UI),F===i.UNSIGNED_SHORT&&(Z=i.R16UI),F===i.UNSIGNED_INT&&(Z=i.R32UI),F===i.BYTE&&(Z=i.R8I),F===i.SHORT&&(Z=i.R16I),F===i.INT&&(Z=i.R32I)),_===i.RG&&(F===i.FLOAT&&(Z=i.RG32F),F===i.HALF_FLOAT&&(Z=i.RG16F),F===i.UNSIGNED_BYTE&&(Z=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(Z=i.RG8UI),F===i.UNSIGNED_SHORT&&(Z=i.RG16UI),F===i.UNSIGNED_INT&&(Z=i.RG32UI),F===i.BYTE&&(Z=i.RG8I),F===i.SHORT&&(Z=i.RG16I),F===i.INT&&(Z=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),F===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),F===i.UNSIGNED_INT&&(Z=i.RGB32UI),F===i.BYTE&&(Z=i.RGB8I),F===i.SHORT&&(Z=i.RGB16I),F===i.INT&&(Z=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),F===i.UNSIGNED_INT&&(Z=i.RGBA32UI),F===i.BYTE&&(Z=i.RGBA8I),F===i.SHORT&&(Z=i.RGBA16I),F===i.INT&&(Z=i.RGBA32I)),_===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),_===i.RGBA){const St=j?aa:Qt.getTransfer(G);F===i.FLOAT&&(Z=i.RGBA32F),F===i.HALF_FLOAT&&(Z=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Z=St===oe?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function b(w,_){let F;return w?_===null||_===si||_===zi?F=i.DEPTH24_STENCIL8:_===Sn?F=i.DEPTH32F_STENCIL8:_===ds&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===si||_===zi?F=i.DEPTH_COMPONENT24:_===Sn?F=i.DEPTH_COMPONENT32F:_===ds&&(F=i.DEPTH_COMPONENT16),F}function D(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==nn&&w.minFilter!==cn?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function A(w){const _=w.target;_.removeEventListener("dispose",A),L(_),_.isVideoTexture&&d.delete(_)}function R(w){const _=w.target;_.removeEventListener("dispose",R),x(_)}function L(w){const _=n.get(w);if(_.__webglInit===void 0)return;const F=w.source,G=f.get(F);if(G){const j=G[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(w),Object.keys(G).length===0&&f.delete(F)}n.remove(w)}function S(w){const _=n.get(w);i.deleteTexture(_.__webglTexture);const F=w.source,G=f.get(F);delete G[_.__cacheKey],r.memory.textures--}function x(w){const _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let j=0;j<_.__webglFramebuffer[G].length;j++)i.deleteFramebuffer(_.__webglFramebuffer[G][j]);else i.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)i.deleteFramebuffer(_.__webglFramebuffer[G]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=w.textures;for(let G=0,j=F.length;G<j;G++){const Z=n.get(F[G]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),r.memory.textures--),n.remove(F[G])}n.remove(w)}let C=0;function B(){C=0}function k(){const w=C;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),C+=1,w}function q(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function Y(w,_){const F=n.get(w);if(w.isVideoTexture&&Rt(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const G=w.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(F,w,_);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function H(w,_){const F=n.get(w);if(w.version>0&&F.__version!==w.version){X(F,w,_);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function Q(w,_){const F=n.get(w);if(w.version>0&&F.__version!==w.version){X(F,w,_);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function W(w,_){const F=n.get(w);if(w.version>0&&F.__version!==w.version){tt(F,w,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const it={[cr]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[dr]:i.MIRRORED_REPEAT},nt={[nn]:i.NEAREST,[sd]:i.NEAREST_MIPMAP_NEAREST,[ms]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[ha]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ot={[ld]:i.NEVER,[pd]:i.ALWAYS,[cd]:i.LESS,[Zl]:i.LEQUAL,[dd]:i.EQUAL,[fd]:i.GEQUAL,[hd]:i.GREATER,[ud]:i.NOTEQUAL};function Ct(w,_){if(_.type===Sn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===cn||_.magFilter===ha||_.magFilter===ms||_.magFilter===ii||_.minFilter===cn||_.minFilter===ha||_.minFilter===ms||_.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,it[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,it[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,it[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,nt[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,nt[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ot[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===nn||_.minFilter!==ms&&_.minFilter!==ii||_.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Wt(w,_){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",A));const G=_.source;let j=f.get(G);j===void 0&&(j={},f.set(G,j));const Z=q(_);if(Z!==w.__cacheKey){j[Z]===void 0&&(j[Z]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,F=!0),j[Z].usedTimes++;const St=j[w.__cacheKey];St!==void 0&&(j[w.__cacheKey].usedTimes--,St.usedTimes===0&&S(_)),w.__cacheKey=Z,w.__webglTexture=j[Z].texture}return F}function X(w,_,F){let G=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=i.TEXTURE_3D);const j=Wt(w,_),Z=_.source;e.bindTexture(G,w.__webglTexture,i.TEXTURE0+F);const St=n.get(Z);if(Z.version!==St.__version||j===!0){e.activeTexture(i.TEXTURE0+F);const dt=Qt.getPrimaries(Qt.workingColorSpace),_t=_.colorSpace===kn?null:Qt.getPrimaries(_.colorSpace),Jt=_.colorSpace===kn||dt===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let st=v(_.image,!1,s.maxTextureSize);st=Yt(_,st);const xt=a.convert(_.format,_.colorSpace),It=a.convert(_.type);let Ft=M(_.internalFormat,xt,It,_.colorSpace,_.isVideoTexture);Ct(G,_);let yt;const Kt=_.mipmaps,Xt=_.isVideoTexture!==!0,ue=St.__version===void 0||j===!0,U=Z.dataReady,ut=D(_,st);if(_.isDepthTexture)Ft=b(_.format===Vi,_.type),ue&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Ft,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Ft,st.width,st.height,0,xt,It,null));else if(_.isDataTexture)if(Kt.length>0){Xt&&ue&&e.texStorage2D(i.TEXTURE_2D,ut,Ft,Kt[0].width,Kt[0].height);for(let $=0,et=Kt.length;$<et;$++)yt=Kt[$],Xt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,It,yt.data):e.texImage2D(i.TEXTURE_2D,$,Ft,yt.width,yt.height,0,xt,It,yt.data);_.generateMipmaps=!1}else Xt?(ue&&e.texStorage2D(i.TEXTURE_2D,ut,Ft,st.width,st.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,xt,It,st.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,st.width,st.height,0,xt,It,st.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xt&&ue&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,Ft,Kt[0].width,Kt[0].height,st.depth);for(let $=0,et=Kt.length;$<et;$++)if(yt=Kt[$],_.format!==tn)if(xt!==null)if(Xt){if(U)if(_.layerUpdates.size>0){const vt=ul(yt.width,yt.height,_.format,_.type);for(const pt of _.layerUpdates){const Vt=yt.data.subarray(pt*vt/yt.data.BYTES_PER_ELEMENT,(pt+1)*vt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,pt,yt.width,yt.height,1,xt,Vt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,st.depth,xt,yt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Ft,yt.width,yt.height,st.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,st.depth,xt,It,yt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,Ft,yt.width,yt.height,st.depth,0,xt,It,yt.data)}else{Xt&&ue&&e.texStorage2D(i.TEXTURE_2D,ut,Ft,Kt[0].width,Kt[0].height);for(let $=0,et=Kt.length;$<et;$++)yt=Kt[$],_.format!==tn?xt!==null?Xt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(i.TEXTURE_2D,$,Ft,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,It,yt.data):e.texImage2D(i.TEXTURE_2D,$,Ft,yt.width,yt.height,0,xt,It,yt.data)}else if(_.isDataArrayTexture)if(Xt){if(ue&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,Ft,st.width,st.height,st.depth),U)if(_.layerUpdates.size>0){const $=ul(st.width,st.height,_.format,_.type);for(const et of _.layerUpdates){const vt=st.data.subarray(et*$/st.data.BYTES_PER_ELEMENT,(et+1)*$/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,st.width,st.height,1,xt,It,vt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,xt,It,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,st.width,st.height,st.depth,0,xt,It,st.data);else if(_.isData3DTexture)Xt?(ue&&e.texStorage3D(i.TEXTURE_3D,ut,Ft,st.width,st.height,st.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,xt,It,st.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,st.width,st.height,st.depth,0,xt,It,st.data);else if(_.isFramebufferTexture){if(ue)if(Xt)e.texStorage2D(i.TEXTURE_2D,ut,Ft,st.width,st.height);else{let $=st.width,et=st.height;for(let vt=0;vt<ut;vt++)e.texImage2D(i.TEXTURE_2D,vt,Ft,$,et,0,xt,It,null),$>>=1,et>>=1}}else if(Kt.length>0){if(Xt&&ue){const $=Pt(Kt[0]);e.texStorage2D(i.TEXTURE_2D,ut,Ft,$.width,$.height)}for(let $=0,et=Kt.length;$<et;$++)yt=Kt[$],Xt?U&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,xt,It,yt):e.texImage2D(i.TEXTURE_2D,$,Ft,xt,It,yt);_.generateMipmaps=!1}else if(Xt){if(ue){const $=Pt(st);e.texStorage2D(i.TEXTURE_2D,ut,Ft,$.width,$.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,It,st)}else e.texImage2D(i.TEXTURE_2D,0,Ft,xt,It,st);m(_)&&h(G),St.__version=Z.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function tt(w,_,F){if(_.image.length!==6)return;const G=Wt(w,_),j=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const Z=n.get(j);if(j.version!==Z.__version||G===!0){e.activeTexture(i.TEXTURE0+F);const St=Qt.getPrimaries(Qt.workingColorSpace),dt=_.colorSpace===kn?null:Qt.getPrimaries(_.colorSpace),_t=_.colorSpace===kn||St===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Jt=_.isCompressedTexture||_.image[0].isCompressedTexture,st=_.image[0]&&_.image[0].isDataTexture,xt=[];for(let et=0;et<6;et++)!Jt&&!st?xt[et]=v(_.image[et],!0,s.maxCubemapSize):xt[et]=st?_.image[et].image:_.image[et],xt[et]=Yt(_,xt[et]);const It=xt[0],Ft=a.convert(_.format,_.colorSpace),yt=a.convert(_.type),Kt=M(_.internalFormat,Ft,yt,_.colorSpace),Xt=_.isVideoTexture!==!0,ue=Z.__version===void 0||G===!0,U=j.dataReady;let ut=D(_,It);Ct(i.TEXTURE_CUBE_MAP,_);let $;if(Jt){Xt&&ue&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Kt,It.width,It.height);for(let et=0;et<6;et++){$=xt[et].mipmaps;for(let vt=0;vt<$.length;vt++){const pt=$[vt];_.format!==tn?Ft!==null?Xt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,0,0,pt.width,pt.height,Ft,pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,Kt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,0,0,pt.width,pt.height,Ft,yt,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt,Kt,pt.width,pt.height,0,Ft,yt,pt.data)}}}else{if($=_.mipmaps,Xt&&ue){$.length>0&&ut++;const et=Pt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,Kt,et.width,et.height)}for(let et=0;et<6;et++)if(st){Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,xt[et].width,xt[et].height,Ft,yt,xt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Kt,xt[et].width,xt[et].height,0,Ft,yt,xt[et].data);for(let vt=0;vt<$.length;vt++){const Vt=$[vt].image[et].image;Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,0,0,Vt.width,Vt.height,Ft,yt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,Kt,Vt.width,Vt.height,0,Ft,yt,Vt.data)}}else{Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Ft,yt,xt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Kt,Ft,yt,xt[et]);for(let vt=0;vt<$.length;vt++){const pt=$[vt];Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,0,0,Ft,yt,pt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,vt+1,Kt,Ft,yt,pt.image[et])}}}m(_)&&h(i.TEXTURE_CUBE_MAP),Z.__version=j.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ht(w,_,F,G,j,Z){const St=a.convert(F.format,F.colorSpace),dt=a.convert(F.type),_t=M(F.internalFormat,St,dt,F.colorSpace),Jt=n.get(_),st=n.get(F);if(st.__renderTarget=_,!Jt.__hasExternalTextures){const xt=Math.max(1,_.width>>Z),It=Math.max(1,_.height>>Z);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,_t,xt,It,_.depth,0,St,dt,null):e.texImage2D(j,Z,_t,xt,It,0,St,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),qt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,j,st.__webglTexture,0,kt(_)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,j,st.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(w,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){const G=_.depthTexture,j=G&&G.isDepthTexture?G.type:null,Z=b(_.stencilBuffer,j),St=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=kt(_);qt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,Z,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,Z,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Z,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,w)}else{const G=_.textures;for(let j=0;j<G.length;j++){const Z=G[j],St=a.convert(Z.format,Z.colorSpace),dt=a.convert(Z.type),_t=M(Z.internalFormat,St,dt,Z.colorSpace),Jt=kt(_);F&&qt(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Jt,_t,_.width,_.height):qt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Jt,_t,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,_t,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=n.get(_.depthTexture);G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);const j=G.__webglTexture,Z=kt(_);if(_.depthTexture.format===Ni)qt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(_.depthTexture.format===Vi)qt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function At(w){const _=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const G=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",j)};G.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=G}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");bt(_.__webglFramebuffer,w)}else if(F){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=i.createRenderbuffer(),rt(_.__webglDepthbuffer[G],w,!1);else{const j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=_.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),rt(_.__webglDepthbuffer,w,!1);else{const G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,j)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(w,_,F){const G=n.get(w);_!==void 0&&ht(G.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&At(w)}function Bt(w){const _=w.texture,F=n.get(w),G=n.get(_);w.addEventListener("dispose",R);const j=w.textures,Z=w.isWebGLCubeRenderTarget===!0,St=j.length>1;if(St||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=_.version,r.memory.textures++),Z){F.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[dt]=[];for(let _t=0;_t<_.mipmaps.length;_t++)F.__webglFramebuffer[dt][_t]=i.createFramebuffer()}else F.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let dt=0;dt<_.mipmaps.length;dt++)F.__webglFramebuffer[dt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(St)for(let dt=0,_t=j.length;dt<_t;dt++){const Jt=n.get(j[dt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=i.createTexture(),r.memory.textures++)}if(w.samples>0&&qt(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let dt=0;dt<j.length;dt++){const _t=j[dt];F.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[dt]);const Jt=a.convert(_t.format,_t.colorSpace),st=a.convert(_t.type),xt=M(_t.internalFormat,Jt,st,_t.colorSpace,w.isXRRenderTarget===!0),It=kt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,xt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,F.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,_);for(let dt=0;dt<6;dt++)if(_.mipmaps&&_.mipmaps.length>0)for(let _t=0;_t<_.mipmaps.length;_t++)ht(F.__webglFramebuffer[dt][_t],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,_t);else ht(F.__webglFramebuffer[dt],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);m(_)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let dt=0,_t=j.length;dt<_t;dt++){const Jt=j[dt],st=n.get(Jt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),Ct(i.TEXTURE_2D,Jt),ht(F.__webglFramebuffer,w,Jt,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,0),m(Jt)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(dt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,G.__webglTexture),Ct(dt,_),_.mipmaps&&_.mipmaps.length>0)for(let _t=0;_t<_.mipmaps.length;_t++)ht(F.__webglFramebuffer[_t],w,_,i.COLOR_ATTACHMENT0,dt,_t);else ht(F.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,dt,0);m(_)&&h(dt),e.unbindTexture()}w.depthBuffer&&At(w)}function Nt(w){const _=w.textures;for(let F=0,G=_.length;F<G;F++){const j=_[F];if(m(j)){const Z=T(w),St=n.get(j).__webglTexture;e.bindTexture(Z,St),h(Z),e.unbindTexture()}}}const jt=[],P=[];function Zt(w){if(w.samples>0){if(qt(w)===!1){const _=w.textures,F=w.width,G=w.height;let j=i.COLOR_BUFFER_BIT;const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(w),dt=_.length>1;if(dt)for(let _t=0;_t<_.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let _t=0;_t<_.length;_t++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[_t]);const Jt=n.get(_[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Jt,0)}i.blitFramebuffer(0,0,F,G,0,0,F,G,j,i.NEAREST),l===!0&&(jt.length=0,P.length=0,jt.push(i.COLOR_ATTACHMENT0+_t),w.depthBuffer&&w.resolveDepthBuffer===!1&&(jt.push(Z),P.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let _t=0;_t<_.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,St.__webglColorRenderbuffer[_t]);const Jt=n.get(_[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,Jt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function kt(w){return Math.min(s.maxSamples,w.samples)}function qt(w){const _=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Rt(w){const _=r.render.frame;d.get(w)!==_&&(d.set(w,_),w.update())}function Yt(w,_){const F=w.colorSpace,G=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Xi&&F!==kn&&(Qt.getTransfer(F)===oe?(G!==tn||j!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Pt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=H,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=Ut,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=Nt,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=qt}function ym(i,t){function e(n,s=kn){let a;const r=Qt.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===$r)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===zl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bl)return i.BYTE;if(n===kl)return i.SHORT;if(n===ds)return i.UNSIGNED_SHORT;if(n===Xr)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===hs)return i.HALF_FLOAT;if(n===Vl)return i.ALPHA;if(n===Hl)return i.RGB;if(n===tn)return i.RGBA;if(n===Gl)return i.LUMINANCE;if(n===Wl)return i.LUMINANCE_ALPHA;if(n===Ni)return i.DEPTH_COMPONENT;if(n===Vi)return i.DEPTH_STENCIL;if(n===Xl)return i.RED;if(n===Yr)return i.RED_INTEGER;if(n===$l)return i.RG;if(n===Zr)return i.RG_INTEGER;if(n===Kr)return i.RGBA_INTEGER;if(n===Xs||n===$s||n===qs||n===Ys)if(r===oe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Xs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$s)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Xs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$s)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hr||n===ur||n===fr||n===pr)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===hr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ur)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fr)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pr)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mr||n===gr||n===vr)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===mr||n===gr)return r===oe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===vr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_r||n===xr||n===yr||n===br||n===Sr||n===Mr||n===Er||n===Tr||n===wr||n===Ar||n===Cr||n===Rr||n===Pr||n===Lr)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===_r)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===br)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Er)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ar)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lr)return r===oe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zs||n===Dr||n===Ir)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===Zs)return r===oe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ir)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ql||n===Ur||n===Nr||n===Fr)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===Zs)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Ur)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class bm extends Ve{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ie extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sm={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ie,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ie,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ie,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),h=this._getHandJoint(c,v);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ie;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Mm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Em=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ie,a=t.properties.get(s);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Gn({vertexShader:Mm,fragmentShader:Em,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new K(new Le(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wm extends oi{constructor(t,e){super();const n=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,p=null,g=null;const v=new Tm,m=e.getContextAttributes();let h=null,T=null;const M=[],b=[],D=new gt;let A=null;const R=new Ve;R.viewport=new de;const L=new Ve;L.viewport=new de;const S=[R,L],x=new bm;let C=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=M[X];return tt===void 0&&(tt=new ka,M[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=M[X];return tt===void 0&&(tt=new ka,M[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=M[X];return tt===void 0&&(tt=new ka,M[X]=tt),tt.getHandSpace()};function k(X){const tt=b.indexOf(X.inputSource);if(tt===-1)return;const ht=M[tt];ht!==void 0&&(ht.update(X.inputSource,X.frame,c||r),ht.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",Y);for(let X=0;X<M.length;X++){const tt=b[X];tt!==null&&(b[X]=null,M[X].disconnect(tt))}C=null,B=null,v.reset(),t.setRenderTarget(h),p=null,f=null,u=null,s=null,T=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",q),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new ai(p.framebufferWidth,p.framebufferHeight,{format:tn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,ht=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?Vi:Ni,ht=m.stencil?zi:si);const bt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:a};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new ai(f.textureWidth,f.textureHeight,{format:tn,type:Cn,depthTexture:new oc(f.textureWidth,f.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),Wt.setContext(s),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(X){for(let tt=0;tt<X.removed.length;tt++){const ht=X.removed[tt],rt=b.indexOf(ht);rt>=0&&(b[rt]=null,M[rt].disconnect(ht))}for(let tt=0;tt<X.added.length;tt++){const ht=X.added[tt];let rt=b.indexOf(ht);if(rt===-1){for(let At=0;At<M.length;At++)if(At>=b.length){b.push(ht),rt=At;break}else if(b[At]===null){b[At]=ht,rt=At;break}if(rt===-1)break}const bt=M[rt];bt&&bt.connect(ht)}}const H=new E,Q=new E;function W(X,tt,ht){H.setFromMatrixPosition(tt.matrixWorld),Q.setFromMatrixPosition(ht.matrixWorld);const rt=H.distanceTo(Q),bt=tt.projectionMatrix.elements,At=ht.projectionMatrix.elements,Ut=bt[14]/(bt[10]-1),Bt=bt[14]/(bt[10]+1),Nt=(bt[9]+1)/bt[5],jt=(bt[9]-1)/bt[5],P=(bt[8]-1)/bt[0],Zt=(At[8]+1)/At[0],kt=Ut*P,qt=Ut*Zt,Rt=rt/(-P+Zt),Yt=Rt*-P;if(tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Yt),X.translateZ(Rt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),bt[10]===-1)X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Pt=Ut+Rt,w=Bt+Rt,_=kt-Yt,F=qt+(rt-Yt),G=Nt*Bt/w*Pt,j=jt*Bt/w*Pt;X.projectionMatrix.makePerspective(_,F,G,j,Pt,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function it(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let tt=X.near,ht=X.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(ht=v.depthFar)),x.near=L.near=R.near=tt,x.far=L.far=R.far=ht,(C!==x.near||B!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,B=x.far),R.layers.mask=X.layers.mask|2,L.layers.mask=X.layers.mask|4,x.layers.mask=R.layers.mask|L.layers.mask;const rt=X.parent,bt=x.cameras;it(x,rt);for(let At=0;At<bt.length;At++)it(bt[At],rt);bt.length===2?W(x,R,L):x.projectionMatrix.copy(R.projectionMatrix),nt(X,x,rt)};function nt(X,tt,ht){ht===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(ht.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Br*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let ot=null;function Ct(X,tt){if(d=tt.getViewerPose(c||r),g=tt,d!==null){const ht=d.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let rt=!1;ht.length!==x.cameras.length&&(x.cameras.length=0,rt=!0);for(let At=0;At<ht.length;At++){const Ut=ht[At];let Bt=null;if(p!==null)Bt=p.getViewport(Ut);else{const jt=u.getViewSubImage(f,Ut);Bt=jt.viewport,At===0&&(t.setRenderTargetTextures(T,jt.colorTexture,f.ignoreDepthValues?void 0:jt.depthStencilTexture),t.setRenderTarget(T))}let Nt=S[At];Nt===void 0&&(Nt=new Ve,Nt.layers.enable(At),Nt.viewport=new de,S[At]=Nt),Nt.matrix.fromArray(Ut.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(Ut.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),At===0&&(x.matrix.copy(Nt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),rt===!0&&x.cameras.push(Nt)}const bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")){const At=u.getDepthInformation(ht[0]);At&&At.isValid&&At.texture&&v.init(t,At,s.renderState)}}for(let ht=0;ht<M.length;ht++){const rt=b[ht],bt=M[ht];rt!==null&&bt!==void 0&&bt.update(rt,tt,c||r)}ot&&ot(X,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Wt=new ac;Wt.setAnimationLoop(Ct),this.setAnimationLoop=function(X){ot=X},this.dispose=function(){}}}const Kn=new hn,Am=new he;function Cm(i,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,nc(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,T,M,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?a(m,h):h.isMeshToonMaterial?(a(m,h),u(m,h)):h.isMeshPhongMaterial?(a(m,h),d(m,h)):h.isMeshStandardMaterial?(a(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,b)):h.isMeshMatcapMaterial?(a(m,h),g(m,h)):h.isMeshDepthMaterial?a(m,h):h.isMeshDistanceMaterial?(a(m,h),v(m,h)):h.isMeshNormalMaterial?a(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,T,M):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Fe&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Fe&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const T=t.get(h),M=T.envMap,b=T.envMapRotation;M&&(m.envMap.value=M,Kn.copy(b),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),m.envMapRotation.value.setFromMatrix4(Am.makeRotationFromEuler(Kn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,T,M){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*T,m.scale.value=M*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function d(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function u(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,T){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Fe&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function v(m,h){const T=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rm(i,t,e,n){let s={},a={},r=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const b=M.program;n.uniformBlockBinding(T,b)}function c(T,M){let b=s[T.id];b===void 0&&(g(T),b=d(T),s[T.id]=b,T.addEventListener("dispose",m));const D=M.program;n.updateUBOMapping(T,D);const A=t.render.frame;a[T.id]!==A&&(f(T),a[T.id]=A)}function d(T){const M=u();T.__bindingPointIndex=M;const b=i.createBuffer(),D=T.__size,A=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,D,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function u(){for(let T=0;T<o;T++)if(r.indexOf(T)===-1)return r.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=s[T.id],b=T.uniforms,D=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,R=b.length;A<R;A++){const L=Array.isArray(b[A])?b[A]:[b[A]];for(let S=0,x=L.length;S<x;S++){const C=L[S];if(p(C,A,S,D)===!0){const B=C.__offset,k=Array.isArray(C.value)?C.value:[C.value];let q=0;for(let Y=0;Y<k.length;Y++){const H=k[Y],Q=v(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+q,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,q),q+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,M,b,D){const A=T.value,R=M+"_"+b;if(D[R]===void 0)return typeof A=="number"||typeof A=="boolean"?D[R]=A:D[R]=A.clone(),!0;{const L=D[R];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return D[R]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(T){const M=T.uniforms;let b=0;const D=16;for(let R=0,L=M.length;R<L;R++){const S=Array.isArray(M[R])?M[R]:[M[R]];for(let x=0,C=S.length;x<C;x++){const B=S[x],k=Array.isArray(B.value)?B.value:[B.value];for(let q=0,Y=k.length;q<Y;q++){const H=k[q],Q=v(H),W=b%D,it=W%Q.boundary,nt=W+it;b+=it,nt!==0&&D-nt<Q.storage&&(b+=D-nt),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=Q.storage}}}const A=b%D;return A>0&&(b+=D-A),T.__size=b,T.__cache={},this}function v(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const b=r.indexOf(M.__bindingPointIndex);r.splice(b,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function h(){for(const T in s)i.deleteBuffer(s[T]);r=[],s={},a={}}return{bind:l,update:c,dispose:h}}class Pm{constructor(t={}){const{canvas:e=vd(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,h=null;const T=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ge,this.toneMapping=Vn,this.toneMappingExposure=1;const b=this;let D=!1,A=0,R=0,L=null,S=-1,x=null;const C=new de,B=new de;let k=null;const q=new zt(0);let Y=0,H=e.width,Q=e.height,W=1,it=null,nt=null;const ot=new de(0,0,H,Q),Ct=new de(0,0,H,Q);let Wt=!1;const X=new Jr;let tt=!1,ht=!1;const rt=new he,bt=new he,At=new E,Ut=new de,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Nt=!1;function jt(){return L===null?W:1}let P=n;function Zt(y,N){return e.getContext(y,N)}try{const y={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wr}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){const N="webgl2";if(P=Zt(N,y),P===null)throw Zt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let kt,qt,Rt,Yt,Pt,w,_,F,G,j,Z,St,dt,_t,Jt,st,xt,It,Ft,yt,Kt,Xt,ue,U;function ut(){kt=new Nf(P),kt.init(),Xt=new ym(P,kt),qt=new Rf(P,kt,t,Xt),Rt=new vm(P,kt),qt.reverseDepthBuffer&&f&&Rt.buffers.depth.setReversed(!0),Yt=new Bf(P),Pt=new nm,w=new xm(P,kt,Rt,Pt,qt,Xt,Yt),_=new Lf(b),F=new Uf(b),G=new Wd(P),ue=new Af(P,G),j=new Ff(P,G,Yt,ue),Z=new zf(P,j,G,Yt),Ft=new kf(P,qt,w),st=new Pf(Pt),St=new em(b,_,F,kt,qt,ue,st),dt=new Cm(b,Pt),_t=new sm,Jt=new dm(kt),It=new wf(b,_,F,Rt,Z,p,l),xt=new mm(b,Z,qt),U=new Rm(P,Yt,qt,Rt),yt=new Cf(P,kt,Yt),Kt=new Of(P,kt,Yt),Yt.programs=St.programs,b.capabilities=qt,b.extensions=kt,b.properties=Pt,b.renderLists=_t,b.shadowMap=xt,b.state=Rt,b.info=Yt}ut();const $=new wm(b,P);this.xr=$,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const y=kt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=kt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(y){y!==void 0&&(W=y,this.setSize(H,Q,!1))},this.getSize=function(y){return y.set(H,Q)},this.setSize=function(y,N,z=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=y,Q=N,e.width=Math.floor(y*W),e.height=Math.floor(N*W),z===!0&&(e.style.width=y+"px",e.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(H*W,Q*W).floor()},this.setDrawingBufferSize=function(y,N,z){H=y,Q=N,W=z,e.width=Math.floor(y*z),e.height=Math.floor(N*z),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(C)},this.getViewport=function(y){return y.copy(ot)},this.setViewport=function(y,N,z,V){y.isVector4?ot.set(y.x,y.y,y.z,y.w):ot.set(y,N,z,V),Rt.viewport(C.copy(ot).multiplyScalar(W).round())},this.getScissor=function(y){return y.copy(Ct)},this.setScissor=function(y,N,z,V){y.isVector4?Ct.set(y.x,y.y,y.z,y.w):Ct.set(y,N,z,V),Rt.scissor(B.copy(Ct).multiplyScalar(W).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(y){Rt.setScissorTest(Wt=y)},this.setOpaqueSort=function(y){it=y},this.setTransparentSort=function(y){nt=y},this.getClearColor=function(y){return y.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(y=!0,N=!0,z=!0){let V=0;if(y){let O=!1;if(L!==null){const at=L.texture.format;O=at===Kr||at===Zr||at===Yr}if(O){const at=L.texture.type,mt=at===Cn||at===si||at===ds||at===zi||at===$r||at===qr,Mt=It.getClearColor(),Et=It.getClearAlpha(),Ot=Mt.r,Ht=Mt.g,Tt=Mt.b;mt?(g[0]=Ot,g[1]=Ht,g[2]=Tt,g[3]=Et,P.clearBufferuiv(P.COLOR,0,g)):(v[0]=Ot,v[1]=Ht,v[2]=Tt,v[3]=Et,P.clearBufferiv(P.COLOR,0,v))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT),z&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),_t.dispose(),Jt.dispose(),Pt.dispose(),_.dispose(),F.dispose(),Z.dispose(),ue.dispose(),U.dispose(),St.dispose(),$.dispose(),$.removeEventListener("sessionstart",lo),$.removeEventListener("sessionend",co),Wn.stop()};function et(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const y=Yt.autoReset,N=xt.enabled,z=xt.autoUpdate,V=xt.needsUpdate,O=xt.type;ut(),Yt.autoReset=y,xt.enabled=N,xt.autoUpdate=z,xt.needsUpdate=V,xt.type=O}function pt(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Vt(y){const N=y.target;N.removeEventListener("dispose",Vt),_e(N)}function _e(y){we(y),Pt.remove(y)}function we(y){const N=Pt.get(y).programs;N!==void 0&&(N.forEach(function(z){St.releaseProgram(z)}),y.isShaderMaterial&&St.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,z,V,O,at){N===null&&(N=Bt);const mt=O.isMesh&&O.matrixWorld.determinant()<0,Mt=wc(y,N,z,V,O);Rt.setMaterial(V,mt);let Et=z.index,Ot=1;if(V.wireframe===!0){if(Et=j.getWireframeAttribute(z),Et===void 0)return;Ot=2}const Ht=z.drawRange,Tt=z.attributes.position;let te=Ht.start*Ot,fe=(Ht.start+Ht.count)*Ot;at!==null&&(te=Math.max(te,at.start*Ot),fe=Math.min(fe,(at.start+at.count)*Ot)),Et!==null?(te=Math.max(te,0),fe=Math.min(fe,Et.count)):Tt!=null&&(te=Math.max(te,0),fe=Math.min(fe,Tt.count));const pe=fe-te;if(pe<0||pe===1/0)return;ue.setup(O,V,Mt,z,Et);let Ue,se=yt;if(Et!==null&&(Ue=G.get(Et),se=Kt,se.setIndex(Ue)),O.isMesh)V.wireframe===!0?(Rt.setLineWidth(V.wireframeLinewidth*jt()),se.setMode(P.LINES)):se.setMode(P.TRIANGLES);else if(O.isLine){let wt=V.linewidth;wt===void 0&&(wt=1),Rt.setLineWidth(wt*jt()),O.isLineSegments?se.setMode(P.LINES):O.isLineLoop?se.setMode(P.LINE_LOOP):se.setMode(P.LINE_STRIP)}else O.isPoints?se.setMode(P.POINTS):O.isSprite&&se.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)se.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))se.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const wt=O._multiDrawStarts,fn=O._multiDrawCounts,ae=O._multiDrawCount,qe=Et?G.get(Et).bytesPerElement:1,di=Pt.get(V).currentProgram.getUniforms();for(let Be=0;Be<ae;Be++)di.setValue(P,"_gl_DrawID",Be),se.render(wt[Be]/qe,fn[Be])}else if(O.isInstancedMesh)se.renderInstances(te,pe,O.count);else if(z.isInstancedBufferGeometry){const wt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,fn=Math.min(z.instanceCount,wt);se.renderInstances(te,pe,fn)}else se.render(te,pe)};function re(y,N,z){y.transparent===!0&&y.side===on&&y.forceSinglePass===!1?(y.side=Fe,y.needsUpdate=!0,ps(y,N,z),y.side=An,y.needsUpdate=!0,ps(y,N,z),y.side=on):ps(y,N,z)}this.compile=function(y,N,z=null){z===null&&(z=y),h=Jt.get(z),h.init(N),M.push(h),z.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),y!==z&&y.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(h.pushLight(O),O.castShadow&&h.pushShadow(O))}),h.setupLights();const V=new Set;return y.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const at=O.material;if(at)if(Array.isArray(at))for(let mt=0;mt<at.length;mt++){const Mt=at[mt];re(Mt,z,O),V.add(Mt)}else re(at,z,O),V.add(at)}),M.pop(),h=null,V},this.compileAsync=function(y,N,z=null){const V=this.compile(y,N,z);return new Promise(O=>{function at(){if(V.forEach(function(mt){Pt.get(mt).currentProgram.isReady()&&V.delete(mt)}),V.size===0){O(y);return}setTimeout(at,10)}kt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let $e=null;function un(y){$e&&$e(y)}function lo(){Wn.stop()}function co(){Wn.start()}const Wn=new ac;Wn.setAnimationLoop(un),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(y){$e=y,$.setAnimationLoop(y),y===null?Wn.stop():Wn.start()},$.addEventListener("sessionstart",lo),$.addEventListener("sessionend",co),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(N),N=$.getCamera()),y.isScene===!0&&y.onBeforeRender(b,y,N,L),h=Jt.get(y,M.length),h.init(N),M.push(h),bt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),X.setFromProjectionMatrix(bt),ht=this.localClippingEnabled,tt=st.init(this.clippingPlanes,ht),m=_t.get(y,T.length),m.init(),T.push(m),$.enabled===!0&&$.isPresenting===!0){const at=b.xr.getDepthSensingMesh();at!==null&&da(at,N,-1/0,b.sortObjects)}da(y,N,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(it,nt),Nt=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Nt&&It.addToRenderList(m,y),this.info.render.frame++,tt===!0&&st.beginShadows();const z=h.state.shadowsArray;xt.render(z,y,N),tt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,O=m.transmissive;if(h.setupLights(),N.isArrayCamera){const at=N.cameras;if(O.length>0)for(let mt=0,Mt=at.length;mt<Mt;mt++){const Et=at[mt];uo(V,O,y,Et)}Nt&&It.render(y);for(let mt=0,Mt=at.length;mt<Mt;mt++){const Et=at[mt];ho(m,y,Et,Et.viewport)}}else O.length>0&&uo(V,O,y,N),Nt&&It.render(y),ho(m,y,N);L!==null&&(w.updateMultisampleRenderTarget(L),w.updateRenderTargetMipmap(L)),y.isScene===!0&&y.onAfterRender(b,y,N),ue.resetDefaultState(),S=-1,x=null,M.pop(),M.length>0?(h=M[M.length-1],tt===!0&&st.setGlobalState(b.clippingPlanes,h.state.camera)):h=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function da(y,N,z,V){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)z=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)h.pushLight(y),y.castShadow&&h.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||X.intersectsSprite(y)){V&&Ut.setFromMatrixPosition(y.matrixWorld).applyMatrix4(bt);const mt=Z.update(y),Mt=y.material;Mt.visible&&m.push(y,mt,Mt,z,Ut.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||X.intersectsObject(y))){const mt=Z.update(y),Mt=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ut.copy(y.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Ut.copy(mt.boundingSphere.center)),Ut.applyMatrix4(y.matrixWorld).applyMatrix4(bt)),Array.isArray(Mt)){const Et=mt.groups;for(let Ot=0,Ht=Et.length;Ot<Ht;Ot++){const Tt=Et[Ot],te=Mt[Tt.materialIndex];te&&te.visible&&m.push(y,mt,te,z,Ut.z,Tt)}}else Mt.visible&&m.push(y,mt,Mt,z,Ut.z,null)}}const at=y.children;for(let mt=0,Mt=at.length;mt<Mt;mt++)da(at[mt],N,z,V)}function ho(y,N,z,V){const O=y.opaque,at=y.transmissive,mt=y.transparent;h.setupLightsView(z),tt===!0&&st.setGlobalState(b.clippingPlanes,z),V&&Rt.viewport(C.copy(V)),O.length>0&&fs(O,N,z),at.length>0&&fs(at,N,z),mt.length>0&&fs(mt,N,z),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function uo(y,N,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[V.id]===void 0&&(h.state.transmissionRenderTarget[V.id]=new ai(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?hs:Cn,minFilter:ii,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const at=h.state.transmissionRenderTarget[V.id],mt=V.viewport||C;at.setSize(mt.z,mt.w);const Mt=b.getRenderTarget();b.setRenderTarget(at),b.getClearColor(q),Y=b.getClearAlpha(),Y<1&&b.setClearColor(16777215,.5),b.clear(),Nt&&It.render(z);const Et=b.toneMapping;b.toneMapping=Vn;const Ot=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),h.setupLightsView(V),tt===!0&&st.setGlobalState(b.clippingPlanes,V),fs(y,z,V),w.updateMultisampleRenderTarget(at),w.updateRenderTargetMipmap(at),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Tt=0,te=N.length;Tt<te;Tt++){const fe=N[Tt],pe=fe.object,Ue=fe.geometry,se=fe.material,wt=fe.group;if(se.side===on&&pe.layers.test(V.layers)){const fn=se.side;se.side=Fe,se.needsUpdate=!0,fo(pe,z,V,Ue,se,wt),se.side=fn,se.needsUpdate=!0,Ht=!0}}Ht===!0&&(w.updateMultisampleRenderTarget(at),w.updateRenderTargetMipmap(at))}b.setRenderTarget(Mt),b.setClearColor(q,Y),Ot!==void 0&&(V.viewport=Ot),b.toneMapping=Et}function fs(y,N,z){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,at=y.length;O<at;O++){const mt=y[O],Mt=mt.object,Et=mt.geometry,Ot=V===null?mt.material:V,Ht=mt.group;Mt.layers.test(z.layers)&&fo(Mt,N,z,Et,Ot,Ht)}}function fo(y,N,z,V,O,at){y.onBeforeRender(b,N,z,V,O,at),y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),O.onBeforeRender(b,N,z,V,y,at),O.transparent===!0&&O.side===on&&O.forceSinglePass===!1?(O.side=Fe,O.needsUpdate=!0,b.renderBufferDirect(z,N,V,O,y,at),O.side=An,O.needsUpdate=!0,b.renderBufferDirect(z,N,V,O,y,at),O.side=on):b.renderBufferDirect(z,N,V,O,y,at),y.onAfterRender(b,N,z,V,O,at)}function ps(y,N,z){N.isScene!==!0&&(N=Bt);const V=Pt.get(y),O=h.state.lights,at=h.state.shadowsArray,mt=O.state.version,Mt=St.getParameters(y,O.state,at,N,z),Et=St.getProgramCacheKey(Mt);let Ot=V.programs;V.environment=y.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(y.isMeshStandardMaterial?F:_).get(y.envMap||V.environment),V.envMapRotation=V.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Ot===void 0&&(y.addEventListener("dispose",Vt),Ot=new Map,V.programs=Ot);let Ht=Ot.get(Et);if(Ht!==void 0){if(V.currentProgram===Ht&&V.lightsStateVersion===mt)return mo(y,Mt),Ht}else Mt.uniforms=St.getUniforms(y),y.onBeforeCompile(Mt,b),Ht=St.acquireProgram(Mt,Et),Ot.set(Et,Ht),V.uniforms=Mt.uniforms;const Tt=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Tt.clippingPlanes=st.uniform),mo(y,Mt),V.needsLights=Cc(y),V.lightsStateVersion=mt,V.needsLights&&(Tt.ambientLightColor.value=O.state.ambient,Tt.lightProbe.value=O.state.probe,Tt.directionalLights.value=O.state.directional,Tt.directionalLightShadows.value=O.state.directionalShadow,Tt.spotLights.value=O.state.spot,Tt.spotLightShadows.value=O.state.spotShadow,Tt.rectAreaLights.value=O.state.rectArea,Tt.ltc_1.value=O.state.rectAreaLTC1,Tt.ltc_2.value=O.state.rectAreaLTC2,Tt.pointLights.value=O.state.point,Tt.pointLightShadows.value=O.state.pointShadow,Tt.hemisphereLights.value=O.state.hemi,Tt.directionalShadowMap.value=O.state.directionalShadowMap,Tt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Tt.spotShadowMap.value=O.state.spotShadowMap,Tt.spotLightMatrix.value=O.state.spotLightMatrix,Tt.spotLightMap.value=O.state.spotLightMap,Tt.pointShadowMap.value=O.state.pointShadowMap,Tt.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ht,V.uniformsList=null,Ht}function po(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=js.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function mo(y,N){const z=Pt.get(y);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function wc(y,N,z,V,O){N.isScene!==!0&&(N=Bt),w.resetTextureUnits();const at=N.fog,mt=V.isMeshStandardMaterial?N.environment:null,Mt=L===null?b.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Xi,Et=(V.isMeshStandardMaterial?F:_).get(V.envMap||mt),Ot=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ht=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Tt=!!z.morphAttributes.position,te=!!z.morphAttributes.normal,fe=!!z.morphAttributes.color;let pe=Vn;V.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(pe=b.toneMapping);const Ue=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=Ue!==void 0?Ue.length:0,wt=Pt.get(V),fn=h.state.lights;if(tt===!0&&(ht===!0||y!==x)){const He=y===x&&V.id===S;st.setState(V,y,He)}let ae=!1;V.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==fn.state.version||wt.outputColorSpace!==Mt||O.isBatchedMesh&&wt.batching===!1||!O.isBatchedMesh&&wt.batching===!0||O.isBatchedMesh&&wt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&wt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&wt.instancing===!1||!O.isInstancedMesh&&wt.instancing===!0||O.isSkinnedMesh&&wt.skinning===!1||!O.isSkinnedMesh&&wt.skinning===!0||O.isInstancedMesh&&wt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&wt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&wt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&wt.instancingMorph===!1&&O.morphTexture!==null||wt.envMap!==Et||V.fog===!0&&wt.fog!==at||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==Ot||wt.vertexTangents!==Ht||wt.morphTargets!==Tt||wt.morphNormals!==te||wt.morphColors!==fe||wt.toneMapping!==pe||wt.morphTargetsCount!==se)&&(ae=!0):(ae=!0,wt.__version=V.version);let qe=wt.currentProgram;ae===!0&&(qe=ps(V,N,O));let di=!1,Be=!1,qi=!1;const me=qe.getUniforms(),an=wt.uniforms;if(Rt.useProgram(qe.program)&&(di=!0,Be=!0,qi=!0),V.id!==S&&(S=V.id,Be=!0),di||x!==y){Rt.buffers.depth.getReversed()?(rt.copy(y.projectionMatrix),xd(rt),yd(rt),me.setValue(P,"projectionMatrix",rt)):me.setValue(P,"projectionMatrix",y.projectionMatrix),me.setValue(P,"viewMatrix",y.matrixWorldInverse);const Pn=me.map.cameraPosition;Pn!==void 0&&Pn.setValue(P,At.setFromMatrixPosition(y.matrixWorld)),qt.logarithmicDepthBuffer&&me.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&me.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),x!==y&&(x=y,Be=!0,qi=!0)}if(O.isSkinnedMesh){me.setOptional(P,O,"bindMatrix"),me.setOptional(P,O,"bindMatrixInverse");const He=O.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),me.setValue(P,"boneTexture",He.boneTexture,w))}O.isBatchedMesh&&(me.setOptional(P,O,"batchingTexture"),me.setValue(P,"batchingTexture",O._matricesTexture,w),me.setOptional(P,O,"batchingIdTexture"),me.setValue(P,"batchingIdTexture",O._indirectTexture,w),me.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&me.setValue(P,"batchingColorTexture",O._colorsTexture,w));const Yi=z.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&Ft.update(O,z,qe),(Be||wt.receiveShadow!==O.receiveShadow)&&(wt.receiveShadow=O.receiveShadow,me.setValue(P,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(an.envMap.value=Et,an.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(an.envMapIntensity.value=N.environmentIntensity),Be&&(me.setValue(P,"toneMappingExposure",b.toneMappingExposure),wt.needsLights&&Ac(an,qi),at&&V.fog===!0&&dt.refreshFogUniforms(an,at),dt.refreshMaterialUniforms(an,V,W,Q,h.state.transmissionRenderTarget[y.id]),js.upload(P,po(wt),an,w)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(js.upload(P,po(wt),an,w),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&me.setValue(P,"center",O.center),me.setValue(P,"modelViewMatrix",O.modelViewMatrix),me.setValue(P,"normalMatrix",O.normalMatrix),me.setValue(P,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const He=V.uniformsGroups;for(let Pn=0,Ln=He.length;Pn<Ln;Pn++){const go=He[Pn];U.update(go,qe),U.bind(go,qe)}}return qe}function Ac(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function Cc(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(y,N,z){Pt.get(y.texture).__webglTexture=N,Pt.get(y.depthTexture).__webglTexture=z;const V=Pt.get(y);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=z===void 0,V.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,N){const z=Pt.get(y);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,z=0){L=y,A=N,R=z;let V=!0,O=null,at=!1,mt=!1;if(y){const Et=Pt.get(y);if(Et.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(Et.__webglFramebuffer===void 0)w.setupRenderTarget(y);else if(Et.__hasExternalTextures)w.rebindTextures(y,Pt.get(y.texture).__webglTexture,Pt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Tt=y.depthTexture;if(Et.__boundDepthTexture!==Tt){if(Tt!==null&&Pt.has(Tt)&&(y.width!==Tt.image.width||y.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(y)}}const Ot=y.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(mt=!0);const Ht=Pt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ht[N])?O=Ht[N][z]:O=Ht[N],at=!0):y.samples>0&&w.useMultisampledRTT(y)===!1?O=Pt.get(y).__webglMultisampledFramebuffer:Array.isArray(Ht)?O=Ht[z]:O=Ht,C.copy(y.viewport),B.copy(y.scissor),k=y.scissorTest}else C.copy(ot).multiplyScalar(W).floor(),B.copy(Ct).multiplyScalar(W).floor(),k=Wt;if(Rt.bindFramebuffer(P.FRAMEBUFFER,O)&&V&&Rt.drawBuffers(y,O),Rt.viewport(C),Rt.scissor(B),Rt.setScissorTest(k),at){const Et=Pt.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Et.__webglTexture,z)}else if(mt){const Et=Pt.get(y.texture),Ot=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Et.__webglTexture,z||0,Ot)}S=-1},this.readRenderTargetPixels=function(y,N,z,V,O,at,mt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Pt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt){Rt.bindFramebuffer(P.FRAMEBUFFER,Mt);try{const Et=y.texture,Ot=Et.format,Ht=Et.type;if(!qt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-V&&z>=0&&z<=y.height-O&&P.readPixels(N,z,V,O,Xt.convert(Ot),Xt.convert(Ht),at)}finally{const Et=L!==null?Pt.get(L).__webglFramebuffer:null;Rt.bindFramebuffer(P.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(y,N,z,V,O,at,mt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Pt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&mt!==void 0&&(Mt=Mt[mt]),Mt){const Et=y.texture,Ot=Et.format,Ht=Et.type;if(!qt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=y.width-V&&z>=0&&z<=y.height-O){Rt.bindFramebuffer(P.FRAMEBUFFER,Mt);const Tt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(N,z,V,O,Xt.convert(Ot),Xt.convert(Ht),0);const te=L!==null?Pt.get(L).__webglFramebuffer:null;Rt.bindFramebuffer(P.FRAMEBUFFER,te);const fe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await _d(P,fe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(Tt),P.deleteSync(fe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,N=null,z=0){y.isTexture!==!0&&(as("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,y=arguments[1]);const V=Math.pow(2,-z),O=Math.floor(y.image.width*V),at=Math.floor(y.image.height*V),mt=N!==null?N.x:0,Mt=N!==null?N.y:0;w.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,mt,Mt,O,at),Rt.unbindTexture()},this.copyTextureToTexture=function(y,N,z=null,V=null,O=0){y.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,y=arguments[1],N=arguments[2],O=arguments[3]||0,z=null);let at,mt,Mt,Et,Ot,Ht,Tt,te,fe;const pe=y.isCompressedTexture?y.mipmaps[O]:y.image;z!==null?(at=z.max.x-z.min.x,mt=z.max.y-z.min.y,Mt=z.isBox3?z.max.z-z.min.z:1,Et=z.min.x,Ot=z.min.y,Ht=z.isBox3?z.min.z:0):(at=pe.width,mt=pe.height,Mt=pe.depth||1,Et=0,Ot=0,Ht=0),V!==null?(Tt=V.x,te=V.y,fe=V.z):(Tt=0,te=0,fe=0);const Ue=Xt.convert(N.format),se=Xt.convert(N.type);let wt;N.isData3DTexture?(w.setTexture3D(N,0),wt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(w.setTexture2DArray(N,0),wt=P.TEXTURE_2D_ARRAY):(w.setTexture2D(N,0),wt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const fn=P.getParameter(P.UNPACK_ROW_LENGTH),ae=P.getParameter(P.UNPACK_IMAGE_HEIGHT),qe=P.getParameter(P.UNPACK_SKIP_PIXELS),di=P.getParameter(P.UNPACK_SKIP_ROWS),Be=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,pe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,pe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Et),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ht);const qi=y.isDataArrayTexture||y.isData3DTexture,me=N.isDataArrayTexture||N.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const an=Pt.get(y),Yi=Pt.get(N),He=Pt.get(an.__renderTarget),Pn=Pt.get(Yi.__renderTarget);Rt.bindFramebuffer(P.READ_FRAMEBUFFER,He.__webglFramebuffer),Rt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<Mt;Ln++)qi&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pt.get(y).__webglTexture,O,Ht+Ln),y.isDepthTexture?(me&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Pt.get(N).__webglTexture,O,fe+Ln),P.blitFramebuffer(Et,Ot,at,mt,Tt,te,at,mt,P.DEPTH_BUFFER_BIT,P.NEAREST)):me?P.copyTexSubImage3D(wt,O,Tt,te,fe+Ln,Et,Ot,at,mt):P.copyTexSubImage2D(wt,O,Tt,te,fe+Ln,Et,Ot,at,mt);Rt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else me?y.isDataTexture||y.isData3DTexture?P.texSubImage3D(wt,O,Tt,te,fe,at,mt,Mt,Ue,se,pe.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(wt,O,Tt,te,fe,at,mt,Mt,Ue,pe.data):P.texSubImage3D(wt,O,Tt,te,fe,at,mt,Mt,Ue,se,pe):y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,O,Tt,te,at,mt,Ue,se,pe.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,O,Tt,te,pe.width,pe.height,Ue,pe.data):P.texSubImage2D(P.TEXTURE_2D,O,Tt,te,at,mt,Ue,se,pe);P.pixelStorei(P.UNPACK_ROW_LENGTH,fn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae),P.pixelStorei(P.UNPACK_SKIP_PIXELS,qe),P.pixelStorei(P.UNPACK_SKIP_ROWS,di),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Be),O===0&&N.generateMipmaps&&P.generateMipmap(wt),Rt.unbindTexture()},this.copyTextureToTexture3D=function(y,N,z=null,V=null,O=0){return y.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,V=arguments[1]||null,y=arguments[2],N=arguments[3],O=arguments[4]||0),as('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,N,z,V,O)},this.initRenderTarget=function(y){Pt.get(y).__webglFramebuffer===void 0&&w.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?w.setTextureCube(y,0):y.isData3DTexture?w.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?w.setTexture2DArray(y,0):w.setTexture2D(y,0),Rt.unbindTexture()},this.resetState=function(){A=0,R=0,L=null,Rt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class to{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new to(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Lm extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Dm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Or,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,a=this.stride;s<a;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Re=new E;class ea{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),s=le(s,this.array),a=le(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=a,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[s+a])}return new sn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ea(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class uc extends li{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ti;const Qi=new E,wi=new E,Ai=new E,Ci=new gt,ts=new gt,fc=new he,Fs=new E,es=new E,Os=new E,fl=new gt,za=new gt,pl=new gt;class Im extends be{constructor(t=new uc){if(super(),this.isSprite=!0,this.type="Sprite",Ti===void 0){Ti=new Oe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Dm(e,5);Ti.setIndex([0,1,2,0,2,3]),Ti.setAttribute("position",new ea(n,3,0,!1)),Ti.setAttribute("uv",new ea(n,2,3,!1))}this.geometry=Ti,this.material=t,this.center=new gt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),wi.setFromMatrixScale(this.matrixWorld),fc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ai.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&wi.multiplyScalar(-Ai.z);const n=this.material.rotation;let s,a;n!==0&&(a=Math.cos(n),s=Math.sin(n));const r=this.center;Bs(Fs.set(-.5,-.5,0),Ai,r,wi,s,a),Bs(es.set(.5,-.5,0),Ai,r,wi,s,a),Bs(Os.set(.5,.5,0),Ai,r,wi,s,a),fl.set(0,0),za.set(1,0),pl.set(1,1);let o=t.ray.intersectTriangle(Fs,es,Os,!1,Qi);if(o===null&&(Bs(es.set(-.5,.5,0),Ai,r,wi,s,a),za.set(0,1),o=t.ray.intersectTriangle(Fs,Os,es,!1,Qi),o===null))return;const l=t.ray.origin.distanceTo(Qi);l<t.near||l>t.far||e.push({distance:l,point:Qi.clone(),uv:Xe.getInterpolation(Qi,Fs,es,Os,fl,za,pl,new gt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Bs(i,t,e,n,s,a){Ci.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ts.x=a*Ci.x-s*Ci.y,ts.y=s*Ci.x+a*Ci.y):ts.copy(Ci),i.copy(t),i.x+=ts.x,i.y+=ts.y,i.applyMatrix4(fc)}class pc extends li{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const na=new E,ia=new E,ml=new he,ns=new oa,ks=new ra,Va=new E,gl=new E;class Um extends be{constructor(t=new Oe,e=new pc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,a=e.count;s<a;s++)na.fromBufferAttribute(e,s-1),ia.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=na.distanceTo(ia);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),ks.radius+=a,t.ray.intersectsSphere(ks)===!1)return;ml.copy(s).invert(),ns.copy(t.ray).applyMatrix4(ml);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,f=n.attributes.position;if(d!==null){const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const h=d.getX(v),T=d.getX(v+1),M=zs(this,t,ns,l,h,T);M&&e.push(M)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(p),h=zs(this,t,ns,l,v,m);h&&e.push(h)}}else{const p=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let v=p,m=g-1;v<m;v+=c){const h=zs(this,t,ns,l,v,v+1);h&&e.push(h)}if(this.isLineLoop){const v=zs(this,t,ns,l,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function zs(i,t,e,n,s,a){const r=i.geometry.attributes.position;if(na.fromBufferAttribute(r,s),ia.fromBufferAttribute(r,a),e.distanceSqToSegment(na,ia,Va,gl)>n)return;Va.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Va);if(!(l<t.near||l>t.far))return{distance:l,point:gl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const vl=new E,_l=new E;class Nm extends Um{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,a=e.count;s<a;s+=2)vl.fromBufferAttribute(e,s),_l.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vl.distanceTo(_l);t.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class en extends Ie{constructor(t,e,n,s,a,r,o,l,c){super(t,e,n,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),a=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),a+=n.distanceTo(s),e.push(a),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const a=n.length;let r;e?r=e:r=t*n[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===r)return s/(a-1);const d=n[s],f=n[s+1]-d,p=(r-d)/f;return(s+p)/(a-1)}getTangent(t,e){let s=t-1e-4,a=t+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=e||(r.isVector2?new gt:new E);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new E,s=[],a=[],r=[],o=new E,l=new he;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new E)}a[0]=new E,r[0]=new E;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let p=1;p<=t;p++){if(a[p]=a[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Te(s[p-1].dot(s[p]),-1,1));a[p].applyMatrix4(l.makeRotationAxis(o,g))}r[p].crossVectors(s[p],a[p])}if(e===!0){let p=Math.acos(Te(a[0].dot(a[t]),-1,1));p/=t,s[0].dot(o.crossVectors(a[0],a[t]))>0&&(p=-p);for(let g=1;g<=t;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class mc extends Rn{constructor(t=0,e=0,n=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new gt){const n=e,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+t*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*d-p*u+this.aX,c=f*u+p*d+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fm extends mc{constructor(t,e,n,s,a,r){super(t,e,n,n,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function eo(){let i=0,t=0,e=0,n=0;function s(a,r,o,l){i=a,t=o,e=-3*a+3*r-2*o-l,n=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,d,u){let f=(r-a)/c-(o-a)/(c+d)+(o-r)/d,p=(o-r)/d-(l-r)/(d+u)+(l-o)/u;f*=d,p*=d,s(r,o,f,p)},calc:function(a){const r=a*a,o=r*a;return i+t*a+e*r+n*o}}}const Vs=new E,Ha=new eo,Ga=new eo,Wa=new eo;class Qn extends Rn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new E){const n=e,s=this.points,a=s.length,r=(a-(this.closed?0:1))*t;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%a]:(Vs.subVectors(s[0],s[1]).add(s[0]),c=Vs);const u=s[o%a],f=s[(o+1)%a];if(this.closed||o+2<a?d=s[(o+2)%a]:(Vs.subVectors(s[a-1],s[a-2]).add(s[a-1]),d=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(d),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ha.initNonuniformCatmullRom(c.x,u.x,f.x,d.x,g,v,m),Ga.initNonuniformCatmullRom(c.y,u.y,f.y,d.y,g,v,m),Wa.initNonuniformCatmullRom(c.z,u.z,f.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(Ha.initCatmullRom(c.x,u.x,f.x,d.x,this.tension),Ga.initCatmullRom(c.y,u.y,f.y,d.y,this.tension),Wa.initCatmullRom(c.z,u.z,f.z,d.z,this.tension));return n.set(Ha.calc(l),Ga.calc(l),Wa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new E().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function xl(i,t,e,n,s){const a=(n-t)*.5,r=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+a+r)*l+(-3*e+3*n-2*a-r)*o+a*i+e}function Om(i,t){const e=1-i;return e*e*t}function Bm(i,t){return 2*(1-i)*i*t}function km(i,t){return i*i*t}function os(i,t,e,n){return Om(i,t)+Bm(i,e)+km(i,n)}function zm(i,t){const e=1-i;return e*e*e*t}function Vm(i,t){const e=1-i;return 3*e*e*i*t}function Hm(i,t){return 3*(1-i)*i*i*t}function Gm(i,t){return i*i*i*t}function ls(i,t,e,n,s){return zm(i,t)+Vm(i,e)+Hm(i,n)+Gm(i,s)}class Wm extends Rn{constructor(t=new gt,e=new gt,n=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new gt){const n=e,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(ls(t,s.x,a.x,r.x,o.x),ls(t,s.y,a.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xm extends Rn{constructor(t=new E,e=new E,n=new E,s=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new E){const n=e,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return n.set(ls(t,s.x,a.x,r.x,o.x),ls(t,s.y,a.y,r.y,o.y),ls(t,s.z,a.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $m extends Rn{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qm extends Rn{constructor(t=new E,e=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new E){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new E){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ym extends Rn{constructor(t=new gt,e=new gt,n=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new gt){const n=e,s=this.v0,a=this.v1,r=this.v2;return n.set(os(t,s.x,a.x,r.x),os(t,s.y,a.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gc extends Rn{constructor(t=new E,e=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new E){const n=e,s=this.v0,a=this.v1,r=this.v2;return n.set(os(t,s.x,a.x,r.x),os(t,s.y,a.y,r.y),os(t,s.z,a.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zm extends Rn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){const n=e,s=this.points,a=(s.length-1)*t,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],d=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return n.set(xl(o,l.x,c.x,d.x,u.x),xl(o,l.y,c.y,d.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new gt().fromArray(s))}return this}}var Km=Object.freeze({__proto__:null,ArcCurve:Fm,CatmullRomCurve3:Qn,CubicBezierCurve:Wm,CubicBezierCurve3:Xm,EllipseCurve:mc,LineCurve:$m,LineCurve3:qm,QuadraticBezierCurve:Ym,QuadraticBezierCurve3:gc,SplineCurve:Zm});class ee extends Oe{constructor(t=1,e=1,n=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const d=[],u=[],f=[],p=[];let g=0;const v=[],m=n/2;let h=0;T(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(p,2));function T(){const b=new E,D=new E;let A=0;const R=(e-t)/n;for(let L=0;L<=a;L++){const S=[],x=L/a,C=x*(e-t)+t;for(let B=0;B<=s;B++){const k=B/s,q=k*l+o,Y=Math.sin(q),H=Math.cos(q);D.x=C*Y,D.y=-x*n+m,D.z=C*H,u.push(D.x,D.y,D.z),b.set(Y,R,H).normalize(),f.push(b.x,b.y,b.z),p.push(k,1-x),S.push(g++)}v.push(S)}for(let L=0;L<s;L++)for(let S=0;S<a;S++){const x=v[S][L],C=v[S+1][L],B=v[S+1][L+1],k=v[S][L+1];(t>0||S!==0)&&(d.push(x,C,k),A+=3),(e>0||S!==a-1)&&(d.push(C,B,k),A+=3)}c.addGroup(h,A,0),h+=A}function M(b){const D=g,A=new gt,R=new E;let L=0;const S=b===!0?t:e,x=b===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*x,0),f.push(0,x,0),p.push(.5,.5),g++;const C=g;for(let B=0;B<=s;B++){const q=B/s*l+o,Y=Math.cos(q),H=Math.sin(q);R.x=S*H,R.y=m*x,R.z=S*Y,u.push(R.x,R.y,R.z),f.push(0,x,0),A.x=Y*.5+.5,A.y=H*.5*x+.5,p.push(A.x,A.y),g++}for(let B=0;B<s;B++){const k=D+B,q=C+B;b===!0?d.push(q,q+1,k):d.push(q+1,q,k),L+=3}c.addGroup(h,L,b===!0?1:2),h+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ee(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class no extends ee{constructor(t=1,e=1,n=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,e,n,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new no(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class We extends Oe{constructor(t=1,e=32,n=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const d=[],u=new E,f=new E,p=[],g=[],v=[],m=[];for(let h=0;h<=n;h++){const T=[],M=h/n;let b=0;h===0&&r===0?b=.5/e:h===n&&l===Math.PI&&(b=-.5/e);for(let D=0;D<=e;D++){const A=D/e;u.x=-t*Math.cos(s+A*a)*Math.sin(r+M*o),u.y=t*Math.cos(r+M*o),u.z=t*Math.sin(s+A*a)*Math.sin(r+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(A+b,1-M),T.push(c++)}d.push(T)}for(let h=0;h<n;h++)for(let T=0;T<e;T++){const M=d[h][T+1],b=d[h][T],D=d[h+1][T],A=d[h+1][T+1];(h!==0||r>0)&&p.push(M,b,A),(h!==n-1||l<Math.PI)&&p.push(b,D,A)}this.setIndex(p),this.setAttribute("position",new ve(g,3)),this.setAttribute("normal",new ve(v,3)),this.setAttribute("uv",new ve(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new We(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Gi extends Oe{constructor(t=1,e=.4,n=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:a},n=Math.floor(n),s=Math.floor(s);const r=[],o=[],l=[],c=[],d=new E,u=new E,f=new E;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const v=g/s*a,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),d.x=t*Math.cos(v),d.y=t*Math.sin(v),f.subVectors(u,d).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,h=(s+1)*(p-1)+g,T=(s+1)*p+g;r.push(v,m,T),r.push(m,h,T)}this.setIndex(r),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(l,3)),this.setAttribute("uv",new ve(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class yn extends Oe{constructor(t=new gc(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),e=64,n=1,s=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:a};const r=t.computeFrenetFrames(e,a);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const o=new E,l=new E,c=new gt;let d=new E;const u=[],f=[],p=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(p,2));function v(){for(let M=0;M<e;M++)m(M);m(a===!1?e:0),T(),h()}function m(M){d=t.getPointAt(M/e,d);const b=r.normals[M],D=r.binormals[M];for(let A=0;A<=s;A++){const R=A/s*Math.PI*2,L=Math.sin(R),S=-Math.cos(R);l.x=S*b.x+L*D.x,l.y=S*b.y+L*D.y,l.z=S*b.z+L*D.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=d.x+n*l.x,o.y=d.y+n*l.y,o.z=d.z+n*l.z,u.push(o.x,o.y,o.z)}}function h(){for(let M=1;M<=e;M++)for(let b=1;b<=s;b++){const D=(s+1)*(M-1)+(b-1),A=(s+1)*M+(b-1),R=(s+1)*M+b,L=(s+1)*(M-1)+b;g.push(D,A,L),g.push(A,R,L)}}function T(){for(let M=0;M<=e;M++)for(let b=0;b<=s;b++)c.x=M/e,c.y=b/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new yn(new Km[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ft extends li{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yl,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class jm extends ft{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class io extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Jm extends io{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Xa=new he,yl=new E,bl=new E;class vc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jr,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;yl.setFromMatrixPosition(t.matrixWorld),e.position.copy(yl),bl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bl),e.updateMatrixWorld(),Xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sl=new he,is=new E,$a=new E;class Qm extends vc{constructor(){super(new Ve(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new gt(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,a=t.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),is.setFromMatrixPosition(t.matrixWorld),n.position.copy(is),$a.copy(n.position),$a.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($a),n.updateMatrixWorld(),s.makeTranslation(-is.x,-is.y,-is.z),Sl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sl)}}class qa extends io{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Qm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class t0 extends vc{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class e0 extends io{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new t0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class n0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ml(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ml();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ml(){return performance.now()}const El=new he;class i0{constructor(t,e,n=0,s=1/0){this.ray=new oa(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new jr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return El.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(El),this}intersectObject(t,e=!0,n=[]){return zr(t,this,n,e),n.sort(Tl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,a=t.length;s<a;s++)zr(t[s],this,n,e);return n.sort(Tl),n}}function Tl(i,t){return i.distance-t.distance}function zr(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const a=i.children;for(let r=0,o=a.length;r<o;r++)zr(a[r],t,e,!0)}}class wl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Te(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class s0 extends Nm{constructor(t=10,e=10,n=4473924,s=8947848){n=new zt(n),s=new zt(s);const a=e/2,r=t/e,o=t/2,l=[],c=[];for(let f=0,p=0,g=-o;f<=e;f++,g+=r){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=f===a?n:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const d=new Oe;d.setAttribute("position",new ve(l,3)),d.setAttribute("color",new ve(c,3));const u=new pc({vertexColors:!0,toneMapped:!1});super(d,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class a0 extends oi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wr);const Al={type:"change"},so={type:"start"},_c={type:"end"},Hs=new oa,Cl=new Bn,r0=Math.cos(70*gd.DEG2RAD),ye=new E,Ne=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ya=1e-6;class o0 extends a0{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.enabled=!0,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ii.ROTATE,MIDDLE:Ii.DOLLY,RIGHT:Ii.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new ri,this._lastTargetPosition=new E,this._quat=new ri().setFromUnitVectors(t.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wl,this._sphericalDelta=new wl,this._scale=1,this._panOffset=new E,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new E,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=c0.bind(this),this._onPointerDown=l0.bind(this),this._onPointerUp=d0.bind(this),this._onContextMenu=v0.bind(this),this._onMouseWheel=f0.bind(this),this._onKeyDown=p0.bind(this),this._onTouchStart=m0.bind(this),this._onTouchMove=g0.bind(this),this._onMouseDown=h0.bind(this),this._onMouseMove=u0.bind(this),this._interceptControlDown=_0.bind(this),this._interceptControlUp=x0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Al),this.update(),this.state=ce.NONE}update(t=null){const e=this.object.position;ye.copy(e).sub(this.target),ye.applyQuaternion(this._quat),this._spherical.setFromVector3(ye),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ne:n>Math.PI&&(n-=Ne),s<-Math.PI?s+=Ne:s>Math.PI&&(s-=Ne),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(ye.setFromSpherical(this._spherical),ye.applyQuaternion(this._quatInverse),e.copy(this.target).add(ye),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=ye.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new E(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=ye.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Hs.origin.copy(this.object.position),Hs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hs.direction))<r0?this.object.lookAt(this.target):(Cl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hs.intersectPlane(Cl,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Ya||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ya||this._lastTargetPosition.distanceToSquared(this.target)>Ya?(this.dispatchEvent(Al),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ne/60*this.autoRotateSpeed*t:Ne/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ye.setFromMatrixColumn(e,0),ye.multiplyScalar(-t),this._panOffset.add(ye)}_panUp(t,e){this.screenSpacePanning===!0?ye.setFromMatrixColumn(e,1):(ye.setFromMatrixColumn(e,0),ye.crossVectors(this.object.up,ye)),ye.multiplyScalar(t),this._panOffset.add(ye)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ye.copy(s).sub(this.target);let a=ye.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*a/n.clientHeight,this.object.matrix),this._panUp(2*e*a/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,a=e-n.top,r=n.width,o=n.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ne*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(n*n+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),a=.5*(t.pageY+n.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ne*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ne*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,a=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function l0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function c0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function d0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_c),this.state=ce.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function h0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ii.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ce.DOLLY;break;case Ii.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ce.ROTATE}break;case Ii.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(so)}function u0(i){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function f0(i){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(i.preventDefault(),this.dispatchEvent(so),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(_c))}function p0(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function m0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ce.TOUCH_ROTATE;break;case Ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case Ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ce.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(so)}function g0(i){switch(this._trackPointer(i),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ce.NONE}}function v0(i){this.enabled!==!1&&i.preventDefault()}function _0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function x0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function y0(){const i=document.createElement("canvas");i.width=1024,i.height=1024;const t=i.getContext("2d");t.fillStyle="#1c2b3d",t.fillRect(0,0,1024,1024);const e=t.createLinearGradient(0,0,1024,1024);e.addColorStop(0,"#a5b9ce"),e.addColorStop(.5,"#5c7692"),e.addColorStop(1,"#9cb2c9"),t.strokeStyle=e,t.lineWidth=22,t.strokeRect(11,11,1002,1002),t.strokeStyle="#0a121b",t.lineWidth=6,t.strokeRect(22,22,980,980),t.fillStyle="#dde8f2",t.fillRect(26,26,972,972);const n=6,s=10,a=32,r=32,o=960,l=960,c=5,d=(o-(n-1)*c)/n,u=(l-(s-1)*c)/s,f=14;for(let v=0;v<s;v++)for(let m=0;m<n;m++){const h=a+m*(d+c),T=r+v*(u+c);t.beginPath(),t.moveTo(h+f,T),t.lineTo(h+d-f,T),t.lineTo(h+d,T+f),t.lineTo(h+d,T+u-f),t.lineTo(h+d-f,T+u),t.lineTo(h+f,T+u),t.lineTo(h,T+u-f),t.lineTo(h,T+f),t.closePath();const M=t.createLinearGradient(h,T,h+d,T+u);M.addColorStop(0,"#0a203a"),M.addColorStop(.35,"#0e2b4d"),M.addColorStop(.7,"#0b223d"),M.addColorStop(1,"#071629"),t.fillStyle=M,t.fill(),t.fillStyle="rgba(56, 130, 204, 0.08)",t.fill(),t.strokeStyle="rgba(215, 230, 250, 0.16)",t.lineWidth=.8;for(let D=T+4;D<T+u-3;D+=4)t.beginPath(),t.moveTo(h+2,D),t.lineTo(h+d-2,D),t.stroke();const b=d/6;for(let D=1;D<=5;D++){const A=h+D*b;t.strokeStyle="rgba(255, 255, 255, 0.7)",t.lineWidth=1.6,t.beginPath(),t.moveTo(A,T),t.lineTo(A,T+u),t.stroke(),t.strokeStyle="#ffffff",t.lineWidth=.7,t.beginPath(),t.moveTo(A,T),t.lineTo(A,T+u),t.stroke()}}t.strokeStyle="#c5d5e5",t.lineWidth=2.4;for(let v=0;v<n;v++){const m=a+v*(d+c),h=d/6;for(let T=1;T<=5;T++){const M=m+T*h;t.beginPath(),t.moveTo(M,r-4),t.lineTo(M,r),t.moveTo(M,r+l),t.lineTo(M,r+l+4),t.stroke()}}const p=t.createLinearGradient(0,0,1024,1024);p.addColorStop(0,"rgba(255, 255, 255, 0.09)"),p.addColorStop(.3,"rgba(255, 255, 255, 0.02)"),p.addColorStop(.5,"rgba(110, 190, 255, 0.06)"),p.addColorStop(.7,"rgba(255, 255, 255, 0.01)"),p.addColorStop(1,"rgba(255, 255, 255, 0.08)"),t.fillStyle=p,t.fillRect(22,22,980,980);const g=new en(i);return g.colorSpace=ge,g}function b0(){const i=document.createElement("canvas");i.width=512,i.height=512;const t=i.getContext("2d");t.fillStyle="#0d1826",t.fillRect(0,0,512,512);for(let n=0;n<4;n++){const s=8+n*126;t.fillStyle="#14263b",t.fillRect(8,s,496,118),t.strokeStyle="#224466",t.lineWidth=2,t.strokeRect(8,s,496,118),t.fillStyle="#1c344e",t.fillRect(10,s+2,28,114),t.fillRect(474,s+2,28,114),t.fillStyle="#8ca6c2",t.beginPath(),t.arc(24,s+25,4,0,Math.PI*2),t.arc(24,s+93,4,0,Math.PI*2),t.arc(488,s+25,4,0,Math.PI*2),t.arc(488,s+93,4,0,Math.PI*2),t.fill(),t.strokeStyle="#b8cde3",t.lineWidth=4,t.strokeRect(44,s+34,12,50),t.strokeRect(456,s+34,12,50),t.fillStyle="#4ae6b8",t.font="bold 12px monospace",t.fillText(`LiFePO4 48V 50Ah · RACK MODULE 0${n+1}`,72,s+32),t.fillStyle="#8eaac6",t.font="10px monospace",t.fillText("2400 Wh · SMART BMS SYSTEM",72,s+48),t.fillStyle="#e63956",t.beginPath(),t.arc(380,s+40,10,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="bold 12px monospace",t.fillText("+",376,s+44),t.fillStyle="#182430",t.beginPath(),t.arc(415,s+40,10,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.fillText("-",412,s+44),t.fillStyle="#08121c",t.fillRect(72,s+68,36,24),t.fillStyle="#2cd89f",t.fillRect(76,s+71,28,10);for(let a=0;a<5;a++)t.fillStyle=a<4?"#2cd89f":"#1d483c",t.beginPath(),t.arc(135+a*14,s+80,4,0,Math.PI*2),t.fill();t.fillStyle="#6e8ba8",t.font="9px monospace",t.fillText("SOC",135,s+68),t.fillStyle="#0b1622";for(let a=0;a<16;a++)t.fillRect(230+a*8,s+68,4,30)}const e=new en(i);return e.colorSpace=ge,e}function S0(){const i=document.createElement("canvas");i.width=512,i.height=512;const t=i.getContext("2d");t.fillStyle="#0f2742",t.fillRect(0,0,512,512),t.strokeStyle="#285885",t.lineWidth=8,t.strokeRect(4,4,504,504),t.fillStyle="#4ae6b8",t.font="bold 22px monospace",t.fillText("MPPT CHARGE CONTROLLER",30,48),t.fillStyle="#91b0d0",t.font="14px monospace",t.fillText("ULTRA-FAST TRACKING · EFFICIENCY 97%",30,75),t.fillStyle="#061c2e",t.fillRect(30,110,452,190),t.strokeStyle="#18476d",t.lineWidth=3,t.strokeRect(30,110,452,190),t.fillStyle="#4ae6b8",t.font="bold 28px monospace",t.fillText("PV: 94.2 V   25.4 A",50,160),t.fillStyle="#ffb85c",t.fillText("OUT: 54.6 V  43.8 A",50,210),t.fillStyle="#ffffff",t.font="bold 36px monospace",t.fillText("POWER: 2390 W",50,265),[{label:"PV IN",color:"#2cd89f"},{label:"BULK",color:"#2cd89f"},{label:"FLOAT",color:"#5b8cff"},{label:"FAULT",color:"#3a2028"}].forEach((s,a)=>{const r=50+a*110;t.fillStyle=s.color,t.beginPath(),t.arc(r+20,340,10,0,Math.PI*2),t.fill(),t.fillStyle="#a6c2de",t.font="bold 12px monospace",t.fillText(s.label,r,370)}),t.fillStyle="#081524";for(let s=0;s<6;s++)t.fillRect(40,400+s*16,432,8);const n=new en(i);return n.colorSpace=ge,n}function M0(){const i=document.createElement("canvas");i.width=512,i.height=512;const t=i.getContext("2d");t.fillStyle="#182738",t.fillRect(0,0,512,512),t.fillStyle="#0d1926",t.fillRect(10,10,492,70),t.fillStyle="#e8f3ff",t.font="bold 20px monospace",t.fillText("AUTOMATIC TRANSFER SWITCH (ATS)",30,46),t.fillStyle="#62deb7",t.font="12px monospace",t.fillText("TRANSFER TIME: < 10ms · DUAL SOURCE",30,68),t.fillStyle="#0e2033",t.fillRect(30,110,200,180),t.strokeStyle="#23496d",t.lineWidth=2,t.strokeRect(30,110,200,180),t.fillStyle="#ffb85c",t.font="bold 16px monospace",t.fillText("SOURCE A: GRID",46,145),t.fillStyle="#2cd89f",t.beginPath(),t.arc(130,195,18,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="12px monospace",t.fillText("ONLINE",110,245),t.fillStyle="#0e2033",t.fillRect(280,110,200,180),t.strokeStyle="#23496d",t.lineWidth=2,t.strokeRect(280,110,200,180),t.fillStyle="#5b8cff",t.font="bold 16px monospace",t.fillText("SOURCE B: INVERTER",290,145),t.fillStyle="#3a5068",t.beginPath(),t.arc(380,195,18,0,Math.PI*2),t.fill(),t.fillStyle="#ffffff",t.font="12px monospace",t.fillText("STANDBY",355,245),t.fillStyle="#08131e",t.beginPath(),t.arc(256,360,45,0,Math.PI*2),t.fill(),t.strokeStyle="#ffb85c",t.lineWidth=6,t.beginPath(),t.moveTo(256,360),t.lineTo(220,330),t.stroke(),t.fillStyle="#e8f3ff",t.font="bold 13px monospace",t.fillText("AUTO MODE",222,435);const e=new en(i);return e.colorSpace=ge,e}function E0(){const i=document.createElement("canvas");i.width=512,i.height=512;const t=i.getContext("2d");t.fillStyle="#13253b",t.fillRect(0,0,512,512),t.strokeStyle="#254b73",t.lineWidth=6,t.strokeRect(6,6,500,500),t.fillStyle="#061320",t.fillRect(40,60,432,140),t.strokeStyle="#183c5e",t.lineWidth=3,t.strokeRect(40,60,432,140),t.fillStyle="#ffffff",t.font="bold 44px monospace",t.fillText("0 4 8 2 1 . 6",80,145),t.fillStyle="#ffb85c",t.font="bold 20px monospace",t.fillText("kWh",380,145),t.fillStyle="#ffd15c",t.beginPath(),t.moveTo(256,260),t.lineTo(330,390),t.lineTo(182,390),t.closePath(),t.fill(),t.fillStyle="#13253b",t.beginPath(),t.moveTo(256,285),t.lineTo(240,335),t.lineTo(262,335),t.lineTo(250,375),t.lineTo(276,325),t.lineTo(254,325),t.closePath(),t.fill(),t.fillStyle="#e8f3ff",t.font="bold 16px monospace",t.fillText("MAIN UTILITY FEED 220V/380V",115,430),t.fillStyle="#6de4bf",t.font="14px monospace",t.fillText("HOSPITAL DEDICATED FEEDER",135,460);const e=new en(i);return e.colorSpace=ge,e}function T0(){const i=document.createElement("canvas");i.width=1024,i.height=512;const t=i.getContext("2d");t.fillStyle="#0b1928",t.fillRect(0,0,1024,512),t.strokeStyle="#234b73",t.lineWidth=8,t.strokeRect(6,6,1012,500),t.fillStyle="#061320",t.fillRect(16,16,992,74),t.strokeStyle="#183c5e",t.lineWidth=2,t.strokeRect(16,16,992,74),t.fillStyle="#ef4444",t.fillRect(36,32,12,42),t.fillRect(21,47,42,12),t.fillStyle="#ffb85c",t.font="bold 22px monospace",t.fillText("ICU MEDICAL ISOLATED POWER DISTRIBUTION (IPS)",84,46),t.fillStyle="#5eead4",t.font="13px monospace",t.fillText("IEC 60364-7-710 MEDICAL SAFETY STANDARD · 230V 50Hz · UNINTERRUPTIBLE CLEAN POWER",84,72),t.fillStyle="#03140e",t.fillRect(30,106,460,140),t.strokeStyle="#0e4a34",t.lineWidth=3,t.strokeRect(30,106,460,140),t.fillStyle="#34d399",t.font="bold 15px monospace",t.fillText("LINE ISOLATION: > 999 kΩ  [SAFE]",48,138),t.fillText("LEAKAGE CURRENT: 14 µA    [NORMAL]",48,166),t.fillStyle="#ffb85c",t.fillText("LINE VOLTAGE: 230.5 V · 50.0 Hz",48,194),t.fillStyle="#38bdf8",t.fillText("UPS/INVERTER BUS: SYNCHRONIZED",48,222),t.fillStyle="#071626",t.fillRect(510,106,480,140),t.strokeStyle="#183e60",t.lineWidth=2,t.strokeRect(510,106,480,140),t.fillStyle="#e8f3ff",t.font="bold 16px sans-serif",t.fillText("نظام التغذية الكهربائية المعزولة لسرير العناية",530,140),t.fillStyle="#34d399",t.font="13px monospace",t.fillText("● SOURCE A (GRID): READY",530,172),t.fillText("● SOURCE B (INVERTER): ACTIVE",530,198),t.fillStyle="#f59e0b",t.fillText("● EMERGENCY TRANSFER: < 10ms",530,224),[{label:"VENTILATOR",sub:"دعم الحياة",tag:"CRITICAL",color:"#ef4444"},{label:"MONITOR",sub:"المؤشرات",tag:"VITAL",color:"#10b981"},{label:"INFUSION",sub:"المحاليل",tag:"PUMPS",color:"#10b981"},{label:"SYRINGE",sub:"الحقن",tag:"PRECISION",color:"#10b981"},{label:"DEFIB",sub:"الصدمات",tag:"EMERGENCY",color:"#ef4444"},{label:"INCUBATOR",sub:"الحاضنة",tag:"NEONATAL",color:"#f59e0b"},{label:"O2 CONC",sub:"الأكسجين",tag:"MEDICAL",color:"#3b82f6"}].forEach((s,a)=>{const r=30+a*138;t.fillStyle="#061320",t.fillRect(r,260,128,230),t.strokeStyle=s.color,t.lineWidth=2,t.strokeRect(r,260,128,230),t.fillStyle=s.color,t.fillRect(r,260,128,28),t.fillStyle="#ffffff",t.font="bold 12px monospace",t.textAlign="center",t.fillText(`CH 0${a+1} · ${s.tag}`,r+64,278),t.fillStyle="#0b1a29",t.beginPath(),t.arc(r+64,345,36,0,Math.PI*2),t.fill(),t.strokeStyle="#234a6e",t.lineWidth=3,t.stroke(),t.fillStyle="#02070c",t.beginPath(),t.arc(r+50,345,7,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(r+78,345,7,0,Math.PI*2),t.fill(),t.strokeStyle="#ffd700",t.lineWidth=3,t.beginPath(),t.moveTo(r+64,316),t.lineTo(r+64,324),t.stroke(),t.beginPath(),t.moveTo(r+64,366),t.lineTo(r+64,374),t.stroke(),t.fillStyle="#e8f3ff",t.font="bold 12px monospace",t.fillText(s.label,r+64,415),t.fillStyle="#8eaac6",t.font="11px sans-serif",t.fillText(s.sub,r+64,436),t.fillStyle=s.color,t.font="10px monospace",t.fillText("230V 16A",r+64,465)}),t.textAlign="start";const n=new en(i);return n.colorSpace=ge,n}function je(i,t=[0,0,0],e=1,n=!0){const s=new ie;s.position.set(...i),s.rotation.set(...t),s.scale.setScalar(e);const a=n?new ft({color:"#d4af37",roughness:.28,metalness:.88}):new ft({color:"#b8c9db",roughness:.22,metalness:.92}),r=new ft({color:"#161d26",roughness:.85}),o=new K(new ee(.048,.048,.022,6),a);s.add(o);const l=new K(new ee(.042,.042,.032,16),a);l.position.y=.024,s.add(l);const c=new K(new ee(.034,.028,.026,16),r);return c.position.y=.048,s.add(c),s}function w0(i,t=[0,0,0],e="#1a2634"){const n=new ie;n.position.set(...i),n.rotation.set(...t);const s=new ft({color:e,roughness:.6,metalness:.2}),a=new ft({color:"#2cd89f",emissive:"#2cd89f",emissiveIntensity:.9}),r=new K(new Lt(.048,.065,.042),s);n.add(r);const o=new K(new ee(.018,.026,.038,12),s);o.position.y=-.045,n.add(o);const l=new K(new We(.007,8,8),a);return l.position.set(0,.022,.022),n.add(l),n}function A0(i,t=[0,0,0]){const e=new ie;e.position.set(...i),e.rotation.set(...t);const n=new ft({color:"#7e93a8",roughness:.35,metalness:.85}),s=new K(new Gi(.042,.008,8,16,Math.PI),n);s.rotation.z=Math.PI,e.add(s);const a=new K(new Lt(.11,.01,.028),n);return a.position.y=-.042,e.add(a),e}function jn(i,t=[0,0,0]){const e=new ie;e.position.set(...i),e.rotation.set(...t);const n=new ft({color:"#161d26",roughness:.7}),s=new ft({color:"#ef4444",emissive:"#ef4444",emissiveIntensity:.4}),a=new K(new Lt(.065,.08,.015),n);e.add(a);const r=new K(new Lt(.045,.045,.02),new Je({color:"#090d12"}));r.position.set(0,-.012,.005),e.add(r);const o=new K(new Lt(.016,.028,.012),s);return o.position.set(0,.024,.006),e.add(o),e}function ss(i,t,e=.22,n=.045,s=.28){const a=new ie,r=new E(...i),o=new E(...t),l=new E().subVectors(o,r),c=l.length();if(c<.05)return a;const d=new E().addVectors(r,o).multiplyScalar(.5);a.position.copy(d);const u=l.clone().normalize(),f=new ft({color:"#8ea3ba",roughness:.32,metalness:.88}),p=new ie,g=new Lt(.012,n,c),v=new K(g,f);v.position.set(-e/2,n/2,0),p.add(v);const m=new K(g,f);m.position.set(e/2,n/2,0),p.add(m);const h=new Lt(e-.01,.005,c),T=new ft({color:"#52677d",roughness:.45,metalness:.78}),M=new K(h,T);M.position.set(0,.003,0),p.add(M);const b=Math.max(2,Math.floor(c/s)),D=new ee(.005,.005,e-.01,8);for(let x=0;x<=b;x++){const C=-c/2+x/b*c,B=new K(D,f);B.rotation.z=Math.PI/2,B.position.set(0,.008,C),p.add(B)}const A=Math.max(.02,r.y),R=new Lt(e+.04,A,.024),L=new ft({color:"#3d5062",roughness:.45,metalness:.85}),S=Math.max(2,Math.ceil(c/1.5));for(let x=0;x<S;x++){const C=-c/2+x/(S-1)*c,B=new K(R,L);B.position.set(0,-A/2,C),p.add(B);const k=new K(new Lt(e+.08,.008,.07),L);k.position.set(0,-A+.004,C),p.add(k)}return p.quaternion.setFromUnitVectors(new E(0,0,1),u),a.add(p),a}function Rl(i,t=[0,0,0],e=!0){const n=new ie;n.position.set(...i),n.rotation.set(...t);const s=new ft({color:"#141c26",roughness:.55}),a=new ft({color:e?"#ef4444":"#1e3a8a",roughness:.35,metalness:.2}),r=new K(new ee(.016,.016,.075,12),s);n.add(r);const o=new K(new Lt(.022,.026,.038),s);n.add(o);const l=new K(new ee(.017,.017,.012,12),a);return l.position.y=.022,n.add(l),n}function Gs(i,t=[0,0,0],e=!0){const n=new ie;n.position.set(...i),n.rotation.set(...t);const s=new ft({color:"#d97706",roughness:.25,metalness:.92}),a=new ft({color:e?"#dc2626":"#0f172a",roughness:.75}),r=new K(new ee(.022,.022,.045,12),a);n.add(r);const o=new K(new ee(.026,.026,.008,16),s);o.position.y=.028,n.add(o);const l=new K(new ee(.012,.012,.014,6),J.steel);return l.position.y=.032,n.add(l),n}function C0(i,t,e,n="#38bdf8"){const s=new ie;s.position.set(...e);const a=document.createElement("canvas");a.width=384,a.height=96;const r=a.getContext("2d");r.fillStyle="rgba(7, 18, 32, 0.94)",r.beginPath(),r.roundRect(4,4,376,88,14),r.fill(),r.strokeStyle=n,r.lineWidth=3,r.stroke(),r.fillStyle=n,r.beginPath(),r.roundRect(6,6,12,84,5),r.fill(),r.fillStyle="#ffffff",r.font='bold 24px "Tajawal", system-ui, sans-serif',r.textAlign="right",r.direction="rtl",r.fillText(i,360,42),r.fillStyle="#9cb8d9",r.font='600 18px "JetBrains Mono", monospace',r.direction="ltr",r.textAlign="left",r.fillText(t,32,74);const o=new en(a);o.colorSpace=ge;const l=new Je({map:o,transparent:!0,opacity:.95,side:on}),c=new K(new Le(.24,.06),l);c.userData.isCableTag=!0,s.add(c);const d=new ft({color:"#c4d3e2",roughness:.3,metalness:.85}),u=new K(new Gi(.024,.005,8,16),d);return u.position.set(-.12,0,0),u.rotation.y=Math.PI/2,s.add(u),s}const J={dark:new ft({color:"#142338",roughness:.45,metalness:.4}),steel:new ft({color:"#c4d3e2",roughness:.25,metalness:.8}),white:new ft({color:"#f2f6fa",roughness:.5}),blue:new ft({color:"#1a5ea6",roughness:.35,metalness:.3}),glass:new ft({color:"#113554",roughness:.12,metalness:.2,transparent:!0,opacity:.82}),rubber:new ft({color:"#111a26",roughness:.9}),green:new ft({color:"#2cd89f",emissive:"#0c734e",emissiveIntensity:.45}),orange:new ft({color:"#ffb356",emissive:"#753b11",emissiveIntensity:.35}),red:new ft({color:"#f75670",emissive:"#781527",emissiveIntensity:.35})},De=[{id:"overview",audioFile:"./audio/step_0.mp3",title:"نظرة شاملة على منظومة طاقة العناية المركزة",en:"ICU Critical Power System Overview",camPos:new E(12.5,10.5,13.5),lookAt:new E(.5,.8,-.8),timeCode:"00:00 / 02:40",targetId:null,narration:"مرحباً بكم في العرض التفاعلي لمختبر طاقة العناية المركزة. صُممت هذه المنظومة الهجينة لتأمين طاقة كهربائية مستمرة بنسبة مئة بالمئة لأجهزة دعم الحياة الحرجة. تدمج المنظومة بين الطاقة الشمسية الكهروضوئية، وبنك بطاريات الليثيوم، وتغذية الشبكة الكهربائية مع مفتاح تحويل تلقائي سريع لضمان عدم توقف أجهزة المريض نهائياً."},{id:"solar",audioFile:"./audio/step_1.mp3",title:"حقل الألواح الشمسية الكهروضوئية (PV Array)",en:"Solar Photovoltaic Generation (2400 Wp)",camPos:new E(-5.5,4.4,1.8),lookAt:new E(-6.2,1.3,-3.2),timeCode:"00:20 / 02:40",targetId:"solar",narration:"تتكون مصفوفة التوليد الشمسي من ستة ألواح كهروضوئية أحادية البلورة بقدرة إجمالية تبلغ ألفين وأربعمئة واط. الألواح مثبتة على هيكل معدني مجلفن مائل بزاوية ثلاثين درجة لامتصاص أقصى إشعاع، وتقوم بتحويل ضوء الشمس إلى تيار مستمر لتغذية الأحمال وشحن بنك البطاريات."},{id:"mppt",audioFile:"./audio/step_2.mp3",title:"منظم الشحن الذكي بتقنية MPPT",en:"Maximum Power Point Tracking Controller",camPos:new E(-2.6,2.8,-.5),lookAt:new E(-3.2,1.3,-3.2),timeCode:"00:40 / 02:40",targetId:"mppt",narration:"منظّم الشحن الذكي بتقنية إم بي بي تي يعمل بكفاءة تحويل فائقة تصل إلى سبعة وتسعين بالمئة. يتتبع باستمرار نقطة الاستطاعة العظمى للألواح الشمسية مع تغير شدة الإشعاع، ومزود بمشتت حراري متطور وزعانف تبريد لحماية بنك البطاريات من التيارات الزائدة."},{id:"battery",audioFile:"./audio/step_3.mp3",title:"كابينة بنك بطاريات الليثيوم (Rack Storage)",en:"Lithium Battery Storage (9.6 kWh / 48V)",camPos:new E(-2.2,2.7,3.5),lookAt:new E(-3.2,1,.5),timeCode:"01:00 / 02:40",targetId:"battery",narration:"كابينة بنك بطاريات الليثيوم بتصميم خوادم صناعي يضم أربع وحدات بسعة إجمالية تسعة فاصل ستة كيلوواط ساعي، بجهد ثمانية وأربعين فولت. تمثل خط الأمان الأساسي ضد انقطاعات الكهرباء ومزودة بنظام إدارة البطارية الذكي بي إم إس لمراقبة خلايا الطاقة."},{id:"inverter",audioFile:"./audio/step_4.mp3",title:"العاكس الهجين ذو الموجة الجيبية النقية",en:"Hybrid Pure Sine Wave Inverter (2000 W)",camPos:new E(.1,2.9,-.3),lookAt:new E(0,1.3,-3.2),timeCode:"01:20 / 02:40",targetId:"inverter",narration:"العاكس الهجين بقدرة مستمرة ألفي واط وكفاءة أربعة وتسعين بالمئة. يقوم بتحويل التيار المستمر ثمانية وأربعين فولت إلى تيار متناوب مئتين وعشرين فولت بموجة جيبية نقية، وهو شرط أساسي لحماية الأجهزة الطبية الحساسة وأجهزة التنفس من التشوهات الكهربائية."},{id:"ats",audioFile:"./audio/step_5.mp3",title:"مفتاح التحويل التلقائي السريع (Static ATS)",en:"Automatic Transfer Switch (< 10 ms)",camPos:new E(3.2,2.9,-.3),lookAt:new E(3.2,1.3,-3.2),timeCode:"01:40 / 02:40",targetId:"ats",narration:"مفتاح التحويل التلقائي إي تي إس هو صمام الأمان والتحكم بين الشبكة والعاكس. في حال انقطاع الشبكة العمومية، يقوم بالتحويل إلى طاقة البطاريات في زمن قياسي يقل عن عشرة ميلي ثانية، وهي سرعة فائقة تمنع إعادة إقلاع الأجهزة أو انقطاع التغذية عن المريض."},{id:"icu",audioFile:"./audio/step_6.mp3",title:"سرير العناية المركزة والأجهزة الطبية الحيوية",en:"ICU Bed & Critical Medical Equipment",camPos:new E(6.5,4.2,5.2),lookAt:new E(6.2,1.4,1),timeCode:"02:00 / 02:40",targetId:"icu",narration:"منطقة العناية المركزة تضم السرير الطبي الهيدروليكي، جهاز التنفس الاصطناعي مع أنابيب التنفس المرنة، شاشة مراقبة المؤشرات الحيوية بموجة تخطيط القلب الحية، وحامل المحاليل مع مضخات الحقن الدقيقة وأجهزة الصدمات الكهربائية."},{id:"outage-test",audioFile:"./audio/step_7.mp3",title:"محاكاة عملية: اختبار انقطاع مفاجئ للشبكة",en:"Live Grid Outage & Battery Support Test",camPos:new E(7.5,6.2,9.5),lookAt:new E(.5,1,-.5),timeCode:"02:20 / 02:40",targetId:null,action:"grid-toggle",narration:"نختبر الآن محاكاة انقطاع مفاجئ للشبكة الكهربائية. تلاحظون فوراً تحول مسار التغذية إلى البطارية والعاكس، وتستمر جميع الأجهزة الطبية ومؤشرات المريض الحيوية بالعمل باستقرار تام دون أدنى تأثر، محققة الهدف الهندسي والسريري للمنظومة."}];function R0(i){if(!i)return[];const e=i.replace(/^(\.\/|\/)/,"").replace(/^.*[\/]/,"");if(typeof window>"u")return[i];const n=window.location,s=n.origin||"",r=(n.pathname||"/").split("/").filter(Boolean),o=r.length>0&&!r[0].includes(".")?r[0]:"",l=o?"/"+o+"/":"/",c=[s+l+"audio/"+e,s+l+"public/audio/"+e,"./audio/"+e,"./public/audio/"+e,"/audio/"+e,"audio/"+e,i];return[...new Set(c.filter(Boolean))]}class P0{constructor(t,{onSelect:e=()=>{},onTourChange:n=()=>{},onEvent:s=()=>{}}={}){this.container=t,this.onSelect=e,this.onTourChange=n,this.onEvent=s,this.groups=new Map,this.deviceScreens=new Map,this.pathDots=[],this.pathMeshes=[],this.showConnections=!0,this.selectedId=null,this.currentState={irradiance:70,soc:71,gridAvailable:!0,loadW:695},this.raycaster=new i0,this.pointer=new gt,this.atsSparkLight=null,this.atsSparkTime=null,this.tourIndex=0,this.tourPlaying=!1,this.tourTimer=null,this.voiceEnabled=!0,this.currentAudio=null,this.patientChest=null,this.patientBlanket=null,this.spo2SensorLed=null,this.patientChestBaseY=.12,this.patientBlanketBaseY=0,this.scene=new Lm,this.scene.background=new zt("#060e1a"),this.scene.fog=new to("#060e1a",28,75),this.camera=new Ve(40,1,.1,150),this.camera.position.set(10.8,9.2,12.5),this.renderer=new Pm({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ul,this.renderer.outputColorSpace=ge,this.renderer.toneMapping=Fl,this.renderer.toneMappingExposure=1.25,this.renderer.domElement.className="three-canvas",this.renderer.domElement.style.touchAction="none",this.container.appendChild(this.renderer.domElement),this.controls=new o0(this.camera,this.renderer.domElement),this.controls.target.set(0,.8,0),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.maxPolarAngle=Math.PI*.485,this.controls.minDistance=2.5,this.controls.maxDistance=32,this.controls.update(),this.solarTexture=y0(),this.batteryRackTexture=b0(),this.mpptTexture=S0(),this.atsTexture=M0(),this.utilityMeterTexture=E0(),this.ecgTexture=this.createECGTexture(),this.ventTexture=this.createVentilatorTexture(),this.inverterTexture=this.createInverterTexture(),this.medicalConsoleTexture=T0(),this.setupLights(),this.setupRoom(),this.buildSystem(),this.buildPowerPaths(),this.attachEvents(),this.onFullscreenChange=()=>{const a=!!(document.fullscreenElement||document.webkitFullscreenElement);!a&&this.container.classList.contains("fake-fullscreen")||this.updateFullscreenUI(a),this.triggerFullscreenResize()},document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),this.onKeyDown=a=>{a.key==="Escape"&&this.container.classList.contains("fake-fullscreen")&&this.exitFullscreen()},window.addEventListener("keydown",this.onKeyDown),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.clock=new n0,this.animate=this.animate.bind(this),this.frameId=requestAnimationFrame(this.animate)}createECGTexture(){const t=document.createElement("canvas");t.width=256,t.height=160;const e=t.getContext("2d"),n=new en(t);return n.colorSpace=ge,{texture:n,update:s=>{e.fillStyle="#061320",e.fillRect(0,0,256,160),e.strokeStyle="#0e263d",e.lineWidth=1;for(let o=0;o<256;o+=16)e.beginPath(),e.moveTo(o,0),e.lineTo(o,160),e.stroke();for(let o=0;o<160;o+=16)e.beginPath(),e.moveTo(0,o),e.lineTo(256,o),e.stroke();e.fillStyle="#33d6a6",e.font="bold 15px monospace",e.fillText("HR: 75 bpm",10,22),e.fillStyle="#5b8cff",e.fillText("SpO2: 98%",135,22),e.fillStyle="#ffb85c",e.fillText("BP: 120/80",10,42),e.strokeStyle="#33d6a6",e.lineWidth=2.4,e.beginPath();const a=s*105;for(let o=0;o<256;o++){const l=(o+a)%256;let c=100;const d=l%80;d>28&&d<33?c-=10:d>=33&&d<36?c+=6:d>=36&&d<42?c-=44:d>=42&&d<46?c+=14:d>=52&&d<62&&(c-=14),o===0?e.moveTo(o,c):e.lineTo(o,c)}e.stroke();const r=a%256;e.fillStyle="#ffffff",e.fillRect(r,52,2.5,96),n.needsUpdate=!0}}}createVentilatorTexture(){const t=document.createElement("canvas");t.width=256,t.height=160;const e=t.getContext("2d"),n=new en(t);return n.colorSpace=ge,{texture:n,update:s=>{e.fillStyle="#081729",e.fillRect(0,0,256,160),e.fillStyle="#64dcb8",e.font="bold 14px monospace",e.fillText("ICU VENTILATOR",10,22),e.fillStyle="#a5c4e3",e.font="12px monospace",e.fillText("SIMV · Vt: 480ml",10,44),e.fillText("P_peak: 21 cmH2O",10,64),e.fillText("RR: 15 /min · FiO2: 40%",10,84),e.strokeStyle="#5b8cff",e.lineWidth=2.2,e.beginPath();const a=s*3.2;for(let r=0;r<236;r++){const o=Math.sin(r*.05-a),l=142-Math.max(0,o)*26;r===0?e.moveTo(r+10,l):e.lineTo(r+10,l)}e.stroke(),n.needsUpdate=!0}}}createInverterTexture(){const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),n=new en(t);return n.colorSpace=ge,{texture:n,update:(s,a)=>{e.fillStyle="#061713",e.fillRect(0,0,256,128),e.strokeStyle="#184f3c",e.lineWidth=3,e.strokeRect(3,3,250,122),e.fillStyle="#33d6a6",e.font="bold 15px monospace",e.fillText("INVERTER 2000W PURE SINE",14,26),e.fillStyle="#ffffff",e.font="bold 26px monospace",e.fillText(`${Math.round(s)} W`,14,62),e.font="13px monospace",e.fillStyle="#78e5c4",e.fillText("AC 220V 50Hz · LOAD OK",14,88),e.fillText(`BAT 48V · SOC: ${Math.round(a)}%`,14,110),n.needsUpdate=!0}}}setupLights(){this.scene.add(new Jm("#d4ecff","#142030",2.2));const t=new e0("#fff2dc",3.8);t.position.set(6,14,8),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-14,t.shadow.camera.right=14,t.shadow.camera.top=14,t.shadow.camera.bottom=-14,this.scene.add(t),this.sunLight=t;const e=new qa("#5ce0bb",22,18);e.position.set(6.2,4.2,1.2),this.scene.add(e);const n=new qa("#3c96ff",24,22);n.position.set(-2,4.2,-2.5),this.scene.add(n);const s=new qa("#8bf5ff",0,10);s.position.set(3.2,1.15,-2.8),this.scene.add(s),this.atsSparkLight=s}setupRoom(){const t=new K(new Le(64,52),new ft({color:"#0b1624",roughness:.85,metalness:.15}));t.rotation.x=-Math.PI/2,t.position.set(0,-.035,-3),t.receiveShadow=!0,this.scene.add(t);const e=new s0(64,64,"#1e3852","#0f2338");e.position.set(0,-.02,-3),e.material.opacity=.55,e.material.transparent=!0,this.scene.add(e);const n=new K(new Le(64,18),new ft({color:"#0d1d30",roughness:.82,side:An}));n.position.set(0,9,-22),n.receiveShadow=!0,this.scene.add(n);const s=new K(new Lt(64,.18,.05),new ft({color:"#258bc9",emissive:"#104566",emissiveIntensity:.85}));s.position.set(0,4.2,-21.96),this.scene.add(s);const a=new K(new Lt(64,.4,.06),new ft({color:"#132438",roughness:.5}));a.position.set(0,.2,-21.96),this.scene.add(a);const r=new K(new Lt(14.2,.16,7.2),new ft({color:"#122234",roughness:.7,metalness:.2}));r.position.set(-1.8,.08,-1.8),r.receiveShadow=!0,this.scene.add(r);const o=new K(new Lt(14.1,.03,.08),new ft({color:"#f59e0b",roughness:.4}));o.position.set(-1.8,.165,1.76),this.scene.add(o);const l=new K(new Lt(6.6,.1,6.2),new ft({color:"#0e1f30",roughness:.65,metalness:.25}));l.position.set(6.2,.05,1.3),l.receiveShadow=!0,this.scene.add(l);const c=new K(new Lt(6.5,.02,.06),new ft({color:"#38bdf8",emissive:"#0284c7",emissiveIntensity:.8}));c.position.set(6.2,.105,-1.76),this.scene.add(c)}buildSystem(){this.makeSolar(),this.makeController(),this.makeBattery(),this.makeInverter(),this.makeAts(),this.makeGridSource(),this.makeIcu(),this.addLabel("solar","مصفوفة الألواح",new E(-6.2,2.1,-3.2),2.35),this.addLabel("mppt","منظّم MPPT",new E(-3.2,2.3,-3.2),1.9),this.addLabel("battery","بطارية 48V",new E(-3.2,2,.5),1.65),this.addLabel("inverter","العاكس الهجين",new E(0,2.5,-3.2),1.9),this.addLabel("ats","مفتاح ATS",new E(3.2,2.4,-3.2),2.15),this.addLabel("grid","الشبكة",new E(3.2,1.7,-6.2),1.25),this.addLabel("icu","منطقة العناية المركزة",new E(6.2,3,1),2.45)}registerGroup(t,e,n=!0){return e.userData.selectId=t,e.userData.selectType=n?"component":"device",e.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,s.userData.selectId||(s.userData.selectId=t),s.userData.selectType||(s.userData.selectType=n?"component":"device"))}),this.scene.add(e),this.groups.set(t,e),e}addBox(t,e,n,s,a,r={}){const o=new K(new Lt(...n),a);return o.position.set(...s),o.name=e,r.rotation&&o.rotation.set(...r.rotation),t.add(o),o}addCylinder(t,e,n,s,a,r,o,l=20){const c=new K(new ee(n,s,a,l),o);return c.position.set(...r),c.name=e,t.add(c),c}makeSolar(){const t=new ie;t.position.set(-6.2,.16,-3.2);const e=new ft({color:"#8599ad",roughness:.3,metalness:.85}),n=J.dark,s=[-1.4,0,1.4];for(const l of s)this.addBox(t,"concrete footing front",[.36,.12,.36],[l,.06,.72],n),this.addBox(t,"concrete footing rear",[.36,.12,.36],[l,.06,-.72],n),this.addBox(t,"rack leg front",[.08,.34,.08],[l,.29,.72],e),this.addBox(t,"rack leg rear",[.08,.92,.08],[l,.58,-.72],e),this.addBox(t,"rack inclined rafter",[.06,.08,1.62],[l,.75,0],e,{rotation:[-.36,0,0]}),this.addBox(t,"rack diagonal brace",[.045,.045,1.48],[l,.32,0],e,{rotation:[.18,0,0]});this.addBox(t,"mounting rail front",[4.35,.06,.08],[0,.5,.72],e,{rotation:[-.36,0,0]}),this.addBox(t,"mounting rail rear",[4.35,.06,.08],[0,1.08,-.72],e,{rotation:[-.36,0,0]});const a=new ft({map:this.solarTexture,roughness:.16,metalness:.32});this.panelMaterial=a;const r=new ft({color:"#c5d5e5",roughness:.22,metalness:.9});for(let l=0;l<2;l++)for(let c=0;c<3;c++){const d=-1.4+c*1.4,u=-.72+l*1.44,f=.82-u*.376,p=this.addBox(t,"PV panel",[1.34,.045,1.34],[d,f,u],a,{rotation:[-.36,0,0]});p.userData.selectId="solar",this.addBox(t,"panel frame top",[1.36,.05,.03],[d,f+.26,u-.67],r,{rotation:[-.36,0,0]}),this.addBox(t,"panel frame bottom",[1.36,.05,.03],[d,f-.26,u+.67],r,{rotation:[-.36,0,0]}),this.addBox(t,"panel frame left",[.03,.05,1.34],[d-.67,f,u],r,{rotation:[-.36,0,0]}),this.addBox(t,"panel frame right",[.03,.05,1.34],[d+.67,f,u],r,{rotation:[-.36,0,0]}),this.addBox(t,"junction box",[.15,.06,.15],[d,f-.05,u],J.rubber,{rotation:[-.36,0,0]})}for(const l of[-.7,.7])for(const c of[-.72,.72]){const d=.82-c*.376+.035;this.addBox(t,"solar clamp",[.05,.06,.08],[l,d,c],J.steel,{rotation:[-.36,0,0]})}const o=this.addBox(t,"solar combiner box",[.36,.44,.18],[1.8,.8,-.74],J.dark);this.addBox(o,"dc isolator rotary switch",[.08,.08,.06],[1.8,.84,-.64],J.red),this.addBox(o,"solar danger label",[.18,.09,.01],[1.8,.72,-.64],J.orange),this.registerGroup("solar",t)}makeController(){const t=new ie;t.position.set(-3.2,.16,-3.2),this.addBox(t,"MPPT cabinet",[1.2,1.62,.62],[0,.92,0],J.dark);const e=new ft({map:this.mpptTexture,roughness:.35,metalness:.3}),n=new K(new Le(1.12,1.54),e);n.position.set(0,.92,.32),t.add(n);const s=new ft({color:"#7a8e9e",roughness:.28,metalness:.85});for(let a=0;a<9;a++){const r=.35+a*.13;this.addBox(t,"heat sink fin",[.05,.025,.54],[-.61,r,0],s),this.addBox(t,"heat sink fin",[.05,.025,.54],[.61,r,0],s)}for(let a=0;a<4;a++)this.addCylinder(t,"cable gland",.035,.035,.08,[-.3+a*.2,.08,.1],J.dark,14);this.registerGroup("mppt",t)}makeBattery(){const t=new ie;t.position.set(-3.2,.16,.5),this.addBox(t,"rack base",[1.52,.14,.92],[0,.07,0],J.dark),this.addBox(t,"rack frame",[1.46,1.35,.86],[0,.78,0],J.dark);const e=new ft({map:this.batteryRackTexture,roughness:.3,metalness:.4}),n=new K(new Le(1.36,1.22),e);n.position.set(0,.78,.44),t.add(n),this.addBox(t,"dc isolator box",[.08,.26,.22],[.74,1.05,0],J.dark),this.addCylinder(t,"isolator rotary handle",.045,.045,.06,[.8,1.05,0],J.red,16).rotation.z=Math.PI/2,this.addBox(t,"battery charge bar frame",[.8,.09,.045],[0,1.44,.45],J.rubber),this.batteryBar=this.addBox(t,"battery charge bar",[.74,.055,.02],[-.02,1.44,.48],J.green),this.registerGroup("battery",t)}makeInverter(){const t=new ie;t.position.set(0,.16,-3.2),this.addBox(t,"inverter body",[1.4,1.78,.72],[0,.98,0],J.white),this.addBox(t,"inverter bezel",[1.25,1.62,.05],[0,.98,.38],J.dark);const e=new K(new Le(.72,.42),new Je({map:this.inverterTexture.texture}));e.position.set(0,1.35,.42),t.add(e);for(let n=0;n<4;n++)this.addBox(t,"keypad button",[.08,.05,.02],[-.22+n*.15,1.05,.42],J.steel);this.addBox(t,"power rocker",[.12,.08,.03],[.35,1.05,.42],J.green),this.addCylinder(t,"cooling fan 1",.16,.16,.04,[-.3,.45,.42],J.dark,20).rotation.x=Math.PI/2,this.addCylinder(t,"cooling fan 2",.16,.16,.04,[.3,.45,.42],J.dark,20).rotation.x=Math.PI/2,this.addBox(t,"warning sticker",[.24,.1,.01],[0,.74,.42],J.orange),this.registerGroup("inverter",t)}makeAts(){const t=new ie;t.position.set(3.2,.16,-3.2),this.addBox(t,"ATS cabinet",[1.2,1.7,.66],[0,.94,0],J.white);const e=new ft({map:this.atsTexture,roughness:.35,metalness:.3}),n=new K(new Le(1.12,1.6),e);n.position.set(0,.94,.34),t.add(n),this.addCylinder(t,"ATS rotary switch",.08,.08,.08,[0,.94,.38],J.dark,18).rotation.x=Math.PI/2,this.atsSwitchLever=this.addBox(t,"switch handle",[.24,.05,.05],[0,.94,.43],J.orange),this.atsUtilityLed=this.addCylinder(t,"ATS utility LED",.05,.05,.03,[-.32,1.15,.36],J.green,16),this.atsUtilityLed.rotation.x=Math.PI/2,this.atsInverterLed=this.addCylinder(t,"ATS inverter LED",.05,.05,.03,[.32,1.15,.36],J.orange,16),this.atsInverterLed.rotation.x=Math.PI/2,this.registerGroup("ats",t)}makeGridSource(){const t=new ie;t.position.set(3.2,0,-6.2),this.addBox(t,"utility plinth",[1.45,.15,.98],[0,.07,0],J.dark),this.addBox(t,"utility pedestal",[.96,1.2,.62],[0,.68,0],J.blue);const e=new ft({map:this.utilityMeterTexture,roughness:.35,metalness:.3}),n=new K(new Le(.86,1.05),e);n.position.set(0,.68,.32),t.add(n),this.gridIndicator=this.addCylinder(t,"utility indicator",.08,.08,.05,[0,1.15,.36],J.green,18),this.gridIndicator.rotation.x=Math.PI/2,this.registerGroup("grid",t)}makeIcu(){const t=new ie;t.position.set(6.2,0,1);const e=new ie;e.position.set(.2,0,1.45),this.addBox(e,"bed base",[2.2,.15,1.1],[0,.18,0],J.dark),this.addCylinder(e,"hydraulic column",.18,.18,.45,[0,.45,0],J.steel,20),this.addBox(e,"bed main frame",[3.18,.16,1.38],[0,.74,0],J.steel),this.addBox(e,"mattress base",[3.08,.16,1.28],[0,.88,0],J.dark),this.addBox(e,"mattress top",[3.05,.14,1.26],[0,1.02,0],new ft({color:"#c2dff2",roughness:.75})),this.addBox(e,"bed linen",[2.1,.05,1.24],[.38,1.08,0],J.white),this.addBox(e,"ergonomic pillow",[.58,.15,.78],[-1.08,1.12,0],J.white);for(const s of[-1.35,1.35])for(const a of[-.55,.55])this.addCylinder(e,"caster fork",.045,.045,.18,[s,.18,a],J.steel,12),this.addCylinder(e,"caster wheel 1",.09,.09,.05,[s,.08,a-.04],J.rubber,16).rotation.z=Math.PI/2,this.addCylinder(e,"caster wheel 2",.09,.09,.05,[s,.08,a+.04],J.rubber,16).rotation.z=Math.PI/2,this.addBox(e,"brake pedal",[.08,.03,.04],[s+.05,.12,a],J.red);for(const s of[-.68,.68])this.addBox(e,"head rail",[1.3,.32,.05],[-.6,1.22,s],J.steel),this.addBox(e,"patient control keypad",[.22,.12,.02],[-.6,1.22,s+(s>0?.03:-.03)],J.blue),this.addBox(e,"foot rail",[1.3,.32,.05],[.8,1.22,s],J.steel);const n=new ie;n.position.set(-1.42,0,-.68),this.addCylinder(n,"iv base",.22,.22,.08,[0,.06,0],J.dark,16),this.addCylinder(n,"iv post",.025,.025,2.1,[0,1.1,0],J.steel,16);for(let s=0;s<2;s++){const a=-.15+s*.3;this.addBox(n,"saline bag",[.12,.24,.06],[a,2.05,0],J.glass),this.addCylinder(n,"drip chamber",.015,.015,.06,[a,1.88,0],J.glass),this.addCylinder(n,"iv tube",.006,.006,.6,[a,1.55,.1],J.glass)}e.add(n),this.makePatient(e),t.add(e),this.makeDeviceUnit(t,"vent",[-1.45,0,-.15],"ventilator"),this.makeDeviceUnit(t,"monitor",[-.1,0,-.28],"monitor"),this.makeDeviceUnit(t,"infusion",[1.15,0,-.2],"pumps"),this.makeDeviceUnit(t,"syringe",[2.15,0,.45],"syringe"),this.makeDeviceUnit(t,"defib",[-1.8,0,1.25],"defib"),this.makeDeviceUnit(t,"incubator",[1.85,0,2.6],"incubator"),this.makeDeviceUnit(t,"oxygen",[-2.1,0,2.8],"oxygen"),this.registerGroup("icu",t)}makePatient(t){const e=new ie;e.name="icu patient character",e.position.set(-.1,1.05,.02);const n=new ft({color:"#dfb59c",roughness:.65,metalness:.04}),s=new ft({color:"#c79275",roughness:.7}),a=new ft({color:"#2b211a",roughness:.85}),r=new ft({color:"#458599",roughness:.75}),o=new ft({color:"#e2e8f0",roughness:.8}),l=new ft({color:"#274b62",roughness:.85}),c=new ft({color:"#f8fafc",roughness:.9}),d=new ft({color:"#e2e8f0",roughness:.85}),u=new ft({color:"#facc15",roughness:.4}),f=new jm({color:"#93c5fd",transmission:.85,opacity:.65,transparent:!0,roughness:.25,ior:1.45}),p=new ft({color:"#64748b",roughness:.6}),g=new ft({color:"#ffffff",roughness:.35}),v=new ft({color:"#e0f2fe",transparent:!0,opacity:.6,roughness:.3}),m=new ft({color:"#0284c7",roughness:.4}),h=new ie;h.position.set(-.98,.16,0);const T=new K(new We(.165,24,20),n);T.scale.set(1.1,.98,.92),h.add(T);const M=new K(new ee(.11,.08,.12,16),n);M.position.set(.08,-.06,0),M.rotation.z=Math.PI/6,h.add(M);const b=new K(new We(.174,24,16,0,Math.PI*2,0,Math.PI*.56),a);b.rotation.z=-.15,b.position.set(-.02,.02,0),h.add(b);const D=new K(new We(.17,18,14),a);D.scale.set(.9,.8,.96),D.position.set(-.06,-.01,0),h.add(D);for(const F of[-.15,.15]){const G=new K(new Lt(.04,.08,.02),a);G.position.set(.02,-.01,F),h.add(G)}const A=new K(new Lt(.055,.04,.032),s);A.position.set(.155,.035,0),A.rotation.z=-.3,h.add(A);for(const F of[-.055,.055]){const G=new K(new ee(.007,.007,.032,8),s);G.rotation.x=Math.PI/2,G.position.set(.125,.075,F),h.add(G);const j=new K(new ee(.006,.006,.04,8),a);j.rotation.x=Math.PI/2,j.position.set(.13,.105,F),h.add(j)}const R=new K(new Lt(.03,.018,.055),s);R.position.set(.145,-.045,0),h.add(R);for(const F of[-.155,.155]){const G=new K(new We(.038,12,10),n);G.scale.set(.6,1.2,.4),G.position.set(-.01,.02,F),h.add(G)}const L=new K(new no(.09,.12,16),f);L.rotation.z=-Math.PI/2-.2,L.scale.set(.8,1,1.15),L.position.set(.17,-.01,0),h.add(L);const S=new K(new ee(.018,.018,.05,12),J.steel);S.rotation.z=Math.PI/2,S.position.set(.24,-.01,0),h.add(S);const x=new K(new Gi(.165,.006,8,24),p);x.rotation.y=Math.PI/2,x.rotation.x=.2,x.position.set(.02,.02,0),h.add(x),e.add(h);const C=new K(new ee(.088,.1,.14,16),n);C.position.set(-.79,.11,0),C.rotation.z=Math.PI/2,e.add(C);const B=new ie;B.position.set(-.48,.12,0);const k=new K(new Lt(.48,.22,.56),r);k.position.set(0,0,0),B.add(k);const q=new K(new Lt(.18,.015,.025),o);q.position.set(-.16,.115,-.08),q.rotation.y=-.4,B.add(q);const Y=new K(new Lt(.18,.015,.025),o);Y.position.set(-.16,.115,.08),Y.rotation.y=.4,B.add(Y);const H=new K(new Lt(.08,.008,.055),J.white);H.position.set(-.06,.115,-.16),B.add(H);const Q=new K(new Lt(.075,.009,.015),J.blue);Q.position.set(-.06,.116,-.16),B.add(Q),[{x:-.1,z:-.16,color:"#ef4444"},{x:-.1,z:.16,color:"#eab308"},{x:.12,z:.18,color:"#22c55e"}].forEach(F=>{const G=new K(new ee(.022,.022,.008,12),J.white);G.position.set(F.x,.115,F.z),B.add(G);const j=new K(new ee(.008,.008,.012,8),J.steel);j.position.set(F.x,.12,F.z),B.add(j);const Z=new K(new Lt(.12,.006,.006),new ft({color:F.color}));Z.position.set(F.x-.06,.122,F.z),Z.rotation.y=-.3,B.add(Z)}),e.add(B),this.patientChest=B,this.patientChestBaseY=.12;const it=new K(new Lt(.38,.2,.52),r);it.position.set(-.12,.1,0),e.add(it);const nt=new K(new Lt(.32,.19,.5),r);nt.position.set(.18,.09,0),e.add(nt);for(const F of[-.34,.34]){const G=new K(new ee(.095,.085,.22,16),r);G.position.set(-.48,.08,F),G.rotation.z=Math.PI/2,e.add(G)}const ot=new K(new ee(.062,.055,.32,12),n);ot.position.set(-.35,.06,.34),ot.rotation.z=Math.PI/2,e.add(ot);const Ct=new K(new ee(.055,.046,.38,12),n);Ct.position.set(-.02,.055,.33),Ct.rotation.z=Math.PI/2,e.add(Ct);const Wt=new K(new ee(.05,.05,.04,16),g);Wt.position.set(.14,.055,.32),Wt.rotation.z=Math.PI/2,e.add(Wt);const X=new K(new Lt(.025,.045,.015),J.dark);X.position.set(.14,.08,.32),e.add(X);const tt=new K(new Lt(.11,.038,.075),n);tt.position.set(.23,.05,.31),e.add(tt);const ht=new K(new Lt(.07,.028,.068),n);ht.position.set(.31,.042,.31),e.add(ht);const rt=new K(new Lt(.06,.006,.045),v);rt.position.set(.23,.072,.31),e.add(rt);const bt=new K(new ee(.008,.008,.035,8),m);bt.position.set(.23,.078,.31),bt.rotation.z=Math.PI/2,e.add(bt);const At=new Qn([new E(.22,.085,.31),new E(.05,.22,.38),new E(-.45,.45,.25),new E(-1.1,.95,-.4)]),Ut=new K(new yn(At,28,.005,6,!1),J.glass);e.add(Ut);const Bt=new K(new ee(.062,.055,.32,12),n);Bt.position.set(-.35,.06,-.34),Bt.rotation.z=Math.PI/2,e.add(Bt);const Nt=new K(new ee(.055,.046,.38,12),n);Nt.position.set(-.02,.055,-.33),Nt.rotation.z=Math.PI/2,e.add(Nt);const jt=new K(new Lt(.11,.038,.075),n);jt.position.set(.23,.05,-.31),e.add(jt);const P=new K(new Lt(.07,.028,.068),n);P.position.set(.31,.042,-.31),e.add(P);const Zt=new K(new Lt(.042,.035,.022),J.dark);Zt.position.set(.31,.058,-.325),e.add(Zt);const kt=new K(new We(.008,8,8),new ft({color:"#ef4444",emissive:"#ef4444",emissiveIntensity:.8}));kt.position.set(.31,.074,-.325),e.add(kt),this.spo2SensorLed=kt;const qt=new Qn([new E(.31,.065,-.325),new E(.25,.15,-.36),new E(.05,.35,-.34),new E(-.08,.7,-.3)]),Rt=new K(new yn(qt,20,.004,6,!1),J.dark);e.add(Rt);const Yt=new ie;Yt.position.set(0,0,0);const Pt=new K(new Lt(.12,.06,.76),c);Pt.position.set(-.16,.18,0),Yt.add(Pt);const w=new K(new Lt(.68,.19,.78),l);w.position.set(.24,.16,0),Yt.add(w);const _=new K(new Lt(.66,.16,.74),l);_.position.set(.85,.13,0),Yt.add(_);for(const F of[-.41,.41]){const G=new K(new Lt(1.36,.12,.06),l);G.position.set(.55,.08,F),Yt.add(G)}e.add(Yt),this.patientBlanket=Yt,this.patientBlanketBaseY=0;for(const F of[-.15,.15]){const G=new ie;G.position.set(1.22,.07,F),G.rotation.x=F>0?.22:-.22;const j=new K(new ee(.048,.044,.14,12),d);j.rotation.z=Math.PI/2,G.add(j);const Z=new K(new Lt(.16,.09,.082),d);Z.position.set(.06,.04,0),G.add(Z);for(let St=0;St<3;St++){const dt=new K(new Lt(.035,.005,.06),u);dt.position.set(.01+St*.045,-.008,0),G.add(dt)}e.add(G)}e.traverse(F=>{F.isMesh&&(F.castShadow=!0,F.receiveShadow=!0)}),t.add(e)}makeDeviceUnit(t,e,n,s){const a=new ie;a.position.set(...n),a.userData.selectId=e,a.userData.selectType="device";let r;if(s==="ventilator"){this.addBox(a,"vent trolley base",[.78,.16,.58],[0,.82,0],J.dark),this.addBox(a,"vent trolley body",[.65,.82,.48],[0,1.3,0],J.white),this.addBox(a,"vent front panel",[.58,.7,.05],[0,1.3,.25],J.blue),r=new K(new Le(.48,.32),new Je({map:this.ventTexture.texture})),r.position.set(0,1.58,.28),a.add(r),this.addCylinder(a,"humidifier chamber",.09,.09,.16,[.22,1.05,.28],J.glass,16);const o=new ft({color:"#5b98d6",roughness:.6}),l=new Qn([new E(-.15,1.15,.28),new E(-.25,1.3,.5),new E(.2,1.35,.9),new E(.5,1.2,1.3)]),c=new K(new yn(l,32,.022,8,!1),o);a.add(c);for(let d=0;d<3;d++)this.addBox(a,"vent knob",[.08,.08,.045],[-.16+d*.16,1.13,.29],J.steel);this.addCylinder(a,"vent caster",.07,.07,.09,[-.22,.07,0],J.rubber,12).rotation.z=Math.PI/2,this.addCylinder(a,"vent caster",.07,.07,.09,[.22,.07,0],J.rubber,12).rotation.z=Math.PI/2}else if(s==="monitor")this.addBox(a,"monitor stand",[.56,.08,.38],[0,.82,0],J.steel),this.addBox(a,"monitor neck",[.1,.44,.1],[0,1.04,0],J.steel),this.addBox(a,"monitor casing",[.88,.64,.18],[0,1.48,0],J.dark),this.addBox(a,"alarm light bar",[.65,.04,.08],[0,1.82,0],J.green),r=new K(new Le(.8,.54),new Je({map:this.ecgTexture.texture})),r.position.set(0,1.48,.1),a.add(r);else if(s==="pumps"){for(let o=0;o<2;o++)this.addBox(a,"pump unit",[.35,.66,.32],[-.22+o*.44,1.06,0],J.white),r=this.addBox(a,"pump screen",[.24,.17,.035],[-.22+o*.44,1.2,.18],J.glass),this.addBox(a,"pump button",[.12,.055,.025],[-.22+o*.44,.96,.18],J.green),this.addBox(a,"pump clamp",[.09,.09,.09],[-.22+o*.44,1.43,-.08],J.steel);this.addBox(a,"pole",[.05,1.85,.05],[0,.92,-.22],J.steel),this.addCylinder(a,"pump base",.45,.45,.09,[0,.08,-.22],J.dark,20)}else s==="syringe"?(this.addBox(a,"syringe body",[.7,.29,.4],[0,.96,0],J.white),r=this.addBox(a,"syringe screen",[.28,.13,.035],[-.08,1,.22],J.glass),this.addCylinder(a,"syringe barrel",.075,.075,.36,[.12,1.19,-.04],J.steel,16).rotation.z=Math.PI/2,this.addBox(a,"syringe plunger",[.16,.04,.05],[.36,1.19,-.04],J.steel),this.addBox(a,"syringe stand",[.1,.74,.1],[0,.45,-.12],J.steel)):s==="defib"?(this.addBox(a,"defib trolley",[.75,.18,.58],[0,.88,0],J.dark),this.addBox(a,"defib case",[.78,.76,.54],[0,1.34,0],J.white),r=this.addBox(a,"defib screen",[.48,.3,.05],[0,1.48,.3],J.glass),this.addBox(a,"defib pads",[.15,.14,.05],[-.2,1.13,.3],J.orange),this.addBox(a,"defib pads",[.15,.14,.05],[.2,1.13,.3],J.orange),this.addCylinder(a,"defib wheel",.08,.08,.08,[-.24,.07,0],J.rubber,12).rotation.z=Math.PI/2,this.addCylinder(a,"defib wheel",.08,.08,.08,[.24,.07,0],J.rubber,12).rotation.z=Math.PI/2):s==="incubator"?(this.addBox(a,"incubator base",[1.12,.28,.8],[0,.85,0],J.white),this.addBox(a,"incubator lower",[.75,.56,.54],[0,1.24,0],J.blue),this.addBox(a,"incubator transparent hood",[.94,.62,.62],[0,1.78,0],J.glass),this.addBox(a,"incubator mattress",[.82,.06,.5],[0,1.5,0],J.white),r=this.addBox(a,"incubator display",[.35,.16,.04],[.3,1.04,.29],J.glass)):s==="oxygen"&&(this.addBox(a,"oxygen body",[.76,1.2,.6],[0,.78,0],J.white),this.addBox(a,"oxygen front",[.62,1,.05],[0,.78,.32],J.blue),r=this.addBox(a,"oxygen screen",[.35,.21,.04],[0,1.06,.36],J.glass),this.addBox(a,"oxygen vent",[.4,.07,.025],[0,.65,.36],J.rubber),this.addCylinder(a,"oxygen wheel",.07,.07,.08,[-.22,.07,0],J.rubber,12).rotation.z=Math.PI/2,this.addCylinder(a,"oxygen wheel",.07,.07,.08,[.22,.07,0],J.rubber,12).rotation.z=Math.PI/2);a.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.receiveShadow=!0,o.userData.selectId=e,o.userData.selectType="device")}),r&&this.deviceScreens.set(e,r),this.groups.set(e,a),t.add(a)}addLabel(t,e,n,s){const a=document.createElement("canvas");a.width=512,a.height=128;const r=a.getContext("2d");r.fillStyle="rgba(7,17,31,0.88)",this.roundRect(r,5,5,502,118,24),r.fill(),r.strokeStyle="rgba(74,134,187,0.75)",r.lineWidth=3,r.stroke(),r.fillStyle="#e8f3ff",r.font="700 38px Tajawal, Arial, sans-serif",r.textAlign="center",r.textBaseline="middle",r.direction="rtl",r.fillText(e,256,64,470);const o=new en(a);o.colorSpace=ge;const l=new Im(new uc({map:o,transparent:!0,depthWrite:!1}));l.position.copy(n),l.scale.set(s,s*.25,1),l.userData.isLabel=!0,l.userData.selectId=t,this.scene.add(l);const c=this.groups.get(t);c&&(c.userData.labelSprite=l)}roundRect(t,e,n,s,a,r){t.beginPath(),t.moveTo(e+r,n),t.arcTo(e+s,n,e+s,n+a,r),t.arcTo(e+s,n+a,e,n+a,r),t.arcTo(e,n+a,e,n,r),t.arcTo(e,n,e+s,n,r),t.closePath()}buildPowerPaths(){this.pathDots=[],this.pathMeshes=[],this.socketLeds=new Map,this.cableGroup=new ie,this.scene.add(this.cableGroup);const t=new ie;t.position.set(4.8,.72,.5);const e=new ft({color:"#132337",roughness:.35,metalness:.55}),n=new K(new Lt(.96,.58,.16),e);t.add(n);const s=new ft({color:"#8faec7",roughness:.25,metalness:.85}),a=new K(new Lt(.98,.6,.03),s);a.position.set(0,0,-.065),t.add(a);const r=new ft({map:this.medicalConsoleTexture,roughness:.3,metalness:.2}),o=new K(new Le(.92,.54),r);o.position.set(0,0,.082),t.add(o);const l=new ft({color:"#b0c4de",roughness:.2,metalness:.9}),c=new K(new Lt(.12,.68,.12),l);c.position.set(0,-.38,0),t.add(c);const d=new K(new Lt(.34,.03,.34),J.dark);d.position.set(0,-.71,0),t.add(d);const u=je([0,-.3,0],[0,0,0],1.1,!0);t.add(u);const f=new ft({color:"#ffd700",roughness:.3,metalness:.85});for(let A=0;A<3;A++){const R=new K(new ee(.012,.012,.035,12),f);R.rotation.z=Math.PI/2,R.position.set(.485,-.15+A*.08,.02),t.add(R)}this.icuDistLed=new K(new ee(.026,.026,.028,16),new ft({color:"#33d6a6",emissive:"#33d6a6",emissiveIntensity:.95})),this.icuDistLed.rotation.x=Math.PI/2,this.icuDistLed.position.set(.38,.21,.085),t.add(this.icuDistLed);const p=["vent","monitor","infusion","syringe","defib","incubator","oxygen"],g=-.39,v=.13;p.forEach((A,R)=>{const L=g+R*v,S=new ft({color:A==="vent"||A==="defib"?"#ef4444":"#10b981",roughness:.3}),x=new K(new Gi(.028,.005,8,16),S);x.position.set(L,-.14,.084),t.add(x);const C=new K(new ee(.009,.009,.016,12),new ft({color:"#2cd89f",emissive:"#2cd89f",emissiveIntensity:.95}));C.rotation.x=Math.PI/2,C.position.set(L,-.09,.085),t.add(C),this.socketLeds.set(A,C);const B=w0([L,-.14,.105],[0,0,0],"#182432");t.add(B)}),this.cableGroup.add(t),this.cableGroup.add(je([-4.4,.7,-3.9],[0,0,Math.PI/2],1,!0)),this.cableGroup.add(je([-3.4,.28,-3.1],[0,0,0],1.1,!0)),this.cableGroup.add(je([-3,.28,-3.1],[0,0,0],1.1,!0)),this.cableGroup.add(je([-2.5,.75,.5],[0,0,Math.PI/2],1.2,!0)),this.cableGroup.add(je([-.35,.28,-3.1],[0,0,0],1.25,!1)),this.cableGroup.add(je([.35,.28,-3.1],[0,0,0],1.25,!1)),this.cableGroup.add(je([2.85,.28,-3.1],[0,0,0],1.2,!1)),this.cableGroup.add(je([3.2,.28,-3.4],[0,0,0],1.2,!0)),this.cableGroup.add(je([3.55,.28,-3.1],[0,0,0],1.2,!1)),this.cableGroup.add(je([3.2,.28,-5.9],[0,0,0],1.2,!0)),this.cableGroup.add(jn([4.75,.65,.85],[0,0,0])),this.cableGroup.add(jn([6.1,.85,.72],[0,0,0])),this.cableGroup.add(jn([7.35,.72,.8],[0,0,0])),this.cableGroup.add(jn([8.35,.62,1.45],[0,0,0])),this.cableGroup.add(jn([4.4,.72,2.25],[0,0,0])),this.cableGroup.add(jn([8.05,.68,3.6],[0,0,0])),this.cableGroup.add(jn([4.1,.65,3.8],[0,0,0])),this.cableTrays=new ie,this.cableTrays.add(ss([-4.5,.26,-2.6],[3.6,.26,-2.6],.28,.05,.28)),this.cableTrays.add(ss([-3,.26,-2.6],[-3,.26,.45],.24,.05,.28)),this.cableTrays.add(ss([3.2,.26,-5.9],[3.2,.26,-3.2],.22,.05,.28)),this.cableTrays.add(ss([3.55,.26,-2.6],[4.15,.26,-1.2],.2,.045,.28)),this.cableTrays.add(ss([4.15,.26,-1.2],[4.8,.26,.45],.2,.045,.28)),this.cableGroup.add(this.cableTrays),[[-4.1,.29,-2.6],[-3.4,.29,-2.6],[-1.8,.29,-2.6],[-3,.29,-2],[-3,.29,-1.1],[-3,.29,-.2],[-1.8,.29,-1],[-1,.29,-1.8],[1,.29,-2.6],[1.8,.29,-2.6],[3.2,.29,-5.1],[3.2,.29,-4.2],[3.85,.29,-1.9],[4.45,.29,-.4]].forEach(A=>this.cableGroup.add(A0(A))),this.cableGroup.add(Rl([-4.4,.5,-3.6],[0,0,Math.PI/4],!0)),this.cableGroup.add(Rl([-4.4,.5,-3.66],[0,0,Math.PI/4],!1)),this.cableGroup.add(Gs([-2.5,.78,.52],[0,0,Math.PI/2],!0)),this.cableGroup.add(Gs([-2.5,.71,.52],[0,0,Math.PI/2],!1)),this.cableGroup.add(Gs([-.38,.28,-3.1],[0,0,0],!0)),this.cableGroup.add(Gs([-.32,.28,-3.1],[0,0,0],!1));const h=[new E(5.28,.57,.52),new E(5.45,.35,.52),new E(5.45,.18,.52),new E(5.1,.14,.52),new E(4.8,.12,.52)],T=new Qn(h),M=new K(new yn(T,32,.012,8,!1),new ft({color:"#16a34a",roughness:.5}));this.cableGroup.add(M),this.cableTags=[];const b=(A,R,L,S)=>{const x=C0(A,R,L,S);this.cableGroup.add(x),this.cableTags.push(x)};b("سلسلة PV الشمسية · 94.2V","SOLAR PV · 2400 Wp",[-3.9,.45,-2.55],"#38bdf8"),b("شحن البطارية · 48V DC","MPPT CHARGE BUS · 80A",[-3,.45,-1.3],"#10b981"),b("ناقل البطارية للعاكس · 48V","BATTERY HEAVY BUS · 200A",[-1.7,.45,-1.2],"#f59e0b"),b("خرج العاكس AC 230V","INVERTER PURE SINE · 2000W",[1.4,.45,-2.55],"#10b981"),b("تغذية الشبكة العامة · 230V","UTILITY GRID FEEDER · 32A",[3.2,.45,-4.6],"#38bdf8"),b("الخط الطبي الرئيسي IPS · 230V","ICU ISOLATED TRUNK · IT SYSTEM",[4.3,.45,-1],"#34d399"),b("جهاز التنفس · 350W","VENTILATOR · CRITICAL",[4.6,.75,.85],"#38bdf8"),b("مراقب المؤشرات · 60W","PATIENT MONITOR · VITAL",[5.6,.88,.72],"#34d399"),b("مضخات المحاليل · 60W","INFUSION PUMPS ×2",[6.8,.75,.8],"#38bdf8"),b("مضخة الحقن · 25W","SYRINGE PUMP · 25W",[7.8,.68,1.45],"#34d399"),b("مزيل الرجفان · 200W","DEFIBRILLATOR · CRASH CART",[4.5,.75,1.8],"#f59e0b"),b("حاضنة الأطفال · 400W","INFANT INCUBATOR · 400W",[7.4,.72,3.2],"#38bdf8"),b("مركّز الأوكسجين · 300W","OXYGEN CONCENTRATOR · 300W",[4.2,.7,3.4],"#60a5fa");const D=(A,R,L,S,x=7,C=null,B={})=>{const k=new Qn(R.map(ht=>new E(...ht))),q=S==="dc"||S==="battery",Y=C?.016:S==="battery"?.034:.026;let H="#1e293b",Q=.45,W=.65;C?(Q=.8,W=.12,C==="vent"?H="#0f766e":C==="monitor"?H="#334155":C==="infusion"||C==="syringe"?H="#94a3b8":C==="defib"?H="#c2410c":C==="incubator"?H="#1d4ed8":C==="oxygen"&&(H="#475569")):S==="dc"?H="#0f172a":S==="battery"?H="#1e293b":S==="grid"?H="#1e3a8a":S==="ac"&&(H=A==="inverter-ats"?"#c2410c":"#0f766e");const it=new yn(k,72,Y,10,!1),nt=new ft({color:H,roughness:Q,metalness:W}),ot=new K(it,nt);if(ot.receiveShadow=!0,ot.castShadow=!0,ot.userData.selectId=A,ot.userData.selectType="cable",ot.userData.cableSpec=B,this.cableGroup.add(ot),q&&!C){const ht=R.map(Bt=>[Bt[0],Bt[1]+.015,Bt[2]+.015]),rt=new Qn(ht.map(Bt=>new E(...Bt))),bt=new yn(rt,72,Y*.75,8,!1),At=new ft({color:"#dc2626",roughness:.5,metalness:.2}),Ut=new K(bt,At);Ut.userData.selectId=A,Ut.userData.selectType="cable",this.cableGroup.add(Ut)}const Ct=Y*1.35,Wt=new yn(k,72,Ct,10,!1),X=new ft({color:L,emissive:L,emissiveIntensity:.85,transparent:!0,opacity:.65,roughness:.15,metalness:.1,blending:Pi,depthWrite:!1}),tt=new K(Wt,X);tt.userData.pathId=A,tt.userData.medium=S,tt.userData.deviceId=C,tt.userData.selectId=A,tt.userData.selectType="cable",tt.userData.cableSpec=B,this.cableGroup.add(tt),this.pathMeshes.push(tt);for(let ht=0;ht<x;ht++){const rt=ht/x,bt=C?.03:.044,At=new K(new We(bt,12,10),new Je({color:"#ffffff"}));At.userData.curve=k,At.userData.pathId=A,At.userData.medium=S,At.userData.deviceId=C,At.userData.phase=rt,this.cableGroup.add(At),this.pathDots.push(At);const Ut=bt*2,Bt=new K(new We(Ut,12,10),new Je({color:L,transparent:!0,opacity:.72,blending:Pi,depthWrite:!1}));Bt.userData.curve=k,Bt.userData.pathId=A,Bt.userData.medium=S,Bt.userData.deviceId=C,Bt.userData.phase=rt,Bt.userData.isAura=!0,this.cableGroup.add(Bt),this.pathDots.push(Bt);const Nt=new K(new We(bt*.75,8,8),new Je({color:L,transparent:!0,opacity:.48,blending:Pi,depthWrite:!1}));Nt.userData.curve=k,Nt.userData.pathId=A,Nt.userData.medium=S,Nt.userData.deviceId=C,Nt.userData.phase=rt-.02,this.cableGroup.add(Nt),this.pathDots.push(Nt);const jt=new K(new We(bt*.5,8,8),new Je({color:L,transparent:!0,opacity:.25,blending:Pi,depthWrite:!1}));jt.userData.curve=k,jt.userData.pathId=A,jt.userData.medium=S,jt.userData.deviceId=C,jt.userData.phase=rt-.038,this.cableGroup.add(jt),this.pathDots.push(jt)}return tt};this.cables=[D("pv-mppt",[[-4.4,.7,-3.9],[-4.4,.45,-3.4],[-4.4,.29,-2.6],[-3.8,.29,-2.6],[-3.4,.29,-2.85],[-3.4,.28,-3.1]],"#38bdf8","dc",8,null,{title:"سلسلة الألواح الشمسية (DC PV String)",en:"Solar PV String Feeder",voltage:"94.2 V DC (Vmp)",standard:"EN 50618 (PV1-F 2x6mm²)",insulation:"Double Insulated Cross-Linked Polyolefin (1000V DC / UV Resistant)",category:"توليد شمسي DC",protection:"قواطع تيار مستمر DC Breaker + مانع صواعق SPD Type II"}),D("mppt-battery",[[-3,.28,-3.1],[-3,.29,-2.6],[-3,.29,-1.3],[-3,.29,.1],[-2.8,.45,.45],[-2.5,.75,.5]],"#10b981","dc",8,null,{title:"ناقل شحن بنك البطاريات (48V Heavy Charge Bus)",en:"MPPT to Battery Charge Bus",voltage:"48.0 V - 54.6 V DC",standard:"H07RN-F 2x35mm² Heavy Flexible",insulation:"EPR Rubber / Heavy Duty Neoprene Sheath (80A Rating)",category:"شحن البطارية DC",protection:"فيوز حماية فائق السرعة DC Fuse 100A"}),D("battery-inverter",[[-2.5,.68,.5],[-2.75,.32,.3],[-2.75,.32,-1.1],[-2.75,.32,-2.52],[-1.4,.32,-2.52],[-.35,.3,-2.8],[-.35,.28,-3.1]],"#f59e0b","battery",9,null,{title:"ناقل القدرة الرئيسي من البطارية للعاكس (48V Heavy DC Bus)",en:"Battery to Hybrid Inverter Heavy Bus",voltage:"48.0 V DC Nominal (42V - 58.4V)",standard:"BS 6883 / H01N2-D 2x70mm² Extra-Flex Copper",insulation:"High-Current Welding Grade Synthetic Rubber (200A Continuous)",category:"تغذية البطارية للعاكس DC",protection:"قاطع عزل دوار DC Isolator + قاطع حراري مغناطيسي 250A"}),D("inverter-ats",[[.35,.28,-3.1],[.35,.29,-2.6],[1.6,.29,-2.6],[2.85,.29,-2.85],[2.85,.28,-3.1]],"#10b981","ac",7,null,{title:"خرج العاكس لمفتاح التحويل (Source B - Emergency AC)",en:"Hybrid Inverter Pure Sine AC Output",voltage:"230 V AC ±2% (50 Hz Pure Sine Wave)",standard:"BS EN 50525 / H07VV-F 3G4mm² Armored Flex",insulation:"Corrugated Steel Flex Shielded Conduit (THD < 3%)",category:"طاقة العاكس الاحتياطية AC",protection:"قاطع تفاضلي طبي Type B RCD + MCB 16A Curve C"}),D("grid-ats",[[3.2,.28,-5.9],[3.2,.29,-5],[3.2,.29,-4.2],[3.2,.29,-3.6],[3.2,.28,-3.4]],"#38bdf8","grid",8,null,{title:"تغذية الشبكة العامة لمفتاح التحويل (Source A - Utility Grid)",en:"Utility Grid Main AC Feeder",voltage:"230 V AC Nominal (50 Hz Single Phase)",standard:"IEC 60502-1 NYY-J 3G6mm² Industrial Heavy Duty",insulation:"PVC Insulated Armored Surface Cable (32A Rating)",category:"مصدر الشبكة العمومية AC",protection:"قاطع رئيسي 32A + مانع صواعق الشبكة SPD Type I+II"}),D("ats-icu",[[3.55,.28,-3.1],[3.55,.29,-2.6],[4.15,.29,-1.2],[4.8,.29,-.1],[4.8,.3,.45],[4.8,.42,.5]],"#34d399","ac",9,null,{title:"الخط الرئيسي لوحدة التوزيع السريرية (Hospital IPS Trunk Feeder)",en:"ICU Isolated Power Supply (IPS) Feeder Trunk",voltage:"230 V AC Isolated IT System (نظام عزل طبي)",standard:"IEC 60364-7-710 / BS EN 50525-3-11 LSZH 3G6mm²",insulation:"Low Smoke Zero Halogen (LSZH) + Medical Braided Shield",category:"تغذية العناية المركزة المعزولة AC",protection:"نظام مراقبة العزل الطبي Insulation Monitoring Device (IMD)"}),D("branch-vent",[[4.41,.58,.58],[4.48,.38,.68],[4.58,.26,.76],[4.68,.42,.82],[4.75,.65,.85]],"#38bdf8","ac",6,"vent",{title:"كابل تغذية جهاز التنفس الاصطناعي (Mechanical Ventilator)",en:"Hospital-Grade Power Cord - Ventilator",voltage:"230 V AC / 350 W Load",standard:"UL 817 / IEC 60320-1 SJT 3x1.5mm² Hospital Grade",insulation:"Medical Antimicrobial Silicone Jacket with Green Dot Grounding",category:"دعم حياة حرج (Life Support Critical)",protection:"مقبس أحمر مخصص غير قابل للفصل العرضي"}),D("branch-monitor",[[4.54,.58,.58],[4.9,.45,.65],[5.45,.32,.7],[5.85,.55,.71],[6.1,.85,.72]],"#34d399","ac",5,"monitor",{title:"كابل شاشة مراقبة المؤشرات الحيوية (Patient Monitor)",en:"Hospital-Grade Power Cord - Monitor",voltage:"230 V AC / 60 W Load",standard:"SJT 3x1.0mm² Hospital Grade with Molded Strain Relief",insulation:"Medical Grey Flexible PVC",category:"مراقبة حيوية مستمرة",protection:"مقبس عناية قياسي أخضر مع تأريض متساوي الجهد"}),D("branch-infusion",[[4.67,.58,.58],[5.3,.42,.66],[6.1,.28,.72],[6.8,.45,.76],[7.35,.72,.8]],"#38bdf8","ac",5,"infusion",{title:"كابل مضخات المحاليل الوريدية (Infusion Pumps ×2)",en:"Hospital-Grade Power Cord - Infusion Pumps",voltage:"230 V AC / 60 W Load",standard:"SJT 3x1.0mm² Medical Flex Cord",insulation:"Clean White Hospital Grade Jacket",category:"ضخ محاليل وريدية حرجة",protection:"مقبس عناية قياسي أخضر"}),D("branch-syringe",[[4.8,.58,.58],[5.6,.4,.75],[6.6,.28,.95],[7.5,.3,1.2],[8.05,.48,1.35],[8.35,.62,1.45]],"#34d399","ac",5,"syringe",{title:"كابل مضخة الحقن الدقيق (Precision Syringe Pump)",en:"Hospital-Grade Power Cord - Syringe Pump",voltage:"230 V AC / 25 W Load",standard:"SJT 3x0.75mm² Medical Grade Cord",insulation:"Clean White Medical Flex",category:"حقن دوائي ميكروي",protection:"مقبس عناية قياسي أخضر"}),D("branch-defib",[[4.93,.58,.58],[4.75,.4,1],[4.55,.28,1.5],[4.45,.45,1.9],[4.4,.72,2.25]],"#f59e0b","ac",6,"defib",{title:"كابل جهاز الصدمات والإنعاش القلبي (Defibrillator Crash Cart)",en:"Hospital-Grade Power Cord - Defibrillator",voltage:"230 V AC / 200 W (شحن سريع للمكثفات)",standard:"SJTW 3x1.5mm² High-Current Silicone Flex",insulation:"Vivid Safety Orange Medical Rubber",category:"إنعاش قلبي طارئ",protection:"مقبس أحمر مخصص لطوارئ الإنعاش"}),D("branch-incubator",[[5.06,.58,.58],[5.8,.42,1.1],[6.7,.28,1.9],[7.4,.3,2.8],[7.85,.48,3.3],[8.05,.68,3.6]],"#38bdf8","ac",6,"incubator",{title:"كابل حاضنة الأطفال حديثي الولادة (Infant Incubator)",en:"Hospital-Grade Power Cord - Incubator",voltage:"230 V AC / 400 W (تدفئة وتنظيم حراري)",standard:"SJT 3x1.5mm² Thermal-Resistant Hospital Grade",insulation:"Medical Royal Blue Heavy Flex",category:"رعاية حديثي الولادة الحرجة",protection:"مقبس أزرق مخصص مع مراقبة تسريب تيار فائقة الحساسية"}),D("branch-oxygen",[[5.19,.58,.58],[4.85,.42,1.2],[4.45,.28,2.1],[4.25,.3,3.1],[4.15,.45,3.55],[4.1,.65,3.8]],"#60a5fa","ac",6,"oxygen",{title:"كابل مركّز الأوكسجين الطبي (Oxygen Concentrator)",en:"Hospital-Grade Power Cord - Oxygen Concentrator",voltage:"230 V AC / 300 W (محرك ضاغط طبي)",standard:"Heavy-Duty SJT 3x1.5mm² Medical Grade",insulation:"Medical Heavy Blue Flex",category:"توليد أكسجين مستمر",protection:"مقبس أزرق مع حماية ضد تيار البدء"})]}attachEvents(){this.pointerDown=t=>{const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.scene.children,!0).filter(o=>!o.object.userData.isLabel&&o.object.userData.selectId);if(!n.length)return;const s=n[0].object,a=s.userData.selectId,r=s.userData.selectType||(dn.some(o=>o.id===a)?"device":"component");this.select(a),this.onSelect(a,r)},this.renderer.domElement.addEventListener("pointerdown",this.pointerDown),this.renderer.domElement.addEventListener("pointermove",t=>{const e=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(t.clientX-e.left)/e.width*2-1,this.pointer.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const n=this.raycaster.intersectObjects(this.scene.children,!0).filter(s=>s.object.userData.selectId&&!s.object.userData.isLabel);this.renderer.domElement.style.cursor=n.length?"pointer":"grab"})}select(t){this.selectedId=t;for(const[e,n]of this.groups){const s=e===t||t==="icu"&&e==="icu";n.traverse(a=>{a.isMesh&&a.material&&a.material.emissive&&(a.userData.baseEmissive||(a.userData.baseEmissive=a.material.emissive.clone()),a.material.emissive.copy(s?new zt("#2582bf"):a.userData.baseEmissive),a.material.emissiveIntensity=s?.55:a.material.emissiveIntensity||.1)})}this.pathMeshes&&this.pathMeshes.forEach(e=>{e.userData.pathId===t?(e.scale.set(1.45,1.45,1),e.material&&e.material.emissive&&(e.material.emissiveIntensity=1.4)):e.scale.set(1,1,1)})}animateCameraTo(t,e,n=1200){const s=this.camera.position.clone(),a=this.controls.target.clone(),r=performance.now();this.cameraAnimation&&cancelAnimationFrame(this.cameraAnimation);const o=l=>{const c=l-r,d=Math.min(c/n,1),u=d<.5?4*d*d*d:1-Math.pow(-2*d+2,3)/2;this.camera.position.lerpVectors(s,t,u),this.controls.target.lerpVectors(a,e,u),this.controls.update(),d<1?this.cameraAnimation=requestAnimationFrame(o):this.cameraAnimation=null};this.cameraAnimation=requestAnimationFrame(o)}setView(t){const e=this.camera.aspect<1,n={overview:{pos:e?new E(15.5,13,16.5):new E(12.5,10.5,13.5),target:new E(.5,.8,-.8)},power:{pos:e?new E(-1,7.8,8.5):new E(-1,6.2,6.8),target:new E(-2.2,1.2,-2.5)},medical:{pos:e?new E(10.8,6.5,7):new E(9.2,5,5.5),target:new E(6.2,1.3,1)},top:{pos:e?new E(.1,26,-.5):new E(.1,19.5,-.5),target:new E(0,0,-.5)}},s=n[t]||n.overview;this.animateCameraTo(s.pos,s.target,1100)}goToTourStep(t){if(t<0||t>=De.length)return;this.tourIndex=t;const e=De[t];let n=e.camPos.clone();if(this.camera.aspect<1){const s=new E().subVectors(n,e.lookAt).multiplyScalar(1.22);n=new E().addVectors(e.lookAt,s),n.y+=.8}this.animateCameraTo(n,e.lookAt,1400),e.targetId?(this.select(e.targetId),this.onSelect(e.targetId,"component")):this.select(null),this.voiceEnabled?this.playStepAudio(e):this.stopAudio(),this.onTourChange(this.tourIndex,e,this.tourPlaying)}playStepAudio(t){if(this.stopAudio(),!this.voiceEnabled)return;const e=R0(t.audioFile);let n=0,s=!1;const a=t.narration,r=()=>{s||(s=!0,this.speakNarration(a))},o=()=>{if(s||!this.voiceEnabled)return;if(n>=e.length){console.warn("All audio file candidates failed, trying Arabic SpeechSynthesis:",e),r();return}const l=e[n++],c=new Audio;c.preload="auto",c.src=l,this.currentAudio=c;const d=setTimeout(()=>{if(!s&&this.voiceEnabled){try{c.pause()}catch{}o()}},1500);c.addEventListener("playing",()=>{s=!0,clearTimeout(d)},{once:!0}),c.addEventListener("ended",()=>{this.tourPlaying&&(this.tourTimer=setTimeout(()=>{this.tourPlaying&&this.nextTourStep()},1400))},{once:!0}),c.addEventListener("error",f=>{console.warn("Audio candidate failed to load:",l,f),clearTimeout(d),o()},{once:!0});const u=c.play();u!==void 0&&u.catch(f=>{console.warn("Audio play() rejected on candidate:",l,f),clearTimeout(d),o()})};o()}speakNarration(t){if(!(!this.voiceEnabled||typeof window>"u"||!("speechSynthesis"in window)))try{window.speechSynthesis.speaking&&window.speechSynthesis.cancel(),setTimeout(()=>{try{const e=new SpeechSynthesisUtterance(t);e.lang="ar-SA",e.rate=.95,e.pitch=1;const s=window.speechSynthesis.getVoices().find(a=>a.lang&&(a.lang.startsWith("ar")||a.lang.includes("ar")));s&&(e.voice=s),e.onend=()=>{this.tourPlaying&&(this.tourTimer=setTimeout(()=>{this.tourPlaying&&this.nextTourStep()},1400))},e.onerror=a=>{console.warn("SpeechSynthesis error:",a),this.tourPlaying&&(this.tourTimer=setTimeout(()=>{this.tourPlaying&&this.nextTourStep()},4e3))},window.speechSynthesis.speak(e)}catch{}},50)}catch(e){console.warn("SpeechSynthesis failed:",e)}}stopAudio(){if(this.currentAudio){try{this.currentAudio.pause(),this.currentAudio.currentTime=0}catch{}this.currentAudio=null}if(this.tourTimer&&(clearTimeout(this.tourTimer),this.tourTimer=null),typeof window<"u"&&"speechSynthesis"in window)try{window.speechSynthesis.cancel()}catch{}}nextTourStep(){const t=(this.tourIndex+1)%De.length;this.goToTourStep(t)}prevTourStep(){const t=(this.tourIndex-1+De.length)%De.length;this.goToTourStep(t)}startTour(){this.tourPlaying=!0,this.voiceEnabled=!0,this.goToTourStep(this.tourIndex),this.onTourChange(this.tourIndex,De[this.tourIndex],!0)}pauseTour(){this.tourPlaying=!1,this.stopAudio(),this.onTourChange(this.tourIndex,De[this.tourIndex],!1)}setVoiceEnabled(t){this.voiceEnabled=t,t?De[this.tourIndex]&&this.playStepAudio(De[this.tourIndex]):this.stopAudio()}toggleFullscreen(){!!(document.fullscreenElement||document.webkitFullscreenElement||this.container.classList.contains("fake-fullscreen"))?this.exitFullscreen():this.enterFullscreen()}enterFullscreen(){const t=this.container,e=t.requestFullscreen||t.webkitRequestFullscreen||t.mozRequestFullScreen||t.msRequestFullscreen;if(e)try{const n=e.call(t);n&&n.catch&&n.catch(()=>{this.enableFakeFullscreen()})}catch{this.enableFakeFullscreen()}else this.enableFakeFullscreen();this.updateFullscreenUI(!0)}exitFullscreen(){if(document.fullscreenElement||document.webkitFullscreenElement)try{const t=document.exitFullscreen||document.webkitExitFullscreen||document.mozCancelFullScreen||document.msExitFullscreen;t==null||t.call(document)}catch{}this.disableFakeFullscreen(),this.updateFullscreenUI(!1)}enableFakeFullscreen(){this.container.classList.add("fake-fullscreen"),document.body.classList.add("has-fullscreen-canvas"),this.triggerFullscreenResize()}disableFakeFullscreen(){this.container.classList.remove("fake-fullscreen"),document.body.classList.remove("has-fullscreen-canvas"),this.triggerFullscreenResize()}triggerFullscreenResize(){setTimeout(()=>this.resize(),60),setTimeout(()=>this.resize(),200),setTimeout(()=>this.resize(),450)}updateFullscreenUI(t){document.querySelectorAll('[data-action="fullscreen"]').forEach(n=>{if(n.classList.contains("mobile-fab-btn")){const s=n.querySelector(".fab-icon"),a=n.querySelector(".fab-label");s&&(s.textContent=t?"✕":"⛶"),a&&(a.textContent=t?"تصغير":"شاشة"),n.title=t?"إلغاء ملء الشاشة":"ملء الشاشة"}else n.textContent=t?"✕":"⛶",n.title=t?"إلغاء ملء الشاشة":"ملء الشاشة"})}triggerAtsSpark(){this.atsSparkLight&&(this.atsSparkLight.intensity=8.5,this.atsSparkLight.color.set("#8bf5ff"),this.atsSparkTime=performance.now(),this.onEvent&&this.onEvent("grid-cut",{title:"⚡ تفعيل مفتاح التحويل التلقائي ATS",message:"انقطعت الشبكة الكهربائية العامة! قام نظام ATS بالتحويل اللحظي إلى عاكس الطاقة وبنك البطاريات خلال أقل من 10ms دون انقطاع التغذية عن أجهزة دعم الحياة."}))}triggerGridRestore(){this.atsSparkLight&&(this.atsSparkLight.intensity=4.5,this.atsSparkLight.color.set("#33d6a6"),this.atsSparkTime=performance.now(),this.onEvent&&this.onEvent("grid-restore",{title:"↻ عودة الشبكة الكهربائية وتزامن المنظومة",message:"عادت الشبكة الكهربائية للعمل! يقوم نظام ATS بإعادة ربط التغذية الرئيسية وشحن بنك البطاريات مع استمرار تغذية أحمال العناية المركزة."}))}updateState(t){const e=this.currentState.gridAvailable;if(this.currentState={...this.currentState,...t},e===!0&&t.gridAvailable===!1?this.triggerAtsSpark():e===!1&&t.gridAvailable===!0&&this.triggerGridRestore(),this.sunLight){const n=Math.max(.1,(t.irradiance??70)/100);this.sunLight.intensity=.5+n*3.5}if(this.batteryBar){const n=Math.max(0,Math.min(1,(t.soc??71)/100));this.batteryBar.scale.x=Math.max(.03,n),this.batteryBar.position.x=-.37+n*.35,this.batteryBar.material=n<.15?J.red:n<.35?J.orange:J.green}if(this.gridIndicator&&(this.gridIndicator.material=t.gridAvailable?J.green:J.red),this.atsUtilityLed&&(this.atsUtilityLed.material=t.gridAvailable?J.green:J.red),this.atsInverterLed&&(this.atsInverterLed.material=t.gridAvailable?J.orange:J.green),this.icuDistLed){const n=t.solarDcW>0||t.gridSupplyW>0||t.batterySupplyW>0;this.icuDistLed.material.emissiveIntensity=n?.9:.1,this.icuDistLed.material.color.set(t.unmetLoadW>1?"#ff6d81":"#33d6a6")}for(const n of t.devices||dn){const s=this.deviceScreens.get(n.id);s&&s.isMesh&&s.material&&!s.material.map&&(s.material=n.on?J.glass:new ft({color:"#1c2430",roughness:.6}))}this.inverterTexture&&this.inverterTexture.update(t.loadW||695,t.soc||71)}setConnectionsVisible(t){this.showConnections=!!t,this.cableGroup&&(this.cableGroup.visible=this.showConnections),this.pathMeshes&&this.pathMeshes.forEach(e=>e.visible=this.showConnections),this.pathDots&&this.pathDots.forEach(e=>e.visible=this.showConnections)}resize(){const t=Math.max(this.container.clientWidth,1),e=Math.max(this.container.clientHeight,1),n=t/e;this.camera.aspect=n,n<1?this.camera.fov=Math.min(64,Math.max(46,38/n)):this.camera.fov=40,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1)}animate(){this.frameId=requestAnimationFrame(this.animate);const t=this.clock.getElapsedTime();if(this.ecgTexture.update(t),this.ventTexture.update(t),this.atsSwitchLever){const s=this.currentState.gridAvailable?0:Math.PI/4;this.atsSwitchLever.rotation.z+=(s-this.atsSwitchLever.rotation.z)*.18}if(this.atsSparkTime&&this.atsSparkLight){const s=performance.now()-this.atsSparkTime;s<400?this.atsSparkLight.intensity=Math.max(0,8.5*(1-s/400)):(this.atsSparkLight.intensity=0,this.atsSparkTime=null)}const e=this.currentState.gridAvailable,n=this.currentState.devices||[];if(this.socketLeds)for(const s of n){const a=this.socketLeds.get(s.id);if(a){const r=s.on&&this.currentState.loadW>0;a.material.color.set(r?"#2cd89f":"#ff9f43"),a.material.emissive.set(r?"#2cd89f":"#ff9f43"),a.material.emissiveIntensity=r?.95:.12}}if(this.cableTags&&this.cableTags.length)for(let s=0;s<this.cableTags.length;s++)this.cableTags[s].quaternion.copy(this.camera.quaternion);if(this.pathDots.forEach(s=>{const a=s.userData.medium,r=s.userData.deviceId;let o=!0,l=.14;if(r){const c=n.find(d=>d.id===r);o=c?c.on:!0,l=.1+((c==null?void 0:c.watts)||50)/400*.12}else a==="dc"?(o=this.currentState.solarDcW>0,l=.06+Math.min(.24,this.currentState.solarDcW/2400*.22)):a==="grid"?(o=e,l=.16):a==="battery"?(o=!e||this.currentState.batterySupplyW>0,l=e?.12:.28):a==="ac"&&(o=this.currentState.loadW>0,l=.13+Math.min(.12,this.currentState.loadW/2e3*.1));if(s.visible=this.showConnections&&o,s.visible&&s.userData.curve){let c=(t*l+(s.userData.phase||0))%1;c<0&&(c+=1),c=Math.max(1e-4,Math.min(.9999,c)),Number.isFinite(c)&&s.position.copy(s.userData.curve.getPoint(c)),s.userData.isAura&&s.scale.setScalar(1+Math.sin(t*6+(s.userData.phase||0)*14)*.2)}}),this.pathMeshes.forEach(s=>{const a=s.userData.medium,r=s.userData.deviceId;let o=!0;if(r){const l=n.find(c=>c.id===r);o=l?l.on:!0}else a==="dc"?o=this.currentState.solarDcW>0:a==="grid"?o=e:a==="battery"?o=!e||this.currentState.batterySupplyW>0:a==="ac"&&(o=this.currentState.loadW>0);s.visible=this.showConnections,s.material&&s.material.emissive&&(s.material.opacity=o?.88:.14,s.material.emissiveIntensity=o?.72+Math.sin(t*3.8)*.24:.02,a==="ac"&&o&&this.currentState.unmetLoadW>1?(s.material.color.set("#ff2255"),s.material.emissive.set("#ff1144"),s.material.emissiveIntensity=.95+Math.sin(t*10)*.45):a==="ac"&&o&&(s.material.color.set("#00f5b8"),s.material.emissive.set("#00d69e")))}),this.gridIndicator&&(e?this.gridIndicator.material.emissiveIntensity=.35+Math.sin(t*2.5)*.15:this.gridIndicator.material.emissiveIntensity=.75),this.patientChest){const s=Math.sin(t*1.57);this.patientChest.scale.y=1+s*.06,this.patientChest.scale.z=1+s*.03,this.patientChest.position.y=(this.patientChestBaseY||.12)+s*.005}if(this.patientBlanket){const s=Math.sin(t*1.57);this.patientBlanket.scale.y=1+s*.035,this.patientBlanket.position.y=(this.patientBlanketBaseY||0)+s*.004}if(this.spo2SensorLed){const s=Math.pow(Math.max(0,Math.sin(t*7.54)),4);this.spo2SensorLed.material.emissiveIntensity=.3+s*1.4}this.controls.update(),this.camera.position.z<-21.2&&(this.camera.position.z=-21.2),this.renderer.render(this.scene,this.camera)}dispose(){var t;cancelAnimationFrame(this.frameId),this.cameraAnimation&&cancelAnimationFrame(this.cameraAnimation),this.stopAudio(),this.onFullscreenChange&&(document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange)),this.onKeyDown&&window.removeEventListener("keydown",this.onKeyDown),this.disableFakeFullscreen(),(t=this.resizeObserver)==null||t.disconnect(),this.renderer.domElement.removeEventListener("pointerdown",this.pointerDown),this.controls.dispose(),this.renderer.dispose(),this.container.innerHTML=""}}const Ws=document.querySelector("#app"),I={page:"lab",irradiance:70,soc:71,gridAvailable:!0,devices:dn.map(i=>({...i})),selectedId:"solar",selectedType:"component",showConnections:!0,playing:!1,presentationMode:!1,activeScenario:"solar-peak",hudExpanded:!1,tourExpanded:!1};let lt=null,Js=null,Za=null,Ka=null;function ci(){return En({irradiance:I.irradiance,soc:I.soc,gridAvailable:I.gridAvailable,devices:I.devices})}function Qe(i,t){const e=document.querySelector("#glass-event-pill");if(!e)return;const n=document.querySelector("#event-title"),s=document.querySelector("#event-desc");n&&(n.textContent=i),s&&(s.textContent=t),e.classList.remove("hidden"),Ka&&clearTimeout(Ka),Ka=setTimeout(()=>{e.classList.add("hidden")},6500)}const Wi={"pv-mppt":{title:"سلسلة الألواح الشمسية (DC PV String)",en:"Solar PV String Feeder",category:"توليد شمسي DC",standard:"EN 50618 (PV1-F 2x6mm²)",voltage:"94.2 V DC (Vmp)",rating:"1000V DC / 35A / UV & Flame Resistant",insulation:"Double Insulated Cross-Linked Polyolefin (LSZH)",protection:"قواطع تيار مستمر DC Breaker + مانع صواعق SPD Type II",description:"كابل شمسي مزدوج مخصص لنقل طاقة تيار مستمر DC من مصفوفة الألواح إلى منظم MPPT، ممدد ومثبت داخل حامل كابلات مجلفن ومحمي ضد العوامل البيئية."},"mppt-battery":{title:"ناقل شحن بنك البطاريات (48V Heavy Charge Bus)",en:"MPPT to Battery Charge Bus",category:"شحن البطارية DC",standard:"BS 6004 / H07RN-F 2x35mm²",voltage:"48.0 V - 54.6 V DC",rating:"48V DC / 80A Max Charge",insulation:"EPR Rubber / Heavy Duty Neoprene Sheath",protection:"فيوز حماية فائق السرعة DC Fuse 100A",description:"كابل شحن مرن عالي التحمل مزود بعوازل حرارية ومحمي ضد تيارات القصر، يربط خرج المنظم بمدخل قاطع عزل البطارية الرئيسي."},"battery-inverter":{title:"ناقل تفريغ البطارية للعاكس (48V Heavy DC Bus)",en:"Heavy Battery to Hybrid Inverter Bus",category:"تغذية البطارية للعاكس DC",standard:"BS 6883 / H01N2-D 2x70mm² Extra-Flex Copper",voltage:"48.0 V DC Nominal (42V - 58.4V)",rating:"48V DC / 200A Continuous / Flame Retardant",insulation:"High-Current Welding Grade Synthetic Rubber",protection:"قاطع عزل دوار DC Isolator + قاطع حراري مغناطيسي 250A",description:"كابل تيار مستمر فائق السماكة ومزدوج (+ أحمر، - أسود) مع أطراف نحاسية ملحومة ومعزولة بانكماش حراري، ينقل الطاقة للعاكس فور انقطاع الشبكة دون هبوط جهد."},"inverter-ats":{title:"خرج العاكس لمفتاح التحويل (Source B - Emergency AC)",en:"Hybrid Inverter Pure Sine AC Output",category:"طاقة العاكس الاحتياطية AC",standard:"BS EN 50525 / H07VV-F 3G4mm² Armored Flex",voltage:"230 V AC ±2% (50 Hz Pure Sine Wave)",rating:"230V AC / 16A / Pure Sine Wave 50Hz",insulation:"Corrugated Steel Flex Shielded Conduit (THD < 3%)",protection:"قاطع تفاضلي طبي Type B RCD + MCB 16A Curve C",description:"كابل طاقة تيار متناوب مع تأريض مصفح بدرع معدني مرن، ينقل الموجة الجيبية النقية من العاكس إلى مدخل المصدر الاحتياطي (Source B) في مفتاح ATS."},"grid-ats":{title:"تغذية الشبكة العامة لمفتاح التحويل (Source A - Utility Grid)",en:"Utility Grid Main AC Feeder",category:"مصدر الشبكة العمومية AC",standard:"IEC 60502-1 NYY-J 3G6mm² Industrial Heavy Duty",voltage:"230 V AC Nominal (50 Hz Single Phase)",rating:"230V AC / 32A / 50Hz Utility Distribution",insulation:"PVC Insulated Armored Surface Cable (32A Rating)",protection:"قاطع رئيسي 32A + مانع صواعق الشبكة SPD Type I+II",description:"كابل التغذية الرئيسي القادم من الشبكة العمومية مع غلاف حماية أزرق صناعي، يدخل عبر مجرى كابلات مصفح إلى مدخل المصدر الأساسي (Source A) في مفتاح ATS."},"ats-icu":{title:"الخط الرئيسي لوحدة التوزيع بالعناية المركزة (Hospital IPS Trunk)",en:"ICU Isolated Power Supply (IPS) Feeder Trunk",category:"تغذية العناية المركزة المعزولة AC",standard:"IEC 60364-7-710 / BS EN 50525-3-11 LSZH 3G6mm²",voltage:"230 V AC Isolated IT System (نظام عزل طبي)",rating:"230V AC / 25A / Low Smoke Zero Halogen + Medical Shield",insulation:"Low Smoke Zero Halogen (LSZH) + Medical Braided Shield",protection:"نظام مراقبة العزل الطبي Insulation Monitoring Device (IMD)",description:"كابل مصفح طبي خالي من الهالوجين مزود بحماية عزل كهرومغناطيسي، يغذي كونسول العناية المركزة الجداري بنظام عزل طبي غير مؤرض IT System لتأمين سلامة المريض القصوى."},"branch-vent":{title:"كابل تغذية جهاز التنفس الاصطناعي (Mechanical Ventilator)",en:"Hospital-Grade Power Cord - Ventilator",category:"دعم حياة حرج (Life Support Critical)",standard:"UL 817 / IEC 60320-1 SJT 3x1.5mm² Hospital Grade",voltage:"230 V AC / 350 W Load",rating:"230V AC / 10A / Antimicrobial Medical Sheath",insulation:"Medical Antimicrobial Silicone Jacket with Green Dot Grounding",protection:"مقبس أحمر مخصص غير قابل للفصل العرضي",description:"كابل طبي فائق الموثوقية مزود بقابس ذي النقطة الخضراء للتأريض الآمن، يغذي جهاز التنفس لدعم الحياة دون انقطاع."},"branch-monitor":{title:"كابل شاشة مراقبة المؤشرات الحيوية (Patient Monitor)",en:"Hospital-Grade Power Cord - Monitor",category:"مراقبة حيوية مستمرة",standard:"SJT 3x1.0mm² Hospital Grade with Molded Strain Relief",voltage:"230 V AC / 60 W Load",rating:"230V AC / 60W Continuous Monitoring",insulation:"Medical Grey Flexible PVC",protection:"مقبس عناية قياسي أخضر مع تأريض متساوي الجهد",description:"كابل تغذية مرن مع حماية مانعة للتداخل الكهرومغناطيسي لضمان دقة إشارات تخطيط القلب ومراقبة العلامات الحيوية."},"branch-infusion":{title:"كابل مضخات المحاليل الوريدية (Infusion Pumps ×2)",en:"Hospital-Grade Power Cord - Infusion Pumps",category:"ضخ محاليل وريدية حرجة",standard:"SJT 3x1.0mm² Medical Flex Cord",voltage:"230 V AC / 60 W Load",rating:"230V AC / 60W IV Delivery Pumps",insulation:"Clean White Hospital Grade Jacket",protection:"مقبس عناية قياسي أخضر",description:"كابل تغذية طبي مزدوج لتشغيل مضخات ضخ الأدوية والمحاليل الحيوية المستمرة في سرير العناية."},"branch-syringe":{title:"كابل مضخة الحقن الدقيق (Precision Syringe Pump)",en:"Hospital-Grade Power Cord - Syringe Pump",category:"حقن دوائي ميكروي",standard:"SJT 3x0.75mm² Medical Grade Cord",voltage:"230 V AC / 25 W Load",rating:"230V AC / 25W Precision Medication Flow",insulation:"Clean White Medical Flex",protection:"مقبس عناية قياسي أخضر",description:"كابل مرن فائق الخفة لحقن الجرعات الدوائية عالية الحساسية بدقة متناهية."},"branch-defib":{title:"كابل جهاز الصدمات والإنعاش القلبي (Defibrillator Crash Cart)",en:"Hospital-Grade Power Cord - Defibrillator",category:"إنعاش قلبي طارئ",standard:"SJTW 3x1.5mm² High-Current Silicone Flex",voltage:"230 V AC / 200 W (شحن سريع للمكثفات)",rating:"230V AC / 10A Heavy Surge Rating",insulation:"Vivid Safety Orange Medical Rubber",protection:"مقبس أحمر مخصص لطوارئ الإنعاش",description:"كابل طوارئ برتقالي عالي المرونة والتحمل لشحن مكثفات الصدمات الكهربائية السريعة في عربة الإنعاش."},"branch-incubator":{title:"كابل حاضنة الأطفال حديثي الولادة (Infant Incubator)",en:"Hospital-Grade Power Cord - Incubator",category:"رعاية حديثي الولادة الحرجة",standard:"SJT 3x1.5mm² Thermal-Resistant Hospital Grade",voltage:"230 V AC / 400 W (تدفئة وتنظيم حراري)",rating:"230V AC / 10A Continuous Thermal Load",insulation:"Medical Royal Blue Heavy Flex",protection:"مقبس أزرق مخصص مع مراقبة تسريب تيار فائقة الحساسية",description:"كابل عزل حراري خاص لتغذية أنظمة تدفئة وترطيب بيئة الحاضنة بدقة واستقرار."},"branch-oxygen":{title:"كابل مركّز الأوكسجين الطبي (Oxygen Concentrator)",en:"Hospital-Grade Power Cord - Oxygen Concentrator",category:"توليد أكسجين مستمر",standard:"Heavy-Duty SJT 3x1.5mm² Medical Grade",voltage:"230 V AC / 300 W (محرك ضاغط طبي)",rating:"230V AC / 10A Inductive Motor Load",insulation:"Medical Heavy Blue Flex",protection:"مقبس أزرق مع حماية ضد تيار البدء",description:"كابل تحمّل عالي مصمم لتيار البدء الحثي لضاغط تركيز وتوليد غاز الأكسجين الطبي."}};function xc(i){if(Wi[i])return Wi[i].title;const t=cs.find(n=>n.id===i);if(t)return t.name;const e=dn.find(n=>n.id===i);return e?e.name:"المكوّن المختار"}function L0(){Ws.innerHTML=`
    <div class="app-shell ${I.page==="lab"?"fullwidth-lab-shell":""}" id="app-shell">
      <header class="topbar">
        <div class="brand"><div class="brand-mark">ϟ</div><div><div class="brand-title">ICU Power Lab <span style="color:#64dcb8">3D</span></div><div class="brand-subtitle">مختبر طاقة العناية المركزة · مشروع تخرج</div></div></div>
        <div class="topbar-center">
          <nav class="topbar-nav" aria-label="أقسام المختبر">
            <button class="top-nav-btn ${I.page==="lab"?"active":""}" data-page="lab"><span class="nav-icon">◈</span>العالم 3D التفاعلي</button>
            <button class="top-nav-btn ${I.page==="home"?"active":""}" data-page="home"><span class="nav-icon">⌂</span>لوحة المشروع وتوازن الطاقة</button>
            <button class="top-nav-btn ${I.page==="components"?"active":""}" data-page="components"><span class="nav-icon">▦</span>المكوّنات والشروحات</button>
          </nav>
        </div>
        <div class="top-actions">
          <button class="secondary-btn small-btn" data-action="export">⇩ تقرير JSON</button>
          <button class="primary-btn small-btn" data-action="present">▣ وضع العرض</button>
        </div>
      </header>
      <div class="layout ${I.page==="lab"?"fullwidth-layout":""}">
        <aside class="sidebar ${I.page==="lab"?"lab-hidden":""}">
          <div><div class="side-label">القائمة الرئيسية</div><nav class="nav-list">
            <button class="nav-item ${I.page==="lab"?"active":""}" data-page="lab"><span class="nav-icon">◈</span>العالم ثلاثي الأبعاد</button>
            <button class="nav-item ${I.page==="home"?"active":""}" data-page="home"><span class="nav-icon">⌂</span>لوحة المشروع</button>
            <button class="nav-item ${I.page==="components"?"active":""}" data-page="components"><span class="nav-icon">▦</span>المكوّنات والشروحات</button>
          </nav></div>
          <div class="sidebar-spacer"></div>
          <div class="side-note"><div class="side-note-title"><span style="color:var(--orange)">⚠</span> تنبيه هندسي</div><p>هذا نموذج تعليمي تصوري. لا تستخدمه للتوصيل الفعلي أو لاتخاذ قرار سريري أو لتحديد قدرة منظومة طبية.</p></div>
          <div class="side-foot">
            <strong>جامعة المعارف — كلية الهندسة التقنية</strong><br/>
            قسم هندسة تقنيات الأجهزة الطبية<br/>
            ICU POWER LAB 3D
          </div>
        </aside>
        <main class="main-content ${I.page==="lab"?"expansive-main":""}" id="page-view"></main>
      </div>
      <!-- Mobile Bottom Navigation Bar -->
      <nav class="mobile-bottom-nav" aria-label="شريط التنقل للهاتف">
        <button class="mobile-nav-btn active" data-page="lab"><span class="m-icon">◈</span><span>العالم 3D</span></button>
        <button class="mobile-nav-btn" data-page="home"><span class="m-icon">⌂</span><span>لوحة المشروع</span></button>
        <button class="mobile-nav-btn" data-page="components"><span class="m-icon">▦</span><span>المكوّنات</span></button>
      </nav>
    </div>`,Ws.addEventListener("click",k0),Ws.addEventListener("input",z0),Ws.addEventListener("change",V0),bn()}function D0(i,t,e,n=""){return`<div class="view-header"><div><span class="eyebrow">${i}</span><h1 class="view-title">${t}</h1><p class="view-description">${e}</p></div><div class="header-badges">${n}</div></div>`}function yc(){return'<div class="notice"><span class="notice-icon">⚠</span><div><strong>استخدام تعليمي فقط:</strong> هذه المحاكاة والمجسمات ليست تصميماً كهربائياً معتمداً ولا نظاماً طبياً جاهزاً. أرقام الأحمال والقدرات مأخوذة ومشتقة من المشروع المرجعي. يجب التحقق من جميع القيم والتوصيلات مع مهندس مختص وأوراق بيانات الأجهزة قبل أي تطبيق واقعي.</div></div>'}function I0(){return Dl.map(i=>`<button class="scenario-card" data-scenario="${i.id}"><span class="scenario-icon">${i.icon}</span><strong>${i.name}</strong><p>${i.description}</p><span class="run-link">تطبيق السيناريو ←</span></button>`).join("")}function bc(i=!0){return I.devices.map(t=>`
    <div class="load-row" style="padding:7px 0">
      <div class="load-meta">
        <span class="device-symbol">${oo(t.id)}</span>
        <div>
          <div class="device-name">${t.name}</div>
          <div class="device-en">${t.en} · ${t.watts} W</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="load-watts" id="load-watt-${t.id}" style="font-weight:700;color:${t.on?"var(--green)":"var(--muted)"}">${t.on?t.watts+" W":"0 W"}</span>
        ${i?`
          <label class="toggle" aria-label="${t.name}">
            <input type="checkbox" data-device="${t.id}" ${t.on?"checked":""}>
            <span class="toggle-track"></span>
          </label>
        `:`
          <span class="status-chip ${t.on?"":"off"}">${t.on?"نشط":"متوقف"}</span>
        `}
      </div>
    </div>
  `).join("")}function U0(i=!0){return[{id:"cat-1",title:"أحمال دعم الحياة فائقة الخطورة (Critical Life Support)",sub:"Priority 1 · تغذية دون أي انقطاع مطلقاً",color:"var(--red)",deviceIds:["vent","monitor","defib"]},{id:"cat-2",title:"أجهزة العلاج والضخ الدقيق (Precision Drug Delivery)",sub:"Priority 2 · جرعات محاليل وأدوية حرجة",color:"var(--orange)",deviceIds:["infusion","syringe"]},{id:"cat-3",title:"بيئة الحضانة والرعاية والغازات (Care Environment)",sub:"Priority 3 · تدفئة وتوليد أكسجين مستمر",color:"var(--blue)",deviceIds:["incubator","oxygen"]}].map(e=>{const n=I.devices.filter(r=>e.deviceIds.includes(r.id)),s=n.reduce((r,o)=>r+(o.on?o.watts:0),0),a=n.reduce((r,o)=>r+o.watts,0);return`
      <div class="med-category-block" style="border-right: 4px solid ${e.color}">
        <div class="med-category-head">
          <div class="med-category-title">
            <span style="color:${e.color}">●</span>
            <div>
              <strong>${e.title}</strong>
              <div style="font-size:10px;color:#8da5c3;margin-top:2px">${e.sub}</div>
            </div>
          </div>
          <div class="med-category-sum">
            <strong id="${e.id}-watts">${s} W</strong> / ${a} W
          </div>
        </div>
        <div class="load-list">
          ${n.map(r=>`
            <div class="load-row" style="padding:7px 0">
              <div class="load-meta">
                <span class="device-symbol">${oo(r.id)}</span>
                <div>
                  <div class="device-name">${r.name}</div>
                  <div class="device-en">${r.en} · ${r.watts} W</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <span class="load-watts" id="load-watt-${r.id}" style="font-weight:700;color:${r.on?"var(--green)":"var(--muted)"}">${r.on?r.watts+" W":"0 W"}</span>
                ${i?`
                  <label class="toggle" aria-label="${r.name}">
                    <input type="checkbox" data-device="${r.id}" ${r.on?"checked":""}>
                    <span class="toggle-track"></span>
                  </label>
                `:`
                  <span class="status-chip ${r.on?"":"off"}">${r.on?"نشط":"متوقف"}</span>
                `}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `}).join("")}function N0(i){const t=i.solarDcW>10,e=!I.gridAvailable||i.batterySupplyW>10,n=I.gridAvailable,s=i.loadW>0&&i.unmetLoadW<=1,a=Math.round(I.soc*(ne.batteryWh/100));return`
    <div class="schematic-box">
      <div class="schematic-head">
        <div>
          <span class="eyebrow" style="margin-bottom:4px">INTERACTIVE SCADA TOPOLOGY · مخطط تدفق القدرة الحي</span>
          <h2 class="panel-title" style="font-size:16px;color:#f0f7ff">المخطط التفاعلي الحي لمسار وتدفق القدرة الكهربائية</h2>
          <p class="panel-subtitle">تتبّع مسارات التيار الحي وتوزيع الطاقة لحظياً بين المصادر الثلاثة والحمل الطبي المعزول</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="tag ${n?"green":"red"}" id="schematic-grid-tag">${n?"🟢 الشبكة متاحة":"🔴 الشبكة مفصولة (ATS)"}</span>
          <span class="tag ${i.unmetLoadW>1?"red":"green"}" id="schematic-balance-tag">${i.unmetLoadW>1?"عجز تغذية":"تغذية مؤمنة 100%"}</span>
        </div>
      </div>

      <div class="schematic-canvas-wrap">
        <svg class="schematic-flow-diagram" viewBox="0 0 920 180" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- 1. PV to MPPT -->
          <path id="schematic-wire-pv" data-inspect="pv-mppt" d="M 125 65 L 210 65" fill="none" stroke="${t?"#ffb85c":"#23415f"}" stroke-width="4" stroke-dasharray="${t?"6 4":"none"}" class="${t?"wire-active":""}" style="cursor:pointer" />
          <!-- 2. MPPT to Battery -->
          <path id="schematic-wire-mppt" data-inspect="mppt-battery" d="M 320 65 L 405 65" fill="none" stroke="${t?"#33d6a6":"#23415f"}" stroke-width="4" stroke-dasharray="${t?"6 4":"none"}" class="${t?"wire-active":""}" style="cursor:pointer" />
          <!-- 3. Battery to Inverter -->
          <path id="schematic-wire-batt" data-inspect="battery-inverter" d="M 465 100 L 465 125" fill="none" stroke="${e?"#f59e0b":"#23415f"}" stroke-width="4" stroke-dasharray="${e?"6 4":"none"}" class="${e?"wire-active":""}" style="cursor:pointer" />
          <!-- 4. Inverter to ATS (Source B) -->
          <path id="schematic-wire-inv" data-inspect="inverter-ats" d="M 525 150 L 610 150 L 610 110 L 640 110" fill="none" stroke="${e||t?"#33d6a6":"#23415f"}" stroke-width="4" stroke-dasharray="${e||t?"6 4":"none"}" class="${e||t?"wire-active":""}" style="cursor:pointer" />
          <!-- 5. Grid to ATS (Source A) -->
          <path id="schematic-wire-grid" data-inspect="grid-ats" d="M 525 25 L 610 25 L 610 65 L 640 65" fill="none" stroke="${n?"#5b8cff":"#662233"}" stroke-width="4" stroke-dasharray="${n?"6 4":"none"}" class="${n?"wire-active":""}" style="cursor:pointer" />
          <!-- 6. ATS to ICU -->
          <path id="schematic-wire-icu" data-inspect="ats-icu" d="M 740 88 L 790 88" fill="none" stroke="${s?"#00f5b8":"#ff4466"}" stroke-width="5" stroke-dasharray="${s?"8 4":"none"}" class="${s?"wire-active":""}" style="cursor:pointer" />

          <!-- Node 1: PV Array -->
          <g transform="translate(15, 30)" data-inspect="solar" style="cursor:pointer" class="schematic-node-g">
            <title>مصفوفة الألواح الشمسية 2400Wp (انقر للاستعراض 3D)</title>
            <rect width="110" height="70" rx="12" fill="#0d2137" stroke="${t?"#ffb85c":"#244566"}" stroke-width="2" filter="${t?"url(#nodeGlow)":"none"}" />
            <text x="55" y="24" fill="#ffb85c" font-size="12" font-weight="bold" text-anchor="middle">☀️ الألواح (PV)</text>
            <text x="55" y="44" fill="#ffffff" font-size="13" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-pv-w">${Dt(i.solarDcW)}</text>
            <text x="55" y="60" fill="#8eaac6" font-size="9" text-anchor="middle">2400 Wp Array ↗</text>
          </g>

          <!-- Node 2: MPPT Controller -->
          <g transform="translate(210, 30)" data-inspect="mppt" style="cursor:pointer" class="schematic-node-g">
            <title>منظم الشحن الذكي MPPT (انقر للاستعراض 3D)</title>
            <rect width="110" height="70" rx="12" fill="#0d2137" stroke="${t?"#33d6a6":"#244566"}" stroke-width="2" />
            <text x="55" y="24" fill="#33d6a6" font-size="12" font-weight="bold" text-anchor="middle">⚡ منظم MPPT</text>
            <text x="55" y="44" fill="#ffffff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle" id="schematic-mppt-w">كفاءة 97%</text>
            <text x="55" y="60" fill="#8eaac6" font-size="9" text-anchor="middle">تتبع الاستطاعة ↗</text>
          </g>

          <!-- Node 3: Battery Storage -->
          <g transform="translate(405, 25)" data-inspect="battery" style="cursor:pointer" class="schematic-node-g">
            <title>بنك بطاريات الليثيوم LiFePO4 (انقر للاستعراض 3D)</title>
            <rect width="120" height="65" rx="12" fill="#0d2137" stroke="${I.soc>20?"#33d6a6":"#ff526c"}" stroke-width="2" filter="url(#nodeGlow)" />
            <text x="60" y="22" fill="#33d6a6" font-size="12" font-weight="bold" text-anchor="middle">🔋 بنك البطاريات</text>
            <text x="60" y="42" fill="#ffffff" font-size="13" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-batt-soc">${Math.round(I.soc)}% (${(a/1e3).toFixed(1)} kWh)</text>
            <text x="60" y="58" fill="#8eaac6" font-size="9" text-anchor="middle">48V LiFePO4 · 9.6 kWh ↗</text>
          </g>

          <!-- Node 4: Hybrid Inverter -->
          <g transform="translate(405, 115)" data-inspect="inverter" style="cursor:pointer" class="schematic-node-g">
            <title>العاكس الهجين Pure Sine (انقر للاستعراض 3D)</title>
            <rect width="120" height="60" rx="12" fill="#0d2137" stroke="#2563eb" stroke-width="2" />
            <text x="60" y="22" fill="#7c9cff" font-size="12" font-weight="bold" text-anchor="middle">ϟ العاكس الهجين</text>
            <text x="60" y="40" fill="#ffffff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle" id="schematic-inv-w">${Dt(i.solarToLoadW+i.batterySupplyW)}</text>
            <text x="60" y="54" fill="#8eaac6" font-size="8.5" text-anchor="middle">2000W Pure Sine ↗</text>
          </g>

          <!-- Node 5: ATS Switch -->
          <g transform="translate(640, 45)" data-inspect="ats" style="cursor:pointer" class="schematic-node-g">
            <title>مفتاح التحويل السريع التلقائي ATS (انقر للاستعراض 3D)</title>
            <rect width="100" height="85" rx="12" fill="#0d2137" stroke="${n?"#5b8cff":"#f59e0b"}" stroke-width="2" />
            <text x="50" y="24" fill="#ffd166" font-size="12" font-weight="bold" text-anchor="middle">⇄ مفتاح ATS</text>
            <text x="50" y="48" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle" id="schematic-ats-source">${n?"Source A: شبكة":"Source B: عاكس"}</text>
            <text x="50" y="68" fill="#5ce2ba" font-size="10" font-family="monospace" text-anchor="middle">&lt; 10 ms سرعة ↗</text>
          </g>

          <!-- Node 6: ICU Isolated Medical Console & Beds -->
          <g transform="translate(790, 42)" data-inspect="icu" style="cursor:pointer" class="schematic-node-g">
            <title>وحدة العناية المركزة ونظام التأريض الطبي IPS (انقر للاستعراض 3D)</title>
            <rect width="115" height="92" rx="14" fill="#0c2b29" stroke="#00f5b8" stroke-width="3" filter="url(#nodeGlow)" />
            <text x="57" y="26" fill="#00f5b8" font-size="12" font-weight="bold" text-anchor="middle">✚ العناية ICU</text>
            <text x="57" y="52" fill="#ffffff" font-size="16" font-family="monospace" font-weight="900" text-anchor="middle" id="schematic-load-w">${Dt(i.loadW)}</text>
            <text x="57" y="72" fill="#a5f2d9" font-size="10" text-anchor="middle">نظام عزل طبي IPS ↗</text>
          </g>
        </svg>
      </div>

      <!-- Quick Interactive Cable & Component Links -->
      <div class="schematic-footer-bar">
        <div class="schematic-hint">
          <span style="color:#00f5b8">💡 تفاعلي:</span> اضغط على أي مكوّن أو مسار في المخطط للانتقال المباشر وتفحصه في العالم 3D
        </div>
        <div class="schematic-cable-quicklinks">
          <button class="legend-item-btn small" data-inspect="pv-mppt" title="فحص كابل الطاقة الشمسية 6mm²"><i class="key-swatch" style="--key:#ffb85c"></i> <span>كابل PV (6mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="mppt-battery" title="فحص كابل الشحن 35mm²"><i class="key-swatch" style="--key:#33d6a6"></i> <span>كابل شحن (35mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="battery-inverter" title="فحص كابل تفريغ البطارية 70mm²"><i class="key-swatch" style="--key:#f59e0b"></i> <span>كابل عاكس (70mm²)</span></button>
          <button class="legend-item-btn small" data-inspect="grid-ats" title="فحص كابل الشبكة العامة 6mm²"><i class="key-swatch" style="--key:#5b8cff"></i> <span>تغذية شبكة ATS</span></button>
          <button class="legend-item-btn small" data-inspect="ats-icu" title="فحص خط التوزيع الطبي المعزول IPS"><i class="key-swatch" style="--key:#00f5b8"></i> <span>خط العزل الطبي IPS</span></button>
        </div>
      </div>
    </div>
  `}function Pl(i,t,e,n,s,a,r,o){return`<div class="field-block"><div class="field-top"><label for="${i}">${t}</label><span class="field-value" id="${i}-value">${e}${a}</span></div><input class="range" id="${i}" type="range" min="${n}" max="${s}" step="1" value="${e}" data-input="${i}"><div class="range-labels"><span>${r}</span><span>${o}</span></div></div>`}function F0(){return`<section class="panel glass-panel"><div class="panel-heading"><div><h2 class="panel-title">متحكّمات التجربة والمحاكاة</h2><p class="panel-subtitle">غيّر المتغيرات ولاحظ الاستجابة الفورية للمنظومة</p></div><span class="tag green">LIVE SCADA</span></div>
    ${Pl("irradiance","الإشعاع الشمسي (Solar Irradiance)",I.irradiance,0,100,"%","0% · غياب الشمس","100% · ذروة الإشعاع")}
    <div class="slider-presets-row" style="margin-top:-6px;margin-bottom:12px">
      <button class="preset-pill" data-preset-irr="0">0% ليل</button>
      <button class="preset-pill" data-preset-irr="35">35% غائم</button>
      <button class="preset-pill" data-preset-irr="70">70% قياسي</button>
      <button class="preset-pill" data-preset-irr="100">100% ذروة</button>
    </div>
    ${Pl("soc","حالة شحن البطارية (State of Charge)",Math.round(I.soc),0,100,"%","0%","100%")}
    <div class="slider-presets-row" style="margin-top:-6px;margin-bottom:12px">
      <button class="preset-pill" data-preset-soc="15">15% حرج</button>
      <button class="preset-pill" data-preset-soc="50">50% نصف</button>
      <button class="preset-pill" data-preset-soc="80">80% آمن</button>
      <button class="preset-pill" data-preset-soc="100">100% كامل</button>
    </div>
    <div class="status-line"><span>الشبكة الكهربائية العامة (Source A)</span><span class="tag ${I.gridAvailable?"green":"red"}" id="grid-badge">${I.gridAvailable?"متاحة ومستقرة":"منقطعة (معزولة)"}</span></div>
    <button class="${I.gridAvailable?"danger-btn secondary-btn":"primary-btn"}" data-action="grid-toggle" style="width:100%;margin:10px 0 8px">${I.gridAvailable?"⚡ محاكاة انقطاع الشبكة العامة (ATS)":"↻ إعادة ربط وتغذية الشبكة العامة"}</button>
    <div class="divider"></div>
    <div class="control-grid"><button class="secondary-btn" data-action="all-on">تشغيل كل الأحمال</button><button class="secondary-btn" data-action="all-off">إيقاف كل الأحمال</button><button class="secondary-btn" data-action="reset">إعادة الضبط</button><button class="primary-btn" data-action="play">${I.playing?"Ⅱ إيقاف الزمن":"▶ تقدّم دقيقة"}</button></div>
    <p class="tiny-note">زر الزمن يقدّم المحاكاة دقيقةً في كل ثانية عند التشغيل لمراقبة شحن أو تفريغ البطارية الحقيقي.</p>
  </section>`}function O0(){const i=ci(),t=i.solarToLoadW+i.gridSupplyW+i.batterySupplyW,e=i.unmetLoadW>1?`<span class="tag red">عجز ${Math.round(i.unmetLoadW)} W</span>`:i.gridAvailable?'<span class="tag green">التغذية متاحة ومستقرة</span>':'<span class="tag blue">تعمل على الطاقة الاحتياطية</span>',n=Math.max(1,i.loadW),s=Math.min(100,Math.round(i.solarToLoadW/n*100)),a=Math.min(100,Math.round(i.batterySupplyW/n*100)),r=Math.min(100,Math.round(i.gridSupplyW/n*100)),o=Math.min(100,Math.round(i.unmetLoadW/n*100)),l=Math.min(100,Math.round((i.solarToLoadW+i.batterySupplyW)/n*100)),c=Math.min(100,Math.round(i.loadW/ne.inverterLimitW*100)),d=Math.min(100,Math.round(i.solarDcW/ne.panelWp*100)),u=Math.round(I.soc*(ne.batteryWh/100));return`
    <div class="view-header">
      <div>
        <span class="eyebrow">HOSPITAL MICROGRID SCADA · نظام التغذية الكهربائية الطبية المعزولة</span>
        <h1 class="view-title">لوحة المشروع والمحاكاة الحية لتوازن الطاقة</h1>
        <p class="view-description">مركز المراقبة والتحكم الشامل بمنظومة الطاقة الاحتياطية لوحدة العناية المركزة (ICU Isolated Power Supply). تتبع مباشر لتدفق القدرة بين المصفوفة الشمسية، بنك البطاريات، والشبكة العامة مع كشف فوري لأي عجز كهربائي.</p>
      </div>
      <div class="header-badges">
        <span class="tag green">● محاكاة حيّة SCADA</span>
        <span class="tag blue">معيار IEC 60364-7-710</span>
        <span class="tag muted">زمن تحويل ATS &lt; 10ms</span>
      </div>
    </div>

    ${yc()}

    <!-- 1. Executive Telemetry 6-KPI Matrix -->
    <div class="dashboard-kpi-grid">
      <!-- KPI 1: ICU Demand -->
      <article class="kpi-card" data-inspect="icu" style="border-top:3px solid var(--blue);cursor:pointer" title="انقر لتفحص وحدة العناية والأحمال في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">الحمل الطبي اللحظي (ICU Load)</span>
          <span class="kpi-icon" style="color:var(--blue)">▤</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-load">${Dt(i.loadW)}</span>
          <span class="tag muted" style="font-size:10px" id="home-load-ratio">${c}% من العاكس</span>
        </div>
        <div class="kpi-sub">مجموع أحمال الأجهزة الطبية قيد التشغيل ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-load-bar" style="width:${c}%;background:var(--blue)"></div></div>
      </article>

      <!-- KPI 2: Solar PV Generation -->
      <article class="kpi-card" data-inspect="solar" style="border-top:3px solid var(--orange);cursor:pointer" title="انقر لتفحص مصفوفة الألواح الشمسية في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">توليد الألواح بعد MPPT</span>
          <span class="kpi-icon" style="color:var(--orange)">☀️</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-solar" style="color:var(--orange)">${Dt(i.solarDcW)}</span>
          <span class="tag orange" style="font-size:10px" id="home-irr-tag">إشعاع ${I.irradiance}%</span>
        </div>
        <div class="kpi-sub">مصفوفة 6 ألواح (2400Wp) · كفاءة MPPT 97% ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-pv-bar" style="width:${d}%;background:var(--orange)"></div></div>
      </article>

      <!-- KPI 3: Battery Storage -->
      <article class="kpi-card" data-inspect="battery" style="border-top:3px solid var(--green);cursor:pointer" title="انقر لتفحص بنك بطاريات الليثيوم في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">بنك بطاريات الليثيوم (SOC)</span>
          <span class="kpi-icon" style="color:var(--green)">🔋</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-soc" style="color:var(--green)">${Math.round(I.soc)}%</span>
          <span class="tag green" style="font-size:10px" id="home-batt-kwh">${(u/1e3).toFixed(1)} kWh</span>
        </div>
        <div class="kpi-sub">سعة اسمية 9.6 kWh · جهد 48V بنظام BMS ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-soc-bar" style="width:${Math.round(I.soc)}%;background:var(--green)"></div></div>
      </article>

      <!-- KPI 4: Utility Grid Supply -->
      <article class="kpi-card" data-inspect="grid" style="border-top:3px solid #7c9cff;cursor:pointer" title="انقر لتفحص مدخل الشبكة العامة في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">تغذية الشبكة العامة (Source A)</span>
          <span class="kpi-icon" style="color:#7c9cff">⌁</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-grid-val" style="color:${I.gridAvailable?"#7c9cff":"var(--muted)"}">${Dt(i.gridSupplyW)}</span>
          <span class="tag ${I.gridAvailable?"green":"red"}" id="home-grid-status-tag">${I.gridAvailable?"متاحة ومستقرة":"منقطعة"}</span>
        </div>
        <div class="kpi-sub">230V AC / 50Hz · خط التغذية الأساسي لمفتاح ATS ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-grid-bar" style="width:${I.gridAvailable?"100%":"0%"};background:#7c9cff"></div></div>
      </article>

      <!-- KPI 5: Emergency Autonomy -->
      <article class="kpi-card" data-inspect="ats" style="border-top:3px solid #5ce2ba;cursor:pointer" title="انقر لتفحص مفتاح ATS في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">الاستقلالية عند انقطاع الشبكة</span>
          <span class="kpi-icon" style="color:#5ce2ba">⏱</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-autonomy" style="color:#5ce2ba">${Di(En({...I,gridAvailable:!1}).autonomyHours)}</span>
        </div>
        <div class="kpi-sub">زمن التشغيل التقديري لأجهزة العناية الحالية دون شبكة ↗</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" style="width:100%;background:#5ce2ba"></div></div>
      </article>

      <!-- KPI 6: Green Self-Sufficiency -->
      <article class="kpi-card" data-inspect="inverter" style="border-top:3px solid ${i.unmetLoadW>1?"var(--red)":"#33d6a6"};cursor:pointer" title="انقر لتفحص العاكس الهجين في العالم 3D">
        <div class="kpi-card-top">
          <span class="kpi-label">نسبة الاكتفاء الذاتي والتوازن</span>
          <span class="kpi-icon" style="color:${i.unmetLoadW>1?"var(--red)":"#33d6a6"}">⚖</span>
        </div>
        <div class="kpi-value-row">
          <span class="kpi-val" id="home-self-sufficiency" style="color:${i.unmetLoadW>1?"var(--red)":"#33d6a6"}">${l}%</span>
          <span class="tag ${i.unmetLoadW>1?"red":"green"}" id="home-unmet-tag">${i.unmetLoadW>1?"عجز "+Math.round(i.unmetLoadW)+"W":"مغطى 100%"}</span>
        </div>
        <div class="kpi-sub" id="home-balance-caption">${i.unmetLoadW>1?"تحذير: القدرة المطلوبة تتجاوز إمدادات الطاقة!":"الحمل الطبي مغطّى بالكامل مع أمان واستقرار."}</div>
        <div class="kpi-meter"><div class="kpi-meter-fill" id="home-self-bar" style="width:${l}%;background:${i.unmetLoadW>1?"var(--red)":"#33d6a6"}"></div></div>
      </article>
    </div>

    <!-- 2. Interactive SVG Power Flow Schematic -->
    ${N0(i)}

    <!-- 3. Dynamic Power Balance & Medical Load Matrix -->
    <div class="grid two-col">
      <!-- Left: Power Distribution & Balance Analysis -->
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">توازن وتوزيع مصادر التغذية</h2>
            <p class="panel-subtitle">نسبة مساهمة كل مصدر طاقة في تلبية أحمال العناية المركزة</p>
          </div>
          ${e}
        </div>

        <!-- Multi-segment visual split bar -->
        <div class="balance-split-bar">
          <div class="split-seg" id="split-solar" style="width:${s}%;background:var(--orange)" title="الشمس: ${s}%"></div>
          <div class="split-seg" id="split-batt" style="width:${a}%;background:var(--green)" title="البطارية: ${a}%"></div>
          <div class="split-seg" id="split-grid" style="width:${r}%;background:#5b8cff" title="الشبكة: ${r}%"></div>
          <div class="split-seg" id="split-unmet" style="width:${o}%;background:var(--red)" title="عجز: ${o}%"></div>
        </div>

        <div class="split-legend-row">
          <span class="split-legend-item"><i class="key-swatch" style="--key:var(--orange)"></i> <span>الشمس: <strong id="split-lbl-solar">${s}%</strong></span></span>
          <span class="split-legend-item"><i class="key-swatch" style="--key:var(--green)"></i> <span>البطارية: <strong id="split-lbl-batt">${a}%</strong></span></span>
          <span class="split-legend-item"><i class="key-swatch" style="--key:#5b8cff"></i> <span>الشبكة: <strong id="split-lbl-grid">${r}%</strong></span></span>
          ${o>0?`<span class="split-legend-item" style="color:var(--red)"><i class="key-swatch" style="--key:var(--red)"></i> <span>عجز: <strong id="split-lbl-unmet">${o}%</strong></span></span>`:""}
        </div>

        <div class="chart-wrap"><canvas id="energy-chart" aria-label="رسم توضيحي لتوازن الطاقة"></canvas></div>
        <div class="chart-axis"><span>PV</span><span>Battery</span><span>Grid</span><span>Load</span></div>

        <div class="divider"></div>

        <div class="control-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr))">
          <div class="control-tile"><span class="tiny">الشمس إلى الحمل</span><strong id="home-solar-load">${Dt(i.solarToLoadW)}</strong></div>
          <div class="control-tile"><span class="tiny">البطارية إلى الحمل</span><strong id="home-battery-load">${Dt(i.batterySupplyW)}</strong></div>
          <div class="control-tile"><span class="tiny">الشبكة إلى الحمل</span><strong id="home-grid-load">${Dt(i.gridSupplyW)}</strong></div>
          <div class="control-tile"><span class="tiny">الحمل المغطّى إجمالاً</span><strong id="home-covered">${Dt(t)}</strong></div>
          <div class="control-tile"><span class="tiny">هامش أمان العاكس</span><strong id="home-inverter-headroom" style="color:#5ce2ba">${Math.max(0,ne.inverterLimitW-i.loadW)} W</strong></div>
          <div class="control-tile"><span class="tiny">حصة الطاقة النظيفة</span><strong id="home-renewable-ratio" style="color:var(--green)">${l}%</strong></div>
        </div>
      </section>

      <!-- Right: Medical Loads Matrix Categorized by Criticality -->
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">مصفوفة الأحمال الطبية وتوزيع الأولويات</h2>
            <p class="panel-subtitle">أجهزة وحدة العناية مصنّفة حسب معيار الأمان السريري</p>
          </div>
          <div class="panel-actions">
            <button class="secondary-btn small-btn" data-action="all-on">تشغيل الكل</button>
            <button class="secondary-btn small-btn" data-action="all-off">إيقاف الكل</button>
          </div>
        </div>

        <div class="med-matrix-wrap">
          ${U0(!0)}
        </div>

        <div class="divider"></div>
        <div class="status-line"><span>إجمالي الأجهزة النشطة</span><strong id="device-count">${I.devices.filter(f=>f.on).length} من أصل ${I.devices.length} جهاز</strong></div>
        <div class="status-line"><span>حالة نظام العزل الطبي IT System</span><strong style="color:#00f5b8">100% مؤرض طبياً معزول (IPS)</strong></div>
      </section>
    </div>

    <!-- 4. Operational Controls & Ready Scenarios -->
    <div class="grid two-col" style="margin-top:18px">
      ${F0()}

      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">السيناريوهات التشغيلية الجاهزة</h2>
            <p class="panel-subtitle">اختبار سريع لحالات التشغيل الميدانية المختلفة بضغطة زر</p>
          </div>
        </div>
        <div class="grid scenario-grid" style="margin-top:0">${I0()}</div>
      </section>
    </div>

    <!-- 5. Mathematical Modeling & Medical Standards Verification -->
    <div class="grid bottom-grid" style="margin-top:18px">
      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">معادلات النموذج الحسابي والهندسي</h2>
            <p class="panel-subtitle">الأسس الرياضية المستخدمة لحساب تدفق القدرة</p>
          </div>
          <span class="tag muted">SCADA MATH</span>
        </div>
        <div class="status-line"><span>توليد PV بعد MPPT</span><strong class="mono">P_dc = Irradiance × 2400 Wp × 0.97</strong></div>
        <div class="status-line"><span>خرج العاكس المتناوب Pure Sine</span><strong class="mono">P_ac = P_dc × 0.94 (حد العاكس 2000W)</strong></div>
        <div class="status-line"><span>معادلة زمن استقلالية البطارية</span><strong class="mono">T_autonomy = (9600 Wh × SOC) / P_load</strong></div>
        <div class="status-line"><span>زمن تحويل مفتاح ATS التلقائي</span><strong class="mono">&lt; 10 ms (دون انقطاع)</strong></div>
      </section>

      <section class="panel glass-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">المعايير الطبية والهندسية المعتمدة</h2>
            <p class="panel-subtitle">مطابقة التصميم للاشتراطات والمواصفات الدولية</p>
          </div>
          <span class="tag green">3 معايير</span>
        </div>
        <div class="status-line"><span>المعيار الطبي الدولي IEC 60364-7-710</span><strong>المستشفيات وغرف العمليات والعناية المركزة</strong></div>
        <div class="status-line"><span>المعيار الأمريكي NFPA 99</span><strong>Health Care Facilities Code</strong></div>
        <div class="status-line"><span>معيار الكابلات والمقابس UL 817</span><strong>Hospital Grade مع عزل LSZH</strong></div>
        <button class="primary-btn" style="margin-top:16px;width:100%" data-page="lab">انتقل إلى العالم ثلاثي الأبعاد 3D ↗</button>
      </section>
    </div>

    ${ao()}`}function Vr(i=I.selectedId||"solar"){const t=`
    <div class="msg-chips-row">
      <button class="msg-chip ${i==="solar"?"active":""}" data-inspect="solar">☀️ الألواح</button>
      <button class="msg-chip ${i==="battery"?"active":""}" data-inspect="battery">🔋 البطارية</button>
      <button class="msg-chip ${i==="mppt"?"active":""}" data-inspect="mppt">⚡ MPPT</button>
      <button class="msg-chip ${i==="inverter"?"active":""}" data-inspect="inverter">🔄 العاكس</button>
      <button class="msg-chip ${i==="ats"?"active":""}" data-inspect="ats">🔀 مفتاح ATS</button>
      <button class="msg-chip ${i==="icu"?"active":""}" data-inspect="icu">🫁 العناية</button>
      <button class="msg-chip ${i==="grid"?"active":""}" data-inspect="grid">🏢 الشبكة</button>
      <button class="msg-chip ${i==="ats-icu"?"active":""}" data-inspect="ats-icu">🔌 خط IPS</button>
    </div>
  `;if(Wi[i]){const a=Wi[i],r=ci();let o="0 W",l="0.0 A";if(i==="pv-mppt")o=Dt(r.solarDcW),l=(r.solarDcW/94.2).toFixed(1)+" A";else if(i==="battery-inverter")o=Dt(r.batterySupplyW),l=(r.batterySupplyW/48).toFixed(1)+" A";else if(i==="grid-ats")o=Dt(r.gridSupplyW),l=(r.gridSupplyW/230).toFixed(1)+" A";else if(i==="inverter-ats"||i==="ats-icu")o=Dt(r.loadW),l=(r.loadW/230).toFixed(1)+" A";else if(i.startsWith("branch-")){const c=i.replace("branch-",""),d=I.devices.find(u=>u.id===c);d&&(o=(d.on?d.watts:0)+" W",l=((d.on?d.watts:0)/230).toFixed(2)+" A",d.on)}return`
      ${t}
      <div class="explainer-message-box">
        <div class="msg-header-bar">
          <div class="msg-icon-badge" style="background:#13332e;color:#33d6a6">⚡</div>
          <div style="flex:1;min-width:0">
            <span class="tag blue">${a.category}</span>
            <h3 class="msg-component-title">${a.title}</h3>
            <div class="msg-en-sub">${a.en}</div>
          </div>
          <button class="msg-audio-btn" data-action="speak-explainer" title="استمع للشرح الصوتي">🔊 استمع للرسالة</button>
        </div>
        <div class="msg-bubble-content">
          <div class="msg-bubble-prefix">💬 رسالة الشرح التوضيحي:</div>
          <p class="msg-body-p">${a.description}</p>
        </div>
        <div class="spec-list">
          <div class="spec-row"><span>المعيار القياسي</span><strong class="mono">${a.standard}</strong></div>
          <div class="spec-row"><span>الجهد الاسمي</span><strong class="mono">${a.voltage}</strong></div>
          <div class="spec-row"><span>القدرة اللحظية المنقولة</span><strong class="mono strong-green">${o}</strong></div>
          <div class="spec-row"><span>التيار اللحظي المقدر</span><strong class="mono">${l}</strong></div>
          <div class="spec-row"><span>نوع العزل والغلاف</span><strong>${a.insulation}</strong></div>
          <div class="spec-row"><span>وسيلة الحماية</span><strong>${a.protection}</strong></div>
        </div>
        <div class="safety-note"><strong>🛡️ معيار الأمان الطبي:</strong> ممدد على مسارات مؤرضة ومعزولة بمادة مقاومة للهب وانخفاض انبعاث الدخان (LSZH) لضمان حماية أجهزة العناية المركزة والمرضى.</div>
      </div>
    `}const e=cs.find(a=>a.id===i),n=dn.find(a=>a.id===i);if(n)return`
      ${t}
      <div class="explainer-message-box">
        <div class="msg-header-bar">
          <div class="msg-icon-badge">${oo(n.id)}</div>
          <div style="flex:1;min-width:0">
            <span class="tag blue">جهاز طبي · ${n.on?"نشط":"متوقف"}</span>
            <h3 class="msg-component-title">${n.name}</h3>
            <div class="msg-en-sub">${n.en}</div>
          </div>
          <button class="msg-audio-btn" data-action="speak-explainer" title="استمع للشرح الصوتي">🔊 استمع للرسالة</button>
        </div>
        <div class="msg-bubble-content">
          <div class="msg-bubble-prefix">💬 رسالة الشرح السريري:</div>
          <p class="msg-body-p">هذا الجهاز أحد أحمال العناية المركزة الحيوية الموصولة بنظام التغذية المعزول IPS. استهلاكه المقدر ${n.watts} واط، ويعتمد كلياً على استمرارية الطاقة من العاكس والبطارية لمنع توقف الرعاية الحرجة للمريض.</p>
        </div>
        <div class="spec-list">
          <div class="spec-row"><span>القدرة الافتراضية</span><strong class="mono">${n.watts} W</strong></div>
          <div class="spec-row"><span>الحالة الحالية</span><strong>${n.on?"قيد التشغيل":"متوقف"}</strong></div>
          <div class="spec-row"><span>مساهمة الحمل</span><strong class="mono strong-green">${n.on?n.watts:0} W</strong></div>
        </div>
        <div class="safety-note"><strong>🛡️ تنبيه سريري:</strong> في حال انقطاع التغذية، يجب أن يضمن نظام العاكس وATS استمرار عمل الجهاز دون أي إعادة تشغيل (Reboot).</div>
      </div>
    `;const s=e||cs[0];return`
    ${t}
    <div class="explainer-message-box">
      <div class="msg-header-bar">
        <div class="msg-icon-badge">${Ec(s.id)}</div>
        <div style="flex:1;min-width:0">
          <span class="tag blue">${s.family}</span>
          <h3 class="msg-component-title">${s.name}</h3>
          <div class="msg-en-sub">${s.en}</div>
        </div>
        <button class="msg-audio-btn" data-action="speak-explainer" title="استمع للشرح الصوتي">🔊 استمع للرسالة</button>
      </div>
      <div class="msg-bubble-content">
        <div class="msg-bubble-prefix">💬 رسالة الشرح الهندسي:</div>
        <p class="msg-body-p">${s.description}</p>
      </div>
      <div class="spec-list">
        ${s.specs.map(([a,r])=>`<div class="spec-row"><span>${a}</span><strong class="mono">${r}</strong></div>`).join("")}
      </div>
      <div class="safety-note"><strong>🛡️ معيار الأمان والموثوقية:</strong> ${s.safety}</div>
    </div>
  `}function Hr(i=I.selectedId||"solar"){I.selectedId=i,I.selectedType="component",I.page!=="lab"&&(I.page="lab",bn()),lt&&lt.select(i);const t=Vr(i),e=xc(i),n=document.querySelector("#glass-explainer"),s=document.querySelector("#explainer-content"),a=document.querySelector("#explainer-heading");s&&(s.innerHTML=t),a&&(a.textContent=`رسالة الشرح: ${e}`),n&&(n.classList.remove("hidden"),n.classList.remove("collapsed"));const r=document.querySelector("#mobile-explainer-sheet"),o=document.querySelector("#m-explainer-content"),l=document.querySelector("#m-explainer-heading"),c=document.querySelector("#mobile-explainer-backdrop");o&&(o.innerHTML=t),l&&(l.textContent=`رسالة الشرح: ${e}`),r&&window.innerWidth<=860&&(r.classList.remove("hidden"),c==null||c.classList.remove("hidden"))}function Ll(){const i=ci(),t=(lt==null?void 0:lt.tourIndex)||0,e=De[t]||De[0];return`
    <div class="lab-expansive-wrapper">
      <!-- 100% Unobstructed Widescreen 3D Canvas -->
      <div class="expansive-canvas-container" id="scene-container">
        
        <!-- Ultra-Slim Live Status Ribbon (At Top of 3D Canvas) -->
        <div class="canvas-top-ribbon" data-action="toggle-mobile-hud">
          <span class="ribbon-chip"><i class="hud-chip-dot ${i.unmetLoadW>1?"red":"green"}"></i> <span class="m-chip-lbl">الحمل الطبي:</span> <strong class="mono" id="m-glass-load">${Dt(i.loadW)}</strong></span>
          <span class="ribbon-chip" style="color:var(--orange)">☀️ <span class="m-chip-lbl">الألواح:</span> <strong class="mono" id="m-glass-solar">${Dt(i.solarDcW)}</strong></span>
          <span class="ribbon-chip" style="color:var(--green)">🔋 <span class="m-chip-lbl">البطارية:</span> <strong class="mono" id="m-glass-soc">${Math.round(I.soc)}%</strong></span>
          <span class="ribbon-chip" id="m-glass-grid-status" style="color:${I.gridAvailable?"var(--green)":"var(--red)"}">${I.gridAvailable?"🟢 الشبكة متاحة":"🔴 الشبكة منقطعة"}</span>
          <button class="ribbon-tour-btn" data-action="toggle-tour" title="تشغيل الجولة السينمائية">🎬 جولة ثلاثية الأبعاد</button>
        </div>

        <!-- Mobile Floating Action Button Dock (Right Side of Canvas) -->
        <div class="mobile-fab-dock">
          <button class="mobile-fab-btn" data-action="open-mobile-controls" title="التحكم والسيناريوهات">
            <span class="fab-icon">⚙️</span>
            <span class="fab-label">التحكم</span>
          </button>
          <button class="mobile-fab-btn" data-action="toggle-tour" title="الجولة السينمائية">
            <span class="fab-icon">🎬</span>
            <span class="fab-label">الجولة</span>
          </button>
          <button class="mobile-fab-btn" data-action="open-mobile-cables" title="شبكة الكابلات والتوصيل">
            <span class="fab-icon">⚡</span>
            <span class="fab-label">الكابلات</span>
          </button>
          <button class="mobile-fab-btn" data-action="fullscreen" title="ملء الشاشة">
            <span class="fab-icon">⛶</span>
            <span class="fab-label">شاشة</span>
          </button>
        </div>

        <!-- Compact Bottom Floating Camera Toolbar -->
        <div class="canvas-floating-toolbar">
          <span class="cam-dock-label">الكاميرا:</span>
          <button class="cam-dock-btn" data-action="view-overview" title="نظرة عامة شاملة">⌖ عامة</button>
          <button class="cam-dock-btn" data-action="view-power" title="محطة الطاقة">☼ محطة الطاقة</button>
          <button class="cam-dock-btn" data-action="view-medical" title="جناح العناية">🫁 العناية</button>
          <button class="cam-dock-btn" data-action="view-top" title="مسقط علوي">⇧ علوي</button>
          <button class="cam-dock-btn" data-action="connections" title="إظهار أو إخفاء مسارات الأسلاك">${I.showConnections?"مسارات: مفعّلة":"مسارات: مخفية"}</button>
          <button class="cam-dock-btn" data-action="fullscreen" title="ملء الشاشة">⛶</button>
        </div>

        <!-- Live Event Flash Badge (Appears when any event occurs) -->
        <div class="glass-event-pill hidden" id="glass-event-pill">
          <span class="event-icon" id="event-icon">⚡</span>
          <div class="event-body">
            <strong id="event-title">حدث في المنظومة</strong>
            <p id="event-desc">تفاصيل الحدث...</p>
          </div>
          <button class="close-pill-btn" data-action="close-event">✕</button>
        </div>

        <!-- Floating Interactive Component Explainer Glass Card (Message Mode) -->
        <div class="glass-card glass-explainer-card hidden" id="glass-explainer">
          <div class="glass-card-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="g-icon" style="color:#38bdf8">💬</span>
              <strong id="explainer-heading">رسالة الشرح التفاعلي</strong>
            </div>
            <button class="sheet-close-btn" data-action="close-desktop-explainer" title="إغلاق الرسالة" style="width:26px;height:26px;font-size:12px;border-radius:50%;cursor:pointer">✕</button>
          </div>
          <div class="explainer-content" id="explainer-content">
            ${Vr()}
          </div>
        </div>

        <!-- Guided Tour Player (Hidden by default, opens via button) -->
        <div class="glass-card glass-tour-player hidden" id="glass-tour">
          <div class="tour-top-bar">
            <div class="tour-badge">
              <span class="tour-rec-dot"></span>
              <span>الجولة السينمائية · مشهد <span id="caption-step-num">${t+1}</span> من ${De.length}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <div class="tour-timecode mono" id="tour-timecode">${e.timeCode}</div>
              <button class="sheet-close-btn" data-action="toggle-tour" title="إغلاق الجولة" style="width:26px;height:26px;font-size:12px;border-radius:50%;cursor:pointer">✕</button>
            </div>
          </div>
          <div class="video-timeline" id="tour-timeline">
            ${De.map((n,s)=>`<div class="timeline-step ${s===t?"active":s<t?"completed":""}" data-tour-step="${s}" title="${n.title}"></div>`).join("")}
          </div>
          <div class="tour-body-row">
            <div class="tour-btns">
              <button class="play-tour-btn ${lt!=null&&lt.tourPlaying?"active":""}" id="tour-play-btn" data-action="tour-play">
                ${lt!=null&&lt.tourPlaying?"⏸ إيقاف":"▶ تشغيل الجولة"}
              </button>
              <button class="secondary-btn small-btn" data-action="tour-prev">السابق</button>
              <button class="secondary-btn small-btn" data-action="tour-next">التالي ▷</button>
              <button class="soft-btn small-btn ${lt!=null&&lt.voiceEnabled?"strong-green":""}" id="tour-voice-btn" data-action="tour-voice">
                ${lt!=null&&lt.voiceEnabled?"🔊 صوت مفعّل":"🔇 تشغيل الصوت"}
              </button>
            </div>
            <div class="tour-narration-caption">
              <strong id="caption-title">${e.title}</strong>
              <span class="caption-en" id="caption-en">(${e.en})</span>
              <p id="caption-text">${e.narration}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ==========================================================================
           Dedicated Mission Control Section Below Canvas (NEVER Covers the 3D World!)
           ========================================================================== -->
      <div class="lab-mission-control-section">
        <!-- Interactive Cable Selector Bar -->
        <div class="panel glass-panel" style="padding:14px 18px;margin-bottom:16px">
          <div class="legend-header" style="border:none;padding:0;margin-bottom:10px">
            <span class="legend-icon">⚡</span>
            <strong style="color:#d8e8f8;font-size:13.5px">شبكة التمديدات والكابلات الكهربائية (انقر لتسليط الضوء وفحص المسار في المشهد 3D):</strong>
          </div>
          <div class="legend-items-row">
            <button class="legend-item-btn" data-inspect="pv-mppt" title="فحص كابل الألواح"><i class="key-swatch" style="--key:#38bdf8"></i> <span>DC شمسي (6mm²)</span></button>
            <button class="legend-item-btn" data-inspect="mppt-battery" title="فحص ناقل شحن البطارية"><i class="key-swatch" style="--key:#10b981"></i> <span>DC شحن (35mm²)</span></button>
            <button class="legend-item-btn" data-inspect="battery-inverter" title="فحص ناقل البطارية للعاكس"><i class="key-swatch" style="--key:#f59e0b"></i> <span>DC تفريغ (70mm²)</span></button>
            <button class="legend-item-btn" data-inspect="inverter-ats" title="فحص خرج العاكس"><i class="key-swatch" style="--key:#10b981"></i> <span>AC عاكس (4mm²)</span></button>
            <button class="legend-item-btn" data-inspect="grid-ats" title="فحص كابل الشبكة"><i class="key-swatch" style="--key:#2563eb"></i> <span>AC شبكة (6mm²)</span></button>
            <button class="legend-item-btn" data-inspect="ats-icu" title="فحص كابل العناية المركزة"><i class="key-swatch" style="--key:#00f5b8"></i> <span>AC عناية IPS (6mm²)</span></button>
          </div>
        </div>

        <div class="grid two-col" style="margin-bottom:16px">
          <!-- 1. Live Energy Flow HUD Panel (مؤشرات تدفق الطاقة) -->
          <section class="panel glass-panel" id="glass-hud">
            <div class="panel-heading">
              <div style="display:flex;align-items:center;gap:10px">
                <span class="glass-dot-live"></span>
                <div>
                  <h2 class="panel-title">مؤشرات تدفق الطاقة الحية</h2>
                  <p class="panel-subtitle">مراقبة فورية للقدرة الكهربائية وتوزيع مصادر التغذية</p>
                </div>
              </div>
              <span class="tag ${i.unmetLoadW>1?"red":"green"}" id="glass-status-tag">${i.unmetLoadW>1?"عجز تغذية":"تغذية مستقرة"}</span>
            </div>
            <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
              <div class="glass-metric-item">
                <span class="g-label">الحمل الطبي الكلي</span>
                <strong class="g-val mono" id="glass-load">${Dt(i.loadW)}</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">توليد الألواح (DC)</span>
                <strong class="g-val mono" style="color:var(--orange)" id="glass-solar">${Dt(i.solarDcW)}</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">بنك البطاريات (SOC)</span>
                <strong class="g-val mono" style="color:var(--green)" id="glass-soc">${Math.round(I.soc)}%</strong>
              </div>
              <div class="glass-metric-item">
                <span class="g-label">الشبكة العامة</span>
                <strong class="g-val" id="glass-grid-status" style="color:${I.gridAvailable?"var(--green)":"var(--red)"}">${I.gridAvailable?"متاحة 🟢":"منقطعة 🔴"}</strong>
              </div>
            </div>
            <div class="glass-autonomy-line">
              <span>زمن استقلالية البطارية عند انقطاع الشبكة:</span>
              <strong class="mono" id="glass-autonomy">${Di(En({...I,gridAvailable:!1}).autonomyHours)}</strong>
            </div>
          </section>

          <!-- 2. Operational Scenarios & Controls Panel (السيناريوهات والتحكم) -->
          <section class="panel glass-panel" id="glass-controls">
            <div class="panel-heading">
              <div style="display:flex;align-items:center;gap:10px">
                <span class="g-icon" style="font-size:20px">⚙️</span>
                <div>
                  <h2 class="panel-title">السيناريوهات التشغيلية والتحكم</h2>
                  <p class="panel-subtitle">تطبيق حالات التشغيل الميدانية وضبط الإشعاع والشبكة</p>
                </div>
              </div>
              <span class="tag green">LIVE</span>
            </div>
            
            <div class="glass-scenario-btns" style="margin-bottom:12px">
              <button class="glass-btn" data-scenario="solar-peak" title="يوم مشمس وذروة الإنتاج">☀️ شمس ساطعة</button>
              <button class="glass-btn" data-scenario="outage-day" title="انقطاع الشبكة نهاراً">⚡ انقطاع الشبكة</button>
              <button class="glass-btn" data-scenario="night-discharge" title="تفريغ ليلي للبطارية">🌙 تفريغ ليلي</button>
              <button class="glass-btn" data-scenario="heavy-load" title="أقصى استهلاك طبي">🚨 استهلاك أقصى</button>
            </div>

            <div class="glass-action-row" style="margin-bottom:12px">
              <button class="glass-action-btn ${I.gridAvailable?"danger":"success"}" data-action="grid-toggle">
                ${I.gridAvailable?"⚡ محاكاة انقطاع الشبكة العامة (ATS)":"↻ إعادة تغذية الشبكة العامة"}
              </button>
            </div>

            <div class="glass-slider-row" style="margin-bottom:0">
              <div class="slider-head">
                <span>الإشعاع الشمسي (Solar Irradiance):</span>
                <span class="mono" id="glass-irr-val">${I.irradiance}%</span>
              </div>
              <input class="range" type="range" min="0" max="100" value="${I.irradiance}" data-input="irradiance">
              <div class="glass-preset-pills">
                <button class="pill-btn" data-set-irr="0">0% ليل</button>
                <button class="pill-btn" data-set-irr="50">50% غائم</button>
                <button class="pill-btn" data-set-irr="100">100% ذروة</button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- ==========================================
           Mobile Sliding Bottom Sheets (Modals)
           ========================================== -->

      <!-- 1. Mobile Controls Bottom Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-controls-backdrop" data-action="close-mobile-controls"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-controls-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">⚙️</span>
            <strong>التحكم والسيناريوهات التشغيلية</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-controls">✕</button>
        </div>
        <div class="sheet-body">
          <div class="sheet-section-title">سيناريوهات الاختبار السريعة</div>
          <div class="glass-scenario-btns">
            <button class="glass-btn small-btn" data-scenario="solar-peak">☀️ شمس ساطعة</button>
            <button class="glass-btn small-btn" data-scenario="outage-day">⚡ انقطاع الشبكة</button>
            <button class="glass-btn small-btn" data-scenario="night-discharge">🌙 تفريغ ليلي</button>
            <button class="glass-btn small-btn" data-scenario="heavy-load">🚨 استهلاك أقصى</button>
          </div>
          
          <div class="glass-action-row" style="margin-top:10px">
            <button class="glass-action-btn ${I.gridAvailable?"danger":"success"}" data-action="grid-toggle">
              ${I.gridAvailable?"⚡ محاكاة انقطاع الشبكة العامة (ATS)":"↻ إعادة تغذية الشبكة العامة"}
            </button>
          </div>

          <div class="glass-slider-row" style="margin-top:10px">
            <div class="slider-head">
              <span>الإشعاع الشمسي (Solar Irradiance):</span>
              <span class="mono" id="m-glass-irr-val">${I.irradiance}%</span>
            </div>
            <input class="range" type="range" min="0" max="100" value="${I.irradiance}" data-input="irradiance">
            <div class="glass-preset-pills">
              <button class="pill-btn" data-set-irr="0">0% ليل</button>
              <button class="pill-btn" data-set-irr="50">50% غائم</button>
              <button class="pill-btn" data-set-irr="100">100% ذروة</button>
            </div>
          </div>

          <div class="sheet-section-title" style="margin-top:12px">زوايا الكاميرا المسبقة</div>
          <div class="glass-camera-toolbar" style="border:none;padding:0">
            <button class="glass-cam-btn" data-action="view-overview">⌖ عامة</button>
            <button class="glass-cam-btn" data-action="view-power">☼ محطة الطاقة</button>
            <button class="glass-cam-btn" data-action="view-medical">🫁 العناية</button>
            <button class="glass-cam-btn" data-action="view-top">⇧ مسقط علوي</button>
            <button class="glass-cam-btn" data-action="connections">${I.showConnections?"مسارات: مفعّلة":"مسارات: مخفية"}</button>
          </div>
        </div>
      </div>

      <!-- 2. Mobile Energy Breakdown Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-hud-backdrop" data-action="close-mobile-hud"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-hud-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="glass-dot-live"></span>
            <strong>تفاصيل تدفق الطاقة والاستقلالية</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-hud">✕</button>
        </div>
        <div class="sheet-body">
          <div class="glass-metric-row">
            <div class="glass-metric-item">
              <span class="g-label">الحمل الطبي الكلي</span>
              <strong class="g-val mono" id="m-sheet-load">${Dt(i.loadW)}</strong>
            </div>
            <div class="glass-metric-item">
              <span class="g-label">توليد الألواح (DC)</span>
              <strong class="g-val mono" style="color:var(--orange)" id="m-sheet-solar">${Dt(i.solarDcW)}</strong>
            </div>
          </div>
          <div class="glass-metric-row">
            <div class="glass-metric-item">
              <span class="g-label">شحن البطارية (SOC)</span>
              <strong class="g-val mono" style="color:var(--green)" id="m-sheet-soc">${Math.round(I.soc)}%</strong>
            </div>
            <div class="glass-metric-item">
              <span class="g-label">الشبكة العامة</span>
              <strong class="g-val" id="m-sheet-grid">${I.gridAvailable?"متاحة 🟢":"منقطعة 🔴"}</strong>
            </div>
          </div>
          <div class="glass-autonomy-line" style="margin-top:8px">
            <span>زمن استقلالية البطارية عند الانقطاع:</span>
            <strong class="mono" id="m-sheet-autonomy" style="color:#5ce2ba">${Di(En({...I,gridAvailable:!1}).autonomyHours)}</strong>
          </div>
          <div class="glass-autonomy-line" style="margin-top:6px">
            <span>حالة التغذية الإجمالية:</span>
            <span class="tag ${i.unmetLoadW>1?"red":"green"}" id="m-sheet-status-tag">${i.unmetLoadW>1?"عجز تغذية":"تغذية مستقرة 100%"}</span>
          </div>
        </div>
      </div>

      <!-- 3. Mobile Cables Selector Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-cables-backdrop" data-action="close-mobile-cables"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-cables-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">⚡</span>
            <strong>فحص مسارات الكابلات والتوصيلات</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-cables">✕</button>
        </div>
        <div class="sheet-body">
          <p class="tiny-note" style="margin-bottom:10px">اختر أي مسار كهربائي لتسليط الضوء عليه في المشهد ثلاثي الأبعاد وعرض مواصفاته الهندسية:</p>
          <div class="mobile-cables-list">
            <button class="mobile-cable-tile" data-inspect="pv-mppt">
              <span class="cable-dot" style="background:#38bdf8"></span>
              <div class="cable-info"><strong>كابل الألواح الشمسية (PV String)</strong><small>DC 94.2V · 6mm² LSZH عزل مزدوج</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="mppt-battery">
              <span class="cable-dot" style="background:#10b981"></span>
              <div class="cable-info"><strong>ناقل شحن البطارية (Charge Bus)</strong><small>DC 48V / 80A · 35mm² مرن عالي التحمل</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="battery-inverter">
              <span class="cable-dot" style="background:#f59e0b"></span>
              <div class="cable-info"><strong>ناقل تفريغ البطارية للعاكس (Heavy Bus)</strong><small>DC 48V / 200A · 70mm² نحاس معزول</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="inverter-ats">
              <span class="cable-dot" style="background:#10b981"></span>
              <div class="cable-info"><strong>خرج العاكس لمفتاح ATS (Source B)</strong><small>AC 230V موجة جيبية نقية · 4mm²</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="grid-ats">
              <span class="cable-dot" style="background:#38bdf8"></span>
              <div class="cable-info"><strong>تغذية الشبكة العامة (Source A)</strong><small>AC 230V / 32A · 6mm² NYY-J مدرع</small></div>
              <span class="cable-arrow">←</span>
            </button>
            <button class="mobile-cable-tile" data-inspect="ats-icu">
              <span class="cable-dot" style="background:#00f5b8"></span>
              <div class="cable-info"><strong>خط العناية المركزة الرئيسي (IPS Trunk)</strong><small>AC 230V معزول IT System · 6mm² LSZH</small></div>
              <span class="cable-arrow">←</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Mobile Interactive Object Explainer Sheet -->
      <div class="mobile-sheet-backdrop hidden" id="mobile-explainer-backdrop" data-action="close-mobile-explainer"></div>
      <div class="mobile-bottom-sheet hidden" id="mobile-explainer-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">
            <span class="sheet-icon">🔍</span>
            <strong id="m-explainer-heading">تفاصيل المكوّن المختار</strong>
          </div>
          <button class="sheet-close-btn" data-action="close-mobile-explainer">✕</button>
        </div>
        <div class="sheet-body" id="m-explainer-content">
          ${Vr()}
        </div>
      </div>
      </div>

      <!-- Operational Section Below Canvas: Medical Loads & Power Analysis -->
      <div class="lab-bottom-section">
        <div class="grid two-col">
          <!-- Direct Medical Device Toggles -->
          <section class="panel glass-panel">
            <div class="panel-heading">
              <div>
                <h2 class="panel-title">الأجهزة الطبية في وحدة العناية المركزة</h2>
                <p class="panel-subtitle">بدّل تشغيل الأجهزة لمشاهدة استجابة أسلاك التغذية ومسارات الطاقة في المشهد 3D فورياً</p>
              </div>
              <div class="panel-actions">
                <button class="secondary-btn small-btn" data-action="all-on">تشغيل الكل</button>
                <button class="secondary-btn small-btn" data-action="all-off">إيقاف الكل</button>
              </div>
            </div>
            <div class="load-list">
              ${bc(!0)}
            </div>
          </section>

          <!-- Real-time Energy Balance & Distribution Analysis -->
          <section class="panel glass-panel">
            <div class="panel-heading">
              <div>
                <h2 class="panel-title">توازن وتوزيع القدرة الكهربائية</h2>
                <p class="panel-subtitle">تحليل فوري لكيفية تغطية أحمال العناية المركزة من المصادر الثلاثة</p>
              </div>
              <span class="tag ${i.unmetLoadW>1?"red":"green"}">${i.unmetLoadW>1?"عجز في القدرة":"الحمل مغطّى بالكامل"}</span>
            </div>
            <div class="chart-wrap"><canvas id="energy-chart" aria-label="رسم توضيحي لتوازن الطاقة"></canvas></div>
            <div class="chart-axis"><span>PV</span><span>Battery</span><span>Grid</span><span>Load</span></div>
            <div class="divider"></div>
            <div class="control-grid">
              <div class="control-tile"><span class="tiny">الشمس إلى الحمل</span><strong id="lab-solar-load">${Dt(i.solarToLoadW)}</strong></div>
              <div class="control-tile"><span class="tiny">البطارية إلى الحمل</span><strong id="lab-battery-load">${Dt(i.batterySupplyW)}</strong></div>
              <div class="control-tile"><span class="tiny">الشبكة إلى الحمل</span><strong id="lab-grid-load">${Dt(i.gridSupplyW)}</strong></div>
              <div class="control-tile"><span class="tiny">القدرة غير المغطاة</span><strong id="lab-unmet-val">${Dt(i.unmetLoadW)}</strong></div>
            </div>
          </section>
        </div>
      </div>
    </div>
    ${ao()}`}function B0(){return`${D0("COMPONENT LIBRARY & EXPLANATIONS","المكوّنات والشروحات الهندسية","دليل شامل لكل مكون من مكونات المنظومة مع الوظيفة، المواصفات الفنية المرجعية، وشروحات الأجهزة الطبية واحتياطات السلامة.",'<span class="tag blue">7 مكوّنات رئيسية</span><span class="tag green">7 أحمال طبية</span>')}
    ${yc()}
    <div class="grid component-grid">${cs.map(i=>`<article class="component-card">
      <div class="component-card-top">
        <div class="component-icon">${Ec(i.id)}</div>
        <span class="component-rating">${i.rating}</span>
      </div>
      <div>
        <h3>${i.name}</h3>
        <div class="component-en">${i.en}</div>
      </div>
      <p>${i.description}</p>
      <div class="spec-pill-list">${i.specs.slice(0,3).map(([t,e])=>`<span class="spec-pill">${t}: ${e}</span>`).join("")}</div>
      <button class="primary-btn small-btn" data-inspect="${i.id}">عرض في العالم ثلاثي الأبعاد ↗</button>
    </article>`).join("")}</div>
    <div class="grid two-col" style="margin-top:17px">
      <section class="panel">
        <div class="panel-heading">
          <div><h2 class="panel-title">الأجهزة الطبية في وحدة العناية المركزة</h2><p class="panel-subtitle">الأحمال الكهربائية للأجهزة الحرجة المعتمدة في المشروع</p></div>
          <span class="tag muted">ICU LOADS</span>
        </div>
        <div class="load-list">${bc(!1)}</div>
        <p class="tiny-note">الأحمال الطبية المذكورة مأخوذة من الدراسة المرجعية للمشروع. في التصاميم الواقعية يجب حساب تيارات البدء (Inrush currents) ومعامل القدرة (Power factor) لكل جهاز طبي.</p>
      </section>
      <section class="panel">
        <div class="panel-heading">
          <div><h2 class="panel-title">المواصفات الكلية للمنظومة</h2><p class="panel-subtitle">القيم المرجعية لمنظومة الطاقة الاحتياطية</p></div>
        </div>
        <div class="status-line"><span>القدرة الاسمية للألواح (PV Array)</span><strong class="mono">2400 Wp (6 × 400W)</strong></div>
        <div class="status-line"><span>كفاءة منظم الشحن MPPT</span><strong class="mono">97%</strong></div>
        <div class="status-line"><span>كفاءة العاكس (Inverter)</span><strong class="mono">94% Pure Sine</strong></div>
        <div class="status-line"><span>سعة بنك البطاريات الكلية</span><strong class="mono">9.6 kWh (48V / 200Ah)</strong></div>
        <div class="status-line"><span>القدرة القصوى للعاكس</span><strong class="mono">2000 W مستمر</strong></div>
        <div class="status-line"><span>زمن التحويل التلقائي (ATS)</span><strong class="mono">&lt; 10 ms</strong></div>
        <button class="primary-btn" style="width:100%;margin-top:16px" data-page="lab">فتح المشهد ثلاثي الأبعاد ↗</button>
      </section>
    </div>
    ${ao()}`}function ao(){return'<footer class="footer"><span>ICU Power Lab 3D · مشروع تخرج / مختبر تعليمي</span><span>جامعة المعارف — كلية الهندسة التقنية — قسم هندسة تقنيات الأجهزة الطبية</span></footer>'}function Gr(i,t,e){const n=document.querySelector("#tour-play-btn");n&&(n.textContent=e?"⏸ إيقاف مؤقت":"▶ تشغيل جولة الفيديو",n.classList.toggle("active",e));const s=document.querySelector("#tour-voice-btn");s&&lt&&(s.textContent=lt.voiceEnabled?"🔊 الصوت مفعّل":"🔇 تشغيل الصوت",s.classList.toggle("strong-green",lt.voiceEnabled)),document.querySelectorAll(".timeline-step").forEach((f,p)=>{f.classList.toggle("active",p===i),f.classList.toggle("completed",p<i)});const r=document.querySelector("#tour-timecode");r&&t&&(r.textContent=t.timeCode);const o=document.querySelector("#caption-step-num");o&&(o.textContent=`${i+1}`);const l=document.querySelector("#caption-time-tag");l&&t&&(l.textContent=t.timeCode);const c=document.querySelector("#caption-title");c&&t&&(c.textContent=t.title);const d=document.querySelector("#caption-en");d&&t&&(d.textContent=t.en);const u=document.querySelector("#caption-text");u&&t&&(u.textContent=t.narration)}function bn(){lt&&(lt.dispose(),lt=null);const i=document.querySelector("#page-view"),t={lab:Ll,home:O0,components:B0};i.innerHTML=(t[I.page]||Ll)(),document.querySelectorAll("[data-page]").forEach(r=>r.classList.toggle("active",r.dataset.page===I.page)),document.querySelectorAll(".mobile-nav-btn").forEach(r=>r.classList.toggle("active",r.dataset.page===I.page)),document.querySelectorAll(".top-nav-btn").forEach(r=>r.classList.toggle("active",r.dataset.page===I.page));const e=document.querySelector("#app-shell");e&&e.classList.toggle("fullwidth-lab-shell",I.page==="lab");const n=document.querySelector(".layout");n&&n.classList.toggle("fullwidth-layout",I.page==="lab");const s=document.querySelector(".sidebar");s&&s.classList.toggle("lab-hidden",I.page==="lab");const a=document.querySelector(".main-content");if(a&&a.classList.toggle("expansive-main",I.page==="lab"),I.page==="lab"){const r=document.querySelector("#scene-container");lt=new P0(r,{onSelect:(o,l)=>{Hr(o)},onTourChange:(o,l,c)=>{Gr(o,l,c),l.action==="grid-toggle"&&(I.gridAvailable=!1,wn())},onEvent:(o,l)=>{Qe(l.title,l.message)}}),lt.setConnectionsVisible(I.showConnections),lt.updateState({...ci(),irradiance:I.irradiance,soc:I.soc,gridAvailable:I.gridAvailable,devices:I.devices}),lt.select(I.selectedId),Gr(lt.tourIndex,De[lt.tourIndex],lt.tourPlaying)}ro(),wn()}function k0(i){var c,d,u,f,p,g,v,m,h,T,M,b,D,A,R,L,S,x,C,B,k,q,Y,H,Q,W;const t=(c=i.target.closest("[data-set-irr]"))==null?void 0:c.dataset.setIrr;if(t!==void 0){I.irradiance=Number(t),wn(),Qe(`☀️ ضبط الإشعاع الشمسي: ${t}%`,`تم تغيير شدة الإشعاع الشمسي إلى ${t}%. تم تحديث توليد الألواح وتدفق تيار DC إلى منظم MPPT فورياً.`);return}const e=(d=i.target.closest("[data-preset-irr]"))==null?void 0:d.dataset.presetIrr;if(e!==void 0){I.irradiance=Number(e),wn(),Qe(`☀️ تعديل الإشعاع: ${I.irradiance}%`,`تم ضبط الإشعاع الشمسي على ${I.irradiance}% لاختبار توليد المنظومة.`);return}const n=(u=i.target.closest("[data-preset-soc]"))==null?void 0:u.dataset.presetSoc;if(n!==void 0){I.soc=Number(n),wn(),Qe(`🔋 تعديل شحن البطارية: ${I.soc}%`,`تم ضبط نسبة شحن بنك البطاريات على ${I.soc}% لاختبار استقلالية المنظومة.`);return}const s=i.target.closest("[data-page]");if(s){const it=s.dataset.page;if(it==="components"){I.page!=="lab"&&(I.page="lab",bn()),Hr(I.selectedId||"solar");return}it&&it!==I.page&&(I.page=it,bn());return}const a=i.target.closest("[data-tour-step]");if(a&&lt){lt.goToTourStep(Number(a.dataset.tourStep));return}const r=i.target.closest("[data-scenario]");if(r){H0(r.dataset.scenario),(f=document.querySelector("#mobile-controls-sheet"))==null||f.classList.add("hidden"),(p=document.querySelector("#mobile-controls-backdrop"))==null||p.classList.add("hidden");return}const o=i.target.closest("[data-inspect]");if(o){const it=o.dataset.inspect;(g=document.querySelector("#mobile-cables-sheet"))==null||g.classList.add("hidden"),(v=document.querySelector("#mobile-cables-backdrop"))==null||v.classList.add("hidden"),Hr(it);return}const l=(m=i.target.closest("[data-action]"))==null?void 0:m.dataset.action;if(l)switch(l){case"grid-toggle":I.gridAvailable=!I.gridAvailable,bn(),I.gridAvailable?Qe("↻ عودة تغذية الشبكة العامة","عادت الشبكة الكهربائية الرئيسية، وبدأ شحن بنك البطاريات مع استمرار التغذية المستقرة لأجهزة دعم الحياة."):Qe("⚡ محاكاة انقطاع الشبكة العامة","تم تفعيل مفتاح التحويل التلقائي ATS لنقل تغذية أجهزة العناية المركزة فورياً إلى عاكس الطاقة وبنك البطاريات خلال أقل من 10ms دون انقطاع.");break;case"open-mobile-controls":(h=document.querySelector("#mobile-controls-sheet"))==null||h.classList.remove("hidden"),(T=document.querySelector("#mobile-controls-backdrop"))==null||T.classList.remove("hidden");break;case"close-mobile-controls":(M=document.querySelector("#mobile-controls-sheet"))==null||M.classList.add("hidden"),(b=document.querySelector("#mobile-controls-backdrop"))==null||b.classList.add("hidden");break;case"toggle-mobile-hud":{const nt=document.querySelector("#mobile-hud-sheet"),ot=document.querySelector("#mobile-hud-backdrop");if(nt){const Ct=nt.classList.contains("hidden");nt.classList.toggle("hidden",!Ct),ot==null||ot.classList.toggle("hidden",!Ct)}}break;case"close-mobile-hud":(D=document.querySelector("#mobile-hud-sheet"))==null||D.classList.add("hidden"),(A=document.querySelector("#mobile-hud-backdrop"))==null||A.classList.add("hidden");break;case"open-mobile-cables":(R=document.querySelector("#mobile-cables-sheet"))==null||R.classList.remove("hidden"),(L=document.querySelector("#mobile-cables-backdrop"))==null||L.classList.remove("hidden");break;case"close-mobile-cables":(S=document.querySelector("#mobile-cables-sheet"))==null||S.classList.add("hidden"),(x=document.querySelector("#mobile-cables-backdrop"))==null||x.classList.add("hidden");break;case"toggle-tour":case"toggle-mobile-tour":{const nt=document.querySelector("#glass-tour");if(nt){const ot=nt.classList.contains("hidden");nt.classList.toggle("hidden",!ot),nt.classList.toggle("mobile-tour-visible",ot),ot&&lt?lt.startTour():!ot&&lt&&lt.tourPlaying&&lt.pauseTour()}}break;case"speak-explainer":{const nt=I.selectedId||"solar",ot=xc(nt);let Ct="";if(Wi[nt])Ct=Wi[nt].description;else{const X=cs.find(tt=>tt.id===nt);if(X)Ct=`${X.description} الأهمية الهندسية والسريرية: ${X.safety}`;else{const tt=dn.find(ht=>ht.id===nt);tt&&(Ct=`${tt.name}. جهاز طبي ضمن منظومة العناية المركزة بقدرة ${tt.watts} واط. يحميه نظام التغذية المعزول IPS لضمان عدم توقف دعم الحياة.`)}}const Wt=`رسالة شرح: ${ot}. ${Ct}`;if(lt&&typeof lt.speakNarration=="function")lt.speakNarration(Wt);else if("speechSynthesis"in window){window.speechSynthesis.cancel();const X=new SpeechSynthesisUtterance(Wt);X.lang="ar-SA",window.speechSynthesis.speak(X)}}break;case"close-desktop-explainer":case"close-mobile-explainer":(C=document.querySelector("#glass-explainer"))==null||C.classList.add("hidden"),(B=document.querySelector("#mobile-explainer-sheet"))==null||B.classList.add("hidden"),(k=document.querySelector("#mobile-explainer-backdrop"))==null||k.classList.add("hidden"),"speechSynthesis"in window&&window.speechSynthesis.cancel();break;case"toggle-explainer":(q=document.querySelector("#glass-explainer"))==null||q.classList.toggle("collapsed");break;case"toggle-hud":(Y=document.querySelector("#glass-hud"))==null||Y.classList.toggle("mobile-hud-expanded");break;case"toggle-controls":(H=document.querySelector("#glass-controls"))==null||H.classList.toggle("mobile-expanded");break;case"close-event":(Q=document.querySelector("#glass-event-pill"))==null||Q.classList.add("hidden");break;case"all-on":I.devices.forEach(nt=>nt.on=!0),bn(),Qe("🫁 تشغيل جميع الأجهزة الطبية","تم تفعيل كل أجهزة العناية المركزة. ارتفع الحمل الإجمالي وتدفقت الطاقة في كافة مسارات التغذية.");break;case"all-off":I.devices.forEach(nt=>nt.on=!1),bn(),Qe("⏹ إيقاف جميع الأجهزة","تم إيقاف أحمال العناية المركزة لمراقبة استهلاك الاستعداد.");break;case"reset":G0();break;case"play":W0();break;case"connections":I.showConnections=!I.showConnections,lt==null||lt.setConnectionsVisible(I.showConnections),document.querySelectorAll('[data-action="connections"]').forEach(nt=>{nt.textContent=I.showConnections?"مسارات: مفعّلة":"مسارات: مخفية"});break;case"view-overview":lt==null||lt.setView("overview");break;case"view-power":lt==null||lt.setView("power");break;case"view-medical":lt==null||lt.setView("medical");break;case"view-top":lt==null||lt.setView("top");break;case"tour-play":if(!lt)break;lt.tourPlaying?lt.pauseTour():lt.startTour();break;case"tour-next":lt==null||lt.nextTourStep();break;case"tour-prev":lt==null||lt.prevTourStep();break;case"tour-voice":lt&&(lt.setVoiceEnabled(!lt.voiceEnabled),Gr(lt.tourIndex,De[lt.tourIndex],lt.tourPlaying));break;case"fullscreen":lt==null||lt.toggleFullscreen();break;case"present":I.presentationMode=!I.presentationMode,(W=document.querySelector("#app-shell"))==null||W.classList.toggle("presentation-shell",I.presentationMode);const it=document.querySelector('[data-action="present"]');it&&(it.textContent=I.presentationMode?"✕ إنهاء وضع العرض":"▣ وضع العرض"),ca(I.presentationMode?"تم تفعيل وضع العرض. استخدم القائمة للتنقل ثم أنهِ الوضع عند الحاجة.":"تم إنهاء وضع العرض.");break;case"export":$0();break}}function z0(i){const t=i.target.dataset.input;t==="irradiance"?(I.irradiance=Number(i.target.value),wn()):t==="soc"&&(I.soc=Number(i.target.value),wn())}function V0(i){const t=i.target.dataset.device;if(t){const e=I.devices.find(n=>n.id===t);e&&(e.on=i.target.checked,Qe(`${e.on?"🔌 تفعيل":"⏹ إيقاف"} ${e.name}`,`${e.name} (${e.watts}W) ${e.on?"يعمل الآن ويستهلك طاقة من المنظومة.":"تم إيقافه."}`)),wn()}}function H0(i){const t=Dl.find(e=>e.id===i);t&&(I.irradiance=t.irradiance,I.soc=t.soc,I.gridAvailable=t.grid,t.allDevices?I.devices.forEach(e=>e.on=!0):I.devices=dn.map(e=>({...e})),bn(),ca(`تم تطبيق سيناريو: ${t.name}`),Qe(`⚡ سيناريو: ${t.name}`,t.description))}function G0(){Sc(),I.irradiance=70,I.soc=71,I.gridAvailable=!0,I.devices=dn.map(i=>({...i})),bn(),ca("رجعت المنظومة إلى القيم الافتراضية."),Qe("↻ إعادة ضبط المنظومة","عادت جميع المتغيرات والأحمال إلى الحالة القياسية المرجعية.")}function W0(){if(I.playing){Sc();return}I.playing=!0,Mc(),Js=setInterval(()=>{I.soc=Rc({soc:I.soc,hours:1/60,irradiance:I.irradiance,gridAvailable:I.gridAvailable,devices:I.devices}),(I.soc<=.1||I.soc>=99.9)&&(I.soc=Math.max(0,Math.min(100,I.soc))),wn()},1e3)}function Sc(){Js&&clearInterval(Js),Js=null,I.playing=!1,Mc()}function Mc(){const i=document.querySelector('[data-action="play"]');i&&(i.textContent=I.playing?"Ⅱ إيقاف الزمن":"▶ تقدّم دقيقة")}function wn(){const i=ci(),t=(P,Zt)=>{const kt=document.getElementById(P);kt&&(kt.textContent=Zt)},e=Math.max(1,i.loadW),n=Math.min(100,Math.round(i.loadW/ne.inverterLimitW*100)),s=Math.min(100,Math.round(i.solarDcW/ne.panelWp*100)),a=Math.round(I.soc*(ne.batteryWh/100)),r=Math.min(100,Math.round((i.solarToLoadW+i.batterySupplyW)/e*100)),o=i.solarToLoadW+i.gridSupplyW+i.batterySupplyW,l=Math.min(100,Math.round(i.solarToLoadW/e*100)),c=Math.min(100,Math.round(i.batterySupplyW/e*100)),d=Math.min(100,Math.round(i.gridSupplyW/e*100)),u=Math.min(100,Math.round(i.unmetLoadW/e*100));t("home-load",Dt(i.loadW)),t("home-load-ratio",`${n}% من العاكس`);const f=document.getElementById("home-load-bar");f&&(f.style.width=`${n}%`,f.style.background=n>90?"var(--red)":n>75?"var(--orange)":"var(--blue)"),t("home-solar",Dt(i.solarDcW)),t("home-irr-tag",`إشعاع ${I.irradiance}%`);const p=document.getElementById("home-pv-bar");p&&(p.style.width=`${s}%`),t("home-soc",`${Math.round(I.soc)}%`),t("home-batt-kwh",`${(a/1e3).toFixed(1)} kWh`);const g=document.getElementById("home-soc-bar");g&&(g.style.width=`${Math.round(I.soc)}%`,g.style.background=I.soc<20?"var(--red)":I.soc<40?"var(--orange)":"var(--green)"),t("home-grid-val",Dt(i.gridSupplyW));const v=document.getElementById("home-grid-val");v&&(v.style.color=I.gridAvailable?"#7c9cff":"var(--muted)");const m=document.getElementById("home-grid-status-tag");m&&(m.textContent=I.gridAvailable?"متاحة ومستقرة":"منقطعة",m.className=`tag ${I.gridAvailable?"green":"red"}`);const h=document.getElementById("home-grid-bar");h&&(h.style.width=I.gridAvailable?"100%":"0%"),t("home-autonomy",Di(En({...I,gridAvailable:!1}).autonomyHours)),t("home-self-sufficiency",`${r}%`);const T=document.getElementById("home-self-sufficiency");T&&(T.style.color=i.unmetLoadW>1?"var(--red)":"#33d6a6");const M=document.getElementById("home-unmet-tag");M&&(M.textContent=i.unmetLoadW>1?`عجز ${Math.round(i.unmetLoadW)} W`:"مغطى 100%",M.className=`tag ${i.unmetLoadW>1?"red":"green"}`);const b=document.getElementById("home-balance-caption");b&&(b.textContent=i.unmetLoadW>1?"تحذير: القدرة المطلوبة تتجاوز إمدادات الطاقة!":"الحمل الطبي مغطّى بالكامل مع أمان واستقرار.");const D=document.getElementById("home-self-bar");D&&(D.style.width=`${r}%`,D.style.background=i.unmetLoadW>1?"var(--red)":"#33d6a6");const A=document.getElementById("split-solar");A&&(A.style.width=`${l}%`);const R=document.getElementById("split-batt");R&&(R.style.width=`${c}%`);const L=document.getElementById("split-grid");L&&(L.style.width=`${d}%`);const S=document.getElementById("split-unmet");S&&(S.style.width=`${u}%`),t("split-lbl-solar",`${l}%`),t("split-lbl-batt",`${c}%`),t("split-lbl-grid",`${d}%`),t("split-lbl-unmet",`${u}%`),t("home-solar-load",Dt(i.solarToLoadW)),t("home-battery-load",Dt(i.batterySupplyW)),t("home-grid-load",Dt(i.gridSupplyW)),t("home-covered",Dt(o)),t("home-inverter-headroom",`${Math.max(0,ne.inverterLimitW-i.loadW)} W`),t("home-renewable-ratio",`${r}%`);const x=i.solarDcW>10,C=!I.gridAvailable||i.batterySupplyW>10,B=I.gridAvailable,k=i.loadW>0&&i.unmetLoadW<=1;t("schematic-pv-w",Dt(i.solarDcW)),t("schematic-batt-soc",`${Math.round(I.soc)}% (${(a/1e3).toFixed(1)} kWh)`),t("schematic-inv-w",Dt(i.solarToLoadW+i.batterySupplyW)),t("schematic-ats-source",B?"Source A: شبكة":"Source B: عاكس"),t("schematic-load-w",Dt(i.loadW));const q=document.getElementById("schematic-grid-tag");q&&(q.textContent=B?"🟢 الشبكة متاحة":"🔴 الشبكة مفصولة (ATS)",q.className=`tag ${B?"green":"red"}`);const Y=document.getElementById("schematic-balance-tag");Y&&(Y.textContent=i.unmetLoadW>1?"عجز تغذية":"تغذية مؤمنة 100%",Y.className=`tag ${i.unmetLoadW>1?"red":"green"}`);const H=(P,Zt,kt,qt="#23415f",Rt="6 4")=>{const Yt=document.getElementById(P);Yt&&(Yt.setAttribute("stroke",Zt?kt:qt),Yt.setAttribute("stroke-dasharray",Zt?Rt:"none"),Yt.classList.toggle("wire-active",!!Zt))};H("schematic-wire-pv",x,"#ffb85c"),H("schematic-wire-mppt",x,"#33d6a6"),H("schematic-wire-batt",C,"#f59e0b"),H("schematic-wire-inv",C||x,"#33d6a6"),H("schematic-wire-grid",B,"#5b8cff","#662233"),H("schematic-wire-icu",k,"#00f5b8","#ff4466","8 4");const Q=I.devices.filter(P=>["vent","monitor","defib"].includes(P.id)),W=I.devices.filter(P=>["infusion","syringe"].includes(P.id)),it=I.devices.filter(P=>["incubator","oxygen"].includes(P.id));t("cat-1-watts",`${Q.reduce((P,Zt)=>P+(Zt.on?Zt.watts:0),0)} W`),t("cat-2-watts",`${W.reduce((P,Zt)=>P+(Zt.on?Zt.watts:0),0)} W`),t("cat-3-watts",`${it.reduce((P,Zt)=>P+(Zt.on?Zt.watts:0),0)} W`),I.devices.forEach(P=>{const Zt=document.getElementById(`load-watt-${P.id}`);Zt&&(Zt.textContent=P.on?`${P.watts} W`:"0 W",Zt.style.color=P.on?"var(--green)":"var(--muted)")}),t("home-unmet",Dt(i.unmetLoadW)),t("home-grid-status",I.gridAvailable?"متاحة":"منقطعة"),t("lab-load",Dt(i.loadW)),t("lab-solar",Dt(i.solarDcW)),t("lab-grid",Dt(i.gridSupplyW)),t("lab-unmet",Dt(i.unmetLoadW)),t("glass-load",Dt(i.loadW)),t("glass-solar",Dt(i.solarDcW)),t("glass-soc",`${Math.round(I.soc)}%`),t("glass-grid-status",I.gridAvailable?"متاحة 🟢":"منقطعة 🔴");const nt=document.getElementById("glass-grid-status");nt&&(nt.style.color=I.gridAvailable?"var(--green)":"var(--red)"),t("glass-autonomy",Di(En({...I,gridAvailable:!1}).autonomyHours)),t("glass-irr-val",`${I.irradiance}%`),t("lab-solar-load",Dt(i.solarToLoadW)),t("lab-battery-load",Dt(i.batterySupplyW)),t("lab-grid-load",Dt(i.gridSupplyW)),t("lab-unmet-val",Dt(i.unmetLoadW)),t("m-glass-load",Dt(i.loadW)),t("m-glass-solar",Dt(i.solarDcW)),t("m-glass-soc",`${Math.round(I.soc)}%`),t("m-glass-grid-status",I.gridAvailable?"🟢 شبكة":"🔴 منقطعة");const ot=document.getElementById("m-glass-grid-status");ot&&(ot.style.color=I.gridAvailable?"var(--green)":"var(--red)"),t("m-glass-irr-val",`${I.irradiance}%`),t("m-sheet-load",Dt(i.loadW)),t("m-sheet-solar",Dt(i.solarDcW)),t("m-sheet-soc",`${Math.round(I.soc)}%`),t("m-sheet-grid",I.gridAvailable?"متاحة 🟢":"منقطعة 🔴");const Ct=document.getElementById("m-sheet-grid");Ct&&(Ct.style.color=I.gridAvailable?"var(--green)":"var(--red)"),t("m-sheet-autonomy",Di(En({...I,gridAvailable:!1}).autonomyHours));const Wt=document.getElementById("m-sheet-status-tag");Wt&&(Wt.textContent=i.unmetLoadW>1?"عجز تغذية":"تغذية مستقرة 100%",Wt.className=`tag ${i.unmetLoadW>1?"red":"green"}`);const X=document.querySelector("#glass-status-tag");X&&(X.textContent=i.unmetLoadW>1?"عجز تغذية":"تغذية مستقرة",X.className=`tag ${i.unmetLoadW>1?"red":"green"}`);const tt=document.querySelector("#lab-result-status");tt&&(tt.textContent=i.unmetLoadW>1?"عجز في التغطية":"الحمل مغطّى",tt.className=`tag ${i.unmetLoadW>1?"red":"green"}`);const ht=document.querySelector("#lab-unmet");ht&&ht.classList.toggle("high-load",i.unmetLoadW>1);const rt=document.querySelector("#home-unmet");rt&&rt.classList.toggle("high-load",i.unmetLoadW>1);const bt=document.querySelector("#device-count");bt&&(bt.textContent=`${I.devices.filter(P=>P.on).length} / ${I.devices.length} نشط`),document.querySelectorAll("#grid-badge").forEach(P=>{P.textContent=I.gridAvailable?"متاحة ومستقرة":"منقطعة (معزولة)",P.className=`tag ${I.gridAvailable?"green":"red"}`}),document.querySelectorAll('input[data-input="irradiance"]').forEach(P=>{Number(P.value)!==I.irradiance&&(P.value=I.irradiance)}),document.querySelectorAll("#irradiance-value").forEach(P=>{P.textContent=`${I.irradiance}%`}),document.querySelectorAll('input[data-input="soc"]').forEach(P=>{Number(P.value)!==Math.round(I.soc)&&(P.value=Math.round(I.soc))}),document.querySelectorAll("#soc-value").forEach(P=>{P.textContent=`${Math.round(I.soc)}%`}),lt&&lt.updateState({...i,irradiance:I.irradiance,soc:I.soc,gridAvailable:I.gridAvailable,devices:I.devices}),ro()}function ro(){const i=document.querySelector("#energy-chart");if(!i)return;const t=i.getBoundingClientRect();if(t.width<2||t.height<2)return;const e=Math.min(window.devicePixelRatio||1,1.7);i.width=Math.round(t.width*e),i.height=Math.round(t.height*e);const n=i.getContext("2d");n.scale(e,e);const s=t.width,a=t.height;n.clearRect(0,0,s,a);for(let g=0;g<4;g++){const v=24+g*(a-48)/3;n.beginPath(),n.moveTo(10,v),n.lineTo(s-10,v),n.strokeStyle="#1d3550",n.lineWidth=1,n.stroke()}const r=ci(),o=[r.solarToLoadW,r.batterySupplyW,r.gridSupplyW,r.loadW],l=["الشمس","البطارية","الشبكة","الحمل"],c=["#ffb85c","#33d6a6","#7c9cff","#5b8cff"],d=Math.max(ne.inverterLimitW,...o,800),u=(s-50)/4,f=a-28,p=a-58;o.forEach((g,v)=>{const m=Math.max(g>0?3:0,g/d*p),h=25+v*u+u*.22,T=u*.48,M=n.createLinearGradient(0,f-m,0,f);M.addColorStop(0,c[v]),M.addColorStop(1,c[v]+"55"),n.fillStyle=M,X0(n,h,f-m,T,m,7),n.fill(),n.fillStyle="#bfd0e6",n.font="11px Tajawal,Arial",n.textAlign="center",n.fillText(`${Math.round(g)}W`,h+T/2,Math.max(14,f-m-8)),n.fillStyle="#6e88a7",n.font="10px Tajawal,Arial",n.fillText(l[v],h+T/2,a-8)})}function X0(i,t,e,n,s,a){s<1||(i.beginPath(),i.moveTo(t+a,e),i.arcTo(t+n,e,t+n,e+s,a),i.arcTo(t+n,e+s,t,e+s,a),i.arcTo(t,e+s,t,e,a),i.arcTo(t,e,t+n,e,a),i.closePath())}function Ec(i){return{solar:"☼",mppt:"◫",battery:"▰",inverter:"ϟ",ats:"⇄",grid:"⌁",icu:"✚"}[i]||"◈"}function oo(i){return{vent:"🫁",monitor:"📈",infusion:"💧",syringe:"💉",defib:"♡",incubator:"♧",oxygen:"◉"}[i]||"▣"}function $0(){const i=ci(),t={project:"ICU Power Lab 3D",generatedAt:new Date().toISOString(),educationalOnly:!0,sourceBaseline:{panelWp:ne.panelWp,mpptEfficiency:ne.mpptEfficiency,inverterEfficiency:ne.inverterEfficiency,batteryWh:ne.batteryWh,inverterLimitW:ne.inverterLimitW},state:{irradiancePercent:I.irradiance,batterySocPercent:I.soc,gridAvailable:I.gridAvailable,devices:I.devices.map(a=>({id:a.id,name:a.name,watts:a.watts,on:a.on}))},calculated:{loadW:i.loadW,solarDcW:i.solarDcW,solarToLoadW:i.solarToLoadW,batterySupplyW:i.batterySupplyW,gridSupplyW:i.gridSupplyW,unmetLoadW:i.unmetLoadW,autonomyHours:En({...I,gridAvailable:!1}).autonomyHours},assumptions:["الأحمال والمواصفات مرجعية من دراسة المشروع وليست مواصفات مُعتمدة لطراز محدد.","شحن البطارية 1200W وتفريغها 1800W افتراضان تعليميان.","المجسمات توضيحية، ولا يجوز استخدامها كمخطط تنفيذ أو كاعتماد طبي."]},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json;charset=utf-8"}),n=URL.createObjectURL(e),s=document.createElement("a");s.href=n,s.download="icu-power-lab-report.json",s.click(),URL.revokeObjectURL(n),ca("تم تصدير تقرير الحالة إلى ملف JSON.")}function ca(i){var e;(e=document.querySelector(".toast"))==null||e.remove();const t=document.createElement("div");t.className="toast",t.textContent=i,document.body.appendChild(t),Za&&clearTimeout(Za),Za=setTimeout(()=>t.remove(),3200)}window.addEventListener("resize",ro);function Tc(){try{const i=new Audio;i.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA",i.play().then(()=>i.pause()).catch(()=>{})}catch{}}window.addEventListener("pointerdown",Tc,{once:!0});window.addEventListener("keydown",Tc,{once:!0});L0();
