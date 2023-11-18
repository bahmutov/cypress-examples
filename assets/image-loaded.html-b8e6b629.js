import{_ as e,M as o,p,q as c,Q as s,R as n,t as a,N as l,a1 as i}from"./framework-e03faf0e.js";const u={},d=n("h1",{id:"image-has-loaded",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#image-has-loaded","aria-hidden":"true"},"#"),a(" Image Has Loaded")],-1),r=n("p",null,[a("To check if an image has successfully loaded, check its property "),n("code",null,"naturalWidth"),a(". It is only set if the browser downloaded and displayed the image.")],-1),k=i(`<p>Here is an image that successfully loads.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
  <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>loads<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://glebbahmutov.com/images/warming-stripes.png<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>400<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>50<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#loads&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.visible&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;have.prop&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;naturalWidth&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.greaterThan&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m={href:"https://youtu.be/R79ai463xIM",target:"_blank",rel:"noopener noreferrer"};function h(v,g){const t=o("ExternalLinkIcon");return p(),c("div",null,[d,r,s(" fiddle Image has loaded "),k,s(" fiddle-end "),n("p",null,[a("Watch the video "),n("a",m,[a("Check If An Image Loads"),l(t)]),a(".")])])}const _=e(u,[["render",h],["__file","image-loaded.html.vue"]]);export{_ as default};