import{_ as c,M as o,p as l,q as i,Q as p,R as s,t as n,N as t,a1 as e}from"./framework-e03faf0e.js";const u={},d=s("h1",{id:"filter-elements",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#filter-elements","aria-hidden":"true"},"#"),n(" Filter elements")],-1),k={href:"https://youtu.be/ro3RPgNGw4g",target:"_blank",rel:"noopener noreferrer"},r=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Apples<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Grapes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Pears<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Kiwi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),v=s("code",null,"LI",-1),m={href:"https://on.cypress.io/eq",target:"_blank",rel:"noopener noreferrer"},g=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// using the cy.eq command to pick one element</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),h=s("code",null,"LI",-1),b=s("code",null,"cy.get",-1),f={href:"https://api.jquery.com/odd-selector/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://on.cypress.io/filter",target:"_blank",rel:"noopener noreferrer"},y=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// using jQuery :odd pseudo-class</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:odd&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note: jQuery has deprecated the <code>:odd</code> in favor of the method <code>odd()</code>, thus you would write the equivalent test as</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// using jQuery odd() method</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;odd&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can select elements 0, 2, 4, etc using <code>:even</code> jQuery pseudo-class or by invoking the jQuery <code>even()</code> method</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// using jQuery :even pseudo-class</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:even&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// using jQuery even() method</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;even&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),j={href:"https://api.jquery.com/eq-selector/",target:"_blank",rel:"noopener noreferrer"},x=s("code",null,":eq(index)",-1),Q=s("code",null,",",-1),q=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// select the 2nd and the 3rd elements</span>
<span class="token comment">// using jQuery :eq(index) pseudo-class</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:eq(1), :eq(2)&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To select all elements after a certain index or before it, you can use jQuery <code>:gt()</code> and <code>:lt()</code> pseudo-classes with a zero-based index.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// select the elements after the first two</span>
<span class="token comment">// using jQuery :gt(index) pseudo-class</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:gt(1)&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Kiwi&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// select the first two elements</span>
<span class="token comment">// using jQuery :lt(index) pseudo-class</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:lt(2)&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Apples&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// select the middle two elements out of 4</span>
<span class="token comment">// using a combination of :gt() and :lt()</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:gt(0)&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;:lt(2)&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Grapes&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Pears&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function w(P,N){const a=o("ExternalLinkIcon");return l(),i("div",null,[d,p(" fiddle Filter elements using jQuery pseudo-classes "),s("p",null,[n("Watch this recipe explained in the video "),s("a",k,[n("Filter Elements Using jQuery Pseudo-Classes"),t(a)]),n(".")]),r,s("p",null,[n("We can get all "),v,n(" elements and then pick a particular element using its index and "),s("a",m,[n("cy.eq"),t(a)]),n(" command")]),g,s("p",null,[n("How would you pick several "),h,n(" elements? You can use jQuery pseudo-classes. For example, to pick items 1, 3, 5, etc from the list yielded by the "),b,n(" command you should use the jQuery "),s("a",f,[n(":odd"),t(a)]),n(" pseudo-class with "),s("a",_,[n("cy.filter"),t(a)]),n(" command.")]),y,s("p",null,[n("What if you want to select the 2nd and the 3rd elements? You can use the jQuery "),s("a",j,[x,t(a)]),n(" pseudo-class to pick individual elements and combine them using the CSS "),Q,n(" operator.")]),q,p(" fiddle.end ")])}const E=c(u,[["render",w],["__file","filter-elements.html.vue"]]);export{E as default};
