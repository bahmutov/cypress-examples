import{_ as p,M as c,p as o,q as l,Q as a,R as n,t as s,N as i,a1 as e}from"./framework-e03faf0e.js";const u={},r=n("h1",{id:"replace-all",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#replace-all","aria-hidden":"true"},"#"),s(" Replace all")],-1),k=n("p",null,[s("Let's say the user enters the phone number, possibly formatting the phone number with "),n("code",null,"-"),s(" characters or not. Before confirming the value, we want to remove all "),n("code",null,"-"),s(" characters. We can use "),n("code",null,"String.prototype.replaceAll"),s(" method to do this.")],-1),d=e(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>phone<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>202-123-4567<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// get the input element using cy.get command</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#phone&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// to get the value of an &lt;input&gt; element</span>
  <span class="token comment">// we should use the jQuery val() method</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;val&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// we are now dealing with a string</span>
  <span class="token comment">// and can call String.prototype.replaceAll</span>
  <span class="token comment">// to remove &quot;-&quot; characters that might be present</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replaceAll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// check the phone number against the expected one</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2021234567&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),m={href:"https://youtu.be/xoGDeWYovn8",target:"_blank",rel:"noopener noreferrer"},v=e(`<p>What if the user could enter the phone number using <code>-</code>, \`\`, and <code>(</code> characters? You can call <code>replaceAll</code> several times.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// clear the input element and type the same</span>
<span class="token comment">// number with separator characters</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#phone&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">&#39;(202) 123-4567&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;val&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replaceAll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replaceAll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;(&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replaceAll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replaceAll&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// check the phone number against the expected one</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2021234567&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>An alternative approach is to use the <code>String.prototype.replace(regex, ...)</code> method. For example, we can remove all non-digit characters.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// get the input element using cy.get command</span>
cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;#phone&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// to get the value of an &lt;input&gt; element</span>
  <span class="token comment">// we should use the jQuery val() method</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;val&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// remove all non-digit characters</span>
  <span class="token comment">// using the regular expression \\D</span>
  <span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token string">&#39;replace&#39;</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\D</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// check the phone number against the expected one</span>
  <span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;equal&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2021234567&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function g(h,b){const t=c("ExternalLinkIcon");return o(),l("div",null,[r,k,a(" fiddle Replace all "),d,n("p",null,[s("Watch the video "),n("a",m,[s("Clean Up A Phone Number From An Input Element Before Checking It"),i(t)]),s(".")]),v,a(" fiddle-end ")])}const x=p(u,[["render",g],["__file","replace-all.html.vue"]]);export{x as default};