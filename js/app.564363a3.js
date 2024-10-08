(function(){"use strict";var e={191:function(e,t,i){var o=i(3751),r=i(641);const n={id:"app"};function s(e,t,i,o,s,l){const a=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",n,[(0,r.bF)(a)])}var l={name:"App"},a=i(6262);const c=(0,a.A)(l,[["render",s]]);var d=c,h=i(6166);const u={class:"home-page"},m={key:0},v={key:1};function p(e,t,i,o,n,s){const l=(0,r.g2)("LeftSidebar"),a=(0,r.g2)("HamburgerMenu"),c=(0,r.g2)("BackgroundVideo"),d=(0,r.g2)("VideoCarousel"),h=(0,r.g2)("VideoPreview"),p=(0,r.g2)("RightSidebar"),g=(0,r.g2)("FooterPage");return(0,r.uX)(),(0,r.CE)("div",u,[(0,r.bF)(l,{class:"left-sidebar"}),n.isSmallScreen?((0,r.uX)(),(0,r.Wv)(a,{key:0,onScrollToWork:s.scrollToWork,onScrollToContact:s.scrollToContact},null,8,["onScrollToWork","onScrollToContact"])):(0,r.Q3)("",!0),(0,r.Lk)("div",null,[(0,r.bF)(c,{videoSrc:"https://vimeo.com/522837592"}),n.isSmallScreen?((0,r.uX)(),(0,r.CE)("div",m,[(0,r.bF)(d,{ref:"musicVideos",title:"MUSIC VIDEOS",relatedVideos:n.musicVideos,type:"music",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(d,{title:"COMMERCIALS",relatedVideos:n.commercialVideos,type:"commercial",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(d,{title:"UNDERWATER",relatedVideos:n.underwaterVideos,type:"underwater",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"]),(0,r.bF)(d,{title:"FILMS",relatedVideos:n.filmVideos,type:"film",onPlayVideo:s.handlePlayVideo},null,8,["relatedVideos","onPlayVideo"])])):((0,r.uX)(),(0,r.CE)("div",v,[(0,r.bF)(h,{id:"first-video-preview",ref:"musicVideos",title:"MUSIC VIDEOS",videoSrc:n.musicVideos[0].src,relatedVideos:n.musicVideos,type:"music",customThumbnail:s.musicVideoThumbnail,onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","customThumbnail","onPlayVideo"]),(0,r.bF)(h,{title:"COMMERCIALS",videoSrc:n.commercialVideos[0].src,relatedVideos:n.commercialVideos,type:"commercial",customThumbnail:s.commercialThumbnail,onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","customThumbnail","onPlayVideo"]),(0,r.bF)(h,{title:"UNDERWATER",videoSrc:n.underwaterVideos[0].src,relatedVideos:n.underwaterVideos,type:"underwater",customThumbnail:s.underwaterThumbnail,onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","customThumbnail","onPlayVideo"]),(0,r.bF)(h,{title:"FILMS",videoSrc:n.filmVideos[0].src,relatedVideos:n.filmVideos,type:"film",onPlayVideo:s.handlePlayVideo},null,8,["videoSrc","relatedVideos","onPlayVideo"])]))]),(0,r.bF)(p,{class:"right-sidebar"}),(0,r.bF)(g,{ref:"footer"},null,512)])}i(4114);const g={class:"left-sidebar"},k={class:"vertical-text"};function f(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",g,[(0,r.Lk)("div",k,[(0,r.Lk)("h2",{onClick:t[0]||(t[0]=(...e)=>s.goToHome&&s.goToHome(...e))},"Gerard Alba")])])}var y={name:"LeftSidebar",methods:{goToHome(){this.$router.push({name:"Home"}),this.scrollToTop()},scrollToTop(){this.$nextTick((()=>{window.scrollTo({top:0,behavior:"smooth"})}))}}};const b=(0,a.A)(y,[["render",f],["__scopeId","data-v-3e49f712"]]);var w=b;const L={class:"right-sidebar"},V={class:"vertical-text"};function S(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",L,[(0,r.Lk)("div",V,[(0,r.Lk)("h2",{onClick:t[0]||(t[0]=(...e)=>s.goToFooter&&s.goToFooter(...e))},"Contact"),(0,r.Lk)("h2",{onClick:t[1]||(t[1]=e=>s.goToSection("bio"))},"Bio"),(0,r.Lk)("h2",{onClick:t[2]||(t[2]=e=>s.goToSection("work"))},"Work")])])}var C={name:"RightSidebar",methods:{goToSection(e){"work"===e?this.$router.push({name:"Home",query:{scroll:"work"}}):"bio"===e&&this.$router.push({name:"Bio"})},goToFooter(){this.$router.push({name:"Home",query:{scroll:"contact"}})}}};const T=(0,a.A)(C,[["render",S],["__scopeId","data-v-1726f982"]]);var x=T,P=i(33);const $=e=>((0,r.Qi)("data-v-fa60c0f6"),e=e(),(0,r.jt)(),e),E={class:"overlay"},I={key:0,class:"video-list-container"},R=$((()=>(0,r.Lk)("span",{class:"arrow left-arrow chevron"},"❮",-1))),_=[R],X={class:"video-list",ref:"videoList"},F=["onClick"],M={class:"hover-overlay"},B={class:"video-info"},W={class:"textfamily"},D=$((()=>(0,r.Lk)("button",{class:"play-button"},[(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})])],-1))),j=$((()=>(0,r.Lk)("span",{class:"arrow right-arrow chevron"},"❯",-1))),O=[j],H={class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},A=["points"];function q(e,t,i,n,s,l){const a=(0,r.g2)("CButton");return(0,r.uX)(),(0,r.CE)("div",{class:"video-preview",style:(0,P.Tr)({backgroundImage:`url(${i.customThumbnail||s.thumbnail})`})},[(0,r.Lk)("div",E,[(0,r.Lk)("h1",null,(0,P.v_)(i.title),1),(0,r.bF)(a,{icon:"play",onClick:l.playVideo},null,8,["onClick"])]),(0,r.bF)(o.eB,{name:"slide-fade"},{default:(0,r.k6)((()=>[s.showVideoList?((0,r.uX)(),(0,r.CE)("div",I,[(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container left-arrow-container",{invisible:!s.canScrollLeft}]),onClick:t[0]||(t[0]=(...e)=>l.scrollLeft&&l.scrollLeft(...e))},_,2),(0,r.Lk)("div",X,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:"video-item",style:(0,P.Tr)({backgroundImage:`url(${e.thumbnail})`}),onClick:t=>l.handlePlayRelatedVideo(e.src)},[(0,r.Lk)("div",M,[(0,r.Lk)("div",B,[(0,r.Lk)("p",W,(0,P.v_)(e.title)+" / "+(0,P.v_)(e.duration),1)]),D])],12,F)))),128))],512),(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container right-arrow-container",{invisible:!s.canScrollRight}]),onClick:t[1]||(t[1]=(...e)=>l.scrollRight&&l.scrollRight(...e))},O,2)])):(0,r.Q3)("",!0)])),_:1}),(0,r.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>l.toggleVideoList&&l.toggleVideoList(...e)),class:(0,P.C4)(["custom-button toggle-button",{"moved-up":s.showVideoList}])},[((0,r.uX)(),(0,r.CE)("svg",H,[(0,r.Lk)("polyline",{points:s.showVideoList?"18 15 12 9 6 15":"6 9 12 15 18 9"},null,8,A)])),(0,r.Lk)("span",null,(0,P.v_)(s.showVideoList?"Show Less":"Show More"),1)],2)],4)}const U=e=>((0,r.Qi)("data-v-02d6b826"),e=e(),(0,r.jt)(),e),z={class:"icon3",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"},Q={key:0,points:"5 3 19 12 5 21"},N=U((()=>(0,r.Lk)("line",{x1:"12",y1:"5",x2:"12",y2:"19"},null,-1))),G=U((()=>(0,r.Lk)("line",{x1:"5",y1:"12",x2:"19",y2:"12"},null,-1)));function K(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("button",{onClick:t[0]||(t[0]=(...e)=>i.onClick&&i.onClick(...e)),class:(0,P.C4)(["custom-button3",i.additionalClass])},[((0,r.uX)(),(0,r.CE)("svg",z,["play"===i.icon?((0,r.uX)(),(0,r.CE)("polygon",Q)):"plus"===i.icon?((0,r.uX)(),(0,r.CE)(r.FK,{key:1},[N,G],64)):(0,r.Q3)("",!0)]))],2)}var Y={name:"CButton",props:{icon:{type:String,required:!0,validator:e=>["play","plus"].includes(e)},onClick:{type:Function,required:!0},additionalClass:{type:String,default:""}}};const J=(0,a.A)(Y,[["render",K],["__scopeId","data-v-02d6b826"]]);var Z=J,ee={name:"VideoPreview",components:{CButton:Z},props:{title:{type:String,required:!0},videoSrc:{type:String,required:!0},relatedVideos:{type:Array,required:!0},type:{type:String,required:!0},customThumbnail:{type:String,default:""}},data(){return{thumbnail:"",showVideoList:!1,canScrollLeft:!1,canScrollRight:!1}},created(){this.fetchThumbnail(this.videoSrc),this.fetchThumbnailsForRelatedVideos()},mounted(){this.$nextTick(this.checkScroll),window.addEventListener("resize",this.checkScroll)},beforeUnmount(){window.removeEventListener("resize",this.checkScroll)},methods:{getEmbedUrl(e){const t=e.split("/").pop();return`https://player.vimeo.com/video/${t}`},async fetchThumbnail(e){const t=e.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();this.thumbnail=o[0].thumbnail_large},async fetchThumbnailsForRelatedVideos(){for(const e of this.relatedVideos){const t=e.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();e.thumbnail=o[0].thumbnail_large,e.title=o[0].title,e.duration=this.formatDuration(o[0].duration)}},playVideo(){this.$emit("play-video",this.videoSrc,this.type)},toggleVideoList(){this.showVideoList=!this.showVideoList,this.$nextTick(this.checkScroll)},scrollLeft(){const e=this.$refs.videoList;e&&(e.scrollBy({left:-300,behavior:"smooth"}),this.$nextTick(this.checkScroll))},scrollRight(){const e=this.$refs.videoList;e&&(e.scrollBy({left:300,behavior:"smooth"}),this.$nextTick(this.checkScroll))},checkScroll(){const e=this.$refs.videoList;e&&(this.canScrollLeft=e.scrollLeft>0,this.canScrollRight=e.scrollWidth>e.clientWidth+e.scrollLeft)},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},handlePlayRelatedVideo(e){this.$emit("play-video",e,this.type)}}};const te=(0,a.A)(ee,[["render",q],["__scopeId","data-v-fa60c0f6"]]);var ie=te;const oe={class:"background-video"},re=["src"];function ne(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",oe,[(0,r.Lk)("iframe",{src:s.videoEmbedUrl,ref:"videoIframe",frameborder:"0",allow:"autoplay; picture-in-picture",allowfullscreen:""},null,8,re)])}var se={name:"BackgroundVideo",props:{videoSrc:{type:String,required:!0}},computed:{videoEmbedUrl(){const e=this.videoSrc.split("/").pop();return`https://player.vimeo.com/video/${e}?autoplay=1&loop=1&muted=1&background=1`}},mounted(){this.adjustVideoSize(),window.addEventListener("resize",this.adjustVideoSize)},beforeUnmount(){window.removeEventListener("resize",this.adjustVideoSize)},methods:{adjustVideoSize(){const e=this.$refs.videoIframe,t=window.innerWidth,i=window.innerHeight,o=1920/1080;t/i<o?(e.style.width=i*o+"px",e.style.height=`${i}px`):(e.style.width=`${t}px`,e.style.height=t/o+"px")}}};const le=(0,a.A)(se,[["render",ne],["__scopeId","data-v-5443e424"]]);var ae=le;const ce=e=>((0,r.Qi)("data-v-32aad4ef"),e=e(),(0,r.jt)(),e),de={class:"footer"},he={class:"container"},ue={class:"contact-info"},me=ce((()=>(0,r.Lk)("h2",null,"Contact",-1))),ve=ce((()=>(0,r.Lk)("p",null,"Gerard Alba Payá",-1))),pe=ce((()=>(0,r.Lk)("p",null,"+34 628235110",-1))),ge=["href"],ke={class:"social-media"},fe={class:"social-icons"},ye=["href"],be=["src"],we=["href"],Le=["src"],Ve=ce((()=>(0,r.Lk)("h1",null,"Lets Create!",-1)));function Se(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("footer",de,[(0,r.Lk)("div",he,[(0,r.Lk)("div",ue,[me,ve,pe,(0,r.Lk)("p",null,[(0,r.Lk)("a",{href:"mailto:"+n.email},(0,P.v_)(n.email),9,ge)])]),(0,r.Lk)("div",ke,[(0,r.Lk)("div",fe,[(0,r.Lk)("a",{href:"https://instagram.com/"+n.instagramUsername,target:"_blank",rel:"noopener noreferrer"},[(0,r.Lk)("img",{src:n.instagramIcon,alt:"Instagram",class:"social-icon"},null,8,be)],8,ye),(0,r.Lk)("a",{href:"https://vimeo.com/"+n.vimeoUsername,target:"_blank",rel:"noopener noreferrer"},[(0,r.Lk)("img",{src:n.vimeoIcon,alt:"Vimeo",class:"social-icon"},null,8,Le)],8,we)]),Ve])])])}var Ce=i.p+"img/vimeo.9ce791c5.svg",Te=i.p+"img/instagram.09c69763.svg",xe={name:"FooterPage",data(){return{email:"gerardalbadp@gmail.com",instagramUsername:"gerardalbadp",vimeoUsername:"gerardalba",vimeoIcon:Ce,instagramIcon:Te}}};const Pe=(0,a.A)(xe,[["render",Se],["__scopeId","data-v-32aad4ef"]]);var $e=Pe;const Ee={key:0,class:"menu",ref:"menu"};function Ie(e,t,i,n,s,l){return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>l.toggleMenu&&l.toggleMenu(...e)),class:"hamburger-button"},[(0,r.Lk)("div",{class:(0,P.C4)(["bar",{open:s.isMenuOpen}])},null,2),(0,r.Lk)("div",{class:(0,P.C4)(["bar",{open:s.isMenuOpen}])},null,2),(0,r.Lk)("div",{class:(0,P.C4)(["bar",{open:s.isMenuOpen}])},null,2)]),s.isMenuOpen?((0,r.uX)(),(0,r.CE)("div",Ee,[(0,r.Lk)("ul",null,[(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#",onClick:t[1]||(t[1]=(0,o.D$)((e=>l.scrollToSection("work")),["prevent"]))},"Work")]),(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#",onClick:t[2]||(t[2]=(0,o.D$)(((...e)=>l.goToBio&&l.goToBio(...e)),["prevent"]))},"Bio")]),(0,r.Lk)("li",null,[(0,r.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,o.D$)((e=>l.scrollToSection("contact")),["prevent"]))},"Contact")])])],512)):(0,r.Q3)("",!0)])}var Re={data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen,this.isMenuOpen?document.addEventListener("click",this.handleClickOutside):document.removeEventListener("click",this.handleClickOutside)},scrollToSection(e){this.toggleMenu(),"work"===e?this.$emit("scrollToWork"):"contact"===e&&this.$emit("scrollToContact")},goToBio(){this.toggleMenu(),this.$router.push({name:"Bio"})},handleClickOutside(e){const t=this.$refs.menu;!t||t.contains(e.target)||e.target.classList.contains("hamburger-button")||(this.isMenuOpen=!1,document.removeEventListener("click",this.handleClickOutside))}},beforeUnmount(){document.removeEventListener("click",this.handleClickOutside)}};const _e=(0,a.A)(Re,[["render",Ie],["__scopeId","data-v-068224da"]]);var Xe=_e;const Fe=e=>((0,r.Qi)("data-v-243c2a25"),e=e(),(0,r.jt)(),e),Me={class:"carousel-container"},Be={class:"carousel-header"},We=Fe((()=>(0,r.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"35",height:"35",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.Lk)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1))),De=[We],je={class:"carousel-track"},Oe={class:"video-container-wrapper"},He={class:"video-container"},Ae=["src"],qe=["onClick"],Ue={class:"overlay"},ze={class:"video-info"},Qe=["onClick"],Ne=Fe((()=>(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"white",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})],-1))),Ge=[Ne],Ke={class:"carousel-dots"},Ye=["onClick"];function Je(e,t,i,n,s,l){return(0,r.uX)(),(0,r.CE)("div",Me,[(0,r.Lk)("div",Be,[(0,r.Lk)("h2",null,(0,P.v_)(i.title),1),s.isPlaying?((0,r.uX)(),(0,r.CE)("button",{key:0,class:"close-button-header",onClick:t[0]||(t[0]=(...e)=>l.closeVideo&&l.closeVideo(...e))},De)):(0,r.Q3)("",!0)]),(0,r.Lk)("div",{class:(0,P.C4)({"carousel is-playing":s.isPlaying,carousel:!s.isPlaying}),ref:"carouselTrack",onScroll:t[1]||(t[1]=(...e)=>l.handleScroll&&l.handleScroll(...e))},[(0,r.Lk)("div",je,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:"carousel-slide"},[(0,r.Lk)("div",Oe,[(0,r.Lk)("div",He,[s.isPlaying&&s.currentIndex===t?((0,r.uX)(),(0,r.CE)("iframe",{key:0,src:l.getEmbedUrl(e.src),width:"100%",height:"100%",frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:"",muted:""},null,8,Ae)):((0,r.uX)(),(0,r.CE)("div",{key:1,class:"thumbnail",style:(0,P.Tr)({backgroundImage:`url(${e.thumbnail||s.defaultThumbnail})`}),onClick:t=>l.goToMobileVideoDetail(e)},[(0,r.Lk)("div",Ue,[(0,r.Lk)("div",ze,(0,P.v_)(e.title),1),(0,r.Lk)("button",{class:"play-button",onClick:(0,o.D$)((e=>l.playVideo(t)),["stop"])},Ge,8,Qe)])],12,qe))])])])))),128))])],34),(0,r.Lk)("div",Ke,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("span",{key:t,class:(0,P.C4)({active:t===s.currentIndex}),onClick:e=>l.goToSlide(t)},null,10,Ye)))),128))])])}var Ze=i(2273),et={data(){return{currentTime:0,currentIndex:0,touchStartX:0,mouseStartX:0,isPlaying:!1,isScrolling:!1,vimeoPlayer:null,defaultThumbnail:i(3218)}},props:{relatedVideos:Array,title:String},created(){this.fetchThumbnailsForRelatedVideos()},mounted(){window.addEventListener("scroll",this.handlePageScroll),window.addEventListener("orientationchange",this.handleOrientationChange)},beforeUnmount(){window.removeEventListener("scroll",this.handlePageScroll),window.removeEventListener("orientationchange",this.handleOrientationChange)},methods:{handleOrientationChange(){this.vimeoPlayer&&this.vimeoPlayer.getCurrentTime().then((e=>(this.currentTime=e,this.vimeoPlayer.pause()))).then((()=>{setTimeout((()=>{this.vimeoPlayer.setCurrentTime(this.currentTime),this.vimeoPlayer.play()}),500)}))},handlePageScroll(){this.isPlaying&&this.closeVideo()},goToMobileVideoDetail(e){this.$router.push({name:"MobileVideoDetail",params:{id:e.src.split("/").pop(),sectionTitle:this.title.replace(/\s+/g,"-")}})},async fetchThumbnailsForRelatedVideos(){for(const t of this.relatedVideos)if(!t.thumbnail)try{const e=t.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${e}.json`),o=await i.json();t.thumbnail=o[0].thumbnail_large,t.title=o[0].title,t.duration=this.formatDuration(o[0].duration)}catch(e){console.error("Error fetching thumbnail:",e)}},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},getEmbedUrl(e){const t=e.split("/").pop();return`https://player.vimeo.com/video/${t}?autoplay=1&muted=1`},goToSlide(e){this.currentIndex=e,this.isPlaying=!1,this.scrollToVideo(e)},handleScroll(){const e=this.$refs.carouselTrack,t=e.scrollLeft,i=e.clientWidth,o=Math.round(t/i);!this.isScrolling&&this.isPlaying&&(this.isScrolling=!0),o!==this.currentIndex&&(this.currentIndex=o,this.isScrolling&&this.isPlaying&&this.closeVideo()),Math.abs(t-i*this.currentIndex)<5&&(this.isScrolling=!1)},handleTouchStart(e){this.touchStartX=e.touches[0].clientX},handleTouchEnd(e){const t=e.changedTouches[0].clientX;this.handleSwipe(t-this.touchStartX)},handleMouseStart(e){this.mouseStartX=e.clientX},handleMouseEnd(e){const t=e.clientX;this.handleSwipe(t-this.mouseStartX)},handleSwipe(e){const t=50;e>t?this.prevSlide():e<-t&&this.nextSlide()},prevSlide(){this.currentIndex>0&&(this.currentIndex--,this.scrollToVideo(this.currentIndex))},nextSlide(){this.currentIndex<this.relatedVideos.length-1&&(this.currentIndex++,this.scrollToVideo(this.currentIndex))},scrollToVideo(e){const t=this.$refs.carouselTrack,i=t.clientWidth;t.scrollTo({left:i*e,behavior:"smooth"})},playVideo(e){this.currentIndex=e,this.isPlaying=!0,this.initVimeoPlayer()},closeVideo(){this.isPlaying=!1,this.vimeoPlayer&&this.vimeoPlayer.pause().catch((e=>{console.error("Error pausing the video:",e)}))},initVimeoPlayer(){const e=this.$refs.carouselTrack.querySelectorAll("iframe")[this.currentIndex];e&&(this.vimeoPlayer=new Ze.A(e))}}};const tt=(0,a.A)(et,[["render",Je],["__scopeId","data-v-243c2a25"]]);var it=tt,ot={name:"HomePage",components:{LeftSidebar:w,RightSidebar:x,VideoPreview:ie,BackgroundVideo:ae,FooterPage:$e,HamburgerMenu:Xe,VideoCarousel:it},data(){return{musicVideos:[{id:1,src:"https://vimeo.com/522564568"},{id:2,src:"https://vimeo.com/522377522"},{id:3,src:"https://vimeo.com/491834523"},{id:4,src:"https://vimeo.com/1005402186"}],commercialVideos:[{id:1,src:"https://vimeo.com/290744844"},{id:2,src:"https://vimeo.com/199707225"},{id:3,src:"https://vimeo.com/189584267"},{id:4,src:"https://vimeo.com/522549222"},{id:5,src:"https://vimeo.com/522377522"},{id:6,src:"https://vimeo.com/522726870"}],underwaterVideos:[{id:1,src:"https://vimeo.com/522377522"},{id:2,src:"https://vimeo.com/522549222"},{id:3,src:"https://vimeo.com/522726870"}],filmVideos:[{id:1,src:"https://vimeo.com/522726870"}],isSmallScreen:window.innerWidth<1e3}},computed:{musicVideoThumbnail(){return i(2158)},commercialThumbnail(){return i(7138)},underwaterThumbnail(){return i(6656)},filmThumbnail(){return i(406)}},methods:{handlePlayVideo(e,t){this.saveScrollPosition(),this.$router.push({name:"VideoPlayer",query:{videoSrc:e,videoType:t}})},saveScrollPosition(){const e=window.scrollY||document.documentElement.scrollTop;localStorage.setItem("scrollPosition",e.toString())},handleResize(){this.isSmallScreen=window.innerWidth<1e3},scrollToWork(){const e=this.$refs.musicVideos.$el||this.$refs.musicVideos,t=document.querySelector(".hamburger-button")?.offsetHeight||0,i=e.getBoundingClientRect().top+window.pageYOffset-t;window.scrollTo({top:i,behavior:"smooth"})},scrollToContact(){const e=this.$refs.footer.$el||this.$refs.footer;e.scrollIntoView({behavior:"smooth"})},scrollBasedOnQuery(){const e=this.$route.query.scroll;"work"===e?this.scrollToWork():"contact"===e&&this.scrollToContact()}},created(){window.addEventListener("resize",this.handleResize)},mounted(){this.scrollBasedOnQuery()},watch:{"$route.query.scroll":"scrollBasedOnQuery"},beforeUnmount(){window.removeEventListener("resize",this.handleResize)}};const rt=(0,a.A)(ot,[["render",p],["__scopeId","data-v-319decc8"]]);var nt=rt;const st=e=>((0,r.Qi)("data-v-e31b6d54"),e=e(),(0,r.jt)(),e),lt={class:"video-player-page"},at={class:"main-content"},ct=st((()=>(0,r.Lk)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"55",height:"55",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.Lk)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})],-1))),dt=[ct],ht={class:"video-content"},ut=st((()=>(0,r.Lk)("span",{class:"arrow chevron"},"❮",-1))),mt=[ut],vt={class:"video-and-details"},pt={class:"video-container",ref:"videoContainer"},gt=["src"],kt={class:"video-details",ref:"videoDetails"},ft=["innerHTML"],yt={class:"video-credits"},bt=st((()=>(0,r.Lk)("strong",null,"Director:",-1))),wt=st((()=>(0,r.Lk)("strong",null,"Producer:",-1))),Lt=st((()=>(0,r.Lk)("strong",null,"Duration:",-1))),Vt=st((()=>(0,r.Lk)("span",{class:"arrow chevron"},"❯",-1))),St=[Vt],Ct={class:"related-videos"},Tt={class:"video-list-container"},xt=st((()=>(0,r.Lk)("span",{class:"arrow left-arrow chevron"},"❮",-1))),Pt=[xt],$t={class:"video-list",ref:"videoList"},Et=["onClick"],It={class:"hover-overlay"},Rt={class:"video-info"},_t={class:"textfamily"},Xt=st((()=>(0,r.Lk)("button",{class:"play-button"},[(0,r.Lk)("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,r.Lk)("polygon",{points:"5 3 19 12 5 21 5 3"})])],-1))),Ft={key:0,class:"playing-indicator"},Mt=st((()=>(0,r.Lk)("span",{class:"arrow right-arrow chevron"},"❯",-1))),Bt=[Mt];function Wt(e,t,i,o,n,s){const l=(0,r.g2)("LeftSidebar"),a=(0,r.g2)("RightSidebar");return(0,r.uX)(),(0,r.CE)("div",lt,[(0,r.bF)(l),(0,r.Lk)("div",at,[(0,r.Lk)("button",{class:"close-button",onClick:t[0]||(t[0]=(...e)=>s.redirectToHomePage&&s.redirectToHomePage(...e))},dt),(0,r.Lk)("h1",null,(0,P.v_)(n.sectionTitle),1),(0,r.Lk)("div",ht,[(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container left-arrow-container",{invisible:0===n.currentVideoIndex}]),onClick:t[1]||(t[1]=(...e)=>s.playPreviousVideo&&s.playPreviousVideo(...e))},mt,2),(0,r.Lk)("div",vt,[(0,r.Lk)("div",pt,[(0,r.Lk)("iframe",{src:s.videoEmbedUrl,frameborder:"0",allow:"autoplay; fullscreen",allowfullscreen:"",onLoad:t[2]||(t[2]=(...e)=>s.updateHeights&&s.updateHeights(...e))},null,40,gt)],512),(0,r.Lk)("div",kt,[(0,r.Lk)("h1",null,(0,P.v_)(n.videoTitle),1),(0,r.Lk)("div",{innerHTML:n.videoDescription,class:"video-description"},null,8,ft),(0,r.Lk)("ul",yt,[(0,r.Lk)("li",null,[bt,(0,r.eW)(" "+(0,P.v_)(n.videoDirector),1)]),(0,r.Lk)("li",null,[wt,(0,r.eW)(" "+(0,P.v_)(n.videoProducer),1)]),(0,r.Lk)("li",null,[Lt,(0,r.eW)(" "+(0,P.v_)(n.videoDuration),1)])])],512)]),(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container right-arrow-container",{invisible:n.currentVideoIndex===n.relatedVideos.length-1}]),onClick:t[3]||(t[3]=(...e)=>s.playNextVideo&&s.playNextVideo(...e))},St,2)]),(0,r.Lk)("div",Ct,[(0,r.Lk)("div",Tt,[(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container left-arrow-container",{invisible:!n.canScrollLeftRelated}]),onClick:t[4]||(t[4]=(...e)=>s.scrollLeftRelated&&s.scrollLeftRelated(...e))},Pt,2),(0,r.Lk)("div",$t,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(n.relatedVideos,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:e.id,class:(0,P.C4)(["video-item",{"active-video":n.currentVideoIndex===t}]),style:(0,P.Tr)({backgroundImage:`url(${e.thumbnail})`}),onClick:i=>s.handlePlayRelatedVideo(e.src,t)},[(0,r.Lk)("div",It,[(0,r.Lk)("div",Rt,[(0,r.Lk)("p",_t,(0,P.v_)(e.title)+" / "+(0,P.v_)(e.duration),1)]),Xt]),n.currentVideoIndex===t?((0,r.uX)(),(0,r.CE)("div",Ft," Playing ")):(0,r.Q3)("",!0)],14,Et)))),128))],512),(0,r.Lk)("div",{class:(0,P.C4)(["arrow-container right-arrow-container",{invisible:!n.canScrollRightRelated}]),onClick:t[5]||(t[5]=(...e)=>s.scrollRightRelated&&s.scrollRightRelated(...e))},Bt,2)])])]),(0,r.bF)(a)])}var Dt={name:"VideoPlayer",components:{LeftSidebar:w,RightSidebar:x},data(){return{videoTitle:"",videoDescription:"",videoDirector:"",videoProducer:"",videoDuration:"",relatedVideos:[],canScrollLeftRelated:!1,canScrollRightRelated:!0,canScrollLeftMain:!1,canScrollRightMain:!0,currentVideoIndex:0,sectionTitle:""}},computed:{videoEmbedUrl(){const e=this.$route.query.videoSrc.split("/").pop();return`https://player.vimeo.com/video/${e}?autoplay=1`}},watch:{"$route.query.videoSrc":"fetchVideoDetails"},created(){this.fetchVideoDetails(),this.fetchRelatedVideos(),this.sectionTitle=this.getSectionTitle(this.$route.query.videoType)},mounted(){window.addEventListener("resize",this.updateHeights);const e=this.$refs.videoList;e&&e.addEventListener("scroll",this.checkScrollRelated),this.updateHeights(),this.$nextTick(this.checkScrollRelated)},beforeUnmount(){window.removeEventListener("resize",this.updateHeights);const e=this.$refs.videoList;e&&e.removeEventListener("scroll",this.checkScrollRelated)},methods:{redirectToHomePage(){this.$router.push({name:"Home"})},async fetchVideoDetails(){const e=this.$route.query.videoSrc.split("/").pop(),t=await fetch(`https://vimeo.com/api/v2/video/${e}.json`),i=await t.json(),o=i[0];this.videoTitle=o.title,this.videoDescription=o.description.replace(/\n/g,"<br />"),this.videoDirector=o.user_name,this.videoProducer=o.user_name,this.videoDuration=this.formatDuration(o.duration),this.updateCurrentVideoIndex(e)},formatDuration(e){const t=Math.floor(e/60),i=e%60;return`${t.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`},fetchRelatedVideos(){const e=this.$route.query.videoType;"music"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/522564568",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/491834523",thumbnail:"",title:"",duration:""},{id:4,src:"https://vimeo.com/1005402186",thumbnail:"",title:"",duration:""}]:"commercial"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/290744844",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/199707225",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/189584267",thumbnail:"",title:"",duration:""},{id:4,src:"https://vimeo.com/522549222",thumbnail:"",title:"",duration:""},{id:5,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:6,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]:"underwater"===e?this.relatedVideos=[{id:1,src:"https://vimeo.com/522377522",thumbnail:"",title:"",duration:""},{id:2,src:"https://vimeo.com/522549222",thumbnail:"",title:"",duration:""},{id:3,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]:"film"===e&&(this.relatedVideos=[{id:1,src:"https://vimeo.com/522726870",thumbnail:"",title:"",duration:""}]),this.fetchThumbnailsForRelatedVideos()},async fetchThumbnailsForRelatedVideos(){for(const e of this.relatedVideos){const t=e.src.split("/").pop(),i=await fetch(`https://vimeo.com/api/v2/video/${t}.json`),o=await i.json();e.thumbnail=o[0].thumbnail_large,e.title=o[0].title,e.duration=this.formatDuration(o[0].duration)}this.$nextTick(this.checkScrollRelated)},updateHeights(){const e=this.$refs.videoContainer,t=this.$refs.videoDetails;e&&t&&(t.style.height=`${e.clientHeight}px`)},handlePlayRelatedVideo(e,t){const i=this.$route.query.videoType;this.$router.push({name:"VideoPlayer",query:{videoSrc:e,videoType:i}}),this.currentVideoIndex=t,this.fetchVideoDetails(),this.scrollToActiveVideo()},playPreviousVideo(){if(this.currentVideoIndex>0){this.currentVideoIndex--;const e=this.relatedVideos[this.currentVideoIndex];this.handlePlayRelatedVideo(e.src,this.currentVideoIndex)}},playNextVideo(){if(this.currentVideoIndex<this.relatedVideos.length-1){this.currentVideoIndex++;const e=this.relatedVideos[this.currentVideoIndex];this.handlePlayRelatedVideo(e.src,this.currentVideoIndex)}},getSectionTitle(e){const t={music:"Music Videos",commercial:"Commercials",underwater:"Underwater",film:"Films"};return t[e]||""},scrollLeftRelated(){const e=this.$refs.videoList;e&&(e.scrollBy({left:-300,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated))},scrollRightRelated(){const e=this.$refs.videoList;e&&(e.scrollBy({left:300,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated))},scrollToActiveVideo(){const e=this.$refs.videoList,t=e.children[this.currentVideoIndex];if(t){const i=e.getBoundingClientRect(),o=t.getBoundingClientRect(),r=o.left-i.left+e.scrollLeft,n=r-e.clientWidth/2+t.clientWidth/2;e.scrollTo({left:n,behavior:"smooth"}),this.$nextTick(this.checkScrollRelated)}},checkScrollRelated(){const e=this.$refs.videoList;e&&(this.canScrollLeftRelated=e.scrollLeft>0,this.canScrollRightRelated=e.scrollWidth>e.clientWidth+e.scrollLeft+1)},goBack(){this.$router.go(-1)},updateCurrentVideoIndex(e){this.currentVideoIndex=this.relatedVideos.findIndex((t=>t.src.endsWith(e)))}}};const jt=(0,a.A)(Dt,[["render",Wt],["__scopeId","data-v-e31b6d54"]]);var Ot=jt;const Ht=e=>((0,r.Qi)("data-v-69ce287a"),e=e(),(0,r.jt)(),e),At={class:"bio-page"},qt={class:"content-container"},Ut={class:"content"},zt=Ht((()=>(0,r.Lk)("div",{class:"profile-picture"},null,-1))),Qt=Ht((()=>(0,r.Lk)("h1",null,"About Me",-1))),Nt=Ht((()=>(0,r.Lk)("p",null," Gerard Alba is a Director of Photography from Granollers, Barcelona, with a lifelong love for visual storytelling. He trained in Cinematography at the New York Film Academy in Los Angeles and has been putting his skills to work on a variety of projects since graduating in 2016. ",-1))),Gt=Ht((()=>(0,r.Lk)("p",null," Gerard has been involved in films, music videos, and commercials, including a notable role in the camera department for the third season of Narcos. Whether he’s directing, handling the camera, or working with a steadicam, Gerard brings a thoughtful approach to lighting that really enhances the look of his projects. He’s also passionate about underwater photography, which adds a unique flair to his work. ",-1))),Kt=Ht((()=>(0,r.Lk)("p",null," Known for his enthusiastic and positive attitude, Gerard is excited to dive into fresh creative projects. ",-1))),Yt=Ht((()=>(0,r.Lk)("p",null," If you’re looking for a DP with a skill for storytelling, lighting, and a creative touch above and below the water, let’s connect and see what we can create together. ",-1)));function Jt(e,t,i,o,n,s){const l=(0,r.g2)("HamburgerMenu"),a=(0,r.g2)("LeftSidebar"),c=(0,r.g2)("RightSidebar");return(0,r.uX)(),(0,r.CE)("div",At,[n.isSmallScreen?((0,r.uX)(),(0,r.Wv)(l,{key:0,onScrollToWork:s.goToWorkFromBio,onScrollToContact:s.goToContactFromBio},null,8,["onScrollToWork","onScrollToContact"])):((0,r.uX)(),(0,r.Wv)(a,{key:1,class:"left-sidebar",onNavigateWork:s.goToWorkFromBio,onNavigateContact:s.goToContactFromBio},null,8,["onNavigateWork","onNavigateContact"])),(0,r.Lk)("div",qt,[(0,r.Lk)("div",Ut,[zt,Qt,Nt,Gt,Kt,Yt,(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.downloadCV&&s.downloadCV(...e))},"Download CV")])]),n.isSmallScreen?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.Wv)(c,{key:2,class:"right-sidebar",onNavigateWork:s.goToWorkFromBio,onNavigateContact:s.goToContactFromBio},null,8,["onNavigateWork","onNavigateContact"]))])}var Zt={name:"BioPage",components:{LeftSidebar:w,RightSidebar:x,HamburgerMenu:Xe},data(){return{isSmallScreen:window.innerWidth<1e3}},methods:{downloadCV(){const e=document.createElement("a");e.href="/Gerard_Alba_CV.pdf",e.download="Gerard_Alba_CV.pdf",e.click()},handleResize(){this.isSmallScreen=window.innerWidth<1e3},goToWorkFromBio(){this.$router.push({name:"Home",query:{scroll:"work"}})},goToContactFromBio(){this.$router.push({name:"Home",query:{scroll:"contact"}})}},created(){window.addEventListener("resize",this.handleResize)},beforeUnmount(){window.removeEventListener("resize",this.handleResize)}};const ei=(0,a.A)(Zt,[["render",Jt],["__scopeId","data-v-69ce287a"]]);var ti=ei;const ii=e=>((0,r.Qi)("data-v-7dc1476c"),e=e(),(0,r.jt)(),e),oi={class:"mobile-video-detail"},ri={class:"sticky-header"},ni=ii((()=>(0,r.Lk)("i",{class:"fas fa-arrow-left"},null,-1))),si=[ni],li={class:"content-wrapper"},ai={key:0},ci={class:"video-wrapper"},di=["src"],hi={class:"credits"},ui=["innerHTML"],mi={key:1},vi={key:1},pi=ii((()=>(0,r.Lk)("p",null,"Loading video details...",-1))),gi=[pi];function ki(e,t,i,o,n,s){return(0,r.uX)(),(0,r.CE)("div",oi,[(0,r.Lk)("header",ri,[(0,r.Lk)("button",{onClick:t[0]||(t[0]=t=>e.$router.go(-1))},si),(0,r.Lk)("h1",null,(0,P.v_)(s.formattedSectionTitle),1)]),(0,r.Lk)("div",li,[n.video?((0,r.uX)(),(0,r.CE)("div",ai,[(0,r.Lk)("div",ci,[(0,r.Lk)("iframe",{src:s.getEmbedUrl(i.videoId),frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:""},null,8,di)]),(0,r.Lk)("h2",null,(0,P.v_)(n.video.title),1),(0,r.Lk)("div",hi,[n.video.description?((0,r.uX)(),(0,r.CE)("div",{key:0,innerHTML:s.formattedCredits},null,8,ui)):((0,r.uX)(),(0,r.CE)("p",mi,"No credits available for this video."))])])):((0,r.uX)(),(0,r.CE)("div",vi,gi))])])}var fi={props:{videoId:{type:String,required:!0},sectionTitle:{type:String,required:!0}},data(){return{video:null}},computed:{formattedSectionTitle(){return this.sectionTitle.replace(/-/g," ")},formattedCredits(){return this.video&&this.video.description?this.video.description.replace(/<br\s*\/?>/g,"<br>"):""}},created(){this.fetchVideoDetails(),window.scrollTo(0,0)},methods:{async fetchVideoDetails(){try{const e=await fetch(`https://vimeo.com/api/v2/video/${this.videoId}.json`),t=await e.json();console.log(t[0]),this.video=t[0]}catch(e){console.error("Error fetching video details:",e)}},getEmbedUrl(e){return`https://player.vimeo.com/video/${e}?autoplay=1`}}};const yi=(0,a.A)(fi,[["render",ki],["__scopeId","data-v-7dc1476c"]]);var bi=yi;const wi=[{path:"/",name:"Home",component:nt},{path:"/video",name:"VideoPlayer",component:Ot,props:e=>({videoSrc:e.query.videoSrc})},{path:"/bio",name:"Bio",component:ti},{path:"/video-detail/:sectionTitle/:id",name:"MobileVideoDetail",component:bi,props:e=>({videoId:e.params.id,sectionTitle:e.params.sectionTitle})}],Li=(0,h.aE)({history:(0,h.Bt)(),routes:wi});var Vi=Li;const Si=(0,o.Ef)(d);Si.use(Vi),Si.mount("#app")},3218:function(e,t,i){e.exports=i.p+"img/black.6eaeb5fd.png"},7138:function(e,t,i){e.exports=i.p+"img/commercials.03585dc5.png"},406:function(e,t,i){e.exports=i.p+"img/films.1fbb6375.png"},2158:function(e,t,i){e.exports=i.p+"img/musicvideos.49f44ab9.png"},6656:function(e,t,i){e.exports=i.p+"img/underwater.bfb5dfa6.png"}},t={};function i(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,i),n.exports}i.m=e,function(){var e=[];i.O=function(t,o,r,n){if(!o){var s=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],n=e[d][2];for(var l=!0,a=0;a<o.length;a++)(!1&n||s>=n)&&Object.keys(i.O).every((function(e){return i.O[e](o[a])}))?o.splice(a--,1):(l=!1,n<s&&(s=n));if(l){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,r,n]}}(),function(){i.d=function(e,t){for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.p="/"}(),function(){var e={524:0};i.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,s=o[0],l=o[1],a=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(r in l)i.o(l,r)&&(i.m[r]=l[r]);if(a)var d=a(i)}for(t&&t(o);c<s.length;c++)n=s[c],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(d)},o=self["webpackChunkportfolio"]=self["webpackChunkportfolio"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=i.O(void 0,[504],(function(){return i(191)}));o=i.O(o)})();
//# sourceMappingURL=app.564363a3.js.map