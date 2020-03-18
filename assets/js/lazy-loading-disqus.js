/*
Version : 1.0.0
Repo : samclarke.com/lazy-loading-disqus
Author : Sam Clarke
License : MIT
*/
!function(e,t){var n,i,r,s,a=.75*t.innerHeight;function d(){!i&&r.getBoundingClientRect().top-t.innerHeight<=a&&(removeEventListener("scroll",s),removeEventListener("resize",s),(n=e.createElement("script")).async=!0,n.src='https://'+disqus_shortname+'.disqus.com/embed.js',n.setAttribute("data-timestamp",+new Date),(e.head||e.body).appendChild(n),i=!0)}r&&(addEventListener("scroll",s),addEventListener("resize",s)),t.disqusLazy=function(n){var i,l,o,c;i=d,l=(n=n||{}).throttle||100,c=0,s=function(){var e=+new Date,t=l-(e-c),n=arguments;clearTimeout(o),t>0?o=setTimeout(function(){c=e,i.apply(null,n)},t):(c=e,i.apply(null,n))},r=n.element||e.getElementById("disqus_thread"),a=n.threashold||.75*t.innerHeight,r&&(addEventListener("scroll",s),addEventListener("resize",s))}}(document,window);


var disqusCommentBox = document.querySelector('.disqus_comment_box')
if (disqusCommentBox) {
    disqusLazy();
}