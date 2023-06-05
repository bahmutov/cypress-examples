import{_ as p,M as o,p as c,q as l,R as n,t as s,N as i,V as u,Q as a,a1 as e}from"./framework-e03faf0e.js";const r={},d=n("h1",{id:"cy-contains-and-regular-expressions",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#cy-contains-and-regular-expressions","aria-hidden":"true"},"#"),s(" cy.contains and regular expressions")],-1),g=n("code",null,"cy.contains",-1),k=n("h2",{id:"ignore-case",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ignore-case","aria-hidden":"true"},"#"),s(" Ignore case")],-1),m=n("p",null,[s("Command "),n("code",null,"cy.contains"),s(" can ignore case using an option.")],-1),v=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>greeting<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>HeLlO wOrLd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">matchCase</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span>
  <span class="token string">&#39;have.id&#39;</span><span class="token punctuation">,</span>
  <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h=n("h2",{id:"use-a-regular-expression",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#use-a-regular-expression","aria-hidden":"true"},"#"),s(" Use a regular expression")],-1),x=n("p",null,[s("You can also use a regular expression with "),n("code",null,"i"),s(" option to ignore the case.")],-1),b=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>greeting<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>HeLlO wOrLd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Hello</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),f=n("h2",{id:"match-the-start-of-the-string",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#match-the-start-of-the-string","aria-hidden":"true"},"#"),s(" Match the start of the string")],-1),_=n("p",null,"Regular expressions are really useful to match a string at the start or end of the text.",-1),y=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>greeting<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>HeLlO wOrLd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^Hello</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),q=n("p",null,"Here is matching text at the end:",-1),j=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>greeting<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>HeLlO wOrLd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">world$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),w=n("h2",{id:"dynamic-regular-expression",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#dynamic-regular-expression","aria-hidden":"true"},"#"),s(" Dynamic regular expression")],-1),L=n("p",null,"If you do not know the text beforehand, you can construct a regular expression object instead of using a regular expression syntax.",-1),O=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>greeting<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>HeLlO wOrLd<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// the text to find comes from a variable</span>
<span class="token keyword">const</span> start <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>
<span class="token comment">// construct the regular expression object</span>
<span class="token keyword">const</span> regex <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">&#39;^&#39;</span> <span class="token operator">+</span> start<span class="token punctuation">,</span> <span class="token string">&#39;i&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// the cy.contains will be equivalent to /^hello/i</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;greeting&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function H(C,N){const t=o("RouterLink");return c(),l("div",null,[d,n("p",null,[s("For more "),g,s(" examples, see "),i(t,{to:"/commands/querying.html"},{default:u(()=>[s("Querying commands")]),_:1}),s(".")]),k,m,a(" fiddle Ignore case "),v,a(" fiddle-end "),h,x,a(" fiddle Use a regular expression to ignore case "),b,a(" fiddle-end "),f,_,a(" fiddle Find element that starts with hello "),y,a(" fiddle-end "),q,a(" fiddle Find element that ends with world "),j,a(" fiddle-end "),w,L,a(" fiddle Construct the regular expression from a string value "),O,a(" fiddle-end ")])}const V=p(r,[["render",H],["__file","contains-regular-expression.html.vue"]]);export{V as default};
