import{_ as s,p as t,q as e,Q as n,R as a,t as p,a1 as c}from"./framework-e03faf0e.js";const o={},u=a("h1",{id:"menu-page-object",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#menu-page-object","aria-hidden":"true"},"#"),p(" Menu Page Object")],-1),l=c(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>navbar navbar-expand-lg navbar-light bg-light<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>navbar-brand<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>EN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>navbar-brand<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>DE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>navbar-brand<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>IT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>navbar-brand<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>ES<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s confirm the navigation menu has the four expected languages in the correct order.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> translations <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;EN&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;DE&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;IT&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ES&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We could write a page object (&quot;PO&quot; for short) that could get the menu items and store the text data list inside the object:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> MenuPO <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// initially the list is empty</span>
  <span class="token literal-property property">languages</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">getLanguages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;nav.navbar a.navbar-brand&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$a</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>languages<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>$a<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// simple abstraction over page selectors</span>
  <span class="token comment">// without storing anything in the object itself</span>
  <span class="token function">getLanguageElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;nav.navbar a.navbar-brand&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>How do we compare the list of languages? Trying to print it shows an empty list</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>MenuPO<span class="token punctuation">.</span><span class="token function">getLanguages</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>MenuPO<span class="token punctuation">.</span>languages<span class="token punctuation">)</span> <span class="token comment">// []</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>We can use <code>MenuPO.languages</code> only <em>after</em> the Cypress commands inside <code>MenuPO.getLanguages</code> method finish. The simplest way is to return the <code>cy</code> chain from the page object&#39;s method and use the data from the page inside <code>cy.then(callback)</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>MenuPO<span class="token punctuation">.</span><span class="token function">getLanguages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// The array &quot;MenuPO.languages&quot; now has data</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>MenuPO<span class="token punctuation">.</span>languages<span class="token punctuation">,</span> <span class="token string">&#39;languages&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>
    translations<span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There is a better way. Do not accumulate any data in the page object. Make the page object a simple abstraction over selectors instead.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>MenuPO<span class="token punctuation">.</span><span class="token function">getLanguageElements</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// cy.map comes from cypress-map plugin</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token string">&#39;innerText&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> translations<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Tip:</strong> the above code is using query commands only, thus it is retry-able and will work even if the menu elements are created dynamically.</p>`,12);function i(r,k){return t(),e("div",null,[u,n(" fiddle Menu page object "),l,n(" fiddle-end ")])}const v=s(o,[["render",i],["__file","menu-page-object.html.vue"]]);export{v as default};