import{_ as c,M as p,p as l,q as i,Q as t,R as s,t as n,N as e,a1 as o}from"./framework-e03faf0e.js";const u={},r=s("h1",{id:"remove-element",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#remove-element","aria-hidden":"true"},"#"),n(" Remove Element")],-1),d={href:"https://youtu.be/IhGHb7PV3XY",target:"_blank",rel:"noopener noreferrer"},k=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>make<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  Honda Civic
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>picked<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>(3 out of 4)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.picked</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> smaller<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> lighter<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),m=s("code",null,"span.picked",-1),v={href:"https://api.jquery.com/remove/",target:"_blank",rel:"noopener noreferrer"},h=s("code",null,"remove",-1),g={href:"https://on.cypress.io/invoke",target:"_blank",rel:"noopener noreferrer"},_=s("code",null,"remove",-1),b=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.picked&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;remove&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// confirm the element was removed</span>
<span class="token comment">// by checking the parent&#39;s element text</span>
<span class="token comment">// Note: cannot use &quot;have.text&quot; assertion</span>
<span class="token comment">// since the HTML element has newlines and other</span>
<span class="token comment">// whitespace characters</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#make&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;trim&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Honda Civic&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(y,x){const a=p("ExternalLinkIcon");return l(),i("div",null,[r,t(" fiddle Remove the found element "),s("p",null,[n("Watch this recipe in the video "),s("a",d,[n("Remove The Found Element"),e(a)]),n(".")]),k,s("p",null,[n("To remove the "),m,n(" from the page, we can use the jQuery "),s("a",v,[h,e(a)]),n(" method. Cypress querying commands yield jQuery objects, thus we can use "),s("a",g,[n("cy.invoke"),e(a)]),n(" to call the "),_,n(" method immediately.")]),b,t(" fiddle-end ")])}const j=c(u,[["render",f],["__file","remove-element.html.vue"]]);export{j as default};
