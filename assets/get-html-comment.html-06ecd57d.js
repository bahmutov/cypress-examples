import{_ as a,p as t,q as e,Q as n,R as s,t as p,a1 as o}from"./framework-e03faf0e.js";const c={},l=s("h1",{id:"get-html-comment",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#get-html-comment","aria-hidden":"true"},"#"),p(" Get HTML comment")],-1),i=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>There is an HTML comment after this paragraph<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- I am a comment --&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;p&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$p</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// from the jQuery object get the DOM element</span>
    <span class="token comment">// then use the &quot;nextSibling&quot; to get the &quot;\\n&quot; text node</span>
    <span class="token comment">// then the &quot;nextSibling&quot; again to get the comment node</span>
    <span class="token keyword">return</span> $p<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>nextSibling<span class="token punctuation">.</span>nextSibling
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.include&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nodeName</span><span class="token operator">:</span> <span class="token string">&#39;#comment&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token string">&#39; I am a comment &#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function u(r,d){return t(),e("div",null,[l,n(" fiddle Get HTML comment "),i,n(" fiddle-end ")])}const k=a(c,[["render",u],["__file","get-html-comment.html.vue"]]);export{k as default};