import{_ as p,p as e,q as c,Q as n,a1 as t,R as a,t as s}from"./framework-e03faf0e.js";const o={},l=t('<h1 id="confirm-labels" tabindex="-1"><a class="header-anchor" href="#confirm-labels" aria-hidden="true">#</a> Confirm Labels</h1><p>HTML <code>&lt;input&gt;</code> elements have <code>labels</code> property with the linked <code>&lt;label&gt;</code> elements for that input (if any). The labels are kept inside a <code>NodeList</code>. Let&#39;s see how we can use the labels in our tests.</p><h2 id="confirm-a-single-label" tabindex="-1"><a class="header-anchor" href="#confirm-a-single-label" aria-hidden="true">#</a> Confirm a single label</h2>',3),u=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accept<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Accept terms<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accept<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;input#accept&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.prop&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;labels&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// yields a NodeList</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.length&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token comment">// get the first DOM element</span>
  <span class="token punctuation">.</span><span class="token function">its</span><span class="token punctuation">(</span><span class="token string">&#39;0&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token string">&#39;have.text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Accept terms&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),i=a("h2",{id:"confirm-each-input-has-a-label",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#confirm-each-input-has-a-label","aria-hidden":"true"},"#"),s(" Confirm each input has a label")],-1),k=a("p",null,[s("Let's go through every "),a("code",null,"input"),s(" element and confirm it has a corresponding label.")],-1),r=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accept<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accept<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Accept terms<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>grapes<span class="token punctuation">&quot;</span></span> <span class="token attr-name">checked</span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>grapes<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>I ❤️ grapes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>checkbox<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mango<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mango<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>I ❤️ mango<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">$input</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> element <span class="token operator">=</span> $input<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>have<span class="token punctuation">.</span><span class="token function">property</span><span class="token punctuation">(</span><span class="token string">&#39;labels&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>element<span class="token punctuation">.</span>labels<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>not<span class="token punctuation">.</span>be<span class="token punctuation">.</span>empty
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function d(m,g){return e(),c("div",null,[l,n(" fiddle Confirm one input has a label "),u,n(" fiddle-end "),i,k,n(" fiddle Confirm each input has a label "),r,n(" fiddle-end ")])}const b=p(o,[["render",d],["__file","confirm-labels.html.vue"]]);export{b as default};
