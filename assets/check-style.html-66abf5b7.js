import{_ as l,M as a,p as i,q as u,Q as t,R as s,t as n,N as e,V as r,a1 as p}from"./framework-e03faf0e.js";const d={},k=s("h1",{id:"check-style",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#check-style","aria-hidden":"true"},"#"),n(" Check style")],-1),v=p(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
  <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>contains-example<span class="token punctuation">&quot;</span></span>
  <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">font-weight</span><span class="token punctuation">:</span> 600<span class="token punctuation">;</span> <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline</span><span class="token punctuation">&quot;</span></span></span>
<span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>Some text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can check what the element declares using the &quot;have.css&quot; assertion</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#contains-example&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Some text&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;have.css&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;text-decoration&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// the text-decoration style string includes color and line type</span>
  <span class="token comment">// we are only interested in the presence of the &quot;underline&quot; keyword</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;underline&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m=s("code",null,"<span>",-1),h=s("em",null,"computed style",-1),g=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#contains-example&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$el</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> window<span class="token punctuation">.</span><span class="token function">getComputedStyle</span><span class="token punctuation">(</span>$el<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;getPropertyValue&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;font-weight&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;600&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_={href:"https://youtu.be/Ij3g0W_oxPE",target:"_blank",rel:"noopener noreferrer"};function b(f,x){const c=a("RouterLink"),o=a("ExternalLinkIcon");return i(),u("div",null,[k,t(" fiddle Check style "),v,s("p",null,[n("If we need to check the "),m,n(" element inside to confirm it has an underlined text, we need at the "),h,n(", see the recipe "),e(c,{to:"/recipes/computed-style.html"},{default:r(()=>[n("Computed style")]),_:1}),n(".")]),g,s("p",null,[n("Watch the video "),s("a",_,[n("Check CSS Text Decoration Property"),e(o)]),n(".")]),t(" fiddle-end ")])}const q=l(d,[["render",b],["__file","check-style.html.vue"]]);export{q as default};