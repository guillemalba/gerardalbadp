(function(){"use strict";var e={6056:function(e,t,i){var o=i(3751),r=i(641);const n={id:"app"};function s(e,t,i,o,s,a){const l=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",n,[(0,r.bF)(l)])}var a={name:"App"},l=i(6262);const d=(0,l.A)(a,[["render",s]]);var c=d,u=i(6166);const h={class:"home-page"},m={key:0},v={key:1};function p(e,t,i,o,n,s){const a=(0,r.g2)("LeftSidebar"),l=(0,r.g2)("HamburgerMenu"),d=(0,r.g2)("BackgroundVideo"),c=(0,r.g2)("VideoCarousel"),u=(0,r.g2)("VideoPreview"),p=(0,r.g2)("RightSidebar"),f=(0,r.g2)("FooterPage");return(0,r.uX)(),(0,r.CE)("div",h,[(0,r.bF)(a,{class:"left-sidebar"}),n.isSmallScreen?((0,r.uX)(),(0,r.Wv)(l,{key:0})):(0,r.Q3)("",!0),(0,r.Lk)("div",null,[(0,r.bF)(d,{videoSrc:"https://vimeo.com/522837592"}),n.isSmallScreen?((0,r.uX)(),(0,r.CE)("div",m,[(0,r.bF)(c,{title:"MUSIC VIDEOS",relatedVideos:n.musicVideos,type:"music",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(c,{title:"COMMERCIALS",relatedVideos:n.commercialVideos,type:"commercial",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(c,{title:"UNDERWATER",relatedVideos:n.underwaterVideos,type:"underwater",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(c,{title:"FILMS",relatedVideos:n.filmVideos,type:"film",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"])])):((0,r.uX)(),(0,r.CE)("div",v,[(0,r.bF)(u,{title:"MUSIC VIDEOS",videoSrc:n.musicVideos[0].src,relatedVideos:n.musicVideos,type:"music",onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","onPlayVideo"]),(0,r.bF)(u,{title:"COMMERCIALS",videoSrc:n.commercialVideos[0].src,relatedVideos:n.commercialVideos,type:"commercial",onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","onPlayVideo"]),(0,r.bF)(u,{title:"UNDERWATER",videoSrc:n.underwaterVideos[0].src,relatedVideos:n.underwaterVideos,type:"underwater",onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","onPlayVideo"]),(0,r.bF)(u,{title:"FILMS",videoSrc:n.filmVideos[0].src,relatedVideos:n.filmVideos,type:"film",onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","onPlayVideo"])]))]),(0,r.bF)(p,{class:"right-sidebar"}),(0,r.bF)(f)])}i(4114);const f={class:"left-sidebar"},g={class:"vertical-text"};function k(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",f,[(0,r.Lk)("div",g,[(0,r.Lk)("h2",{onClick:t[0]||(t[0]=(...e)=>s.goToHome&&s.goToHome(...e))},"Gerard Alba")])])}var b={name:"LeftSidebar",methods:{goToHome(){this.$router.push({name:"Home"}),this.scrollToTop()},scrollToTop(){this.$nextTick((()=>{window.scrollTo({top:0,behavior:"smooth"})}))}}};const y=(0,l.A)(b,[["render",k],["__scopeId","data-v-411f345a"]]);var L=y;const V={class:"right-sidebar"},w={class:"vertical-text"};function S(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",V,[(0,r.Lk)("div",w,[(0,r.Lk)("h2",{onClick:t[0]||(t[0]=e=>s.goToSection("work"))},"Work"),(0,r.Lk)("h2",{onClick:t[1]||(t[1]=e=>s.goToSection("bio"))},"Bio"),(0,r.Lk)("h2",{onClick:t[2]||(t[2]=(...e)=>s.goToFooter&&s.goToFooter(...e))},"Contact")])])}var C={name:"RightSidebar",methods:{goToSection(e){"work"===e?(this.$router.push({name:"Home"}),this.scrollToElement("#first-video-preview")):"bio"===e&&this.$router.push({name:"Bio"})},goToFooter(){this.$nextTick((()=>{const e=document.querySelector("footer");e&&e.scrollIntoView({behavior:"smooth"})}))},scrollToElement(e){this.$nextTick((()=>{const t=document.querySelector(e);t&&t.scrollIntoView({behavior:"smooth"})}))}}};const T=(0,l.A)(C,[["render",S],["__scopeId","data-v-a5ead9cc"]]);var x=T,E=i(33);const P=e=>((0,r.Qi)("data-v-7bf21783"),e=e(),(0,r.jt)(),e),I={class:"overlay"},R={key:0,class:"video-list-container"},$=P((()=>(0,r.Lk)("span",{class:"arrow left-arrow chevron"},"❮",-1))),_=[$],F={class:"video-list",ref:"videoList"},X=["onClick"],M={class:"hover-overlay"},j={class:"video-info"},A=P((()=>(0,r.Lk)("button",{class:"play-button"},[(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})])],-1))),D=P((()=>(0,r.Lk)("span",{class:"arrow right-arrow chevron"},"❯",-1))),H=[D],B={class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},O=["points"];function U(e,t,i,n,s,a){const l=(0,r.g2)("CButton");return(0,r.uX)(),(0,r.CE)("div",{class:"video-preview",style:(0,E.Tr)({backgroundImage:`url(${i.customThumbnail||s.thumbnail})`})},[(0,r.Lk)("div",I,[(0,r.Lk)("h1",null,(0,E.v_)(i.title),1),(0,r.bF)(l,{icon:"play",onClick:a.playVideo},null,8,["onClick"])]),(0,r.bF)(o.eB,{name:"slide-fade"},{default:(0,r.k6)((()=>[s.showVideoList?((0,r.uX)(),(0,r.CE)("div",R,[(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container left-arrow-container",{invisible:!s.canScrollLeft}]),onClick:t[0]||(t[0]=(...e)=>a.scrollLeft&&a.scrollLeft(...e))},_,2),(0,r.Lk)("div",F,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:"video-item",style:(0,E.Tr)({backgroundImage:`url(${e.thumbnail})`}),onClick:t=>a.handlePlayRelatedVideo(e.src)},[(0,r.Lk)("div",M,[(0,r.Lk)("div",j,[(0,r.Lk)("p",null,(0,E.v_)(e.title)+" / "+(0,E.v_)(e.duration),1)]),A])],12,X)))),128))],512),(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container right-arrow-container",{invisible:!s.canScrollRight}]),onClick:t[1]||(t[1]=(...e)=>a.scrollRight&&a.scrollRight(...e))},H,2)])):(0,r.Q3)("",!0)])),_:1}),(0,r.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.toggleVideoList&&a.toggleVideoList(...e)),class:(0,E.C4)(["custom-button toggle-button",{"moved-up":s.showVideoList}])},[((0,r.uX)(),(0,r.CE)("svg",B,[(0,r.Lk)("polyline",{points:s.showVideoList?"18 15 12 9 6 15":"6 9 12 15 18 9"},null,8,O)])),(0,r.Lk)("span",null,(0,E.v_)(s.showVideoList?"Show Less":"Show More"),1)],2)],4)}const q=e=>((0,r.Qi)("data-v-d87ece66"),e=e(),(0,r.jt)(),e),W={class:"icon3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},z={key:0,points:"5 3 19 12 5 21 5 3"},Q=q((()=>(0,r.Lk)("line",{x1:"12",y1:"5",x2:"12",y2:"19"},null,-1))),G=q((()=>(0,r.Lk)("line",{x1:"5",y1:"12",x2:"19",y2:"12"},null,-1)));function N(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("button",{onClick:t[0]||(t[0]=(...e)=>i.onClick&&i.onClick(...e)),class:(0,E.C4)(["custom-button3",i.additionalClass])},[((0,r.uX)(),(0,r.CE)("svg",W,["play"===i.icon?((0,r.uX)(),(0,r.CE)("polygon",z)):"plus"===i.icon?((0,r.uX)(),(0,r.CE)(r.FK,{key:1},[Q,G],64)):(0,r.Q3)("",!0)]))],2)}var K={name:"CButton",props:{icon:{type:String,required:!0,validator:e=>["play","plus"].includes(e)},onClick:{type:Function,required:!0},additionalClass:{type:String,default:""}}};const Y=(0,l.A)(K,[["render",N],["__scopeId","data-v-d87ece66"]]);var J=Y,Z={name:"VideoPreview",components:{CButton:J},props:{title:{type:String,required:!0},videoSrc:{type:String,required:!0},relatedVideos:{type:Array,required:!0},type:{type:String,required:!0},customThumbnail:{type:String,default:""}},data(){return{thumbnail:"",showVideoList:!1,canScrollLeft:!1,canScrollRight:!1}},created(){this.fetchThumbnail(this.videoSrc),this.fetchThumbnailsForRelatedVideos()},mounted(){this.$nextTick(this.checkScroll),window.addEventListener("resize",this.checkScroll)},beforeUnmount(){window.removeEventListener("resize",this.checkScroll)},methods:{getEmbedUrl(e){const t=e.split("/").pop();return`https://player.vimeo.com/video/${t}`},async fetchThumbnail(e){const t=e.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();this.thumbnail=o[0].thumbnail_large},async fetchThumbnailsForRelatedVideos(){for(const e of this.relatedVideos){const t=e.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();e.thumbnail=o[0].thumbnail_large,e.title=o[0].title,e.duration=this.formatDuration(o[0].duration)}},playVideo(){this.$emit("play-video",this.videoSrc,this.type)},toggleVideoList(){this.showVideoList=!this.showVideoList,this.$nextTick(this.checkScroll)},scrollLeft(){const e=this.$refs.videoList;e&&(e.scrollBy({left:-300,behavior:"smooth"}),this.$nextTick(this.checkScroll))},scrollRight(){const e=this.$refs.videoList;e&&(e.scrollBy({left:300,behavior:"smooth"}),this.$nextTick(this.checkScroll))},checkScroll(){const e=this.$refs.videoList;e&&(this.canScrollLeft=e.scrollLeft>0,this.canScrollRight=e.scrollWidth>e.clientWidth+e.scrollLeft)},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},handlePlayRelatedVideo(e){this.$emit("play-video",e,this.type)}}};const ee=(0,l.A)(Z,[["render",U],["__scopeId","data-v-7bf21783"]]);var te=ee;const ie={class:"background-video"},oe=["src"];function re(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",ie,[(0,r.Lk)("iframe",{src:s.videoEmbedUrl,ref:"videoIframe",frameborder:"0",allow:"autoplay; picture-in-picture",allowfullscreen:""},null,8,oe)])}var ne={name:"BackgroundVideo",props:{videoSrc:{type:String,required:!0}},computed:{videoEmbedUrl(){const e=this.videoSrc.split("/").pop();return`https://player.vimeo.com/video/${e}?autoplay=1&loop=1&muted=1&background=1`}},mounted(){this.adjustVideoSize(),window.addEventListener("resize",this.adjustVideoSize)},beforeUnmount(){window.removeEventListener("resize",this.adjustVideoSize)},methods:{adjustVideoSize(){const e=this.$refs.videoIframe,t=window.innerWidth,i=window.innerHeight,o=1920/1080;t/i<o?(e.style.width=i*o+"px",e.style.height=`${i}px`):(e.style.width=`${t}px`,e.style.height=t/o+"px")}}};const se=(0,l.A)(ne,[["render",re],["__scopeId","data-v-5443e424"]]);var ae=se;const le=e=>((0,r.Qi)("data-v-45529dd0"),e=e(),(0,r.jt)(),e),de={class:"footer"},ce={class:"container"},ue={class:"contact-info"},he=le((()=>(0,r.Lk)("h2",null,"Contact",-1))),me=le((()=>(0,r.Lk)("p",null,"Gerard Alba Payá",-1))),ve=le((()=>(0,r.Lk)("p",null,"+34 628235110",-1))),pe=["href"],fe={class:"social-media"},ge=le((()=>(0,r.Lk)("h2",null,"Follow Me",-1))),ke={class:"social-icons"},be=["href"],ye=["src"],Le=["href"],Ve=["src"],we=le((()=>(0,r.Lk)("h1",null,"Lets Create!",-1)));function Se(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("footer",de,[(0,r.Lk)("div",ce,[(0,r.Lk)("div",ue,[he,me,ve,(0,r.Lk)("p",null,[(0,r.Lk)("a",{href:"mailto:"+n.email},(0,E.v_)(n.email),9,pe)])]),(0,r.Lk)("div",fe,[ge,(0,r.Lk)("div",ke,[(0,r.Lk)("a",{href:"https://instagram.com/"+n.instagramUsername,target:"_blank",rel:"noopener noreferrer"},[(0,r.Lk)("img",{src:n.instagramIcon,alt:"Instagram",class:"social-icon"},null,8,ye)],8,be),(0,r.Lk)("a",{href:"https://vimeo.com/"+n.vimeoUsername,target:"_blank",rel:"noopener noreferrer"},[(0,r.Lk)("img",{src:n.vimeoIcon,alt:"Vimeo",class:"social-icon"},null,8,Ve)],8,Le)]),we])])])}var Ce=i.p+"img/vimeo.9ce791c5.svg",Te=i.p+"img/instagram.09c69763.svg",xe={name:"FooterPage",data(){return{email:"gerardalbadp@gmail.com",instagramUsername:"gerardalbadp",vimeoUsername:"gerardalba",vimeoIcon:Ce,instagramIcon:Te}}};const Ee=(0,l.A)(xe,[["render",Se],["__scopeId","data-v-45529dd0"]]);var Pe=Ee;const Ie=e=>((0,r.Qi)("data-v-cee78736"),e=e(),(0,r.jt)(),e),Re={key:0,class:"menu"},$e=Ie((()=>(0,r.Lk)("ul",null,[(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#"},"Work")]),(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#"},"Bio")]),(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#"},"Contact")])],-1))),_e=[$e];function Fe(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.toggleMenu&&s.toggleMenu(...e)),class:"hamburger-button"}," ☰ "),n.isMenuOpen?((0,r.uX)(),(0,r.CE)("div",Re,_e)):(0,r.Q3)("",!0)])}var Xe={data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen}}};const Me=(0,l.A)(Xe,[["render",Fe],["__scopeId","data-v-cee78736"]]);var je=Me;const Ae=e=>((0,r.Qi)("data-v-3290e229"),e=e(),(0,r.jt)(),e),De={class:"carousel-container"},He={class:"video-container"},Be=["src"],Oe=["onClick"],Ue=Ae((()=>(0,r.Lk)("div",{class:"overlay"},[(0,r.Lk)("button",{class:"play-button"},[(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})])])],-1))),qe={class:"video-info"},We={class:"carousel-dots"},ze=["onClick"];function Qe(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",De,[(0,r.Lk)("h2",null,(0,E.v_)(i.title),1),(0,r.Lk)("div",{class:"carousel",onTouchstart:t[0]||(t[0]=(...e)=>s.handleTouchStart&&s.handleTouchStart(...e)),onTouchend:t[1]||(t[1]=(...e)=>s.handleTouchEnd&&s.handleTouchEnd(...e)),onMousedown:t[2]||(t[2]=(...e)=>s.handleMouseStart&&s.handleMouseStart(...e)),onMouseup:t[3]||(t[3]=(...e)=>s.handleMouseEnd&&s.handleMouseEnd(...e))},[(0,r.Lk)("div",{class:"carousel-track",style:(0,E.Tr)({transform:`translateX(-${100*n.currentIndex}%)`})},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:"carousel-slide"},[(0,r.Lk)("div",He,[n.isPlaying&&n.currentIndex===t?((0,r.uX)(),(0,r.CE)("iframe",{key:0,src:s.getEmbedUrl(e.src),width:"100%",height:"100%",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:""},null,8,Be)):((0,r.uX)(),(0,r.CE)("div",{key:1,class:"thumbnail",style:(0,E.Tr)({backgroundImage:`url(${e.thumbnail||n.defaultThumbnail})`}),onClick:e=>s.playVideo(t)},[Ue,(0,r.Lk)("div",qe,[(0,r.Lk)("p",null,(0,E.v_)(e.title)+" / "+(0,E.v_)(e.duration),1)])],12,Oe))])])))),128))],4)],32),(0,r.Lk)("div",We,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("span",{key:t,class:(0,E.C4)({active:t===n.currentIndex}),onClick:e=>s.goToSlide(t)},null,10,ze)))),128))])])}var Ge={data(){return{currentIndex:0,touchStartX:0,mouseStartX:0,isPlaying:!1,defaultThumbnail:i(2679)}},props:{relatedVideos:Array,title:String},created(){this.fetchThumbnailsForRelatedVideos()},methods:{async fetchThumbnailsForRelatedVideos(){for(const t of this.relatedVideos)if(!t.thumbnail)try{const e=t.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${e}.json`),o=await i.json();t.thumbnail=o[0].thumbnail_large,t.title=o[0].title,t.duration=this.formatDuration(o[0].duration)}catch(e){console.error("Error fetching thumbnail:",e)}},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},getEmbedUrl(e){const t=e.split("/").pop();return`https://player.vimeo.com/video/${t}?autoplay=1`},goToSlide(e){this.currentIndex=e,this.isPlaying=!1},handleTouchStart(e){this.touchStartX=e.touches[0].clientX},handleTouchEnd(e){const t=e.changedTouches[0].clientX;this.handleSwipe(t-this.touchStartX)},handleMouseStart(e){this.mouseStartX=e.clientX},handleMouseEnd(e){const t=e.clientX;this.handleSwipe(t-this.mouseStartX)},handleSwipe(e){const t=50;e>t?this.prevSlide():e<-t&&this.nextSlide()},prevSlide(){this.currentIndex>0&&(this.currentIndex--,this.isPlaying=!1)},nextSlide(){this.currentIndex<this.relatedVideos.length-1&&(this.currentIndex++,this.isPlaying=!1)},playVideo(e){this.currentIndex=e,this.isPlaying=!0}}};const Ne=(0,l.A)(Ge,[["render",Qe],["__scopeId","data-v-3290e229"]]);var Ke=Ne,Ye={name:"HomePage",components:{LeftSidebar:L,RightSidebar:x,VideoPreview:te,BackgroundVideo:ae,FooterPage:Pe,HamburgerMenu:je,VideoCarousel:Ke},data(){return{musicVideos:[{id:1,src:"https://vimeo.com/522564568"},{id:2,src:"https://vimeo.com/522377522"},{id:3,src:"https://vimeo.com/491834523"}],commercialVideos:[{id:1,src:"https://vimeo.com/290744844"},{id:2,src:"https://vimeo.com/199707225"},{id:3,src:"https://vimeo.com/189584267"},{id:4,src:"https://vimeo.com/522549222"},{id:5,src:"https://vimeo.com/522377522"},{id:6,src:"https://vimeo.com/522726870"}],underwaterVideos:[{id:1,src:"https://vimeo.com/522377522"},{id:2,src:"https://vimeo.com/522549222"},{id:3,src:"https://vimeo.com/522726870"}],filmVideos:[{id:1,src:"https://vimeo.com/522726870"}],isSmallScreen:window.innerWidth<600}},computed:{musicVideoThumbnail(){return i(2158)},commercialThumbnail(){return i(7138)},underwaterThumbnail(){return i(6656)},filmThumbnail(){return i(406)}},methods:{handlePlayVideo(e,t){this.saveScrollPosition(),this.$router.push({name:"VideoPlayer",query:{videoSrc:e,videoType:t}})},saveScrollPosition(){const e=window.scrollY||document.documentElement.scrollTop;localStorage.setItem("scrollPosition",e.toString())},handleResize(){this.isSmallScreen=window.innerWidth<600}},created(){window.addEventListener("resize",this.handleResize)},beforeUnmount(){window.removeEventListener("resize",this.handleResize)}};const Je=(0,l.A)(Ye,[["render",p],["__scopeId","data-v-077343e7"]]);var Ze=Je;const et=e=>((0,r.Qi)("data-v-0f8b17f6"),e=e(),(0,r.jt)(),e),tt={class:"video-player-page"},it={class:"main-content"},ot={class:"video-content"},rt=et((()=>(0,r.Lk)("span",{class:"arrow chevron"},"❮",-1))),nt=[rt],st={class:"video-and-details"},at={class:"video-container",ref:"videoContainer"},lt=["src"],dt={class:"video-details",ref:"videoDetails"},ct=["innerHTML"],ut={class:"video-credits"},ht=et((()=>(0,r.Lk)("strong",null,"Director:",-1))),mt=et((()=>(0,r.Lk)("strong",null,"Producer:",-1))),vt=et((()=>(0,r.Lk)("strong",null,"Duration:",-1))),pt=et((()=>(0,r.Lk)("span",{class:"arrow chevron"},"❯",-1))),ft=[pt],gt={class:"related-videos"},kt={class:"video-list-container"},bt=et((()=>(0,r.Lk)("span",{class:"arrow left-arrow chevron"},"❮",-1))),yt=[bt],Lt={class:"video-list",ref:"videoList"},Vt=["onClick"],wt={class:"hover-overlay"},St={class:"video-info"},Ct=et((()=>(0,r.Lk)("button",{class:"play-button"},[(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})])],-1))),Tt={key:0,class:"playing-indicator"},xt=et((()=>(0,r.Lk)("span",{class:"arrow right-arrow chevron"},"❯",-1))),Et=[xt];function Pt(e,t,i,o,n,s){const a=(0,r.g2)("LeftSidebar"),l=(0,r.g2)("RightSidebar");return(0,r.uX)(),(0,r.CE)("div",tt,[(0,r.bF)(a),(0,r.Lk)("div",it,[(0,r.Lk)("button",{class:"close-button",onClick:t[0]||(t[0]=(...e)=>s.redirectToHomePage&&s.redirectToHomePage(...e))},"×"),(0,r.Lk)("h1",null,(0,E.v_)(n.sectionTitle),1),(0,r.Lk)("div",ot,[(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container left-arrow-container",{invisible:0===n.currentVideoIndex}]),onClick:t[1]||(t[1]=(...e)=>s.playPreviousVideo&&s.playPreviousVideo(...e))},nt,2),(0,r.Lk)("div",st,[(0,r.Lk)("div",at,[(0,r.Lk)("iframe",{src:s.videoEmbedUrl,frameborder:"0",allow:"autoplay; fullscreen",allowfullscreen:"",onLoad:t[2]||(t[2]=(...e)=>s.updateHeights&&s.updateHeights(...e))},null,40,lt)],512),(0,r.Lk)("div",dt,[(0,r.Lk)("h1",null,(0,E.v_)(n.videoTitle),1),(0,r.Lk)("div",{innerHTML:n.videoDescription,class:"video-description"},null,8,ct),(0,r.Lk)("ul",ut,[(0,r.Lk)("li",null,[ht,(0,r.eW)(" "+(0,E.v_)(n.videoDirector),1)]),(0,r.Lk)("li",null,[mt,(0,r.eW)(" "+(0,E.v_)(n.videoProducer),1)]),(0,r.Lk)("li",null,[vt,(0,r.eW)(" "+(0,E.v_)(n.videoDuration),1)])])],512)]),(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container right-arrow-container",{invisible:n.currentVideoIndex===n.relatedVideos.length-1}]),onClick:t[3]||(t[3]=(...e)=>s.playNextVideo&&s.playNextVideo(...e))},ft,2)]),(0,r.Lk)("div",gt,[(0,r.Lk)("div",kt,[(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container left-arrow-container",{invisible:!n.canScrollLeftRelated}]),onClick:t[4]||(t[4]=(...e)=>s.scrollLeftRelated&&s.scrollLeftRelated(...e))},yt,2),(0,r.Lk)("div",Lt,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(n.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:(0,E.C4)(["video-item",{"active-video":n.currentVideoIndex===t}]),style:(0,E.Tr)({backgroundImage:`url(${e.thumbnail})`}),onClick:i=>s.handlePlayRelatedVideo(e.src,t)},[(0,r.Lk)("div",wt,[(0,r.Lk)("div",St,[(0,r.Lk)("p",null,(0,E.v_)(e.title)+" / "+(0,E.v_)(e.duration),1)]),Ct]),n.currentVideoIndex===t?((0,r.uX)(),(0,r.CE)("div",Tt," Playing ")):(0,r.Q3)("",!0)],14,Vt)))),128))],512),(0,r.Lk)("div",{class:(0,E.C4)(["arrow-container right-arrow-container",{invisible:!n.canScrollRightRelated}]),onClick:t[5]||(t[5]=(...e)=>s.scrollRightRelated&&s.scrollRightRelated(...e))},Et,2)])])]),(0,r.bF)(l)])}var It={name:"VideoPlayer",components:{LeftSidebar:L,RightSidebar:x},data(){return{videoTitle:"",videoDescription:"",videoDirector:"",videoProducer:"",videoDuration:"",relatedVideos:[],canScrollLeftRelated:!1,canScrollRightRelated:!0,canScrollLeftMain:!1,canScrollRightMain:!0,currentVideoIndex:0,sectionTitle:""}},computed:{videoEmbedUrl(){const e=this.$route.query.videoSrc.split("/").pop();return`https://player.vimeo.com/video/${e}?autoplay=1`}},watch:{"$route.query.videoSrc":"fetchVideoDetails"},created(){this.fetchVideoDetails(),this.fetchRelatedVideos(),this.sectionTitle=this.getSectionTitle(this.$route.query.videoType)},mounted(){window.addEventListener("resize",this.updateHeights);const e=this.$refs.videoList;e&&e.addEventListener("scroll",this.checkScrollRelated),this.updateHeights(),this.$nextTick(this.checkScrollRelated)},beforeUnmount(){window.removeEventListener("resize",this.updateHeights);const e=this.$refs.videoList;e&&e.removeEventListener("scroll",this.checkScrollRelated)},methods:{redirectToHomePage(){this.$router.push({name:"Home"})},async fetchVideoDetails(){const e=this.$route.query.videoSrc.split("/").pop(),t=await fetch(`https://vimeo.com/api/v2/video/${e}.json`),i=await t.json(),o=i[0];this.videoTitle=o.title,this.videoDescription=o.description.replace(/\n/g,"<br />"),this.videoDirector=o.user_name,this.videoProducer=o.user_name,this.videoDuration=this.formatDuration(o.duration),this.updateCurrentVideoIndex(e)},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},fetchRelatedVideos(){const e=this.$route.query.videoType;"music"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/522564568",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/491834523",thumbnail:"",title:"",duration:""}]:"commercial"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/290744844",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/199707225",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/189584267",thumbnail:"",title:"",duration:""},{id:4,src:"https://vimeo.com/522549222",thumbnail:"",title:"",duration:""},{id:5,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:6,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]:"underwater"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/522549222",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]:"film"===e&&(this.relatedVideos=[{id:1,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]),this.fetchThumbnailsForRelatedVideos()},async fetchThumbnailsForRelatedVideos(){for(const e of this.relatedVideos){const t=e.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();e.thumbnail=o[0].thumbnail_large,e.title=o[0].title,e.duration=this.formatDuration(o[0].duration)}this.$nextTick(this.checkScrollRelated)},updateHeights(){const e=this.$refs.videoContainer,t=this.$refs.videoDetails;e&&t&&(t.style.height=`${e.clientHeight}px`)},handlePlayRelatedVideo(e,t){const i=this.$route.query.videoType;this.$router.push({name:"VideoPlayer",query:{videoSrc:e,videoType:i}}),this.currentVideoIndex=t,this.fetchVideoDetails(),this.scrollToActiveVideo()},playPreviousVideo(){if(this.currentVideoIndex>0){this.currentVideoIndex--;const e=this.relatedVideos[this.currentVideoIndex];this.handlePlayRelatedVideo(e.src,this.currentVideoIndex)}},playNextVideo(){if(this.currentVideoIndex<this.relatedVideos.length-1){this.currentVideoIndex++;const e=this.relatedVideos[this.currentVideoIndex];this.handlePlayRelatedVideo(e.src,this.currentVideoIndex)}},getSectionTitle(e){const t={music:"Music Videos",commercial:"Commercials",underwater:"Underwater",film:"Films"};return t[e]||""},scrollLeftRelated(){const e=this.$refs.videoList;e&&(e.scrollBy({left:-300,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated))},scrollRightRelated(){const e=this.$refs.videoList;e&&(e.scrollBy({left:300,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated))},scrollToActiveVideo(){const e=this.$refs.videoList,t=e.children[this.currentVideoIndex];if(t){const i=e.getBoundingClientRect(),o=t.getBoundingClientRect(),r=o.left-i.left+e.scrollLeft,n=r-e.clientWidth/2+t.clientWidth/2;e.scrollTo({left:n,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated)}},checkScrollRelated(){const e=this.$refs.videoList;e&&(this.canScrollLeftRelated=e.scrollLeft>0,this.canScrollRightRelated=e.scrollWidth>e.clientWidth+e.scrollLeft+1)},goBack(){this.$router.go(-1)},updateCurrentVideoIndex(e){this.currentVideoIndex=this.relatedVideos.findIndex((t=>t.src.endsWith(e)))}}};const Rt=(0,l.A)(It,[["render",Pt],["__scopeId","data-v-0f8b17f6"]]);var $t=Rt;const _t=e=>((0,r.Qi)("data-v-e69d5ac0"),e=e(),(0,r.jt)(),e),Ft={class:"bio-page"},Xt={class:"content-container"},Mt={class:"content"},jt=_t((()=>(0,r.Lk)("h1",null,"About Me",-1))),At=_t((()=>(0,r.Lk)("p",null," Gerard Alba is a Director of Photography. He was born in Granollers, Barcelona, Spain. Since a young age, he was engaged with filmmaking world. He studied filmmaking and specialized on Cinematography at the New York Film Academy, Los Angeles, California. Since graduating in 2016, he has been working on a variety of projects, including films, music videos and commercials. Gerard's filmmaking skills include directing, camera operator, steadycam, AC, gaffer, editing and graphic animation. He also has recently worked in NARCOS season 3 on the camera department. Gerard is always enthusiastic and energetic on the set, and always excited about upcoming projects in all facets of filmmaking. Gerard has also participated as cameraman, director of photography or assistant in several shorts like Film School Musical, Vanguards & Visionaires, Mia, Camila that have been awarded at international festivals. ",-1)));function Dt(e,t,i,o,n,s){const a=(0,r.g2)("LeftSidebar"),l=(0,r.g2)("RightSidebar");return(0,r.uX)(),(0,r.CE)("div",Ft,[(0,r.bF)(a),(0,r.Lk)("div",Xt,[(0,r.Lk)("div",Mt,[jt,At,(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.downloadCV&&s.downloadCV(...e))},"Download CV")])]),(0,r.bF)(l)])}var Ht={name:"BioPage",components:{LeftSidebar:L,RightSidebar:x},methods:{downloadCV(){const e=document.createElement("a");e.href="/Gerard_Alba_CV.pdf",e.download="Gerard_Alba_CV.pdf",e.click()}}};const Bt=(0,l.A)(Ht,[["render",Dt],["__scopeId","data-v-e69d5ac0"]]);var Ot=Bt;const Ut=[{path:"/",name:"Home",component:Ze},{path:"/video",name:"VideoPlayer",component:$t,props:e=>({videoSrc:e.query.videoSrc})},{path:"/bio",name:"Bio",component:Ot}],qt=(0,u.aE)({history:(0,u.LA)("/"),routes:Ut});var Wt=qt;const zt=(0,o.Ef)(c);zt.use(Wt),zt.mount("#app")},2679:function(e,t,i){e.exports=i.p+"img/bio_profile.a3ea30c2.png"},7138:function(e,t,i){e.exports=i.p+"img/commercials.03585dc5.png"},406:function(e,t,i){e.exports=i.p+"img/films.1fbb6375.png"},2158:function(e,t,i){e.exports=i.p+"img/musicvideos.49f44ab9.png"},6656:function(e,t,i){e.exports=i.p+"img/underwater.bfb5dfa6.png"}},t={};function i(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,o,r,n){if(!o){var s=1/0;for(c=0;c<e.length;c++){o=e[c][0],r=e[c][1],n=e[c][2];for(var a=!0,l=0;l<o.length;l++)(!1&n||s>=n)&&Object.keys(i.O).every((function(e){return i.O[e](o[l])}))?o.splice(l--,1):(a=!1,n<s&&(s=n));if(a){e.splice(c--,1);var d=r();void 0!==d&&(t=d)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[o,r,n]}}(),function(){i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.p="/"}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,s=o[0],a=o[1],l=o[2],d=0;if(s.some((function(t){return 0!==e[t]}))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);if(l)var c=l(i)}for(t&&t(o);d<s.length;d++)n=s[d],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(c)},o=self["webpackChunkportfolio"]=self["webpackChunkportfolio"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=i.O(void 0,[504],(function(){return i(6056)}));o=i.O(o)})();
//# sourceMappingURL=app.7455d3a4.js.map