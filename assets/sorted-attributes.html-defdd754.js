import{_ as e,M as o,p as c,q as i,Q as a,R as s,t as n,N as u,a1 as t}from"./framework-e03faf0e.js";const l={},r=s("h1",{id:"sorted-attributes",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#sorted-attributes","aria-hidden":"true"},"#"),n(" Sorted Attributes")],-1),k=t(`<p>Let&#39;s take a dynamically populated list of items.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>purchases<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">const</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;purchases&#39;</span><span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    ul<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token string">&#39;&lt;li data-sku=&quot;0044B&quot;&gt;Chair&lt;/li&gt;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    ul<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token string">&#39;&lt;li data-sku=&quot;00500A&quot;&gt;Table&lt;/li&gt;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    ul<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token string">&#39;&lt;li data-sku=&quot;00100C&quot;&gt;Bed&lt;/li&gt;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2500</span><span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    ul<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token string">&#39;&lt;li data-sku=&quot;00991C&quot;&gt;Frame&lt;/li&gt;&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Each element in the list has <code>data-sku</code> attribute. Can we confirm the final list of attributes? We do not care about the order of the items, so we want to confirm the sorted list of attributes.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// the sorted expected SKU numbers</span>
<span class="token keyword">const</span> skus <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;00991C&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;00100C&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;00500A&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;0044B&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,4),d={href:"https://github.com/bahmutov/cypress-map",target:"_blank",rel:"noopener noreferrer"},m=s("code",null,"data-sku",-1),v=t(`<p><strong>Tip:</strong> increase the Chai truncate threshold to see both arrays in the assertion</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>chai<span class="token punctuation">.</span>config<span class="token punctuation">.</span>truncateThreshold <span class="token operator">=</span> <span class="token number">300</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#purchases li&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// cy.mapInvoke from cypress-map</span>
  <span class="token punctuation">.</span><span class="token function">mapInvoke</span><span class="token punctuation">(</span><span class="token string">&#39;getAttribute&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;data-sku&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;sort&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// cy.print from cypress-map</span>
  <span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> skus<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternative solution: use <code>cy.map</code> from <code>cypress-map</code> to get the <code>data-...</code> attributes.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;**use cy.map**&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#purchases li&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// get the &quot;data-sku&quot; from each DOM element</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token string">&#39;dataset.sku&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;sort&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;deep.equal&#39;</span><span class="token punctuation">,</span> skus<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you cannot use <code>cypress-map</code>, you should write a single <code>should(callback)</code> to keep extracting the data attributes and compare them to the expected list.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;**use should(callback)**&#39;</span><span class="token punctuation">)</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#purchases li&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$elements</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// a single callback to process and assert the attributes</span>
  <span class="token keyword">const</span> attrs <span class="token operator">=</span> $elements
    <span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">li</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> li<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>sku
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>attrs<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>skus<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function g(b,h){const p=o("ExternalLinkIcon");return c(),i("div",null,[r,a(" fiddle Dynamic list with attributes "),k,s("p",null,[n("Let's use "),s("a",d,[n("cypress-map"),u(p)]),n(" to map all found DOM elements to their attribute "),m,n(" and then sort the array of strings.")]),v,a(" fiddle-end ")])}const y=e(l,[["render",g],["__file","sorted-attributes.html.vue"]]);export{y as default};
