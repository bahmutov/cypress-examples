import{_ as o,M as a,p as i,q as l,Q as t,R as n,t as s,N as e,V as u,a1 as d}from"./framework-e03faf0e.js";const k={},r=n("h1",{id:"find-duplicates",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#find-duplicates","aria-hidden":"true"},"#"),s(" Find duplicates")],-1),v=n("p",null,"Imagine we have a list and there are two items with the same text (the rest are all different). How do we confirm that there two duplicates?",-1),g=n("h2",{id:"if-we-know-the-duplicate-value",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#if-we-know-the-duplicate-value","aria-hidden":"true"},"#"),s(" If we know the duplicate value")],-1),h=d(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Apples<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Kiwi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Melon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Grapes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Pears<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Kiwi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the list example above, there should be two list items with the text &quot;Kiwi&quot;. We cannot use the <code>cy.contains</code> command as it returns the first element with the text</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Kiwi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We can use the jQuery selector <code>:contains</code> instead to find all elements with the given text.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li:contains(Kiwi)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>But what about the rest of the items? They should be all unique.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li:not(:contains(&quot;Kiwi&quot;))&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$el</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Cypress<span class="token punctuation">.</span>_<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>$el<span class="token punctuation">,</span> <span class="token string">&#39;innerText&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// confirm the list has unique elements</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">values</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> distinct <span class="token operator">=</span> Cypress<span class="token punctuation">.</span>_<span class="token punctuation">.</span><span class="token function">uniq</span><span class="token punctuation">(</span>values<span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>distinct<span class="token punctuation">,</span> <span class="token string">&#39;all strings are different&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>have<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span>
      values<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),m={href:"https://youtu.be/MU08Air76bI",target:"_blank",rel:"noopener noreferrer"};function f(b,w){const p=a("ExternalLinkIcon"),c=a("RouterLink");return i(),l("div",null,[r,v,g,t(" fiddle Find known duplicate value "),h,t(" fiddle-end "),n("p",null,[s("You can watch the above recipe derivation in the video "),n("a",m,[s("Find Duplicate Text Kiwi And Confirm The Rest Of Elements Are Unique"),e(p)]),s(". If we do not know the duplicate value, see the recipe "),e(c,{to:"/recipes/duplicates.html"},{default:u(()=>[s("Checking for duplicates")]),_:1})])])}const x=o(k,[["render",f],["__file","find-duplicates.html.vue"]]);export{x as default};
