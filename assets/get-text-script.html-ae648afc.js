import{_ as t,p as n,q as e,Q as s,R as a,t as p,a1 as c}from"./framework-e03faf0e.js";const o={},i=a("h1",{id:"get-text-script",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#get-text-script","aria-hidden":"true"},"#"),p(" Get text script")],-1),l=c(`<p>You can embed the data for test to use using <code>&lt;script type=&#39;text/plain&#39;&gt;...&lt;/script&gt;</code> tags. These tags will not be rended by the page (unless you set their style to be visible), but they are easy to query using the standard CSS selectors.</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text/plain<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  Joe
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#name[type=&quot;text/plain&quot;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;include.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Joe&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3);function u(r,d){return n(),e("div",null,[i,s(" fiddle Get text script "),l,s(" fiddle-end ")])}const g=t(o,[["render",u],["__file","get-text-script.html.vue"]]);export{g as default};
