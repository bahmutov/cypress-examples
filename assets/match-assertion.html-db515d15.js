import{_ as o,M as p,p as i,q as l,R as n,t as s,N as t,Q as a,a1 as c}from"./framework-e03faf0e.js";const r={},u=n("h1",{id:"match-assertion",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-assertion","aria-hidden":"true"},"#"),s(" Match assertion")],-1),d=n("code",null,"match",-1),k={href:"https://api.jquery.com/is/",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"match",-1),g={href:"https://youtu.be/FTjWAeCWpHQ",target:"_blank",rel:"noopener noreferrer"},m=n("h2",{id:"match-jquery-element-selector",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-jquery-element-selector","aria-hidden":"true"},"#"),s(" Match jQuery element selector")],-1),v=c(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>one<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>btn btn-large<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>First<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;First&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// the current subject should match the selector</span>
  <span class="token comment">// &quot;#one.btn-large&quot;</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;match&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#one.btn-large&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// we can use other jQuery selectors like</span>
  <span class="token comment">// :contains to confirm the text</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;match&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;div:contains(&quot;First&quot;)&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),x=n("h2",{id:"match-the-text-using-regular-expression",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-the-text-using-regular-expression","aria-hidden":"true"},"#"),s(" Match the text using regular expression")],-1),_=c(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fruit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Orange<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// using https://on.cypress.io/contains</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;#fruit&#39;</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(orange|apple|grape)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span>
<span class="token comment">// using the &quot;match&quot; assertion</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#fruit&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;match&#39;</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">orange</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),b=n("h2",{id:"match-url-using-regular-expression",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-url-using-regular-expression","aria-hidden":"true"},"#"),s(" Match url using regular expression")],-1),f=n("code",null,"/product/p<id>",-1),j={href:"https://on.cypress.io/location",target:"_blank",rel:"noopener noreferrer"},q=c(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// the current page looks like /product/p1234</span>
cy<span class="token punctuation">.</span><span class="token function">location</span><span class="token punctuation">(</span><span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;match&#39;</span><span class="token punctuation">,</span> \\<span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">product\\/p\\d+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function y(M,Q){const e=p("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[s("If the current subject is a jQuery element, the "),d,s(" assertion uses "),n("a",k,[s("jQuery .is"),t(e)]),s(" method to check if the element matches the selector. If the current subject is text, the "),h,s(" assertion checks it against the given regular expression.")]),n("p",null,[s("Watch the video "),n("a",g,[s("Using Should Match Assertion Against Elements Or Text"),t(e)]),s(" or continue reading.")]),m,a(" fiddle Match jQuery element selector "),v,a(" fiddle-end "),x,a(" fiddle Match text using regular expression "),_,a(" fiddle-end "),b,n("p",null,[s("I love matching URL using a regular expression. For example, if we are redirected to the item's URL at "),f,s(", then we can strictly confirm it using "),n("a",j,[s("cy.location"),t(e)]),s(" command")]),q])}const F=o(r,[["render",y],["__file","match-assertion.html.vue"]]);export{F as default};