import{_ as i,M as o,p as l,q as u,R as s,t as n,N as t,V as r,Q as a,a1 as e}from"./framework-e03faf0e.js";const k={},d=s("h1",{id:"spy-called-with-an-object",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#spy-called-with-an-object","aria-hidden":"true"},"#"),n(" Spy called with an object")],-1),m={href:"https://on.cypress.io/spy",target:"_blank",rel:"noopener noreferrer"},v={href:"https://youtu.be/Re4bNOBqes8",target:"_blank",rel:"noopener noreferrer"},g=s("h2",{id:"primitive-types",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#primitive-types","aria-hidden":"true"},"#"),n(" Primitive types")],-1),h=s("p",null,"If the method is called with primitive arguments like strings, then it is simple to check.",-1),b=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;console&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">console</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span>console<span class="token punctuation">,</span> <span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Hello&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;world&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),f=s("h2",{id:"exact-object",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#exact-object","aria-hidden":"true"},"#"),n(" Exact object")],-1),y=s("p",null,[n("If the method is called with an object, you can do two things: either yield it to the next assertion "),s("code",null,"deep.equal"),n(" or use the Sinon's built-in matching assertion.")],-1),_=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;console&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">console</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span>console<span class="token punctuation">,</span> <span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We have set up the spy to be ready when the application calls <code>console.log</code>. We now need to confirm the log method was called with 2 arguments. The first argument is a primitive string <code>User %o</code>. That is easy to do:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;User %o&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),j={href:"https://www.chaijs.com/plugins/sinon-chai/",target:"_blank",rel:"noopener noreferrer"},w=s("code",null,"calledWith",-1),x=s("code",null,"deep.equal",-1),C=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// use Sinon-Chai built-in object by value match</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can also confirm the call using placeholder <code>Cypress.sinon.match.object</code> and yield the argument to run more &quot;assertions&quot; using chained commands.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// yield the object to the next assertion</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> Cypress<span class="token punctuation">.</span>sinon<span class="token punctuation">.</span>match<span class="token punctuation">.</span>object<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;firstCall.args.1&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),W=s("h2",{id:"partial-object",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#partial-object","aria-hidden":"true"},"#"),n(" Partial object")],-1),S=s("p",null,[n("If we know some properties of the object, we can use "),s("code",null,"deep.include"),n(" assertion on the yielded object.")],-1),I=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;console&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">console</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">spy</span><span class="token punctuation">(</span>console<span class="token punctuation">,</span> <span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;log&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> Cypress<span class="token punctuation">.</span>sinon<span class="token punctuation">.</span>match<span class="token punctuation">.</span>object<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;firstCall.args.1&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// imagine we do not know all object fields</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.include&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternatively, if we know all the expected field names, we can use Sinon matchers as placeholders:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;@log&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.calledWith&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;User %o&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> Cypress<span class="token punctuation">.</span>sinon<span class="token punctuation">.</span>match<span class="token punctuation">.</span>number<span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Joe&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),T=s("strong",null,"Tip:",-1),U={href:"https://github.com/bahmutov/cy-spok",target:"_blank",rel:"noopener noreferrer"};function q(N,J){const p=o("ExternalLinkIcon"),c=o("RouterLink");return l(),u("div",null,[d,s("p",null,[n("Imagine you are spying on a call using "),s("a",m,[n("cy.spy"),t(p)]),n(" command. How do you check if the caller passed the right arguments? If you already read the examples from my "),t(c,{to:"/commands/spies-stubs-clocks.html"},{default:r(()=>[n("Spies, Stubs & Clocks")]),_:1}),n(" page, then keep reading.")]),s("p",null,[n("📺 watch this recipe explained in the video "),s("a",v,[n("Check If A Spy Was Called With The Right Object"),t(p)]),n(".")]),g,h,a(" fiddle Primitive types "),b,a(" fiddle-end "),f,y,a(" fiddle Exact object "),_,s("p",null,[n("How do we confirm the second argument? "),s("a",j,[n("Sinon-Chai"),t(p)]),n(" library "),w,n(" uses "),x,n(" comparison by default, thus we can simply pass the object.")]),C,a(" fiddle-end "),W,S,a(" fiddle Partial object "),I,a(" fiddle-end "),s("p",null,[T,n(" try using "),s("a",U,[n("cy-spok"),t(p)]),n(" plugin for such assertions.")])])}const E=i(k,[["render",q],["__file","called-with-object.html.vue"]]);export{E as default};