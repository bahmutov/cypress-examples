import{_ as a,p as t,q as e,Q as s,R as n,t as p,a1 as o}from"./framework-e03faf0e.js";const c={},i=n("h1",{id:"add-a-custom-data-assertion",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#add-a-custom-data-assertion","aria-hidden":"true"},"#"),p(" Add A Custom Data Assertion")],-1),l=n("p",null,`Let's say our code is using "data-test-id" attribute, and we want to verify that the current element has the expected test id value.`,-1),u=o(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>data-attributes<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">data-test-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>first<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>first<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>second<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;#data-attributes li&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// use the built-in Chai-jQuery &quot;have.data&quot; assertion</span>
  <span class="token comment">// https://www.chaijs.com/plugins/chai-jquery/</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.data&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;testId&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// because the assertion is &quot;complete&quot; and checked the value</span>
  <span class="token comment">// the yielded value is the original element</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;match&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can add our own assertion to verify the &quot;data-test-id&quot; attribute (with optional value), and yield the original element to keep chaining commands to it.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>chai<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_chai<span class="token punctuation">,</span> utils</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// use &quot;function&quot; syntax to make sure when Chai</span>
  <span class="token comment">// calls it, the &quot;this&quot; object points at Chai</span>

  <span class="token keyword">function</span> <span class="token function">testId</span><span class="token punctuation">(</span><span class="token parameter">expectedValue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> attr <span class="token operator">=</span> <span class="token string">&#39;data-test-id&#39;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>expectedValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_obj<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">assert</span><span class="token punctuation">(</span>
        value <span class="token operator">===</span> expectedValue<span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">expected to find data-test-id=&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>expectedValue<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;, found value &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// only confirm the &quot;data-test-id&quot; attribute is present</span>

      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">assert</span><span class="token punctuation">(</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_obj<span class="token punctuation">.</span><span class="token function">attr</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
        <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">expected to find data-test-id attribute</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  _chai<span class="token punctuation">.</span>Assertion<span class="token punctuation">.</span><span class="token function">addMethod</span><span class="token punctuation">(</span><span class="token string">&#39;testId&#39;</span><span class="token punctuation">,</span> testId<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;#data-attributes li&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.testId&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// continue working with the original element</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// confirm the presence of the &quot;data-test-id&quot; attribute</span>
cy<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&#39;#data-attributes li&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.testId&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function d(k,r){return t(),e("div",null,[i,l,s(" fiddle Check data test id "),u,s(" fiddle-end ")])}const m=a(c,[["render",d],["__file","add-data-assertion.html.vue"]]);export{m as default};
