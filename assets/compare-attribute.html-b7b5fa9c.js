import{_ as o,M as a,p as i,q as l,Q as t,R as n,t as s,N as e,V as u,a1 as r}from"./framework-e03faf0e.js";const k={},d=n("h1",{id:"compare-attribute",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#compare-attribute","aria-hidden":"true"},"#"),s(" Compare attribute")],-1),v={href:"https://youtu.be/lj6cIjbPmh8",target:"_blank",rel:"noopener noreferrer"},m=r(`<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">#member[active]</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> pink<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#info</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1rem 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">#info[active]::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;Yes&#39;</span><span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>member<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Is A Member<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>info<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>User is a member?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">const</span> isMember <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isMember<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// set the same attribute on multiple elements</span>
    document
      <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;member&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
    document
      <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;info&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#member&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;attr&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>Boolean<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;be.a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;boolean&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">isActive</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isActive<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#info&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.attr&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#info&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;not.have.attr&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),b=n("h2",{id:"see-also",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#see-also","aria-hidden":"true"},"#"),s(" See also")],-1);function g(h,f){const p=a("ExternalLinkIcon"),c=a("RouterLink");return i(),l("div",null,[d,t(" fiddle Confirm the attribute is present or not "),n("p",null,[s("You can watch this recipe explained in the video "),n("a",v,[s("Compare Element Attribute Value"),e(p)]),s(".")]),m,t(" fiddle-end "),b,n("ul",null,[n("li",null,[e(c,{to:"/recipes/compare-numbers.html"},{default:u(()=>[s("Compare numbers")]),_:1})])])])}const y=o(k,[["render",g],["__file","compare-attribute.html.vue"]]);export{y as default};
