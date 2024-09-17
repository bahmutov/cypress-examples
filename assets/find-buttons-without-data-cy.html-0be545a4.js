import{_ as t,p as e,q as p,Q as a,R as n,t as s,a1 as c}from"./framework-e03faf0e.js";const o={},u=n("h1",{id:"find-all-buttons-without-data-cy-attribute",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#find-all-buttons-without-data-cy-attribute","aria-hidden":"true"},"#"),s(" Find All Buttons Without "),n("code",null,"data-cy"),s(" attribute")],-1),l=c(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>click1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">data-cy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>one<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Click me<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>click2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Save<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>click3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Reload<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can list all buttons that have the <code>data-cy</code> attribute.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;button[data-cy]&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// only a single &quot;Click me&quot; button has &quot;data-cy&quot;</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token string">&#39;innerText&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;Click me&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let&#39;s find all buttons on the page that <em>do not have</em> the <code>data-cy</code> attribute. Maybe these buttons are not covered by the E2E tests.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;button:not([data-cy])&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token comment">// confirm the found buttons</span>
  <span class="token comment">// using cypress-map query command &quot;cy.mapInvoke&quot;</span>
  <span class="token punctuation">.</span><span class="token function">mapInvoke</span><span class="token punctuation">(</span><span class="token string">&#39;getAttribute&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;click2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click3&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function i(d,k){return e(),p("div",null,[u,a(" fiddle Find all buttons without data-cy attribute "),l,a(" fiddle-end ")])}const m=t(o,[["render",i],["__file","find-buttons-without-data-cy.html.vue"]]);export{m as default};
